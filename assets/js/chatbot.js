// ============ CHATBOT AFRINOVA ============
class AfrinovaChatbot {
    constructor() {
        this.isOpen = false;
        this.createChatbotUI();
        this.initEventListeners();
    }
    
    createChatbotUI() {
        const chatbotHTML = `
            <div class="chatbot-container" id="chatbotContainer">
                <button class="chatbot-toggle" id="chatbotToggle">
                    <span class="chatbot-icon">💬</span>
                    <span class="chatbot-badge">1</span>
                </button>
                
                <div class="chatbot-window" id="chatbotWindow" style="display:none;">
                    <div class="chatbot-header">
                        <div class="chatbot-header-left">
                            <div class="chatbot-avatar">🤖</div>
                            <div>
                                <h4>Assistant Afrinova</h4>
                                <p>🟢 En ligne</p>
                            </div>
                        </div>
                        <button class="chatbot-close" id="chatbotClose">✕</button>
                    </div>
                    
                    <div class="chatbot-messages" id="chatbotMessages">
                        <div class="message bot-message">
                            <p>👋 Bonjour ! Je suis l'assistant Afrinova Tech.</p>
                            <p>Comment puis-je vous aider ?</p>
                        </div>
                        <div class="quick-actions">
                            <button onclick="chatbot.sendQuickReply('Devis')">💰 Devis</button>
                            <button onclick="chatbot.sendQuickReply('Services')">🛠️ Services</button>
                            <button onclick="chatbot.sendQuickReply('Portfolio')">📂 Portfolio</button>
                            <button onclick="chatbot.sendQuickReply('Contact')">📞 Contact</button>
                        </div>
                    </div>
                    
                    <div class="chatbot-input">
                        <input type="text" id="chatbotInput" placeholder="Votre message...">
                        <button id="chatbotSend">➤</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    }
    
    initEventListeners() {
        document.getElementById('chatbotToggle').addEventListener('click', () => this.toggleChat());
        document.getElementById('chatbotClose').addEventListener('click', () => this.toggleChat());
        document.getElementById('chatbotSend').addEventListener('click', () => this.sendMessage());
        document.getElementById('chatbotInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
    }
    
    toggleChat() {
        this.isOpen = !this.isOpen;
        const window = document.getElementById('chatbotWindow');
        window.style.display = this.isOpen ? 'flex' : 'none';
        document.querySelector('.chatbot-badge').style.display = 'none';
    }
    
    sendQuickReply(text) {
        document.getElementById('chatbotInput').value = text;
        this.sendMessage();
    }
    
    sendMessage() {
        const input = document.getElementById('chatbotInput');
        const message = input.value.trim();
        if (!message) return;
        
        this.addMessage(message, 'user');
        input.value = '';
        
        setTimeout(() => this.getAIResponse(message), 1000);
    }
    
    addMessage(text, sender) {
        const messagesContainer = document.getElementById('chatbotMessages');
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender + '-message');
        messageDiv.innerHTML = `<p>${text}</p>`;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    getAIResponse(message) {
        const lowerMsg = message.toLowerCase();
        let response = '';
        
        if (lowerMsg.includes('devis') || lowerMsg.includes('prix')) {
            response = '💰 Vous pouvez obtenir un devis instantané sur notre <a href="devis.html">page de devis</a> ou me dire quel type de projet vous intéresse !';
        } else if (lowerMsg.includes('service')) {
            response = '🛠️ Nous proposons : Sites web, Apps mobiles, Logiciels, Design, Maintenance. Lequel vous intéresse ?';
        } else if (lowerMsg.includes('portfolio')) {
            response = '📂 Découvrez nos réalisations sur <a href="portfolio.html">notre portfolio</a> !';
        } else if (lowerMsg.includes('contact') || lowerMsg.includes('téléphone')) {
            response = '📞 Contactez-nous :<br>📧 afrinovatech46@gmail.com<br>📱 +227 89 43 46 26<br>📍 Agadez, Niger';
        } else if (lowerMsg.includes('délai') || lowerMsg.includes('temps')) {
            response = '⏱️ Les délais varient selon le projet :<br>• Site vitrine : 1-2 semaines<br>• E-commerce : 3-4 semaines<br>• App mobile : 4-8 semaines<br>• Logiciel : 6-12 semaines';
        } else if (lowerMsg.includes('paiement') || lowerMsg.includes('payer')) {
            response = '💳 Nous acceptons : Espèces, Orange Money, Mobile Money, Virement bancaire. Un acompte de 50% est demandé au démarrage.';
        } else {
            response = 'Je peux vous aider sur : Devis, Services, Portfolio, Contact, Délais, Paiement. Que souhaitez-vous savoir ?';
        }
        
        this.addMessage(response, 'bot');
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    window.chatbot = new AfrinovaChatbot();
});
