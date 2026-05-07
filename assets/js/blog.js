// Recherche blog
document.getElementById('blogSearch').addEventListener('input', (e) => {
    const search = e.target.value.toLowerCase();
    const articles = document.querySelectorAll('.blog-card');
    
    articles.forEach(article => {
        const title = article.querySelector('h3').textContent.toLowerCase();
        const desc = article.querySelector('p').textContent.toLowerCase();
        const tags = Array.from(article.querySelectorAll('.blog-tag'))
            .map(t => t.textContent.toLowerCase());
        
        if (title.includes(search) || desc.includes(search) || tags.some(t => t.includes(search))) {
            article.style.display = '';
        } else {
            article.style.display = 'none';
        }
    });
});
