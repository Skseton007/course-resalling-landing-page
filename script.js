// --- Premium Landing Page Interactivity ---

document.addEventListener('DOMContentLoaded', () => {

    // 1. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        const triggerBottom = (window.innerHeight / 5) * 4.5;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < triggerBottom) {
                element.classList.add('active');
            }
        });
    };

    // Initial check and event listener
    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);


    // 2. Direct Video Player Interaction (Scroll & Play)
    const playHeroBtn = document.getElementById('play-video-btn');
    const mainVideo = document.getElementById('main-video-player');
    const videoContainer = document.getElementById('main-video-container');

    if (playHeroBtn && mainVideo && videoContainer) {
        playHeroBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // 1. Play instantly on user click to satisfy browser user-gesture policies
            mainVideo.currentTime = 0;
            const playPromise = mainVideo.play();
            
            if (playPromise !== undefined) {
                playPromise.catch(err => {
                    console.log('Playback blocked, attempting muted fallback:', err);
                    // 2. Fallback: Mute and play (browsers always allow muted autoplay)
                    mainVideo.muted = true;
                    mainVideo.play().catch(fallbackErr => {
                        console.error('Video playback failed completely:', fallbackErr);
                    });
                });
            }

            // 3. Scroll smoothly to the video container in parallel
            videoContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }


    // 3. Floating Contact Buttons — show after user scrolls 300px down
    const floatingContacts = document.getElementById('floating-contacts');

    const handleFloatingVisibility = () => {
        if (!floatingContacts) return;
        if (window.scrollY > 300) {
            floatingContacts.classList.add('visible');
        } else {
            floatingContacts.classList.remove('visible');
        }
    };

    window.addEventListener('scroll', handleFloatingVisibility, { passive: true });
    handleFloatingVisibility(); // run once on load in case page is pre-scrolled


    // 5. FAQ Accordion Action
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all active FAQ items first for accordion effect
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            // Toggle selected item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // 6. Terms and Conditions Modal triggers
    const termsModal = document.getElementById('terms-modal');
    const openTermsNav = document.getElementById('open-terms-nav');
    const openTermsFooter = document.getElementById('open-terms-footer');
    const closeTermsBtn = document.getElementById('close-terms-btn');

    const openTerms = (e) => {
        if (e) e.preventDefault();
        if (termsModal) {
            termsModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    const closeTerms = () => {
        if (termsModal) {
            termsModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    if (openTermsNav) openTermsNav.addEventListener('click', openTerms);
    if (openTermsFooter) openTermsFooter.addEventListener('click', openTerms);
    if (closeTermsBtn) closeTermsBtn.addEventListener('click', closeTerms);
    if (termsModal) {
        termsModal.addEventListener('click', (e) => {
            if (e.target === termsModal) closeTerms();
        });
    }

    // 7. How to Download Modal triggers
    const downloadModal = document.getElementById('download-modal');
    const openDownloadNav = document.getElementById('open-download-nav');
    const openDownloadFooter = document.getElementById('open-download-footer');
    const closeDownloadBtn = document.getElementById('close-download-btn');

    const openDownload = (e) => {
        if (e) e.preventDefault();
        if (downloadModal) {
            downloadModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    const closeDownload = () => {
        if (downloadModal) {
            downloadModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    if (openDownloadNav) openDownloadNav.addEventListener('click', openDownload);
    if (openDownloadFooter) openDownloadFooter.addEventListener('click', openDownload);
    if (closeDownloadBtn) closeDownloadBtn.addEventListener('click', closeDownload);
    if (downloadModal) {
        downloadModal.addEventListener('click', (e) => {
            if (e.target === downloadModal) closeDownload();
        });
    }

    // 8. E-Commerce Product Tabs Handler
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    if (tabButtons.length > 0 && tabPanels.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');

                // Remove active class from all buttons and panels
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanels.forEach(panel => panel.classList.remove('active'));

                // Add active class to clicked button and target panel
                button.classList.add('active');
                const activePanel = document.getElementById(targetTab);
                if (activePanel) {
                    activePanel.classList.add('active');
                }
            });
        });
    }

});
