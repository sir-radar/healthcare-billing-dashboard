# Healthcare Billing Dashboard

A comprehensive healthcare billing dashboard with revenue forecasting, claims management, and payment probability simulations. This project is built using **Next.js**

## Features

- **Dashboard Overview**: Displays key metrics and summaries.
- **Claims Management**: Manage and view claims data.
- **Revenue Forecasting**: Simulate and forecast revenue using Monte Carlo simulations.

---

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) [ShadCN UI](https://ui.shadcn.com/)
- **Charts**: [Recharts](https://recharts.org/) for data visualization
- **Icons**: [Lucide Icons](https://lucide.dev/)
- **Fonts**: Google Fonts (Geist and Geist Mono)
- **Toast Notifications**: [Sonner](https://sonner.dev/)

---

## Setup Instructions

### Prerequisites

- **Node.js**: Ensure you have Node.js installed (v16 or later recommended).
- **Package Manager**: Use `npm` or `yarn`.

### Steps

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/sir-radar/healthcare-billing-dashboard.git
   cd healthcare-billing-dashboard
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Run the Development Server**:
   ```bash
     npm run dev
   ```
4. **Open in Browser**:
   Navigate to `http://localhost:3000` in your web browser.
5. **Build for Production**:
   ```bash
    npm run build
   ```
6. **Start Production Server**:
   ```bash
   npm start
   ```
---


## Codebase Overview

**Folder Structure:**

```

src/
├── app/
│   ├── (dashboard)/          # Dashboard-specific pages and layout
│   │   ├── layout.tsx        # Layout for the dashboard
│   │   ├── page.tsx          # Main dashboard page
│   │   ├── claims/           # Claims management pages
│   │   │   ├── page.tsx      # Claims overview page
│   │   ├── forecasting/      # Revenue forecasting pages
│   │   │   ├── page.tsx      # Forecasting overview page
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
├── components/
│   ├── layout/               # Layout components (Header, Footer, Navigation)
│   ├── dashboard/            # Dashboard-specific components
│   ├── forecasting/          # Forecasting-related components
│   ├── claims/               # Claims-related components
│   ├── ui/                   # UI components (Buttons, etc.)
├── lib/                      # Utility functions
├── types/                    # TypeScript types and interfaces

```

---

**Approach:**

1. Server-Side Rendering (SSR)
The app leverages Next.js's App Router for server-side rendering using sever actions where appropriate.
Dynamic data is fetched server-side to ensure SEO and performance benefits.
2. Client-Side Interactivity
Components like SimulationResults use React hooks (useState, useEffect) for client-side interactivity.
Debouncing is implemented for performance optimization (e.g., in runSimulation).
3. Responsive Design
Tailwind CSS and Shandcn UI is used extensively for responsive layouts and utility-first styling.
Components adapt seamlessly to different screen sizes using Tailwind's responsive utilities.
4. Data Visualization
Recharts is used for interactive and visually appealing charts, such as bar charts and line charts.

---

**License**
This project is licensed under the [MIT License](LICENSE).