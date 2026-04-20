
## Overview
This is a collection of web development projects and tools, primarily built with modern JavaScript frameworks like React (Vite + TailwindCSS) and browser extensions/scripts. The project showcases portfolio sites, marketing pages, and utility scripts for e-commerce tracking.

## Subprojects

### 1. **lcw.js** (Browser Userscript)
   - **Path**: `lcw.js/lcw.js`
   - **Description**: A userscript for [LC Waikiki](https://www.lcw.com/) website. Tracks recently viewed products (up to top 3), stores details (image, name, price, URL, click count) in `localStorage`. On the main page (after viewing 3+ products), displays a floating drawer sidebar with product cards showing images, names, prices, and click counts. Features smooth animations, hover effects, and toggle drawer with arrow button.
   - **Key Features**:
     - Auto-detects product pages vs. main page.
     - Tracks clicks on product cards.
     - Responsive design (max-width 200px, positioned left side).
     - Uses Font Awesome icons via CDN.
     - CSS injected dynamically.
   - **Usage**:
     1. Install as a userscript in Tampermonkey/Greasemonkey/Violentmonkey.
     2. Visit LCW product pages (tracks automatically).
     3. Return to main page `https://www.lcw.com/` – drawer appears after 3+ products.
     4. Click cards to increment counts and revisit products.
   - **localStorage Key**: `products` (array of product objects).
   - **Demo**: Drawer shows product previews with click stats.


---

*Built with ❤️ for web dev experiments.*

