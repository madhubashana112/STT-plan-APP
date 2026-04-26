// ── Branch color palette (matches reference: Green / Teal / Pink) ──
const BRANCH_COLORS = { b1: '#4ade80', b2: '#38bdf8', b3: '#fcd34d', b4: '#f472b6' };
const BRANCH_DARK = { b1: '#166534', b2: '#0369a1', b3: '#b45309', b4: '#be185d' };

// ── Constants & Helpers ──
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const targetsByWeek = { 1: 13, 2: 26, 3: 39, 4: 52 };

const getStageName = (weekId, t) => {
  const s = ((weekId - 1) % 4) + 1;
  if (s === 1) return t('tiny_seedling');
  if (s === 2) return t('small_tree');
  if (s === 3) return t('young_tree');
  return t('full_tree');
};

function StageIcon({ stage, size = 16, color }) {
  const s = ((stage - 1) % 4) + 1;
  // Stages: 1: Seedling, 2: Small Tree, 3: Young Tree, 4: Full Tree
  const icons = { 1: '🌱', 2: '🌿', 3: '🌳', 4: '🌲' };
  return <span style={{ fontSize: size, color, display: 'inline-block' }}>{icons[s] || '🌱'}</span>;
}

const StarBg = () => (
  <div style={{
    position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden',
    background: 'linear-gradient(180deg, #050a06 0%, #0a140c 40%, #050a06 100%)',
  }} />
);

const UserAvatar = ({ photo, name, size = 32, fontSize = 11, border = 'none', shadow = 'none' }) => {
  if (photo && photo.startsWith('PREMIUM:')) {
    try {
      const p = JSON.parse(photo.replace('PREMIUM:', ''));
      return (
        <div style={{
          width: size, height: size, borderRadius: '50%',
          backgroundImage: `url(${p.img})`, backgroundPosition: p.pos, backgroundSize: p.size, backgroundRepeat: 'no-repeat',
          border, boxShadow: shadow, overflow: 'hidden', backgroundOrigin: 'border-box'
        }} />
      );
    } catch (e) { return <div style={{ width: size, height: size, background: '#333', borderRadius: '50%' }} />; }
  }
  const isImage = photo && photo.length > 10;
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: isImage ? `url(${photo}) center/cover` : 'linear-gradient(135deg, #4ade80, #166534)',
      color: '#0a0e0b', fontWeight: 800, fontSize: photo && !isImage ? size * 0.45 : fontSize,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      border, boxShadow: shadow,
      fontFamily: 'var(--stt-font-sinhala)', textTransform: 'uppercase', overflow: 'hidden'
    }}>
      {!photo || isImage ? (isImage ? '' : (name ? name.slice(0, 2) : 'DD')) : photo}
    </div>
  );
};

const MiniTree = ({ progress = 0, color = '#4ade80', numbered = false }) => {
  const fruits = [
    { cx: 22, cy: 42, r: 9, label: 1 },
    { cx: 46, cy: 30, r: 10, label: 2 },
    { cx: 70, cy: 42, r: 9, label: 3 },
  ];
  return (
    <svg viewBox="0 0 92 92" width="82" height="82" style={{ overflow: 'visible' }}>
      <path d="M 46 84 L 46 52 M 46 60 Q 32 52 22 45 M 46 60 Q 60 52 70 45" stroke="#7c3f15" strokeWidth="3" fill="none" strokeLinecap="round" />
      <ellipse cx="46" cy="86" rx="22" ry="2" fill="#000" opacity="0.4" />
      {fruits.map((f, i) => {
        const isDone = i < progress;
        return (
          <g key={i}>
            {isDone && <circle cx={f.cx} cy={f.cy} r={f.r + 5} fill={color} opacity="0.25" />}
            <circle cx={f.cx} cy={f.cy} r={f.r} fill={isDone ? color : 'transparent'} stroke={isDone ? color : 'rgba(255,255,255,0.25)'} strokeWidth="1.5" strokeDasharray={isDone ? 'none' : '2,2'} style={{ filter: isDone ? `drop-shadow(0 0 5px ${color})` : 'none' }} />
            {isDone && numbered && <text x={f.cx} y={f.cy + 3.5} textAnchor="middle" fontSize="10" fontWeight="800" fill="#0a0e0b">{f.label}</text>}
            {isDone && <circle cx={f.cx - f.r / 3} cy={f.cy - f.r / 3} r={f.r / 3.5} fill="#fff" opacity="0.4" />}
          </g>
        );
      })}
    </svg>
  );
};

const TodayLeafMap = ({ activeWeek, hours, t, lang, setInfoOpen, season, theme }) => {
  const weekTarget = 7; // simplified for now or pass as prop
  const branchTarget = Math.ceil(weekTarget / 4);
  const stageName = getStageName(activeWeek, t);

  return (
    <div style={{
      background: 'linear-gradient(180deg, rgba(16,32,20,0.9), rgba(8,20,12,0.95))',
      border: '1px solid rgba(74,222,128,0.25)', borderRadius: 22, padding: '14px 14px 20px',
      boxShadow: '0 8px 28px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 10, fontWeight: 800, color: '#4ade80', background: 'rgba(74,222,128,0.18)', padding: '3px 9px', borderRadius: 999, fontFamily: 'var(--stt-font-sinhala)' }}>{t('today')}</span>
          <span style={{ fontSize: 10.5, color: '#ffffff', fontWeight: 600 }}>· {new Date().toLocaleDateString(lang === 'si' ? 'si-LK' : (lang === 'ta' ? 'ta-LK' : 'en-GB'), { day: 'numeric', month: 'long', year: 'numeric' })}</span>
        </div>
        <button onClick={() => setInfoOpen(true)} style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(74,222,128,0.2)', border: '1px solid rgba(74,222,128,0.45)', color: '#86efac', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>i</button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '8px 0 6px' }}>
        <TreeSVG
          branches={[
            { color: BRANCH_COLORS.b1, colorDark: BRANCH_DARK.b1, currentHrs: (hours || {}).b1, targetHrs: branchTarget },
            { color: BRANCH_COLORS.b2, colorDark: BRANCH_DARK.b2, currentHrs: (hours || {}).b2, targetHrs: branchTarget },
            { color: BRANCH_COLORS.b3, colorDark: BRANCH_DARK.b3, currentHrs: (hours || {}).b3, targetHrs: branchTarget },
            { color: BRANCH_COLORS.b4, colorDark: BRANCH_DARK.b4, currentHrs: (hours || {}).b4, targetHrs: branchTarget },
          ]}
          size={Math.min(window.innerWidth * 0.65, 240)} glow={true} week={activeWeek}
          season={season} theme={theme}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: -8, marginBottom: 8 }}>
        <div style={{ background: 'rgba(5,10,6,0.9)', border: '1px solid rgba(74,222,128,0.4)', padding: '5px 14px', borderRadius: 999, fontSize: 11, fontWeight: 700, color: '#ffffff', display: 'flex', alignItems: 'center', gap: 6, boxShadow: '0 2px 10px rgba(0,0,0,0.4)' }}>
          <StageIcon stage={activeWeek} size={16} color="#4ade80" />
          {stageName}
        </div>
      </div>
    </div>
  );
};

const MonthTab = ({ m, activeMonth, setActiveMonth, userStartMonth, hoursMap, setActiveWeek, setConfirmData, t }) => {
  const active = activeMonth === m;
  let locked = false;
  if (m > userStartMonth) {
    const lastWeekOfPrevMonth = (m - 1) * 4;
    const prevH = hoursMap[lastWeekOfPrevMonth] || {};
    const totalPrev = Number(prevH.b1 || 0) + Number(prevH.b2 || 0) + Number(prevH.b3 || 0) + Number(prevH.b4 || 0);
    if (totalPrev < 7) locked = true;
  }
  return (
    <button
      onClick={() => {
        if (locked) {
          setConfirmData({ title: '🔒 Month Locked!', message: t('unlock_msg_month'), onConfirm: () => { } });
          return;
        }
        setActiveMonth(m);
        setActiveWeek((m - 1) * 4 + 1);
      }}
      style={{
        flex: 1, padding: '10px 4px', borderRadius: 12,
        background: active ? 'linear-gradient(135deg, #4ade80, #166534)' : 'rgba(30,45,35,0.6)',
        border: active ? '1.5px solid #4ade80' : '1px solid rgba(134,239,172,0.2)',
        color: active ? '#0a0e0b' : '#ffffff', fontSize: 11, fontWeight: 800, cursor: locked ? 'default' : 'pointer',
        opacity: locked ? 0.6 : 1, transition: 'all .2s'
      }}
    >
      {locked ? '🔒' : MONTH_NAMES[m - 1]}
    </button>
  );
};

const WeekTab = ({ w, activeWeek, setActiveWeek, hoursMap, userStartWeek, data, t, setConfirmData }) => {
  const active = w.id === activeWeek;
  const stageName = getStageName(w.id, t);
  let locked = false;
  if (w.id > userStartWeek) {
    const prevW = w.id - 1;
    const prevH = hoursMap[prevW] || {};
    const totalPrev = Number(prevH.b1 || 0) + Number(prevH.b2 || 0) + Number(prevH.b3 || 0) + Number(prevH.b4 || 0);
    const prevWeekData = data.weeks.find(x => x.id === prevW);
    const prevTarget = prevWeekData ? prevWeekData.targetHrs : 7;
    if (totalPrev < prevTarget) locked = true;
  }
  return (
    <button
      onClick={() => {
        if (locked) {
          setConfirmData({ title: `🔒 ${t('week')} ${t('locked')}`, message: t('unlock_msg_week'), onConfirm: null, cancelText: t('ok') });
          return;
        }
        setActiveWeek(w.id);
      }}
      style={{
        flex: 1, padding: '8px 4px 7px', borderRadius: 12,
        background: active ? `linear-gradient(180deg, ${w.color}40, ${w.color}15)` : 'rgba(30,45,35,0.6)',
        border: active ? `2px solid ${w.color}` : '1.5px solid rgba(134,239,172,0.22)',
        boxShadow: active ? `0 0 20px ${w.color}55, inset 0 1px 0 rgba(255,255,255,0.1)` : 'none',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
        transition: 'all .18s', opacity: locked ? 0.6 : 1, cursor: locked ? 'default' : 'pointer', position: 'relative'
      }}
    >
      {locked ? <div style={{ fontSize: 16, marginBottom: 2 }}>🔒</div> : <StageIcon stage={w.id} size={22} color={active ? w.color : '#86efac'} />}
      <div style={{ marginTop: 2, textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 1 }}>
        <div style={{ fontSize: 8, color: active ? '#fff' : '#86efac', fontWeight: 900, opacity: 0.7, textTransform: 'uppercase', letterSpacing: 0.5 }}>{t('week')} {w.id.toString().padStart(2, '0')}</div>
        <div style={{ fontSize: 10, color: '#ffffff', fontWeight: 700, lineHeight: 1.1 }}>{locked ? 'Locked' : stageName}</div>
      </div>
    </button>
  );
};

const StatCard = ({ label, value, icon, color, unit }) => (
  <div style={{
    flex: 1, padding: '12px 12px', background: `linear-gradient(180deg, ${color}35, ${color}12)`,
    border: `1.5px solid ${color}`, borderRadius: 14, boxShadow: `inset 0 1px 0 rgba(255,255,255,0.1), 0 2px 10px ${color}25`,
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 5 }}>
      <span style={{ fontSize: 11, color: '#ffffff', fontFamily: 'var(--stt-font-sinhala)', fontWeight: 700 }}>{label}</span>
      <span style={{ fontSize: 13 }}>{icon}</span>
    </div>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
      <span style={{ fontSize: 22, fontWeight: 900, color: '#ffffff', fontFamily: 'Inter', textShadow: `0 0 10px ${color}80` }}>{value}</span>
      {unit && <span style={{ fontSize: 11, color: '#ffffff', fontFamily: 'var(--stt-font-sinhala)', fontWeight: 600 }}>{unit}</span>}
    </div>
  </div>
);

const BranchCounters = ({ hours, week, t, bumpHour }) => {
  const weekTarget = week.targetHrs || 7;
  const branchTarget = Math.ceil(weekTarget / 4);
  const cards = [
    { key: 'b1', label: 'නව කොටසක් පාඩම් කිරීම', label2: 'කියවීම/Recording/class', color: BRANCH_COLORS.b1 },
    { key: 'b2', label: 'පොත වසා කරුණු මතකයෙන් ආවර්ජනය කිරීම', label2: '(Active Recall)', color: BRANCH_COLORS.b2 },
    { key: 'b3', label: 'එම කොටසට අදාළව ප්‍රශ්න කිරීම / බහුවරණ ගැටලු විසඳීම', label2: '(Practice Testing)', color: BRANCH_COLORS.b3 },
    { key: 'b4', label: 'පෙර සතිවල ඉගෙන ගත් දේවල් නැවත මතක් කිරීම', label2: '(Spaced Repetition)', color: BRANCH_COLORS.b4 },
  ];
  
  return (
    <div className="stt-branch-grid">
      {cards.map(c => {
        const h = Number((hours || {})[c.key] || 0);
        const pct = Math.min(100, (h / branchTarget) * 100);
        return (
          <div key={c.key} style={{
            background: 'linear-gradient(180deg, rgba(20,36,26,0.95), rgba(12,24,16,0.9))',
            border: `1.5px solid ${c.color}55`, borderRadius: 14, padding: '10px 6px 8px',
            boxShadow: `0 2px 12px ${c.color}20, inset 0 1px 0 rgba(255,255,255,0.06)`,
            display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', overflow: 'hidden',
            minHeight: 125
          }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: c.color, boxShadow: `0 0 8px ${c.color}`, marginBottom: 6 }} />
            <div style={{ 
              textAlign: 'center', fontSize: 10, color: '#ffffff', fontWeight: 600, lineHeight: 1.3,
              flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 4px'
            }}>
              <div>{c.label}</div>
              <div style={{ opacity: 0.7, fontSize: 8.5, marginTop: 3 }}>{c.label2}</div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6, marginTop: 8 }}>
              <button onClick={() => bumpHour(c.key, -1)} style={{ width: 26, height: 26, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', color: '#ffffff', fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>−</button>
              <div style={{ fontSize: 18, fontWeight: 900, color: c.color, fontFamily: 'Inter', minWidth: 32, textAlign: 'center', textShadow: `0 0 8px ${c.color}80` }}>{h}h</div>
              <button onClick={() => bumpHour(c.key, 1)} style={{ width: 26, height: 26, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', color: '#ffffff', fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>+</button>
            </div>
            <div style={{ width: '90%', height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
              <div style={{ width: `${pct}%`, height: '100%', background: c.color, boxShadow: `0 0 6px ${c.color}`, transition: 'width 400ms ease' }} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

const StudyAnalytics = ({ hours, summary, t, activeWeek = 1, hoursMap = {} }) => {
  const maxH = Math.max(1, hours.b1 || 0, hours.b2 || 0, hours.b3 || 0, hours.b4 || 0, 10);
  
  const currentWeekHours = (hours.b1 || 0) + (hours.b2 || 0) + (hours.b3 || 0) + (hours.b4 || 0);
  const weeklyTarget = 28; // 7h * 4 branches
  const weeklyPct = Math.min(100, Math.round((currentWeekHours / weeklyTarget) * 100));

  const currentMonth = Math.floor((activeWeek - 1) / 4); // 0-based
  const startWeek = currentMonth * 4 + 1;
  let currentMonthHours = 0;
  for (let i = startWeek; i <= startWeek + 3; i++) {
    const h = hoursMap[i] || {};
    currentMonthHours += (h.b1 || 0) + (h.b2 || 0) + (h.b3 || 0) + (h.b4 || 0);
  }
  const monthlyTarget = 28 * 4;
  const monthlyPct = Math.min(100, Math.round((currentMonthHours / monthlyTarget) * 100));

  return (
    <div style={{ padding: '0 16px 30px', display: 'flex', flexDirection: 'column', gap: 20 }}>
      <section>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(240,253,244,0.7)', marginBottom: 12, fontFamily: 'var(--stt-font-sinhala)' }}>{t('study_analytics')}</div>
        <div style={{ background: 'rgba(16,32,20,0.6)', borderRadius: 20, padding: '20px 16px 20px', border: '1px solid rgba(74,222,128,0.15)' }}>
          
          {/* Bar Chart (Branch Breakdown) */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 110, marginBottom: 24 }}>
            {[
              { id: 'b1', label: t('class_short'), color: BRANCH_COLORS.b1, val: hours.b1 || 0 },
              { id: 'b2', label: t('study_short'), color: BRANCH_COLORS.b2, val: hours.b2 || 0 },
              { id: 'b3', label: t('prac_short'), color: BRANCH_COLORS.b3, val: hours.b3 || 0 },
              { id: 'b4', label: t('rev_short'), color: BRANCH_COLORS.b4, val: hours.b4 || 0 },
            ].map(b => (
              <div key={b.id} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <div style={{ fontSize: 12, color: '#fff', fontWeight: 900 }}>{b.val}h</div>
                <div style={{ width: '100%', maxWidth: 40, height: Math.max(6, (b.val / maxH) * 80), background: `linear-gradient(180deg, ${b.color}, ${b.color}40)`, borderRadius: '10px 10px 6px 6px', position: 'relative', overflow: 'hidden' }} />
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.5 }}>{b.label}</div>
              </div>
            ))}
          </div>

          {/* Donut Charts */}
          <div style={{ display: 'flex', gap: 12, borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 20 }}>
            {[
              { id: 'weekly', pct: weeklyPct, color: '#4ade80', label: t('weekly_trend'), subLabel: `${t('week')} ${activeWeek}` },
              { id: 'monthly', pct: monthlyPct, color: '#60a5fa', label: `${t('month')} ${currentMonth + 1}`, subLabel: 'Progress' }
            ].map(d => {
              const r = 32;
              const c = 2 * Math.PI * r;
              const offset = c - (d.pct / 100) * c;
              return (
                <div key={d.id} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(0,0,0,0.2)', padding: '16px 8px', borderRadius: 16, border: `1px solid ${d.color}30` }}>
                  <div style={{ position: 'relative', width: 80, height: 80, marginBottom: 8 }}>
                    <svg width="80" height="80" style={{ transform: 'rotate(-90deg)' }}>
                      <circle cx="40" cy="40" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                      <circle cx="40" cy="40" r={r} fill="none" stroke={d.color} strokeWidth="8" strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1s ease', filter: `drop-shadow(0 0 6px ${d.color}80)` }} />
                    </svg>
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>{d.pct}%</span>
                    </div>
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 800, color: 'rgba(255,255,255,0.9)', textTransform: 'uppercase', letterSpacing: 0.5, textAlign: 'center' }}>{d.label}</div>
                  <div style={{ fontSize: 10, color: d.color, fontWeight: 600, marginTop: 4 }}>{d.subLabel}</div>
                </div>
              );
            })}
          </div>

        </div>
      </section>
    </div>
  );
};

const LoginScreen = ({ onLogin }) => {
  const { lang, setLang, t } = window.useLang();
  const [view, setView] = React.useState('welcome'); // 'welcome' | 'login' | 'register'
  const [superName, setSuperName] = useLocalState('stt.superName', '');
  const [profiles, setProfiles] = useLocalState('stt.profiles', []);
  const allProfiles = [...new Set([...profiles, ...(superName ? [superName] : [])])];
  const [regName, setRegName] = React.useState('');
  const [regGrade, setRegGrade] = React.useState(''); // default empty so they must select
  const [regStartDate, setRegStartDate] = React.useState(() => new Date().toISOString().split('T')[0]);
  const [regTargetDate, setRegTargetDate] = React.useState('');
  const [errorMsg, setErrorMsg] = React.useState('');
  const [deleteConfirm, setDeleteConfirm] = React.useState(null);

  const bgStyle = {
    position: 'absolute', inset: 0, zIndex: 200,
    background: 'radial-gradient(circle at center, #1a4228 0%, #0d2917 100%)',
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    fontFamily: 'var(--stt-font)', overflow: 'hidden'
  };

  const Dots = () => (
    <div style={{ position: 'absolute', inset: 0, opacity: 0.4, pointerEvents: 'none' }}>
      {Array.from({ length: 25 }).map((_, i) => (
        <div key={i} style={{
          position: 'absolute', left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
          width: 4, height: 4, borderRadius: '50%', background: '#86efac',
          boxShadow: '0 0 6px #86efac', opacity: 0.1 + Math.random() * 0.3
        }} />
      ))}
    </div>
  );

  if (view === 'register') {
    return (
      <div style={bgStyle}>
        <Dots />
        <div style={{ fontSize: 16, color: '#facc15', fontWeight: 800, marginBottom: 16, zIndex: 1, textShadow: '0 0 10px rgba(250,204,21,0.5)' }}>{t('register')}</div>

        <div style={{
          width: '90%', maxWidth: 320, background: 'rgba(255,255,255,0.05)',
          border: '1.5px solid rgba(74,222,128,0.25)', borderRadius: 20, padding: 20,
          display: 'flex', flexDirection: 'column', gap: 16, zIndex: 1, boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
        }}>
          {/* Your Super Name */}
          <div>
            <div style={{ fontSize: 11, color: '#a7f3d0', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80' }} />
              {t('super_name')}
            </div>
            <input value={regName} onChange={e => setRegName(e.target.value)} placeholder={t('your_name')} style={{
              width: '100%', boxSizing: 'border-box', padding: '12px 16px', background: 'rgba(255,255,255,0.05)', 
              border: '1px solid rgba(250,204,21,0.4)', borderRadius: 12, color: '#fff', fontSize: 14, 
              outline: 'none', boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.3)', fontFamily: 'Inter'
            }} />
          </div>

          <div style={{ height: 1, background: 'rgba(255,255,255,0.1)' }} />

          {/* Grade */}
          <div>
            <div style={{ fontSize: 11, color: '#a7f3d0', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#a855f7' }} />
              {t('grade')}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {['6', '7', '8', '9', '10', '11'].map(g => (
                <button key={g} onClick={() => setRegGrade(g)} style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: regGrade === g ? 'rgba(74,222,128,0.2)' : 'transparent',
                  border: `1.5px solid ${regGrade === g ? '#4ade80' : 'rgba(255,255,255,0.2)'}`,
                  color: '#fff', fontSize: 13, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
                  cursor: 'pointer'
                }}>
                  {g}
                  {g === '11' && <span style={{ fontSize: 7, marginTop: -2 }}>O/L</span>}
                </button>
              ))}
            </div>
          </div>

          <div style={{ height: 1, background: 'rgba(255,255,255,0.1)' }} />

          {/* Journey starts... */}
          <div>
            <div style={{ fontSize: 11, color: '#a7f3d0', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80' }} />
              {t('journey_starts')}
            </div>
            <input type="date" value={regStartDate} onChange={e => setRegStartDate(e.target.value)} style={{
              width: '100%', boxSizing: 'border-box', padding: '10px 14px', background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', fontSize: 13,
              fontFamily: 'Inter', outline: 'none', colorScheme: 'dark'
            }} />
          </div>

          {/* Target date */}
          <div>
            <div style={{ fontSize: 11, color: '#a7f3d0', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#facc15' }} />
              {t('target_date')}
            </div>
            <input type="date" value={regTargetDate} onChange={e => setRegTargetDate(e.target.value)} style={{
              width: '100%', boxSizing: 'border-box', padding: '10px 14px', background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', fontSize: 13,
              fontFamily: 'Inter', outline: 'none', colorScheme: 'dark'
            }} />
          </div>

          {errorMsg && (
            <div style={{
              background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.4)',
              color: '#fca5a5', padding: '10px 14px', borderRadius: 8, fontSize: 12,
              textAlign: 'center', marginBottom: 8, animation: 'sttFadeIn .2s ease'
            }}>
              ⚠️ {errorMsg}
            </div>
          )}

          <button onClick={() => {
            if (!regName.trim() || !regGrade || !regTargetDate || !regStartDate) {
              setErrorMsg(t('fill_error'));
              return;
            }
            setErrorMsg('');
            const nameToSave = regName.trim();
            setSuperName(nameToSave);
            const newProfiles = [...new Set([...profiles, nameToSave])];
            setProfiles(newProfiles);
            localStorage.setItem('stt.user_' + nameToSave, JSON.stringify({ grade: regGrade, targetDate: regTargetDate, startDate: regStartDate }));
            // Explicitly initialize new user data to 0
            localStorage.setItem('stt.streak_' + nameToSave, JSON.stringify({ count: 0, lastISO: null }));
            localStorage.setItem('stt.done_' + nameToSave, JSON.stringify({}));
            localStorage.setItem('stt.hoursMap_' + nameToSave, JSON.stringify({}));

            const startMonthNum = new Date(regStartDate).getMonth() + 1;
            const startWeekNum = (startMonthNum - 1) * 4 + Math.min(4, Math.ceil(new Date(regStartDate).getDate() / 7));
            localStorage.setItem('stt.activeMonth', JSON.stringify(startMonthNum));
            localStorage.setItem('stt.activeWeek_' + nameToSave, JSON.stringify(startWeekNum));
            localStorage.setItem('stt.justRegistered', 'true');
            onLogin();
          }} style={{
            width: '100%', padding: '14px 0', borderRadius: 999, marginTop: 8,
            background: 'linear-gradient(180deg, #facc15, #f59e0b)',
            color: '#1c1917', fontSize: 16, fontWeight: 800,
            boxShadow: '0 4px 20px rgba(245,158,11,0.5)',
            border: 'none', cursor: 'pointer'
          }}>
            {t('register')}
          </button>
        </div>

        <button onClick={() => setView('welcome')} style={{
          width: '90%', maxWidth: 320, padding: '12px 0', borderRadius: 999, marginTop: 16,
          background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)',
          color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer', zIndex: 1
        }}>
          {t('back')}
        </button>
      </div>
    );
  }

  if (view === 'login') {
    return (
      <>
        <div style={bgStyle}>
          <Dots />
          <div style={{ fontSize: 16, color: '#facc15', fontWeight: 800, marginBottom: 16, zIndex: 1, textShadow: '0 0 10px rgba(250,204,21,0.5)' }}>{t('login')}</div>

          <div style={{
            width: '90%', maxWidth: 320, background: 'rgba(255,255,255,0.05)',
            border: '1.5px solid rgba(74,222,128,0.25)', borderRadius: 20, padding: 20,
            display: 'flex', flexDirection: 'column', gap: 16, zIndex: 1, boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
          }}>
            <div style={{ fontSize: 12, color: '#a7f3d0', fontWeight: 600 }}>
              {allProfiles.length > 0 ? t('tap_profile') : t('no_profiles')}
            </div>

            {allProfiles.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {allProfiles.map(p => {
                  let pGrade = '11';
                  let pTarget = "අප් '26 → ඔක් '27";
                  try {
                    const savedStr = localStorage.getItem('stt.user_' + p);
                    if (savedStr) {
                      const parsed = JSON.parse(savedStr);
                      if (parsed.grade) pGrade = parsed.grade;
                      if (parsed.targetDate) pTarget = parsed.targetDate;
                    }
                  } catch (e) { }
                  return (
                    <div key={p} style={{ position: 'relative' }}>
                      <button onClick={() => {
                        setSuperName(p);
                        let startM = new Date().getMonth() + 1;
                        try {
                          const saved = localStorage.getItem('stt.user_' + p);
                          if (saved) {
                            const parsed = JSON.parse(saved);
                            if (parsed.startDate) startM = new Date(parsed.startDate).getMonth() + 1;
                          }
                        } catch (e) { }
                        localStorage.setItem('stt.activeMonth', JSON.stringify(startM));
                        setSuperName(p);
                        onLogin();
                      }} style={{
                        width: '100%', padding: 12, borderRadius: 16,
                        background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
                        display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', textAlign: 'left',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                      }}>
                        <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#4ade80', color: '#000', fontSize: 16, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {p.substring(0, 2).toUpperCase()}
                        </div>
                        <div style={{ flex: 1, paddingRight: 32 }}>
                          <div style={{ fontSize: 14, color: '#fff', fontWeight: 800 }}>{p}</div>
                          <div style={{ fontSize: 11, color: '#a7f3d0', marginTop: 2, fontFamily: 'var(--stt-font-sinhala)' }}>{pGrade} {t('grade')} · {pTarget}</div>
                        </div>
                      </button>
                      <button onClick={(e) => {
                        e.stopPropagation();
                        setDeleteConfirm(p);
                      }} style={{
                        position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                        width: 28, height: 28, borderRadius: '50%', background: 'rgba(239,68,68,0.15)',
                        border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, cursor: 'pointer'
                      }}>
                        ✕
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ textAlign: 'center', color: '#a7f3d0', fontSize: 13, padding: '10px 0', opacity: 0.8 }}>
                {t('please_register')}
              </div>
            )}

            <div style={{ textAlign: 'center', color: '#6ee7b7', fontSize: 11, margin: '4px 0', letterSpacing: 1, opacity: 0.6 }}>— OR —</div>

            <button onClick={() => setView('register')} style={{
              width: '100%', padding: '12px 0', borderRadius: 999,
              background: 'transparent', border: '1.5px solid #eab308',
              color: '#eab308', fontSize: 13, fontWeight: 700, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6
            }}>
              <span style={{ fontSize: 16 }}>📝</span> {t('register_new')}
            </button>
          </div>

          <button onClick={() => setView('welcome')} style={{
            width: '90%', maxWidth: 320, padding: '12px 0', borderRadius: 999, marginTop: 16,
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)',
            color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer', zIndex: 1
          }}>
            {t('back')}
          </button>
        </div>

        {deleteConfirm && (
          <div style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(4px)', animation: 'sttFadeIn 0.2s ease'
          }}>
            <div style={{
              background: 'linear-gradient(180deg, #16241a, #0a140d)',
              border: '1px solid rgba(74,222,128,0.25)', borderRadius: 20, padding: 24,
              width: '85%', maxWidth: 320, boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>🗑️</div>
              <div style={{ fontSize: 15, color: '#fff', fontWeight: 700, marginBottom: 8 }}>{t('del_title')}</div>
              <div style={{ fontSize: 13, color: '#a7f3d0', opacity: 0.8, marginBottom: 20 }}>
                {t('del_msg')} <b>{deleteConfirm}</b>?
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={() => setDeleteConfirm(null)} style={{
                  flex: 1, padding: 12, borderRadius: 12, background: 'rgba(255,255,255,0.1)',
                  color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer'
                }}>{t('cancel')}</button>
                <button onClick={() => {
                  const newProfiles = allProfiles.filter(x => x !== deleteConfirm);
                  setProfiles(newProfiles);
                  localStorage.setItem('stt.profiles', JSON.stringify(newProfiles));
                  if (superName === deleteConfirm) {
                    setSuperName('');
                    localStorage.setItem('stt.superName', JSON.stringify(''));
                  }
                  setDeleteConfirm(null);
                }} style={{
                  flex: 1, padding: 12, borderRadius: 12, background: '#ef4444',
                  color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(239,68,68,0.3)'
                }}>{t('delete')}</button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // Welcome View
  return (
    <div style={bgStyle}>
      <Dots />

      <div style={{ position: 'absolute', top: 20, right: 20, zIndex: 100 }}>
        <select value={lang} onChange={e => setLang(e.target.value)} style={{
          background: 'rgba(20,40,25,0.8)', border: '1px solid rgba(74,222,128,0.4)',
          color: '#4ade80', padding: '6px 28px 6px 12px', borderRadius: 8, fontSize: 11, fontWeight: 700,
          cursor: 'pointer', outline: 'none', WebkitAppearance: 'none', appearance: 'none',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)', colorScheme: 'dark', fontFamily: 'Inter'
        }}>
          <option value="si">සිංහල (SI)</option>
          <option value="en">English (EN)</option>
          <option value="ta">தமிழ் (TA)</option>
        </select>
        <div style={{
          position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
          pointerEvents: 'none', fontSize: 9, color: '#4ade80'
        }}>▼</div>
      </div>

      <style>{`
        @keyframes wTreeSway {
          0% { transform: rotate(-2deg) scale(0.98); }
          100% { transform: rotate(3deg) scale(1.02); }
        }
        @keyframes wFruitPulse {
          0% { transform: scale(0.9); opacity: 0.8; }
          100% { transform: scale(1.2); opacity: 1; filter: drop-shadow(0 0 8px currentColor); }
        }
        @keyframes wLeafBreathe {
          0% { transform: scale(0.98); }
          100% { transform: scale(1.04); }
        }
      `}</style>
      <svg width="120" height="140" viewBox="0 0 100 120" style={{ zIndex: 1, marginBottom: 12, overflow: 'visible' }}>
        {/* shadow */}
        <ellipse cx="50" cy="110" rx="32" ry="7" fill="#091c10" />

        <g style={{ animation: 'wTreeSway 4s ease-in-out infinite alternate', transformOrigin: '50px 110px' }}>
          {/* trunk */}
          <rect x="44" y="70" width="12" height="40" fill="#9b7653" rx="2" />

          <g style={{ animation: 'wLeafBreathe 3s ease-in-out infinite alternate', transformOrigin: '50px 60px' }}>
            {/* leaves (circles) */}
            <circle cx="50" cy="40" r="28" fill="#4ade80" />
            <circle cx="30" cy="65" r="22" fill="#4ade80" />
            <circle cx="70" cy="65" r="22" fill="#4ade80" />
            <circle cx="50" cy="70" r="24" fill="#4ade80" />

            {/* shadow on right side of tree to give volume */}
            <circle cx="50" cy="40" r="28" fill="#22c55e" opacity="0.3" clipPath="url(#tree-clip)" />
            <defs>
              <clipPath id="tree-clip">
                <rect x="50" y="0" width="50" height="100" />
              </clipPath>
            </defs>

            {/* fruits */}
            <g color="#ef4444" style={{ animation: 'wFruitPulse 2s ease-in-out infinite alternate', transformOrigin: '25px 55px' }}>
              <circle cx="25" cy="55" r="4.5" fill="currentColor" />
            </g>
            <g color="#ec4899" style={{ animation: 'wFruitPulse 2.5s ease-in-out infinite alternate 0.5s', transformOrigin: '48px 72px' }}>
              <circle cx="48" cy="72" r="5" fill="currentColor" />
            </g>
            <g color="#facc15" style={{ animation: 'wFruitPulse 2.2s ease-in-out infinite alternate 0.2s', transformOrigin: '68px 45px' }}>
              <circle cx="68" cy="45" r="6" fill="currentColor" />
            </g>
            <g color="#facc15" style={{ animation: 'wFruitPulse 2.7s ease-in-out infinite alternate 0.7s', transformOrigin: '62px 35px' }}>
              <circle cx="62" cy="35" r="4" fill="currentColor" />
            </g>
            <g color="#ef4444" style={{ animation: 'wFruitPulse 2.1s ease-in-out infinite alternate 0.4s', transformOrigin: '38px 35px' }}>
              <circle cx="38" cy="35" r="3.5" fill="currentColor" />
            </g>
          </g>
        </g>
      </svg>
      <div style={{ fontFamily: 'Archivo Black', fontSize: 28, color: '#4ade80', letterSpacing: 1, zIndex: 1 }}>STT PLAN</div>
      <div style={{ fontSize: 13, color: '#fff', opacity: 0.9, marginTop: -2, zIndex: 1, fontWeight: 700, fontFamily: 'var(--stt-font-sinhala)' }}>With CK Sir</div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '90%', maxWidth: 300, marginTop: 40, zIndex: 1 }}>
        <button onClick={() => setView('login')} style={{
          padding: '14px 0', borderRadius: 999, background: 'linear-gradient(135deg, #4ade80, #16a34a)',
          color: '#0a0e0b', fontSize: 16, fontWeight: 800, border: 'none', cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(74,222,128,0.4)', transition: 'transform 0.2s'
        }}>
          {t('login')}
        </button>

        <button onClick={() => setView('register')} style={{
          padding: '14px 0', borderRadius: 999, background: 'rgba(255,255,255,0.05)',
          color: '#fff', fontSize: 16, fontWeight: 700, border: '1.5px solid rgba(255,255,255,0.2)',
          cursor: 'pointer', transition: 'background 0.2s'
        }}>
          {t('register')}
        </button>
      </div>
    </div>
  );
};

const ForestView = ({ S, summary, t, streak, setBadgesOpen, setConfirmData }) => {
  const { data, hoursMap, treeTheme } = S;
  

  const activeTrees = data.weeks.filter(w => {
    const h = hoursMap[w.id];
    return h && (h.b1 > 0 || h.b2 > 0 || h.b3 > 0 || h.b4 > 0 || w.id === S.activeWeek);
  });

  return (
    <div style={{
      position: 'relative', width: '100%', height: 'calc(100% - 70px)', 
      overflow: 'hidden', background: '#050a06', borderRadius: '0 0 24px 24px'
    }}>
      {/* Sky & Environment Background */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 40%, #050a06 80%)',
        zIndex: 1
      }}>
        <div style={{ position: 'absolute', top: '15%', left: '10%', opacity: 0.15, fontSize: 80 }}>☁️</div>
        <div style={{ position: 'absolute', top: '25%', right: '15%', opacity: 0.1, fontSize: 60 }}>☁️</div>
        <div style={{ position: 'absolute', top: '5%', left: '40%', opacity: 0.1, fontSize: 120 }}>✨</div>
      </div>

      {/* Parallax Mountains */}
      <div style={{
        position: 'absolute', bottom: '25%', left: 0, right: 0, height: '20%',
        background: 'linear-gradient(180deg, transparent 0%, rgba(74,222,128,0.05) 100%)',
        zIndex: 2, clipPath: 'polygon(0% 100%, 15% 40%, 35% 85%, 55% 20%, 75% 70%, 90% 10%, 100% 100%)'
      }} />

      {/* The Forest Floor */}
      <div className="stt-scroll" style={{
        position: 'absolute', inset: 0, zIndex: 3,
        overflowX: 'auto', overflowY: 'hidden',
        display: 'flex', alignItems: 'flex-end',
        padding: '0 60px 90px', gap: 120,
      }}>
        {activeTrees.map((w, i) => {
          const h = hoursMap[w.id] || { b1: 0, b2: 0, b3: 0, b4: 0 };
          const totalH = h.b1 + h.b2 + h.b3 + h.b4;
          
          return (
            <div key={w.id} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              minWidth: 180, position: 'relative',
              animation: 'sttPopIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ' + (i * 0.1) + 's both'
            }}>
              {/* Tree label */}
              <div style={{
                position: 'absolute', bottom: -55,
                background: 'rgba(255,255,255,0.05)', padding: '6px 12px',
                borderRadius: 99, border: '1px solid rgba(255,255,255,0.1)',
                textAlign: 'center', minWidth: 100, backdropFilter: 'blur(5px)'
              }}>
                <div style={{ fontSize: 9, color: '#4ade80', fontWeight: 800 }}>MONTH {w.month}</div>
                <div style={{ fontSize: 11, color: '#fff', fontWeight: 700 }}>Week {w.id % 4 || 4}</div>
              </div>

              {/* Seasonal Particles */}


              <TreeSVG 
                size={220}
                week={w.id % 4 || 4}
                season='spring'
                theme='default'
                flowers={totalH >= 12}
                branches={[
                  { color: BRANCH_COLORS.b1, currentHrs: Math.min(7, h.b1) },
                  { color: BRANCH_COLORS.b2, currentHrs: Math.min(7, h.b2) },
                  { color: BRANCH_COLORS.b3, currentHrs: Math.min(7, h.b3) },
                  { color: BRANCH_COLORS.b4, currentHrs: Math.min(7, h.b4) },
                ]}
              />
            </div>
          );
        })}
        {/* Placeholder for future growth */}
        <div style={{
          minWidth: 180, height: 200, borderRadius: 24,
          border: '2px dashed rgba(255,255,255,0.05)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'rgba(255,255,255,0.2)', fontSize: 12, fontWeight: 700,
          fontFamily: 'var(--stt-font-sinhala)'
        }}>
          ඉදිරියට... 🌱
        </div>
      </div>

      {/* Achievement Overlay - Stats Floating */}
      <div style={{
        position: 'absolute', top: 20, left: 16, zIndex: 10,
        display: 'flex', gap: 6
      }}>
        <div onClick={() => setConfirmData({
          title: '✨ Total XP (Experience Points)',
          message: 'ඔබ පාඩම් කරන සෑම පැයකටම සහ සම්පූර්ණ කරන සෑම ඉලක්කයකටම XP හිමි වේ. වැඩිපුර XP එකතු කරගෙන ඔබේ Rank එක (Bronze → Silver → Gold → Diamond) වැඩිකරගන්න!',
          confirmText: 'OK'
        })} style={{
          background: 'rgba(5,10,6,0.8)', backdropFilter: 'blur(10px)',
          border: '1px solid rgba(74,222,128,0.2)', borderRadius: 12,
          padding: '8px 10px', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer'
        }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(74,222,128,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>✨</div>
          <div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', fontWeight: 800 }}>TOTAL XP</div>
            <div style={{ fontSize: 14, fontWeight: 900, color: '#fff' }}>{summary.xp.toLocaleString()}</div>
            <div style={{ fontSize: 9, color: '#4ade80', fontWeight: 800, marginTop: 1 }}>{summary.xp >= 2000 ? '💎 DIAMOND' : summary.xp >= 1000 ? '🥇 GOLD' : summary.xp >= 500 ? '🥈 SILVER' : '🥉 BRONZE'}</div>
          </div>
        </div>
        <div onClick={() => setConfirmData({
          title: '🔥 Daily Streak',
          message: 'ඔබ අඛණ්ඩව දිනපතා පාඩම් කරන දින ගණන මෙයින් පෙන්වයි. දවසක් හෝ මගහැරුණොත් Streak එක බිංදුවට (0) යයි. නොකඩවා පාඩම් කරලා ගිනිදැල්ල (🔥) ලබාගන්න!',
          confirmText: 'OK'
        })} style={{
          background: 'rgba(5,10,6,0.8)', backdropFilter: 'blur(10px)',
          border: '1px solid rgba(250,204,21,0.2)', borderRadius: 12,
          padding: '8px 10px', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer'
        }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(250,204,21,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>{streak.count >= 3 ? '🔥' : '⚡'}</div>
          <div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', fontWeight: 800 }}>STREAK</div>
            <div style={{ fontSize: 14, fontWeight: 900, color: streak.count >= 3 ? '#f97316' : '#fff' }}>{streak.count} DAYS</div>
          </div>
        </div>
      </div>

      <button onClick={() => setBadgesOpen(true)} style={{
        position: 'absolute', top: 20, right: 16, zIndex: 10,
        width: 36, height: 36, borderRadius: 10, 
        background: 'rgba(5,10,6,0.8)', backdropFilter: 'blur(10px)',
        border: '1px solid rgba(250,204,21,0.3)', color: '#facc15',
        fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
      }}>🏆</button>

      {/* Instructions / Tip */}
      <div style={{
        position: 'absolute', bottom: 5, left: '50%', transform: 'translateX(-50%)',
        zIndex: 10, fontSize: 10, color: 'rgba(255,255,255,0.3)',
        fontFamily: 'var(--stt-font-sinhala)', pointerEvents: 'none', textAlign: 'center', width: '100%'
      }}>
        ඔබේ වනාන්තරය පිරික්සීමට පසෙකට අදින්න (Swipe to see your forest)
      </div>
    </div>
  );
};



const MainApp = ({ onLogout }) => {
  const { lang, setLang, t } = window.useLang();
  const S = useSttState();

  const { 
    data, done, streak, activeWeek, summary, hours, hoursMap, treeTheme,
    toggleDone, updateNote, bumpHour, addTask, removeTask, setActiveWeek 
  } = S;

  const getSeason = (month) => {
    if (month >= 12 || month <= 2) return 'winter';
    if (month >= 9) return 'autumn';
    if (month >= 6) return 'summer';
    return 'spring'; // Mar-May: spring (uses original branch colors)
  };

  const randomQuote = React.useMemo(() => {
    const qs = data.quotes || [];
    return qs[Math.floor(Math.random() * qs.length)] || "";
  }, [data.quotes]);

  const savedUserStr = localStorage.getItem('stt.user_' + S.superName);
  let userGrade = data.student.grade;
  let userStartMonth = new Date().getMonth() + 1;
  let userStartWeek = (userStartMonth - 1) * 4 + Math.min(4, Math.ceil(new Date().getDate() / 7));
  if (savedUserStr) {
    try {
      const parsed = JSON.parse(savedUserStr);
      if (parsed.grade) userGrade = parsed.grade;
      if (parsed.startDate) {
        const d = new Date(parsed.startDate);
        if (!isNaN(d.getTime())) {
          userStartMonth = d.getMonth() + 1;
          let wom = Math.ceil(d.getDate() / 7);
          if (wom > 4) wom = 4;
          userStartWeek = (userStartMonth - 1) * 4 + wom;
        }
      }
    } catch (e) { }
  }

  const [activeTimerTask, setActiveTimerTask] = React.useState(null);
  const [badgesOpen, setBadgesOpen] = React.useState(false);
  const [fabOpen, setFabOpen] = React.useState(false);
  const [addModalOpen, setAddModalOpen] = React.useState(false);
  const [nameEditing, setNameEditing] = React.useState(false);
  const [tab, setTab] = React.useState('home');
  const [infoOpen, setInfoOpen] = React.useState(() => localStorage.getItem('stt.justRegistered') === 'true');
  const [activeMonth, setActiveMonth] = useLocalState('stt.activeMonth', new Date().getMonth() + 1);
  const [confirmData, setConfirmData] = React.useState(null);
  const [avatarOpen, setAvatarOpen] = React.useState(false);

  const [userPhoto, setUserPhoto] = React.useState(() => {
    const raw = localStorage.getItem('stt.user_' + S.superName);
    try { return JSON.parse(raw).photo || null; } catch (e) { return null; }
  });

  const saveUserPhoto = (p) => {
    setUserPhoto(p);
    const key = 'stt.user_' + S.superName;
    const raw = localStorage.getItem(key);
    try {
      const parsed = JSON.parse(raw);
      parsed.photo = p;
      localStorage.setItem(key, JSON.stringify(parsed));
    } catch (e) { }
  };

  const [showBonus, setShowBonus] = React.useState(false);
  const [dailyQuoteDate, setDailyQuoteDate] = useLocalState('stt.dailyQuoteDate_' + S.superName, '');
  const [showDailyQuote, setShowDailyQuote] = React.useState(false);
  const [unlockData, setUnlockData] = React.useState(null);

  React.useEffect(() => {
    const handler = (e) => {
      setUnlockData(e.detail);
      if (window.playSuccessSound) window.playSuccessSound();
      if (window.confetti) {
         window.confetti({ particleCount: 300, spread: 160, startVelocity: 40, origin: { y: 0.4 }, zIndex: 10000 });
         setTimeout(() => window.confetti({ particleCount: 200, spread: 120, startVelocity: 30, origin: { y: 0.5 }, zIndex: 10000 }), 400);
      }
    };
    window.addEventListener('stt-unlock', handler);
    return () => window.removeEventListener('stt-unlock', handler);
  }, []);

  React.useEffect(() => {
    const today = new Date().toDateString();
    if (dailyQuoteDate !== today && data.quotes?.length > 0) {
      const t = setTimeout(() => {
        setShowDailyQuote(true);
        setDailyQuoteDate(today);
      }, 800);
      return () => clearTimeout(t);
    }
  }, [dailyQuoteDate, data.quotes, S.superName]);

  React.useEffect(() => {
    const handler = () => {
      setShowBonus(true);
      if (S.soundEnabled && window.getAudioCtx) {
        try {
          const ctx = window.getAudioCtx();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain); gain.connect(ctx.destination);
          osc.type = 'square';
          osc.frequency.setValueAtTime(440, ctx.currentTime);
          osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.15);
          osc.frequency.setValueAtTime(880, ctx.currentTime + 0.3);
          gain.gain.setValueAtTime(0.2, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1);
          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 1);
        } catch(e) {}
      }
      if (window.confetti) {
        window.confetti({ particleCount: 300, spread: 150, origin: { y: 0.5 }, zIndex: 10000 });
      }
    };
    window.addEventListener('stt-daily-bonus', handler);
    return () => window.removeEventListener('stt-daily-bonus', handler);
  }, [S.soundEnabled]);

  const subjById = Object.fromEntries(data.subjects.map(s => [s.id, s]));
  const week = data.weeks.find(w => w.id === activeWeek) || data.weeks[0];
  const stageName = getStageName(activeWeek, t);

  const SettingsView = () => (
    <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ fontSize: 18, fontWeight: 900, color: '#4ade80', marginBottom: 8, fontFamily: 'var(--stt-font-sinhala)' }}>⚙️ {t('settings')}</div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16, background: 'rgba(255,255,255,0.05)', borderRadius: 20, padding: 16, border: '1px solid rgba(255,255,255,0.1)' }}>
        <button onClick={() => setAvatarOpen(true)} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', position: 'relative' }}>
          <UserAvatar photo={userPhoto} name={S.superName} size={64} />
          <div style={{ position: 'absolute', bottom: -2, right: -2, background: '#4ade80', width: 20, height: 20, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, border: '2px solid #050a06', color: '#000' }}>✎</div>
        </button>
        <div>
          <div style={{ fontSize: 18, fontWeight: 900, color: '#fff' }}>{S.superName}</div>
          <div style={{ fontSize: 12, color: '#86efac', opacity: 0.8 }}>Grade {userGrade} Student</div>
        </div>
      </div>
      <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 16, padding: 16, border: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#86efac', marginBottom: 12 }}>{t('app_lang')}</div>
        <div style={{ display: 'flex', gap: 10 }}>
          {['en', 'si', 'ta'].map(l => (
            <button key={l} onClick={() => setLang(l)} style={{ flex: 1, padding: '10px', borderRadius: 10, background: lang === l ? '#4ade80' : 'rgba(255,255,255,0.05)', color: lang === l ? '#0a0e0b' : '#fff', border: 'none', fontWeight: 800 }}>{l === 'si' ? 'සිංහල' : (l === 'ta' ? 'தமிழ்' : 'English')}</button>
          ))}
        </div>
      </div>

      <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 16, padding: 16, border: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#86efac', marginBottom: 12 }}>{t('sound_settings')}</div>
        <button onClick={() => S.setSoundEnabled(!S.soundEnabled)} style={{
          width: '100%', padding: '12px', borderRadius: 12,
          background: S.soundEnabled ? 'rgba(74,222,128,0.15)' : 'rgba(239,68,68,0.1)',
          border: `1.5px solid ${S.soundEnabled ? 'rgba(74,222,128,0.4)' : 'rgba(239,68,68,0.3)'}`,
          color: S.soundEnabled ? '#4ade80' : '#ef4444',
          fontSize: 14, fontWeight: 800, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          transition: 'all 0.2s'
        }}>
          {S.soundEnabled ? t('sound_on') : t('sound_off')}
        </button>
      </div>


      {/* User Manual Button */}
      <button onClick={() => setInfoOpen(true)} style={{
        width: '100%', padding: '14px', borderRadius: 16,
        background: 'linear-gradient(135deg, rgba(74,222,128,0.15), rgba(56,189,248,0.1))',
        border: '1.5px solid rgba(74,222,128,0.35)',
        color: '#86efac', fontSize: 14, fontWeight: 800,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
        cursor: 'pointer', boxShadow: '0 4px 16px rgba(74,222,128,0.1)',
        fontFamily: 'var(--stt-font-sinhala)', transition: 'all 0.2s'
      }}>
        <span style={{ fontSize: 20 }}>📘</span>
        User Manual · STT අත්පොත
      </button>

      {/* Class Info Card */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(252,211,77,0.07), rgba(74,222,128,0.05))',
        border: '1.5px solid rgba(252,211,77,0.25)', borderRadius: 18, padding: 18,
        display: 'flex', flexDirection: 'column', gap: 14
      }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: '#fcd34d', display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--stt-font-sinhala)' }}>
          <span style={{ fontSize: 18 }}>🏫</span> CK Sir පන්තියට සම්බන්ධ වන්න
        </div>

        {/* WhatsApp enroll */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <span style={{ fontSize: 20, flexShrink: 0 }}>✍️</span>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, fontFamily: 'var(--stt-font-sinhala)' }}>
            <span style={{ color: '#fde047', fontWeight: 700 }}>අලුතින් පන්තියට එකතු වෙන දරුවන්,</span> ඔයාගේ නම සහ ශ්‍රේණිය{' '}
            <button onClick={() => window.open('https://wa.me/94750587944', '_blank')} style={{
              background: '#25D366', color: '#fff', border: 'none', borderRadius: 8,
              padding: '2px 10px', fontSize: 12, fontWeight: 800, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4, verticalAlign: 'middle'
            }}>
              📱 075 058 7944
            </button>{' '}
            <span style={{ color: '#86efac', fontWeight: 700 }}>අංකයට WhatsApp කරන්න.</span>
          </div>
        </div>

        {/* Hotline */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ fontSize: 20, flexShrink: 0 }}>📞</span>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', fontFamily: 'var(--stt-font-sinhala)' }}>
            <span style={{ color: 'rgba(255,255,255,0.6)' }}>වැඩි විස්තර සඳහා අමතන්න (Hotline) :</span>{' '}
            <button onClick={() => window.open('tel:+94701217700', '_blank')} style={{
              background: 'rgba(56,189,248,0.2)', color: '#38bdf8', border: '1px solid rgba(56,189,248,0.4)',
              borderRadius: 8, padding: '2px 10px', fontSize: 12, fontWeight: 800, cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: 4, verticalAlign: 'middle'
            }}>
              📞 070 121 7700
            </button>
          </div>
        </div>
      </div>

      {/* Channels */}
      <div style={{ textAlign: 'center', background: 'rgba(37,211,102,0.05)', borderRadius: 16, padding: 20, border: '1px solid rgba(37,211,102,0.2)' }}>
        <div style={{ fontSize: 13, color: '#f0fdf4', marginBottom: 12, fontFamily: 'var(--stt-font-sinhala)', fontWeight: 600 }}>වැඩිදුර උපදෙස් සඳහා සම්බන්ධ වන්න</div>
        <button onClick={() => window.open('https://www.whatsapp.com/channel/0029VasliMrFcowGIPn8ID2h', '_blank')} style={{
          width: '100%', padding: '14px', borderRadius: 99, background: '#25D366', color: '#fff', border: 'none',
          fontSize: 14, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          boxShadow: '0 4px 15px rgba(37,211,102,0.3)', cursor: 'pointer', marginBottom: 10
        }}>
          Join CK Sir WhatsApp Channel 📢
        </button>
        <button onClick={() => window.open('https://t.me/epaperesathkaraya', '_blank')} style={{
          width: '100%', padding: '14px', borderRadius: 99, background: '#229ED9', color: '#fff', border: 'none',
          fontSize: 14, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          boxShadow: '0 4px 15px rgba(34,158,217,0.3)', cursor: 'pointer', marginBottom: 10
        }}>
          ✈️ Join Telegram Channel
        </button>
        <button onClick={() => window.open('https://forms.gle/YQQm5oHM9MofUaZ19', '_blank')} style={{
          width: '100%', padding: '14px', borderRadius: 99, background: 'linear-gradient(90deg, #f59e0b, #d97706)',
          color: '#fff', fontSize: 13, fontWeight: 800, border: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          boxShadow: '0 4px 15px rgba(217,119,6,0.3)', cursor: 'pointer'
        }}>
          <span>✍️</span> App එක ගැන ඔයාගේ අදහස කියන්න
        </button>
      </div>



      {/* Version */}
      <div style={{ textAlign: 'center', marginTop: 10, opacity: 0.38 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1 }}>STT PLAN v1.2.1</div>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, marginTop: 3, fontFamily: 'monospace' }}>
          &lt; Solo Developer /... &gt;
        </div>
      </div>

      {/* Logout — bottom */}
      <button onClick={() => setConfirmData({ title: t('logout'), message: t('logout_confirm_msg'), confirmText: t('yes_logout'), cancelText: t('no'), confirmColor: '#ef4444', onConfirm: onLogout })} style={{
        width: '100%', padding: '13px', borderRadius: 14,
        background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.22)',
        color: '#fca5a5', fontSize: 13, fontWeight: 700, cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        marginTop: 4
      }}>
        <span>🚪</span> {t('logout')}
      </button>
    </div>
  );



  return (
    <div style={{
      position: 'relative', width: '100%', height: '100%',
      background: '#050a06', color: '#f0fdf4',
      overflow: 'hidden', fontFamily: 'var(--stt-font)',
      display: 'flex', flexDirection: 'column',
    }}>
      <StarBg />

      {/* ── Persistent Top Bar (Shared across all tabs) ── */}
      <div style={{ padding: '14px 16px 4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 10 }}>
        <div onClick={() => setTab('home')} style={{ display: 'flex', alignItems: 'center', gap: 7, cursor: 'pointer' }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8,
            background: 'linear-gradient(135deg, #166534, #0a2a12)',
            border: '1px solid rgba(74,222,128,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, boxShadow: '0 0 10px rgba(74,222,128,0.3)',
          }}>🌳</div>
          <div style={{ fontFamily: 'Archivo Black', fontSize: 14, color: '#4ade80', letterSpacing: 1 }}>STT</div>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <select value={lang} onChange={e => setLang(e.target.value)} style={{
              background: 'rgba(20,40,25,0.8)', border: '1px solid rgba(74,222,128,0.4)',
              color: '#4ade80', padding: '4px 16px 4px 8px', borderRadius: 6, fontSize: 10, fontWeight: 800,
              cursor: 'pointer', outline: 'none', WebkitAppearance: 'none', appearance: 'none',
              textTransform: 'uppercase', colorScheme: 'dark', fontFamily: 'Inter'
            }}>
              <option value="si">SI</option>
              <option value="en">EN</option>
              <option value="ta">TA</option>
            </select>
            <div style={{
              position: 'absolute', right: 5, top: '50%', transform: 'translateY(-50%)',
              pointerEvents: 'none', fontSize: 7, color: '#4ade80'
            }}>▼</div>
          </div>
          <button onClick={() => setInfoOpen(true)} style={{
            width: 32, height: 32, borderRadius: '50%',
            background: 'rgba(56,189,248,0.15)', border: '1px solid rgba(56,189,248,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            color: '#38bdf8', fontSize: 14
          }}>❓</button>
          <button onClick={() => setTab('settings')} style={{
            background: 'none', border: 'none', padding: 0, cursor: 'pointer', outline: 'none'
          }}>
            <UserAvatar
              photo={userPhoto} name={S.superName} size={32}
              border="1px solid rgba(134,239,172,0.4)"
              shadow="0 0 10px rgba(74,222,128,0.3)"
            />
          </button>
        </div>
      </div>

      <div className="stt-scroll" style={{ flex: 1, overflowY: 'auto', position: 'relative', zIndex: 1, paddingBottom: 90 }}>

        {tab === 'home' && (
          <>
            {/* ── Greeting ── */}
            <div style={{ padding: '8px 16px 2px' }}>
              <div style={{ fontSize: 13, color: '#ffffff', fontFamily: 'var(--stt-font-sinhala)', fontWeight: 500 }}>
                {t('greeting')} <span style={{ color: '#86efac', fontWeight: 700 }}>{S.superName || 'Student'}</span> 🌱
              </div>
            </div>

            {/* ── Big display title ── */}
            <div style={{ padding: '4px 16px 14px' }}>
              <div style={{
                fontFamily: 'Archivo Black, sans-serif',
                fontSize: 40, lineHeight: 0.95, letterSpacing: -1.5, color: '#f3f4f6',
              }}>
                Super<br />Three
                <span style={{
                  color: '#4ade80',
                  textShadow: '0 0 20px rgba(74,222,128,0.5)',
                  marginLeft: 10,
                }}>Tree</span>
                <span style={{
                  fontFamily: 'Inter', fontWeight: 400, fontSize: 18,
                  color: 'rgba(240,253,244,0.88)', marginLeft: 6,
                }}>Plan</span>
                <div style={{
                  fontFamily: 'Inter', fontWeight: 700, fontSize: 12,
                  color: '#86efac', marginTop: 10, letterSpacing: 1.5,
                  textTransform: 'uppercase', opacity: 0.9
                }}>
                  With CK Sir
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 8, padding: '0 16px 14px' }}>
              <StatCard label={t('streak')} icon={streak.count >= 3 ? "🔥" : "⚡"} value={streak.count ?? 0} unit={t('days')} color={streak.count >= 3 ? "#f97316" : "#4ade80"} />
              <StatCard label={t('xp')} icon="✨" value={summary.xp.toLocaleString()} color="#86efac" />
              <StatCard label={t('grade')} icon="🎓" value={userGrade} color="#22d3a0" />
            </div>

            <div style={{ padding: '0 0 8px' }}>
              <div style={{ padding: '0 16px', fontSize: 11, fontWeight: 800, color: '#4ade80', marginBottom: 6, opacity: 0.8, letterSpacing: 1 }}>{t('select_month')}</div>
              <div className="stt-scroll" style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '0 16px 4px' }}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(m => (
                  <MonthTab key={m} m={m} activeMonth={activeMonth} setActiveMonth={setActiveMonth} userStartMonth={userStartMonth} hoursMap={hoursMap} setActiveWeek={setActiveWeek} setConfirmData={setConfirmData} t={t} />
                ))}
              </div>
            </div>

            <div style={{ padding: '0 16px 14px' }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: '#4ade80', marginBottom: 6, opacity: 0.8, letterSpacing: 1 }}>{t('select_week')}</div>
              <div style={{ display: 'flex', gap: 6 }}>
                {data.weeks.filter(w => w.month === activeMonth).map(w => (
                  <WeekTab key={w.id} w={w} activeWeek={activeWeek} setActiveWeek={setActiveWeek} hoursMap={hoursMap} userStartWeek={userStartWeek} data={data} t={t} setConfirmData={setConfirmData} />
                ))}
              </div>
            </div>

            <div style={{ padding: '0 16px 10px' }}>
              <TodayLeafMap 
                activeWeek={activeWeek} hours={hours} t={t} lang={lang} 
                setInfoOpen={setInfoOpen} season='spring' theme='default'
              />
            </div>

            <div style={{ padding: '0 16px 12px' }}>
              <BranchCounters hours={hours} week={week} t={t} bumpHour={bumpHour} />
            </div>

            <div style={{ padding: '0 16px 16px' }}>
              <div style={{
                background: 'linear-gradient(135deg, rgba(250,204,21,0.1), rgba(234,179,8,0.05))',
                borderRadius: 20, padding: '16px 18px', border: '1px solid rgba(250,204,21,0.2)',
                display: 'flex', gap: 12, alignItems: 'center'
              }}>
                <span style={{ fontSize: 24, display: 'flex', alignItems: 'center' }}>💡</span>
                <div style={{ flex: 1, fontSize: 12, color: 'rgba(255,255,255,0.9)', fontFamily: 'var(--stt-font-sinhala)', lineHeight: 1.6, fontStyle: 'italic', fontWeight: 500 }}>{randomQuote}</div>
              </div>
            </div>

            <StudyAnalytics hours={hours} summary={summary} t={t} activeWeek={activeWeek} hoursMap={hoursMap} />

            {/* Active week task list (scrolls below) */}
            <div style={{ padding: '4px 14px 0' }}>
              <div style={{ fontSize: 11, color: week.color, letterSpacing: 1.5, fontWeight: 800, marginBottom: 4, textShadow: `0 0 8px ${week.color}60` }}>
                {week.tree} · {t('tasks')}
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, fontFamily: 'var(--stt-font-sinhala)', marginBottom: 10, color: '#ffffff' }}>
                {week.title}
              </div>
            </div>
            <div style={{ padding: '0 14px' }}>
              {week.tasks.length === 0 && (
                <div style={{ textAlign: 'center', padding: 20, color: 'rgba(240,253,244,0.5)', fontSize: 13, fontFamily: 'var(--stt-font-sinhala)' }}>
                  {t('no_tasks_msg')}
                </div>
              )}
              {week.tasks.map(task => (
                <STT_TASKS.TaskRow
                  key={task.id}
                  task={task}
                  done={!!done[task.id]}
                  note={S.notes[task.id]}
                  subject={subjById[task.subject] || { color: '#888', label: task.subject }}
                  onToggle={() => toggleDone(task.id)}
                  onNote={(text) => S.updateNote(task.id, text)}
                  onTimer={() => setActiveTimerTask(task)}
                  onRemove={() => {
                    setConfirmData({
                      title: t('del_task_title'),
                      message: `"${task.title}" ${t('del_task_msg')}`,
                      onConfirm: () => S.removeTask(week.id, task.id)
                    });
                  }}
                />
              ))}
              <button onClick={() => setAddModalOpen(true)} style={{
                width: '100%', padding: 12, borderRadius: 12, background: 'rgba(74,222,128,0.1)',
                border: '1px dashed rgba(74,222,128,0.3)', color: '#4ade80', fontSize: 13,
                fontWeight: 700, fontFamily: 'var(--stt-font-sinhala)', marginTop: 10, cursor: 'pointer'
              }}>
                {t('add_new_task')}
              </button>
            </div>
          </>
        )}

        {tab === 'weeks' && (
          <div style={{ padding: '0 20px 20px' }}>
            <div style={{ fontSize: 24, fontWeight: 900, color: '#4ade80', marginBottom: 20, fontFamily: 'Archivo Black' }}>{t('roadmap')}</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(m => {
                let isLocked = false;
                if (m > userStartMonth) {
                  const prevM = m - 1;
                  const lastW = prevM * 4;
                  const h = hoursMap[lastW] || { b1: 0, b2: 0, b3: 0, b4: 0 };
                  if ((h.b1 + h.b2 + h.b3 + h.b4) < 7) isLocked = true;
                }
                return (
                  <div key={m} onClick={() => {
                    if (isLocked) {
                      setConfirmData({
                        title: `🔒 ${t('month')} ${t('locked')}`,
                        message: t('unlock_msg_month'),
                        onConfirm: null,
                        cancelText: t('ok')
                      });
                      return;
                    }
                    setActiveMonth(m); setTab('home');
                  }} style={{
                    padding: 16, borderRadius: 20, background: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))',
                    border: '1.5px solid ' + (isLocked ? 'rgba(255,255,255,0.1)' : '#4ade80'),
                    textAlign: 'center', opacity: isLocked ? 0.5 : 1, cursor: isLocked ? 'default' : 'pointer',
                    boxShadow: isLocked ? 'none' : '0 4px 15px rgba(74,222,128,0.1)'
                  }}>
                    <div style={{ fontSize: 28, marginBottom: 8 }}>{isLocked ? '🔒' : '📅'}</div>
                    <div style={{ fontSize: 14, fontWeight: 900, color: '#fff' }}>{t('month')} {m}</div>
                    <div style={{ fontSize: 11, color: '#a7f3d0', marginTop: 2 }}>{MONTH_NAMES[m - 1]}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {tab === 'grow' && (
          <ForestView S={S} summary={summary} t={t} streak={streak} setBadgesOpen={setBadgesOpen} setConfirmData={setConfirmData} />
        )}

        {tab === 'settings' && <SettingsView />}
      </div>


      {/* ── Bottom nav with FAB ── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 5,
        height: 78, pointerEvents: 'none',
      }}>
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 68,
          background: 'linear-gradient(180deg, rgba(5,10,6,0) 0%, rgba(5,10,6,0.92) 40%, rgba(5,10,6,1) 100%)',
          borderTop: '1px solid rgba(74,222,128,0.1)',
          pointerEvents: 'auto',
          display: 'flex', alignItems: 'flex-start', justifyContent: 'space-around',
          padding: '8px 10px 0',
        }}>
          {[
            { id: 'home', icon: '🌳', label: t('home') },
            { id: 'weeks', icon: '📅', label: t('weeks') },
            { id: 'fab-spacer' },
            { id: 'grow', icon: '🏆', label: t('grow') },
            { id: 'settings', icon: '⚙️', label: t('settings') },
          ].map((n, i) => n.id === 'fab-spacer' ? (
            <div key={i} style={{ width: 56 }} />
          ) : (
            <button key={n.id} onClick={() => setTab(n.id)} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
              padding: '4px 8px', minWidth: 52,
            }}>
              <span style={{ fontSize: 17, opacity: tab === n.id ? 1 : 0.85 }}>{n.icon}</span>
              <span style={{ fontSize: 10.5, color: tab === n.id ? '#4ade80' : '#ffffff', fontWeight: tab === n.id ? 800 : 600 }}>{n.label}</span>
              {tab === n.id && (
                <div style={{ width: 22, height: 2.5, borderRadius: 2, background: '#4ade80', marginTop: 1, boxShadow: '0 0 8px #4ade80' }} />
              )}
            </button>
          ))}
        </div>
      </div>



      {/* Info modal — User Manual / Guide */}
      {infoOpen && (
        <div onClick={() => { setInfoOpen(false); localStorage.removeItem('stt.justRegistered'); }} style={{
          position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.8)',
          zIndex: 100, backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 16, animation: 'sttFadeIn .2s',
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            width: '100%', maxWidth: 360, maxHeight: '85vh',
            background: 'linear-gradient(180deg, #0e2415, #050a06)',
            border: '1.5px solid rgba(74,222,128,0.35)',
            borderRadius: 24, padding: 0,
            boxShadow: '0 20px 60px rgba(0,0,0,0.7), 0 0 40px rgba(74,222,128,0.1)',
            fontFamily: 'var(--stt-font-sinhala)',
            display: 'flex', flexDirection: 'column', overflow: 'hidden'
          }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '18px 20px', borderBottom: '1px solid rgba(74,222,128,0.15)' }}>
              <span style={{ fontSize: 22 }}>📘</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 900, color: '#ffffff' }}>STT PLAN <span style={{ color: '#4ade80' }}>අත්පොත</span></div>
                <div style={{ fontSize: 10, color: 'rgba(134,239,172,0.7)', letterSpacing: 1, textTransform: 'uppercase', fontWeight: 700 }}>User Manual • With CK Sir</div>
              </div>
              <button onClick={() => { setInfoOpen(false); localStorage.removeItem('stt.justRegistered'); }} style={{
                width: 28, height: 28, borderRadius: '50%',
                background: 'rgba(255,255,255,0.08)', color: '#ffffff',
                fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>×</button>
            </div>

            {/* Scrollable Content */}
            <div style={{ padding: '16px 20px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>

              {/* 1. STT Branches */}
              <section>
                <div style={{ fontSize: 13, fontWeight: 800, color: '#86efac', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 4, height: 14, background: '#4ade80', borderRadius: 2 }}></span>
                  01. STT අතු 4 ක්‍රමය
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    { color: BRANCH_COLORS.b1, title: 'Branch 01 — Green', desc: 'නව කොටසක් පාඩම් කිරීම / කියවීම/Recording/class' },
                    { color: BRANCH_COLORS.b2, title: 'Branch 02 — Blue', desc: 'පොත වසා කරුණු මතකයෙන් ආවර්ජනය කිරීම (Active Recall).' },
                    { color: BRANCH_COLORS.b3, title: 'Branch 03 — Yellow', desc: 'එම කොටසට අදාළව ප්රශ්න කිරීම / බහුවරණ ගැටලු විසඳීම (Practice Testing).' },
                    { color: BRANCH_COLORS.b4, title: 'Branch 04 — Pink', desc: 'පෙර සතිවල ඉගෙන ගත් දේවල් නැවත මතක් කිරීම (Spaced Repetition)' },
                  ].map(b => (
                    <div key={b.title} style={{ display: 'flex', gap: 10 }}>
                      <div style={{ width: 12, height: 12, borderRadius: '50%', background: b.color, boxShadow: `0 0 8px ${b.color}`, marginTop: 4, flexShrink: 0 }} />
                      <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.85)', lineHeight: 1.4 }}>
                        <strong style={{ color: '#fff' }}>{b.title}:</strong> {b.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 2. Tree Growth */}
              <section style={{ background: 'rgba(74,222,128,0.05)', padding: 12, borderRadius: 14, border: '1px solid rgba(74,222,128,0.1)' }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: '#fde047', marginBottom: 6 }}>02. ගස් වර්ධනය (Tree Growth)</div>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', lineHeight: 1.5, margin: 0 }}>
                  ඔයා පාඩම් කරන සෑම <span style={{ color: '#fff', fontWeight: 700 }}>පැය 1කටම</span> ගසේ <span style={{ color: '#fff', fontWeight: 700 }}>එක් රවුමක් (Circle)</span> බැගින් පත්තුවේ.
                  සතියෙන් සතිය ඔයාගේ "පැළය" ලොකු ගසක් දක්වා වර්ධනය වෙන හැටි ඔයාට බලාගන්න පුළුවන්.
                </p>
              </section>

              {/* 3. XP සහ දක්ෂතා (Gamification) */}
              <section style={{ background: 'rgba(250,204,21,0.05)', padding: 12, borderRadius: 14, border: '1px solid rgba(250,204,21,0.1)' }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: '#fde047', marginBottom: 6 }}>03. XP සහ දක්ෂතා (Gamification)</div>
                <ul style={{ paddingLeft: 16, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <li style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)' }}>සෑම පාඩම් පැයකටම <span style={{ color: '#4ade80', fontWeight: 700 }}>10 XP</span> බැගින් ලැබේ.</li>
                  <li style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)' }}>ඉලක්ක සපුරන විට <span style={{ color: '#fff' }}>Confetti</span> සහ <span style={{ color: '#fff' }}>Sound Effects</span> මගින් ඔබව දිරිමත් කරයි.</li>
                  <li style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)' }}>වැඩ අවසන් කරන විට <span style={{ color: '#fb923c' }}>Rank Badges</span> ලබා ගත හැක (Bronze → Silver → Diamond → A9).</li>
                  <li style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)' }}>දිනපතා ඇප් එක භාවිතා කර <span style={{ color: '#f87171' }}>Fire Streak</span> එක පවත්වා ගන්න.</li>
                </ul>
              </section>

              {/* 4. Smart Insights & Unlock */}
              <section>
                <div style={{ fontSize: 13, fontWeight: 800, color: '#86efac', marginBottom: 10 }}>04. ස්මාර්ට් ලුහුබැඳීම (Smart Features)</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <span style={{ fontSize: 14 }}>🔓</span>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', lineHeight: 1.4 }}>
                      <strong style={{ color: '#fff' }}>Dynamic Unlock:</strong> සතිපතා අවම පැය 7ක ඉලක්කය සපුරන විට ඊළඟ සතිය සහ මාසය ස්වයංක්‍රීයව අගුළු හැරේ (Unlock).
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <span style={{ fontSize: 14 }}>💡</span>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', lineHeight: 1.4 }}>
                      <strong style={{ color: '#fff' }}>Smart Insights:</strong> ඔබේ පාඩම් රටාව අනුව ඇප් එක විසින් ඔබට අවශ්‍ය උපදෙස් (Focus more, Good job) ලබා දෙයි.
                    </div>
                  </div>
                </div>
              </section>

              {/* 5. Timer & Custom Tasks */}
              <section style={{ background: 'rgba(56,189,248,0.05)', padding: 12, borderRadius: 14, border: '1px solid rgba(56,189,248,0.1)' }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: '#38bdf8', marginBottom: 6 }}>05. ටයිමරය සහ Tasks</div>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', lineHeight: 1.5, margin: 0 }}>
                  අවධානය වැඩි කරගැනීමට <span style={{ color: '#fff', fontWeight: 700 }}>Pomodoro ටයිමරය</span> භාවිතා කරන්න. තවද, පහළ ඇති <span style={{ color: '#4ade80' }}>"+"</span> බොත්තමෙන් ඕනෑම විෂයකට අදාළව ඔබේම Tasks ඇතුළත් කර කාලය කළමනාකරණය කරගන්න.
                </p>
              </section>

              {/* 6. Channels */}
              <section style={{ textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 16 }}>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>වැඩිදුර උපදෙස් සඳහා සම්බන්ධ වන්න</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <button onClick={() => window.open('https://www.whatsapp.com/channel/0029VasliMrFcowGIPn8ID2h', '_blank')} style={{
                    padding: '8px 16px', borderRadius: 10, background: '#25D366', color: '#fff', border: 'none',
                    fontSize: 12, fontWeight: 800, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, cursor: 'pointer', width: '100%'
                  }}>
                    Join CK Sir WhatsApp Channel 📢
                  </button>
                  <button onClick={() => window.open('https://t.me/epaperesathkaraya', '_blank')} style={{
                    padding: '8px 16px', borderRadius: 10, background: '#229ED9', color: '#fff', border: 'none',
                    fontSize: 12, fontWeight: 800, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, cursor: 'pointer', width: '100%'
                  }}>
                    ✈️ Join Telegram Channel
                  </button>
                </div>
              </section>

            </div>

            {/* Footer */}
            <div style={{ padding: '16px 20px', background: 'rgba(0,0,0,0.3)' }}>
              <button onClick={() => { setInfoOpen(false); localStorage.removeItem('stt.justRegistered'); }} style={{
                width: '100%', padding: '14px', borderRadius: 14,
                background: 'linear-gradient(90deg, #4ade80, #16a34a)',
                color: '#0a0e0b', fontSize: 14, fontWeight: 900, border: 'none',
                boxShadow: '0 4px 20px rgba(74,222,128,0.3)', cursor: 'pointer'
              }}>
                හරි! වැඩ පටන් ගනිමු 🚀
              </button>
            </div>
          </div>
        </div>
      )}


      {/* FAB Overlay + Menu */}
      {fabOpen && (
        <>
          <div onClick={() => setFabOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(3px)' }} />
          <div style={{
            position: 'fixed', bottom: 135, left: '50%', transform: 'translateX(-50%)',
            background: 'linear-gradient(180deg, #0f1f14, #050a06)', border: '1px solid rgba(74,222,128,0.45)',
            borderRadius: 24, padding: '12px 12px 12px', display: 'flex', flexDirection: 'column', gap: 6,
            zIndex: 1001, minWidth: 240, boxShadow: '0 10px 40px rgba(0,0,0,0.8)',
            animation: 'sttFadeIn .2s ease-out'
          }}>
            <div style={{ padding: '8px 12px', fontSize: 10, fontWeight: 800, color: '#4ade80', letterSpacing: 1, opacity: 0.6 }}>{t('quick_actions')}</div>


            <div style={{ display: 'flex', gap: 8, padding: '0 4px' }}>
              {[
                { icon: '⏱', label: 'Timer', onClick: () => { setActiveTimerTask({ title: 'Focus Session', minutes: 25 }); setFabOpen(false); } },
                { icon: '✎', label: 'Note', onClick: () => { setTab('home'); setFabOpen(false); } },
                { icon: '🏆', label: 'Badges', onClick: () => { setBadgesOpen(true); setFabOpen(false); } },
              ].map(a => (
                <button key={a.label} onClick={a.onClick} style={{
                  flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                  padding: '12px 0', borderRadius: 14, background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(74,222,128,0.25)', cursor: 'pointer'
                }}>
                  <span style={{ fontSize: 20 }}>{a.icon}</span>
                  <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', fontWeight: 700 }}>{a.label}</span>
                </button>
              ))}
            </div>

            <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', margin: '4px 0' }} />

            <button onClick={() => {
              setFabOpen(false);
              setConfirmData({
                title: `${t('logout')}?`,
                message: t('logout_confirm_msg'),
                onConfirm: onLogout,
                confirmText: t('yes_logout'),
                cancelText: t('no'),
                confirmColor: '#ef4444'
              });
            }} style={{
              padding: '14px 16px', borderRadius: 16, background: 'rgba(239,68,68,0.12)',
              color: '#ef4444', fontSize: 13, fontWeight: 700, textAlign: 'left',
              display: 'flex', alignItems: 'center', gap: 12, border: 'none', cursor: 'pointer'
            }}>
              <span style={{ fontSize: 20 }}>🚪</span> {t('logout')}
            </button>
          </div>
        </>
      )}

      {/* Floating Action Button - Moved back to absolute for perfect alignment with nav bar spacer */}
      <button onClick={() => setFabOpen(v => !v)} style={{
        position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)',
        width: 54, height: 54, borderRadius: '50%',
        background: 'linear-gradient(135deg, #4ade80, #16a34a)',
        boxShadow: '0 6px 24px rgba(74,222,128,0.5), 0 0 0 4px rgba(5,10,6,0.8)',
        color: '#0a0e0b', fontSize: 28, fontWeight: 300,
        border: '1.5px solid rgba(134,239,172,0.6)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 1002, pointerEvents: 'auto',
        transition: 'all .35s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        transform: `translateX(-50%) rotate(${fabOpen ? 45 : 0}deg) scale(${fabOpen ? 0.92 : 1})`,
      }}>+</button>

      <STT_TASKS.PomodoroModal open={!!activeTimerTask} onClose={() => setActiveTimerTask(null)} task={activeTimerTask} />
      <STT_TASKS.BadgesModal open={badgesOpen} onClose={() => setBadgesOpen(false)} summary={summary} streak={streak.count} />
      <STT_TASKS.AddTaskModal open={addModalOpen} onClose={() => setAddModalOpen(false)} onAdd={(subjectId, title, detail, minutes) => S.addTask(activeWeek, subjectId, title, detail, minutes)} />
      <STT_TASKS.AvatarModal open={avatarOpen} onClose={() => setAvatarOpen(false)} onSelect={saveUserPhoto} />
      <STT_TASKS.ConfirmModal
        open={!!confirmData}
        onClose={() => setConfirmData(null)}
        onConfirm={confirmData?.onConfirm}
        title={confirmData?.title}
        message={confirmData?.message}
        cancelText={confirmData?.cancelText}
        confirmText={confirmData?.confirmText}
        confirmColor={confirmData?.confirmColor}
      />

      {showBonus && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(5,10,6,0.92)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(10px)', animation: 'sttFadeIn 0.3s ease-out'
        }}>
          <div style={{
            fontSize: 100, animation: 'sttPopIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}>🎁</div>
          <div style={{
            fontFamily: 'Archivo Black', fontSize: 28, color: '#facc15', marginTop: 20,
            textShadow: '0 0 20px rgba(250,204,21,0.5)', animation: 'sttFadeIn 0.8s ease-out 0.2s both'
          }}>
            DAILY BONUS!
          </div>
          <div style={{
            fontFamily: 'var(--stt-font-sinhala)', fontSize: 16, color: '#fff', marginTop: 10,
            fontWeight: 700, animation: 'sttFadeIn 0.8s ease-out 0.4s both', textAlign: 'center'
          }}>
            දවසේ පළමු වැඩේට<br/>
            <span style={{ fontSize: 24, color: '#4ade80', fontWeight: 900 }}>+30 XP</span>
          </div>
          <button onClick={() => setShowBonus(false)} style={{
            marginTop: 40, padding: '14px 40px', borderRadius: 99, background: 'linear-gradient(135deg, #facc15, #eab308)',
            color: '#000', fontSize: 16, fontWeight: 900, border: 'none', cursor: 'pointer',
            boxShadow: '0 10px 25px rgba(250,204,21,0.4)', animation: 'sttFadeIn 0.8s ease-out 0.6s both'
          }}>
            Awesome! 🚀
          </button>
        </div>
      )}

      {showDailyQuote && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 9998, background: 'rgba(5,10,6,0.85)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(10px)', animation: 'sttFadeIn 0.3s ease-out', padding: 20
        }}>
          <div style={{
            background: 'linear-gradient(145deg, rgba(20,30,22,0.9), rgba(10,15,10,0.95))',
            border: '1px solid rgba(74,222,128,0.3)',
            borderRadius: 24, padding: '40px 30px', maxWidth: 400, width: '100%',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(74,222,128,0.1) inset',
            display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
            animation: 'sttPopIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }}>
            <div style={{ fontSize: 50, marginBottom: 20, filter: 'drop-shadow(0 0 10px rgba(250,204,21,0.5))' }}>💡</div>
            <div style={{
              fontFamily: 'var(--stt-font-sinhala)', fontSize: 18, color: '#e2e8f0',
              lineHeight: 1.6, fontWeight: 500, marginBottom: 30
            }}>
              {randomQuote}
            </div>
            <button onClick={() => setShowDailyQuote(false)} style={{
              padding: '14px 40px', borderRadius: 99, background: 'linear-gradient(135deg, #4ade80, #16a34a)',
              color: '#000', fontSize: 16, fontWeight: 800, border: 'none', cursor: 'pointer',
              boxShadow: '0 10px 25px rgba(74,222,128,0.3)', transition: 'transform 0.2s'
            }}
            onMouseOver={e => e.target.style.transform = 'scale(1.05)'}
            onMouseOut={e => e.target.style.transform = 'scale(1)'}>
              අද වැඩ පටන් ගමු! 🚀
            </button>
          </div>
        </div>
      )}

      {unlockData && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(5,10,6,0.92)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(12px)', animation: 'sttFadeIn 0.4s ease-out', padding: 20
        }}>
          <div style={{
            fontSize: 120, animation: 'sttPopIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
            filter: 'drop-shadow(0 0 30px rgba(74,222,128,0.5))'
          }}>
            {unlockData.type === 'month' ? '🏆' : '🔥'}
          </div>
          <div style={{
            fontFamily: 'Archivo Black', fontSize: 36, color: '#4ade80', marginTop: 20,
            textShadow: '0 0 20px rgba(74,222,128,0.5)', animation: 'sttFadeIn 0.8s ease-out 0.2s both',
            textAlign: 'center'
          }}>
            {unlockData.type === 'month' ? 'MONTH UNLOCKED!' : 'WEEK UNLOCKED!'}
          </div>
          <div style={{
            fontFamily: 'var(--stt-font-sinhala)', fontSize: 18, color: '#fff', marginTop: 15,
            fontWeight: 700, animation: 'sttFadeIn 0.8s ease-out 0.4s both', textAlign: 'center',
            lineHeight: 1.5
          }}>
            {unlockData.type === 'month' 
              ? `නියමයි! ඔයා ${unlockData.id} වෙනි මාසය අන්ලොක් කළා.\nදිගටම මේ ගැම්ම තියාගමු! 💪`
              : `සුපිරි! ඔයා ${unlockData.id} වෙනි සතිය අන්ලොක් කළා.\nතවත් පියවරක් ඉදිරියට! 🚀`}
          </div>
          <button onClick={() => setUnlockData(null)} style={{
            marginTop: 40, padding: '16px 50px', borderRadius: 99, background: 'linear-gradient(135deg, #4ade80, #16a34a)',
            color: '#000', fontSize: 18, fontWeight: 900, border: 'none', cursor: 'pointer',
            boxShadow: '0 10px 25px rgba(74,222,128,0.4)', animation: 'sttFadeIn 0.8s ease-out 0.6s both',
            transition: 'transform 0.2s'
          }}
          onMouseOver={e => e.target.style.transform = 'scale(1.05)'}
          onMouseOut={e => e.target.style.transform = 'scale(1)'}>
            නියමයි!
          </button>
        </div>
      )}
    </div>
  );
};

const SttApp = () => {
  const [isLoggedIn, setIsLoggedIn] = useLocalState('stt.isLoggedIn', false);
  const [superName] = useLocalState('stt.superName', '');

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }
  // Using superName as key forces a fresh mount of MainApp and all its hooks on user change
  return <MainApp key={superName} onLogout={() => setIsLoggedIn(false)} />;
};

window.SttApp = SttApp;
