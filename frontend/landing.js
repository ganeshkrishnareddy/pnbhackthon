document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if(menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // Modal Logic
    const modals = document.querySelectorAll('.modal-overlay');
    const triggers = document.querySelectorAll('[data-modal]');
    const closes = document.querySelectorAll('.modal-close');

    triggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const id = trigger.getAttribute('data-modal');
            document.getElementById(id).style.display = 'flex';
        });
    });

    closes.forEach(close => {
        close.addEventListener('click', () => {
            close.closest('.modal-overlay').style.display = 'none';
        });
    });

    window.addEventListener('click', (e) => {
        if(e.target.classList.contains('modal-overlay')) {
            e.target.style.display = 'none';
        }
    });

    // Chatbot Logic
    const botToggle = document.getElementById('bot-toggle');
    const botWindow = document.getElementById('bot-window');
    const botClose = document.getElementById('bot-close');
    const botInput = document.getElementById('bot-input');
    const botSend = document.getElementById('bot-send');
    const botMessages = document.getElementById('bot-messages');

    if(botToggle) {
        botToggle.addEventListener('click', () => {
            botWindow.style.display = botWindow.style.display === 'flex' ? 'none' : 'flex';
            if(botWindow.style.display === 'flex') botInput.focus();
        });
        
        botClose.addEventListener('click', () => {
            botWindow.style.display = 'none';
        });
    }

    const kb = {
        'price': 'QuantumGuard is currently free during its beta phase! Enjoy enterprise-level scanning without constraints.',
        'cost': 'QuantumGuard is currently free during its beta phase! Enjoy enterprise-level scanning without constraints.',
        'how to use': 'Simply click "Admin Login" on the homepage, enter a target URL (e.g., mail.google.com), and click Start Scan.',
        'what is cbom': 'CBOM stands for Cryptographic Bill of Materials. It details algorithms, key sizes, signatures, and TLS protocols used by a system.',
        'what is pqc': 'Post-Quantum Cryptography (PQC) refers to cryptographic algorithms that are thought to be secure against an attack by a quantum computer.',
        'who made this': 'QuantumGuard was proudly developed by ProgVision at Lovely Professional University. Team members: Ganesh Krishna Reddy (Lead), Adireddy Pavan, and Cheepuri Venkat Veerendra.',
        'team': 'QuantumGuard was proudly developed by ProgVision at Lovely Professional University. Team members: Ganesh Krishna Reddy (Lead), Adireddy Pavan, and Cheepuri Venkat Veerendra.',
        'developer': 'QuantumGuard was proudly developed by ProgVision at Lovely Professional University. Team members: Ganesh Krishna Reddy (Lead), Adireddy Pavan, and Cheepuri Venkat Veerendra.',
        'devlopers': 'QuantumGuard was proudly developed by ProgVision at Lovely Professional University. Team members: Ganesh Krishna Reddy (Lead), Adireddy Pavan, and Cheepuri Venkat Veerendra.',
        'creator': 'QuantumGuard was proudly developed by ProgVision at Lovely Professional University. Team members: Ganesh Krishna Reddy (Lead), Adireddy Pavan, and Cheepuri Venkat Veerendra.',
        'features': 'QuantumGuard offers Real-time TLS Scanning, AI Risk Horizon Prediction, CBOM Generation, and Automated Quantum Readiness Classification.',
        'hi': 'Hello there! I am the QuantumGuard AI Assistant. How can I help you secure your infrastructure today?',
        'hello': 'Hello! How can I assist you with Post-Quantum Cryptography today?',
        'default': "I'm not exactly sure about that. Quantum cryptography is a complex field! Could you rephrase your question, or ask about our features, CBOM, PQC, or the team?"
    };

    function processMessage(msg) {
        msg = msg.toLowerCase();
        for (const [key, val] of Object.entries(kb)) {
            if (key !== 'default' && msg.includes(key)) {
                return val;
            }
        }
        return kb['default'];
    }

    function addMessage(text, sender) {
        const div = document.createElement('div');
        div.className = `msg ${sender}`;
        div.innerText = text;
        botMessages.appendChild(div);
        botMessages.scrollTop = botMessages.scrollHeight;
    }

    function handleSend() {
        const text = botInput.value.trim();
        if(!text) return;
        
        addMessage(text, 'user');
        botInput.value = '';
        
        setTimeout(() => {
            const reply = processMessage(text);
            addMessage(reply, 'bot');
        }, 600 + Math.random() * 400); // simulate typing delay
    }

    if(botSend) botSend.addEventListener('click', handleSend);
    if(botInput) {
        botInput.addEventListener('keypress', (e) => {
            if(e.key === 'Enter') handleSend();
        });
    }
});
