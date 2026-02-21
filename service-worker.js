chrome.action.onClicked.addListener((tab) => {
  let url = tab.url;
  
  // Si estamos en el visor nativo de Chrome, intentamos extraer la URL real del PDF
  if (url.startsWith('chrome-extension://') && url.includes('viewer.html')) {
    const urlParams = new URLSearchParams(new URL(url).search);
    const originalFile = urlParams.get('file');
    if (originalFile) url = originalFile;
  }

  if (url) {
    // Abrimos el visor que ahora está en la raíz
    const viewerUrl = chrome.runtime.getURL('viewer.html') + '?file=' + encodeURIComponent(url);
    chrome.tabs.update(tab.id, { url: viewerUrl });
  }
});
