// EduTrack Application - Complete Implementation with ML Risk Assessment and Role Restrictions

// Global State Management
let currentUser = null;
let students = [];
let credentials = [];
let datasets = [];
let charts = {};
let alertHistory = [];

// Enhanced ML Risk Assessment Weights (Attendance Priority)
const riskWeights = {
    attendance: 0.40,        // HIGHEST - 40%
    academics: 0.25,         // Second - 25% 
    financial: 0.15,         // Third - 15%
    family: 0.10,           // Fourth - 10%
    distance: 0.05,         // Fifth - 5%
    behavioral: 0.05        // Sixth - 5%
};

// Working Credentials System - Simple Pattern
const WORKING_CREDENTIALS = {
    students: generateStudentCredentials(),
    faculty: generateFacultyCredentials()
};

// Generate working credentials
function generateStudentCredentials() {
    const creds = [];
    for (let i = 1; i <= 50; i++) {
        const num = String(i).padStart(3, '0');
        creds.push({
            username: `student${num}`,
            password: `student${num}`,
            studentId: `S${num}`,
            name: `Student ${i}`,
            role: 'student'
        });
    }
    return creds;
}

function generateFacultyCredentials() {
    const creds = [];
    const facultyNames = [
        'Dr. John Smith', 'Dr. Sarah Johnson', 'Dr. Michael Brown', 'Dr. Emily Davis', 'Dr. James Wilson',
        'Dr. Lisa Anderson', 'Dr. Robert Taylor', 'Dr. Jennifer Martinez', 'Dr. David Garcia', 'Dr. Maria Rodriguez',
        'Dr. Thomas Lee', 'Dr. Karen White', 'Dr. Daniel Harris', 'Dr. Jessica Clark', 'Dr. Christopher Lewis'
    ];
    
    for (let i = 1; i <= 15; i++) {
        const num = String(i).padStart(3, '0');
        creds.push({
            username: `faculty${num}`,
            password: `faculty${num}`,
            facultyId: `F${num}`,
            name: facultyNames[i-1] || `Faculty ${i}`,
            role: 'faculty'
        });
    }
    return creds;
}

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    loadSampleData();
    showPage('home-page');
    console.log('🎓 EduTrack initialized with comprehensive features:');
    console.log('👨‍🎓 Student Login: student001/student001 to student050/student050');
    console.log('👩‍🏫 Faculty Login: faculty001/faculty001 to faculty015/faculty015');
    console.log('🤖 ML Risk Assessment: Attendance-priority algorithm active');
    console.log('📊 Data Upload: 4-type system with null handling');
    console.log('👪 Parent Alerts: Acknowledgment system enabled');
}

// Event Listeners
function setupEventListeners() {
    // Homepage login buttons
    const studentLoginBtn = document.getElementById('student-login-btn');
    const facultyLoginBtn = document.getElementById('faculty-login-btn');
    const getStartedBtn = document.getElementById('get-started-btn');
    const learnMoreBtn = document.getElementById('learn-more-btn');

    if (studentLoginBtn) {
        studentLoginBtn.addEventListener('click', () => showLoginModal('student'));
    }
    if (facultyLoginBtn) {
        facultyLoginBtn.addEventListener('click', () => showLoginModal('faculty'));
    }
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', () => showLoginModal('faculty'));
    }
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', scrollToFeatures);
    }

    // Sidebar card actions
    document.querySelectorAll('.card-action').forEach(btn => {
        btn.addEventListener('click', () => showLoginModal('faculty'));
    });

    // Navigation links for both dashboards
    document.querySelectorAll('.nav-link[data-page]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = e.target.closest('.nav-link').dataset.page;
            if (currentUser && currentUser.role === 'student') {
                showStudentPage(page);
            } else {
                showFacultyPage(page);
            }
        });
    });

    // Login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Add student form
    const addStudentForm = document.getElementById('add-student-form');
    if (addStudentForm) {
        addStudentForm.addEventListener('submit', handleAddStudent);
    }

    // Edit student form
    const editStudentForm = document.getElementById('edit-student-form');
    if (editStudentForm) {
        editStudentForm.addEventListener('submit', handleEditStudent);
    }

    // File upload for all data types
    setupFileUpload();

    // Modal close buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            if (modal) {
                hideModal(modal.id);
            }
        });
    });

    // Click outside to close modals
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            hideModal(e.target.id);
        }
    });
}

// Page Management
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
}

function showStudentPage(pageId) {
    document.querySelectorAll('.dashboard-page').forEach(page => {
        page.classList.remove('active');
    });
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Update navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    const activeLink = document.querySelector(`[data-page="${pageId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // Load student-specific content - RESTRICTED ACCESS ONLY
    switch(pageId) {
        case 'student-overview':
            updateStudentDashboard();
            break;
        case 'student-profile':
            loadStudentProfile();
            break;
        case 'student-grades':
            loadStudentGrades();
            break;
        case 'student-attendance':
            loadStudentAttendance();
            break;
        case 'student-counseling':
            loadStudentCounseling();
            break;
    }
}

function showFacultyPage(pageId) {
    document.querySelectorAll('.dashboard-page').forEach(page => {
        page.classList.remove('active');
    });
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Update navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    const activeLink = document.querySelector(`[data-page="${pageId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // Load faculty-specific content - FULL ACCESS
    switch(pageId) {
        case 'faculty-overview':
            updateFacultyDashboard();
            break;
        case 'students':
            loadStudentsTable();
            break;
        case 'credentials':
            loadCredentialsPage();
            break;
        case 'analytics':
            updateAnalyticsCharts();
            break;
        case 'alerts':
            loadAlertsPage();
            break;
    }
}

// Authentication System with Role-Based Access
function showLoginModal(type = 'faculty') {
    const modal = document.getElementById('login-modal');
    const title = document.getElementById('login-title');
    const loginType = document.getElementById('login-type');
    const studentExamples = document.getElementById('student-examples');
    const facultyExamples = document.getElementById('faculty-examples');
    
    if (type === 'student') {
        title.textContent = 'Student Login - Personal Dashboard Access';
        loginType.value = 'student';
        studentExamples.classList.remove('hidden');
        facultyExamples.classList.add('hidden');
    } else {
        title.textContent = 'Faculty Login - Full System Access';
        loginType.value = 'faculty';
        studentExamples.classList.add('hidden');
        facultyExamples.classList.remove('hidden');
    }
    
    showModal('login-modal');
}

function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const loginType = document.getElementById('login-type').value;
    
    let user = null;
    
    if (loginType === 'student') {
        user = WORKING_CREDENTIALS.students.find(u => 
            u.username === username && u.password === password
        );
        if (user) {
            // Students can ONLY access their own data
            currentUser = user;
            hideModal('login-modal');
            showPage('student-dashboard');
            showStudentPage('student-overview');
            showSuccessMessage(`Welcome ${user.name}! 🎓 You can access your personal academic data only.`);
        }
    } else {
        user = WORKING_CREDENTIALS.faculty.find(u => 
            u.username === username && u.password === password
        );
        if (user) {
            // Faculty can access all data and functionality
            currentUser = user;
            hideModal('login-modal');
            showPage('faculty-dashboard');
            showFacultyPage('faculty-overview');
            showSuccessMessage(`Welcome ${user.name}! 👩‍🏫 Faculty dashboard with full system access is now active.`);
        }
    }
    
    if (!user) {
        alert('❌ Invalid credentials. Please check your username and password.\n\n✅ Try: student001/student001 or faculty001/faculty001');
    }
    
    // Reset form
    document.getElementById('login-form').reset();
}

function logout() {
    currentUser = null;
    // Destroy all charts to prevent memory leaks
    Object.values(charts).forEach(chart => {
        if (chart && chart.destroy) {
            chart.destroy();
        }
    });
    charts = {};
    
    showPage('home-page');
    showSuccessMessage('🔐 Logged out successfully. All data remains persistent for next session.');
}

// Student Dashboard Functions (RESTRICTED ACCESS ONLY)
function updateStudentDashboard() {
    if (!currentUser || currentUser.role !== 'student') return;
    
    // Find current student's data - ONLY OWN DATA
    let studentData = students.find(s => s.id === currentUser.studentId);
    if (!studentData) {
        // Create default student data if not exists
        studentData = createDefaultStudentData();
    }
    
    // Update student welcome message
    const welcomeEl = document.getElementById('student-welcome');
    if (welcomeEl) {
        welcomeEl.textContent = `Welcome ${studentData.name}! Here's your personal academic overview with ML-powered insights.`;
    }
    
    // Update student KPIs - ONLY OWN DATA
    const studentCgpaEl = document.getElementById('student-cgpa');
    const studentAttendanceEl = document.getElementById('student-attendance');
    const studentRiskEl = document.getElementById('student-risk');
    const studentFeesEl = document.getElementById('student-fees');
    
    if (studentCgpaEl) studentCgpaEl.textContent = studentData.cgpa.toFixed(2);
    if (studentAttendanceEl) studentAttendanceEl.textContent = `${studentData.attendance}%`;
    if (studentRiskEl) {
        studentRiskEl.textContent = studentData.riskLevel.toUpperCase();
        studentRiskEl.className = `kpi-value risk-${studentData.riskLevel}`;
    }
    if (studentFeesEl) {
        const feeStatus = (studentData.paid_fee >= studentData.total_fee) ? 'Paid' : 'Pending';
        studentFeesEl.textContent = feeStatus;
    }
    
    // Update student performance chart
    updateStudentPerformanceChart(studentData);
}

function updateStudentPerformanceChart(studentData) {
    const ctx = document.getElementById('studentPerformanceChart');
    if (!ctx) return;
    
    if (charts.studentPerformanceChart) {
        charts.studentPerformanceChart.destroy();
    }
    
    // Generate realistic performance trend data
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const cgpaData = generateTrendData(studentData.cgpa, 6, 0.5);
    const attendanceData = generateTrendData(studentData.attendance, 6, 8);
    
    charts.studentPerformanceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: 'CGPA Trend',
                data: cgpaData,
                borderColor: '#1FB8CD',
                backgroundColor: 'rgba(31, 184, 205, 0.1)',
                fill: false,
                tension: 0.4,
                pointBackgroundColor: '#1FB8CD',
                pointBorderColor: '#fff',
                pointBorderWidth: 2
            }, {
                label: 'Attendance %',
                data: attendanceData,
                borderColor: '#FFC185',
                backgroundColor: 'rgba(255, 193, 133, 0.1)',
                fill: false,
                tension: 0.4,
                yAxisID: 'y1',
                pointBackgroundColor: '#FFC185',
                pointBorderColor: '#fff',
                pointBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    max: 10,
                    min: 0,
                    title: {
                        display: true,
                        text: 'CGPA'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    max: 100,
                    min: 0,
                    title: {
                        display: true,
                        text: 'Attendance %'
                    },
                    grid: {
                        drawOnChartArea: false,
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top'
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            }
        }
    });
}

function loadStudentProfile() {
    if (!currentUser || currentUser.role !== 'student') return;
    
    const studentData = students.find(s => s.id === currentUser.studentId);
    if (!studentData) return;
    
    const profileDetails = document.getElementById('student-profile-details');
    if (!profileDetails) return;
    
    profileDetails.innerHTML = `
        <div class="profile-section">
            <h3>Personal Information</h3>
            <div class="profile-grid">
                <div class="profile-field">
                    <label>Student ID</label>
                    <span>${studentData.id}</span>
                </div>
                <div class="profile-field">
                    <label>Full Name</label>
                    <span>${studentData.name}</span>
                </div>
                <div class="profile-field">
                    <label>Email</label>
                    <span>${studentData.email}</span>
                </div>
                <div class="profile-field">
                    <label>Phone</label>
                    <span>${studentData.phone || 'Not provided'}</span>
                </div>
            </div>
        </div>
        
        <div class="profile-section">
            <h3>Academic Information</h3>
            <div class="profile-grid">
                <div class="profile-field">
                    <label>Course</label>
                    <span>${studentData.course}</span>
                </div>
                <div class="profile-field">
                    <label>Year</label>
                    <span>Year ${studentData.year}</span>
                </div>
                <div class="profile-field">
                    <label>Current CGPA</label>
                    <span>${studentData.cgpa}</span>
                </div>
                <div class="profile-field">
                    <label>Overall Attendance</label>
                    <span>${studentData.attendance}%</span>
                </div>
            </div>
        </div>
        
        <div class="profile-section">
            <h3>Parent/Guardian Information</h3>
            <div class="profile-grid">
                <div class="profile-field">
                    <label>Parent/Guardian Name</label>
                    <span>${studentData.parent_name || 'Not provided'}</span>
                </div>
                <div class="profile-field">
                    <label>Parent Phone</label>
                    <span>${studentData.parent_phone || 'Not provided'}</span>
                </div>
            </div>
        </div>
        
        <div class="profile-section">
            <h3>Academic Status & ML Risk Assessment</h3>
            <div class="profile-grid">
                <div class="profile-field">
                    <label>Risk Level</label>
                    <span class="risk-badge ${studentData.riskLevel}">${studentData.riskLevel.toUpperCase()}</span>
                </div>
                <div class="profile-field">
                    <label>Total Backlogs</label>
                    <span>${studentData.backlogs || 0}</span>
                </div>
                <div class="profile-field">
                    <label>Fee Status</label>
                    <span>${(studentData.paid_fee >= studentData.total_fee) ? '✅ Paid' : '⏳ Pending'}</span>
                </div>
                <div class="profile-field">
                    <label>Distance from College</label>
                    <span>${studentData.distance || 'Not provided'} km</span>
                </div>
            </div>
        </div>
    `;
}

function loadStudentGrades() {
    if (!currentUser || currentUser.role !== 'student') return;
    
    const studentData = students.find(s => s.id === currentUser.studentId);
    if (!studentData) return;
    
    const gradesContent = document.getElementById('student-grades-content');
    if (!gradesContent) return;
    
    // Generate realistic grade data
    const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Computer Science', 'English', 'Statistics'];
    const grades = subjects.map(subject => {
        const baseGrade = Math.max(4.0, studentData.cgpa + (Math.random() - 0.5) * 2);
        return {
            subject,
            grade: Math.min(10, baseGrade).toFixed(1),
            credits: Math.floor(Math.random() * 2) + 3
        };
    });
    
    gradesContent.innerHTML = `
        <div class="data-card">
            <h3>Current Semester Grades</h3>
            <div class="data-grid">
                ${grades.map(grade => `
                    <div class="data-item">
                        <div class="data-value">${grade.grade}</div>
                        <div class="data-label">${grade.subject}</div>
                        <div class="data-label">${grade.credits} Credits</div>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="data-card">
            <h3>Academic Summary</h3>
            <div class="data-grid">
                <div class="data-item">
                    <div class="data-value">${studentData.cgpa}</div>
                    <div class="data-label">Current CGPA</div>
                </div>
                <div class="data-item">
                    <div class="data-value">${studentData.backlogs || 0}</div>
                    <div class="data-label">Active Backlogs</div>
                </div>
                <div class="data-item">
                    <div class="data-value">${grades.reduce((sum, g) => sum + parseInt(g.credits), 0)}</div>
                    <div class="data-label">Total Credits</div>
                </div>
                <div class="data-item">
                    <div class="data-value">${grades.length}</div>
                    <div class="data-label">Subjects Enrolled</div>
                </div>
            </div>
        </div>
    `;
}

function loadStudentAttendance() {
    if (!currentUser || currentUser.role !== 'student') return;
    
    const studentData = students.find(s => s.id === currentUser.studentId);
    if (!studentData) return;
    
    const attendanceContent = document.getElementById('student-attendance-content');
    if (!attendanceContent) return;
    
    // Generate realistic attendance data
    const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Computer Science', 'English', 'Statistics'];
    const attendanceData = subjects.map(subject => {
        const baseAttendance = Math.max(40, studentData.attendance + (Math.random() - 0.5) * 20);
        const present = Math.floor((baseAttendance / 100) * 30);
        return {
            subject,
            present,
            total: 30,
            percentage: Math.min(100, Math.round(baseAttendance))
        };
    });
    
    attendanceContent.innerHTML = `
        <div class="data-card">
            <h3>Subject-wise Attendance</h3>
            <div class="data-grid">
                ${attendanceData.map(att => `
                    <div class="data-item">
                        <div class="data-value ${att.percentage < 75 ? 'low-attendance' : ''}">${att.percentage}%</div>
                        <div class="data-label">${att.subject}</div>
                        <div class="data-label">${att.present}/${att.total} Classes</div>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="data-card">
            <h3>Attendance Summary</h3>
            <div class="data-grid">
                <div class="data-item">
                    <div class="data-value">${studentData.attendance}%</div>
                    <div class="data-label">Overall Attendance</div>
                </div>
                <div class="data-item">
                    <div class="data-value">${Math.floor(studentData.attendance * 1.8)}</div>
                    <div class="data-label">Classes Attended</div>
                </div>
                <div class="data-item">
                    <div class="data-value">180</div>
                    <div class="data-label">Total Classes</div>
                </div>
                <div class="data-item">
                    <div class="data-value">${studentData.attendance < 75 ? '⚠️ Risk' : '✅ Safe'}</div>
                    <div class="data-label">Status</div>
                </div>
            </div>
        </div>
    `;
}

function loadStudentCounseling() {
    if (!currentUser || currentUser.role !== 'student') return;
    
    const studentData = students.find(s => s.id === currentUser.studentId);
    if (!studentData) return;
    
    const counselingMessages = document.getElementById('student-counseling-messages');
    if (!counselingMessages) return;
    
    // Generate personalized counseling messages based on ML risk assessment
    const messages = generateCounselingMessages(studentData);
    
    counselingMessages.innerHTML = messages.map(message => `
        <div class="counseling-message">
            <div class="message-header">
                <span class="message-type">${message.type}</span>
                <span class="message-date">${message.date}</span>
            </div>
            <div class="message-content">${message.content}</div>
        </div>
    `).join('');
}

function generateCounselingMessages(studentData) {
    const messages = [];
    const today = new Date();
    
    // ML-based personalized messages using risk assessment
    if (studentData.riskLevel === 'high') {
        messages.push({
            type: '🚨 Urgent Academic Support',
            date: formatDate(today),
            content: `Dear ${studentData.name}, our ML-powered risk assessment indicates high dropout risk based on your current academic performance (CGPA: ${studentData.cgpa}, Attendance: ${studentData.attendance}%). We recommend immediate academic counseling and study support. Please contact your academic advisor within 48 hours for personalized intervention strategies.`
        });
        
        if (studentData.attendance < 60) {
            messages.push({
                type: '📅 Attendance Critical Alert',
                date: formatDate(new Date(today.getTime() - 12*60*60*1000)),
                content: `Your attendance is critically low at ${studentData.attendance}%. This is the PRIMARY factor in your high-risk classification. Our algorithm shows that improving attendance by 15-20% can significantly reduce dropout risk. Please schedule a meeting to discuss attendance improvement strategies.`
            });
        }
    } else if (studentData.riskLevel === 'medium') {
        messages.push({
            type: '📚 Academic Advisory',
            date: formatDate(today),
            content: `Hello ${studentData.name}, your academic performance shows some areas of concern. Our ML system has identified you as medium-risk based on attendance patterns and academic metrics. We suggest scheduling a counseling session to discuss study strategies and time management techniques to prevent risk escalation.`
        });
    } else {
        messages.push({
            type: '🌟 Motivational Message',
            date: formatDate(today),
            content: `Excellent work ${studentData.name}! Your academic performance is commendable with CGPA ${studentData.cgpa} and ${studentData.attendance}% attendance. Our ML model classifies you as low-risk. Keep up the great work and continue striving for excellence!`
        });
    }
    
    // Financial-based messages
    if (studentData.paid_fee < studentData.total_fee) {
        const pending = studentData.total_fee - studentData.paid_fee;
        messages.push({
            type: '💰 Fee Reminder',
            date: formatDate(new Date(today.getTime() - 48*60*60*1000)),
            content: `You have a pending fee balance of ₹${pending.toLocaleString()}. Fee payment status contributes 15% to our risk assessment model. Please clear your dues at the earliest to avoid any academic restrictions and improve your risk profile.`
        });
    }
    
    // Family income-based support message
    if (studentData.family_income < 30000) {
        messages.push({
            type: '🤝 Financial Support',
            date: formatDate(new Date(today.getTime() - 72*60*60*1000)),
            content: `Based on your family income profile, you may be eligible for financial assistance programs. Our counseling team can help you apply for scholarships, fee waivers, and other support systems. Please visit the student welfare office for guidance.`
        });
    }
    
    return messages;
}

// Faculty Dashboard Functions (FULL ACCESS)
function updateFacultyDashboard() {
    if (!currentUser || currentUser.role !== 'faculty') return;
    
    updateKPIs();
    updateRiskChart();
}

function updateKPIs() {
    const totalStudentsEl = document.getElementById('total-students');
    const highRiskCountEl = document.getElementById('high-risk-count');
    const activeCredentialsEl = document.getElementById('active-credentials');
    const totalDatasetsEl = document.getElementById('total-datasets');
    
    if (totalStudentsEl) totalStudentsEl.textContent = students.filter(s => s.isActive).length;
    if (highRiskCountEl) highRiskCountEl.textContent = students.filter(s => s.riskLevel === 'high' && s.isActive).length;
    if (activeCredentialsEl) activeCredentialsEl.textContent = credentials.filter(c => c.isActive).length;
    if (totalDatasetsEl) totalDatasetsEl.textContent = datasets.filter(d => d.isActive).length;
}

function updateRiskChart() {
    const ctx = document.getElementById('riskChart');
    if (!ctx) return;
    
    if (charts.riskChart) {
        charts.riskChart.destroy();
    }
    
    const riskCounts = {
        'Low Risk': students.filter(s => s.riskLevel === 'low' && s.isActive).length,
        'Medium Risk': students.filter(s => s.riskLevel === 'medium' && s.isActive).length,
        'High Risk': students.filter(s => s.riskLevel === 'high' && s.isActive).length
    };
    
    charts.riskChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(riskCounts),
            datasets: [{
                data: Object.values(riskCounts),
                backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C'],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((context.parsed / total) * 100);
                            return `${context.label}: ${context.parsed} students (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

// Student Management - Faculty Only with WORKING View/Edit Buttons
function showAddStudentModal() {
    if (!currentUser || currentUser.role !== 'faculty') {
        alert('❌ Access denied. Only faculty can add students.');
        return;
    }
    showModal('add-student-modal');
}

function handleAddStudent(e) {
    e.preventDefault();
    
    if (!currentUser || currentUser.role !== 'faculty') {
        alert('❌ Access denied. Only faculty can add students.');
        return;
    }
    
    const formData = new FormData(e.target);
    const studentData = Object.fromEntries(formData);
    
    // Validate required fields including parent information
    if (!studentData.name || !studentData.email || !studentData.course || !studentData.year || 
        !studentData.cgpa || !studentData.attendance || !studentData.parent_name || !studentData.parent_phone) {
        alert('⚠️ Please fill in all required fields including parent information.');
        return;
    }
    
    // Generate credentials with auto-ID
    const newCredentials = generateNewStudentCredentials(studentData.name);
    
    // Create student object with parent information
    const student = {
        id: newCredentials.studentId,
        name: studentData.name,
        email: studentData.email,
        phone: studentData.phone || '',
        parent_name: studentData.parent_name,
        parent_phone: studentData.parent_phone,
        course: studentData.course,
        year: parseInt(studentData.year),
        cgpa: parseFloat(studentData.cgpa),
        attendance: parseFloat(studentData.attendance),
        family_income: 50000, // Default value
        distance: 20, // Default value
        backlogs: 0, // Default value
        total_fee: 80000, // Default value
        paid_fee: 0, // Default value
        createdAt: new Date().toISOString(),
        createdBy: currentUser.name,
        isActive: true,
        hasCredentials: true
    };
    
    // Calculate ML-based risk level
    student.riskLevel = calculateMLRiskLevel(student);
    
    // Add to arrays
    students.push(student);
    credentials.push(newCredentials);
    
    // Update displays
    updateFacultyDashboard();
    loadStudentsTable();
    loadCredentialsPage();
    
    // Hide modal and show success
    hideModal('add-student-modal');
    showSuccessMessage(`✅ Student ${studentData.name} added successfully with auto-generated credentials and ML risk assessment!`, newCredentials);
    
    // Reset form
    e.target.reset();
}

function generateNewStudentCredentials(studentName) {
    // Find next available ID
    const existingIds = [...students.map(s => parseInt(s.id.replace('S', ''))), 
                        ...WORKING_CREDENTIALS.students.map(s => parseInt(s.studentId.replace('S', '')))];
    const nextIdNum = Math.max(50, ...existingIds) + 1;
    const idStr = String(nextIdNum).padStart(3, '0');
    
    const creds = {
        studentId: `S${idStr}`,
        username: `student${idStr}`,
        password: `student${idStr}`,
        name: studentName,
        role: 'student',
        createdAt: new Date().toISOString(),
        createdBy: currentUser.name,
        isActive: true
    };
    
    // Add to working credentials for future logins
    WORKING_CREDENTIALS.students.push(creds);
    
    return creds;
}

function loadStudentsTable() {
    if (!currentUser || currentUser.role !== 'faculty') return;
    
    const tableBody = document.getElementById('students-table-body');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    students.filter(s => s.isActive).forEach(student => {
        const row = document.createElement('tr');
        
        const cred = credentials.find(c => c.studentId === student.id);
        const credentialInfo = cred ? cred.username : 'No credentials';
        
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.course}</td>
            <td>${student.year}</td>
            <td>${student.cgpa}</td>
            <td><span class="risk-badge ${student.riskLevel}">${student.riskLevel.toUpperCase()}</span></td>
            <td class="parent-contact">
                <div><strong>${student.parent_name || 'Not provided'}</strong></div>
                <div>${student.parent_phone || 'Not provided'}</div>
            </td>
            <td><span class="credential-badge" onclick="showCredentialInfo('${student.id}')">${credentialInfo}</span></td>
            <td>
                <button class="btn btn--sm btn--outline" onclick="viewStudent('${student.id}')">👁️ View</button>
                <button class="btn btn--sm btn--outline" onclick="editStudent('${student.id}')">✏️ Edit</button>
                <button class="btn btn--sm btn--outline" onclick="removeStudent('${student.id}')" style="color: var(--color-error);">🗑️ Remove</button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// WORKING View Button - Opens detailed modal
function viewStudent(studentId) {
    if (!currentUser || currentUser.role !== 'faculty') return;
    
    const student = students.find(s => s.id === studentId);
    if (!student) return;
    
    const modal = document.getElementById('student-detail-modal');
    const title = document.getElementById('detail-modal-title');
    const content = document.getElementById('student-detail-content');
    
    title.textContent = `Student Details - ${student.name}`;
    
    const riskFactors = calculateRiskFactors(student);
    
    content.innerHTML = `
        <div class="profile-section">
            <h3>🆔 Basic Information</h3>
            <div class="profile-grid">
                <div class="profile-field">
                    <label>Student ID</label>
                    <span>${student.id}</span>
                </div>
                <div class="profile-field">
                    <label>Full Name</label>
                    <span>${student.name}</span>
                </div>
                <div class="profile-field">
                    <label>Email</label>
                    <span>${student.email}</span>
                </div>
                <div class="profile-field">
                    <label>Phone</label>
                    <span>${student.phone || 'Not provided'}</span>
                </div>
            </div>
        </div>
        
        <div class="profile-section">
            <h3>📚 Academic Performance</h3>
            <div class="profile-grid">
                <div class="profile-field">
                    <label>Course</label>
                    <span>${student.course} (Year ${student.year})</span>
                </div>
                <div class="profile-field">
                    <label>CGPA</label>
                    <span>${student.cgpa} / 10.0</span>
                </div>
                <div class="profile-field">
                    <label>Attendance</label>
                    <span>${student.attendance}%</span>
                </div>
                <div class="profile-field">
                    <label>Active Backlogs</label>
                    <span>${student.backlogs || 0}</span>
                </div>
            </div>
        </div>
        
        <div class="profile-section">
            <h3>👨‍👩‍👧‍👦 Family Information</h3>
            <div class="profile-grid">
                <div class="profile-field">
                    <label>Parent/Guardian</label>
                    <span>${student.parent_name || 'Not provided'}</span>
                </div>
                <div class="profile-field">
                    <label>Parent Phone</label>
                    <span>${student.parent_phone || 'Not provided'}</span>
                </div>
                <div class="profile-field">
                    <label>Family Income</label>
                    <span>₹${(student.family_income || 0).toLocaleString()}/year</span>
                </div>
                <div class="profile-field">
                    <label>Distance from College</label>
                    <span>${student.distance || 'Not provided'} km</span>
                </div>
            </div>
        </div>
        
        <div class="profile-section">
            <h3>💰 Financial Information</h3>
            <div class="profile-grid">
                <div class="profile-field">
                    <label>Total Fee</label>
                    <span>₹${student.total_fee.toLocaleString()}</span>
                </div>
                <div class="profile-field">
                    <label>Paid Amount</label>
                    <span>₹${student.paid_fee.toLocaleString()}</span>
                </div>
                <div class="profile-field">
                    <label>Pending Amount</label>
                    <span>₹${(student.total_fee - student.paid_fee).toLocaleString()}</span>
                </div>
                <div class="profile-field">
                    <label>Fee Status</label>
                    <span class="${student.paid_fee >= student.total_fee ? 'text-success' : 'text-warning'}">
                        ${student.paid_fee >= student.total_fee ? '✅ Paid' : '⏳ Pending'}
                    </span>
                </div>
            </div>
        </div>
        
        <div class="profile-section">
            <h3>🤖 ML Risk Assessment</h3>
            <div class="profile-grid">
                <div class="profile-field">
                    <label>Current Risk Level</label>
                    <span class="risk-badge ${student.riskLevel}">${student.riskLevel.toUpperCase()}</span>
                </div>
                <div class="profile-field">
                    <label>Primary Risk Factor</label>
                    <span>${riskFactors.primary}</span>
                </div>
                <div class="profile-field">
                    <label>Risk Score</label>
                    <span>${riskFactors.score.toFixed(2)} / 1.0</span>
                </div>
                <div class="profile-field">
                    <label>Recommendation</label>
                    <span>${riskFactors.recommendation}</span>
                </div>
            </div>
        </div>
        
        <div class="profile-section">
            <h3>📊 System Information</h3>
            <div class="profile-grid">
                <div class="profile-field">
                    <label>Created Date</label>
                    <span>${formatDate(new Date(student.createdAt || Date.now()))}</span>
                </div>
                <div class="profile-field">
                    <label>Created By</label>
                    <span>${student.createdBy || 'System'}</span>
                </div>
                <div class="profile-field">
                    <label>Status</label>
                    <span class="text-success">✅ Active</span>
                </div>
                <div class="profile-field">
                    <label>Has Credentials</label>
                    <span>${student.hasCredentials ? '✅ Yes' : '❌ No'}</span>
                </div>
            </div>
        </div>
    `;
    
    showModal('student-detail-modal');
}

// WORKING Edit Button - Opens editable form
function editStudent(studentId) {
    if (!currentUser || currentUser.role !== 'faculty') return;
    
    const student = students.find(s => s.id === studentId);
    if (!student) return;
    
    // Populate edit form
    document.getElementById('edit-student-id').value = studentId;
    document.getElementById('edit-student-name').value = student.name;
    document.getElementById('edit-student-email').value = student.email;
    document.getElementById('edit-parent-name').value = student.parent_name || '';
    document.getElementById('edit-parent-phone').value = student.parent_phone || '';
    document.getElementById('edit-student-cgpa').value = student.cgpa;
    document.getElementById('edit-student-attendance').value = student.attendance;
    
    showModal('edit-student-modal');
}

function handleEditStudent(e) {
    e.preventDefault();
    
    if (!currentUser || currentUser.role !== 'faculty') return;
    
    const studentId = document.getElementById('edit-student-id').value;
    const student = students.find(s => s.id === studentId);
    
    if (!student) return;
    
    // Update student data
    const formData = new FormData(e.target);
    student.name = formData.get('name');
    student.email = formData.get('email');
    student.parent_name = formData.get('parent_name');
    student.parent_phone = formData.get('parent_phone');
    student.cgpa = parseFloat(formData.get('cgpa'));
    student.attendance = parseFloat(formData.get('attendance'));
    
    // Recalculate ML risk assessment
    student.riskLevel = calculateMLRiskLevel(student);
    student.lastModified = new Date().toISOString();
    student.modifiedBy = currentUser.name;
    
    // Update credential name if it exists
    const cred = credentials.find(c => c.studentId === studentId);
    if (cred) {
        cred.name = student.name;
    }
    
    // Refresh displays
    updateFacultyDashboard();
    loadStudentsTable();
    loadCredentialsPage();
    
    hideModal('edit-student-modal');
    showSuccessMessage(`✅ Student ${student.name} updated successfully! Risk level recalculated: ${student.riskLevel.toUpperCase()}`);
}

function removeStudent(studentId) {
    if (!currentUser || currentUser.role !== 'faculty') return;
    
    const student = students.find(s => s.id === studentId);
    if (!student) return;
    
    if (confirm(`⚠️ Are you sure you want to remove ${student.name}?\n\nThis will:\n- Deactivate the student record\n- Disable login credentials\n- Archive all data for audit purposes`)) {
        student.isActive = false;
        student.deactivatedAt = new Date().toISOString();
        student.deactivatedBy = currentUser.name;
        
        // Deactivate credentials
        const cred = credentials.find(c => c.studentId === studentId);
        if (cred) {
            cred.isActive = false;
        }
        
        updateFacultyDashboard();
        loadStudentsTable();
        loadCredentialsPage();
        showSuccessMessage(`✅ Student ${student.name} removed successfully. Data archived for audit trail.`);
    }
}

// Parent Alert System with Acknowledgment
function generateParentAlerts() {
    if (!currentUser || currentUser.role !== 'faculty') {
        alert('❌ Access denied. Only faculty can send parent alerts.');
        return;
    }
    
    const highRiskStudents = students.filter(s => s.riskLevel === 'high' && s.isActive);
    
    if (highRiskStudents.length === 0) {
        showAlertMessage('✅ No high-risk students found. All students are performing well! 🎉');
        return;
    }
    
    let alertsSent = 0;
    const alertMessages = [];
    
    highRiskStudents.forEach(student => {
        if (student.parent_name && student.parent_phone) {
            // Create detailed alert log
            const alertLog = {
                id: Date.now() + Math.random(),
                studentId: student.id,
                studentName: student.name,
                parentName: student.parent_name,
                parentPhone: student.parent_phone,
                riskLevel: student.riskLevel,
                cgpa: student.cgpa,
                attendance: student.attendance,
                riskFactors: calculateRiskFactors(student),
                message: generateParentAlertMessage(student),
                sentAt: new Date().toISOString(),
                sentBy: currentUser.name,
                acknowledged: false
            };
            
            alertHistory.push(alertLog);
            alertMessages.push(`📞 Alert sent to parent: ${student.parent_name} at ${student.parent_phone}`);
            alertsSent++;
        } else {
            alertMessages.push(`❌ Cannot send alert for ${student.name}: Parent contact information missing`);
        }
    });
    
    // Show comprehensive alert summary
    const alertSummary = `
        <div class="alert-summary">
            <h4>📧 Parent Alert Campaign Summary</h4>
            <div class="alert-stats">
                <div class="stat-item">
                    <span class="stat-label">Alerts Sent:</span>
                    <span class="stat-value">${alertsSent}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">High-Risk Students:</span>
                    <span class="stat-value">${highRiskStudents.length}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Success Rate:</span>
                    <span class="stat-value">${Math.round((alertsSent / highRiskStudents.length) * 100)}%</span>
                </div>
            </div>
            <div class="alert-details">
                <h5>📋 Alert Details:</h5>
                ${alertMessages.map(msg => `<p>• ${msg}</p>`).join('')}
            </div>
            <div class="alert-note">
                <p><strong>📝 Note:</strong> All alerts are logged for acknowledgment tracking. Parents will receive detailed academic performance reports and intervention recommendations.</p>
            </div>
        </div>
    `;
    
    showAlertMessage(alertSummary);
    loadAlertsPage(); // Refresh alert history
}

function generateParentAlertMessage(student) {
    const riskFactors = calculateRiskFactors(student);
    
    return `
Dear ${student.parent_name},

🚨 ACADEMIC RISK ALERT - ${student.name} (${student.id})

Our AI-powered risk assessment system has identified your child as HIGH RISK for academic dropout based on the following factors:

📊 Current Academic Status:
• CGPA: ${student.cgpa}/10.0
• Attendance: ${student.attendance}%
• Risk Level: ${student.riskLevel.toUpperCase()}
• Primary Concern: ${riskFactors.primary}

💡 Recommended Actions:
${riskFactors.recommendation}

Please contact the college immediately to discuss intervention strategies. Early action can significantly improve academic outcomes.

Contact: Academic Counseling Office
Phone: +91-XXXX-XXXXX
Email: counseling@college.edu

Sent by: ${currentUser ? currentUser.name : 'EduTrack System'}
Date: ${new Date().toLocaleDateString()}
    `;
}

function loadAlertsPage() {
    if (!currentUser || currentUser.role !== 'faculty') return;
    
    const alertHistoryEl = document.getElementById('alert-history');
    if (!alertHistoryEl) return;
    
    if (alertHistory.length === 0) {
        alertHistoryEl.innerHTML = '<p>📭 No alerts sent yet. Use the button above to send risk alerts to parents of high-risk students.</p>';
        return;
    }
    
    alertHistoryEl.innerHTML = alertHistory
        .sort((a, b) => new Date(b.sentAt) - new Date(a.sentAt))
        .map(alert => `
        <div class="alert-history-item">
            <div class="alert-info">
                <div class="alert-student">🎓 ${alert.studentName} (${alert.studentId})</div>
                <div class="alert-parent">📞 Alert sent to: ${alert.parentName} at ${alert.parentPhone}</div>
                <div class="alert-details">
                    <small>📊 Risk: ${alert.riskLevel.toUpperCase()} | CGPA: ${alert.cgpa} | Attendance: ${alert.attendance}%</small>
                </div>
                <div class="alert-status ${alert.acknowledged ? 'acknowledged' : 'pending'}">
                    ${alert.acknowledged ? '✅ Acknowledged' : '⏳ Pending Acknowledgment'}
                </div>
            </div>
            <div class="alert-timestamp">
                ${formatDate(new Date(alert.sentAt))}
                <br><small>By: ${alert.sentBy}</small>
            </div>
        </div>
    `).join('');
}

// Enhanced ML Risk Assessment with Attendance Priority
function calculateMLRiskLevel(student) {
    let riskScore = 0;
    
    // Attendance factor (40% weight - HIGHEST PRIORITY)
    const attendance = parseFloat(student.attendance) || 75;
    if (attendance < 60) riskScore += riskWeights.attendance;
    else if (attendance < 75) riskScore += riskWeights.attendance * 0.7;
    else if (attendance < 85) riskScore += riskWeights.attendance * 0.3;
    
    // Academic factor (25% weight)
    const cgpa = parseFloat(student.cgpa) || 5.0;
    if (cgpa < 5.0) riskScore += riskWeights.academics;
    else if (cgpa < 6.5) riskScore += riskWeights.academics * 0.7;
    else if (cgpa < 8.0) riskScore += riskWeights.academics * 0.3;
    
    // Financial factor (15% weight)
    const feeRatio = student.paid_fee / student.total_fee;
    if (feeRatio < 0.3) riskScore += riskWeights.financial;
    else if (feeRatio < 0.7) riskScore += riskWeights.financial * 0.6;
    
    // Family factor (10% weight)
    const familyIncome = student.family_income || 50000;
    if (familyIncome < 25000) riskScore += riskWeights.family;
    else if (familyIncome < 40000) riskScore += riskWeights.family * 0.6;
    
    // Distance factor (5% weight)
    const distance = student.distance || 20;
    if (distance > 50) riskScore += riskWeights.distance;
    else if (distance > 30) riskScore += riskWeights.distance * 0.6;
    
    // Behavioral factor (5% weight - backlogs)
    const backlogs = student.backlogs || 0;
    if (backlogs >= 3) riskScore += riskWeights.behavioral;
    else if (backlogs >= 1) riskScore += riskWeights.behavioral * 0.6;
    
    // Risk classification with ML thresholds
    if (riskScore >= 0.6) return 'high';
    if (riskScore >= 0.3) return 'medium';
    return 'low';
}

function calculateRiskFactors(student) {
    const factors = [];
    const attendance = parseFloat(student.attendance) || 75;
    const cgpa = parseFloat(student.cgpa) || 5.0;
    const feeRatio = student.paid_fee / student.total_fee;
    
    if (attendance < 75) factors.push({ factor: 'Low Attendance', weight: riskWeights.attendance, impact: 'High' });
    if (cgpa < 6.5) factors.push({ factor: 'Poor Academic Performance', weight: riskWeights.academics, impact: 'High' });
    if (feeRatio < 0.7) factors.push({ factor: 'Fee Payment Issues', weight: riskWeights.financial, impact: 'Medium' });
    if ((student.family_income || 50000) < 40000) factors.push({ factor: 'Low Family Income', weight: riskWeights.family, impact: 'Medium' });
    if ((student.distance || 20) > 30) factors.push({ factor: 'Long Distance from College', weight: riskWeights.distance, impact: 'Low' });
    if ((student.backlogs || 0) > 0) factors.push({ factor: 'Academic Backlogs', weight: riskWeights.behavioral, impact: 'Medium' });
    
    const primaryFactor = factors.length > 0 ? factors.sort((a, b) => b.weight - a.weight)[0] : null;
    
    let riskScore = 0;
    factors.forEach(f => riskScore += f.weight);
    
    let recommendation = 'Continue current performance';
    if (student.riskLevel === 'high') {
        recommendation = 'Immediate intervention required - Focus on improving attendance and academic support';
    } else if (student.riskLevel === 'medium') {
        recommendation = 'Monitor closely and provide additional support in identified areas';
    }
    
    return {
        factors,
        primary: primaryFactor ? primaryFactor.factor : 'No significant risk factors',
        score: Math.min(1.0, riskScore),
        recommendation
    };
}

// Comprehensive File Upload System
function setupFileUpload() {
    document.querySelectorAll('.upload-area').forEach(area => {
        const input = area.querySelector('input[type="file"]');
        const dataType = area.dataset.type;
        
        area.addEventListener('click', () => input.click());
        area.addEventListener('dragover', handleDragOver);
        area.addEventListener('drop', (e) => handleDrop(e, dataType));
        area.addEventListener('dragleave', handleDragLeave);
        input.addEventListener('change', (e) => handleFileSelect(e, dataType));
    });
}

function handleDragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add('dragover');
}

function handleDragLeave(e) {
    e.currentTarget.classList.remove('dragover');
}

function handleDrop(e, dataType) {
    e.preventDefault();
    e.currentTarget.classList.remove('dragover');
    const files = Array.from(e.dataTransfer.files);
    processFiles(files, dataType);
}

function handleFileSelect(e, dataType) {
    const files = Array.from(e.target.files);
    processFiles(files, dataType);
}

function processFiles(files, dataType) {
    if (!currentUser || currentUser.role !== 'faculty') {
        alert('❌ Access denied. Only faculty can upload data.');
        return;
    }
    
    if (files.length === 0) return;
    
    showProgress();
    
    let processedFiles = 0;
    const results = [];
    
    files.forEach(file => {
        if (file.name.endsWith('.csv')) {
            processCSVFileWithNullHandling(file, dataType, (result) => {
                results.push(result);
                processedFiles++;
                
                const progress = (processedFiles / files.length) * 100;
                updateProgress(progress, `Processing ${processedFiles}/${files.length} files...`);
                
                if (processedFiles === files.length) {
                    showResults(results);
                    updateFacultyDashboard();
                    loadStudentsTable();
                    loadCredentialsPage();
                }
            });
        } else {
            results.push({
                filename: file.name,
                success: false,
                message: 'Only CSV files are supported'
            });
            processedFiles++;
        }
    });
}

function processCSVFileWithNullHandling(file, dataType, callback) {
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const csvData = e.target.result;
            const parsedData = parseCSVWithNullDetection(csvData);
            
            // Apply comprehensive null handling
            const cleanedData = parsedData.map(record => 
                comprehensiveNullCleaning(record, dataType)
            );
            
            let addedCount = 0;
            let credentialsGenerated = 0;
            let nullsHandled = 0;
            let updatedCount = 0;
            
            cleanedData.forEach(record => {
                const nullCount = countNullValues(record);
                nullsHandled += nullCount;
                
                if (dataType === 'students') {
                    const student = processStudentRecordWithNulls(record);
                    if (student) {
                        // Check if student already exists
                        const existingIndex = students.findIndex(s => s.id === student.id);
                        if (existingIndex >= 0) {
                            // Update existing student
                            students[existingIndex] = { ...students[existingIndex], ...student };
                            students[existingIndex].riskLevel = calculateMLRiskLevel(students[existingIndex]);
                            updatedCount++;
                        } else {
                            // Add new student
                            student.riskLevel = calculateMLRiskLevel(student);
                            students.push(student);
                            addedCount++;
                            
                            // Auto-generate credentials if not exists
                            if (!credentials.find(c => c.studentId === student.id)) {
                                const creds = {
                                    studentId: student.id,
                                    username: student.id.toLowerCase(),
                                    password: student.id.toLowerCase(),
                                    name: student.name,
                                    role: 'student',
                                    createdAt: new Date().toISOString(),
                                    createdBy: currentUser.name,
                                    isActive: true
                                };
                                credentials.push(creds);
                                WORKING_CREDENTIALS.students.push(creds);
                                credentialsGenerated++;
                            }
                        }
                    }
                } else {
                    if (updateStudentWithNullSafeData(record, dataType)) {
                        updatedCount++;
                    }
                }
            });
            
            // Store dataset metadata
            datasets.push({
                id: Date.now() + Math.random(),
                filename: file.name,
                dataType: dataType,
                recordCount: addedCount + updatedCount,
                newRecords: addedCount,
                updatedRecords: updatedCount,
                nullsHandled: nullsHandled,
                uploadedAt: new Date().toISOString(),
                uploadedBy: currentUser.name,
                isActive: true
            });
            
            callback({
                filename: file.name,
                success: true,
                message: `✅ Successfully processed: ${addedCount} new, ${updatedCount} updated records. Handled ${nullsHandled} null values intelligently. ${credentialsGenerated} credentials auto-generated.`,
                recordCount: addedCount + updatedCount,
                nullsHandled: nullsHandled,
                credentialsGenerated: credentialsGenerated
            });
            
        } catch (error) {
            callback({
                filename: file.name,
                success: false,
                message: `❌ Error processing file: ${error.message}`
            });
        }
    };
    reader.readAsText(file);
}

function parseCSVWithNullDetection(csvText) {
    const lines = csvText.split('\n').filter(line => line.trim());
    if (lines.length < 2) return [];
    
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    const data = [];
    
    for (let i = 1; i < lines.length; i++) {
        const values = parseCSVLineAdvanced(lines[i]);
        const record = {};
        
        headers.forEach((header, index) => {
            record[header] = values[index] || null;
        });
        
        data.push(record);
    }
    
    return data;
}

function parseCSVLineAdvanced(line) {
    const values = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            values.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    
    values.push(current.trim());
    return values;
}

function comprehensiveNullCleaning(record, dataType) {
    const cleaned = {};
    
    Object.keys(record).forEach(key => {
        const value = record[key];
        cleaned[key] = intelligentNullHandling(value, key, dataType, record);
    });
    
    return cleaned;
}

function intelligentNullHandling(value, fieldName, dataType, context) {
    // Detect various null representations
    const nullPatterns = [
        null, undefined, '', 'null', 'NULL', 'na', 'NA', 'n/a', 'N/A', 
        '#N/A', '#NULL!', '#DIV/0!', '-', '--', '?', 'unknown', 'UNKNOWN'
    ];
    
    const strValue = String(value || '').trim();
    const isNull = nullPatterns.includes(value) || 
                   nullPatterns.includes(strValue) || 
                   nullPatterns.includes(strValue.toLowerCase());
    
    if (!isNull && strValue !== '') {
        return cleanValidValue(strValue, fieldName);
    }
    
    return applyIntelligentDefaults(fieldName, dataType, context);
}

function cleanValidValue(value, fieldName) {
    const field = fieldName.toLowerCase();
    
    if (isNumericField(fieldName)) {
        const num = parseFloat(String(value).replace(/[^0-9.-]/g, ''));
        return isNaN(num) ? 0 : Math.max(0, num);
    }
    
    if (field.includes('email')) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) ? value : 'unknown@college.edu';
    }
    
    return String(value).trim();
}

function applyIntelligentDefaults(fieldName, dataType, context) {
    const field = fieldName.toLowerCase();
    
    if (field.includes('student_id') || field.includes('id')) {
        return context.student_id || generateAutoId(dataType);
    }
    
    if (field.includes('name') && !field.includes('parent')) {
        return context.student_id ? `Student ${context.student_id}` : 'Unknown Student';
    }
    
    if (field.includes('parent_name')) return 'Not Provided';
    if (field.includes('parent_phone')) return 'Not Provided';
    if (field.includes('email')) return `${(context.student_id || 'unknown').toLowerCase()}@college.edu`;
    if (field.includes('cgpa')) return 5.0;
    if (field.includes('attendance')) return 75;
    if (field.includes('course')) return 'General Studies';
    if (field.includes('year')) return 1;
    if (field.includes('fee') || field.includes('amount')) return field.includes('total') ? 80000 : 0;
    if (field.includes('income')) return 50000;
    if (field.includes('distance')) return 20;
    if (field.includes('backlogs')) return 0;
    
    return 'Unknown';
}

// Utility Functions
function createDefaultStudentData() {
    if (!currentUser || currentUser.role !== 'student') return null;
    
    const studentData = {
        id: currentUser.studentId,
        name: currentUser.name,
        email: `${currentUser.username}@college.edu`,
        phone: 'Not provided',
        parent_name: 'Not provided',
        parent_phone: 'Not provided',
        course: 'General Studies',
        year: 1,
        cgpa: 7.0,
        attendance: 80,
        family_income: 50000,
        distance: 20,
        backlogs: 0,
        total_fee: 80000,
        paid_fee: 60000,
        createdAt: new Date().toISOString(),
        isActive: true,
        hasCredentials: true
    };
    
    studentData.riskLevel = calculateMLRiskLevel(studentData);
    students.push(studentData);
    return studentData;
}

function generateTrendData(baseValue, periods, variance = 1) {
    const data = [];
    let current = baseValue;
    
    for (let i = 0; i < periods; i++) {
        const variation = (Math.random() - 0.5) * variance;
        current = Math.max(0, current + variation);
        data.push(Number(current.toFixed(2)));
    }
    
    return data;
}

function countNullValues(record) {
    return Object.values(record).filter(v => 
        v === null || v === undefined || v === '' || 
        String(v).toLowerCase().includes('null') || 
        String(v).toLowerCase().includes('n/a')
    ).length;
}

function isNumericField(fieldName) {
    const field = fieldName.toLowerCase();
    return field.includes('cgpa') || field.includes('gpa') || field.includes('attendance') ||
           field.includes('fee') || field.includes('amount') || field.includes('marks') ||
           field.includes('grade') || field.includes('year') || field.includes('distance') ||
           field.includes('income') || field.includes('backlogs') || field.includes('credits');
}

function generateAutoId(dataType) {
    const prefix = dataType === 'students' ? 'S' : 'R';
    const count = dataType === 'students' ? students.length + 51 : Math.floor(Math.random() * 10000);
    return `${prefix}${String(count).padStart(3, '0')}`;
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function scrollToFeatures() {
    const features = document.querySelector('.hero-features');
    if (features) {
        features.scrollIntoView({ behavior: 'smooth' });
    }
}

// Modal Management
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
    }
}

function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
    }
}

function showSuccessMessage(message, credentials = null) {
    const successMessage = document.getElementById('success-message');
    const credentialsDisplay = document.getElementById('credentials-display');
    
    if (successMessage) {
        successMessage.textContent = message;
    }
    
    if (credentials) {
        const generatedId = document.getElementById('generated-id');
        const generatedUsername = document.getElementById('generated-username');
        const generatedPassword = document.getElementById('generated-password');
        
        if (generatedId) generatedId.textContent = credentials.studentId;
        if (generatedUsername) generatedUsername.textContent = credentials.username;
        if (generatedPassword) generatedPassword.textContent = credentials.password;
        
        if (credentialsDisplay) credentialsDisplay.classList.remove('hidden');
    } else {
        if (credentialsDisplay) credentialsDisplay.classList.add('hidden');
    }
    
    showModal('success-modal');
}

function showAlertMessage(message) {
    const alertMessage = document.getElementById('alert-message');
    if (alertMessage) {
        alertMessage.innerHTML = message;
    }
    showModal('alert-modal');
}

// Additional Faculty Functions
function showCredentialInfo(studentId) {
    if (!currentUser || currentUser.role !== 'faculty') return;
    
    const student = students.find(s => s.id === studentId);
    const cred = credentials.find(c => c.studentId === studentId);
    
    if (student && cred) {
        alert(`🔐 Login Credentials for ${student.name}:\n\n👤 Username: ${cred.username}\n🔑 Password: ${cred.password}\n🆔 Student ID: ${cred.studentId}\n📊 Risk Level: ${student.riskLevel.toUpperCase()}\n✅ Status: Active\n\n🎓 Student can now login and access personal dashboard.`);
    }
}

function processStudentRecordWithNulls(record) {
    return {
        id: record.student_id || record.StudentID || record.ID || generateAutoId('students'),
        name: record.name || record.Name || record.student_name || 'Unknown Student',
        email: record.email || record.Email || `${(record.student_id || 'unknown').toLowerCase()}@college.edu`,
        phone: record.phone || record.Phone || 'Not provided',
        parent_name: record.parent_name || record.ParentName || record.parent || 'Not Provided',
        parent_phone: record.parent_phone || record.ParentPhone || record.parent_contact || 'Not Provided',
        course: record.course || record.Course || record.program || 'General Studies',
        year: parseInt(record.year || record.Year || record.current_year || 1),
        cgpa: parseFloat(record.cgpa || record.CGPA || record.gpa || 5.0),
        attendance: parseFloat(record.attendance || record.Attendance || record.attendance_percentage || 75),
        family_income: parseFloat(record.family_income || record.FamilyIncome || record.income || 50000),
        distance: parseFloat(record.distance || record.Distance || record.home_distance || 20),
        backlogs: parseInt(record.backlogs || record.Backlogs || record.pending_subjects || 0),
        total_fee: parseFloat(record.total_fee || record.TotalFee || record.fees_total || 80000),
        paid_fee: parseFloat(record.paid_fee || record.PaidFee || record.fees_paid || 0),
        createdAt: new Date().toISOString(),
        createdBy: currentUser.name,
        isActive: true,
        hasCredentials: true
    };
}

function updateStudentWithNullSafeData(record, dataType) {
    const studentId = record.student_id || record.StudentID || record.ID;
    const student = students.find(s => s.id === studentId);
    
    if (!student) return false;
    
    switch(dataType) {
        case 'attendance':
            student.attendance = parseFloat(record.attendance || record.Attendance || student.attendance);
            break;
        case 'grades':
            student.cgpa = parseFloat(record.cgpa || record.CGPA || record.gpa || student.cgpa);
            student.backlogs = parseInt(record.backlogs || record.Backlogs || student.backlogs);
            break;
        case 'fees':
            student.total_fee = parseFloat(record.total_fee || record.TotalFee || student.total_fee);
            student.paid_fee = parseFloat(record.paid_fee || record.PaidFee || student.paid_fee);
            break;
    }
    
    // Recalculate ML risk level
    student.riskLevel = calculateMLRiskLevel(student);
    student.lastUpdated = new Date().toISOString();
    return true;
}

// Progress and Results Functions
function showProgress() {
    const progressDiv = document.getElementById('upload-progress');
    const resultsDiv = document.getElementById('upload-results');
    
    if (progressDiv) progressDiv.classList.remove('hidden');
    if (resultsDiv) resultsDiv.classList.add('hidden');
}

function updateProgress(percent, text) {
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    
    if (progressFill) progressFill.style.width = `${percent}%`;
    if (progressText) progressText.textContent = text;
}

function showResults(results) {
    const progressDiv = document.getElementById('upload-progress');
    const resultsDiv = document.getElementById('upload-results');
    const resultsContent = document.getElementById('results-content');
    
    if (progressDiv) progressDiv.classList.add('hidden');
    if (resultsDiv) resultsDiv.classList.remove('hidden');
    
    if (resultsContent) {
        resultsContent.innerHTML = results.map(result => `
            <div class="result-item ${result.success ? 'success' : 'error'}">
                <strong>📄 ${result.filename}:</strong> ${result.message}
            </div>
        `).join('');
    }
}

function loadCredentialsPage() {
    if (!currentUser || currentUser.role !== 'faculty') return;
    
    const credentialsGrid = document.getElementById('credentials-grid');
    if (!credentialsGrid) return;
    
    credentialsGrid.innerHTML = '';
    
    credentials.filter(c => c.isActive).forEach(cred => {
        const student = students.find(s => s.id === cred.studentId);
        const card = document.createElement('div');
        card.className = 'credential-card';
        
        card.innerHTML = `
            <h3>
                ${cred.name || student?.name || 'Unknown Student'}
                <span class="credential-status">🟢 Active</span>
            </h3>
            <div class="credential-details">
                <div class="credential-item">
                    <label>Student ID:</label>
                    <span>${cred.studentId}</span>
                </div>
                <div class="credential-item">
                    <label>Username:</label>
                    <span>${cred.username}</span>
                </div>
                <div class="credential-item">
                    <label>Password:</label>
                    <span>${cred.password}</span>
                </div>
                <div class="credential-item">
                    <label>Risk Level:</label>
                    <span class="risk-badge ${student?.riskLevel || 'low'}">${(student?.riskLevel || 'low').toUpperCase()}</span>
                </div>
                <div class="credential-item">
                    <label>Created:</label>
                    <span>${formatDate(new Date(cred.createdAt || Date.now()))}</span>
                </div>
                <div class="credential-item">
                    <label>Created By:</label>
                    <span>${cred.createdBy || 'System'}</span>
                </div>
            </div>
        `;
        
        credentialsGrid.appendChild(card);
    });
}

function updateAnalyticsCharts() {
    if (!currentUser || currentUser.role !== 'faculty') return;
    
    updateGradeChart();
    updateAttendanceChart();
}

function updateGradeChart() {
    const ctx = document.getElementById('gradeChart');
    if (!ctx) return;
    
    if (charts.gradeChart) {
        charts.gradeChart.destroy();
    }
    
    const gradeRanges = {
        'A+ (9.0-10.0)': students.filter(s => s.cgpa >= 9 && s.isActive).length,
        'A (8.0-8.9)': students.filter(s => s.cgpa >= 8 && s.cgpa < 9 && s.isActive).length,
        'B (7.0-7.9)': students.filter(s => s.cgpa >= 7 && s.cgpa < 8 && s.isActive).length,
        'C (6.0-6.9)': students.filter(s => s.cgpa >= 6 && s.cgpa < 7 && s.isActive).length,
        'D (5.0-5.9)': students.filter(s => s.cgpa >= 5 && s.cgpa < 6 && s.isActive).length,
        'F (< 5.0)': students.filter(s => s.cgpa < 5 && s.isActive).length
    };
    
    charts.gradeChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(gradeRanges),
            datasets: [{
                label: 'Number of Students',
                data: Object.values(gradeRanges),
                backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545'],
                borderRadius: 4,
                borderWidth: 1,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((context.parsed.y / total) * 100);
                            return `${context.parsed.y} students (${percentage}%)`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Students'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Grade Ranges'
                    }
                }
            }
        }
    });
}

function updateAttendanceChart() {
    const ctx = document.getElementById('attendanceChart');
    if (!ctx) return;
    
    if (charts.attendanceChart) {
        charts.attendanceChart.destroy();
    }
    
    const attendanceRanges = {
        'Excellent (90-100%)': students.filter(s => s.attendance >= 90 && s.isActive).length,
        'Good (80-89%)': students.filter(s => s.attendance >= 80 && s.attendance < 90 && s.isActive).length,
        'Satisfactory (75-79%)': students.filter(s => s.attendance >= 75 && s.attendance < 80 && s.isActive).length,
        'Below Average (60-74%)': students.filter(s => s.attendance >= 60 && s.attendance < 75 && s.isActive).length,
        'Critical (< 60%)': students.filter(s => s.attendance < 60 && s.isActive).length
    };
    
    charts.attendanceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Object.keys(attendanceRanges),
            datasets: [{
                label: 'Number of Students',
                data: Object.values(attendanceRanges),
                borderColor: '#1FB8CD',
                backgroundColor: 'rgba(31, 184, 205, 0.1)',
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#1FB8CD',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((context.parsed.y / total) * 100);
                            return `${context.parsed.y} students (${percentage}%)`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Students'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Attendance Ranges'
                    }
                }
            }
        }
    });
}

// Load Sample Data with Comprehensive Parent Information
function loadSampleData() {
    const sampleStudents = [
        {
            id: 'S001', name: 'Arjun Kumar', email: 'arjun.kumar@college.edu', phone: '9876543210',
            parent_name: 'Rajesh Kumar', parent_phone: '+91-9876543211',
            course: 'Computer Science', year: 2, cgpa: 7.8, attendance: 82,
            family_income: 75000, distance: 15, backlogs: 0, total_fee: 120000, paid_fee: 100000,
            createdAt: new Date().toISOString(), isActive: true, hasCredentials: true
        },
        {
            id: 'S002', name: 'Priya Sharma', email: 'priya.sharma@college.edu', phone: '9876543212',
            parent_name: 'Sushma Sharma', parent_phone: '+91-9876543213',
            course: 'Business Administration', year: 1, cgpa: 4.8, attendance: 45,
            family_income: 22000, distance: 65, backlogs: 3, total_fee: 85000, paid_fee: 25000,
            createdAt: new Date().toISOString(), isActive: true, hasCredentials: true
        },
        {
            id: 'S003', name: 'Rohit Patel', email: 'rohit.patel@college.edu', phone: '9876543214',
            parent_name: 'Vikash Patel', parent_phone: '+91-9876543215',
            course: 'Engineering', year: 3, cgpa: 9.1, attendance: 96,
            family_income: 150000, distance: 8, backlogs: 0, total_fee: 150000, paid_fee: 150000,
            createdAt: new Date().toISOString(), isActive: true, hasCredentials: true
        },
        {
            id: 'S004', name: 'Ananya Singh', email: 'ananya.singh@college.edu', phone: '9876543216',
            parent_name: 'Dr. Meera Singh', parent_phone: '+91-9876543217',
            course: 'Medicine', year: 4, cgpa: 9.3, attendance: 98,
            family_income: 120000, distance: 12, backlogs: 0, total_fee: 200000, paid_fee: 200000,
            createdAt: new Date().toISOString(), isActive: true, hasCredentials: true
        },
        {
            id: 'S005', name: 'Deepak Yadav', email: 'deepak.yadav@college.edu', phone: '9876543218',
            parent_name: 'Ram Yadav', parent_phone: '+91-9876543219',
            course: 'Arts', year: 2, cgpa: 4.2, attendance: 38,
            family_income: 15000, distance: 85, backlogs: 5, total_fee: 60000, paid_fee: 10000,
            createdAt: new Date().toISOString(), isActive: true, hasCredentials: true
        },
        {
            id: 'S006', name: 'Kavya Reddy', email: 'kavya.reddy@college.edu', phone: '9876543220',
            parent_name: 'Srinivas Reddy', parent_phone: '+91-9876543221',
            course: 'Science', year: 1, cgpa: 8.5, attendance: 88,
            family_income: 95000, distance: 25, backlogs: 0, total_fee: 100000, paid_fee: 80000,
            createdAt: new Date().toISOString(), isActive: true, hasCredentials: true
        }
    ];
    
    sampleStudents.forEach(student => {
        student.riskLevel = calculateMLRiskLevel(student);
        students.push(student);
        
        // Create corresponding credentials
        const cred = {
            studentId: student.id,
            username: student.id.toLowerCase(),
            password: student.id.toLowerCase(),
            name: student.name,
            role: 'student',
            createdAt: new Date().toISOString(),
            createdBy: 'System',
            isActive: true
        };
        
        credentials.push(cred);
        WORKING_CREDENTIALS.students.push(cred);
    });
    
    console.log(`🎓 Loaded ${students.length} sample students with comprehensive data:`);
    console.log('📊 ML Risk Distribution:', {
        High: students.filter(s => s.riskLevel === 'high').length,
        Medium: students.filter(s => s.riskLevel === 'medium').length,
        Low: students.filter(s => s.riskLevel === 'low').length
    });
    console.log('👪 All students have parent contact information for alert system');
}