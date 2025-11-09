// Navigation and interactivity

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll behavior
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Highlight current page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.top-nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === 'index.html' && linkPage === 'index.html')) {
            link.style.fontWeight = '600';
            link.style.borderBottom = '1px solid #000';
        }
    });

    // Add hover effects to items
    const items = document.querySelectorAll('.item');
    items.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all items for fade-in animation
    items.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });

    // Image carousel functionality
    const carouselImages = document.querySelectorAll('.carousel-image');
    const prevButton = document.querySelector('.carousel-arrow-left');
    const nextButton = document.querySelector('.carousel-arrow-right');
    
    if (carouselImages.length > 0 && prevButton && nextButton) {
        let currentIndex = 0;
        
        function showImage(index) {
            carouselImages.forEach((img, i) => {
                if (i === index) {
                    img.classList.add('active');
                } else {
                    img.classList.remove('active');
                }
            });
        }
        
        function nextImage() {
            currentIndex = (currentIndex + 1) % carouselImages.length;
            showImage(currentIndex);
        }
        
        function prevImage() {
            currentIndex = (currentIndex - 1 + carouselImages.length) % carouselImages.length;
            showImage(currentIndex);
        }
        
        nextButton.addEventListener('click', nextImage);
        prevButton.addEventListener('click', prevImage);
        
        // Initialize: show first image
        showImage(0);
    }
});





