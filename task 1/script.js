// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Animate on Scroll (AOS) Implementation
function animateOnScroll() {
    const elements = document.querySelectorAll('[data-aos]');

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('aos-animate');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// User Profiles Data
const userProfiles = [
    {
        name: "Alex Chen",
        avatar: "AC",
        status: "Available",
        skillsOffered: ["JavaScript", "React", "Node.js"],
        skillsWanted: ["UI/UX Design", "Figma", "Photoshop"]
    },
    {
        name: "Sarah Johnson",
        avatar: "SJ",
        status: "Busy",
        skillsOffered: ["Graphic Design", "Illustrator", "Branding"],
        skillsWanted: ["Python", "Data Analysis", "Machine Learning"]
    },
    {
        name: "Mike Rodriguez",
        avatar: "MR",
        status: "Available",
        skillsOffered: ["Spanish", "Public Speaking", "Presentation"],
        skillsWanted: ["Web Development", "CSS", "JavaScript"]
    },
    {
        name: "Emma Wilson",
        avatar: "EW",
        status: "Available",
        skillsOffered: ["Content Writing", "SEO", "Copywriting"],
        skillsWanted: ["Video Editing", "After Effects", "Premiere Pro"]
    },
    {
        name: "David Kim",
        avatar: "DK",
        status: "Available",
        skillsOffered: ["Music Production", "Logic Pro", "Sound Design"],
        skillsWanted: ["Marketing", "Social Media", "Analytics"]
    },
    {
        name: "Lisa Thompson",
        avatar: "LT",
        status: "Busy",
        skillsOffered: ["French", "Translation", "Linguistics"],
        skillsWanted: ["Photography", "Lightroom", "Portrait"]
    }
];

// Generate Profile Cards
function generateProfileCards() {
    const profilesGrid = document.getElementById('profilesGrid');

    userProfiles.forEach((profile, index) => {
        const profileCard = document.createElement('div');
        profileCard.className = 'profile-card';
        profileCard.setAttribute('data-aos', 'fade-up');
        profileCard.setAttribute('data-aos-delay', (index * 100).toString());

        profileCard.innerHTML = `
            <div class="profile-header">
                <div class="profile-avatar">${profile.avatar}</div>
                <div class="profile-info">
                    <h3>${profile.name}</h3>
                    <span class="profile-status">${profile.status}</span>
                </div>
            </div>
            <div class="profile-skills">
                <h4>Offers:</h4>
                <div class="skills-list">
                    ${profile.skillsOffered.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
            </div>
            <div class="profile-skills">
                <h4>Wants to learn:</h4>
                <div class="skills-list">
                    ${profile.skillsWanted.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
            </div>
            <div class="profile-actions">
                <button class="btn btn-primary btn-small" onclick="connectWithUser('${profile.name}')">
                    Connect
                </button>
                <button class="btn btn-secondary btn-small" onclick="requestChat('${profile.name}')">
                    Chat
                </button>
            </div>
        `;

        profilesGrid.appendChild(profileCard);
    });
}

// Connect and Chat Functions
function connectWithUser(userName) {
    alert(`Connection request sent to ${userName}! They will be notified.`);
}

function requestChat(userName) {
    alert(`Chat request sent to ${userName}! You can start messaging once they accept.`);
}

// Calendar Functionality
let currentDate = new Date();
let selectedDate = null;
let selectedTime = null;

const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const timeSlots = [
    "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00",
    "17:00", "18:00", "19:00", "20:00"
];

function generateCalendar() {
    const calendarGrid = document.getElementById('calendarGrid');
    const currentMonthElement = document.getElementById('currentMonth');

    currentMonthElement.textContent = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

    // Clear previous calendar
    calendarGrid.innerHTML = '';

    // Add day headers
    const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayHeaders.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.textContent = day;
        dayHeader.style.fontWeight = '600';
        dayHeader.style.color = 'var(--text-secondary)';
        dayHeader.style.padding = '0.5rem';
        dayHeader.style.textAlign = 'center';
        calendarGrid.appendChild(dayHeader);
    });

    // Get first day of month and number of days
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startDate = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    // Add empty cells for days before month starts
    for (let i = 0; i < startDate; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day disabled';
        calendarGrid.appendChild(emptyDay);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;

        const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        const today = new Date();

        // Disable past dates
        if (dayDate < today.setHours(0, 0, 0, 0)) {
            dayElement.classList.add('disabled');
        } else {
            dayElement.addEventListener('click', () => selectDate(dayDate, dayElement));
        }

        calendarGrid.appendChild(dayElement);
    }
}

function selectDate(date, element) {
    // Remove previous selection
    document.querySelectorAll('.calendar-day.selected').forEach(day => {
        day.classList.remove('selected');
    });

    // Add selection to clicked day
    element.classList.add('selected');
    selectedDate = date;

    // Generate time slots for selected date
    generateTimeSlots();
}

function generateTimeSlots() {
    const timeSlotsContainer = document.getElementById('timeSlots');
    timeSlotsContainer.innerHTML = '';

    timeSlots.forEach(time => {
        const timeSlot = document.createElement('div');
        timeSlot.className = 'time-slot';
        timeSlot.textContent = time;

        // Randomly make some slots unavailable for demo
        if (Math.random() < 0.3) {
            timeSlot.classList.add('unavailable');
            timeSlot.textContent += ' (Booked)';
        } else {
            timeSlot.addEventListener('click', () => selectTimeSlot(time, timeSlot));
        }

        timeSlotsContainer.appendChild(timeSlot);
    });
}

function selectTimeSlot(time, element) {
    // Remove previous selection
    document.querySelectorAll('.time-slot.selected').forEach(slot => {
        slot.classList.remove('selected');
    });

    // Add selection to clicked slot
    element.classList.add('selected');
    selectedTime = time;

    // Enable book session button
    document.getElementById('bookSession').disabled = false;
}

// Calendar Navigation
document.getElementById('prevMonth').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    generateCalendar();
    clearSelection();
});

document.getElementById('nextMonth').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    generateCalendar();
    clearSelection();
});

function clearSelection() {
    selectedDate = null;
    selectedTime = null;
    document.getElementById('timeSlots').innerHTML = '';
    document.getElementById('bookSession').disabled = true;
}

// Booking Modal
const bookingModal = document.getElementById('bookingModal');
const bookSessionBtn = document.getElementById('bookSession');
const closeModal = document.getElementById('closeModal');
const confirmBookingBtn = document.getElementById('confirmBooking');

bookSessionBtn.addEventListener('click', () => {
    if (selectedDate && selectedTime) {
        document.getElementById('selectedDate').textContent = selectedDate.toDateString();
        document.getElementById('selectedTime').textContent = selectedTime;
        bookingModal.style.display = 'block';
    }
});

closeModal.addEventListener('click', () => {
    bookingModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === bookingModal) {
        bookingModal.style.display = 'none';
    }
});

confirmBookingBtn.addEventListener('click', () => {
    const userName = document.getElementById('userName').value;
    const userEmail = document.getElementById('userEmail').value;
    const sessionNotes = document.getElementById('sessionNotes').value;

    if (userName && userEmail) {
        // Save booking to localStorage (in a real app, this would go to a backend)
        const booking = {
            date: selectedDate.toDateString(),
            time: selectedTime,
            userName,
            userEmail,
            notes: sessionNotes,
            id: Date.now()
        };

        const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        existingBookings.push(booking);
        localStorage.setItem('bookings', JSON.stringify(existingBookings));

        alert('Booking confirmed! You will receive a confirmation email shortly.');
        bookingModal.style.display = 'none';

        // Clear form
        document.getElementById('userName').value = '';
        document.getElementById('userEmail').value = '';
        document.getElementById('sessionNotes').value = '';

        // Clear selection
        clearSelection();
        generateCalendar();
    } else {
        alert('Please fill in all required fields.');
    }
});

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    generateProfileCards();
    generateCalendar();
    animateOnScroll();
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'var(--glass-bg)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'var(--glass-bg)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

// Add loading animation for profile cards
function addLoadingAnimation() {
    const profileCards = document.querySelectorAll('.profile-card');
    profileCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Initialize loading animations
setTimeout(addLoadingAnimation, 500);