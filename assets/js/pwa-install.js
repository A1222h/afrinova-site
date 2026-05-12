let deferredPrompt;
const banner = document.getElementById('installBanner');
const btnInstall = document.getElementById('btnInstall');

// Événement automatique (quand le navigateur le propose)
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (banner) banner.classList.add('show');
    if (btnInstall) {
        btnInstall.textContent = '📲 Installer maintenant';
        btnInstall.onclick = () => {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('Installation acceptée');
                }
                deferredPrompt = null;
                banner.classList.remove('show');
            });
        };
    }
});

// Si au bout de 3 secondes l'installation auto n'est pas disponible
setTimeout(() => {
    if (!deferredPrompt && banner) {
        banner.classList.add('show');
        if (btnInstall) {
            btnInstall.textContent = '📲 Comment installer';
            btnInstall.onclick = () => {
                // Affiche les instructions dans la bannière elle-même
                banner.innerHTML = `
                    <span>📱 Appuyez sur ⋮ → "Ajouter à l'écran d'accueil"</span>
                    <button id="btnCloseHelp" style="margin-left:10px; padding:8px 16px; background:#000; color:#D4AF37; border:none; border-radius:20px; font-weight:bold; cursor:pointer;">OK</button>
                `;
                document.getElementById('btnCloseHelp').addEventListener('click', () => {
                    banner.classList.remove('show');
                });
            };
        }
    }
}, 3000);

// Vérifie si déjà installée
window.addEventListener('appinstalled', () => {
    if (banner) banner.classList.remove('show');
});
