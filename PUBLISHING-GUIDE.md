# Publishing Endurance Race Block: Step-by-Step Guide

## Phase 1: GitHub (Do This First — 30 Minutes)

### Step 1: Create the Repository

1. Go to github.com → click **+** → **New repository**
2. Repository name: `endurance-race-block`
3. Description: "WordPress block plugin for triathlon and endurance event countdowns with live timer, finisher results, split times, and race photos."
4. Set to **Public**
5. Check **Add a license** → select **GNU General Public License v2.0**
6. Click **Create repository**

### Step 2: Upload the Plugin Files

On the repo page, click **Add file → Upload files** and drag in all 7 files:

- `endurance-race-block.php`
- `editor.js`
- `view.js`
- `style.css`
- `readme.txt`
- `README.md`
- `PUBLISHING-GUIDE.md`

Commit message: "Initial release v1.1.0"

### Step 3: Create a Release with ZIP

1. On your repo page, click **Releases** (right sidebar)
2. Click **Create a new release**
3. Tag version: `v1.1.0`
4. Release title: `Endurance Race Block v1.1.0`
5. Description — paste this:

```
## What's New
- Dark + Light theme toggle
- Proper block editor selection (useBlockProps)
- Disciplines always side by side
- Race photo support
- Clickable card links
- Inherits theme typography

## Installation
1. Download `endurance-race-block.zip` below
2. WordPress Admin → Plugins → Add New → Upload Plugin
3. Select the ZIP → Install → Activate
4. Search for "Endurance Race Block" in the block editor
```

6. **Attach the ZIP file** — drag in the `endurance-race-block.zip`
7. Click **Publish release**

---

## Phase 2: Share & Get Feedback (1-2 Weeks)

### WPCNX Community
- Present at a meetup — "From personal itch to published plugin"
- Share the GitHub link in the group chat
- Ask for beta testers running different themes

### LinkedIn Post
Angle: "I built a niche WordPress block for endurance athletes —
here's why micro-plugins beat bloated page builders for specific use cases."

### Blog Post on JefvandeGraaf.com
Showcase the plugin on your own race calendar page. Double duty as
content and a live demo.

---

## Phase 3: WordPress.org Plugin Directory

### Step 1: Submit

1. Go to: https://wordpress.org/plugins/developers/add/
2. Plugin Name: **Endurance Race Block**
3. Plugin Slug: `endurance-race-block`
4. Plugin URL: `https://github.com/jefvandegraaf/endurance-race-block`
5. Submit and wait for review (3-14 days)

### Step 2: SVN Setup (After Approval)

```bash
svn co https://plugins.svn.wordpress.org/endurance-race-block
cp endurance-race-block.php trunk/
cp editor.js trunk/
cp view.js trunk/
cp style.css trunk/
cp readme.txt trunk/
svn add trunk/*
svn ci -m "Initial release v1.1.0"
svn cp trunk tags/1.1.0
svn ci -m "Tagging v1.1.0"
```

### Step 3: Assets

Upload to `assets/` in SVN:

| File | Size | Purpose |
|------|------|---------|
| `icon-256x256.png` | 256×256 | Plugin icon in search |
| `banner-772x250.png` | 772×250 | Header on plugin page |
| `screenshot-1.png` | Any | Matches readme.txt |

---

## Version Bump Checklist

When releasing updates:

1. [ ] Update `ERB_VERSION` in `endurance-race-block.php`
2. [ ] Update `Stable tag` in `readme.txt`
3. [ ] Add changelog entry in `readme.txt`
4. [ ] Commit to SVN trunk + create tag
5. [ ] Create GitHub release with ZIP
