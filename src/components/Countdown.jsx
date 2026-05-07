import { useEffect, useState } from 'react';

// Final exam: May 12, 2026, 12:00 PM America/New_York (EDT, UTC-4 in May)
export const EXAM_TIME_MS = Date.UTC(2026, 4, 12, 16, 0, 0); // 12:00 EDT == 16:00 UTC

export default function Countdown({ compact = false }) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const ms = EXAM_TIME_MS - now;

  if (ms <= 0) {
    return (
      <div className="countdown done">
        <span className="cd-label">🎓 Exam time — go crush it!</span>
      </div>
    );
  }

  const days = Math.floor(ms / 86400000);
  const hours = Math.floor((ms % 86400000) / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const urgent = ms < 86400000 * 2; // < 2 days
  const critical = ms < 3600000 * 6; // < 6 hours

  const cls = [
    'countdown',
    compact ? 'compact' : '',
    urgent ? 'urgent' : '',
    critical ? 'critical' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={cls} role="timer" aria-live="polite">
      <span className="cd-label">⏰ Final exam in</span>
      <span className="cd-blocks">
        <span className="cd-block"><b>{days}</b><span>days</span></span>
        <span className="cd-block"><b>{String(hours).padStart(2, '0')}</b><span>hrs</span></span>
        <span className="cd-block"><b>{String(minutes).padStart(2, '0')}</b><span>min</span></span>
        <span className="cd-block sec"><b>{String(seconds).padStart(2, '0')}</b><span>sec</span></span>
      </span>
      <span className="cd-when">May 12 · 12:00 PM ET</span>
    </div>
  );
}
