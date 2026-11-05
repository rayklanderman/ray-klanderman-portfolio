import { useState, useRef, useEffect, useMemo } from 'react';
import { FaRobot, FaSpinner, FaPaperPlane, FaArrowLeft, FaTrash } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { sendMessage, ChatMessage } from '../services/groq';
import ChatMarkdown from './ChatMarkdown';
import './ChatPage.scss';

const ChatPage = () => {
  const { t } = useTranslation();

  const suggestions = t('chat.suggestions', { returnObjects: true }) as string[];

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: t('chat.greeting'),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const visibleMessages = messages;
  const hasUserMessages = useMemo(() => visibleMessages.some((m) => m.role === 'user'), [visibleMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ block: 'end' });
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
      {
        role: 'assistant',
        content: t('chat.greeting'),
      },
    ]);
  };

  return (
    <div className="chat-page">
      <h1 className="visually-hidden">{t('chat.pageTitle')}</h1>
      <div className="chat-sidebar">
        <div className="sidebar-header">
          <span className="sidebar-title">{t('chat.title')}</span>
        </div>
        <button type="button" className="new-chat-btn" onClick={handleNewChat}>
          <FaTrash aria-hidden="true" /> {t('chat.newChat')}
        </button>
        <div className="sidebar-info">
          <p>{t('chat.sidebarInfo')}</p>
        </div>
        <div className="sidebar-footer">
          <Link to="/" className="back-link">
            <FaArrowLeft aria-hidden="true" /> {t('chat.backToPortfolio')}
          </Link>
        </div>
      </div>

      <div className="chat-main">
        <div className="chat-main-header">
          <Link to="/" className="back-link-mobile" aria-label={t('chat.backToPortfolio')}>
            <FaArrowLeft aria-hidden="true" />
          </Link>
          <FaRobot className="chat-main-icon" aria-hidden="true" />
          <span>{t('chat.assistantName')}</span>
        </div>

        <div className="chat-messages-area" role="log" aria-live="polite" aria-label={t('chat.conversation')}>
          {visibleMessages.map((msg, i) => (
            <div key={i} className={`msg-row ${msg.role}`}>
              {msg.role === 'assistant' && (
                <div className="msg-avatar">
                  <FaRobot />
                </div>
              )}
              <div className="msg-bubble-wrap">
                <div className="msg-label">{msg.role === 'assistant' ? t('chat.rayAi') : t('chat.you')}</div>
                <div className="msg-bubble">
                  {msg.role === 'assistant' ? <ChatMarkdown text={msg.content} /> : msg.content}
                </div>
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
                  <FaSpinner className="spin" aria-hidden="true" />
                  <span className="visually-hidden">{t('chat.thinking')}</span>
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
                    type="button"
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
            <label htmlFor="chat-input" className="visually-hidden">
              {t('chat.inputLabel')}
            </label>
            <textarea
              id="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t('chat.inputPlaceholder')}
              maxLength={2000}
              rows={1}
            />
            <button
              type="button"
              className="send-btn"
              onClick={() => handleSend()}
              disabled={loading || !input.trim()}
              aria-label={t('chat.send')}
            >
              <FaPaperPlane aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
