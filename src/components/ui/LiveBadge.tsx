import { FC } from 'react';
import './ui.scss';

interface LiveBadgeProps {
  label?: string;
}

/**
 * `● LIVE` status badge — IBM Plex Mono, Signal-Teal dot with a subtle 2s pulse.
 * Reserved exclusively for live-status indicators.
 */
const LiveBadge: FC<LiveBadgeProps> = ({ label = 'LIVE' }) => {
  return (
    <span className="ui-live-badge mono" role="status">
      <span className="ui-live-badge__dot" aria-hidden="true" />
      {label}
    </span>
  );
};

export default LiveBadge;
