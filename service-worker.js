chrome.action.onClicked.addListener((tab) => {
  let url = tab.url;
  
  if (url.startsWith('chrome-extension://') && url.includes('viewer.html')) {
    const urlParams = new URLSearchParams(new URL(url).search);
    const originalFile = urlParams.get('file');
    if (originalFile) url = originalFile;
  }

  if (url) {
    // We point to the official nested path
    const viewerUrl = chrome.runtime.getURL('pdfjs/web/viewer.html') + '?file=' + encodeURIComponent(url);
    chrome.tabs.update(tab.id, { url: viewerUrl });
  }
});
