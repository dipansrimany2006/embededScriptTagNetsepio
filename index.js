// // AI Chat Widget - Embeddable Script
// // Version 1.0.0

// (function() {
//     // Default configuration - can be overridden by window.aiChatConfig
//     const defaultConfig = {
//         apiUrl: 'https://cyrene.us01.erebrus.io/b450db11-332b-0fc2-a144-92824a34f699/message',
//         agentName: 'Cyrene',
//         primaryColor: '#3b82f6',
//         position: 'bottom-right', // bottom-right, bottom-left, top-right, top-left
//         greeting: null, // Custom greeting message
//         placeholder: 'Type your message...',
//         buttonIcon: '💬',
//         theme: 'dark' // dark or light
//     };

//     // Merge user config with defaults
//     const config = Object.assign({}, defaultConfig, window.aiChatConfig || {});

//     // Position styles
//     const positions = {
//         'bottom-right': 'bottom: 20px; right: 20px;',
//         'bottom-left': 'bottom: 20px; left: 20px;',
//         'top-right': 'top: 20px; right: 20px;',
//         'top-left': 'top: 20px; left: 20px;'
//     };

//     // Theme colors
//     const themes = {
//         dark: {
//             background: '#1a1a1a',
//             messagesBg: '#1a1a1a',
//             userMsgBg: config.primaryColor,
//             botMsgBg: '#2a2a2a',
//             textColor: '#e5e5e5',
//             borderColor: '#333',
//             inputBg: '#2a2a2a'
//         },
//         light: {
//             background: '#ffffff',
//             messagesBg: '#ffffff',
//             userMsgBg: config.primaryColor,
//             botMsgBg: '#f3f4f6',
//             textColor: '#1f2937',
//             borderColor: '#e5e7eb',
//             inputBg: '#f9fafb'
//         }
//     };

//     const themeColors = themes[config.theme] || themes.dark;

//     // Inject CSS
//     const style = document.createElement('style');
//     style.textContent = `
//         #ai-chat-widget {
//             position: fixed;
//             ${positions[config.position]}
//             z-index: 10000;
//             font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
//         }

//         #ai-chat-button {
//             width: 60px;
//             height: 60px;
//             border-radius: 50%;
//             background: ${config.primaryColor};
//             border: none;
//             cursor: pointer;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             color: white;
//             font-size: 24px;
//             box-shadow: 0 4px 12px rgba(0,0,0,0.15);
//             transition: all 0.3s ease;
//         }

//         #ai-chat-button:hover {
//             transform: scale(1.1);
//             box-shadow: 0 6px 20px rgba(0,0,0,0.2);
//         }

//         #ai-chat-modal {
//             display: none;
//             position: fixed;
//             top: 0;
//             left: 0;
//             width: 100%;
//             height: 100%;
//             background: rgba(0,0,0,0.5);
//             z-index: 10001;
//             align-items: center;
//             justify-content: center;
//         }

//         #ai-chat-container {
//             background: ${themeColors.background};
//             border-radius: 16px;
//             width: 90%;
//             max-width: 500px;
//             max-height: 90vh;
//             display: flex;
//             flex-direction: column;
//             overflow: hidden;
//             box-shadow: 0 20px 60px rgba(0,0,0,0.3);
//         }

//         #ai-chat-header {
//             padding: 20px;
//             background: linear-gradient(135deg, ${config.primaryColor}, #8b5cf6);
//             color: white;
//             display: flex;
//             align-items: center;
//             justify-content: space-between;
//         }

//         #ai-chat-close {
//             background: none;
//             border: none;
//             color: white;
//             font-size: 24px;
//             cursor: pointer;
//             padding: 0;
//             width: 30px;
//             height: 30px;
//             border-radius: 50%;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//         }

//         #ai-chat-close:hover {
//             background: rgba(255,255,255,0.2);
//         }

//         #ai-chat-messages {
//             flex: 1;
//             padding: 20px;
//             overflow-y: auto;
//             max-height: 400px;
//             background: ${themeColors.messagesBg};
//             color: ${themeColors.textColor};
//         }

//         .ai-message {
//             margin-bottom: 16px;
//             display: flex;
//             gap: 12px;
//         }

//         .ai-message.user {
//             flex-direction: row-reverse;
//         }

//         .ai-message-content {
//             max-width: 70%;
//             padding: 12px 16px;
//             border-radius: 18px;
//             word-wrap: break-word;
//             line-height: 1.4;
//         }

//         .ai-message.user .ai-message-content {
//             background: ${themeColors.userMsgBg};
//             color: white;
//             border-bottom-right-radius: 4px;
//         }

//         .ai-message.bot .ai-message-content {
//             background: ${themeColors.botMsgBg};
//             color: ${themeColors.textColor};
//             border-bottom-left-radius: 4px;
//         }

//         .ai-message-avatar {
//             width: 32px;
//             height: 32px;
//             border-radius: 50%;
//             background: ${config.primaryColor};
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             color: white;
//             font-size: 14px;
//             flex-shrink: 0;
//             font-weight: 600;
//         }

//         #ai-chat-input-area {
//             padding: 20px;
//             background: ${themeColors.background};
//             border-top: 1px solid ${themeColors.borderColor};
//         }

//         #ai-chat-input {
//             width: 100%;
//             padding: 12px 50px 12px 16px;
//             border: 1px solid ${themeColors.borderColor};
//             border-radius: 24px;
//             background: ${themeColors.inputBg};
//             color: ${themeColors.textColor};
//             font-size: 14px;
//             outline: none;
//             resize: none;
//             font-family: inherit;
//             box-sizing: border-box;
//         }

//         #ai-chat-input:focus {
//             border-color: ${config.primaryColor};
//         }

//         #ai-chat-input::placeholder {
//             color: #888;
//         }

//         #ai-chat-send {
//             position: absolute;
//             right: 28px;
//             top: 50%;
//             transform: translateY(-50%);
//             background: ${config.primaryColor};
//             border: none;
//             border-radius: 50%;
//             width: 32px;
//             height: 32px;
//             color: white;
//             cursor: pointer;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             font-size: 16px;
//         }

//         #ai-chat-send:hover {
//             opacity: 0.9;
//         }

//         #ai-chat-send:disabled {
//             background: #666;
//             cursor: not-allowed;
//         }

//         .ai-typing-indicator {
//             display: flex;
//             gap: 4px;
//             padding: 16px;
//         }

//         .ai-typing-dot {
//             width: 8px;
//             height: 8px;
//             border-radius: 50%;
//             background: #666;
//             animation: ai-typing 1.4s infinite ease-in-out;
//         }

//         .ai-typing-dot:nth-child(1) { animation-delay: -0.32s; }
//         .ai-typing-dot:nth-child(2) { animation-delay: -0.16s; }

//         @keyframes ai-typing {
//             0%, 80%, 100% { opacity: 0.3; }
//             40% { opacity: 1; }
//         }

//         @media (max-width: 640px) {
//             #ai-chat-container {
//                 width: 95%;
//                 max-height: 95vh;
//             }
//         }
//     `;
//     document.head.appendChild(style);

//     // Create widget HTML
//     const widget = document.createElement('div');
//     widget.id = 'ai-chat-widget';
//     widget.innerHTML = `
//         <button id="ai-chat-button">${config.buttonIcon}</button>
//         <div id="ai-chat-modal">
//             <div id="ai-chat-container">
//                 <div id="ai-chat-header">
//                     <div style="display: flex; align-items: center; gap: 12px;">
//                         <div class="ai-message-avatar">AI</div>
//                         <div>
//                             <div style="font-weight: 600;">${config.agentName}</div>
//                             <div style="font-size: 12px; opacity: 0.8;">AI Assistant</div>
//                         </div>
//                     </div>
//                     <button id="ai-chat-close">×</button>
//                 </div>
//                 <div id="ai-chat-messages">
//                     <div class="ai-message bot">
//                         <div class="ai-message-avatar">AI</div>
//                         <div class="ai-message-content">
//                             ${config.greeting || `Hi! I'm ${config.agentName}, your AI assistant. How can I help you today?`}
//                         </div>
//                     </div>
//                 </div>
//                 <div id="ai-chat-input-area">
//                     <div style="position: relative;">
//                         <textarea id="ai-chat-input" placeholder="${config.placeholder}" rows="1"></textarea>
//                         <button id="ai-chat-send">→</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     `;

//     document.body.appendChild(widget);

//     // Widget functionality
//     const modal = document.getElementById('ai-chat-modal');
//     const button = document.getElementById('ai-chat-button');
//     const closeBtn = document.getElementById('ai-chat-close');
//     const input = document.getElementById('ai-chat-input');
//     const sendBtn = document.getElementById('ai-chat-send');
//     const messagesContainer = document.getElementById('ai-chat-messages');

//     let isLoading = false;

//     // Event listeners
//     button.addEventListener('click', openModal);
//     closeBtn.addEventListener('click', closeModal);
//     modal.addEventListener('click', (e) => {
//         if (e.target === modal) closeModal();
//     });
//     sendBtn.addEventListener('click', sendMessage);
//     input.addEventListener('keypress', (e) => {
//         if (e.key === 'Enter' && !e.shiftKey) {
//             e.preventDefault();
//             sendMessage();
//         }
//     });

//     // Auto-resize textarea
//     input.addEventListener('input', function() {
//         this.style.height = 'auto';
//         this.style.height = Math.min(this.scrollHeight, 100) + 'px';
//     });

//     function openModal() {
//         modal.style.display = 'flex';
//         setTimeout(() => input.focus(), 100);
//     }

//     function closeModal() {
//         modal.style.display = 'none';
//     }

//     function addMessage(content, isUser = false) {
//         const messageDiv = document.createElement('div');
//         messageDiv.className = `ai-message ${isUser ? 'user' : 'bot'}`;
        
//         if (isUser) {
//             messageDiv.innerHTML = `
//                 <div class="ai-message-content">${escapeHtml(content)}</div>
//                 <div class="ai-message-avatar">You</div>
//             `;
//         } else {
//             messageDiv.innerHTML = `
//                 <div class="ai-message-avatar">AI</div>
//                 <div class="ai-message-content">${escapeHtml(content)}</div>
//             `;
//         }
        
//         messagesContainer.appendChild(messageDiv);
//         messagesContainer.scrollTop = messagesContainer.scrollHeight;
//     }

//     function escapeHtml(text) {
//         const div = document.createElement('div');
//         div.textContent = text;
//         return div.innerHTML;
//     }

//     function showTypingIndicator() {
//         const typingDiv = document.createElement('div');
//         typingDiv.className = 'ai-message bot ai-typing-message';
//         typingDiv.innerHTML = `
//             <div class="ai-message-avatar">AI</div>
//             <div class="ai-message-content">
//                 <div class="ai-typing-indicator">
//                     <div class="ai-typing-dot"></div>
//                     <div class="ai-typing-dot"></div>
//                     <div class="ai-typing-dot"></div>
//                 </div>
//             </div>
//         `;
//         messagesContainer.appendChild(typingDiv);
//         messagesContainer.scrollTop = messagesContainer.scrollHeight;
//         return typingDiv;
//     }

//     function removeTypingIndicator(typingElement) {
//         if (typingElement && typingElement.parentNode) {
//             typingElement.parentNode.removeChild(typingElement);
//         }
//     }

//     async function sendMessage() {
//         const message = input.value.trim();
//         if (!message || isLoading) return;

//         // Add user message
//         addMessage(message, true);
//         input.value = '';
//         input.style.height = 'auto';

//         // Show typing indicator
//         const typingIndicator = showTypingIndicator();
//         isLoading = true;
//         sendBtn.disabled = true;

//         try {
//             // Create FormData for the API call
//             const formData = new FormData();
//             formData.append('text', message);
//             formData.append('userId', 'widget-user-' + Date.now());
//             formData.append('voice_mode', 'false');

//             const response = await fetch(config.apiUrl, {
//                 method: 'POST',
//                 body: formData
//             });

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             const data = await response.json();
//             const botResponse = data[0]?.text || "I'm sorry, I couldn't process your request.";

//             // Remove typing indicator and add bot response
//             removeTypingIndicator(typingIndicator);
//             addMessage(botResponse);

//         } catch (error) {
//             console.error('AI Chat Widget Error:', error);
//             removeTypingIndicator(typingIndicator);
//             addMessage("I'm sorry, there was an error processing your request. Please try again.");
//         } finally {
//             isLoading = false;
//             sendBtn.disabled = false;
//             input.focus();
//         }
//     }

//     // Make widget globally accessible for customization
//     window.AIChatWidget = {
//         open: openModal,
//         close: closeModal,
//         addMessage: addMessage,
//         config: config
//     };

// })();



(function() {
    // Default configuration - can be overridden by window.aiChatConfig
    const defaultConfig = {
        apiUrl: 'https://cyrene.us01.erebrus.io/b450db11-332b-0fc2-a144-92824a34f699/message',
        agentName: 'Assistant',
        primaryColor: '#1366d9',
        position: 'bottom-right',
        greeting: null,
        placeholder: 'Type your message...',
        buttonIcon: '💬',
        theme: 'light'
    };

    // Merge user config with defaults
    const config = Object.assign({}, defaultConfig, window.aiChatConfig || {});

    // Position styles
    const positions = {
        'bottom-right': 'bottom: 20px; right: 20px;',
        'bottom-left': 'bottom: 20px; left: 20px;',
        'top-right': 'top: 20px; right: 20px;',
        'top-left': 'top: 20px; left: 20px;'
    };

    const agenturl = config.apiUrl;

    // Inject CSS
    const style = document.createElement('style');
    style.textContent = `
        /* Widget Container */
        #cyrene-widget {
            position: fixed;
            ${positions[config.position]}
            z-index: 10000;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        /* Chat Button */
        #cyrene-button {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: ${config.primaryColor};
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 24px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
        }

        #cyrene-button:hover {
            transform: scale(1.05);
            box-shadow: 0 6px 25px rgba(0,0,0,0.25);
        }

        #cyrene-button:active {
            transform: scale(0.98);
        }

        /* Button pulse animation when closed */
        #cyrene-button.pulse::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border-radius: 50%;
            background: ${config.primaryColor};
            animation: pulse 2s infinite;
            z-index: -1;
        }

        @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            100% { transform: scale(1.3); opacity: 0; }
        }

        /* Chat Panel */
        #cyrene-panel {
            position: absolute;
            bottom: 80px;
            right: 0;
            width: 380px;
            height: 550px;
            background: white;
            border-radius: 16px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.2);
            transform: translateY(20px) scale(0.95);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            display: flex;
            flex-direction: column;
            overflow: hidden;
            border: 1px solid #e2e8f0;
        }

        #cyrene-panel.open {
            transform: translateY(0) scale(1);
            opacity: 1;
            visibility: visible;
        }

        #cyrene-panel.minimized {
            height: 60px;
        }

        /* Position adjustments for different corners */
        #cyrene-widget[data-position="bottom-left"] #cyrene-panel {
            right: auto;
            left: 0;
        }

        #cyrene-widget[data-position="top-right"] #cyrene-panel {
            bottom: auto;
            top: 80px;
        }

        #cyrene-widget[data-position="top-left"] #cyrene-panel {
            bottom: auto;
            top: 80px;
            right: auto;
            left: 0;
        }

        /* Header */
        #cyrene-header {
            padding: 20px;
            background: linear-gradient(135deg, ${config.primaryColor}, #1e40af);
            color: white;
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;
            flex-shrink: 0;
        }

        #cyrene-header:hover {
            background: linear-gradient(135deg, #1e40af, ${config.primaryColor});
        }

        .cyrene-agent-info {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .cyrene-avatar {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: rgba(255,255,255,0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            font-weight: 600;
            flex-shrink: 0;
        }

        .cyrene-agent-details h3 {
            margin: 0;
            font-size: 16px;
            font-weight: 600;
        }

        .cyrene-status {
            margin: 0;
            font-size: 12px;
            opacity: 0.9;
            display: flex;
            align-items: center;
            gap: 4px;
        }

        .cyrene-status::before {
            content: '';
            width: 8px;
            height: 8px;
            background: #10b981;
            border-radius: 50%;
            display: inline-block;
        }

        .cyrene-controls {
            display: flex;
            gap: 8px;
        }

        .cyrene-control-btn {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 4px;
            border-radius: 4px;
            width: 28px;
            height: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.2s;
        }

        #cyrene-close:hover {
            background: rgba(255,255,255,0.2);
        }

        /* Messages */
        #cyrene-messages {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
            background: #f8fafc;
            display: flex;
            flex-direction: column;
            gap: 16px;
        }

        #cyrene-panel.minimized #cyrene-messages {
            display: none;
        }

        .cyrene-message {
            display: flex;
            gap: 12px;
            align-items: flex-start;
        }

        .cyrene-message.user {
            flex-direction: row-reverse;
        }

        .cyrene-message-avatar {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: 600;
            flex-shrink: 0;
        }

        .cyrene-message.user .cyrene-message-avatar {
            background: ${config.primaryColor};
            color: white;
        }

        .cyrene-message.bot .cyrene-message-avatar {
            background: #e5e7eb;
            color: #6b7280;
        }

        .cyrene-message-content {
            max-width: 75%;
            padding: 12px 16px;
            border-radius: 18px;
            line-height: 1.4;
            word-wrap: break-word;
            position: relative;
        }

        .cyrene-message.user .cyrene-message-content {
            background: ${config.primaryColor};
            color: white;
            border-bottom-right-radius: 4px;
        }

        .cyrene-message.bot .cyrene-message-content {
            background: white;
            color: #374151;
            border: 1px solid #e5e7eb;
            border-bottom-left-radius: 4px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }

        .cyrene-timestamp {
            font-size: 11px;
            color: #9ca3af;
            text-align: center;
            margin-top: 4px;
        }

        /* Input Area */
        #cyrene-input-area {
            padding: 16px 20px 20px;
            background: white;
            border-top: 1px solid #e5e7eb;
            flex-shrink: 0;
        }

        #cyrene-panel.minimized #cyrene-input-area {
            display: none;
        }

        .cyrene-input-container {
            position: relative;
            display: flex;
            align-items: flex-end;
            gap: 8px;
        }

        #cyrene-input {
            flex: 1;
            padding: 12px 16px;
            border: 1px solid #e5e7eb;
            border-radius: 20px;
            font-size: 14px;
            outline: none;
            resize: none;
            font-family: inherit;
            max-height: 100px;
            min-height: 44px;
            transition: border-color 0.2s;
            background: #f9fafb;
        }

        #cyrene-input:focus {
            border-color: ${config.primaryColor};
            background: white;
        }

        #cyrene-input::placeholder {
            color: #9ca3af;
        }

        #cyrene-send {
            background: ${config.primaryColor};
            border: none;
            border-radius: 50%;
            width: 44px;
            height: 44px;
            color: white;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            transition: all 0.2s;
            flex-shrink: 0;
        }

        #cyrene-send:hover:not(:disabled) {
            background: #1e40af;
            transform: scale(1.05);
        }

        #cyrene-send:disabled {
            background: #d1d5db;
            cursor: not-allowed;
            transform: none;
        }

        /* Typing Indicator */
        .cyrene-typing {
            display: flex;
            gap: 4px;
            padding: 12px 16px;
            background: white;
            border: 1px solid #e5e7eb;
            border-radius: 18px;
            border-bottom-left-radius: 4px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.05);
            width: fit-content;
        }

        .cyrene-typing-dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #9ca3af;
            animation: cyrene-typing 1.4s infinite ease-in-out;
        }

        .cyrene-typing-dot:nth-child(1) { animation-delay: -0.32s; }
        .cyrene-typing-dot:nth-child(2) { animation-delay: -0.16s; }
        .cyrene-typing-dot:nth-child(3) { animation-delay: 0s; }

        @keyframes cyrene-typing {
            0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
            40% { opacity: 1; transform: scale(1); }
        }

        /* Notification Badge */
        .cyrene-notification {
            position: absolute;
            top: -8px;
            right: -8px;
            background: #ef4444;
            color: white;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            font-size: 11px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            animation: notification-bounce 0.5s ease-out;
        }

        @keyframes notification-bounce {
            0% { transform: scale(0); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
        }

        /* Mobile Responsive */
        @media (max-width: 640px) {
            #cyrene-panel {
                width: calc(100vw - 40px);
                right: 20px;
                left: 20px;
                max-width: 380px;
            }

            #cyrene-widget[data-position="bottom-left"] #cyrene-panel {
                left: 20px;
                right: 20px;
            }

            #cyrene-panel {
                height: 500px;
            }

            #cyrene-header {
                padding: 16px;
            }

            .cyrene-avatar {
                width: 32px;
                height: 32px;
                font-size: 14px;
            }

            .cyrene-agent-details h3 {
                font-size: 14px;
            }

            #cyrene-messages {
                padding: 16px;
            }

            #cyrene-input-area {
                padding: 12px 16px 16px;
            }
        }

        /* High contrast mode support */
        @media (prefers-contrast: high) {
            #cyrene-panel {
                border: 2px solid #000;
            }
            
            .cyrene-message.bot .cyrene-message-content {
                border: 2px solid #374151;
            }
        }

        /* Scrollbar styling */
        #cyrene-messages::-webkit-scrollbar {
            width: 6px;
        }

        #cyrene-messages::-webkit-scrollbar-track {
            background: transparent;
        }

        #cyrene-messages::-webkit-scrollbar-thumb {
            background: #d1d5db;
            border-radius: 3px;
        }

        #cyrene-messages::-webkit-scrollbar-thumb:hover {
            background: #9ca3af;
        }
    `;
    document.head.appendChild(style);

    // Create widget HTML
    const widget = document.createElement('div');
    widget.id = 'cyrene-widget';
    widget.setAttribute('data-position', config.position);
    widget.innerHTML = `
        <button id="cyrene-button" class="pulse">
            ${config.buttonIcon}
        </button>
        
        <div id="cyrene-panel">
            <div id="cyrene-header">
                <div class="cyrene-agent-info">
                    <div class="cyrene-avatar">
                    AI
                    </div>
                    <div class="cyrene-agent-details">
                        <h3>${config.agentName}</h3>
                        <p class="cyrene-status">Online</p>
                    </div>
                </div>
                <div class="cyrene-controls">
                    <button id="cyrene-minimize" class="cyrene-control-btn"></button>
                    <button id="cyrene-close" class="cyrene-control-btn" title="Close">-</button>
                </div>
            </div>
            
            <div id="cyrene-messages">
                <div class="cyrene-message bot">
                    <div class="cyrene-message-avatar">AI</div>
                    <div class="cyrene-message-content">
                        ${config.greeting || `Hi! I'm ${config.agentName}. How can I help you today?`}
                        <div class="cyrene-timestamp">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                    </div>
                </div>
            </div>
            
            <div id="cyrene-input-area">
                <div class="cyrene-input-container">
                    <textarea id="cyrene-input" placeholder="${config.placeholder}" rows="1"></textarea>
                    <button id="cyrene-send">→</button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(widget);

    // Widget functionality
    const button = document.getElementById('cyrene-button');
    const panel = document.getElementById('cyrene-panel');
    const closeBtn = document.getElementById('cyrene-close');
    const minimizeBtn = document.getElementById('cyrene-minimize');
    const header = document.getElementById('cyrene-header');
    const input = document.getElementById('cyrene-input');
    const sendBtn = document.getElementById('cyrene-send');
    const messagesContainer = document.getElementById('cyrene-messages');

    let isOpen = false;
    let isMinimized = false;
    let isLoading = false;
    let unreadCount = 0;

    // Event listeners
    button.addEventListener('click', togglePanel);
    closeBtn.addEventListener('click', closePanel);
    minimizeBtn.addEventListener('click', toggleMinimize);
    header.addEventListener('click', () => {
        if (isMinimized) toggleMinimize();
    });
    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Auto-resize textarea
    input.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 100) + 'px';
    });

    function togglePanel() {
        if (isOpen) {
            closePanel();
        } else {
            openPanel();
        }
    }

    function openPanel() {
        isOpen = true;
        panel.classList.add('open');
        button.classList.remove('pulse');
        input.focus();
        clearNotifications();
        
        // Hide the demo indicator
        const indicator = document.querySelector('.chat-indicator');
        if (indicator) {
            indicator.style.display = 'none';
        }
    }

    function closePanel() {
        isOpen = false;
        isMinimized = false;
        panel.classList.remove('open', 'minimized');
        button.classList.add('pulse');
    }

    function toggleMinimize() {
        isMinimized = !isMinimized;
        panel.classList.toggle('minimized', isMinimized);
        if (!isMinimized) {
            input.focus();
        }
    }

    function addMessage(content, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `cyrene-message ${isUser ? 'user' : 'bot'}`;
        
        const timestamp = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        if (isUser) {
            messageDiv.innerHTML = `
                <div class="cyrene-message-avatar">You</div>
                <div class="cyrene-message-content">
                    ${escapeHtml(content)}
                    <div class="cyrene-timestamp">${timestamp}</div>
                </div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="cyrene-message-avatar">AI</div>
                <div class="cyrene-message-content">
                    ${escapeHtml(content)}
                    <div class="cyrene-timestamp">${timestamp}</div>
                </div>
            `;
        }
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Add notification if panel is closed or minimized
        if (!isOpen || isMinimized) {
            if (!isUser) {
                showNotification();
            }
        }
    }

    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'cyrene-message bot cyrene-typing-message';
        typingDiv.innerHTML = `
            <div class="cyrene-message-avatar">AI</div>
            <div class="cyrene-typing">
                <div class="cyrene-typing-dot"></div>
                <div class="cyrene-typing-dot"></div>
                <div class="cyrene-typing-dot"></div>
            </div>
        `;
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        return typingDiv;
    }

    function removeTypingIndicator(typingElement) {
        if (typingElement && typingElement.parentNode) {
            typingElement.parentNode.removeChild(typingElement);
        }
    }

    function showNotification() {
        unreadCount++;
        let notificationBadge = button.querySelector('.cyrene-notification');
        
        if (!notificationBadge) {
            notificationBadge = document.createElement('div');
            notificationBadge.className = 'cyrene-notification';
            button.appendChild(notificationBadge);
        }
        
        notificationBadge.textContent = unreadCount > 9 ? '9+' : unreadCount;
    }

    function clearNotifications() {
        unreadCount = 0;
        const notificationBadge = button.querySelector('.cyrene-notification');
        if (notificationBadge) {
            notificationBadge.remove();
        }
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    async function sendMessage() {
        const message = input.value.trim();
        if (!message || isLoading) return;

        // Add user message
        addMessage(message, true);
        input.value = '';
        input.style.height = 'auto';

        // Show typing indicator
        const typingIndicator = showTypingIndicator();
        isLoading = true;
        sendBtn.disabled = true;

        try {
            // Create FormData for the API call
            const formData = new FormData();
            formData.append('text', message);
            formData.append('userId', 'widget-user-' + Date.now());
            formData.append('voice_mode', 'false');

            const response = await fetch(config.apiUrl, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const botResponse = data[0]?.text || "I'm sorry, I couldn't process your request.";

            // Remove typing indicator and add bot response
            removeTypingIndicator(typingIndicator);
            addMessage(botResponse);

        } catch (error) {
            console.error('cyrene Widget Error:', error);
            removeTypingIndicator(typingIndicator);
            addMessage("I'm sorry, there was an error processing your request. Please try again.");
        } finally {
            isLoading = false;
            sendBtn.disabled = false;
            if (isOpen && !isMinimized) {
                input.focus();
            }
        }
    }

    // Make widget globally accessible for customization
    window.cyreneWidget = {
        open: openPanel,
        close: closePanel,
        minimize: toggleMinimize,
        addMessage: addMessage,
        config: config
    };

    // Auto-pulse the button initially
    setTimeout(() => {
        button.classList.add('pulse');
    }, 2000);

})();




// (function() {
//     // Default configuration - can be overridden by window.aiChatConfig
//     const defaultConfig = {
//         apiUrl: 'https://cyrene.us01.erebrus.io/b450db11-332b-0fc2-a144-92824a34f699/message',
//         agentName: 'Assistant',
//         primaryColor: '#1366d9',
//         position: 'bottom-right',
//         greeting: null,
//         placeholder: 'Type your message...',
//         buttonIcon: '💬',
//         theme: 'light'
//     };

//     // Merge user config with defaults
//     const config = Object.assign({}, defaultConfig, window.aiChatConfig || {});

//     // Agent state
//     let agent = null;
//     let isAgentLoaded = false;

//     // Extract agent details from API URL
//     function extractAgentDetails(apiUrl) {
//         try {
//             // Pattern: https://domain.erebrus.io/agentId/message
//             const url = new URL(apiUrl);
//             const pathParts = url.pathname.split('/').filter(part => part);
            
//             // Get domain and agent ID
//             const domain = url.hostname; // e.g., cyrene.us01.erebrus.io
//             const agentId = pathParts[0]; // First part should be agent ID
            
//             // Extract base domain (us01.erebrus.io from cyrene.us01.erebrus.io)
//             const domainParts = domain.split('.');
//             const baseDomain = domainParts.slice(-3).join('.'); // Get last 3 parts: us01.erebrus.io
            
//             return {
//                 agentId: agentId,
//                 domain: baseDomain,
//                 fullDomain: domain
//             };
//         } catch (error) {
//             console.error('Error extracting agent details:', error);
//             return null;
//         }
//     }

//     // Fetch agent data from gateway API
//     async function fetchAgentData(agentDetails) {
//         if (!agentDetails) return null;
        
//         try {
//             const gatewayUrl = `https://gateway.erebrus.io/api/v1.0/agents/${agentDetails.domain}/${agentDetails.agentId}`;
//             console.log('Fetching agent from:', gatewayUrl);
            
//             const response = await fetch(gatewayUrl);
            
//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }
            
//             const agentData = await response.json();
//             console.log('Agent data received:', agentData);
//             return agentData;
//         } catch (error) {
//             console.error('Error fetching agent data:', error);
//             return null;
//         }
//     }

//     // Get avatar URL from agent data
//     function getAvatarUrl(agent) {
//         if (agent?.avatar_img) {
//             // Check if it's already a full URL
//             if (agent.avatar_img.startsWith('http')) {
//                 console.log(agent.avatar_img);
                
//                 return agent.avatar_img;
//             }
//             // Assume it's an IPFS hash
//             return `https://ipfs.erebrus.io/ipfs/${agent.avatar_img}`;
//         }
//         return null;
//     }

//     // Update avatar in UI
//     function updateAvatar(avatarUrl, agentName = 'AI') {
//         // Update header avatar
//         const headerAvatar = document.querySelector('#cyrene-header .cyrene-avatar');
//         if (headerAvatar && avatarUrl) {
//             const img = document.createElement('img');
//             img.src = avatarUrl;
//             img.alt = agentName;
//             img.style.cssText = `
//                 width: 100%;
//                 height: 100%;
//                 object-fit: cover;
//                 border-radius: 50%;
//             `;
            
//             img.onload = function() {
//                 headerAvatar.innerHTML = '';
//                 headerAvatar.appendChild(img);
//             };
            
//             img.onerror = function() {
//                 console.warn('Failed to load avatar image:', avatarUrl);
//                 headerAvatar.textContent = 'AI';
//             };
//         }
        
//         // Update existing bot message avatars
//         const botAvatars = document.querySelectorAll('.cyrene-message.bot .cyrene-message-avatar');
//         botAvatars.forEach(avatar => {
//             if (avatarUrl) {
//                 const img = document.createElement('img');
//                 img.src = avatarUrl;
//                 img.alt = agentName;
//                 img.style.cssText = `
//                     width: 100%;
//                     height: 100%;
//                     object-fit: cover;
//                     border-radius: 50%;
//                 `;
                
//                 img.onload = function() {
//                     avatar.innerHTML = '';
//                     avatar.appendChild(img);
//                 };
                
//                 img.onerror = function() {
//                     avatar.textContent = 'AI';
//                 };
//             }
//         });
//     }

//     // Update agent info in UI
//     function updateAgentInfo(agent) {
//         if (!agent) return;
        
//         // Update agent name
//         const agentNameElement = document.querySelector('#cyrene-header .cyrene-agent-details h3');
//         if (agentNameElement && agent.name) {
//             agentNameElement.textContent = agent.name;
//             config.agentName = agent.name; // Update config for future use
//         }
        
//         // Update avatar
//         const avatarUrl = getAvatarUrl(agent);
//         if (avatarUrl) {
//             updateAvatar(avatarUrl, agent.name || 'AI');
//         }
        
//         // Update greeting message if no custom greeting
//         if (!config.greeting) {
//             const greetingElement = document.querySelector('.cyrene-message.bot .cyrene-message-content');
//             if (greetingElement) {
//                 const timestamp = greetingElement.querySelector('.cyrene-timestamp');
//                 const timestampHtml = timestamp ? timestamp.outerHTML : '';
//                 const agentName = agent.name || config.agentName;
//                 greetingElement.innerHTML = `Hi! I'm ${agentName}. How can I help you today? ${timestampHtml}`;
//             }
//         }
//     }

//     // Initialize agent data
//     async function initializeAgent() {
//         console.log('Initializing agent with API URL:', config.apiUrl);
        
//         const agentDetails = extractAgentDetails(config.apiUrl);
//         console.log('Extracted agent details:', agentDetails);
        
//         if (agentDetails) {
//             try {
//                 agent = await fetchAgentData(agentDetails);
//                 if (agent) {
//                     console.log('Agent loaded successfully:', agent);
//                     isAgentLoaded = true;
//                     updateAgentInfo(agent);
//                 } else {
//                     console.warn('No agent data received, using default configuration');
//                 }
//             } catch (error) {
//                 console.error('Failed to load agent:', error);
//             }
//         } else {
//             console.warn('Could not extract agent details from API URL');
//         }
//     }

//     // Position styles
//     const positions = {
//         'bottom-right': 'bottom: 20px; right: 20px;',
//         'bottom-left': 'bottom: 20px; left: 20px;',
//         'top-right': 'top: 20px; right: 20px;',
//         'top-left': 'top: 20px; left: 20px;'
//     };

//     // Inject CSS
//     const style = document.createElement('style');
//     style.textContent = `
//         /* Widget Container */
//         #cyrene-widget {
//             position: fixed;
//             ${positions[config.position]}
//             z-index: 10000;
//             font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
//         }

//         /* Chat Button */
//         #cyrene-button {
//             width: 60px;
//             height: 60px;
//             border-radius: 50%;
//             background: ${config.primaryColor};
//             border: none;
//             cursor: pointer;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             color: white;
//             font-size: 24px;
//             box-shadow: 0 4px 20px rgba(0,0,0,0.15);
//             transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//             position: relative;
//             overflow: hidden;
//         }

//         #cyrene-button:hover {
//             transform: scale(1.05);
//             box-shadow: 0 6px 25px rgba(0,0,0,0.25);
//         }

//         #cyrene-button:active {
//             transform: scale(0.98);
//         }

//         /* Button pulse animation when closed */
//         #cyrene-button.pulse::before {
//             content: '';
//             position: absolute;
//             top: 0;
//             left: 0;
//             right: 0;
//             bottom: 0;
//             border-radius: 50%;
//             background: ${config.primaryColor};
//             animation: pulse 2s infinite;
//             z-index: -1;
//         }

//         @keyframes pulse {
//             0% { transform: scale(1); opacity: 1; }
//             100% { transform: scale(1.3); opacity: 0; }
//         }

//         /* Chat Panel */
//         #cyrene-panel {
//             position: absolute;
//             bottom: 80px;
//             right: 0;
//             width: 380px;
//             height: 550px;
//             background: white;
//             border-radius: 16px;
//             box-shadow: 0 20px 60px rgba(0,0,0,0.2);
//             transform: translateY(20px) scale(0.95);
//             opacity: 0;
//             visibility: hidden;
//             transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//             display: flex;
//             flex-direction: column;
//             overflow: hidden;
//             border: 1px solid #e2e8f0;
//         }

//         #cyrene-panel.open {
//             transform: translateY(0) scale(1);
//             opacity: 1;
//             visibility: visible;
//         }

//         #cyrene-panel.minimized {
//             height: 60px;
//         }

//         /* Position adjustments for different corners */
//         #cyrene-widget[data-position="bottom-left"] #cyrene-panel {
//             right: auto;
//             left: 0;
//         }

//         #cyrene-widget[data-position="top-right"] #cyrene-panel {
//             bottom: auto;
//             top: 80px;
//         }

//         #cyrene-widget[data-position="top-left"] #cyrene-panel {
//             bottom: auto;
//             top: 80px;
//             right: auto;
//             left: 0;
//         }

//         /* Header */
//         #cyrene-header {
//             padding: 20px;
//             background: linear-gradient(135deg, ${config.primaryColor}, #1e40af);
//             color: white;
//             display: flex;
//             align-items: center;
//             justify-content: space-between;
//             cursor: pointer;
//             flex-shrink: 0;
//         }

//         #cyrene-header:hover {
//             background: linear-gradient(135deg, #1e40af, ${config.primaryColor});
//         }

//         .cyrene-agent-info {
//             display: flex;
//             align-items: center;
//             gap: 12px;
//         }

//         .cyrene-avatar {
//             width: 36px;
//             height: 36px;
//             border-radius: 50%;
//             background: rgba(255,255,255,0.2);
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             font-size: 16px;
//             font-weight: 600;
//             flex-shrink: 0;
//             overflow: hidden;
//         }

//         .cyrene-agent-details h3 {
//             margin: 0;
//             font-size: 16px;
//             font-weight: 600;
//         }

//         .cyrene-status {
//             margin: 0;
//             font-size: 12px;
//             opacity: 0.9;
//             display: flex;
//             align-items: center;
//             gap: 4px;
//         }

//         .cyrene-status::before {
//             content: '';
//             width: 8px;
//             height: 8px;
//             background: #10b981;
//             border-radius: 50%;
//             display: inline-block;
//         }

//         .cyrene-controls {
//             display: flex;
//             gap: 8px;
//         }

//         .cyrene-control-btn {
//             background: none;
//             border: none;
//             color: white;
//             cursor: pointer;
//             padding: 4px;
//             border-radius: 4px;
//             width: 28px;
//             height: 28px;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             transition: background 0.2s;
//         }

//         #cyrene-close:hover, #cyrene-minimize:hover {
//             background: rgba(255,255,255,0.2);
//         }

//         /* Messages */
//         #cyrene-messages {
//             flex: 1;
//             padding: 20px;
//             overflow-y: auto;
//             background: #f8fafc;
//             display: flex;
//             flex-direction: column;
//             gap: 16px;
//         }

//         #cyrene-panel.minimized #cyrene-messages {
//             display: none;
//         }

//         .cyrene-message {
//             display: flex;
//             gap: 12px;
//             align-items: flex-start;
//         }

//         .cyrene-message.user {
//             flex-direction: row-reverse;
//         }

//         .cyrene-message-avatar {
//             width: 32px;
//             height: 32px;
//             border-radius: 50%;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             font-size: 12px;
//             font-weight: 600;
//             flex-shrink: 0;
//             overflow: hidden;
//         }

//         .cyrene-message.user .cyrene-message-avatar {
//             background: ${config.primaryColor};
//             color: white;
//         }

//         .cyrene-message.bot .cyrene-message-avatar {
//             background: #e5e7eb;
//             color: #6b7280;
//         }

//         .cyrene-message-content {
//             max-width: 75%;
//             padding: 12px 16px;
//             border-radius: 18px;
//             line-height: 1.4;
//             word-wrap: break-word;
//             position: relative;
//         }

//         .cyrene-message.user .cyrene-message-content {
//             background: ${config.primaryColor};
//             color: white;
//             border-bottom-right-radius: 4px;
//         }

//         .cyrene-message.bot .cyrene-message-content {
//             background: white;
//             color: #374151;
//             border: 1px solid #e5e7eb;
//             border-bottom-left-radius: 4px;
//             box-shadow: 0 1px 3px rgba(0,0,0,0.05);
//         }

//         .cyrene-timestamp {
//             font-size: 11px;
//             color: #9ca3af;
//             text-align: center;
//             margin-top: 4px;
//         }

//         /* Input Area */
//         #cyrene-input-area {
//             padding: 16px 20px 20px;
//             background: white;
//             border-top: 1px solid #e5e7eb;
//             flex-shrink: 0;
//         }

//         #cyrene-panel.minimized #cyrene-input-area {
//             display: none;
//         }

//         .cyrene-input-container {
//             position: relative;
//             display: flex;
//             align-items: flex-end;
//             gap: 8px;
//         }

//         #cyrene-input {
//             flex: 1;
//             padding: 12px 16px;
//             border: 1px solid #e5e7eb;
//             border-radius: 20px;
//             font-size: 14px;
//             outline: none;
//             resize: none;
//             font-family: inherit;
//             max-height: 100px;
//             min-height: 44px;
//             transition: border-color 0.2s;
//             background: #f9fafb;
//         }

//         #cyrene-input:focus {
//             border-color: ${config.primaryColor};
//             background: white;
//         }

//         #cyrene-input::placeholder {
//             color: #9ca3af;
//         }

//         #cyrene-send {
//             background: ${config.primaryColor};
//             border: none;
//             border-radius: 50%;
//             width: 44px;
//             height: 44px;
//             color: white;
//             cursor: pointer;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             font-size: 18px;
//             transition: all 0.2s;
//             flex-shrink: 0;
//         }

//         #cyrene-send:hover:not(:disabled) {
//             background: #1e40af;
//             transform: scale(1.05);
//         }

//         #cyrene-send:disabled {
//             background: #d1d5db;
//             cursor: not-allowed;
//             transform: none;
//         }

//         /* Typing Indicator */
//         .cyrene-typing {
//             display: flex;
//             gap: 4px;
//             padding: 12px 16px;
//             background: white;
//             border: 1px solid #e5e7eb;
//             border-radius: 18px;
//             border-bottom-left-radius: 4px;
//             box-shadow: 0 1px 3px rgba(0,0,0,0.05);
//             width: fit-content;
//         }

//         .cyrene-typing-dot {
//             width: 6px;
//             height: 6px;
//             border-radius: 50%;
//             background: #9ca3af;
//             animation: cyrene-typing 1.4s infinite ease-in-out;
//         }

//         .cyrene-typing-dot:nth-child(1) { animation-delay: -0.32s; }
//         .cyrene-typing-dot:nth-child(2) { animation-delay: -0.16s; }
//         .cyrene-typing-dot:nth-child(3) { animation-delay: 0s; }

//         @keyframes cyrene-typing {
//             0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
//             40% { opacity: 1; transform: scale(1); }
//         }

//         /* Notification Badge */
//         .cyrene-notification {
//             position: absolute;
//             top: -8px;
//             right: -8px;
//             background: #ef4444;
//             color: white;
//             border-radius: 50%;
//             width: 20px;
//             height: 20px;
//             font-size: 11px;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             font-weight: 600;
//             animation: notification-bounce 0.5s ease-out;
//         }

//         @keyframes notification-bounce {
//             0% { transform: scale(0); }
//             50% { transform: scale(1.2); }
//             100% { transform: scale(1); }
//         }

//         /* Mobile Responsive */
//         @media (max-width: 640px) {
//             #cyrene-panel {
//                 width: calc(100vw - 40px);
//                 right: 20px;
//                 left: 20px;
//                 max-width: 380px;
//             }

//             #cyrene-widget[data-position="bottom-left"] #cyrene-panel {
//                 left: 20px;
//                 right: 20px;
//             }

//             #cyrene-panel {
//                 height: 500px;
//             }

//             #cyrene-header {
//                 padding: 16px;
//             }

//             .cyrene-avatar {
//                 width: 32px;
//                 height: 32px;
//                 font-size: 14px;
//             }

//             .cyrene-agent-details h3 {
//                 font-size: 14px;
//             }

//             #cyrene-messages {
//                 padding: 16px;
//             }

//             #cyrene-input-area {
//                 padding: 12px 16px 16px;
//             }
//         }

//         /* High contrast mode support */
//         @media (prefers-contrast: high) {
//             #cyrene-panel {
//                 border: 2px solid #000;
//             }
            
//             .cyrene-message.bot .cyrene-message-content {
//                 border: 2px solid #374151;
//             }
//         }

//         /* Scrollbar styling */
//         #cyrene-messages::-webkit-scrollbar {
//             width: 6px;
//         }

//         #cyrene-messages::-webkit-scrollbar-track {
//             background: transparent;
//         }

//         #cyrene-messages::-webkit-scrollbar-thumb {
//             background: #d1d5db;
//             border-radius: 3px;
//         }

//         #cyrene-messages::-webkit-scrollbar-thumb:hover {
//             background: #9ca3af;
//         }
//     `;
//     document.head.appendChild(style);

//     // Create widget HTML
//     const widget = document.createElement('div');
//     widget.id = 'cyrene-widget';
//     widget.setAttribute('data-position', config.position);
//     widget.innerHTML = `
//         <button id="cyrene-button" class="pulse">
//             ${config.buttonIcon}
//         </button>
        
//         <div id="cyrene-panel">
//             <div id="cyrene-header">
//                 <div class="cyrene-agent-info">
//                     <div class="cyrene-avatar">AI</div>
//                     <div class="cyrene-agent-details">
//                         <h3>${config.agentName}</h3>
//                         <p class="cyrene-status">Online</p>
//                     </div>
//                 </div>
//                 <div class="cyrene-controls">
//                     <button id="cyrene-minimize" class="cyrene-control-btn" title="Minimize">−</button>
//                     <button id="cyrene-close" class="cyrene-control-btn" title="Close">×</button>
//                 </div>
//             </div>
            
//             <div id="cyrene-messages">
//                 <div class="cyrene-message bot">
//                     <div class="cyrene-message-avatar">AI</div>
//                     <div class="cyrene-message-content">
//                         ${config.greeting || `Hi! I'm ${config.agentName}. How can I help you today?`}
//                         <div class="cyrene-timestamp">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
//                     </div>
//                 </div>
//             </div>
            
//             <div id="cyrene-input-area">
//                 <div class="cyrene-input-container">
//                     <textarea id="cyrene-input" placeholder="${config.placeholder}" rows="1"></textarea>
//                     <button id="cyrene-send">→</button>
//                 </div>
//             </div>
//         </div>
//     `;

//     document.body.appendChild(widget);

//     // Widget functionality
//     const button = document.getElementById('cyrene-button');
//     const panel = document.getElementById('cyrene-panel');
//     const closeBtn = document.getElementById('cyrene-close');
//     const minimizeBtn = document.getElementById('cyrene-minimize');
//     const header = document.getElementById('cyrene-header');
//     const input = document.getElementById('cyrene-input');
//     const sendBtn = document.getElementById('cyrene-send');
//     const messagesContainer = document.getElementById('cyrene-messages');

//     let isOpen = false;
//     let isMinimized = false;
//     let isLoading = false;
//     let unreadCount = 0;

//     // Event listeners
//     button.addEventListener('click', togglePanel);
//     closeBtn.addEventListener('click', closePanel);
//     minimizeBtn.addEventListener('click', toggleMinimize);
//     header.addEventListener('click', () => {
//         if (isMinimized) toggleMinimize();
//     });
//     sendBtn.addEventListener('click', sendMessage);
//     input.addEventListener('keypress', (e) => {
//         if (e.key === 'Enter' && !e.shiftKey) {
//             e.preventDefault();
//             sendMessage();
//         }
//     });

//     // Auto-resize textarea
//     input.addEventListener('input', function() {
//         this.style.height = 'auto';
//         this.style.height = Math.min(this.scrollHeight, 100) + 'px';
//     });

//     function togglePanel() {
//         if (isOpen) {
//             closePanel();
//         } else {
//             openPanel();
//         }
//     }

//     function openPanel() {
//         isOpen = true;
//         panel.classList.add('open');
//         button.classList.remove('pulse');
//         input.focus();
//         clearNotifications();
        
//         // Hide the demo indicator
//         const indicator = document.querySelector('.chat-indicator');
//         if (indicator) {
//             indicator.style.display = 'none';
//         }
//     }

//     function closePanel() {
//         isOpen = false;
//         isMinimized = false;
//         panel.classList.remove('open', 'minimized');
//         button.classList.add('pulse');
//     }

//     function toggleMinimize() {
//         isMinimized = !isMinimized;
//         panel.classList.toggle('minimized', isMinimized);
//         if (!isMinimized) {
//             input.focus();
//         }
//     }

//     function addMessage(content, isUser = false) {
//         const messageDiv = document.createElement('div');
//         messageDiv.className = `cyrene-message ${isUser ? 'user' : 'bot'}`;
        
//         const timestamp = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
//         if (isUser) {
//             messageDiv.innerHTML = `
//                 <div class="cyrene-message-avatar">You</div>
//                 <div class="cyrene-message-content">
//                     ${escapeHtml(content)}
//                     <div class="cyrene-timestamp">${timestamp}</div>
//                 </div>
//             `;
//         } else {
//             // Create bot message with agent avatar
//             const avatarUrl = getAvatarUrl(agent);
//             let avatarHtml = 'AI';
            
//             if (avatarUrl) {
//                 avatarHtml = `<img src="${avatarUrl}" alt="${agent?.name || 'AI'}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;" onerror="this.style.display='none'; this.parentElement.textContent='AI';">`;
//             }
            
//             messageDiv.innerHTML = `
//                 <div class="cyrene-message-avatar">${avatarHtml}</div>
//                 <div class="cyrene-message-content">
//                     ${escapeHtml(content)}
//                     <div class="cyrene-timestamp">${timestamp}</div>
//                 </div>
//             `;
//         }
        
//         messagesContainer.appendChild(messageDiv);
//         messagesContainer.scrollTop = messagesContainer.scrollHeight;

//         // Add notification if panel is closed or minimized
//         if (!isOpen || isMinimized) {
//             if (!isUser) {
//                 showNotification();
//             }
//         }
//     }

//     function showTypingIndicator() {
//         const typingDiv = document.createElement('div');
//         typingDiv.className = 'cyrene-message bot cyrene-typing-message';
        
//         // Create typing indicator with agent avatar
//         const avatarUrl = getAvatarUrl(agent);
//         let avatarHtml = 'AI';
        
//         if (avatarUrl) {
//             avatarHtml = `<img src="${avatarUrl}" alt="${agent?.name || 'AI'}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;" onerror="this.style.display='none'; this.parentElement.textContent='AI';">`;
//         }
        
//         typingDiv.innerHTML = `
//             <div class="cyrene-message-avatar">${avatarHtml}</div>
//             <div class="cyrene-typing">
//                 <div class="cyrene-typing-dot"></div>
//                 <div class="cyrene-typing-dot"></div>
//                 <div class="cyrene-typing-dot"></div>
//             </div>
//         `;
//         messagesContainer.appendChild(typingDiv);
//         messagesContainer.scrollTop = messagesContainer.scrollHeight;
//         return typingDiv;
//     }

//     function removeTypingIndicator(typingElement) {
//         if (typingElement && typingElement.parentNode) {
//             typingElement.parentNode.removeChild(typingElement);
//         }
//     }

//     function showNotification() {
//         unreadCount++;
//         let notificationBadge = button.querySelector('.cyrene-notification');
        
//         if (!notificationBadge) {
//             notificationBadge = document.createElement('div');
//             notificationBadge.className = 'cyrene-notification';
//             button.appendChild(notificationBadge);
//         }
        
//         notificationBadge.textContent = unreadCount > 9 ? '9+' : unreadCount;
//     }

//     function clearNotifications() {
//         unreadCount = 0;
//         const notificationBadge = button.querySelector('.cyrene-notification');
//         if (notificationBadge) {
//             notificationBadge.remove();
//         }
//     }

//     function escapeHtml(text) {
//         const div = document.createElement('div');
//         div.textContent = text;
//         return div.innerHTML;
//     }

//     async function sendMessage() {
//         const message = input.value.trim();
//         if (!message || isLoading) return;

//         // Add user message
//         addMessage(message, true);
//         input.value = '';
//         input.style.height = 'auto';

//         // Show typing indicator
//         const typingIndicator = showTypingIndicator();
//         isLoading = true;
//         sendBtn.disabled = true;

//         try {
//             // Create FormData for the API call
//             const formData = new FormData();
//             formData.append('text', message);
//             formData.append('userId', 'widget-user-' + Date.now());
//             formData.append('voice_mode', 'false');

//             const response = await fetch(config.apiUrl, {
//                 method: 'POST',
//                 body: formData
//             });

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             const data = await response.json();
//             const botResponse = data[0]?.text || "I'm sorry, I couldn't process your request.";

//             // Remove typing indicator and add bot response
//             removeTypingIndicator(typingIndicator);
//             addMessage(botResponse);

//         } catch (error) {
//             console.error('Cyrene Widget Error:', error);
//             removeTypingIndicator(typingIndicator);
//             addMessage("I'm sorry, there was an error processing your request. Please try again.");
//         } finally {
//             isLoading = false;
//             sendBtn.disabled = false;
//             if (isOpen && !isMinimized) {
//                 input.focus();
//             }
//         }
//     }

//     // Initialize agent and load avatar
//     initializeAgent().then(() => {
//         // Auto-pulse the button initially
//         setTimeout(() => {
//             button.classList.add('pulse');
//         }, 2000);
//     });

//     // Make widget globally accessible for customization
//     window.CyreneWidget = {
//         open: openPanel,
//         close: closePanel,
//         minimize: toggleMinimize,
//         addMessage: addMessage,
//         config: config,
//         agent: agent,
//         updateAvatar: updateAvatar
//     };

// })();