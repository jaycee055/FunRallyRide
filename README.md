# FunRallyRide

Ride together. Talk live. Nobody gets left behind.

FunRallyRide is a free group-ride app for motorcycle groups, road trips, cycling groups and friends travelling together:

- **Create or join a trip.** The leader shares a code like `RIDE-AB12`; members enter it and wait for the leader's approval.
- **Live shared map** (OpenStreetMap, or satellite imagery from Esri) with a Google Maps–style tilted navigation view, vehicle icons (motorcycle, car, bicycle) that turn with each rider's direction, searchable places and a map pin picker, the route, stops, everyone's position, and the group order from front to back, including the gap between riders.
- **Live open mic.** Group voice goes phone-to-phone with no per-minute cost. The leader can switch to leader-only or mute all.
- **Group chat** with quick messages, location sharing and pinned announcements.
- **Leader controls:** approve or decline, lock the trip, change the destination, add stops, set a meeting point, set the separation alert, make co-leaders, remove members, end the trip.
- **Safety:** falling-behind and signal-lost alerts, SOS with incident type, an "I stopped" / "I arrived" status, and an arrival checklist.
- **Accounts:** sign up with email and password, email confirmation, log in, forgot password, change password, log out and delete account.
- **Profile with no photos:** each person is shown by their **initials and a color**, with a default vehicle.
- **Google-style place search** that suggests places as you type (Photon), focused on the Philippines and sorted by distance from you.

## Get the app

- **Website:** https://jaycee055.github.io/FunRallyRide/ (works on any phone; use "Add to Home Screen")
- **Android app:** [Download RallyRide.apk](https://github.com/jaycee055/FunRallyRide/releases/latest/download/FunRallyRide.apk)

## Costs

Everything runs on free plans with no card on file:

| Part | Service | Free plan |
|---|---|---|
| Trip data, locations, chat | Firebase Realtime Database (Spark) | 100 phones online at once, 1 GB stored, 10 GB/month downloaded |
| Accounts and emails | Firebase Authentication (email/password) | Free |
| Voice | Phone-to-phone (WebRTC) + free STUN | No minute limits |
| Map, search, routes | MapLibre, OpenStreetMap, Nominatim, OSRM | Free (fair use) |
| Satellite view | Esri World Imagery | Free for non-commercial use with attribution |
| Website + Android builds | GitHub Pages + Actions | Free for public repos |

## Setup notes (owner)

1. **Firebase** (project `rallyride-ed714`): the web config is in `FIREBASE_CONFIG` in `index.html`. **Authentication → Email/Password** is enabled. Rules are in `database.rules.json`; after changing them, paste them into **Realtime Database → Rules** and click **Publish**.
2. **Website:** repo **Settings → Pages → Deploy from a branch → main / (root)**.
3. **Android:** every push to `main` builds a signed APK and publishes it under **Releases** (see `.github/workflows/android.yml`).
   - The signing key `android-app/release.keystore` is committed, with a fallback password in the workflow, so that updates install over older versions. Anyone who copies the repo could sign an app with the same key. To lock this down, change the keystore password and add it as the repository secret `KEYSTORE_PASSWORD`.

## Known limits

- **Phone-to-phone voice** works best with up to about 8–10 people talking at once. A few strict mobile networks block it; adding a TURN relay server fixes that.
- **Screen on while riding:** the app keeps the screen awake during a live trip. If the phone locks, location updates pause until the app is opened again.
- **GPS can be wrong or delayed.** The SOS button alerts your group only; it does not call emergency services.
