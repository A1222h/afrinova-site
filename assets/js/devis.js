// ============ CALCULATEUR DE DEVIS ============
document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('devisForm');
    var projectTypes = document.querySelectorAll('input[name="projectType"]');
    var optionCheckboxes = document.querySelectorAll('input[name="options"]');
    var pagesSlider = document.getElementById('pagesSlider');
    var pagesValue = document.getElementById('pagesValue');
    var pagesSection = document.getElementById('pagesSection');
    
    var basePrice = 0;
    
    // Gestion type de projet
    projectTypes.forEach(function(radio) {
        radio.addEventListener('change', function() {
            basePrice = parseInt(radio.getAttribute('data-price'));
            
            var type = radio.value;
            if (type === 'site' || type === 'ecommerce') {
                pagesSection.style.display = 'block';
            } else {
                pagesSection.style.display = 'none';
            }
            
            updateTotal();
        });
    });
    
    // Gestion options
    optionCheckboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', updateTotal);
    });
    
    // Gestion pages
    if (pagesSlider) {
        pagesSlider.addEventListener('input', function() {
            pagesValue.textContent = pagesSlider.value;
            updateTotal();
        });
    }
    
    function updateTotal() {
        var total = basePrice;
        
        var optionsTotal = 0;
        optionCheckboxes.forEach(function(cb) {
            if (cb.checked) {
                optionsTotal += parseInt(cb.getAttribute('data-price'));
            }
        });
        total += optionsTotal;
        
        var pagesTotal = 0;
        if (pagesSection.style.display === 'block') {
            var pages = parseInt(pagesSlider.value);
            if (pages > 5) {
                pagesTotal = (pages - 5) * 50000;
                document.getElementById('pagesRecap').style.display = 'flex';
            } else {
                document.getElementById('pagesRecap').style.display = 'none';
            }
        }
        total += pagesTotal;
        
        document.getElementById('basePrice').textContent = basePrice.toLocaleString() + ' F';
        document.getElementById('totalPrice').textContent = total.toLocaleString() + ' F CFA';
        
        if (optionsTotal > 0) {
            document.getElementById('optionsRecap').style.display = 'flex';
            document.getElementById('optionsPrice').textContent = '+ ' + optionsTotal.toLocaleString() + ' F';
        } else {
            document.getElementById('optionsRecap').style.display = 'none';
        }
        
        document.getElementById('pagesPrice').textContent = '+ ' + pagesTotal.toLocaleString() + ' F';
    }
    
    // Soumission formulaire
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        var name = document.getElementById('devisName').value;
        var email = document.getElementById('devisEmail').value;
        var phone = document.getElementById('devisPhone').value;
        var company = document.getElementById('devisCompany').value;
        var message = document.getElementById('devisMessage').value;
        var total = document.getElementById('totalPrice').textContent;
        
        // Type de projet sélectionné
        var selectedProjectType = '';
        projectTypes.forEach(function(radio) {
            if (radio.checked) {
                var typeCard = radio.closest('.project-type-card');
                if (typeCard) {
                    var typeName = typeCard.querySelector('.type-name');
                    if (typeName) {
                        selectedProjectType = typeName.textContent;
                    }
                }
            }
        });
        
        // === SAUVEGARDE POUR L'ADMIN ===
        var messages = JSON.parse(localStorage.getItem('afrinova_messages') || '[]');
        messages.push({
            date: new Date().toISOString(),
            name: name,
            email: email,
            phone: phone,
            service: 'Devis - ' + selectedProjectType,
            message: 'DEVIS DEMANDÉ\nEntreprise: ' + (company || 'Non spécifié') + '\nTotal estimé: ' + total + '\n\nMessage:\n' + message,
            type: 'devis',
            status: 'new'
        });
        localStorage.setItem('afrinova_messages', JSON.stringify(messages));
        
        // Message WhatsApp
        var devisMessage = 
            '📋 *DEMANDE DE DEVIS*\n\n' +
            '👤 Nom: ' + name + '\n' +
            '📧 Email: ' + email + '\n' +
            '📱 Tél: ' + phone + '\n' +
            '🏢 Entreprise: ' + (company || 'Non spécifié') + '\n' +
            '📦 Service: ' + selectedProjectType + '\n' +
            '💰 Total estimé: ' + total + '\n\n' +
            '📝 Description: ' + message + '\n\n' +
            '_Devis généré sur afrinova.tech_';
        
        if (confirm('Recevoir ce devis par WhatsApp ? (OK = Oui, Annuler = Email)')) {
            window.open('https://wa.me/22789434626?text=' + encodeURIComponent(devisMessage), '_blank');
        } else {
            var subject = encodeURIComponent('Demande de devis - ' + name);
            var body = encodeURIComponent(devisMessage.replace(/\*/g, ''));
            window.location.href = 'mailto:afrinovatech46@gmail.com?subject=' + subject + '&body=' + body;
        }
    });
});
