import { useState, useRef, useEffect } from 'react';
import { FaRobot, FaTimes, FaPaperPlane, FaSpinner } from 'react-icons/fa';
import { sendMessage, buildSystemPrompt, ChatMessage } from '../services/groq';
import './AIChat.scss';

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'system', content: buildSystemPrompt() },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const visibleMessages = messages.filter((m) => m.role !== 'system');

  useEffect(() => {
    if (visibleMessages.length === 0) {
      setMessages([
        { role: 'system', content: buildSystemPrompt() },
        {
          role: 'assistant',
          content:
            "Hi! I'm Ray's AI assistant. Ask me about his skills, projects, experience, or anything else!",
        },
      ]);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [visibleMessages, loading]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput('');

    const userMsg: ChatMessage = { role: 'user', content: text };
    const history = [...messages, userMsg];
    setMessages(history);
    setLoading(true);

    const reply = await sendMessage(history.filter((m) => m.role !== 'system'));
    setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <button
        className={`ai-chat-toggle ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle AI chat"
      >
        {isOpen ? <FaTimes /> : <FaRobot />}
      </button>

      {isOpen && (
        <div className="ai-chat-panel">
          <div className="ai-chat-header">
            <FaRobot className="ai-chat-header-icon" />
            <span>AI Assistant</span>
          </div>

          <div className="ai-chat-messages">
            {visibleMessages.map((msg, i) => (
              <div key={i} className={`chat-msg ${msg.role}`}>
                <div className="chat-bubble">{msg.content}</div>
              </div>
            ))}
            {loading && (
              <div className="chat-msg assistant">
                <div className="chat-bubble loading">
                  <FaSpinner className="spinner" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="ai-chat-input">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about Ray's skills, projects..."
              rows={1}
            />
            <button onClick={handleSend} disabled={loading || !input.trim()}>
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChat;
