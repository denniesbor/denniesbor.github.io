#!/bin/bash
set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}WireGuard Keepalive Monitor Setup${NC}"
echo "=================================="

if [ "$EUID" -ne 0 ]; then 
    echo -e "${RED}Please run as root (use sudo)${NC}"
    exit 1
fi

# Detect which server we're on
HOSTNAME=$(hostname)
echo "Hostname: $HOSTNAME"

# Determine peer IP based on hostname or prompt user
echo ""
echo "Which server is this?"
echo "1) File Server (10.8.0.50) - monitors 10.8.0.100"
echo "2) Web Server (10.8.0.100) - monitors 10.8.0.50"
read -p "Enter choice [1 or 2]: " choice

case $choice in
    1)
        PEER_IP="10.8.0.100"
        SERVER_TYPE="file-server"
        REMOUNT_NFS=false
        ;;
    2)
        PEER_IP="10.8.0.50"
        SERVER_TYPE="web-server"
        REMOUNT_NFS=true
        ;;
    *)
        echo -e "${RED}Invalid choice${NC}"
        exit 1
        ;;
esac

WG_INTERFACE="wg0"

echo -e "${YELLOW}Configuration:${NC}"
echo "  Server Type: $SERVER_TYPE"
echo "  Monitoring Peer: $PEER_IP"
echo "  WireGuard Interface: $WG_INTERFACE"
echo "  Remount NFS: $REMOUNT_NFS"
echo ""

# Create keepalive script
echo -e "${YELLOW}Creating keepalive script...${NC}"
cat > /usr/local/bin/wg-keepalive.sh << EOF
#!/bin/bash

PEER_IP="$PEER_IP"
WG_INTERFACE="$WG_INTERFACE"

# Check if peer is reachable
if ! ping -c 2 -W 3 \$PEER_IP > /dev/null 2>&1; then
    echo "\$(date): WireGuard peer \$PEER_IP unreachable, restarting wg-quick@\$WG_INTERFACE"
    systemctl restart wg-quick@\$WG_INTERFACE
    sleep 5
    
    # Remount NFS if this is web server
    if [ "$REMOUNT_NFS" = true ]; then
        echo "\$(date): Remounting NFS shares..."
        mount -a
    fi
    
    # Verify restart worked
    if ping -c 1 -W 2 \$PEER_IP > /dev/null 2>&1; then
        echo "\$(date): WireGuard restart successful, peer reachable"
    else
        echo "\$(date): WireGuard restart failed, peer still unreachable"
    fi
else
    echo "\$(date): WireGuard peer \$PEER_IP is reachable"
fi
EOF

chmod +x /usr/local/bin/wg-keepalive.sh
echo -e "${GREEN}✓ Keepalive script created${NC}"

# Create systemd service
echo -e "${YELLOW}Creating systemd service...${NC}"
cat > /etc/systemd/system/wg-keepalive.service << 'EOF'
[Unit]
Description=WireGuard Keepalive Check
After=network.target wg-quick@wg0.service
Wants=wg-quick@wg0.service

[Service]
Type=oneshot
ExecStart=/usr/local/bin/wg-keepalive.sh
StandardOutput=append:/var/log/wg-keepalive.log
StandardError=append:/var/log/wg-keepalive.log
EOF

echo -e "${GREEN}✓ Systemd service created${NC}"

# Create systemd timer
echo -e "${YELLOW}Creating systemd timer...${NC}"
cat > /etc/systemd/system/wg-keepalive.timer << 'EOF'
[Unit]
Description=WireGuard Keepalive Check Timer
Requires=wg-quick@wg0.service

[Timer]
OnBootSec=2min
OnUnitActiveSec=5min
AccuracySec=1min

[Install]
WantedBy=timers.target
EOF

echo -e "${GREEN}✓ Systemd timer created${NC}"

# Reload systemd and enable
echo -e "${YELLOW}Enabling and starting services...${NC}"
systemctl daemon-reload
systemctl enable wg-keepalive.timer
systemctl start wg-keepalive.timer

echo ""
echo -e "${GREEN}✓ Setup complete!${NC}"
echo ""
echo "Service Status:"
systemctl status wg-keepalive.timer --no-pager -l

echo ""
echo "Next run time:"
systemctl list-timers | grep wg-keepalive

echo ""
echo -e "${YELLOW}Useful commands:${NC}"
echo "  Test manually:         sudo /usr/local/bin/wg-keepalive.sh"
echo "  View logs:            sudo tail -f /var/log/wg-keepalive.log"
echo "  Check timer status:   sudo systemctl status wg-keepalive.timer"
echo "  Restart timer:        sudo systemctl restart wg-keepalive.timer"
echo "  Disable timer:        sudo systemctl stop wg-keepalive.timer && sudo systemctl disable wg-keepalive.timer"
echo ""