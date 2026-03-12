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
## Screenshots

### Countdown Timer
![Countdown dark](https://github.com/user-attachments/assets/2e15c9a6-dbe1-412b-8cae-5d7db24d6da2)
![Countdown light](https://github.com/user-attachments/assets/5ceafaff-dad9-4c97-ba8a-3d1f8bbf343b)

### Finisher Results
![Finisher dark](https://github.com/user-attachments/assets/7e121832-23e5-458e-85ef-a5fd46b3e731)
![Finisher light](https://github.com/user-attachments/assets/0b35163d-ff58-4c71-bb2b-f014ab5ce073)

### Dark vs Light
![Dark vs Light](https://github.com/user-attachments/assets/75ff5e58-39cb-4ccd-bd62-e72dd6d2aaaf)

### Block Editor Sidebar
![Event details](https://github.com/user-attachments/assets/2c2147c3-ce3b-4c7a-a844-99226766290a)
![Discipline settings](https://github.com/user-attachments/assets/7acdf849-8e51-4e95-80b3-c4adf35be1e5)
![Post-race results](https://github.com/user-attachments/assets/99c2781c-ec22-4c9f-bb14-719ae05bc8c5)
![Race photo](https://github.com/user-attachments/assets/4f85af34-ba27-41a1-bdbf-5978c776b231)
![Sidebar options](https://github.com/user-attachments/assets/49c31bc1-2417-4f51-9ee8-9cbb212b2d8f)

## Roadmap

- [ ] TBD

## Contributing

Issues and PRs welcome. This started as a personal project for [JefvandeGraaf.com](https://jefvandegraaf.com) and grew into something worth sharing.

## License

GPLv2 or later. See [LICENSE](LICENSE) for details.

---

Built with ☕ in Chiang Mai, Thailand.
