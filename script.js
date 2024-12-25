// Add parallax effect
document.addEventListener('mousemove', function(e) {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    
    document.querySelector('.teddy-bear').style.transform = 
        `translate(${moveX}px, ${moveY}px) rotate(${moveX}deg)`;
}); 

document.addEventListener('DOMContentLoaded', function() {
    // Hide loading screen after content is loaded
    setTimeout(() => {
        const loadingScreen = document.querySelector('.loading-screen');
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000); // Show loading screen for 2 seconds
    
    const birthDate = new Date('2024-12-11T14:30:00+06:00');
    
    // Format the birth date with day name
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                       'July', 'August', 'September', 'October', 'November', 'December'];
    
    const dayName = dayNames[birthDate.getDay()];
    const monthName = monthNames[birthDate.getMonth()];
    const formattedDate = `${dayName}, ${monthName} ${birthDate.getDate()}, ${birthDate.getFullYear()}`;
    
    // Update the birth date text
    document.querySelector('.birth-detail-item .detail-text').textContent = formattedDate;

    // Growing Up Journey Counter
    function updateGrowthJourney() {
        const now = new Date();
        const diff = now - birthDate;

        // Handle dates before birth
        if (diff < 0) {
            document.getElementById('growth-years').textContent = '00';
            document.getElementById('growth-months').textContent = '00';
            document.getElementById('growth-days').textContent = '00';
            document.getElementById('growth-hours').textContent = '00';
            document.getElementById('growth-minutes').textContent = '00';
            document.getElementById('growth-seconds').textContent = '00';
            return;
        }

        const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
        const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
        const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('growth-years').textContent = String(years).padStart(2, '0');
        document.getElementById('growth-months').textContent = String(months).padStart(2, '0');
        document.getElementById('growth-days').textContent = String(days).padStart(2, '0');
        document.getElementById('growth-hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('growth-minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('growth-seconds').textContent = String(seconds).padStart(2, '0');
    }

    // Next Birthday Countdown
    function updateBirthdayCountdown() {
        const now = new Date();
        let nextBirthday = new Date(now.getFullYear(), 11, 11, 14, 30); // December 11
        
        if (now > nextBirthday) {
            nextBirthday = new Date(now.getFullYear() + 1, 11, 11, 14, 30);
        }

        const diff = nextBirthday - now;
        
        // Calculate total days until next birthday
        const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
        
        // Only show year if 365 days or more remaining
        const years = totalDays >= 365 ? 1 : 0;
        const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30.44));
        const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('next-years').textContent = String(years).padStart(2, '0');
        document.getElementById('months').textContent = String(months).padStart(2, '0');
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }

    // Initialize counters
    updateGrowthJourney();
    updateBirthdayCountdown();

    // Update intervals
    setInterval(updateGrowthJourney, 1000);  // Update every second
    setInterval(updateBirthdayCountdown, 1000);  // Update every second
}); 

// Gallery popup functionality
function openGallery() {
    document.querySelector('.gallery-popup').style.display = 'flex';
    document.body.style.overflow = 'hidden';
    adjustGalleryItems();
}

// Close gallery
document.querySelector('.close-gallery').addEventListener('click', () => {
    document.querySelector('.gallery-popup').style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close on background click
document.querySelector('.gallery-popup').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
        document.querySelector('.gallery-popup').style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Handle image upload
document.querySelectorAll('.photo-input').forEach(input => {
    input.addEventListener('change', function(e) {
        if (this.files && this.files[0]) {
            const reader = new FileReader();
            const uploadBox = this.closest('.photo-upload-box');
            
            reader.onload = function(e) {
                uploadBox.style.backgroundImage = `url(${e.target.result})`;
                uploadBox.style.backgroundSize = 'cover';
                uploadBox.style.backgroundPosition = 'center';
                uploadBox.querySelector('.upload-content').style.display = 'none';
            };
            
            reader.readAsDataURL(this.files[0]);
        }
    });
}); 

function adjustGalleryItems() {
    const photoBoxes = document.querySelectorAll('.photo-box');
    const isMobile = window.innerWidth <= 480;
    
    photoBoxes.forEach((box, index) => {
        if (isMobile) {
            // Show all items on Mobile screens
            box.style.display = 'block';
        } else {
            // Show all items on larger screens
            box.style.display = 'block';
        }
    });
}

// Call on load and resize
window.addEventListener('load', adjustGalleryItems);
window.addEventListener('resize', adjustGalleryItems); 

// Update copyright year automatically
document.getElementById('currentYear').textContent = new Date().getFullYear();

let currentImageIndex = 0;
const images = document.querySelectorAll('.photo-box img');
const viewer = document.querySelector('.fullscreen-viewer');
const viewerImage = document.querySelector('.viewer-image');

// Open fullscreen viewer
document.querySelectorAll('.photo-box').forEach((box, index) => {
    box.addEventListener('click', () => {
        currentImageIndex = index;
        showImage(currentImageIndex);
        viewer.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
});

// Close viewer
document.querySelector('.close-viewer').addEventListener('click', () => {
    viewer.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Navigation buttons
document.querySelector('.prev-btn').addEventListener('click', () => {
    navigateImage('prev');
});

document.querySelector('.next-btn').addEventListener('click', () => {
    navigateImage('next');
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (viewer.style.display === 'flex') {
        if (e.key === 'ArrowLeft') navigateImage('prev');
        if (e.key === 'ArrowRight') navigateImage('next');
        if (e.key === 'Escape') {
            viewer.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
});

// Touch swipe functionality
let touchStartX = 0;
let touchEndX = 0;

viewer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

viewer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeLength = touchEndX - touchStartX;
    
    if (Math.abs(swipeLength) > swipeThreshold) {
        if (swipeLength > 0) {
            navigateImage('prev');
        } else {
            navigateImage('next');
        }
    }
}

function showImage(index) {
    viewerImage.src = images[index].src;
    viewerImage.alt = images[index].alt;
}

function navigateImage(direction) {
    viewerImage.classList.remove('swipe-left', 'swipe-right');
    
    if (direction === 'next') {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        viewerImage.classList.add('swipe-left');
    } else {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        viewerImage.classList.add('swipe-right');
    }
    
    showImage(currentImageIndex);
}

// Update the viewer click handling
viewer.addEventListener('click', (e) => {
    // Close viewer if clicking outside the image
    if (e.target === viewer || e.target === document.querySelector('.viewer-content')) {
        viewer.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Prevent image click from closing the viewer
viewerImage.addEventListener('click', (e) => {
    e.stopPropagation();
});
