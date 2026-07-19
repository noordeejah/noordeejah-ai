document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================
    // MOBILE NAVIGATION DRAWER
    // ==========================================================
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Toggle hamburger icon between bars and an X mark
            const icon = navToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });

        // Close menu automatically when any navigation link is clicked
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.className = 'fa-solid fa-bars';
            });
        });
    }

    // ==========================================================
    // CHAT SYSTEM LOGIC
    // ==========================================================
    const chatForm = document.getElementById('chatForm');
    const userInput = document.getElementById('userInput');
    const chatMessages = document.getElementById('chatMessages');
    const quickTags = document.querySelectorAll('.tag-btn');

    if (chatForm && userInput && chatMessages) {
        // Handle message submission
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = userInput.value.trim();
            if (!text) return;

            // 1. Add user's message to the chat container
            addUserMessage(text);
            
            // 2. Clear input field
            userInput.value = '';

            // 3. Show typing indicator and generate AI response
            showTypingAndRespond(text);
        });

        // Handle quick tags buttons clicks
        quickTags.forEach(btn => {
            btn.addEventListener('click', () => {
                const query = btn.getAttribute('data-query');
                userInput.value = query;
                // Dispatch form submit event programmatically
                chatForm.dispatchEvent(new Event('submit'));
            });
        });
    }

    // Helper: Escape HTML to prevent basic script injections
    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }

    // Helper: Formats current system time to a clean AM/PM format
    function getCurrentTime() {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        
        hours = hours % 12;
        hours = hours ? hours : 12; // Formats 0 as 12
        minutes = minutes < 10 ? '0' + minutes : minutes;
        
        return `${hours}:${minutes} ${ampm}`;
    }

    // Helper: Automatically scrolls message area to the absolute bottom
    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Appends user's bubble into the chat history
    function addUserMessage(text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'message user-msg';
        msgDiv.innerHTML = `
            <div class="msg-bubble">
                <p>${escapeHTML(text)}</p>
            </div>
            <span class="msg-time">${getCurrentTime()}</span>
        `;
        chatMessages.appendChild(msgDiv);
        scrollToBottom();
    }

    // Appends AI's bubble into the chat history
    function addAIMessage(htmlContent) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'message assistant-msg';
        msgDiv.innerHTML = `
            <div class="msg-bubble">
                ${htmlContent}
            </div>
            <span class="msg-time">${getCurrentTime()}</span>
        `;
        chatMessages.appendChild(msgDiv);
        scrollToBottom();
    }

    // Controls the appearance and delay of the simulated styling generation
    function showTypingAndRespond(query) {
        // Create typing element matching assistant styles
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message assistant-msg typing-container';
        typingDiv.innerHTML = `
            <div class="msg-bubble">
                <div class="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        chatMessages.appendChild(typingDiv);
        scrollToBottom();

        // Introduce a styling "processing" delay to feel more conversational
        setTimeout(() => {
            typingDiv.remove();
            const responseText = generateAIResponse(query);
            addAIMessage(responseText);
        }, 1500);
    }

    // ==========================================================
    // AI FASHION RULE ENGINE (Conversational Mock Database)
    // ==========================================================
    function generateAIResponse(query) {
        const q = query.toLowerCase();

        if (q.includes('wedding')) {
            return `
                <p>For a <strong>casual summer wedding</strong>, the objective is to balance breathability with clean-cut structure:</p>
                <ul>
                    <li><strong>Muted & Pastel Tones:</strong> Aim for lavender, dusty blue, cream, sage green, or soft terracotta. Avoid dark, heavy colors that absorb heat.</li>
                    <li><strong>Textured Fabrics:</strong> Linen-cotton blends or silk georgette hold elegant silhouettes while allowing airflow during outdoor ceremonies.</li>
                    <li><strong>Footwear Choices:</strong> Suede loafers, neat dress flats, or block-heel sandals are both formal and practical for grassy or sandy venues.</li>
                </ul>
            `;
        } 
        
        if (q.includes('olive') || q.includes('green')) {
            return `
                <p><strong>Olive green</strong> is a versatile tone that pairs well with several palettes depending on the seasonal vibe:</p>
                <ul>
                    <li><strong>Natural Earthy look:</strong> Match olive trousers with linen cream shirts, sand-toned knitwear, or warm beige trench coats.</li>
                    <li><strong>Modern Streetwear styling:</strong> Combine olive with charcoal grey, rich off-black, or deep navy for a structural, city-ready contrast.</li>
                    <li><strong>Accent Contrast:</strong> Accessories or sweaters in burgundy, terracotta, or mustard yellow create visual harmony with olive tones.</li>
                </ul>
            `;
        } 
        
        if (q.includes('capsule')) {
            return `
                <p>Building a highly functional, sustainable <strong>capsule wardrobe</strong> relies on silhouettes that can layer and alternate seamlessly. Here is a starter checklist:</p>
                <ol>
                    <li>A structured blazer (oversized or classic in navy or black)</li>
                    <li>A pair of relaxed, straight-leg denim (dark wash offers more versatility)</li>
                    <li>A lightweight knit sweater in cream or charcoal gray</li>
                    <li>A premium cotton white T-shirt and a mock-neck black top</li>
                    <li>Tailored neutral trousers (beige or charcoal)</li>
                    <li>Sleek, minimalist leather low-top sneakers (white or cream)</li>
                    <li>A versatile modern trench coat or utility outer layer</li>
                </ol>
            `;
        } 
        
        if (q.includes('casual') || q.includes('weekend') || q.includes('streetwear')) {
            return `
                <p>For relaxed <strong>weekend or casual styling</strong>, prioritize comfort without sacrificing structure:</p>
                <ul>
                    <li><strong>The Proportion Rule:</strong> Pair a loose or oversized top (like a heavy cotton tee) with fitted or straight-leg bottoms, or vice versa, to balance the visual frame.</li>
                    <li><strong>Understated Footwear:</strong> Clean court-style sneakers or modern leather slides keep the outfit feeling effortless but intentional.</li>
                </ul>
            `;
        }

        if (q.includes('work') || q.includes('office') || q.includes('interview')) {
            return `
                <p>For modern <strong>business casual</strong> or professional styling, focus on clean lines and layered pieces:</p>
                <ul>
                    <li><strong>Structured Tailoring:</strong> A sharp blazer can immediately elevate simpler, casual items underneath.</li>
                    <li><strong>The Belt Detail:</strong> Using a classic leather belt helps segment your upper and lower proportions, giving a neat, tailored effect.</li>
                    <li><strong>Classic Footwear:</strong> Classic leather loafers, point-toe flats, or minimal Chelsea boots complete the look with an elegant finish.</li>
                </ul>
            `;
        }

        // Generic fallback fashion advice
        return `
            <p>That is an excellent style question! To help you style this look, keep these basic principles in mind:</p>
            <ul>
                <li><strong>Proportion & Scale:</strong> Ensure the top and bottom of your outfit complement each other (such as pairing a wide trouser with a fitted top, or a long coat with slim denim).</li>
                <li><strong>The Three-Color Rule:</strong> Try limiting your outfit to three colors: one dominant neutral, one supporting color, and one subtle accent color.</li>
            </ul>
            <p>Tell me a bit more about your general aesthetic preference or the climate you are styling for, and we can find the ideal look!</p>
        `;
    }
});