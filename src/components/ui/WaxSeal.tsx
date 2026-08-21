import { FC, ReactNode } from 'react';
import './ui.scss';

interface WaxSealProps {
  size?: 'sm' | 'md';
  children?: ReactNode;
  title?: string;
  className?: string;
}

/**
 * Circular Gold-Ochre wax seal — radial gradient + double ring + slight rotation.
 * Used for credentials and awards. No raster images.
 */
const WaxSeal: FC<WaxSealProps> = ({ size = 'md', children, title, className }) => {
  return (
    <span
      className={`ui-wax-seal ui-wax-seal--${size}${className ? ` ${className}` : ''}`}
      role="img"
      aria-label={title}
      title={title}
    >
      <svg
        className="ui-wax-seal__svg"
        viewBox="0 0 100 100"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <radialGradient id="ui-wax-seal-grad" cx="38%" cy="32%" r="75%">
            <stop offset="0%" stopColor="#e8c06a" />
            <stop offset="45%" stopColor="#c99a3b" />
            <stop offset="100%" stopColor="#8a6418" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="47" fill="url(#ui-wax-seal-grad)" stroke="#6d4e12" strokeWidth="2" />
        <circle cx="50" cy="50" r="41" fill="none" stroke="#f4e4bc" strokeWidth="2.5" strokeOpacity="0.7" />
        <circle cx="50" cy="50" r="36" fill="none" stroke="#f4e4bc" strokeWidth="1" strokeOpacity="0.45" strokeDasharray="2 3" />
      </svg>
      {children && <span className="ui-wax-seal__label">{children}</span>}
    </span>
  );
};

export default WaxSeal;
