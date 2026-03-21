# BMW M5 CS

## Current State
- Full cinematic BMW M5 CS showcase website
- Sections: Loading, Navbar, Hero, 3D Prototype Viewer, Performance, Track (videos), Design Showcase, Tech, Engine Sound, Gallery, Footer
- Backend has visitor counter and comments; no test drive booking
- TrackSection uses Pixabay MP4 URLs via HTML5 <video> tags (unreliable)
- No "Book Test Drive" form exists

## Requested Changes (Diff)

### Add
- Book Test Drive section: a cinematic full-width form section placed before the Footer
  - Fields: Full Name, Email, Phone, Preferred Date, Preferred Time, Message (optional)
  - Submits to backend; shows success confirmation
  - Admin view: list all bookings (query function, no auth required for MVP)
- Backend: `TestDriveBooking` type and storage; `bookTestDrive()` mutation; `getAllBookings()` query

### Modify
- TrackSection: replace Pixabay MP4 URLs with YouTube iframe embeds using youtube-nocookie.com domain, rel=0, modestbranding=1, no autoplay (user clicks play). Use real BMW M5 CS YouTube video IDs:
  - Burnout & Drift: `WfSE9tSlnps` (BMW M5 CS track video)
  - Drag Race: `_-iKvn8eiaM` (BMW M5 CS drag)
  - Full Review: `QHSRNwBHE04` (BMW M5 CS review)
  Tab switcher and mute toggle remain.

### Remove
- Nothing removed

## Implementation Plan
1. Update Motoko backend: add TestDriveBooking type, bookTestDrive(), getAllBookings()
2. Update TrackSection: swap MP4 <video> for YouTube iframe (youtube-nocookie.com) with tab switcher preserved
3. Create BookTestDriveSection component: glassmorphism form, animated fields, success state, calls backend
4. Add BookTestDriveSection to App.tsx before Footer
5. Update Navbar to include #book-test-drive anchor link
