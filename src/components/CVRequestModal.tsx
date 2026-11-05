import { FC, FormEvent, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { FaTimes } from 'react-icons/fa';
import { submitToFormspree } from '../services/formspree';
import './CVRequestModal.scss';

interface CVRequestModalProps {
  onClose: () => void;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]):not([tabindex="-1"]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

const CVRequestModal: FC<CVRequestModalProps> = ({ onClose }) => {
  const { t } = useTranslation();
  const titleId = useId();
  const descId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');
  const [gotcha, setGotcha] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  // Focus management: focus the first field, trap Tab, close on Escape, restore focus on close.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    emailRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onCloseRef.current();
        return;
      }
      if (e.key !== 'Tab' || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setError('');

    const trimmed = email.trim();
    if (!trimmed) {
      setError(t('cvModal.errorEmail'));
      return;
    }

    setIsSubmitting(true);
    const result = await submitToFormspree({
      email: trimmed,
      message: note.trim() ? `CV request. Note: ${note.trim()}` : 'CV request via the portfolio site.',
      _subject: 'CV request from portfolio',
      _gotcha: gotcha,
    });
    setIsSubmitting(false);

    if (result.ok) {
      toast.success(t('cvModal.success'));
      onClose();
    } else {
      setError(result.message || t('cvModal.error'));
    }
  };

  const content = (
    <div
      className="modal-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !isSubmitting) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className="modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
      >
        <button
          type="button"
          className="icon-button modal-close"
          onClick={onClose}
          aria-label={t('common.close')}
          disabled={isSubmitting}
        >
          <FaTimes aria-hidden="true" />
        </button>
        <h2 id={titleId}>{t('cvModal.title')}</h2>
        <p id={descId} className="modal-description">
          {t('cvModal.description')}
        </p>
        <form onSubmit={handleSubmit} className="form-stack" noValidate>
          <div className="form-field">
            <label htmlFor={`${titleId}-email`}>{t('cvModal.emailLabel')}</label>
            <input
              ref={emailRef}
              id={`${titleId}-email`}
              type="email"
              name="email"
              autoComplete="email"
              required
              maxLength={254}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              aria-invalid={error ? true : undefined}
            />
          </div>
          <div className="form-field">
            <label htmlFor={`${titleId}-note`}>{t('cvModal.noteLabel')}</label>
            <input
              id={`${titleId}-note`}
              type="text"
              name="note"
              maxLength={200}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
          <div className="visually-hidden" aria-hidden="true">
            <label htmlFor={`${titleId}-gotcha`}>Leave this field empty</label>
            <input
              id={`${titleId}-gotcha`}
              type="text"
              name="_gotcha"
              tabIndex={-1}
              autoComplete="off"
              value={gotcha}
              onChange={(e) => setGotcha(e.target.value)}
            />
          </div>
          <p className="form-status" role="alert">
            {error}
          </p>
          <div className="modal-actions">
            <button type="submit" className="btn btn--primary" disabled={isSubmitting}>
              {isSubmitting ? t('contact.sending') : t('cvModal.submit')}
            </button>
            <button type="button" className="btn btn--secondary" onClick={onClose} disabled={isSubmitting}>
              {t('common.cancel')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return createPortal(content, document.body);
};

export default CVRequestModal;
