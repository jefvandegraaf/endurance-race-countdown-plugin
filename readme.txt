=== Endurance Race Block ===
Contributors: jefvandegraaf
Tags: countdown, triathlon, running, endurance, race, timer, sports, ironman
Requires at least: 6.2
Tested up to: 6.7
Requires PHP: 7.4
Stable tag: 1.1.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Beautiful countdown cards for triathlon and endurance events. Live timer, finisher results with split times, race photos, and dark/light themes.

== Description ==

Endurance Race Block is a WordPress block for triathletes, runners, and endurance athletes who want to showcase their race calendar and results on their website.

Each card works in three automatic modes:

**Upcoming races** show a live countdown timer ticking down to race day.

**Awaiting results** appears automatically once the event date passes — no action needed.

**Finisher mode** activates when you add your results after the race, displaying your finish time, overall rank, age group rank, split times, and a race finish photo.

= Features =

* Live countdown timer with days, hours, minutes, and seconds
* Swim / Bike / Run discipline toggles with configurable distances
* Works for any event type: Sprint, Olympic, Half-Course, Full, Ultra, Trail, or Custom
* Post-race results: total time, overall rank, age group rank
* Split times displayed in compact badges (Swim, T1, Bike, T2, Run)
* Race finish photo from your Media Library
* Clickable cards linking to race recaps or event pages
* Dark theme (black) and Light theme (white) with one-click toggle
* Inherits your theme typography — no font conflicts
* Fully responsive — disciplines always display side by side
* No build step, no webpack, no node — just upload and activate
* Works inside GenerateBlocks grids, Kadence columns, or standalone

= How It Works =

1. Add the "Endurance Race Block" to any page or post
2. Fill in the event details in the sidebar: title, location, date, type, distances
3. The card automatically shows a live countdown
4. After the race, set the status to "Finisher" and add your times
5. Upload a race photo and link to your blog recap

= Use Cases =

* Personal race calendar on your triathlon blog
* Race results portfolio page
* Upcoming events widget in a sidebar
* Training motivation with visible countdown to your next goal race

== Installation ==

1. Upload the `endurance-race-block` folder to `/wp-content/plugins/`
2. Activate the plugin through the Plugins menu in WordPress
3. In the block editor, search for "Endurance Race Block" and insert the block
4. Configure your event using the sidebar panels

Or install directly: Plugins → Add New → Upload Plugin → select the ZIP file → Install → Activate.

== Frequently Asked Questions ==

= Do I need to edit any code? =

No. Everything is controlled from the WordPress block editor sidebar. Title, location, date, distances, results, photos, and theme are all point-and-click fields.

= Can I show multiple races on one page? =

Yes. Each race is its own block instance. Add as many as you want. They work great inside column layouts or grid containers like GenerateBlocks.

= How do I add split times? =

In the Results panel, use the Splits field with this format:
`Swim:33:42, T1:12:29, Bike:1:28:56, T2:7:59, Run:1:15:56`

Labels and times separated by a colon, each split separated by a comma.

= What happens when the countdown reaches zero? =

The card automatically shows "Awaiting results..." until you set the status to Finisher (or DNF/DNS) in the Results panel.

= Can I use this for running-only events? =

Absolutely. Toggle off Swim and Bike in the Disciplines panel, and only the Run leg will display. Works for any combination.

= Does the timer tick in real-time on the frontend? =

Yes. The countdown updates every second on the live site. In the editor, it shows a static snapshot.

= Will it use my theme's font? =

Yes. The block uses `font-family: inherit` so it picks up whatever typography your theme loads — GeneratePress, Kadence, Astra, or any other theme.

== Screenshots ==

1. Upcoming race with live countdown timer (dark theme)
2. Finisher card with results, splits, and race photo
3. Block editor sidebar with all configurable fields
4. Dark and light theme comparison
5. Multiple cards in a grid layout

== Changelog ==

= 1.1.0 =
* Added dark/light theme toggle
* Fixed block editor clickability with proper useBlockProps
* Disciplines now always display side by side (no wrapping)
* Font inherits from theme (no hardcoded font-family)
* Added block toolbar theme switcher
* Renamed from Race Countdown to Endurance Race Block

= 1.0.0 =
* Initial release
* Live countdown timer
* Finisher results with split times
* Race photo support via Media Library
* Clickable card links
* Swim/Bike/Run discipline toggles

== Upgrade Notice ==

= 1.1.0 =
Adds dark/light theme toggle, fixes block editor selection, and inherits theme fonts. Recommended update.
