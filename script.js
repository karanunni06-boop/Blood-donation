let donors = [];
let todayCount = 0;

function callDonor(phone, name) {
    // Clean the phone number (remove spaces and special characters except +)
    const cleanPhone = phone.replace(/[\s()-]/g, '');
    
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = `tel:${cleanPhone}`;
    link.style.display = 'none';
    document.body.appendChild(link);
    
    // Trigger the click
    link.click();
    
    // Clean up
    setTimeout(() => {
        document.body.removeChild(link);
    }, 100);
}

function animateNumber(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 20);
}

function updateStats() {
    document.getElementById('totalDonors').textContent = donors.length;
    document.getElementById('todayDonors').textContent = todayCount;
    animateNumber(document.getElementById('livesSaved'), donors.length * 3);
}

function createDonorCard(donor) {
    return `
        <div class="donor-card">
            <div class="donor-header">
                <div class="donor-name">${donor.name}</div>
                <div class="blood-type">${donor.bloodType}</div>
            </div>
            <div class="donor-info">
                <div class="info-item">
                    <span class="info-icon">👤</span>
                    <span>${donor.age} years old</span>
                </div>
                <div class="info-item">
                    <span class="info-icon">📞</span>
                    <span>${donor.phone}</span>
                </div>
                <div class="info-item">
                    <span class="info-icon">📍</span>
                    <span>${donor.city}</span>
                </div>
                <div class="info-item">
                    <span class="info-icon">🕒</span>
                    <span>${donor.registeredDate}</span>
                </div>
            </div>
            <a href="tel:${donor.phone}" class="call-button">
                📞 Call ${donor.name.split(' ')[0]}
            </a>
        </div>
    `;
}

function renderDonors(donorsToRender = donors) {
    const donorList = document.getElementById('donorList');
    
    if (donorsToRender.length === 0) {
        donorList.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🩸</div>
                <p>No donors found matching your search.</p>
            </div>
        `;
        return;
    }

    donorList.innerHTML = donorsToRender.map(createDonorCard).join('');
}

document.getElementById('donorForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const donor = {
        name: document.getElementById('name').value,
        age: document.getElementById('age').value,
        bloodType: document.getElementById('bloodType').value,
        phone: document.getElementById('phone').value,
        city: document.getElementById('city').value,
        registeredDate: new Date().toLocaleDateString()
    };

    donors.unshift(donor);
    todayCount++;
    
    const successMessage = document.getElementById('successMessage');
    successMessage.style.display = 'block';
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 3000);

    this.reset();
    renderDonors();
    updateStats();
});

document.getElementById('searchInput').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = donors.filter(donor => 
        donor.name.toLowerCase().includes(searchTerm) ||
        donor.bloodType.toLowerCase().includes(searchTerm) ||
        donor.city.toLowerCase().includes(searchTerm)
    );
    renderDonors(filtered);
});

// Initialize with some sample data for demonstration
const sampleDonors = [
    { name: "Rajesh Kumar", age: "28", bloodType: "O+", phone: "+91 98765 43210", city: "Mumbai", registeredDate: "28/11/2025" },
    { name: "Priya Sharma", age: "32", bloodType: "A+", phone: "+91 98765 43211", city: "Delhi", registeredDate: "27/11/2025" },
    { name: "Amit Patel", age: "25", bloodType: "B+", phone: "+91 98765 43212", city: "Bangalore", registeredDate: "26/11/2025" }
];

donors = [...sampleDonors];
todayCount = 1;
renderDonors();
updateStats();
// Help Center Functions
function openHelpCenter() {
    document.getElementById('helpModal').style.display = 'block';
    document.getElementById('contactFormContainer').style.display = 'none';
    document.getElementById('faqContainer').style.display = 'none';
    document.querySelector('.help-options').style.display = 'grid';
}

function closeHelpCenter() {
    document.getElementById('helpModal').style.display = 'none';
}

function showContactForm() {
    document.querySelector('.help-options').style.display = 'none';
    document.getElementById('contactFormContainer').style.display = 'block';
}

function hideContactForm() {
    document.getElementById('contactFormContainer').style.display = 'none';
    document.querySelector('.help-options').style.display = 'grid';
}

function showFAQ() {
    document.querySelector('.help-options').style.display = 'none';
    document.getElementById('faqContainer').style.display = 'block';
}

function hideFAQ() {
    document.getElementById('faqContainer').style.display = 'none';
    document.querySelector('.help-options').style.display = 'grid';
}

function toggleFAQ(element) {
    const answer = element.nextElementSibling;
    element.classList.toggle('active');
    answer.classList.toggle('active');
}

function sendSupportEmail(event) {
    event.preventDefault();
    
    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value;
    const issueType = document.getElementById('issueType').value;
    const message = document.getElementById('message').value;
    
    // Create email content
    const subject = `BloodConnect Support: ${issueType}`;
    const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0AIssue Type: ${issueType}%0D%0A%0D%0AMessage:%0D%0A${message}`;
    
    // Replace with YOUR email address
    const yourEmail = 'karan.unni06@gmail.com';
    
    // Open email client
    window.location.href = `mailto:${yourEmail}?subject=${subject}&body=${body}`;
    
    // Show success message
    alert('Opening your email client... Please send the email to complete your support request.');
    
    // Reset form
    document.getElementById('contactForm').reset();
    closeHelpCenter();
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('helpModal');
    if (event.target == modal) {
        closeHelpCenter();
    }
}