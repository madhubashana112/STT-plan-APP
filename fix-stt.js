import fs from 'fs';
const path = 'C:\\Users\\MSI\\.gemini\\antigravity\\scratch\\ck-sir-stt-plan\\ck-sir-stt-planv1-2\\project\\stt-app.jsx';
let content = fs.readFileSync(path, 'utf8');

const topBarCode = `
          <div style={{ padding: '14px 16px 4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
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
                }}/>
              </button>
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: 'linear-gradient(135deg, #4ade80, #166534)',
                color: '#0a0e0b', fontWeight: 800, fontSize: 11,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '1px solid rgba(134,239,172,0.4)',
                boxShadow: '0 0 10px rgba(74,222,128,0.3)',
                fontFamily: 'var(--stt-font-sinhala)',
                textTransform: 'uppercase'
              }}>
                {S.superName ? S.superName.slice(0, 2) : 'DD'}
              </div>
            </div>
          </div>
`;

const startMarker = '<StarBg/>';
const endMarker = '{/* ── Bottom nav with FAB ── */}';

const startIndex = content.indexOf(startMarker) + startMarker.length;
const endIndex = content.indexOf(endMarker);

if (startIndex > startMarker.length && endIndex > startIndex) {
    const newMainContent = \`
      \${topBarCode}

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
                Super<br/>Three
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
              <StatCard label={t('streak')} icon="🔥" value={streak.count || 12} unit={t('days')} color="#4ade80"/>
              <StatCard label={t('xp')} icon="✨" value={xp.toLocaleString() || '1,240'} color="#86efac"/>
              <StatCard label={t('grade')} icon="🎓" value={userGrade} color="#22d3a0"/>
            </div>

            {/* ── Month tabs ── */}
            <div style={{ padding: '0 0 8px' }}>
              <div style={{ padding: '0 16px', fontSize: 11, fontWeight: 800, color: '#4ade80', marginBottom: 6, opacity: 0.8, letterSpacing: 1 }}>SELECT MONTH</div>
              <div className="stt-scroll" style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '0 16px 4px' }}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(m => <MonthTab key={m} m={m}/>)}
              </div>
            </div>

            {/* ── Week tabs (filtered by activeMonth) ── */}
            <div style={{ padding: '0 16px 14px' }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: '#4ade80', marginBottom: 6, opacity: 0.8, letterSpacing: 1 }}>SELECT WEEK</div>
              <div style={{ display: 'flex', gap: 6 }}>
                {data.weeks.filter(w => w.month === activeMonth).map(w => <WeekTab key={w.id} w={w}/>)}
              </div>
            </div>

            {/* ── Today leaf map (big tree) ── */}
            <div style={{ padding: '0 16px 10px' }}>
              <TodayLeafMap/>
            </div>

            {/* ── 3 branch hour counters ── */}
            <div style={{ padding: '0 16px 12px' }}>
              <BranchCounters/>
            </div>

            {/* ── Analytics ── */}
            <StudyAnalytics/>

            {/* Active week task list (scrolls below) */}
            <div style={{ padding: '4px 14px 0' }}>
              <div style={{ fontSize: 11, color: week.color, letterSpacing: 1.5, fontWeight: 800, marginBottom: 4, textShadow: \\\`0 0 8px \\\${week.color}60\\\` }}>
                {week.tree} · TASKS
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, fontFamily: 'var(--stt-font-sinhala)', marginBottom: 10, color: '#ffffff' }}>
                {week.title}
              </div>
            </div>
            <div style={{ padding: '0 14px' }}>
              {week.tasks.length === 0 && (
                <div style={{ textAlign: 'center', padding: 20, color: 'rgba(240,253,244,0.5)', fontSize: 13, fontFamily: 'var(--stt-font-sinhala)' }}>
                  තාමත් Tasks මුකුත් නෑ. පහළ තියෙන බොත්තම ඔබලා අලුත් Task එකක් හදන්න.
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
                      title: 'Task එක මකන්නද?',
                      message: \\\`"\\\${t.title}" Task එක ස්ථිරවම ඉවත් කිරීමට ඔබට විශ්වාසද?\\\`,
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
                + අලුත් Task එකක් එකතු කරන්න
              </button>
            </div>
          </>
        )}

        {tab === 'weeks' && (
          <div style={{ padding: '0 20px 20px' }}>
            <div style={{ fontSize: 24, fontWeight: 900, color: '#4ade80', marginBottom: 20, fontFamily: 'Archivo Black' }}>Study Roadmap</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
              {[1,2,3,4,5,6,7,8,9,10,11,12].map(m => {
                let isLocked = false;
                if (m > userStartMonth) {
                  const prevM = m - 1;
                  const lastW = prevM * 4;
                  const h = hoursMap[lastW] || {b1:0,b2:0,b3:0};
                  if ((h.b1+h.b2+h.b3) < 7) isLocked = true;
                }
                return (
                  <div key={m} onClick={() => { if(!isLocked) { setActiveMonth(m); setTab('home'); } }} style={{
                    padding: 16, borderRadius: 20, background: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))',
                    border: '1.5px solid ' + (isLocked ? 'rgba(255,255,255,0.1)' : '#4ade80'),
                    textAlign: 'center', opacity: isLocked ? 0.5 : 1, cursor: isLocked ? 'default' : 'pointer',
                    boxShadow: isLocked ? 'none' : '0 4px 15px rgba(74,222,128,0.1)'
                  }}>
                    <div style={{ fontSize: 28, marginBottom: 8 }}>{isLocked ? '🔒' : '📅'}</div>
                    <div style={{ fontSize: 14, fontWeight: 900, color: '#fff' }}>Month {m}</div>
                    <div style={{ fontSize: 11, color: '#a7f3d0', marginTop: 2 }}>{MONTH_NAMES[m-1]}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {tab === 'me' && (
          <div style={{ padding: '0 24px 24px' }}>
            <div style={{ textAlign: 'center', marginBottom: 30 }}>
              <div style={{ 
                width: 100, height: 100, borderRadius: '50%', 
                background: 'linear-gradient(135deg, #4ade80, #166534)', 
                margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                fontSize: 36, border: '2.5px solid rgba(134,239,172,0.5)', 
                boxShadow: '0 0 30px rgba(74,222,128,0.25)' 
              }}>
                {S.superName ? S.superName.slice(0, 2).toUpperCase() : 'ST'}
              </div>
              <div style={{ fontSize: 24, fontWeight: 900, color: '#fff' }}>{S.superName}</div>
              <div style={{ fontSize: 14, color: '#a7f3d0', opacity: 0.8, marginTop: 4 }}>Grade {userGrade} Student</div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 24, padding: 20, border: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>Grade</span>
                <span style={{ fontSize: 14, fontWeight: 800, color: '#fff' }}>Grade {userGrade}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>Total XP Earned</span>
                <span style={{ fontSize: 14, fontWeight: 800, color: '#fcd34d' }}>{xp.toLocaleString()} ✨</span>
              </div>
              <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', margin: '8px 0' }}/>
              <button onClick={onLogout} style={{
                width: '100%', padding: '16px', borderRadius: 16, background: 'rgba(239,68,68,0.1)',
                border: '1px solid rgba(239,68,68,0.25)', color: '#ef4444', fontSize: 15, fontWeight: 900,
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
              }}>
                <span>🚪</span> Logout Account
              </button>
            </div>
          </div>
        )}
      </div>
    \`;

    const finalContent = content.substring(0, startIndex) + '\\n\\n' + newMainContent + '\\n' + content.substring(endIndex);
    fs.writeFileSync(path, finalContent, 'utf8');
    console.log('Successfully refactored MainApp.');
}
