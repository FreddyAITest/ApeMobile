# Ape-solutely • Mensa Break Stand @ ADL

An interactive mobile-first prototype for the **Ape-solutely** Mensa pre-order shuttle service designed for students and faculty at the **Agile Design Lab (ADL)**.

Live Demo: [https://ape-solutely-mensa.netlify.app](https://ape-solutely-mensa.netlify.app)

---

## 🚀 Quick Start

Ensure you have **Node.js** (v18+) installed.

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Open in browser
# http://localhost:5173/
```

### Production Build
```bash
npm run build
# Built files are generated in ./dist
```

---

## 🛵 Key Features

1. **🕒 Break Timeslot Pre-Order (12:00 – 14:00)**:
   - Break 1 (12:00 – 12:25)
   - Break 2 (13:00 – 13:25)
   - Break 3 (13:45 – 14:10)
   - Real-time cut-off countdowns and capacity limits.

2. **☕ The Ape Sideboard (Upsell Station)**:
   - Left-side hatch of the Piaggio Ape featuring fresh barista espresso & oat milk flat whites, chilled Berlin Club-Mate (0.5L) & Fritz-Kola, and certified sealed vegan/GF treats.
   - Combo deal: Add coffee + sweet to save €1.00.

3. **🗺️ Live Campus GPS Tracker (Lieferando / UberEats style)**:
   - Interactive vector campus map following the route from Central Mensa to the ADL entrance.
   - Animated Piaggio Ape vehicle, ETA countdown, and 4-step progress stepper.
   - Contactless pickup PIN (`#4288`) and scannable QR code for rapid ≤ 5 min break turnaround.

4. **💳 Student Profile & MensaCard**:
   - Digital MensaCard balance top-up simulation.
   - Subsidized pricing tier toggles (Student, Staff, Guest).
   - Strict dietary locks (Vegan, Coeliac/Gluten-Free, Lactose-Free).
   - Digital receipts and 1-click reorder.

---

## 🛠️ Tech Stack
- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS + Lucide Icons
- **PWA / Mobile:** iOS standalone web app support with safe-area insets and manifest
- **Deployment:** Netlify (`netlify.toml` included)
