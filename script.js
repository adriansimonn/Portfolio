document.addEventListener('DOMContentLoaded', function() {
    // Highlight current page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.top-nav a');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage ||
            (currentPage === '' && linkPage === 'index.html')) {
            link.style.fontWeight = '600';
            link.style.borderBottom = '1px solid #000';
        }
    });

    // Scroll animations
    const items = document.querySelectorAll('.item');
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px 50px 0px'
    });

    items.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });

    // Image carousel
    document.querySelectorAll('.image-carousel').forEach(carousel => {
        const images = carousel.querySelectorAll('.carousel-image');
        const prevBtn = carousel.querySelector('.carousel-arrow-left');
        const nextBtn = carousel.querySelector('.carousel-arrow-right');
        let currentIndex = 0;

        function showImage(index) {
            images.forEach((img, i) => {
                const isActive = i === index;
                img.classList.toggle('active', isActive);

                if (img.tagName === 'VIDEO') {
                    if (isActive) {
                        img.currentTime = 0;
                        const playPromise = img.play();
                        if (playPromise !== undefined) {
                            playPromise.catch(e => {
                                console.log('Video autoplay prevented:', e);
                            });
                        }
                    } else {
                        img.pause();
                    }
                }
            });
        }

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(currentIndex);
        });

        showImage(0);
    });
});
