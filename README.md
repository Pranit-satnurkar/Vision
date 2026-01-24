
# ⚡ Pranit - AI/ML Engineer Portfolio

![Portfolio Preview](https://github.com/user-attachments/assets/placeholder-image)
*(Replace with actual screenshot)*

A next-generation portfolio interface designed for the modern Data Analyst & AI Engineer. Built with **"VisionOS Glass"** aesthetics, featuring deep translucency, fluid animations, and a workstation-inspired split-screen layout.

## 🔮 The Console Architecture
*   **VisionOS Aesthetics**: High-blur glass panels (`backdrop-blur-xl`), floating navigation pills, and depth-rich lighting effects.
*   **Dual-Panel Layout**: A fixed "Control Center" for identity and a scrollable "Data Feed" for content.
*   **System Interactions**: Elements behave like OS components — "loading" modules, executing projects, and responding to cursor proximity.
*   **Smart Identity**: Centralized identity management powered by `bio.json`.

## 🛠️ Tech Stack
*   **Framework**: Next.js 16 (App Router)
*   **Styling**: Tailwind CSS v4 + Custom Utility Classes
*   **Motion**: Framer Motion 12 + Lenis Smooth Scroll
*   **UI Primitives**: Radix UI (Slot, Dialog, Separator)
*   **Icons**: Lucide React
*   **Fonts**: Geist Sans & Geist Mono
*   **Deployment**: Vercel

## 🚀 Getting Started

1.  **Clone the repository**
    ```bash
    git clone https://github.com/Pranit-satnurkar/ai-portfolio.git
    cd ai-portfolio
    ```

2.  **Install dependencies**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  **Open locally**
    Navigate to `http://localhost:3000`.

## 📂 Project Structure
*   `/app`: Next.js App Router pages and global layouts.
*   `/components`: Reusable UI components (Navbar, Cards, Buttons).
*   `/sections`: Logic-heavy page sections (Hero, About, Projects).
*   `/data`: JSON-based CMS (`bio.json`, `projects.json`, `experience.json`).
*   `/hooks`: Custom React hooks (audio engine, scroll handling).

## 📄 License
MIT License.
