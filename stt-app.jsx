// Main STT Plan App — Home screen v2 matching the new reference design.

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
            <div style={{ fontSize: 12, color: '#4ade80', fontWeight: 700, marginBottom: 8 }}>{t('super_name')}</div>
            <input value={regName} onChange={e => setRegName(e.target.value)} placeholder={t('your_name')} style={{
              width: '100%', padding: '12px 16px', background: 'rgba(0,0,0,0.2)', border: '1px solid #eab308',
              borderRadius: 999, color: '#fff', fontSize: 14, outline: 'none', boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.5)'
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
            if (!regName.trim() || !regGrade || !regTargetDate) {
              setErrorMsg(t('fill_error'));
              return;
            }
            setErrorMsg('');
            const nameToSave = regName.trim();
            setSuperName(nameToSave);
            const newProfiles = [...new Set([...profiles, nameToSave])];
            setProfiles(newProfiles);
            localStorage.setItem('stt.superName', JSON.stringify(nameToSave));
            localStorage.setItem('stt.profiles', JSON.stringify(newProfiles));
            localStorage.setItem('stt.user_' + nameToSave, JSON.stringify({ grade: regGrade, targetDate: regTargetDate, startDate: regStartDate }));
            // Explicitly initialize new user data to 0
            localStorage.setItem('stt.streak_' + nameToSave, JSON.stringify({ count: 0, lastISO: null }));
            localStorage.setItem('stt.done_' + nameToSave, JSON.stringify({}));
            localStorage.setItem('stt.hoursMap_' + nameToSave, JSON.stringify({}));

            const startMonthNum = new Date(regStartDate).getMonth() + 1;
            localStorage.setItem('stt.activeMonth', JSON.stringify(startMonthNum));
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
                        localStorage.setItem('stt.superName', JSON.stringify(p));
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

const MainApp = ({ onLogout }) => {
  const { lang, setLang, t } = window.useLang();
  const S = useSttState();
  const { data, done, streak, activeWeek, summary } = S;

  const savedUserStr = localStorage.getItem('stt.user_' + S.superName);
  let userGrade = data.student.grade; // fallback
  let userStartMonth = 1;
  let userStartWeek = 1;
  if (savedUserStr) {
    try {
      const parsed = JSON.parse(savedUserStr);
      if (parsed.grade) userGrade = parsed.grade;
      if (parsed.startDate) {
        userStartMonth = new Date(parsed.startDate).getMonth() + 1;
        userStartWeek = (userStartMonth - 1) * 4 + 1;
      }
    } catch (e) { }
  }
  const { toggleDone, setActiveWeek, hours, bumpHour, hoursMap } = S;

  const [activeTimerTask, setActiveTimerTask] = React.useState(null);
  const [badgesOpen, setBadgesOpen] = React.useState(false);
  const [fabOpen, setFabOpen] = React.useState(false);
  const [notifOpen, setNotifOpen] = React.useState(false);
  const [addModalOpen, setAddModalOpen] = React.useState(false);
  const [nameEditing, setNameEditing] = React.useState(false);
  const [tab, setTab] = React.useState('home');
  const [infoOpen, setInfoOpen] = React.useState(() => {
    if (localStorage.getItem('stt.justRegistered') === 'true') {
      localStorage.removeItem('stt.justRegistered');
      return true;
    }
    return false;
  });

  // Pick a random quote on mount
  const randomQuote = React.useMemo(() => {
    const qs = window.STT_DATA.quotes;
    return qs[Math.floor(Math.random() * qs.length)];
  }, []);


  const [activeMonth, setActiveMonth] = useLocalState('stt.activeMonth', new Date().getMonth() + 1);
  const [confirmData, setConfirmData] = React.useState(null);
  const [avatarOpen, setAvatarOpen] = React.useState(false);
  const [userPhoto, setUserPhoto] = React.useState(() => {
    const raw = localStorage.getItem('stt.user_' + S.superName);
    if (raw) {
      try { return JSON.parse(raw).photo || null; } catch (e) { }
    }
    return null;
  });
  const saveUserPhoto = (p) => {
    setUserPhoto(p);
    const key = 'stt.user_' + S.superName;
    const raw = localStorage.getItem(key);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        parsed.photo = p;
        localStorage.setItem(key, JSON.stringify(parsed));
      } catch (e) { }
    }
  };

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
      } catch (e) { return <div>ERR</div>; }
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

  // ── Branch color palette (matches reference: Green / Teal / Pink) ──
  const BRANCH_COLORS = { b1: '#4ade80', b2: '#38bdf8', b3: '#f472b6' };
  const BRANCH_DARK = { b1: '#166534', b2: '#0369a1', b3: '#be185d' };

  // ── Small stage-icon that grows with week number ──
  const StageIcon = ({ stage, size = 20, color = '#4ade80' }) => {
    // Cycle stage 1..4 every month (4 weeks)
    const s = ((stage - 1) % 4) + 1;
    const positions = [
      [{ cx: 12, cy: 9, r: 4 }],
      [{ cx: 8, cy: 10, r: 3.2 }, { cx: 12, cy: 7, r: 3.8 }, { cx: 16, cy: 10, r: 3.2 }],
      [{ cx: 7, cy: 11, r: 3 }, { cx: 11, cy: 7, r: 3.5 }, { cx: 15, cy: 7, r: 3.5 }, { cx: 17, cy: 11, r: 3 }, { cx: 12, cy: 11, r: 2.8 }],
      [{ cx: 6, cy: 11, r: 3 }, { cx: 10, cy: 7, r: 3.2 }, { cx: 14, cy: 6, r: 3.5 }, { cx: 18, cy: 11, r: 3 }, { cx: 8, cy: 14, r: 2.5 }, { cx: 16, cy: 14, r: 2.5 }, { cx: 12, cy: 10, r: 2.8 }],
    ];
    const leaves = positions[s - 1];
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
        {leaves.map((lf, i) => (
          <circle key={i} cx={lf.cx} cy={lf.cy} r={lf.r}
            fill={color}
            opacity={0.85 - (i % 3) * 0.1} />
        ))}
        <rect x={11} y={leaves[0].cy + leaves[0].r - 1} width="2" height={21 - (leaves[0].cy + leaves[0].r - 1)} fill="#a16207" rx="1" />
      </svg>
    );
  };


  const targetsByWeek = { 1: 13, 2: 26, 3: 39, 4: 52 };
  const MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const subjById = Object.fromEntries(data.subjects.map(s => [s.id, s]));
  const weekProgress = (w) => w.tasks.filter(t => done[t.id]).length;
  const week = data.weeks.find(w => w.id === activeWeek) || data.weeks[0];



  // Firefly background
  const StarBg = () => (
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden',
      background: 'linear-gradient(180deg, #050a06 0%, #0a140c 40%, #050a06 100%)',
    }} />
  );

  // Mini tree — simple, matches reference image (small fruit clusters at 3 branch tips)
  const MiniTree = ({ progress = 0, color = '#4ade80', numbered = false }) => {
    // 3 fruit positions (left, top-center, right)
    const fruits = [
      { cx: 22, cy: 42, r: 9, label: 1 },
      { cx: 46, cy: 30, r: 10, label: 2 },
      { cx: 70, cy: 42, r: 9, label: 3 },
    ];
    return (
      <svg viewBox="0 0 92 92" width="82" height="82" style={{ overflow: 'visible' }}>
        {/* trunk */}
        <path d="M 46 84 L 46 52 M 46 60 Q 32 52 22 45 M 46 60 Q 60 52 70 45"
          stroke="#7c3f15" strokeWidth="3" fill="none" strokeLinecap="round" />
        {/* ground */}
        <ellipse cx="46" cy="86" rx="22" ry="2" fill="#000" opacity="0.4" />
        {fruits.map((f, i) => {
          const isDone = i < progress;
          return (
            <g key={i}>
              {isDone && (
                <circle cx={f.cx} cy={f.cy} r={f.r + 5} fill={color} opacity="0.25" />
              )}
              <circle
                cx={f.cx} cy={f.cy} r={f.r}
                fill={isDone ? color : 'transparent'}
                stroke={isDone ? color : 'rgba(255,255,255,0.25)'}
                strokeWidth="1.5"
                strokeDasharray={isDone ? 'none' : '2,2'}
                style={{ filter: isDone ? `drop-shadow(0 0 5px ${color})` : 'none' }}
              />
              {isDone && numbered && (
                <text x={f.cx} y={f.cy + 3.5} textAnchor="middle" fontSize="10" fontWeight="800" fill="#0a0e0b">
                  {f.label}
                </text>
              )}
              {isDone && (
                <circle cx={f.cx - f.r / 3} cy={f.cy - f.r / 3} r={f.r / 3.5} fill="#fff" opacity="0.4" />
              )}
            </g>
          );
        })}
      </svg>
    );
  };

  // Stage names for each week
  // Stage names helper (cyclic 1..4)
  const getStageName = (weekId) => {
    const s = ((weekId - 1) % 4) + 1;
    if (s === 1) return t('tiny_seedling');
    if (s === 2) return t('small_tree');
    if (s === 3) return t('young_tree');
    return t('full_tree');
  };

  // Big tree + counters — replaces TodayLeafMap
  const TodayLeafMap = () => {
    const weekTarget = week.targetHrs || 7;
    const branchTarget = Math.ceil(weekTarget / 3);
    const targets = { b1: branchTarget, b2: branchTarget, b3: branchTarget };
    const stageName = getStageName(activeWeek);

    return (
      <div style={{
        background: 'linear-gradient(180deg, rgba(16,32,20,0.9), rgba(8,20,12,0.95))',
        border: '1px solid rgba(74,222,128,0.25)',
        borderRadius: 22, padding: '14px 14px 20px',
        boxShadow: '0 8px 28px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 10, fontWeight: 800, color: '#4ade80', background: 'rgba(74,222,128,0.18)', padding: '3px 9px', borderRadius: 999, fontFamily: 'var(--stt-font-sinhala)' }}>{t('today')}</span>
            <span style={{ fontSize: 10.5, color: '#ffffff', fontWeight: 600 }}>· {new Date().toLocaleDateString(lang === 'si' ? 'si-LK' : (lang === 'ta' ? 'ta-LK' : 'en-GB'), { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
          <button onClick={() => setInfoOpen(true)} style={{
            width: 22, height: 22, borderRadius: '50%',
            background: 'rgba(74,222,128,0.2)',
            border: '1px solid rgba(74,222,128,0.45)',
            color: '#86efac', fontSize: 11, fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>i</button>
        </div>

        {/* Big tree centered */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '8px 0 6px' }}>
          <TreeSVG
            branches={[
              { color: BRANCH_COLORS.b1, colorDark: BRANCH_DARK.b1, currentHrs: (hours || {}).b1, targetHrs: branchTarget },
              { color: BRANCH_COLORS.b2, colorDark: BRANCH_DARK.b2, currentHrs: (hours || {}).b2, targetHrs: branchTarget },
              { color: BRANCH_COLORS.b3, colorDark: BRANCH_DARK.b3, currentHrs: (hours || {}).b3, targetHrs: branchTarget },
            ]}
            size={240}
            glow={true}
            week={activeWeek}
          />
        </div>

        {/* Stage label pill */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: -8, marginBottom: 8 }}>
          <div style={{
            background: 'rgba(5,10,6,0.9)',
            border: '1px solid rgba(74,222,128,0.4)',
            padding: '5px 14px', borderRadius: 999,
            fontSize: 11, fontWeight: 700, color: '#ffffff',
            display: 'flex', alignItems: 'center', gap: 6,
            boxShadow: '0 2px 10px rgba(0,0,0,0.4)',
          }}>
            <StageIcon stage={activeWeek} size={16} color="#4ade80" />
            {stageName}
          </div>
        </div>
      </div>
    );
  };

  // 3 branch hour-counter cards (Green / Teal / Pink) with −/+ and progress bar
  const BranchCounters = () => {
    const weekTarget = week.targetHrs || 7;
    const branchTarget = Math.ceil(weekTarget / 3);
    const cards = [
      { key: 'b1', label: t('class'), label2: t('recording'), color: BRANCH_COLORS.b1 },
      { key: 'b2', label: t('study'), label2: t('short_notes'), color: BRANCH_COLORS.b2 },
      { key: 'b3', label: t('paper'), label2: t('revision'), color: BRANCH_COLORS.b3 },
    ];
    return (
      <div style={{ display: 'flex', gap: 8 }}>
        {cards.map(c => {
          const h = (hours || {})[c.key] || 0;
          const pct = Math.min(100, (h / branchTarget) * 100);
          return (
            <div key={c.key} style={{
              flex: 1,
              background: 'linear-gradient(180deg, rgba(20,36,26,0.95), rgba(12,24,16,0.9))',
              border: `1.5px solid ${c.color}55`,
              borderRadius: 14,
              padding: '10px 8px 8px',
              boxShadow: `0 2px 12px ${c.color}20, inset 0 1px 0 rgba(255,255,255,0.06)`,
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              position: 'relative', overflow: 'hidden',
            }}>
              {/* colored dot */}
              <div style={{
                width: 10, height: 10, borderRadius: '50%',
                background: c.color, boxShadow: `0 0 8px ${c.color}`,
              }} />
              {/* label */}
              <div style={{ textAlign: 'center', fontSize: 10.5, lineHeight: 1.2, color: '#ffffff', fontWeight: 600 }}>
                <div>{c.label}</div>
                <div>{c.label2}</div>
              </div>
              {/* −/h/+ */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                <button onClick={() => bumpHour(c.key, -1)} style={{
                  width: 22, height: 22, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: '#ffffff', fontSize: 14, fontWeight: 700, lineHeight: 1,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>−</button>
                <div style={{
                  fontSize: 18, fontWeight: 900, color: c.color, fontFamily: 'Inter',
                  minWidth: 30, textAlign: 'center',
                  textShadow: `0 0 8px ${c.color}80`,
                }}>{h}h</div>
                <button onClick={() => bumpHour(c.key, 1)} style={{
                  width: 22, height: 22, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: '#ffffff', fontSize: 14, fontWeight: 700, lineHeight: 1,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>+</button>
              </div>
              {/* progress bar */}
              <div style={{
                width: '100%', height: 4, borderRadius: 2,
                background: 'rgba(255,255,255,0.08)',
                marginTop: 4, overflow: 'hidden',
              }}>
                <div style={{
                  width: `${pct}%`, height: '100%',
                  background: c.color,
                  boxShadow: `0 0 6px ${c.color}`,
                  transition: 'width 400ms ease',
                }} />
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const StudyAnalytics = () => {
    const maxH = Math.max(1, hours.b1 || 0, hours.b2 || 0, hours.b3 || 0, 10);
    const maxW = Math.max(1, ...summary.weekActivity, 5);

    return (
      <div style={{ padding: '0 16px 30px', display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* 1. Branch Summary (The original bar chart, but improved) */}
        <section>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(240,253,244,0.7)', marginBottom: 12, fontFamily: 'var(--stt-font-sinhala)' }}>
            {t('study_analytics')}
          </div>
          <div style={{
            background: 'rgba(16,32,20,0.6)', borderRadius: 20, padding: '20px 12px 16px',
            border: '1px solid rgba(74,222,128,0.15)', display: 'flex', alignItems: 'flex-end', gap: 12, height: 150
          }}>
            {[
              { id: 'b1', label: t('class_short'), color: BRANCH_COLORS.b1, val: hours.b1 || 0 },
              { id: 'b2', label: t('study_short'), color: BRANCH_COLORS.b2, val: hours.b2 || 0 },
              { id: 'b3', label: t('paper_short'), color: BRANCH_COLORS.b3, val: hours.b3 || 0 },
            ].map(b => (
              <div key={b.id} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <div style={{ fontSize: 12, color: '#fff', fontWeight: 900 }}>{b.val}h</div>
                <div style={{
                  width: '100%', maxWidth: 40, height: Math.max(6, (b.val / maxH) * 80),
                  background: `linear-gradient(180deg, ${b.color}, ${b.color}40)`,
                  borderRadius: '10px 10px 6px 6px',
                  transition: 'none',
                  position: 'relative',
                  overflow: 'hidden'
                }} />
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.5 }}>{b.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Weekly Activity Trend */}
        <section>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(240,253,244,0.7)', marginBottom: 12, fontFamily: 'var(--stt-font-sinhala)' }}>
            {t('weekly_trend')}
          </div>
          <div style={{
            background: 'rgba(16,32,20,0.6)', borderRadius: 20, padding: '20px 16px',
            border: '1px solid rgba(74,222,128,0.15)'
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: 60, gap: 6 }}>
              {summary.weekActivity.map((v, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{
                    width: '100%', height: Math.max(4, (v / maxW) * 45),
                    background: i === 6 ? '#4ade80' : 'rgba(74,222,128,0.3)',
                    borderRadius: 4,
                    transition: 'height 0.6s ease'
                  }} />
                  <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)', fontWeight: 700 }}>
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'][(new Date(Date.now() - (6 - i) * 86400000).getDay() + 6) % 7]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Subject Statistics */}
        <section>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(240,253,244,0.7)', marginBottom: 12, fontFamily: 'var(--stt-font-sinhala)' }}>
            {t('subject_stats')}
          </div>
          <div style={{
            background: 'rgba(16,32,20,0.6)', borderRadius: 20, padding: '16px',
            border: '1px solid rgba(74,222,128,0.15)',
            display: 'flex', flexDirection: 'column', gap: 12
          }}>
            {summary.subjectStats.slice(0, 4).map(s => (
              <div key={s.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 11, fontWeight: 700 }}>
                  <span style={{ color: s.color }}>{s.label}</span>
                  <span style={{ color: 'rgba(255,255,255,0.6)' }}>{s.completed}/{s.total}</span>
                </div>
                <div style={{ width: '100%', height: 6, background: 'rgba(255,255,255,0.05)', borderRadius: 99, overflow: 'hidden' }}>
                  <div style={{ width: `${s.percent}%`, height: '100%', background: s.color, borderRadius: 99, transition: 'width 1s ease' }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Smart Insights */}
        <section>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(240,253,244,0.7)', marginBottom: 12, fontFamily: 'var(--stt-font-sinhala)' }}>
            {t('smart_insights')}
          </div>
          <div style={{
            background: 'linear-gradient(135deg, rgba(74,222,128,0.1), rgba(34,197,94,0.05))',
            borderRadius: 20, padding: '16px',
            border: '1px solid rgba(74,222,128,0.2)',
            display: 'flex', flexDirection: 'column', gap: 10
          }}>
            <div style={{ fontSize: 12, color: '#fff', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 8 }}>
              {summary.percent > 50 ? '✨ ' + t('good_job') : '🚀 ' + t('need_focus')}
            </div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', lineHeight: 1.5, fontFamily: 'var(--stt-font-sinhala)' }}>
              {summary.percent < 30 && t('study_more_msg')}
              {summary.percent >= 30 && hours.b3 < hours.b2 && t('paper_focus_msg')}
              {streak.count < 3 && <div style={{ marginTop: 6 }}>{t('keep_streak_msg')}</div>}
            </div>
          </div>
        </section>

      </div>
    );
  };


  // Month Tab
  const MonthTab = ({ m }) => {
    const active = activeMonth === m;

    // Lock logic: Month N depends on Month N-1 completion (last week of prev month)
    let locked = false;
    if (m > userStartMonth) {
      const lastWeekOfPrevMonth = (m - 1) * 4;
      const prevH = hoursMap[lastWeekOfPrevMonth] || {};
      const totalPrev = (prevH.b1 || 0) + (prevH.b2 || 0) + (prevH.b3 || 0);
      if (totalPrev < 7) locked = true;
    }

    return (
      <button
        onClick={() => {
          if (locked) {
            setConfirmData({
              title: '🔒 Month Locked!',
              message: `කලින් මාසයේ අවසන් සතිය සම්පූර්ණ කරලා මේ මාසය Unlock කරගන්න.`,
              onConfirm: () => { }
            });
            return;
          }
          setActiveMonth(m);
          // Automatically switch to the first week of that month to ensure data isolation
          const firstWeekOfM = (m - 1) * 4 + 1;
          setActiveWeek(firstWeekOfM);
        }}
        style={{
          flex: 1, padding: '10px 4px', borderRadius: 12,
          background: active ? 'linear-gradient(135deg, #4ade80, #166534)' : 'rgba(30,45,35,0.6)',
          border: active ? '1.5px solid #4ade80' : '1px solid rgba(134,239,172,0.2)',
          color: active ? '#0a0e0b' : '#ffffff',
          fontSize: 11, fontWeight: 800, cursor: locked ? 'default' : 'pointer',
          opacity: locked ? 0.6 : 1, transition: 'all .2s'
        }}
      >
        {locked ? '🔒' : MONTH_NAMES[m - 1]}
      </button>
    );
  };

  // Stat cards — 3 wide
  const StatCard = ({ label, value, icon, color, unit }) => (
    <div style={{
      flex: 1, padding: '12px 12px',
      background: `linear-gradient(180deg, ${color}35, ${color}12)`,
      border: `1.5px solid ${color}`,
      borderRadius: 14,
      boxShadow: `inset 0 1px 0 rgba(255,255,255,0.1), 0 2px 10px ${color}25`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 5 }}>
        <span style={{ fontSize: 11, color: '#ffffff', fontFamily: 'var(--stt-font-sinhala)', fontWeight: 700, letterSpacing: 0.2 }}>{label}</span>
        <span style={{ fontSize: 13 }}>{icon}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
        <span style={{ fontSize: 22, fontWeight: 900, color: '#ffffff', letterSpacing: -0.5, fontFamily: 'Inter', textShadow: `0 0 10px ${color}80` }}>
          {value}
        </span>
        {unit && <span style={{ fontSize: 11, color: '#ffffff', fontFamily: 'var(--stt-font-sinhala)', fontWeight: 600 }}>{unit}</span>}
      </div>
    </div>
  );

  // Week tab — Stage icon + name + "Week 01 · Xh"
  const WeekTab = ({ w }) => {
    const active = w.id === activeWeek;
    const stageName = getStageName(w.id);
    const target = w.targetHrs || 7;

    // Lock logic: Week N depends on Week N-1 completion
    let locked = false;
    let prevProgress = 100;
    if (w.id > userStartWeek) {
      const prevW = w.id - 1;
      const prevH = hoursMap[prevW] || {};
      const totalPrev = (prevH.b1 || 0) + (prevH.b2 || 0) + (prevH.b3 || 0);
      const prevWeekData = data.weeks.find(x => x.id === prevW);
      const prevTarget = prevWeekData ? prevWeekData.targetHrs : 7;
      prevProgress = Math.min(100, Math.floor((totalPrev / prevTarget) * 100));
      if (totalPrev < prevTarget) locked = true;
    }

    return (
      <button
        onClick={() => {
          if (locked) {
            setConfirmData({
              title: `🔒 ${t('week')} ${t('locked')}`,
              message: t('unlock_msg_week').replace('Week 0', `${t('week')} 0`),
              onConfirm: null,
              cancelText: t('ok')
            });
            return;
          }
          setActiveWeek(w.id);
        }}
        style={{
          flex: 1, padding: '8px 4px 7px',
          borderRadius: 12,
          background: active ? `linear-gradient(180deg, ${w.color}40, ${w.color}15)` : 'rgba(30,45,35,0.6)',
          border: active ? `2px solid ${w.color}` : '1.5px solid rgba(134,239,172,0.22)',
          boxShadow: active ? `0 0 20px ${w.color}55, inset 0 1px 0 rgba(255,255,255,0.1)` : 'none',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
          transition: 'all .18s',
          opacity: locked ? 0.6 : 1,
          filter: locked ? 'grayscale(0.5)' : 'none',
          cursor: locked ? 'default' : 'pointer',
          position: 'relative'
        }}
      >
        {locked ? (
          <div style={{ fontSize: 16, marginBottom: 2 }}>🔒</div>
        ) : (
          <StageIcon stage={w.id} size={22} color={active ? w.color : '#86efac'} />
        )}
        <div style={{
          marginTop: 2, textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 1
        }}>
          <div style={{ fontSize: 8, color: active ? '#fff' : '#86efac', fontWeight: 900, opacity: 0.7, textTransform: 'uppercase', letterSpacing: 0.5 }}>{t('week')} {w.id.toString().padStart(2, '0')}</div>
          <div style={{ fontSize: 10, color: '#ffffff', fontWeight: 700, lineHeight: 1.1 }}>{locked ? 'Locked' : getStageName(w.id)}</div>
        </div>
      </button>
    );
  };
  const SettingsView = () => (
    <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ fontSize: 18, fontWeight: 900, color: '#4ade80', marginBottom: 8, fontFamily: 'var(--stt-font-sinhala)' }}>⚙️ {t('settings')}</div>

      {/* Profile Section */}
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

      {/* Language */}
      <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 16, padding: 16, border: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#86efac', marginBottom: 12 }}>{t('app_lang')}</div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => setLang('en')} style={{
            flex: 1, padding: '10px', borderRadius: 10, background: lang === 'en' ? '#4ade80' : 'rgba(255,255,255,0.05)',
            color: lang === 'en' ? '#0a0e0b' : '#fff', border: 'none', fontWeight: 800
          }}>English</button>
          <button onClick={() => setLang('si')} style={{
            flex: 1, padding: '10px', borderRadius: 10, background: lang === 'si' ? '#4ade80' : 'rgba(255,255,255,0.05)',
            color: lang === 'si' ? '#0a0e0b' : '#fff', border: 'none', fontWeight: 800, fontFamily: 'var(--stt-font-sinhala)'
          }}>සිංහල</button>
          <button onClick={() => setLang('ta')} style={{
            flex: 1, padding: '10px', borderRadius: 10, background: lang === 'ta' ? '#4ade80' : 'rgba(255,255,255,0.05)',
            color: lang === 'ta' ? '#0a0e0b' : '#fff', border: 'none', fontWeight: 800
          }}>தமிழ்</button>
        </div>
      </div>

      {/* Account Info */}
      <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 16, padding: 16, border: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#86efac', marginBottom: 8 }}>{t('account_mgmt')}</div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginBottom: 16 }}>{t('logged_in_as')} <strong style={{ color: '#fff' }}>{S.superName}</strong></div>

        <button onClick={() => {
          setConfirmData({
            title: t('logout'),
            message: t('logout_confirm_msg'),
            confirmText: t('yes_logout'),
            confirmColor: '#ef4444',
            onConfirm: () => onLogout()
          });
        }} style={{
          width: '100%', padding: '12px', borderRadius: 12,
          background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)',
          color: '#fca5a5', fontSize: 13, fontWeight: 700, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
        }}>
          <span>🚪</span> {t('logout')}
        </button>


      </div>

      {/* WhatsApp Channel */}
      <div style={{ textAlign: 'center', background: 'rgba(37,211,102,0.05)', borderRadius: 16, padding: 20, border: '1px solid rgba(37,211,102,0.2)' }}>
        <div style={{ fontSize: 13, color: '#f0fdf4', marginBottom: 12, fontFamily: 'var(--stt-font-sinhala)', fontWeight: 600 }}>වැඩිදුර උපදෙස් සඳහා සම්බන්ධ වන්න</div>
        <button onClick={() => window.open('https://www.whatsapp.com/channel/0029VasliMrFcowGIPn8ID2h', '_blank')} style={{
          width: '100%', padding: '14px', borderRadius: 99, background: '#25D366', color: '#fff', border: 'none',
          fontSize: 14, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          boxShadow: '0 4px 15px rgba(37,211,102,0.3)', cursor: 'pointer'
        }}>
          Join CK Sir WhatsApp Channel 📢
        </button>
      </div>

      {/* Version */}
      <div style={{ textAlign: 'center', opacity: 0.4, marginTop: 10 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1 }}>STT PLAN v1.2.1</div>
      </div>
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
          <button onClick={() => setNotifOpen(true)} style={{
            width: 32, height: 32, borderRadius: '50%',
            background: 'rgba(16,32,20,0.8)', border: '1px solid rgba(74,222,128,0.2)',
            position: 'relative', fontSize: 13,
          }}>
            🔔
            <span style={{
              position: 'absolute', top: 4, right: 5,
              width: 7, height: 7, borderRadius: '50%',
              background: '#f472b6', boxShadow: '0 0 4px #f472b6',
            }} />
          </button>
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

            {/* ── Stat cards row ── */}
            <div style={{ display: 'flex', gap: 8, padding: '0 16px 14px' }}>
              <StatCard label={t('streak')} icon="🔥" value={streak.count ?? 0} unit={t('days')} color="#4ade80" />
              <StatCard label={t('xp')} icon="✨" value={summary.xp.toLocaleString()} color="#86efac" />
              <StatCard label={t('grade')} icon="🎓" value={userGrade} color="#22d3a0" />
            </div>

            {/* ── Month tabs ── */}
            <div style={{ padding: '0 0 8px' }}>
              <div style={{ padding: '0 16px', fontSize: 11, fontWeight: 800, color: '#4ade80', marginBottom: 6, opacity: 0.8, letterSpacing: 1 }}>{t('select_month')}</div>
              <div className="stt-scroll" style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '0 16px 4px' }}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(m => <MonthTab key={m} m={m} />)}
              </div>
            </div>

            {/* ── Week tabs (filtered by activeMonth) ── */}
            <div style={{ padding: '0 16px 14px' }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: '#4ade80', marginBottom: 6, opacity: 0.8, letterSpacing: 1 }}>{t('select_week')}</div>
              <div style={{ display: 'flex', gap: 6 }}>
                {data.weeks.filter(w => w.month === activeMonth).map(w => <WeekTab key={w.id} w={w} />)}
              </div>
            </div>

            {/* ── Today leaf map (big tree) ── */}
            <div style={{ padding: '0 16px 10px' }}>
              <TodayLeafMap />
            </div>

            {/* ── 3 branch hour counters ── */}
            <div style={{ padding: '0 16px 12px' }}>
              <BranchCounters />
            </div>

            {/* ── Motivation Quote ── */}
            <div style={{ padding: '0 16px 16px' }}>
              <div style={{
                background: 'linear-gradient(135deg, rgba(250,204,21,0.1), rgba(234,179,8,0.05))',
                borderRadius: 20, padding: '16px 18px',
                border: '1px solid rgba(250,204,21,0.2)',
                display: 'flex', gap: 12, alignItems: 'flex-start'
              }}>
                <span style={{ fontSize: 24 }}>💡</span>
                <div style={{
                  flex: 1, fontSize: 12, color: 'rgba(255,255,255,0.9)',
                  fontFamily: 'var(--stt-font-sinhala)', lineHeight: 1.6,
                  fontStyle: 'italic', fontWeight: 500
                }}>
                  {randomQuote}
                </div>
              </div>
            </div>

            {/* ── Analytics ── */}
            <StudyAnalytics />

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
              {week.tasks.map(t => (
                <STT_TASKS.TaskRow
                  key={t.id}
                  task={t}
                  done={!!done[t.id]}
                  note={S.notes[t.id]}
                  subject={subjById[t.subject] || { color: '#888', label: t.subject }}
                  onToggle={() => toggleDone(t.id)}
                  onNote={(text) => S.updateNote(t.id, text)}
                  onTimer={() => setActiveTimerTask(t)}
                  onRemove={() => {
                    setConfirmData({
                      title: t('del_task_title'),
                      message: `"${t.title}" ${t('del_task_msg')}`,
                      onConfirm: () => S.removeTask(week.id, t.id)
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
                  const h = hoursMap[lastW] || { b1: 0, b2: 0, b3: 0 };
                  if ((h.b1 + h.b2 + h.b3) < 7) isLocked = true;
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
          <div style={{ padding: '0 24px 24px' }}>
            <div style={{ fontSize: 24, fontWeight: 900, color: '#fcd34d', marginBottom: 20, fontFamily: 'Archivo Black' }}>{t('achievements')}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ padding: 20, borderRadius: 24, background: 'linear-gradient(135deg, rgba(252,211,77,0.15), rgba(0,0,0,0.3))', border: '1.5px solid rgba(252,211,77,0.3)' }}>
                <div style={{ fontSize: 13, color: '#fcd34d', fontWeight: 800, marginBottom: 12, letterSpacing: 1 }}>{t('study').toUpperCase()} PROGRESS</div>
                <div style={{ fontSize: 26, fontWeight: 900, color: '#fff', lineHeight: 1.1 }}>{summary.doneCount} <span style={{ fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,0.6)' }}>{t('tasks_completed')}</span></div>
                <div style={{ height: 8, background: 'rgba(255,255,255,0.1)', borderRadius: 4, marginTop: 16, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: Math.min(100, (summary.doneCount / 12) * 100) + '%', background: 'linear-gradient(90deg, #fcd34d, #f59e0b)', borderRadius: 4, boxShadow: '0 0 10px #fcd34d60' }} />
                </div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 8, fontWeight: 600 }}>{12 - summary.doneCount} {t('tasks_left')} 🚀</div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                <div style={{ padding: 16, borderRadius: 20, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', textAlign: 'center' }}>
                  <div style={{ fontSize: 24, marginBottom: 4 }}>🔥</div>
                  <div style={{ fontSize: 16, fontWeight: 900, color: '#fff' }}>{streak.count}</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', fontWeight: 700 }}>{t('streak').toUpperCase()}</div>
                </div>
                <div style={{ padding: 16, borderRadius: 20, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', textAlign: 'center' }}>
                  <div style={{ fontSize: 24, marginBottom: 4 }}>✨</div>
                  <div style={{ fontSize: 16, fontWeight: 900, color: '#fff' }}>{summary.xp.toLocaleString()}</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', fontWeight: 700 }}>{t('total_xp').toUpperCase()}</div>
                </div>
              </div>

              <button onClick={() => setBadgesOpen(true)} style={{
                padding: '18px', borderRadius: 20, background: 'linear-gradient(135deg, #fcd34d, #d97706)',
                color: '#000', fontSize: 15, fontWeight: 900, border: 'none', cursor: 'pointer',
                boxShadow: '0 10px 25px rgba(217,119,6,0.3)', marginTop: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10
              }}>
                <span>🏆</span> {t('view_badges')}
              </button>
            </div>
          </div>
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
            <button key={n.id} onClick={() => { setTab(n.id); if (n.id === 'grow') setBadgesOpen(true); }} style={{
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
        <div onClick={() => setInfoOpen(false)} style={{
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
              <button onClick={() => setInfoOpen(false)} style={{
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
                  01. STT අතු 3 ක්‍රමය
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    { color: BRANCH_COLORS.b1, title: 'Branch 01 — Green', desc: 'Class / Recording: පන්තියට සහභාගී වීම හෝ Recordings බැලීම.' },
                    { color: BRANCH_COLORS.b2, title: 'Branch 02 — Blue', desc: 'Study / Short Notes: තනිවම පාඩම් කිරීම සහ සටහන් සෑදීම.' },
                    { color: BRANCH_COLORS.b3, title: 'Branch 03 — Pink', desc: 'Paper / Revision: ප්‍රශ්න පත්‍ර කිරීම හා අමාරු කොටස් ආවර්ජනය.' },
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

              {/* 3. XP System */}
              <section>
                <div style={{ fontSize: 13, fontWeight: 800, color: '#86efac', marginBottom: 6 }}>03. XP සහ දක්ෂතා (Gamification)</div>
                <ul style={{ paddingLeft: 16, margin: 0, display: 'flex', flexDirection: 'column', gap: 5 }}>
                  <li style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)' }}>සෑම පාඩම් පැයකටම <span style={{ color: '#4ade80', fontWeight: 700 }}>10 XP</span> බැගින් ලැබේ.</li>
                  <li style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)' }}>Task එකක් අවසන් කළ විට සහ දිගටම පාඩම් කරන විට (Streak) අමතර ලකුණු ලැබේ.</li>
                  <li style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)' }}>XP සියල්ල මුළු මාසයටම අදාළව (Monthly cumulative) ගණනය වේ.</li>
                </ul>
              </section>

              {/* 4. Timer & Focus */}
              <section style={{ background: 'rgba(56,189,248,0.05)', padding: 12, borderRadius: 14, border: '1px solid rgba(56,189,248,0.1)' }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: '#38bdf8', marginBottom: 6 }}>04. Pomodoro ටයිමරය</div>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', lineHeight: 1.5, margin: 0 }}>
                  අවධානය වැඩි කරගැනීමට ටයිමරය භාවිතා කරන්න. මෙහි ඇති <span style={{ color: '#fff' }}>Lofi Rain Music</span> ස්විච් එක මගින් පසුබිමින් වර්ෂා ශබ්දය සහ ලොෆි සංගීතය වාදනය කරගත හැක.
                </p>
              </section>

              {/* 5. Custom Tasks */}
              <section>
                <div style={{ fontSize: 13, fontWeight: 800, color: '#86efac', marginBottom: 6 }}>05. තමන්ගේම Tasks එකතු කිරීම</div>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', lineHeight: 1.5, margin: 0 }}>
                  පහළ ඇති <span style={{ color: '#4ade80' }}>"+"</span> බොත්තමෙන් ඔයාගේ පෞද්ගලික වැඩ එකතු කරන්න. මෙහිදී O/L විෂයන් 9 ම තෝරාගැනීමට අවස්ථාව ඇත.
                </p>
              </section>

              {/* 6. WhatsApp Channel */}
              <section style={{ textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 16 }}>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>වැඩිදුර උපදෙස් සඳහා සම්බන්ධ වන්න</div>
                <button onClick={() => window.open('https://www.whatsapp.com/channel/0029VasliMrFcowGIPn8ID2h', '_blank')} style={{
                  padding: '8px 16px', borderRadius: 10, background: '#25D366', color: '#fff', border: 'none',
                  fontSize: 12, fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: 6, cursor: 'pointer'
                }}>
                  Join CK Sir WhatsApp Channel 📢
                </button>
              </section>

            </div>

            {/* Footer */}
            <div style={{ padding: '16px 20px', background: 'rgba(0,0,0,0.3)' }}>
              <button onClick={() => setInfoOpen(false)} style={{
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

      {/* Notification panel */}
      {notifOpen && (
        <div onClick={() => setNotifOpen(false)} style={{
          position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)',
          zIndex: 100, backdropFilter: 'blur(6px)',
          display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
          paddingTop: 70, animation: 'sttFadeIn .15s',
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            width: '85%', maxWidth: 300,
            background: 'linear-gradient(180deg, #0f1f14, #050a06)',
            border: '1px solid rgba(74,222,128,0.3)',
            borderRadius: 14, padding: 14,
          }}>
            <div style={{ fontWeight: 700, fontSize: 12, color: '#86efac', marginBottom: 10, display: 'flex', justifyContent: 'space-between' }}>
              🔔 Reminders
              <button onClick={() => setNotifOpen(false)} style={{ color: 'rgba(240,253,244,0.72)', fontSize: 14 }}>✕</button>
            </div>
            {[
              { dot: '#f472b6', text: 'අද tasks 4ක් pending', time: '2 min', font: true },
              { dot: '#fcd34d', text: 'CK sir live class · 7.00 PM', time: '2h', font: true },
              { dot: '#4ade80', text: 'Week 4 deadline ළඟයි — 3 දවසයි', time: '1d', font: true },
            ].map((n, i) => (
              <div key={i} style={{
                padding: '8px 0', borderBottom: i < 2 ? '1px solid rgba(74,222,128,0.08)' : 'none',
                display: 'flex', gap: 8, alignItems: 'flex-start',
              }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: n.dot, marginTop: 4, boxShadow: `0 0 6px ${n.dot}` }} />
                <div style={{ flex: 1, fontSize: 11, color: '#f0fdf4', fontFamily: 'var(--stt-font-sinhala)' }}>{n.text}</div>
                <div style={{ fontSize: 9, color: 'rgba(240,253,244,0.72)' }}>{n.time}</div>
              </div>
            ))}
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
