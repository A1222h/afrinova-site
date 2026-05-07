var currentLang = localStorage.getItem('afrinova_lang') || 'fr';
var translations = {};

function loadLanguage(lang) {
    var url = 'lang/' + lang + '.json';
    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            translations = data;
            applyTranslations();
            localStorage.setItem('afrinova_lang', lang);
            currentLang = lang;
        })
        .catch(function() {
            console.log('Langue par defaut');
        });
}

function applyTranslations() {
    var elements = document.querySelectorAll('[data-translate]');
    elements.forEach(function(el) {
        var key = el.getAttribute('data-translate');
        if (translations[key]) {
            el.textContent = translations[key];
        }
    });
}

function switchLanguage(lang) {
    loadLanguage(lang);
    var select = document.querySelector('.nav-links select');
    if (select) {
        select.value = lang;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    loadLanguage(currentLang);
    var select = document.querySelector('.nav-links select');
    if (select) {
        select.value = currentLang;
    }
});
