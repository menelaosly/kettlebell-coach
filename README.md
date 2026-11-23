# Kettlebell Coach (PWA)

An installable, offline version of the trainer: calendar, workout list, WOD clock with beeps, animated movement demos and a workout log.

## Put it online (free, about 2 minutes)

A PWA has to be served over HTTPS, so host this folder somewhere. Easiest:

1. Unzip, so you have a folder containing `index.html`.
2. Open https://app.netlify.com/drop and drag the whole folder onto the page.
3. Netlify gives you an `https://….netlify.app` link. (Make a free account to keep it permanently.)

Also works on GitHub Pages or Cloudflare Pages. Upload the folder contents as-is.

## Install it on your phone

- **iPhone (Safari):** open the link → Share → **Add to Home Screen**.
- **Android (Chrome):** open the link → ⋮ menu → **Install app** (or **Add to Home screen**).

After the first visit it works with no signal.

## Your data

- Your plan and log live on that phone, in that browser.
- Back up from **Log → Settings → Export backup**. Restore or move to another device with **Import backup**.
- On iPhone, deleting the home-screen app also deletes its data. Export first.

## Updating

If you change `index.html`, bump `VERSION` in `sw.js` (e.g. `kb-coach-v2`) and re-upload. The app picks up the new version on the next launch.

## Notes

- Sound starts after your first tap (browser rule). Keep the app open during a workout. Phones pause web apps when the screen locks or you switch apps.
- The screen stays awake during a workout on browsers that support it.
