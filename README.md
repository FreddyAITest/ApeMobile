# Ape-solutely · Mensa shuttle for the Agile Design Lab

An interactive, mobile-first prototype of **Ape-solutely**, a Mensa pre-order
shuttle for students and faculty at the **Agile Design Lab (ADL)**.

Stakeholders scan a QR code, browse what the Ape offers and can run through the
whole pre-order flow — including a demo checkout and a generated pickup QR code.

Live demo: [https://ape-solutely-mensa.netlify.app](https://ape-solutely-mensa.netlify.app)

---

## Quick start

Requires **Node.js 18+**.

```bash
npm install
npm run dev
# http://localhost:5173/
```

Production build:

```bash
npm run build
# output in ./dist
```

---

## What's in the prototype

1. **Menu overview**
   - Five Mensa dishes plus coffee, cold drinks and treats from the Ape sideboard.
   - Clear vegan, vegetarian and gluten-free badges.
   - Allergen information on every item and in the item details.

2. **Break timeslot**
   - Break 1 (12:00), Break 2 (13:00) and Break 3 (13:45) with order cut-offs.

3. **Demo checkout**
   - Add items, adjust quantities, pick a timeslot.
   - Enter a pickup name and choose MensaCard, Apple Pay or card.
   - No real payment is taken; the flow is simulated.

4. **Pickup confirmation**
   - Randomly generated order number, PIN and heated box.
   - A locally generated QR code that can be saved and shown at the Ape.

---

## Tech stack

- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS + Lucide Icons
- **QR code:** `qrcode`
- **PWA / mobile:** iOS standalone web app support with safe-area insets and manifest
- **Deployment:** Netlify (`netlify.toml` included)

---

## Notes

This is an early prototype. Allergen information is indicative, and the pickup
QR code does not unlock a real box.
