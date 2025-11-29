# EuroUni Deployment Guide for Hostinger

## Important: Hosting Plan Requirements

EuroUni is a **full-stack application** with:
- Node.js/Express backend
- React frontend
- PostgreSQL database

### You Need: Hostinger VPS Hosting (NOT Shared Hosting)
- Shared hosting does NOT support Node.js backends
- Minimum VPS plan recommended: **VPS KVM 1** or higher
- Choose Ubuntu 22.04/24.04 with Node.js template

---

## Pre-Deployment Checklist

### 1. Build Files Location
After running `npm run build`, your production files are in:
```
dist/
├── index.cjs          # Server bundle (Express backend)
└── public/            # Static React frontend
    ├── index.html
    └── assets/
        ├── index-*.css
        ├── index-*.js
        └── images...
```

### 2. Required Environment Variables
Set these in Hostinger's environment settings:

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/dbname` |
| `NODE_ENV` | Environment mode | `production` |
| `PORT` | Server port (Hostinger assigns this) | `3000` |

---

## Deployment Steps for Hostinger VPS

### Step 1: Connect to VPS via SSH
```bash
ssh root@your-vps-ip-address
```

### Step 2: Install Node.js (if not pre-installed)
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node -v  # Should show v20.x.x
npm -v
```

### Step 3: Install PM2 (Process Manager)
```bash
npm install -g pm2
```

### Step 4: Upload Project Files
Option A - Using Git:
```bash
cd /var/www
git clone your-repository-url eurouni
cd eurouni
```

Option B - Using SFTP:
- Upload all project files to `/var/www/eurouni/`

### Step 5: Install Dependencies & Build
```bash
cd /var/www/eurouni
npm install
npm run build
```

### Step 6: Set Environment Variables
Create a `.env` file:
```bash
nano .env
```

Add:
```
DATABASE_URL=your_neon_database_url
NODE_ENV=production
PORT=3000
```

### Step 7: Initialize Database
```bash
npm run db:push
```

### Step 8: Start Application with PM2
```bash
# Start the server
pm2 start dist/index.cjs --name "eurouni"

# Save PM2 configuration
pm2 save

# Set PM2 to start on boot
pm2 startup
```

### Step 9: Configure Nginx Reverse Proxy
```bash
sudo nano /etc/nginx/sites-available/eurouni
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/eurouni /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 10: Set Up SSL (Let's Encrypt)
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## PM2 Useful Commands

```bash
# View app status
pm2 status

# View logs
pm2 logs eurouni

# Restart app
pm2 restart eurouni

# Stop app
pm2 stop eurouni

# Monitor resources
pm2 monit
```

---

## Database Options

### Option 1: Keep Using Neon (Recommended)
- Your current PostgreSQL database on Neon will work
- Just copy the DATABASE_URL from Replit secrets
- No migration needed

### Option 2: Use Hostinger MySQL/PostgreSQL
- Create database in Hostinger panel
- Update DATABASE_URL in .env
- Run `npm run db:push` to create tables
- Seed data will need to be re-added

---

## Troubleshooting

### App not starting?
```bash
pm2 logs eurouni --lines 100
```

### Port already in use?
```bash
# Find process using port 3000
lsof -i :3000
# Kill it if needed
kill -9 <PID>
```

### Database connection issues?
- Verify DATABASE_URL is correct
- Check if Neon allows connections from Hostinger IP
- Test with: `npm run db:push`

### 502 Bad Gateway?
- Check if PM2 is running: `pm2 status`
- Restart: `pm2 restart eurouni`
- Check Nginx config: `sudo nginx -t`

---

## Files to Upload

Upload these folders/files to your VPS:
```
├── package.json
├── package-lock.json
├── tsconfig.json
├── drizzle.config.ts
├── .env (create on server)
├── dist/               # Built files
├── shared/             # Shared schemas
├── server/             # Server source (for rebuilding)
├── client/             # Client source (for rebuilding)
└── scripts/            # Build scripts
```

---

## Quick Deploy Script

Save as `deploy.sh` and run on VPS:
```bash
#!/bin/bash
cd /var/www/eurouni
git pull origin main
npm install
npm run build
pm2 restart eurouni
echo "Deployment complete!"
```

Make executable: `chmod +x deploy.sh`

---

## Support

- Hostinger VPS Documentation: https://support.hostinger.com/en/articles/1583661-is-node-js-supported-at-hostinger
- PM2 Documentation: https://pm2.keymetrics.io/docs/usage/quick-start/
- Neon Database: https://neon.tech/docs
