# ClinicFlow

MVP demo app for **ClinicFlow**, a clinic/SaaS management platform. Built off the Stitch design mockups in `../stitch_clinicflow_saas_platform/`. No backend, no database — data starts from a seeded demo dataset and is saved to your browser's `localStorage`, so any changes you make persist across reloads. Clear site data to reset back to the seed.

## Stack

React 19 + TypeScript + Vite + Tailwind v4 + React Router v7.

## Getting started

```
npm install
npm run dev      # start dev server
npm run build    # type-check + production build
npm run preview  # preview a production build
npm run lint     # oxlint
```

Root route `/` is a staff login screen (demo — any email/password signs you in). `/book` is a public patient online-booking portal. Everything else lives behind login, inside the app shell.

## Features

- **Dashboard** — today's appointments, waiting count, revenue, doctor status
- **Calendar** — day view schedule grid per doctor, new appointment booking
- **Waiting Room** — live queue, move patients through waiting → in-consultation → completed
- **Patients** — directory + per-patient profile with visit history and billing
- **Doctors & Schedules** — roster, availability, today's appointments per doctor
- **Billing & Payments** — invoices, mark as paid
- **Reports & Analytics** — visit trends, revenue, appointments by doctor
- **Communication & Reminders** — send/log patient reminders (WhatsApp/SMS/email)
- **Online Booking Portal** (`/book`) — public-facing self-service appointment booking

## Architecture

- `src/data/` — seed data and types for doctors, patients, appointments, queue, invoices, messages
- `src/state/store.tsx` — single `ClinicProvider` React Context holding all app state, persisted to `localStorage` on every change, with actions (`addAppointment`, `advanceQueueStatus`, `markInvoicePaid`, `sendMessage`, `login`/`logout`, etc.)
- `src/components/Layout.tsx` — persistent sidebar + header shell for authenticated routes
- `src/pages/` — one page per screen, routed in `src/App.tsx`
- Design tokens (colors, spacing, type scale) are ported from `harmony_clinical_precision/DESIGN.md` into a Tailwind `@theme` block in `src/index.css`
