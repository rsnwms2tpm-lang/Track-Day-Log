# Track Day Log

A mobile-first progressive web app for amateur track-day drivers.

## V1
- Generic first-run experience: add any car, then create track days.
- Garage with tyre size and baseline cold-pressure details.
- Preparation and packing checklists with completion timestamps.
- Session logging for lap time, four hot tyre pressures, fuel, brakes, temperatures, notes and adjustments.
- Fastest-lap summary, end-of-day jobs and notes.
- Track-day history.
- Automatic cloud recovery using a per-user recovery code, with local/offline storage as the primary working copy.
- Manual JSON export/restore as an additional backup.
- Offline-capable PWA with Home Screen manifest and icon.

## Data model
The public app contains no driver-specific or car-specific seed data. Each installation generates its own recovery code and keeps its garage, events and history separate. A user can enter an existing recovery code after reinstalling or on another device to restore their data.

The recovery code should be treated like a password: anyone who has it can restore that workspace.
