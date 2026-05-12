let deferredPrompt;
const banner = document.getElementById('installBanner');
const btnInstall = document.getElementById('btnInstall');

// Événement d'installation natif (Android Chrome)
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    showBanner(true);
});

// Pour iOS : on détecte si l'appareil est en mode standalone
if (window.navigator.standalone) {
    if (banner) banner.classList.remove('show');
} else {
    // On peut afficher une bannière d'aide spécifique pour iOS après un délai
    // Mais pour l'instant, on ne l'affiche pas pour iOS si pas natif (on garde propre)
}

function showBanner(isNative) {
    if (!banner) return;
    if (isNative && deferredPrompt) {
        btnInstall.textContent = '📲 Installer maintenant';
        btnInstall.onclick = () => {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('✅ Installation acceptée');
                }
                deferredPrompt = null;
                banner.classList.remove('show');
            });
        };
        banner.classList.add('show');
    } else {
        // Pas natif : on ne montre rien
        banner.classList.remove('show');
    }
}

// Si après 5 secondes l'événement n'est pas arrivé, on ne fait rien (on attend)
setTimeout(() => {
    // Si pas de deferredPrompt après 5s, on ne montre pas la bannière
    if (!deferredPrompt && banner) {
        banner.classList.remove('show');
    }
}, 5000);

window.addEventListener('appinstalled', () => {
    if (banner) banner.classList.remove('show');
});
