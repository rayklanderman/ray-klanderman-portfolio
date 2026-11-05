import { FC, FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaLinkedin } from 'react-icons/fa';
import { submitToFormspree } from '../services/formspree';
import { LINKS } from '../data/site';
import './Contact.scss';

type Status = 'idle' | 'sending' | 'success' | 'error';

const LIMITS = { name: 100, email: 254, message: 5000 } as const;

const Contact: FC = () => {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [gotcha, setGotcha] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [statusText, setStatusText] = useState('');

  const update = (field: keyof typeof form) => (value: string) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'sending') return;

    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();
    if (!name || !email || !message) {
      setStatus('error');
      setStatusText(t('contact.errorRequired'));
      return;
    }

    setStatus('sending');
    setStatusText(t('contact.sending'));
    const result = await submitToFormspree({
      name,
      email,
      message,
      _subject: `Portfolio contact message from ${name}`,
      _gotcha: gotcha,
    });

    if (result.ok) {
      setStatus('success');
      setStatusText(t('contact.success'));
      setForm({ name: '', email: '', message: '' });
    } else {
      setStatus('error');
      setStatusText(result.message || t('contact.error'));
    }
  };

  const sending = status === 'sending';

  return (
    <section id="contact" className="section section--alt contact" aria-labelledby="contact-title">
      <span id="contact-me" className="anchor-alias" aria-hidden="true" />
      <div className="container">
        <h2 id="contact-title" className="section-title">
          {t('contact.title')}
        </h2>
        <p className="section-subtitle">{t('contact.subtitle')}</p>

        <div className="contact__layout">
          <form className="contact__form form-stack" onSubmit={handleSubmit} noValidate>
            <div className="form-field">
              <label htmlFor="contact-name">{t('contact.name')}</label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                maxLength={LIMITS.name}
                value={form.name}
                onChange={(e) => update('name')(e.target.value)}
                disabled={sending}
              />
            </div>
            <div className="form-field">
              <label htmlFor="contact-email">{t('contact.email')}</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={LIMITS.email}
                value={form.email}
                onChange={(e) => update('email')(e.target.value)}
                disabled={sending}
              />
            </div>
            <div className="form-field">
              <label htmlFor="contact-message">{t('contact.message')}</label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={6}
                maxLength={LIMITS.message}
                aria-describedby="contact-message-hint"
                value={form.message}
                onChange={(e) => update('message')(e.target.value)}
                disabled={sending}
              />
              <span id="contact-message-hint" className="form-hint">
                {t('contact.messageHint', { max: LIMITS.message })}
              </span>
            </div>
            <div className="visually-hidden" aria-hidden="true">
              <label htmlFor="contact-gotcha">Leave this field empty</label>
              <input
                id="contact-gotcha"
                type="text"
                name="_gotcha"
                tabIndex={-1}
                autoComplete="off"
                value={gotcha}
                onChange={(e) => setGotcha(e.target.value)}
              />
            </div>
            <div className="contact__submit">
              <button type="submit" className="btn btn--primary" disabled={sending}>
                {sending ? t('contact.sending') : t('contact.send')}
              </button>
            </div>
            <p
              className={`form-status${status === 'success' ? ' form-status--success' : ''}${
                status === 'error' ? ' form-status--error' : ''
              }`}
              role="status"
              aria-live="polite"
            >
              {statusText}
            </p>
          </form>

          <aside className="contact__aside" aria-labelledby="contact-aside-title">
            <h3 id="contact-aside-title">{t('contact.otherTitle')}</h3>
            <p>{t('contact.otherText')}</p>
            <a href={LINKS.linkedin} className="btn btn--secondary" target="_blank" rel="noopener noreferrer">
              <FaLinkedin aria-hidden="true" /> {t('contact.linkedin')}
              <span className="visually-hidden"> ({t('common.newTab')})</span>
            </a>
            <p className="contact__privacy">{t('contact.privacy')}</p>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Contact;
