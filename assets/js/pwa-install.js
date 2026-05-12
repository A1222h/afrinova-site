let deferredPrompt;
const banner = document.getElementById('installBanner');
const btnInstall = document.getElementById('btnInstall');

// Écoute l'événement natif (survient après quelques secondes d'interaction)
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    // Affiche la bannière UNIQUEMENT quand l'installation est possible en un clic
    if (banner) banner.classList.add('show');
    if (btnInstall) {
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
    }
});

// Si après 10 secondes l'événement n'est toujours pas arrivé, on cache la bannière définitivement
setTimeout(() => {
    if (!deferredPrompt && banner) {
        banner.classList.remove('show');
    }
}, 10000);

// Cache la bannière si l'application est déjà installée
window.addEventListener('appinstalled', () => {
    if (banner) banner.classList.remove('show');
});
