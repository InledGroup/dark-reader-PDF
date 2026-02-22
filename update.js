document.addEventListener('DOMContentLoaded', async () => {
  const newVersionSpan = document.getElementById('new-version');
  const updateBtn = document.getElementById('update-btn');
  const proceedBtn = document.getElementById('proceed-btn');
  const manualCheckBtn = document.getElementById('manual-check');

  let updateInfo = null;

  async function loadUpdateInfo() {
    const result = await chrome.storage.local.get(['updateInfo']);
    updateInfo = result.updateInfo;
    
    if (updateInfo) {
      const match = updateInfo.id.match(/-v(.+)$/);
      if (match) {
        newVersionSpan.textContent = match[1];
      }
    } else {
      // If we got here but no update is set, maybe it's just a manual check
      document.querySelector('h2').textContent = 'Dark PDF Viewer Pro';
      document.querySelector('p').textContent = 'Everything is up to date!';
      updateBtn.style.display = 'none';
      newVersionSpan.style.display = 'none';
    }
  }

  await loadUpdateInfo();

  updateBtn.addEventListener('click', () => {
    if (updateInfo && updateInfo.url) {
      chrome.tabs.create({ url: updateInfo.url });
    }
  });

  proceedBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'performConversion' });
    window.close();
  });

  manualCheckBtn.addEventListener('click', async () => {
    manualCheckBtn.textContent = 'Checking...';
    manualCheckBtn.disabled = true;

    chrome.runtime.sendMessage({ action: 'manualUpdateCheck' }, async (response) => {
      manualCheckBtn.textContent = 'Check for updates...';
      manualCheckBtn.disabled = false;

      if (response && response.updateAvailable) {
        await loadUpdateInfo();
        document.querySelector('h2').textContent = 'Update Available!';
        document.querySelector('p').style.display = 'block';
        updateBtn.style.display = 'block';
      } else {
        document.querySelector('h2').textContent = 'Up to date!';
        document.querySelector('p').textContent = 'No newer versions found.';
        updateBtn.style.display = 'none';
      }
    });
  });
});
