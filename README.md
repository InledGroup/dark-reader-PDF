# 🌙 Dark PDF Viewer Pro v4.1.1

![Versión](https://img.shields.io/badge/version-4.1.1-blueviolet)
![Manifest](https://img.shields.io/badge/manifest-V3-orange)
![Licencia](https://img.shields.io/badge/License-GNU%20GPLv3-red.svg)

> [!CAUTION]
> Este proyecto está en una fase beta por lo que no lo recomendamos para producción actualmente. Sigue la actualidad de este y otros proyectos de Inled Group en [nuestra newsletter](https://link.inled.es/newsletter-sub1).

**Dark PDF Viewer Pro** es la solución definitiva para los amantes de la lectura nocturna. Esta extensión de navegador permite abrir un PDF en un visor completamente oscuro, elegante y con un **tema oscuro nativo** que protege tu vista sin comprometer la legibilidad del documento.

---

## ✨ Características Principales

*   🌑 **Modo Oscuro Nativo:** Interfaz diseñada desde cero para entornos de baja luminosidad.
*   🚀 **Alto Rendimiento:** Basado en la potente librería `PDF.js`, garantizando una carga rápida y fluida.
*   🛡️ **Privacidad Total:** No requiere permisos innecesarios. Tus documentos se procesan localmente en tu navegador.
*   🎨 **Interfaz Limpia:** Minimalismo enfocado en el contenido, eliminando distracciones visuales.
*   🌍 **Soporte Multilingüe:** Compatible con diversos idiomas y juegos de caracteres (CMap).

---

## 🛠️ Tecnologías Utilizadas

Este proyecto aprovecha lo último en tecnologías web para extensiones:

*   **Manifest V3:** Arquitectura moderna siguiendo los estándares de seguridad de Chrome.
*   **PDF.js:** Motor de renderizado de PDFs líder en la industria.
*   **Service Workers:** Gestión eficiente de recursos en segundo plano.

---

## 📥 Instalación (Modo Desarrollador)

Si deseas probar la extensión localmente, sigue estos pasos:

1.  Clona este repositorio o descarga el código fuente.
2.  Abre tu navegador (Chrome, Edge o Brave) y ve a la página de extensiones: `chrome://extensions/`.
3.  Activa el **"Modo de desarrollador"** en la esquina superior derecha.
4.  Haz clic en **"Cargar descomprimida"** y selecciona la carpeta raíz de este proyecto.
5.  ¡Listo! Abre cualquier archivo PDF para disfrutar de la experiencia Pro.

---

## 📂 Estructura del Proyecto

```text
├── manifest.json        # Configuración de la extensión (MV3)
├── service-worker.js    # Lógica de fondo y gestión de pestañas
├── icons/               # Activos visuales de la extensión
└── pdfjs/               # Núcleo del visualizador de PDF
    ├── build/           # Archivos binarios de PDF.js
    └── web/             # Interfaz de usuario (HTML/CSS/JS)
```

---

## 📄 Licencia

Este proyecto se distribuye bajo la licencia **MIT**. Consulta el archivo `LICENSE` en la carpeta `pdfjs` para más detalles sobre los componentes de terceros.

---

<p align="center">
  Hecho con ❤️ para ti.
</p>
