// Gestion de l'installation PWA – bannière toujours visible
let deferredPrompt;
const banner = document.getElementById('installBanner');
const btnInstall = document.getElementById('btnInstall');

// Écoute l'événement avant installation (disponible après une courte utilisation)
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    // Affiche la bannière avec le bouton
    if (banner) banner.classList.add('show');
});

// Si la bannière n'est pas encore affichée après 3 secondes, on l'affiche quand même
setTimeout(() => {
    if (!deferredPrompt && banner) {
        banner.classList.add('show');
        if (btnInstall) {
            btnInstall.textContent = '📲 Ajouter à l\'écran d\'accueil';
            btnInstall.onclick = showManualInstall;
        }
    }
}, 3000);

// Affiche la bannière immédiatement si déjà installé ? Non, on garde juste pour l'installation.
// Bouton cliqué dans la bannière
if (btnInstall) {
    btnInstall.addEventListener('click', () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('Installation acceptée');
                }
                deferredPrompt = null;
                banner.classList.remove('show');
            });
        } else {
            showManualInstall();
        }
    });
}

function showManualInstall() {
    alert('Pour installer l\'application :\n1. Appuyez sur les 3 points ⋮ en haut à droite du navigateur.\n2. Sélectionnez "Ajouter à l\'écran d\'accueil" ou "Installer l\'application".');
}

// Vérifie si l'application est déjà installée (ne plus afficher la bannière)
window.addEventListener('appinstalled', () => {
    if (banner) banner.classList.remove('show');
    console.log('Application installée');
});
