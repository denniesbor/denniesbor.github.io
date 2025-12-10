# 🚀 Overengineered Portfolio: A Computational Scientist's Tech Playground

> *"Why use one technology when you can use twelve?"* - Me, probably at 3 AM

Welcome to my portfolio website--a monument to technical overkill and a showcase of what happens when a computational scientist gets carried away with infrastructure automation.

## 🎯 The Mission

Build a portfolio website that:
- ✅ Showcases computational science projects
- ✅ Demonstrates technical expertise through the stack itself
- ✅ Survives infrastructure failures (because why not?)
- ✅ Updates automatically (because manual work is boring)
- ✅ Uses more technologies than strictly necessary (because we can)

## 🏗️ The Overengineered Architecture

### Dual-Domain Setup
- **Frontend**: [denniesbor.me](https://denniesbor.me) (GitHub Pages)
- **Backend + Files**: [denniesbor.com](https://denniesbor.com) (AWS EC2)

*Why two domains? Because one is for amateurs.*

### The Tech Stack (Yes, All of It)

#### Frontend
- **React** with Vite - Fast, modern, sleek
- **D3.js** - Custom map visualizations (because Leaflet was too easy)
- **Tailwind CSS** - Utility-first styling
- **React Router** - SPA navigation
- Deployed via **GitHub Actions** to GitHub Pages

#### Backend
- **Go** - High-performance API serving portfolio metadata
- **Django/Gunicorn** - Legacy endpoints (JWT auth, existing services)
- **Nginx** - Reverse proxy, load balancing, CORS handling

#### Data Layer (This is Where It Gets Fun)
- **NFS over WireGuard** - Primary file storage from file server
- **Google Drive (rclone)** - Automatic failover backup
- **WireGuard VPN** - Encrypted tunnel between servers
- **Automated sync** - Cron job every 6 hours to Google Drive

*Network diagram? Yes. Overkill? Also yes.*

#### CI/CD Pipeline
```
┌─────────────────────────────────────────────────────┐
│  GitHub Actions (Build & Deploy)                   │
├─────────────────────────────────────────────────────┤
│  1. Build React app                                 │
│  2. Deploy to GitHub Pages (denniesbor.me)         │
│  3. Upload artifacts to self-hosted runner         │
│  4. Deploy to AWS (denniesbor.com)                 │
│  5. Sync backend code                               │
│  6. Rebuild Go binary                               │
│  7. Restart services                                │
│  8. Reload Nginx                                    │
└─────────────────────────────────────────────────────┘
```

#### The Resume Magic ✨
My resume is the crown jewel of automation:

1. **Edit** on Overleaf (beautiful LaTeX editor)
2. **Push** to GitHub via Overleaf integration
3. **GitHub Actions** automatically compiles LaTeX → PDF
4. **Commit** compiled PDF back to main branch
5. **Portfolio** fetches latest version from GitHub
6. **Download button** always serves the most recent resume

*Zero manual work. Maximum sophistication.*

### Infrastructure Resilience

#### Triple-Redundant File Serving
```
User Request → Nginx
    ↓
    ├─ Try NFS (fast, local network)
    ├─ Fallback to Google Drive (if NFS down)
    └─ 404 (if all else fails)
```

#### WireGuard Keepalive Monitoring
- Systemd timer checks connectivity every 5 minutes
- Auto-restarts WireGuard if peer unreachable
- Remounts NFS automatically
- Logs everything for debugging

*Because nothing says "I'm employable" like automatic failover.*

## 🗺️ The Centerpiece: Space Weather Grid Dashboard

An interactive D3 visualization showing:
- **US power grid** topology (transmission lines, substations)
- **Geomagnetically Induced Current (GIC)** simulations
- **Failure probability** analysis for synthetic storm scenarios
- **Economic impact** projections ($100B+ potential losses)
- **Real-time switching** between historical events and synthetic scenarios

Features:
- Zoom & pan (scroll to zoom, drag to pan)
- Stacked vs. dodged economic impact charts
- Toggle between substations and magnetometer views
- E-field and B-field visualizations
- Draggable legend (because why not?)

*This alone uses: D3, topojson, custom projections, responsive design, and way too much math.*

## 🎨 Design Philosophy

- **Responsive**: Mobile → Tablet → Desktop → Ultrawide
- **Fast**: Nginx caching, CDN fonts, optimized builds
- **Accessible**: Semantic HTML, ARIA labels, keyboard navigation
- **Professional**: Clean UI, subtle animations, thoughtful spacing

## 📊 Project Showcase

### Featured Projects
- **Space Weather Grid Impact** - GIC modeling and economic analysis
- **Notch Filter Design** - Digital signal processing
- **Convolution Demonstrations** - Image processing tutorials
- *(More coming soon)*

### Metadata-Driven Architecture
Each project has:
- `metadata.json` - Title, description, tags, primary category
- `description.md` - Full project writeup
- Assets (notebooks, PDFs, images, data)

The Go backend scans folders and serves via API. No databases. Just files.

## 🔧 Tech Highlights

### Why Go?
- Fast compilation
- Single binary deployment
- Excellent standard library
- Easy concurrency (for future features)

### Why D3 Instead of Leaflet?
- Full control over rendering
- No tile limitations
- Custom projections (Albers USA)
- Better performance for complex overlays
- More fun to code

### Why WireGuard?
- Modern, fast VPN protocol
- Minimal overhead
- Easy to configure
- Built-in cryptographic key exchange

### Why NFS + Google Drive?
- NFS for low-latency access (local network)
- Google Drive for disaster recovery
- Automatic sync keeps backup fresh
- Nginx handles failover transparently

## 🚀 Deployment

One command to rule them all:
```bash
git push origin main
```

GitHub Actions handles:
- ✅ Building frontend
- ✅ Deploying to GitHub Pages
- ✅ Syncing to self-hosted runner
- ✅ Building Go backend
- ✅ Restarting services
- ✅ Clearing caches

*Deploy time: ~2 minutes. Coffee breaks: many.*

## 📈 What I Learned

- How to overcomplicate simple things (mastered ✅)
- Nginx is more powerful than expected
- D3 is amazing but has a learning curve
- Go is delightful to work with
- GitHub Actions can do almost anything
- Automation is addictive
- There's no such thing as "too much failover"

## 🎯 Future Enhancements

- [ ] Add more research projects
- [ ] Implement search functionality
- [ ] Dark mode (because everyone expects it)
- [ ] Blog section with markdown rendering
- [ ] Real-time data streaming (WebSockets?)
- [ ] Even more unnecessary complexity

## 🤝 Connect

- **Portfolio**: [denniesbor.me](https://denniesbor.me)
- **Twitter/X**: [@bordennies](https://twitter.com/bordennies)
- **LinkedIn**: [denniesbor](https://ke.linkedin.com/in/denniesbor)
- **GitHub**: [denniesbor](https://github.com/denniesbor)
- **Google Scholar**: [Publications](https://scholar.google.com/citations?hl=en&user=mnet84cAAAAJ)

## 🙏 Acknowledgments

This project wouldn't exist without:
- **Claude (Anthropic)** - For being an exceptional pair programming partner, debugging companion, and infrastructure architect. Seriously, this AI writes better Go than most humans.
- **Gemini (Google)** - For research assistance, brainstorming sessions, and helping navigate complex computational problems.

*Proof that human creativity + AI capabilities = overengineered masterpieces.*

## 📜 License

MIT License - Use this overengineering for good, not evil.

---

## 🎓 For Recruiters

If you made it this far, here's what this project demonstrates:

✅ **Full-stack development** (React, Go, Django, Nginx)  
✅ **DevOps expertise** (CI/CD, self-hosted runners, infrastructure automation)  
✅ **System architecture** (load balancing, failover, caching strategies)  
✅ **Data visualization** (D3.js, custom map projections, responsive charts)  
✅ **Computational science** (GIC modeling, economic impact analysis, geospatial data)  
✅ **Problem-solving** (because everything that could go wrong, did)  
✅ **Documentation** (you're reading it!)  

*Yes, I could have used WordPress. But where's the fun in that?*

---

**Built with ☕, 🎵, and an unhealthy amount of determination.**

*"It's not overengineering if you learn something new."* - Also me, probably still at 3 AM