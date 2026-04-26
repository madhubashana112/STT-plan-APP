const TreeSVG = ({ branches, progress, color, size = 200, glow = true, week = 1, theme = 'default', season = 'spring', flowers = false }) => {
  const treeId = React.useMemo(() => Math.random().toString(36).substr(2, 9), []);
  
  let finalBranches = branches;
  if (!finalBranches && color) {
    const litCount = Math.floor((progress || 0) * 7);
    finalBranches = [
      { color, currentHrs: litCount },
      { color, currentHrs: litCount },
      { color, currentHrs: litCount },
      { color, currentHrs: litCount },
    ];
  }

  if (!finalBranches || !Array.isArray(finalBranches)) return <div style={{width: size, height: size}} />;
  
  const weekInMonth = ((week - 1) % 4) + 1;
  const trunkColor = "#5d2710";
  const highlightColor = "#92400e";

  const getSeasonalColor = (baseColor, index) => {
    if (season === 'autumn') return ['#ea580c', '#f59e0b', '#dc2626', '#b45309'][index] || baseColor;
    if (season === 'winter') return ['#f1f5f9', '#94a3b8', '#38bdf8', '#0284c7'][index] || baseColor;
    if (season === 'summer') return ['#15803d', '#16a34a', '#22c55e', '#4ade80'][index] || baseColor;
    return baseColor;
  };

  // Dramatic growth parameters - Adjusted for larger week 1
  const trunkWidth = 6 + (weekInMonth * 3.5); // 9.5 to 20
  const treeScale = 0.65 + (weekInMonth * 0.1); // 0.75 to 1.05
  const branchReach = [0.6, 0.75, 0.9, 1.0][weekInMonth - 1]; 
  const foliageScale = 0.65 + (weekInMonth * 0.1); 

  const branchPaths = [
    `M 100 160 Q ${100 - 45 * branchReach} ${160 - 20 * branchReach} ${100 - 90 * branchReach} ${160 - 90 * branchReach}`,
    `M 100 160 Q ${100 - 20 * branchReach} ${160 - 40 * branchReach} ${100 - 35 * branchReach} ${160 - 120 * branchReach}`,
    `M 100 160 Q ${100 + 20 * branchReach} ${160 - 40 * branchReach} ${100 + 35 * branchReach} ${160 - 120 * branchReach}`,
    `M 100 160 Q ${100 + 45 * branchReach} ${160 - 20 * branchReach} ${100 + 90 * branchReach} ${160 - 90 * branchReach}`
  ];

  const foliageClusters = [
    { cx: 100 - 90 * branchReach, cy: 160 - 90 * branchReach, r: 24 * foliageScale },
    { cx: 100 - 35 * branchReach, cy: 160 - 120 * branchReach, r: 24 * foliageScale },
    { cx: 100 + 35 * branchReach, cy: 160 - 120 * branchReach, r: 24 * foliageScale },
    { cx: 100 + 90 * branchReach, cy: 160 - 90 * branchReach, r: 24 * foliageScale }
  ];

  return (
    <svg viewBox="0 0 200 200" width={size} height={size} style={{ overflow: 'visible' }}>
      <style>{`
        @keyframes sttSway { 0%, 100% { transform: rotate(-0.5deg); } 50% { transform: rotate(0.5deg); } }
        @keyframes sttLeafPulse { 0%, 100% { filter: brightness(1); } 50% { filter: brightness(1.15); } }
        .stt-tree-group { transform-origin: bottom center; animation: sttSway 5s ease-in-out infinite; }
        .stt-foliage-lit { animation: sttLeafPulse 4s ease-in-out infinite; }
      `}</style>
      
      <defs>
        {finalBranches.map((b, i) => {
          const mainColor = getSeasonalColor(b.color, i);
          const uid = mainColor.replace('#', '');
          return (
            <React.Fragment key={i}>
              <radialGradient id={`foliageGlow-${treeId}-${uid}`}>
                <stop offset="0%" stopColor={mainColor} stopOpacity="0.5"/>
                <stop offset="100%" stopColor={mainColor} stopOpacity="0"/>
              </radialGradient>
              <linearGradient id={`foliageFill-${treeId}-${uid}`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={mainColor}/>
                <stop offset="100%" stopColor={mainColor} stopOpacity="0.7"/>
              </linearGradient>
            </React.Fragment>
          );
        })}
        <linearGradient id={`trunkGrad-${treeId}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#451a03"/>
          <stop offset="50%" stopColor="#7c2d12"/>
          <stop offset="100%" stopColor="#451a03"/>
        </linearGradient>
      </defs>

      <ellipse cx="100" cy="192" rx={35 + weekInMonth * 10} ry="6" fill="#000" opacity="0.3" />
      
      {/* Roots - only show later weeks */}
      <g opacity={weekInMonth > 2 ? 1 : 0} style={{ transition: 'opacity 1s' }}>
        <ellipse cx="100" cy="188" rx={25 + weekInMonth * 6} ry="8" fill="#2d1a0a" />
        <path d="M 80 188 Q 85 178 90 188 M 110 188 Q 115 178 120 188" stroke="#166534" strokeWidth="2" fill="none" />
      </g>

      <g className="stt-tree-group" style={{ transform: `scale(${treeScale})`, transformOrigin: '100px 190px', transition: 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
        
        {/* Trunk maturation: Majestic multi-strand base even from week 1 */}
        <g>
          <path d="M 94 190 Q 97 175 100 160" stroke={`url(#trunkGrad-${treeId})`} strokeWidth={trunkWidth} strokeLinecap="round" fill="none" />
          <path d="M 106 190 Q 103 175 100 160" stroke={`url(#trunkGrad-${treeId})`} strokeWidth={trunkWidth} strokeLinecap="round" fill="none" />
        </g>
        
        {/* Branches - split from a higher point for a clearer trunk */}
        {finalBranches.map((b, i) => (
          <g key={i}>
            <path d={branchPaths[i]} stroke={`url(#trunkGrad-${treeId})`} strokeWidth={trunkWidth * 0.6} strokeLinecap="round" fill="none" opacity="0.98" style={{ transition: 'd 1s' }} />
            <path d={branchPaths[i]} stroke={highlightColor} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.2" strokeDasharray="4 8" />
          </g>
        ))}

        {/* Foliage Clusters */}
        {finalBranches.map((b, bi) => {
          const lit = b.currentHrs || 0;
          const ratio = lit / 7;
          const mainColor = getSeasonalColor(b.color, bi);
          const uid = mainColor.replace('#', '');
          const cl = foliageClusters[bi];

          return (
            <g key={bi} className={ratio > 0 ? 'stt-foliage-lit' : ''} style={{ transformOrigin: `${cl.cx}px ${cl.cy}px`, transition: 'all 1s' }}>
              {ratio > 0 && glow && (
                <circle cx={cl.cx} cy={cl.cy} r={cl.r * (1.2 + ratio)} fill={`url(#foliageGlow-${treeId}-${uid})`} style={{ mixBlendMode: 'screen', transition: 'r 0.5s' }} />
              )}
              
              {[...Array(7)].map((_, li) => {
                const angle = (li / 7) * Math.PI * 2;
                const dist = cl.r * 0.45;
                const lcx = cl.cx + Math.cos(angle) * dist;
                const lcy = cl.cy + Math.sin(angle) * dist;
                const isLit = li < lit;
                
                return (
                  <circle
                    key={li}
                    cx={lcx} cy={lcy} r={cl.r * 0.7}
                    fill={isLit ? `url(#foliageFill-${treeId}-${uid})` : 'rgba(255,255,255,0.03)'}
                    stroke={isLit ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)'}
                    strokeWidth="1"
                    style={{
                      transition: 'all 800ms ease',
                      filter: isLit ? `drop-shadow(0 0 8px ${mainColor}55)` : 'none',
                      transform: isLit ? 'scale(1)' : 'scale(0.8)',
                      transformOrigin: `${lcx}px ${lcy}px`
                    }}
                  />
                );
              })}
            </g>
          );
        })}
      </g>
    </svg>
  );
};

const TreeIcon = ({ size = 20, colors = ['#4ade80', '#2dd4bf', '#f472b6'] }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
    <circle cx="7" cy="9" r="3.5" fill={colors[0]}/>
    <circle cx="12" cy="6" r="4" fill={colors[1]}/>
    <circle cx="17" cy="9" r="3.5" fill={colors[2]}/>
    <rect x="11" y="13" width="2" height="7" fill="#a16207" rx="1"/>
  </svg>
);

window.TreeSVG = TreeSVG;
window.TreeIcon = TreeIcon;
