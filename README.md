# 🌙 Dark PDF Viewer Pro v4.1.1

![Version](https://img.shields.io/badge/version-4.1.1-blueviolet)
![Manifest](https://img.shields.io/badge/manifest-V3-orange)
![License](https://img.shields.io/badge/License-GNU%20GPLv3-red.svg)

> [!CAUTION]
> This project is in a beta phase, so we do not currently recommend it for production. Stay up to date with this and other Inled Group projects on [our newsletter](https://link.inled.es/newsletter-sub1).

**Dark PDF Viewer Pro** is the definitive solution for night reading enthusiasts. This browser extension allows you to open a PDF in a completely dark, elegant viewer with a **native dark theme** that protects your eyesight without compromising document readability.

---

## ✨ Main Features

*   🌑 **Native Dark Mode:** Interface designed from scratch for low-light environments.
*   🚀 **High Performance:** Based on the powerful `PDF.js` library, ensuring fast and smooth loading.
*   🛡️ **Total Privacy:** No unnecessary permissions required. Your documents are processed locally in your browser.
*   🎨 **Clean Interface:** Minimalism focused on content, eliminating visual distractions.
*   🌍 **Multilingual Support:** Compatible with various languages and character sets (CMap).

---

## 🛠️ Technologies Used

This project leverages the latest in web technologies for extensions:

*   **Manifest V3:** Modern architecture following Chrome security standards.
*   **PDF.js:** Industry-leading PDF rendering engine.
*   **Service Workers:** Efficient background resource management.

---

## 📥 Installation (Developer Mode)

To try the extension locally, follow these steps:

1.  Clone this repository or download the source code.
2.  Open your browser (Chrome, Edge, or Brave) and go to the extensions page: `chrome://extensions/`.
3.  Activate **"Developer mode"** in the upper right corner.
4.  Click **"Load unpacked"** and select the root folder of this project.
5.  Done! Open any PDF file to enjoy the Pro experience.

---

## 📂 Project Structure

```text
├── manifest.json        # Extension configuration (MV3)
├── service-worker.js    # Background logic and tab management
├── icons/               # Visual assets for the extension
└── pdfjs/               # PDF viewer core
    ├── build/           # PDF.js binary files
    └── web/             # User interface (HTML/CSS/JS)
```

---

## 📄 License

This project is distributed under the **MIT** license. Check the `LICENSE` file in the `pdfjs` folder for more details on third-party components.

---

<p align="center">
  Made with ❤️ for you.
</p>
