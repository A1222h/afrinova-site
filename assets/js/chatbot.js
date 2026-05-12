// ============ CHATBOT AFRINOVA AMÉLIORÉ ============
class AfrinovaChatbot {
    constructor() {
        this.isOpen = false;
        this.createUI();
        this.initEvents();
    }

    createUI() {
        const html = `
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
                        <p>👋 Bonjour ! Je suis l'assistant d'Afrinova Tech.</p>
                        <p>Comment puis-je vous aider ?</p>
                    </div>
                    <div class="quick-actions">
                        <button data-action="devis">💰 Devis</button>
                        <button data-action="services">🛠️ Services</button>
                        <button data-action="rdv">📅 Rendez-vous</button>
                        <button data-action="contact">📞 Contact</button>
                    </div>
                </div>
                <div class="chatbot-input">
                    <input type="text" id="chatbotInput" placeholder="Votre message...">
                    <button id="chatbotSend">➤</button>
                </div>
            </div>
        </div>`;
        document.body.insertAdjacentHTML('beforeend', html);
    }

    initEvents() {
        document.getElementById('chatbotToggle').addEventListener('click', () => this.toggle());
        document.getElementById('chatbotClose').addEventListener('click', () => this.toggle());
        document.getElementById('chatbotSend').addEventListener('click', () => this.sendMessage());
        document.getElementById('chatbotInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
        document.querySelectorAll('.quick-actions button').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.dataset.action;
                this.handleQuickAction(action);
            });
        });
    }

    toggle() {
        this.isOpen = !this.isOpen;
        document.getElementById('chatbotWindow').style.display = this.isOpen ? 'flex' : 'none';
        if (this.isOpen) {
            document.querySelector('.chatbot-badge').style.display = 'none';
        }
    }

    handleQuickAction(action) {
        const messages = {
            devis: "💰 Vous pouvez obtenir un devis instantané sur notre <a href='devis.html'>page Devis</a>. Quel type de projet vous intéresse ?",
            services: "🛠️ Nous proposons : Sites web, Apps mobiles, Logiciels, Design graphique et Maintenance. Lequel voulez-vous connaître ?",
            rdv: "📅 Vous pouvez prendre rendez-vous directement ici : <a href='rendezvous.html'>Prendre rendez-vous</a>. Choisissez une date qui vous convient.",
            contact: "📞 Voici nos contacts :<br>📧 afrinovatech46@gmail.com<br>📱 +227 89 43 46 26<br>💬 WhatsApp : <a href='https://wa.me/22789434626'>Cliquez ici</a>"
        };
        this.addMessage(messages[action] || "Je suis là pour vous aider.", 'bot');
    }

    sendMessage() {
        const input = document.getElementById('chatbotInput');
        const text = input.value.trim();
        if (!text) return;
        this.addMessage(text, 'user');
        input.value = '';
        setTimeout(() => this.getResponse(text), 800);
    }

    addMessage(text, sender) {
        const container = document.getElementById('chatbotMessages');
        const div = document.createElement('div');
        div.className = `message ${sender}-message`;
        div.innerHTML = `<p>${text}</p>`;
        container.appendChild(div);
        container.scrollTop = container.scrollHeight;
        // Enlever les anciens quick-actions s'il y en a
        const oldQuick = container.querySelector('.quick-actions');
        if (oldQuick) oldQuick.remove();
    }

    getResponse(message) {
        const msg = message.toLowerCase();
        let response = '';

        if (msg.includes('prix') || msg.includes('tarif') || msg.includes('coût') || msg.includes('combien')) {
            response = "💰 Nos prix varient selon le projet :<br>• Site vitrine : à partir de 200 000 F<br>• E-commerce : 500 000 F<br>• App mobile : 800 000 F<br>• Logiciel sur mesure : 1 000 000 F<br>Voulez-vous un devis détaillé ?";
        } else if (msg.includes('devis')) {
            response = "📋 Rendez-vous sur notre <a href='devis.html'>calculateur de devis</a> pour une estimation immédiate.";
        } else if (msg.includes('rendez-vous') || msg.includes('rdv') || msg.includes('rencontre')) {
            response = "📅 Prenez rendez-vous en ligne : <a href='rendezvous.html'>Formulaire de rendez-vous</a>. Nous vous confirmerons le créneau.";
        } else if (msg.includes('contact') || msg.includes('téléphone') || msg.includes('joindre')) {
            response = "📞 Voici nos contacts :<br>📧 afrinovatech46@gmail.com<br>📱 +227 89 43 46 26<br>💬 <a href='https://wa.me/22789434626'>WhatsApp</a>";
        } else if (msg.includes('service') || msg.includes('offre')) {
            response = "🛠️ Nous créons des sites web, applications mobiles, logiciels de gestion et identités visuelles. Dites-moi ce qui vous intéresse !";
        } else if (msg.includes('délai') || msg.includes('temps')) {
            response = "⏱️ Délais moyens :<br>• Site vitrine : 1-2 semaines<br>• App mobile : 4-8 semaines<br>• Logiciel : 6-12 semaines";
        } else if (msg.includes('portfolio') || msg.includes('réalisation')) {
            response = "📂 Consultez nos projets : <a href='portfolio.html'>Portfolio</a>. Vous pouvez filtrer par type.";
        } else if (msg.includes('merci')) {
            response = "Avec plaisir ! 😊 N'hésitez pas si vous avez d'autres questions.";
        } else {
            response = "Je peux vous renseigner sur les prix, les services, les rendez-vous ou les contacts. Dites-moi ce qui vous intéresse.";
        }

        // Proposer des actions rapides après la réponse
        const container = document.getElementById('chatbotMessages');
        const quickDiv = document.createElement('div');
        quickDiv.className = 'quick-actions';
        quickDiv.innerHTML = `
            <button data-action="devis">💰 Devis</button>
            <button data-action="rdv">📅 Rendez-vous</button>
            <button data-action="contact">📞 Contact</button>
        `;
        container.appendChild(quickDiv);
        quickDiv.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleQuickAction(e.target.dataset.action);
            });
        });

        this.addMessage(response, 'bot');
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    if (document.body) {
        window.chatbot = new AfrinovaChatbot();
    }
});
