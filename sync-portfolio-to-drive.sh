#!/bin/bash
LOG="$HOME/portfolio-gdrive-sync.log"
echo "$(date): Starting sync to Google Drive..." >> $LOG

rclone sync /home/pve_ubuntu/portfolio/projects drive:portfolio/projects \
  --exclude '.git/**' \
  --exclude 'node_modules/**' \
  --exclude '*.tmp' \
  -v >> $LOG 2>&1

rclone sync /home/pve_ubuntu/portfolio/thoughts drive:portfolio/thoughts \
  --exclude '.git/**' \
  --exclude '*.tmp' \
  -v >> $LOG 2>&1

echo "$(date): Sync completed." >> $LOG