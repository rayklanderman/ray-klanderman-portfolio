import { useState, useRef, useEffect } from 'react';
import { FaRobot, FaSpinner, FaPaperPlane, FaArrowLeft, FaTrash } from 'react-icons/fa';
import { sendMessage, buildSystemPrompt, ChatMessage } from '../services/groq';
import './ChatPage.scss';

const ChatPage = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'system', content: buildSystemPrompt() },
    {
      role: 'assistant',
      content:
        "Hi! I'm Ray's AI assistant. Ask me about his skills, projects, experience, certifications, or anything else you'd like to know!",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const visibleMessages = messages.filter((m) => m.role !== 'system');

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [visibleMessages, loading]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput('');

    const userMsg: ChatMessage = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    const reply = await sendMessage([...messages, userMsg].filter((m) => m.role !== 'system'));
    setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleNewChat = () => {
    setMessages([
      { role: 'system', content: buildSystemPrompt() },
      {
        role: 'assistant',
        content:
          "Hi! I'm Ray's AI assistant. Ask me about his skills, projects, experience, certifications, or anything else you'd like to know!",
      },
    ]);
  };

  return (
    <div className="chat-page">
      <div className="chat-sidebar">
        <div className="sidebar-header">
          <span className="sidebar-title">AI Chat</span>
        </div>
        <button className="new-chat-btn" onClick={handleNewChat}>
          <FaTrash /> New Chat
        </button>
        <div className="sidebar-info">
          <p>Ask about Ray's skills, projects, experience, and more.</p>
        </div>
        <div className="sidebar-footer">
          <a href="#/" className="back-link">
            <FaArrowLeft /> Back to Portfolio
          </a>
        </div>
      </div>

      <div className="chat-main">
        <div className="chat-main-header">
          <a href="#/" className="back-link-mobile">
            <FaArrowLeft />
          </a>
          <FaRobot className="chat-main-icon" />
          <span>AI Assistant</span>
        </div>

        <div className="chat-messages-area">
          {visibleMessages.map((msg, i) => (
            <div key={i} className={`msg-row ${msg.role}`}>
              {msg.role === 'assistant' && (
                <div className="msg-avatar">
                  <FaRobot />
                </div>
              )}
              <div className="msg-bubble-wrap">
                <div className="msg-label">{msg.role === 'assistant' ? 'Ray AI' : 'You'}</div>
                <div className="msg-bubble">{msg.content}</div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="msg-row assistant">
              <div className="msg-avatar">
                <FaRobot />
              </div>
              <div className="msg-bubble-wrap">
                <div className="msg-label">Ray AI</div>
                <div className="msg-bubble loading-msg">
                  <FaSpinner className="spin" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input-area">
          <div className="chat-input-wrap">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about Ray's skills, projects..."
              rows={1}
            />
            <button className="send-btn" onClick={handleSend} disabled={loading || !input.trim()}>
              <FaPaperPlane />
            </button>
          </div>
          <p className="chat-footer-note">Powered by Groq Llama 3.3 70B</p>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
