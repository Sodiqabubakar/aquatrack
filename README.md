# AquaTrack — Water Factory Operations Dashboard

AquaTrack is a UI/UX capstone project designed to help a water sachet/bottle factory move from paper-based tracking to a simple digital dashboard. It gives a **Supervisor** an easy way to log daily production, sales, and expenses, and gives a **Manager** (or the factory owner) a clear, real-time view of how the factory is performing — without either of them needing to touch a spreadsheet.

**Capstone project — eHealth Africa Design Cohort**

## 🔗 Links

- **Live site:** https://sodiqabubakar.github.io/aquatrack/
- **Figma design:** https://www.figma.com/design/IQiz5VZvccT8cnUfvCe2sh/Aqua-track-Design-system

## 💡 The problem

Small water factories typically track production, stock, sales, and expenses in a notebook. This makes it hard for whoever is *not* on the factory floor — a manager or the owner — to know what's actually happening on a given day: how much was produced, whether stock is running low, what came in from sales, and what went out in costs. AquaTrack solves this by giving the person entering the data (the Supervisor) a fast, simple way to log it, and the person checking on the business (the Manager) a live, always-current summary.

## 👥 Users

AquaTrack is built around two roles, chosen at login:

- **Supervisor** — logs the day's opening figures, production runs, sales, and expenses as they happen. Has full access to all the "Add" forms.
- **Manager** — a read-only view of the same data. Sees the dashboard, production, sales, and expenses lists, but cannot add or edit entries. This role also covers the **factory owner/CEO**, since her needs (checking on operations without entering data herself) are identical to a manager's — she simply logs in with the Manager role.

## ✨ Features

- **Role-based login** — choose Supervisor or Manager at sign-in; the interface adapts accordingly (Manager's "Add" panels are hidden)
- **Dashboard** — live totals for production, current stock, sales, and expenses, plus a recent activity feed and stock level indicator that update immediately after any entry is saved
- **Opening Figures** — Supervisor sets the day's starting cash and stock, which the dashboard's stock and cash-on-hand calculations are built from
- **Production** — log a production run (machine, good bags, damaged bags); each save appends a new record to the list and updates the dashboard
- **Sales** — record a sale (customer, quantity, price, payment status); the total is calculated automatically as you type, and the sale is added to the sales list
- **Expenses** — log a cost by category (Diesel, Petrol, Maintenance, etc.) with an amount and description
- **Reset All Figures** — a manual, confirmation-gated way to clear all saved data and start fresh
- **Data persistence** — all figures are saved with `localStorage`, so they remain after closing or refreshing the browser

## 🛠️ Built with

- **Figma** — UI design and component system
- **HTML5 & CSS3** — structure and styling, custom design system, no framework
- **Vanilla JavaScript** — form handling, `localStorage` persistence, live calculations, role-based view logic
- **Git & GitHub** — version control
- **GitHub Pages** — deployment

## 📁 Project structure

```
aquatrack/
├── index.html         # Login screen (role selection: Supervisor / Manager)
├── dashboard.html      # Main dashboard — opening figures, live totals, activity
├── production.html     # Production list + add-production form
├── sales.html          # Sales list + record-sale form
├── expenses.html       # Expenses list + add-expense form
├── style.css           # Shared design system & styles
├── app.js              # Shared interactivity, data model, role logic
└── README.md
```

## 🚀 Running locally

1. Clone the repo:
   ```
   git clone https://github.com/sodiqabubakar/aquatrack.git
   ```
2. Open `index.html` in your browser — no build step, server, or dependencies needed
3. Choose **Supervisor** or **Manager** at login, then click Log in
4. Try logging a Production entry, a Sale, and an Expense as Supervisor, then switch roles ("Switch role" link) to see the Manager's read-only view of the same data

## 🎨 Design system

| Token | Value |
|---|---|
| Primary blue | `#2563EB` |
| Background | `#F8FAFC` |
| Success (paid/completed) | `#16A34A` |
| Warning (pending) | `#D97706` |
| Danger (expenses) | `#DC2626` |

## 🔮 Planned enhancements

- **Date-filtered history view** — a "History" screen where the Manager can look back at a previous day's figures (e.g. yesterday's production/sales/expenses), not just the running total. This would need each entry to be logged with a timestamp rather than only accumulated into a single total. Designed as a concept, not yet in the submitted Figma or this build.
- Real authentication instead of a role-selector (separate accounts/passwords per user)
- Persisting data to a real backend/database instead of `localStorage`, so figures sync across devices

## 👨🏾‍💻 Author

Designed and built by Sodiq Abubakar as part of the eHealth Africa Design Cohort Capstone Project.
