# PDF Password Remover

A secure, client-side web application to remove passwords from PDF files. This tool runs entirely in your browser—your documents are never uploaded to a server.

## Features

-   **🔒 Secure & Private**: All processing happens locally in your browser.
-   **⚡ Instant Unlock**: Quickly decrypts password-protected PDFs.
-   **📄 Text Selectability**: Maintains vector data (text remains selectable) using modern decryption methods.
-   **🖨️ Print & Save**: Easily print or save the unlocked version of your document.
-   **🎨 Modern UI**: Clean, responsive interface designed with the Inter font family.

## Tech Stack

-   **Vite**: Fast frontend tooling.
-   **TypeScript**: Type-safe logic.
-   **@cantoo/pdf-lib**: For strict PDF manipulation and advanced decryption (AES-256 support).
-   **print-js**: For reliable printing support.

## Getting Started

### Prerequisites

-   Node.js (latest LTS recommended)
-   Yarn or npm

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/nitch193/pdf-tools.git
    cd pdf-tools
    ```

2.  Install dependencies:
    ```bash
    yarn install
    ```

### Development

Run the development server:
```bash
yarn dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

Build for production:
```bash
yarn build
```

## How to Use

1.  Open the application in your browser.
2.  Click the upload area to select a password-protected PDF.
3.  If detected as encrypted, enter the password.
4.  Click **Unlock Document**.
5.  Once unlocked, use the **Print & Save** button to download or print the unsecured copy.

## License

MIT

## GitHub Pages Deployment

- **Workflow:** A GitHub Actions workflow at `.github/workflows/deploy.yml` builds and deploys the site to GitHub Pages on pushes to `main` (also supports manual `workflow_dispatch`).
- **Build base:** `vite`'s `base` is configurable via the `PAGES_BASE` env var; the workflow sets it to `/pdf-tools/` during the build. To build locally for Pages, run:

```bash
PAGES_BASE=/pdf-tools/ npm run build
```
- **.nojekyll:** The workflow creates `dist/.nojekyll` so Pages serves static files correctly.

If you need a custom domain or different repository name, update `PAGES_BASE` accordingly.
