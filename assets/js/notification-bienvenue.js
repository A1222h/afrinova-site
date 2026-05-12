// Notification de bienvenue Afrinova Tech
(function() {
    // On attend 5 secondes pour ne pas surprendre immédiatement
    setTimeout(function() {
        // Vérifier si les notifications sont déjà acceptées
        if (Notification.permission === "granted") {
            new Notification("Afrinova Tech", {
                body: "L'Afrique innove, le monde avance. Besoin d'un site ou d'une application ? Demandez votre devis gratuit !",
                icon: "assets/images/logo.png",
                badge: "assets/images/logo.png",
                vibrate: [200, 100, 200]
            });
        } else if (Notification.permission !== "denied") {
            // Demander la permission
            Notification.requestPermission().then(function(permission) {
                if (permission === "granted") {
                    new Notification("Afrinova Tech", {
                        body: "Merci de votre intérêt ! Découvrez nos services et réalisations.",
                        icon: "assets/images/logo.png",
                        badge: "assets/images/logo.png",
                        vibrate: [200, 100, 200]
                    });
                }
            });
        }
    }, 5000);
})();
