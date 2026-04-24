// Main STT app screen — the "Super Three Tree Plan" phone UI.

// (use React.useState etc directly)

// ===== Confetti helper =====
function fireConfetti(count = 60) {
  const colors = ['#4ade80', '#22c55e', '#fcd34d', '#f472b6', '#38bdf8', '#86efac'];
  const container = document.body;
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'stt-confetti-piece';
    el.style.left = Math.random() * 100 + 'vw';
    el.style.background = colors[Math.floor(Math.random() * colors.length)];
    el.style.setProperty('--x', (Math.random() * 200 - 100) + 'px');
    el.style.animationDuration = (1.8 + Math.random() * 1.5) + 's';
    el.style.animationDelay = (Math.random() * 0.3) + 's';
    container.appendChild(el);
    setTimeout(() => el.remove(), 3500);
  }
}

// ===== Top quick-action icons row =====
const QuickActions = ({ onTimer, onBadges, onCalendar, onSummary, onReminder, onExport, onShare }) => {
  const items = [
    { icon: "⏱", label: "Timer",    onClick: onTimer,    bg: "#2a1a0a" },
    { icon: "🏆", label: "Badges",   onClick: onBadges,   bg: "#1a2a0a" },
    { icon: "📅", label: "Calendar", onClick: onCalendar, bg: "#0a1a2a" },
    { icon: "📊", label: "Summary",  onClick: onSummary,  bg: "#2a0a1a" },
    { icon: "🔔", label: "Reminder", onClick: onReminder, bg: "#2a2a0a" },
    { icon: "📤", label: "Export",   onClick: onExport,   bg: "#1a0a2a" },
    { icon: "🔗", label: "Share",    onClick: onShare,    bg: "#0a2a1a" },
  ];
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6,
      padding: '12px 10px', margin: '0 10px',
      background: 'rgba(12, 24, 16, 0.6)', borderRadius: 14,
      border: '1px solid rgba(74, 222, 128, 0.12)',
    }}>
      {items.map((it) => (
        <button key={it.label} onClick={it.onClick} style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
          padding: '6px 2px', borderRadius: 10, transition: 'transform .15s, background .15s',
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(74,222,128,0.1)'}
        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <div style={{
            width: 34, height: 34, borderRadius: 9,
            background: `linear-gradient(135deg, ${it.bg}, rgba(0,0,0,0.4))`,
            border: '1px solid rgba(74,222,128,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 17, boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
          }}>{it.icon}</div>
          <div style={{ fontSize: 9, color: 'rgba(240,253,244,0.88)', letterSpacing: 0.2 }}>{it.label}</div>
        </button>
      ))}
    </div>
  );
};

// ===== Stat pill =====
const StatPill = ({ value, label, color = 'var(--stt-green-bright)' }) => (
  <div style={{
    display: 'inline-flex', alignItems: 'baseline', gap: 6, padding: '4px 10px',
    background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.25)',
    borderRadius: 999, fontSize: 13,
  }}>
    <span style={{ color, fontWeight: 700, fontSize: 15 }}>{value}</span>
    <span style={{ color: 'rgba(240,253,244,0.88)', fontSize: 11 }}>{label}</span>
  </div>
);

// ===== Date chips row =====
const DateRow = ({ start, target, months }) => (
  <div style={{ display: 'flex', gap: 6, justifyContent: 'center', padding: '6px 10px', flexWrap: 'wrap' }}>
    <span style={chipStyle()}>📅 {start}</span>
    <span style={chipStyle('#fcd34d')}>🎯 {target}</span>
    <span style={chipStyle('#86efac')}>🗓 {months} මාස</span>
  </div>
);
const chipStyle = (color = '#4ade80') => ({
  display: 'inline-flex', alignItems: 'center', gap: 4,
  padding: '3px 9px', fontSize: 11, color,
  background: `${color}15`, border: `1px solid ${color}35`, borderRadius: 999,
  fontFamily: 'var(--stt-font-sinhala)',
});

// ===== Quote banner =====
const QuoteBanner = ({ quote, onNext, onPrev }) => (
  <div style={{
    margin: '8px 10px', padding: '10px 12px',
    background: 'linear-gradient(90deg, rgba(74,222,128,0.08), rgba(252,211,77,0.06))',
    border: '1px solid rgba(74,222,128,0.2)', borderRadius: 12,
    display: 'flex', alignItems: 'center', gap: 8,
  }}>
    <div style={{ fontSize: 16 }}>💬</div>
    <div style={{
      flex: 1, fontSize: 11, lineHeight: 1.4, color: 'rgba(240,253,244,0.88)',
      fontFamily: 'var(--stt-font-sinhala)',
    }}>{quote}</div>
    <div style={{ display: 'flex', gap: 4 }}>
      <button onClick={onPrev} style={iconBtn()}>‹</button>
      <button onClick={onNext} style={iconBtn()}>›</button>
    </div>
  </div>
);
const iconBtn = () => ({
  width: 22, height: 22, borderRadius: 6,
  background: 'rgba(74,222,128,0.15)', color: '#86efac',
  fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
});

// ===== Subject tabs =====
const SubjectTabs = ({ subjects, active, onChange, streak }) => (
  <div style={{ display: 'flex', gap: 6, padding: '8px 10px', overflowX: 'auto' }} className="stt-scroll">
    <button onClick={() => onChange('all')} style={tabStyle(active === 'all', '#fcd34d')}>
      <span style={{ fontSize: 11 }}>🔥</span>
      <span style={{ fontWeight: 700 }}>{streak}</span>
    </button>
    {subjects.map(s => (
      <button key={s.id} onClick={() => onChange(s.id)} style={tabStyle(active === s.id, s.color)}>
        {s.label}
      </button>
    ))}
  </div>
);
const tabStyle = (active, color) => ({
  display: 'inline-flex', alignItems: 'center', gap: 4,
  padding: '5px 10px', fontSize: 11, whiteSpace: 'nowrap',
  fontFamily: 'var(--stt-font-sinhala)',
  background: active ? color : `${color}18`,
  color: active ? '#0a0e0b' : color,
  border: `1px solid ${color}${active ? 'ff' : '40'}`,
  borderRadius: 999, fontWeight: active ? 700 : 500,
  transition: 'all .15s',
});

window.STT_UI = { fireConfetti, QuickActions, StatPill, DateRow, QuoteBanner, SubjectTabs };
