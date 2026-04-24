// Variation B: "Notebook" — light paper look, hand-drawn vibe
const SttAppNotebook = () => {
  const S = useSttState();
  const { data, done, streak, activeWeek, summary } = S;
  const { toggleDone, setActiveWeek } = S;

  const week = data.weeks.find(w => w.id === activeWeek) || data.weeks[0];
  const subjById = Object.fromEntries(data.subjects.map(s => [s.id, s]));
  const weekProgress = (w) => w.tasks.filter(t => done[t.id]).length;

  return (
    <div style={{
      width: '100%', height: '100%', overflow: 'hidden',
      background: `
        repeating-linear-gradient(0deg, transparent, transparent 23px, rgba(74,108,180,0.2) 24px),
        #fefcf6
      `,
      color: '#2c2416',
      fontFamily: '"Caveat", "Kalam", cursive, Noto Sans Sinhala',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Red margin line */}
      <div style={{ position: 'absolute', left: 40, top: 0, bottom: 0, width: 1, background: 'rgba(220,38,38,0.35)', zIndex: 1 }}/>

      <div className="stt-scroll" style={{ flex: 1, overflowY: 'auto', padding: '14px 14px 14px 52px', position: 'relative', zIndex: 2 }}>
        {/* Doodle header */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: '#166534', fontFamily: '"Caveat", cursive', transform: 'rotate(-1deg)' }}>
            🌳 Super Three Tree Plan
          </div>
          <div style={{ fontSize: 13, color: '#78350f', fontFamily: '"Noto Sans Sinhala", serif', marginTop: 2 }}>
            CK sir එක්ක A9 journey ~ January
          </div>
          <svg width="200" height="10" style={{ marginTop: 4 }}>
            <path d="M 0 5 Q 30 0, 60 5 T 120 5 T 200 5" stroke="#dc2626" strokeWidth="2" fill="none" opacity="0.6"/>
          </svg>
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 14, fontSize: 13, fontFamily: '"Caveat", cursive' }}>
          <div style={stickerStyle('#fde047')}>📅 {data.student.examDaysLeft} days</div>
          <div style={stickerStyle('#86efac')}>🔥 {streak.count} day streak</div>
          <div style={stickerStyle('#fca5a5')}>{summary.percent}% done</div>
        </div>

        {/* Week tabs */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
          {data.weeks.map(w => (
            <button key={w.id} onClick={() => setActiveWeek(w.id)} style={{
              padding: '6px 10px', borderRadius: 8,
              background: w.id === activeWeek ? '#166534' : 'transparent',
              color: w.id === activeWeek ? '#fefcf6' : '#166534',
              border: '2px solid #166534',
              fontSize: 14, fontFamily: '"Caveat", cursive', fontWeight: 700,
              transform: `rotate(${(w.id % 2 === 0 ? -1 : 1)}deg)`,
            }}>
              W{w.id} · {weekProgress(w)}/3
            </button>
          ))}
        </div>

        {/* Trees doodle row */}
        <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: 16 }}>
          {data.weeks.map(w => (
            <div key={w.id} style={{ textAlign: 'center' }}>
              <TreeSVG progress={weekProgress(w)} color={w.color} size={64} glow={false}/>
              <div style={{ fontSize: 12, fontFamily: '"Caveat", cursive', color: '#78350f', fontWeight: 700 }}>{w.tree}</div>
            </div>
          ))}
        </div>

        {/* Week title */}
        <div style={{
          padding: '8px 12px', marginBottom: 10, borderRadius: 8,
          background: `${week.color}25`, border: `2px dashed ${week.color}99`,
          transform: 'rotate(-0.5deg)',
        }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#14532d', fontFamily: '"Caveat", cursive' }}>{week.title}</div>
          <div style={{ fontSize: 13, color: '#78350f', fontFamily: '"Noto Sans Sinhala", serif', marginTop: 2 }}>{week.subtitle}</div>
        </div>

        {/* Task checklist */}
        {week.tasks.map(t => {
          const subj = subjById[t.subject];
          const isDone = !!done[t.id];
          return (
            <div key={t.id} onClick={() => toggleDone(t.id)} style={{
              display: 'flex', alignItems: 'flex-start', gap: 10,
              padding: '10px 4px', cursor: 'pointer',
              borderBottom: '1px dashed rgba(0,0,0,0.1)',
            }}>
              <div style={{
                width: 22, height: 22, border: '2.5px solid #14532d', borderRadius: 4,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: isDone ? '#14532d' : 'transparent',
                color: '#fde047', fontWeight: 900, fontSize: 14,
                flexShrink: 0, marginTop: 2,
                transform: `rotate(${isDone ? -3 : 0}deg)`,
              }}>
                {isDone && '✓'}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: 14, fontFamily: '"Noto Sans Sinhala", serif',
                  color: isDone ? '#78350f' : '#2c2416',
                  textDecoration: isDone ? 'line-through' : 'none', lineHeight: 1.4,
                }}>
                  <span style={{
                    display: 'inline-block', padding: '1px 6px', marginRight: 6,
                    background: subj.color + '40', color: '#14532d',
                    fontSize: 11, borderRadius: 4, fontFamily: '"Caveat", cursive', fontWeight: 700,
                  }}>{subj.label}</span>
                  {t.title}
                </div>
                <div style={{ fontSize: 12, color: '#78350f', marginTop: 2, fontFamily: '"Noto Sans Sinhala", serif' }}>
                  ~ {t.minutes} min
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
const stickerStyle = (bg) => ({
  padding: '4px 10px', background: bg, borderRadius: 6,
  border: '1.5px solid rgba(0,0,0,0.15)', fontWeight: 700,
  transform: `rotate(${Math.random() * 3 - 1.5}deg)`,
});

// Variation C: "Minimal Dark" — Linear/Notion vibe, no emojis, heavy typography
const SttAppMinimal = () => {
  const S = useSttState();
  const { data, done, streak, activeWeek, summary } = S;
  const { toggleDone, setActiveWeek } = S;
  const week = data.weeks.find(w => w.id === activeWeek) || data.weeks[0];
  const subjById = Object.fromEntries(data.subjects.map(s => [s.id, s]));
  const weekProgress = (w) => w.tasks.filter(t => done[t.id]).length;

  return (
    <div style={{
      width: '100%', height: '100%', background: '#0a0a0b',
      color: '#e6e6e8', fontFamily: '"Inter", system-ui, sans-serif',
      display: 'flex', flexDirection: 'column', overflow: 'hidden',
    }}>
      <div className="stt-scroll" style={{ flex: 1, overflowY: 'auto', padding: '16px 14px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 9, letterSpacing: 2, color: '#6b7280', fontWeight: 600 }}>STT PLAN</div>
            <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: -0.3 }}>Three Tree, January</div>
          </div>
          <div style={{
            fontSize: 10, padding: '4px 8px', borderRadius: 999,
            background: 'rgba(34,197,94,0.1)', color: '#22c55e',
            border: '1px solid rgba(34,197,94,0.3)',
          }}>{summary.doneCount}/{summary.totalCount}</div>
        </div>

        {/* Big progress bar */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#6b7280', marginBottom: 6 }}>
            <span>Month progress</span>
            <span>{summary.percent}%</span>
          </div>
          <div style={{ height: 6, background: '#1f2023', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{
              width: `${summary.percent}%`, height: '100%',
              background: 'linear-gradient(90deg, #22c55e, #86efac)',
              transition: 'width .4s ease',
            }}/>
          </div>
        </div>

        {/* Stats grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 16 }}>
          {[
            { label: 'Days left', value: data.student.examDaysLeft, color: '#e6e6e8' },
            { label: 'Streak', value: streak.count, color: '#fb923c' },
            { label: 'Weeks', value: data.student.totalWeeksLeft, color: '#60a5fa' },
          ].map(s => (
            <div key={s.label} style={{
              padding: '10px 12px', borderRadius: 10,
              background: '#131316', border: '1px solid #1f2023',
            }}>
              <div style={{ fontSize: 9, color: '#6b7280', letterSpacing: 0.5, marginBottom: 2, textTransform: 'uppercase' }}>{s.label}</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: s.color, letterSpacing: -0.5 }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Week row with tiny trees */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 16 }}>
          {data.weeks.map(w => {
            const p = weekProgress(w);
            const active = w.id === activeWeek;
            return (
              <button key={w.id} onClick={() => setActiveWeek(w.id)} style={{
                padding: 8, borderRadius: 10,
                background: active ? '#1a2a1a' : '#131316',
                border: `1px solid ${active ? '#22c55e55' : '#1f2023'}`,
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                transition: 'all .15s',
              }}>
                <TreeSVG progress={p} color={w.color} size={40} glow={false}/>
                <div style={{ fontSize: 9, color: active ? '#22c55e' : '#6b7280', fontWeight: 600 }}>W0{w.id}</div>
                <div style={{ fontSize: 8, color: '#4b5563' }}>{p}/3</div>
              </button>
            );
          })}
        </div>

        {/* Week label */}
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 9, color: week.color, letterSpacing: 2, fontWeight: 600 }}>{week.tree}</div>
          <div style={{ fontSize: 14, fontWeight: 700, fontFamily: '"Inter", "Noto Sans Sinhala"', marginTop: 2 }}>{week.title}</div>
        </div>

        {/* Tasks */}
        {week.tasks.map(t => {
          const subj = subjById[t.subject];
          const isDone = !!done[t.id];
          return (
            <div key={t.id} onClick={() => toggleDone(t.id)} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 12px', marginBottom: 6,
              background: isDone ? '#0f1410' : '#131316',
              border: `1px solid ${isDone ? '#22c55e30' : '#1f2023'}`,
              borderRadius: 10, cursor: 'pointer',
              transition: 'all .15s',
            }}>
              <div style={{
                width: 16, height: 16, borderRadius: 4, flexShrink: 0,
                border: `1.5px solid ${isDone ? '#22c55e' : '#3f3f46'}`,
                background: isDone ? '#22c55e' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, color: '#0a0a0b', fontWeight: 900,
              }}>{isDone && '✓'}</div>
              <div style={{ width: 3, height: 24, background: subj.color, borderRadius: 2, flexShrink: 0 }}/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: 12, fontFamily: '"Inter", "Noto Sans Sinhala"',
                  color: isDone ? '#6b7280' : '#e6e6e8',
                  textDecoration: isDone ? 'line-through' : 'none', lineHeight: 1.35,
                }}>{t.title}</div>
                <div style={{ fontSize: 10, color: '#6b7280', marginTop: 1, fontFamily: '"Noto Sans Sinhala"' }}>
                  {subj.label} · {t.minutes}m
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

window.SttAppNotebook = SttAppNotebook;
window.SttAppMinimal = SttAppMinimal;
