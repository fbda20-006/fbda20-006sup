document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav ul');
    
    mobileMenuBtn.addEventListener('click', function() {
        nav.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });
    
    // Animate Statistics Numbers
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateNumbers() {
        statNumbers.forEach(stat => {
            const target = +stat.getAttribute('data-target');
            const increment = target / 100;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                stat.textContent = Math.floor(current);
                
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(timer);
                }
            }, 20);
        });
    }
    
    // Run animation when stats section is in view
    const statsSection = document.querySelector('.stats');
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateNumbers();
            observer.unobserve(statsSection);
        }
    });
    
    observer.observe(statsSection);
    
    // Tab System for Solutions
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons and contents
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding content
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Eco Quiz
    const quizQuestions = [
        {
            question: "Do you use reusable bags when shopping?",
            options: ["Always", "Sometimes", "Never"],
            scores: [2, 1, 0]
        },
        {
            question: "How often do you recycle?",
            options: ["Always", "Sometimes", "Rarely"],
            scores: [2, 1, 0]
        },
        {
            question: "Do you turn off lights when leaving a room?",
            options: ["Always", "Sometimes", "Never"],
            scores: [2, 1, 0]
        }
    ];
    
    let currentQuestion = 0;
    let totalScore = 0;
    const questionText = document.getElementById('question-text');
    const quizOptions = document.querySelector('.quiz-options');
    const quizQuestion = document.getElementById('quiz-question');
    const quizResult = document.getElementById('quiz-result');
    const scoreDisplay = document.getElementById('score');
    const resultMessage = document.getElementById('result-message');
    const retakeBtn = document.getElementById('retake-btn');
    
    function loadQuestion() {
        if (currentQuestion < quizQuestions.length) {
            const q = quizQuestions[currentQuestion];
            questionText.textContent = q.question;
            
            quizOptions.innerHTML = '';
            q.options.forEach((option, index) => {
                const btn = document.createElement('button');
                btn.className = 'option-btn';
                btn.textContent = option;
                btn.setAttribute('data-score', q.scores[index]);
                btn.addEventListener('click', selectAnswer);
                quizOptions.appendChild(btn);
            });
        } else {
            showResult();
        }
    }
    
    function selectAnswer(e) {
        totalScore += parseInt(e.target.getAttribute('data-score'));
        currentQuestion++;
        loadQuestion();
    }
    
    function showResult() {
        quizQuestion.classList.add('hidden');
        quizResult.classList.remove('hidden');
        scoreDisplay.textContent = totalScore;
        
        if (totalScore >= 5) {
            resultMessage.textContent = "Great job! You're very eco-conscious!";
        } else if (totalScore >= 3) {
            resultMessage.textContent = "Good effort! There's room for improvement.";
        } else {
            resultMessage.textContent = "Consider adopting more sustainable habits!";
        }
    }
    
    retakeBtn.addEventListener('click', function() {
        currentQuestion = 0;
        totalScore = 0;
        quizQuestion.classList.remove('hidden');
        quizResult.classList.add('hidden');
        loadQuestion();
    });
    
    // Initialize quiz
    loadQuestion();
    
    // Form Submission
    const signupForm = document.getElementById('signup-form');
    
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const interest = document.getElementById('interest').value;
        
        // Here you would typically send the data to a server
        console.log({ name, email, interest });
        
        // Show success message
        alert(`Thanks for joining, ${name}! We'll contact you soon about ${interest} opportunities.`);
        
        // Reset form
        signupForm.reset();
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
