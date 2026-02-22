const UPDATE_API_URL = 'https://extupdater.inled.es/api/updates.json';
const EXTENSION_ID_BASE = 'dark-pdf-viewer-pro';
const UPDATE_CHECK_ALARM = 'daily-update-check';
const MANUAL_CHECK_MENU_ID = 'manual-update-check-menu';

// Function to convert version string to numeric array for comparison
function parseVersion(versionString) {
  return versionString.split('.').map(Number);
}

// Function to compare versions (returns true if v2 > v1)
function isNewerVersion(v1, v2) {
  const v1Parts = parseVersion(v1);
  const v2Parts = parseVersion(v2);
  for (let i = 0; i < Math.max(v1Parts.length, v2Parts.length); i++) {
    const p1 = v1Parts[i] || 0;
    const p2 = v2Parts[i] || 0;
    if (p2 > p1) return true;
    if (p2 < p1) return false;
  }
  return false;
}

async function checkForUpdates() {
  try {
    const response = await fetch(UPDATE_API_URL);
    if (!response.ok) throw new Error('Network response was not ok');
    const updates = await response.json();
    const currentVersion = chrome.runtime.getManifest().version;
    
    // Search for an entry that matches our extension name and version (including same version)
    const update = updates.find(u => {
      const match = u.id.match(new RegExp(`^${EXTENSION_ID_BASE}-v(.+)$`));
      if (match) {
        const foundVersion = match[1];
        // Trigger if it's a newer version OR the same version (as requested)
        return isNewerVersion(currentVersion, foundVersion) || currentVersion === foundVersion;
      }
      return false;
    });

    if (update) {
      await chrome.storage.local.set({ updateInfo: update });
      chrome.action.setPopup({ popup: 'update.html' });
      chrome.action.setBadgeText({ text: '!' });
      chrome.action.setBadgeBackgroundColor({ color: '#FF0000' });
      return update;
    } else {
      await chrome.storage.local.remove('updateInfo');
      chrome.action.setPopup({ popup: '' });
      chrome.action.setBadgeText({ text: '' });
      return null;
    }
  } catch (error) {
    console.error('Update check failed:', error);
    return null;
  }
}

// Set up the alarm for daily checks
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === UPDATE_CHECK_ALARM) {
    checkForUpdates();
  }
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create(UPDATE_CHECK_ALARM, { periodInMinutes: 1440 }); // Every 24 hours
  checkForUpdates();
  
  // Create context menu for manual check
  chrome.contextMenus.create({
    id: MANUAL_CHECK_MENU_ID,
    title: "Check for Updates",
    contexts: ["action"]
  });
});

chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === MANUAL_CHECK_MENU_ID) {
    checkForUpdates().then((update) => {
      if (update) {
        // Notify the user or just open the popup if possible?
        // We can't force the popup to open programmatically from background easily in all versions,
        // but we've already set the badge and the popup for next click.
        chrome.notifications.create({
          type: 'basic',
          iconUrl: 'icons/icon48.png',
          title: 'Update Found!',
          message: 'A new version of Dark PDF Viewer Pro is available.'
        });
      } else {
        chrome.notifications.create({
          type: 'basic',
          iconUrl: 'icons/icon48.png',
          title: 'Up to date',
          message: 'You are using the latest version of Dark PDF Viewer Pro.'
        });
      }
    });
  }
});

chrome.runtime.onStartup.addListener(() => {
  // Verify if there was a pending update
  chrome.storage.local.get(['updateInfo'], (result) => {
    if (result.updateInfo) {
      chrome.action.setPopup({ popup: 'update.html' });
      chrome.action.setBadgeText({ text: '!' });
      chrome.action.setBadgeBackgroundColor({ color: '#FF0000' });
    } else {
      chrome.action.setPopup({ popup: '' });
      chrome.action.setBadgeText({ text: '' });
    }
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'performConversion') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        performConversion(tabs[0]);
      }
    });
    return true;
  }
  if (message.action === 'manualUpdateCheck') {
    checkForUpdates().then((update) => {
      sendResponse({ updateAvailable: !!update, updateInfo: update });
    });
    return true; // Keep the message channel open for async response
  }
});

function performConversion(tab) {
  let url = tab.url;
  
  if (url.startsWith('chrome-extension://') && url.includes('viewer.html')) {
    const urlParams = new URLSearchParams(new URL(url).search);
    const originalFile = urlParams.get('file');
    if (originalFile) url = originalFile;
  }

  if (url) {
    const viewerUrl = chrome.runtime.getURL('pdfjs/web/viewer.html') + '?file=' + encodeURIComponent(url);
    chrome.tabs.update(tab.id, { url: viewerUrl });
  }
}

chrome.action.onClicked.addListener((tab) => {
  performConversion(tab);
});
