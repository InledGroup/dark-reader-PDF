document.addEventListener('DOMContentLoaded', () => {
  const checkUpdatesBtn = document.getElementById('checkUpdates');
  if (checkUpdatesBtn) {
    checkUpdatesBtn.addEventListener('click', () => {
      // Show loading indicator in button if possible, but alert is simpler for now
      checkUpdatesBtn.disabled = true;
      const originalText = checkUpdatesBtn.querySelector('span').textContent;
      checkUpdatesBtn.querySelector('span').textContent = 'Checking...';

      chrome.runtime.sendMessage({ action: 'manualUpdateCheck' }, (response) => {
        checkUpdatesBtn.disabled = false;
        checkUpdatesBtn.querySelector('span').textContent = originalText;

        if (response && response.updateAvailable) {
          const version = response.updateInfo.id.split('-v')[1];
          if (confirm(`A new version (v${version}) is available! Would you like to update now?`)) {
            window.open(response.updateInfo.url, '_blank');
          }
        } else {
          alert('You are up to date (v' + chrome.runtime.getManifest().version + ').');
        }
      });
    });
  }
});
