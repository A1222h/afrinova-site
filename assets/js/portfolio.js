// ============ FILTRES PORTFOLIO ============
document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    // Animation d'entrée
    portfolioItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.style.opacity = '1';
    });
    
    // Filtrage
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Mise à jour bouton actif
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            // Filtrage avec animation
            portfolioItems.forEach((item, index) => {
                const categories = item.getAttribute('data-category');
                
                if (filter === 'all' || categories.includes(filter)) {
                    item.classList.remove('hidden');
                    item.style.animation = 'none';
                    item.offsetHeight; // Trigger reflow
                    item.style.animation = `fadeInUp 0.6s ease forwards`;
                    item.style.animationDelay = `${index * 0.1}s`;
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
});
