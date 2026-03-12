# Endurance Race Block 🏊🚴🏃

A WordPress block for triathletes and endurance athletes. Beautiful countdown cards that automatically switch to finisher results after race day.

**No build step. No webpack. No node. Just upload and activate.**

---

## What It Does

Each card has three automatic modes:

| Mode | When | What Shows |
|------|------|------------|
| **Countdown** | Before race day | Live ticking timer (days, hours, min, sec) |
| **Awaiting** | After race day, no results yet | "Awaiting results..." |
| **Finisher** | After you add results | Finish time, rank, splits, race photo |

## Features

- **Live countdown timer** — ticks every second on the frontend
- **Swim / Bike / Run toggles** — configurable distances, always displayed side by side
- **Event types** — Sprint, Olympic, Half-Course, Full, Ultra, Trail, Custom
- **Post-race results** — total time, overall rank, age group rank
- **Split times** — compact badges (Swim, T1, Bike, T2, Run)
- **Race photo** — select from your Media Library, displayed below results
- **Clickable cards** — link to your race recap blog post or event page
- **Dark + Light themes** — toggle from toolbar or sidebar
- **Inherits your theme font** — no font conflicts with any theme
- **Fully responsive** — works on mobile, tablets, desktop
- **Zero dependencies** — no npm, no build tools, no external APIs

## Installation

### Option A: Upload ZIP
1. Download the [latest release](../../releases/latest)
2. WordPress Admin → Plugins → Add New → Upload Plugin
3. Select the ZIP → Install → Activate

### Option B: Manual
1. Clone or download this repo
2. Copy the `endurance-race-block` folder to `/wp-content/plugins/`
3. Activate in WordPress Admin → Plugins

## Usage

### Adding a Race

1. In the block editor, click **+** and search for **"Endurance Race Block"**
2. Fill in the sidebar panels:
   - 🎨 **Theme** — Dark (black) or Light (white)
   - 🏁 **Event Details** — Title, location, date/time, type, link URL
   - 🏊🚴🏃 **Disciplines** — Toggle swim/bike/run, set distances
3. Publish — the countdown starts automatically

### After Race Day

1. Open the page with your race card
2. Click the block
3. Open **🏆 Results** in the sidebar
4. Set status → **Finisher**
5. Add your total time, rank, age group rank
6. Add splits: `Swim:33:42, T1:12:29, Bike:1:28:56, T2:7:59, Run:1:15:56`
7. Open **📸 Race Photo** → select your finish line shot
8. Update the page — done

### Splits Format

Comma-separated, each split is `Label:Time`:

```
Swim:33:42, T1:12:29, Bike:1:28:56, T2:7:59, Run:1:15:56
```

Works for any number of splits. For a running-only event:

```
Run:3:36:17
```

### Multiple Races

Each race is its own block. Drop them into any layout — columns, grids (works great with GenerateBlocks), or stacked.

### Running-Only Events

Toggle off Swim and Bike in the Disciplines panel. Only the Run leg displays.

## Themes

| Dark (default) | Light |
|---|---|
| Black background, white text, gold finish time | White background, dark text, subtle borders |

Toggle from the **block toolbar** (🌙/☀️ button) or the **🎨 Theme** sidebar panel.

## Compatibility

- **WordPress**: 6.2+
- **PHP**: 7.4+
- **Tested with**: GeneratePress, GenerateBlocks, Kadence, Astra, Twenty Twenty-Four
- **Works in**: Block editor, Full Site Editor, widget areas

## File Structure

```
endurance-race-block/
├── endurance-race-block.php   # Plugin bootstrap + server-side render
├── editor.js                   # Block editor UI (sidebar controls + preview)
├── view.js                     # Frontend countdown timer
├── style.css                   # Shared styles (dark + light themes)
├── readme.txt                  # WordPress.org directory readme
└── README.md                   # This file
```

## Roadmap

- [ ] Pace calculator (auto-calculate min/km from distance + time)
- [ ] Strava activity link field
- [ ] Personal best indicator (auto-detect PBs across your races)
- [ ] Import from race results CSV
- [ ] Block pattern: full race calendar page layout

## Contributing

Issues and PRs welcome. This started as a personal project for [JefvandeGraaf.com](https://jefvandegraaf.com) and grew into something worth sharing.

## License

GPLv2 or later. See [LICENSE](LICENSE) for details.

---

Built with ☕ in Chiang Mai, Thailand.
