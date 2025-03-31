document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.lamp-slide');
    let currentIndex = 0;
    
    // Check URL parameter for lamp selection
    const urlParams = new URLSearchParams(window.location.search);
    const lampParam = urlParams.get('lamp');
    if (lampParam) {
        const lampNum = parseInt(lampParam);
        if (lampNum >= 1 && lampNum <= slides.length) {
            currentIndex = lampNum - 1;
        }
    }
    
    // Function to update which slide is visible
    function updateSlide() {
        slides.forEach((slide, index) => {
            if (index === currentIndex) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
    }
    
    // Initialize the first slide
    updateSlide();
    
    // Add event listeners to the navigation arrows
    document.querySelector('.left-arrow-container .arrow-btn').addEventListener('click', () => {
        currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
        updateSlide();
    });
    
    document.querySelector('.right-arrow-container .arrow-btn').addEventListener('click', () => {
        currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
        updateSlide();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
            updateSlide();
        } else if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
            updateSlide();
        }
    });
    
    // Setup internal image sliders for each lamp
    document.querySelectorAll('.lamp-images-slider').forEach((slider) => {
        const track = slider.querySelector('.lamp-images-track');
        const images = track.querySelectorAll('img');
        const prevBtn = slider.querySelector('.slider-prev');
        const nextBtn = slider.querySelector('.slider-next');
        let currentImgIndex = 0;
        
        if (images.length === 0) return;
        
        function updateSliderPosition() {
            const imageWidth = images[0].clientWidth;
            track.style.transform = `translateX(-${currentImgIndex * imageWidth}px)`;
        }
        
        // Initialize slider position
        updateSliderPosition();
        
        // Add event listeners to slider navigation buttons
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent triggering parent events
            currentImgIndex = (currentImgIndex === 0) ? images.length - 1 : currentImgIndex - 1;
            updateSliderPosition();
        });
        
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent triggering parent events
            currentImgIndex = (currentImgIndex === images.length - 1) ? 0 : currentImgIndex + 1;
            updateSliderPosition();
        });
        
        // Update slider on window resize
        window.addEventListener('resize', updateSliderPosition);
    });
    
    // Add click event to fullscreen images
    document.querySelectorAll('.lamp-images-track img').forEach((img) => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            // Fullscreen logic would go here
        });
    });
});