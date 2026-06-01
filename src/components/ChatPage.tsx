import { useState, useRef, useEffect, useMemo } from 'react';
import { FaRobot, FaSpinner, FaPaperPlane, FaArrowLeft, FaTrash } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { sendMessage, buildSystemPrompt, ChatMessage } from '../services/groq';
import './ChatPage.scss';

const ChatPage = () => {
  const { t } = useTranslation();

  const suggestions = t('chat.suggestions', { returnObjects: true }) as string[];

  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'system', content: buildSystemPrompt() },
    {
      role: 'assistant',
      content: t('chat.greeting'),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const visibleMessages = messages.filter((m) => m.role !== 'system');
  const hasUserMessages = useMemo(() => visibleMessages.some((m) => m.role === 'user'), [visibleMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [visibleMessages, loading]);

  const handleSend = async (text?: string) => {
    const msg = (text || input).trim();
    if (!msg || loading) return;
    setInput('');

    const userMsg: ChatMessage = { role: 'user', content: msg };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    const reply = await sendMessage([...messages, userMsg]);
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
        content: t('chat.greeting'),
      },
    ]);
  };

  return (
    <div className="chat-page">
      <div className="chat-sidebar">
        <div className="sidebar-header">
          <span className="sidebar-title">{t('chat.title')}</span>
        </div>
        <button className="new-chat-btn" onClick={handleNewChat}>
          <FaTrash /> {t('chat.newChat')}
        </button>
        <div className="sidebar-info">
          <p>{t('chat.sidebarInfo')}</p>
        </div>
        <div className="sidebar-footer">
          <a href="#/" className="back-link">
            <FaArrowLeft /> {t('chat.backToPortfolio')}
          </a>
        </div>
      </div>

      <div className="chat-main">
        <div className="chat-main-header">
          <a href="#/" className="back-link-mobile">
            <FaArrowLeft />
          </a>
          <FaRobot className="chat-main-icon" />
          <span>{t('chat.assistantName')}</span>
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
                <div className="msg-label">{msg.role === 'assistant' ? t('chat.rayAi') : t('chat.you')}</div>
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
                <div className="msg-label">{t('chat.rayAi')}</div>
                <div className="msg-bubble loading-msg">
                  <FaSpinner className="spin" />
                </div>
              </div>
            </div>
          )}

          {!hasUserMessages && (
            <div className="suggestions-area">
              <p className="suggestions-label">{t('chat.suggestionsLabel')}</p>
              <div className="suggestions-grid">
                {suggestions.map((s: string, i: number) => (
                  <button
                    key={i}
                    className="suggestion-chip"
                    onClick={() => handleSend(s)}
                    disabled={loading}
                  >
                    {s}
                  </button>
                ))}
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
              placeholder={t('chat.inputPlaceholder')}
              rows={1}
            />
            <button className="send-btn" onClick={() => handleSend()} disabled={loading || !input.trim()}>
              <FaPaperPlane />
            </button>
          </div>
          <p className="chat-footer-note">{t('chat.poweredBy')}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
