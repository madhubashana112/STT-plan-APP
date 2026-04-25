// Task list + Pomodoro modal + Badges modal + Week nav

// ===== Task row — check, title, subject dot, note, timer =====
const TaskRow = ({ task, done, note, subject, onToggle, onNote, onTimer, onRemove }) => {
  const [expanded, setExpanded] = React.useState(false);
  const [editing, setEditing] = React.useState(false);
  return (
    <div style={{
      background: done ? 'rgba(74,222,128,0.18)' : 'rgba(20,36,26,0.95)',
      border: `1.5px solid ${done ? '#4ade80' : 'rgba(134,239,172,0.3)'}`,
      borderRadius: 12, padding: '11px 12px', marginBottom: 8,
      transition: 'all .25s',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <button onClick={onToggle} style={{
          width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
          border: `2.5px solid ${done ? subject.color : '#86efac'}`,
          background: done ? subject.color : 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, color: '#0a0e0b', fontWeight: 900,
          transition: 'all .2s',
          animation: done ? 'sttPopIn .35s ease' : 'none',
        }}>{done && '✓'}</button>

        <span style={{
          fontSize: 10.5, fontWeight: 800, padding: '3px 7px', borderRadius: 5,
          background: subject.color, color: '#0a0e0b',
          fontFamily: 'var(--stt-font-sinhala)',
          flexShrink: 0,
        }}>{subject.label}</span>

        <div onClick={() => setExpanded(v => !v)} style={{
          flex: 1, fontSize: 13, lineHeight: 1.35,
          fontFamily: 'var(--stt-font-sinhala)', fontWeight: 500,
          color: done ? 'rgba(240,253,244,0.7)' : '#ffffff',
          textDecoration: done ? 'line-through' : 'none',
          cursor: 'pointer',
        }}>{task.title}</div>

        <span style={{
          fontSize: 11, color: '#ffffff', flexShrink: 0, fontWeight: 700,
          padding: '2px 7px', border: '1px solid rgba(255,255,255,0.25)',
          borderRadius: 5, background: 'rgba(0,0,0,0.3)',
        }}>{task.minutes}m</span>

        <button onClick={() => onTimer(task)} style={{
          width: 26, height: 26, borderRadius: 6, fontSize: 13,
          background: '#fcd34d', color: '#0a0e0b', fontWeight: 700,
          flexShrink: 0, boxShadow: '0 0 8px rgba(252,211,77,0.4)',
        }}>⏱</button>

        {onRemove && (
          <button onClick={onRemove} style={{
            width: 26, height: 26, borderRadius: 6, fontSize: 14,
            background: 'rgba(239,68,68,0.15)', color: '#ef4444', fontWeight: 900,
            flexShrink: 0, border: '1px solid rgba(239,68,68,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>✕</button>
        )}
      </div>

      {expanded && (
        <div style={{ marginTop: 8, paddingTop: 8, borderTop: '1px solid rgba(74,222,128,0.08)', animation: 'sttFadeIn .2s ease' }}>
          <div style={{ fontSize: 11, color: 'rgba(240,253,244,0.88)', lineHeight: 1.5, marginBottom: 8, fontFamily: 'var(--stt-font-sinhala)' }}>
            {task.detail}
          </div>
          {editing ? (
            <textarea
              autoFocus
              value={note || ''}
              onChange={e => onNote(e.target.value)}
              onBlur={() => setEditing(false)}
              placeholder="Note / reflection..."
              style={{
                width: '100%', minHeight: 60, padding: 8, borderRadius: 8,
                background: 'rgba(0,0,0,0.4)', color: '#f0fdf4',
                border: '1px solid rgba(74,222,128,0.25)', fontSize: 11,
                resize: 'vertical', fontFamily: 'var(--stt-font-sinhala)', outline: 'none',
              }}
            />
          ) : (
            <div onClick={() => setEditing(true)} style={{
              padding: 8, fontSize: 11, minHeight: 28, cursor: 'text',
              background: 'rgba(0,0,0,0.25)', borderRadius: 8,
              color: note ? '#f0fdf4' : 'rgba(240,253,244,0.72)',
              fontFamily: 'var(--stt-font-sinhala)',
              border: '1px dashed rgba(74,222,128,0.15)',
            }}>
              {note || '✎ Note එකක් add කරන්න...'}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ===== Pomodoro modal =====
const PomodoroModal = ({ open, onClose, task }) => {
  const { seconds, running, start, pause, reset, setPresetMin, preset, isBreak } = usePomodoro();
  const [lofiOn, setLofiOn] = React.useState(false);
  const [customOpen, setCustomOpen] = React.useState(false);
  const [customVal, setCustomVal] = React.useState('25');
  const audioRef = React.useRef(null);
  
  React.useEffect(() => {
    if (open && task && task.minutes) {
      setPresetMin(parseInt(task.minutes) || 30);
      setTimeout(() => start(), 100);
    }
  }, [open, task?.id]);

  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      if (lofiOn && running) {
        audioRef.current.play().catch(err => {
          console.warn("Audio play blocked:", err);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [lofiOn, running]);

  if (!open) return null;
  const totalSec = preset * 60;
  const progress = 1 - seconds / totalSec;
  const C = 2 * Math.PI * 80;

  const applyCustom = () => {
    if (customVal && !isNaN(customVal)) {
      setPresetMin(parseInt(customVal));
      setCustomOpen(false);
    }
  };

  return (
    <div onClick={onClose} style={modalBg()}>
      <div onClick={e => e.stopPropagation()} style={{ ...modalCard(), position: 'relative' }}>
        <audio ref={audioRef} src="https://assets.mixkit.co/sfx/preview/mixkit-light-rain-loop-2443.mp3" loop />
        
        {/* In-app Custom Time Popup */}
        {customOpen && (
          <div style={{
            position: 'absolute', inset: 0, zIndex: 20,
            background: 'rgba(5,10,6,0.95)', borderRadius: 16,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            padding: 20, animation: 'sttFadeIn 0.2s ease', backdropFilter: 'blur(10px)',
            border: '1.5px solid #4ade80'
          }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#fff', marginBottom: 15, fontFamily: 'var(--stt-font-sinhala)' }}>විනාඩි ගණන ඇතුළත් කරන්න</div>
            <input 
              autoFocus
              type="number" 
              value={customVal} 
              onChange={e => setCustomVal(e.target.value)}
              style={{
                width: '100%', padding: '12px', borderRadius: 12, background: 'rgba(255,255,255,0.05)',
                border: '1px solid #4ade80', color: '#fff', fontSize: 18, fontWeight: 700,
                textAlign: 'center', outline: 'none', marginBottom: 20
              }}
            />
            <div style={{ display: 'flex', gap: 10, width: '100%' }}>
              <button onClick={() => setCustomOpen(false)} style={{ ...secondaryBtn(), flex: 1, padding: '12px' }}>Cancel</button>
              <button onClick={applyCustom} style={{ ...primaryBtn(), flex: 1, padding: '12px' }}>Set Time</button>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--stt-gold)' }}>⏱ Focus Timer</div>
          <button onClick={onClose} style={closeBtn()}>✕</button>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          {task?.title ? (
            <div style={{ fontSize: 11, color: 'rgba(240,253,244,0.88)', fontFamily: 'var(--stt-font-sinhala)', maxWidth: '60%' }}>
               {task.title}
            </div>
          ) : <div style={{ fontSize: 11, color: '#86efac', fontWeight: 700 }}>{isBreak ? '☕ Break Time' : '✍️ Study Mode'}</div>}
          
          <button onClick={() => {
            const next = !lofiOn;
            setLofiOn(next);
            if (next && audioRef.current) {
              audioRef.current.play().catch(err => console.warn("Lofi play failed:", err));
            }
          }} style={{
            fontSize: 10, padding: '4px 8px', borderRadius: 8,
            background: lofiOn ? 'rgba(74,222,128,0.2)' : 'rgba(255,255,255,0.05)',
            color: lofiOn ? '#86efac' : '#fff', border: `1px solid ${lofiOn ? '#4ade80' : 'transparent'}`,
            transition: 'all 0.2s', fontWeight: 600
          }}>
            {lofiOn ? '🎧 Lofi: ON' : '🎧 Lofi: OFF'}
          </button>
        </div>

        <svg viewBox="0 0 200 200" width="180" height="180" style={{ display: 'block', margin: '0 auto' }}>
          <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8"/>
          <circle cx="100" cy="100" r="80" fill="none" stroke={isBreak ? '#38bdf8' : 'url(#timerGrad)'} strokeWidth="8"
            strokeDasharray={C} strokeDashoffset={C * (1 - progress)}
            transform="rotate(-90 100 100)" strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1s linear' }}/>
          <defs>
            <linearGradient id="timerGrad">
              <stop offset="0%" stopColor="#4ade80"/>
              <stop offset="100%" stopColor="#fcd34d"/>
            </linearGradient>
          </defs>
          <text x="100" y="105" textAnchor="middle" fill="#ecfdf5" fontSize="32" fontWeight="900" fontFamily="Inter" style={{ transition: 'none' }}>
            {formatTime(seconds)}
          </text>
          <text x="100" y="128" textAnchor="middle" fill={isBreak ? '#38bdf8' : '#86efac'} fontSize="11" fontWeight="700">
            {running ? (isBreak ? 'resting...' : 'focusing...') : 'paused'}
          </text>
        </svg>

        <div style={{ display: 'flex', gap: 5, justifyContent: 'center', marginTop: 14, flexWrap: 'wrap' }}>
          {[15, 25, 45, 60].map(m => (
            <button key={m} onClick={() => setPresetMin(m)} style={{
              width: 38, height: 32, borderRadius: 8, fontSize: 11, fontWeight: 800,
              background: preset === m ? (isBreak ? '#38bdf8' : '#4ade80') : 'rgba(255,255,255,0.08)',
              color: preset === m ? '#0a0e0b' : '#fff', border: 'none', transition: 'all 0.2s'
            }}>{m}m</button>
          ))}
          <button onClick={() => setCustomOpen(true)} style={{
            padding: '0 10px', height: 32, borderRadius: 8, fontSize: 11, fontWeight: 800,
            background: 'rgba(255,255,255,0.12)', color: '#fff', border: 'none'
          }}>Custom</button>
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 20, justifyContent: 'center' }}>
          {!running ? (
            <button onClick={start} style={{ ...primaryBtn(isBreak ? '#38bdf8' : '#4ade80'), flex: 1 }}>▶ Start</button>
          ) : (
            <button onClick={pause} style={{ ...primaryBtn('#fcd34d'), flex: 1 }}>⏸ Pause</button>
          )}
          <button onClick={reset} style={{ ...secondaryBtn(), flex: 1 }}>↺ Reset</button>
        </div>
      </div>
    </div>
  );
};

// ===== Badges modal =====
const BadgesModal = ({ open, onClose, summary, streak }) => {
  if (!open) return null;
  const badges = [
    { name: 'First Fruit',   icon: '🍎', unlocked: summary.doneCount >= 1,  desc: 'Your first task' },
    { name: 'Sapling',       icon: '🌱', unlocked: summary.doneCount >= 3,  desc: '3 tasks done' },
    { name: 'Tree 01 💚',    icon: '🌳', unlocked: summary.doneCount >= 3,  desc: 'Complete Week 01' },
    { name: 'Tree 02 💛',    icon: '🌳', unlocked: summary.doneCount >= 6,  desc: 'Complete Week 02' },
    { name: 'Tree 03 💖',    icon: '🌳', unlocked: summary.doneCount >= 9,  desc: 'Complete Week 03' },
    { name: 'Tree 04 💙',    icon: '🌳', unlocked: summary.doneCount >= 12, desc: 'Complete Week 04' },
    { name: '3-day streak',  icon: '🔥', unlocked: streak >= 3,            desc: '3 days in a row' },
    { name: '7-day streak',  icon: '🔥', unlocked: streak >= 7,            desc: 'A full week!' },
    { name: 'A9 Mode',       icon: '🏆', unlocked: summary.doneCount >= 12, desc: 'All 12 tasks — A9!' },
  ];
  return (
    <div onClick={onClose} style={modalBg()}>
      <div onClick={e => e.stopPropagation()} style={modalCard()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
          <div style={{ fontWeight: 700, color: 'var(--stt-gold)' }}>🏆 Achievements</div>
          <button onClick={onClose} style={closeBtn()}>✕</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {badges.map(b => (
            <div key={b.name} style={{
              padding: 10, borderRadius: 10, textAlign: 'center',
              background: b.unlocked ? 'linear-gradient(135deg, rgba(252,211,77,0.2), rgba(74,222,128,0.15))' : 'rgba(0,0,0,0.3)',
              border: `1px solid ${b.unlocked ? 'rgba(252,211,77,0.45)' : 'rgba(255,255,255,0.06)'}`,
              opacity: b.unlocked ? 1 : 0.45,
              filter: b.unlocked ? 'none' : 'grayscale(1)',
              color: '#ffffff',
            }}>
              <div style={{ fontSize: 24, marginBottom: 4 }}>{b.icon}</div>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#f0fdf4' }}>{b.name}</div>
              <div style={{ fontSize: 9, color: 'rgba(240,253,244,0.72)', marginTop: 2 }}>{b.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ===== Add Task modal =====
const AddTaskModal = ({ open, onClose, onAdd }) => {
  const [title, setTitle] = React.useState('');
  const [subject, setSubject] = React.useState('sci');
  const [detail, setDetail] = React.useState('');
  const [minutes, setMinutes] = React.useState('30');

  React.useEffect(() => {
    if (open) { setTitle(''); setSubject('sci'); setDetail(''); setMinutes('30'); }
  }, [open]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(subject, title, detail, minutes);
    onClose();
  };

  return (
    <div onClick={onClose} style={modalBg()}>
      <div onClick={e => e.stopPropagation()} style={modalCard()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: '#4ade80', fontFamily: 'var(--stt-font-sinhala)' }}>✨ අලුත් Task එකක්</div>
          <button onClick={onClose} style={closeBtn()}>✕</button>
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={{ fontSize: 11, color: 'rgba(240,253,244,0.7)', marginBottom: 6, display: 'block', fontFamily: 'var(--stt-font-sinhala)' }}>Task එකේ නම (උදා: Bio Past Paper)</label>
            <input autoFocus value={title} onChange={e => setTitle(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', borderRadius: 8, background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(74,222,128,0.25)', color: '#fff', fontSize: 13, outline: 'none' }}
            />
          </div>
          <div>
            <label style={{ fontSize: 11, color: 'rgba(240,253,244,0.7)', marginBottom: 6, display: 'block', fontFamily: 'var(--stt-font-sinhala)' }}>විෂය (Subject)</label>
            <select value={subject} onChange={e => setSubject(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', borderRadius: 8, background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(74,222,128,0.25)', color: '#fff', fontSize: 13, outline: 'none' }}
            >
              <option value="sci">විද්‍යාව (Science)</option>
              <option value="math">ගණිතය (Maths)</option>
              <option value="sin">සිංහල (Sinhala)</option>
              <option value="eng">ඉංග්‍රීසි (English)</option>
              <option value="his">ඉතිහාසය (History)</option>
              <option value="rel">ආගම (Religion)</option>
              <option value="cat1">Group 1 (Citizen/Geo/Comm)</option>
              <option value="cat2">Group 2 (Art/Music/Dance/Lit)</option>
              <option value="cat3">Group 3 (ICT/Agri/Home/Media)</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: 11, color: 'rgba(240,253,244,0.7)', marginBottom: 6, display: 'block', fontFamily: 'var(--stt-font-sinhala)' }}>විස්තරයක් (අත්‍යවශ්‍ය නැත)</label>
            <textarea value={detail} onChange={e => setDetail(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', borderRadius: 8, background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(74,222,128,0.25)', color: '#fff', fontSize: 12, minHeight: 60, resize: 'vertical', outline: 'none', fontFamily: 'var(--stt-font-sinhala)' }}
            />
          </div>
          <div>
            <label style={{ fontSize: 11, color: 'rgba(240,253,244,0.7)', marginBottom: 6, display: 'block', fontFamily: 'var(--stt-font-sinhala)' }}>ගතවන කාලය (විනාඩි)</label>
            <input type="number" value={minutes} onChange={e => setMinutes(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', borderRadius: 8, background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(74,222,128,0.25)', color: '#fff', fontSize: 13, outline: 'none' }}
            />
          </div>
          <button type="submit" disabled={!title.trim()} style={{ ...primaryBtn(), marginTop: 8, opacity: title.trim() ? 1 : 0.5, fontFamily: 'var(--stt-font-sinhala)' }}>
            එකතු කරන්න
          </button>
        </form>
      </div>
    </div>
  );
};


// Common modal styles
const modalBg = () => ({
  position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.75)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  zIndex: 100, padding: 16, animation: 'sttFadeIn .2s',
  backdropFilter: 'blur(8px)',
});
const modalCard = () => ({
  background: 'linear-gradient(180deg, #0f1f14, #050a06)',
  borderRadius: 16, padding: 16, width: '100%', maxWidth: 320,
  border: '1px solid rgba(74,222,128,0.25)',
  boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(74,222,128,0.1)',
});
const closeBtn = () => ({
  width: 24, height: 24, borderRadius: 6,
  background: 'rgba(255,255,255,0.08)', fontSize: 12, color: 'rgba(240,253,244,0.88)',
});
const primaryBtn = (color = '#4ade80') => ({
  padding: '9px 18px', borderRadius: 9, fontWeight: 700, fontSize: 12,
  background: color, color: '#0a0e0b',
});
const secondaryBtn = () => ({
  padding: '9px 18px', borderRadius: 9, fontWeight: 600, fontSize: 12,
  background: 'rgba(255,255,255,0.08)', color: 'rgba(240,253,244,0.88)',
});

// ===== Confirmation modal =====
const ConfirmModal = ({ open, onClose, onConfirm, title, message, cancelText, confirmText, confirmColor }) => {
  if (!open) return null;
  const { t } = window.useLang();
  return (
    <div onClick={onClose} style={modalBg()}>
      <div onClick={e => e.stopPropagation()} style={{ ...modalCard(), maxWidth: 280 }}>
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>❓</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: '#ffffff', marginBottom: 8, fontFamily: 'var(--stt-font-sinhala)' }}>
            {title || 'පණිවිඩයක්'}
          </div>
          <div style={{ fontSize: 13, color: 'rgba(240,253,244,0.85)', lineHeight: 1.5, fontFamily: 'var(--stt-font-sinhala)' }}>
            {message}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={onClose} style={{ ...secondaryBtn(), flex: 1, height: 42, fontSize: 13, fontFamily: 'var(--stt-font-sinhala)', fontWeight: 800 }}>
            {cancelText || 'ආපසු'}
          </button>
          {onConfirm && (
            <button onClick={() => { onConfirm(); onClose(); }} style={{ ...primaryBtn(confirmColor || '#4ade80'), flex: 1, height: 42, fontSize: 13, fontFamily: 'var(--stt-font-sinhala)', fontWeight: 800 }}>
              {confirmText || 'තහවුරු කරන්න'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// ===== Avatar selection modal =====
const AvatarModal = ({ open, onClose, onSelect }) => {
  if (!open) return null;
  const { t } = window.useLang();
  
  const premiums = [
    { img: 'avatars1.png', pos: '0% 0%', size: '200% auto' },
    { img: 'avatars1.png', pos: '100% 0%', size: '200% auto' },
    { img: 'avatars1.png', pos: '0% 100%', size: '200% auto' },
    { img: 'avatars1.png', pos: '100% 100%', size: '200% auto' },
    { img: 'avatars2.png', pos: '0% 50%', size: '400% auto' },
    { img: 'avatars2.png', pos: '33.3% 50%', size: '400% auto' },
    { img: 'avatars2.png', pos: '66.6% 50%', size: '400% auto' },
    { img: 'avatars2.png', pos: '100% 50%', size: '400% auto' },
  ];
  const emojis = ['🦁', '🦉', '🦊', '🐼', '🐯', '🌳', '🚀', '⭐', '🍀', '🍎'];
  
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      onSelect(ev.target.result);
      onClose();
    };
    reader.readAsDataURL(file);
  };

  return (
    <div onClick={onClose} style={modalBg()}>
      <div onClick={e => e.stopPropagation()} style={{ ...modalCard(), maxWidth: 340, maxHeight: '80vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: '#4ade80', fontFamily: 'var(--stt-font-sinhala)' }}>{t('my_profile')}</div>
          <button onClick={onClose} style={closeBtn()}>✕</button>
        </div>
        
        <div style={{ fontSize: 11, fontWeight: 800, color: 'rgba(255,255,255,0.4)', marginBottom: 12, letterSpacing: 1 }}>PREMIUM 3D AVATARS</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 24 }}>
          {premiums.map((p, i) => (
            <button key={i} onClick={() => { onSelect(`PREMIUM:${JSON.stringify(p)}`); onClose(); }} style={{
              width: 65, height: 65, borderRadius: 16, background: '#000',
              border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden', cursor: 'pointer', padding: 0
            }}>
              <div style={{
                width: '100%', height: '100%', 
                backgroundImage: `url(${p.img})`, backgroundPosition: p.pos, backgroundSize: p.size, backgroundRepeat: 'no-repeat'
              }} />
            </button>
          ))}
        </div>

        <div style={{ fontSize: 11, fontWeight: 800, color: 'rgba(255,255,255,0.4)', marginBottom: 12, letterSpacing: 1 }}>CLASSIC EMOJIS</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 24 }}>
          {emojis.map(a => (
            <button key={a} onClick={() => { onSelect(a); onClose(); }} style={{
              width: 50, height: 50, borderRadius: 12, background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)', fontSize: 28, display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer'
            }}>
              {a}
            </button>
          ))}
        </div>

        <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', marginBottom: 20 }} />

        <div style={{ textAlign: 'center' }}>
          <label style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 12,
            background: 'rgba(74,222,128,0.15)', border: '1.5px dashed #4ade80', color: '#4ade80',
            fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--stt-font-sinhala)'
          }}>
            <span>📷</span> Custom Photo Upload
            <input type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
          </label>
        </div>
      </div>
    </div>
  );
};

window.STT_TASKS = { TaskRow, PomodoroModal, BadgesModal, AddTaskModal, ConfirmModal, AvatarModal };
