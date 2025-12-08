#!/bin/bash
set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}RClone Portfolio Mount Setup${NC}"

if [ "$EUID" -ne 0 ]; then 
    echo -e "${RED}Please run as root (use sudo)${NC}"
    exit 1
fi

ACTUAL_USER="${SUDO_USER:-$USER}"
USER_HOME=$(eval echo ~$ACTUAL_USER)

echo "Setting up for user: $ACTUAL_USER"

# Cleanup existing installation
echo -e "${YELLOW}Cleaning up existing setup...${NC}"
if systemctl is-active --quiet rclone-portfolio 2>/dev/null; then
    echo "Stopping rclone-portfolio service..."
    systemctl stop rclone-portfolio
fi

if systemctl is-enabled --quiet rclone-portfolio 2>/dev/null; then
    echo "Disabling rclone-portfolio service..."
    systemctl disable rclone-portfolio
fi

# Kill any rclone processes
echo "Killing any running rclone processes..."
pkill -9 rclone 2>/dev/null || true

# Unmount if mounted
echo "Unmounting /mnt/gdrive-portfolio..."
umount /mnt/gdrive-portfolio 2>/dev/null || true
fusermount -uz /mnt/gdrive-portfolio 2>/dev/null || true

# Clean mount directory
if [ -d /mnt/gdrive-portfolio ]; then
    echo "Cleaning mount directory..."
    rm -rf /mnt/gdrive-portfolio/* 2>/dev/null || true
    rmdir /mnt/gdrive-portfolio/projects /mnt/gdrive-portfolio/thoughts 2>/dev/null || true
fi

# Remove old service file
if [ -f /etc/systemd/system/rclone-portfolio.service ]; then
    echo "Removing old service file..."
    rm /etc/systemd/system/rclone-portfolio.service
    systemctl daemon-reload
fi

echo -e "${GREEN}Cleanup complete${NC}"
echo ""

# Install rclone if needed
echo "Checking rclone installation..."
if ! command -v rclone &> /dev/null; then
    echo "Installing rclone..."
    curl https://rclone.org/install.sh | bash
else
    echo "rclone already installed: $(rclone version | head -n1)"
fi

# Configure FUSE
echo "Configuring FUSE..."
if ! grep -q "^user_allow_other" /etc/fuse.conf 2>/dev/null; then
    echo "user_allow_other" >> /etc/fuse.conf
    echo "Added user_allow_other to /etc/fuse.conf"
else
    echo "FUSE already configured"
fi

# Check rclone config exists
echo "Checking rclone configuration..."
if [ ! -f "$USER_HOME/.config/rclone/rclone.conf" ]; then
    echo -e "${RED}ERROR: rclone config not found at $USER_HOME/.config/rclone/rclone.conf${NC}"
    echo "Run 'rclone config' as $ACTUAL_USER first"
    exit 1
fi

# Verify 'drive' remote exists
if ! sudo -u $ACTUAL_USER rclone listremotes | grep -q "drive:"; then
    echo -e "${RED}ERROR: 'drive' remote not found${NC}"
    echo "Available remotes:"
    sudo -u $ACTUAL_USER rclone listremotes
    echo ""
    echo "Please create a 'drive' remote by running: rclone config"
    exit 1
fi

echo "Found 'drive' remote"

# Create mount directory with correct permissions
echo "Creating mount directory..."
mkdir -p /mnt/gdrive-portfolio
chown $ACTUAL_USER:$ACTUAL_USER /mnt/gdrive-portfolio
chmod 755 /mnt/gdrive-portfolio
echo "Mount directory created with correct permissions"

# Create systemd service
echo "Creating systemd service..."
cat > /etc/systemd/system/rclone-portfolio.service << EOF
[Unit]
Description=RClone Mount for Portfolio
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
ExecStartPre=/bin/mkdir -p /mnt/gdrive-portfolio
ExecStart=/usr/bin/rclone mount drive:portfolio /mnt/gdrive-portfolio \\
  --vfs-cache-mode writes \\
  --vfs-read-chunk-size 128M \\
  --buffer-size 256M \\
  --allow-other \\
  --dir-cache-time 5m \\
  --poll-interval 15s \\
  --log-level INFO \\
  --log-file /var/log/rclone-portfolio.log
ExecStop=/bin/fusermount -uz /mnt/gdrive-portfolio
Restart=on-failure
RestartSec=10
User=$ACTUAL_USER

[Install]
WantedBy=multi-user.target
EOF

echo "Service file created"

# Reload systemd and enable service
echo "Enabling and starting service..."
systemctl daemon-reload
systemctl enable rclone-portfolio
systemctl start rclone-portfolio

# Wait for mount to initialize
echo "Waiting for mount to initialize..."
sleep 5

# Verify service status
echo ""
echo "Checking service status..."
if systemctl is-active --quiet rclone-portfolio; then
    echo -e "${GREEN}✓ Service is running${NC}"
else
    echo -e "${RED}✗ Service failed to start${NC}"
    echo ""
    echo "Service status:"
    systemctl status rclone-portfolio --no-pager
    echo ""
    echo "Recent logs:"
    journalctl -u rclone-portfolio -n 20 --no-pager
    exit 1
fi

# Verify mount
echo "Verifying mount..."
if mountpoint -q /mnt/gdrive-portfolio; then
    echo -e "${GREEN}✓ Mount successful${NC}"
    echo ""
    echo "Mount contents:"
    ls -lh /mnt/gdrive-portfolio/ 2>/dev/null || echo "  (empty or still loading)"
else
    echo -e "${RED}✗ Mount failed${NC}"
    echo "Check logs: journalctl -u rclone-portfolio -f"
    exit 1
fi

echo ""
echo -e "${GREEN}======================================${NC}"
echo -e "${GREEN}Setup Complete!${NC}"
echo -e "${GREEN}======================================${NC}"
echo ""
echo "Service: rclone-portfolio"
echo "Mount: /mnt/gdrive-portfolio"
echo "Logs: /var/log/rclone-portfolio.log"
echo ""
echo "Commands:"
echo "  sudo systemctl status rclone-portfolio"
echo "  sudo systemctl restart rclone-portfolio"
echo "  sudo journalctl -u rclone-portfolio -f"
echo "  ls /mnt/gdrive-portfolio/"
echo ""