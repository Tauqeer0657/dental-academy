---
description: How to run the Dental Webinar Platform locally
---

# Running the Dental Platform

## Quick Start (Two Terminals)

// turbo-all

### Terminal 1 - Start Backend
```bash
cd /Users/nawaidiqbal/Desktop/Dental/server
npm run dev
```
Wait for: `🦷 Dental Webinar API Server running at: http://localhost:3001`

### Terminal 2 - Start Frontend
```bash
cd /Users/nawaidiqbal/Desktop/Dental
npm run dev
```
Wait for: `Local: http://localhost:5173`

---

## Access URLs

| Page | URL |
|------|-----|
| Homepage | http://localhost:5173 |
| Registration | http://localhost:5173/register |
| Admin Login | http://localhost:5173/admin/login |
| Admin Dashboard | http://localhost:5173/admin |

## Admin Credentials
- Username: `admin`
- Password: `dental2024`

---

## If Dependencies Missing

Run these first:
```bash
cd /Users/nawaidiqbal/Desktop/Dental && npm install
cd /Users/nawaidiqbal/Desktop/Dental/server && npm install
```

## Stop Servers
Press `Ctrl+C` in each terminal
