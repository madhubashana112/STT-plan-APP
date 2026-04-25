// 3-branch tree — Class/Study/Paper — each branch is a different color.
// Each branch has 7 leaves (21 total); leaves light up based on branch progress ratio.

const TreeSVG = ({ branches, progress, color, size = 200, glow = true, week = 1, theme = 'default', season = 'spring', flowers = false }) => {
  const treeId = React.useMemo(() => Math.random().toString(36).substr(2, 9), []);
  // Fallback for single color/progress usage (backward compatibility)
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
  
  let trunkColor = "#7c2d12"; // brown
  if (theme === 'sakura') trunkColor = "#4a3030";
  if (theme === 'magic') trunkColor = "#1e1b4b";

  // Season overrides for colors
  const getSeasonalColor = (baseColor, index) => {
    if (season === 'autumn') return ['#ea580c', '#f59e0b', '#dc2626', '#b45309'][index] || baseColor;
    if (season === 'winter') return ['#f1f5f9', '#94a3b8', '#38bdf8', '#0284c7'][index] || baseColor;
    if (season === 'summer') return ['#15803d', '#16a34a', '#22c55e', '#4ade80'][index] || baseColor;
    // spring / default uses original branch colors
    if (theme === 'sakura') return ['#fbcfe8', '#f472b6', '#be185d', '#831843'][index] || baseColor;
    if (theme === 'magic') return ['#c084fc', '#a78bfa', '#818cf8', '#6366f1'][index] || baseColor;
    return baseColor;
  };

  const branchLeaves = [
    [{ cx: 10, cy: 98, r: 10 }, { cx: -3, cy: 96, r: 10 }, { cx: 18, cy: 87, r: 12 }, { cx: -15, cy: 85, r: 12 }, { cx: 12, cy: 75, r: 11 }, { cx: -8, cy: 73, r: 11 }, { cx: 2, cy: 65, r: 10 }],
    [{ cx: 58, cy: 68, r: 10 }, { cx: 45, cy: 66, r: 10 }, { cx: 65, cy: 57, r: 12 }, { cx: 35, cy: 55, r: 12 }, { cx: 60, cy: 45, r: 11 }, { cx: 40, cy: 43, r: 11 }, { cx: 50, cy: 35, r: 10 }],
    [{ cx: 132, cy: 66, r: 10 }, { cx: 145, cy: 68, r: 10 }, { cx: 125, cy: 55, r: 12 }, { cx: 155, cy: 57, r: 12 }, { cx: 130, cy: 43, r: 11 }, { cx: 150, cy: 45, r: 11 }, { cx: 140, cy: 35, r: 10 }],
    [{ cx: 180, cy: 96, r: 10 }, { cx: 193, cy: 98, r: 10 }, { cx: 172, cy: 85, r: 12 }, { cx: 205, cy: 87, r: 12 }, { cx: 178, cy: 73, r: 11 }, { cx: 198, cy: 75, r: 11 }, { cx: 188, cy: 65, r: 10 }]
  ];

  const branchPaths = [
    "M 95 160 Q 45 140 25 100 Q 15 80 2 65",
    "M 95 160 Q 75 130 65 95 Q 55 65 50 35",
    "M 95 160 Q 115 130 125 95 Q 135 65 140 35",
    "M 95 160 Q 145 140 165 100 Q 175 80 188 65"
  ];

  const weekInMonth = ((week - 1) % 4) + 1;

  const getSubBranches = () => {
    const subs = [];
    if (weekInMonth >= 2) { 
      subs.push("M 20 105 Q 28 100 30 90"); 
      subs.push("M 170 105 Q 162 100 160 90"); 
    }
    if (weekInMonth >= 3) { 
      subs.push("M 15 80 Q 5 75 0 70"); 
      subs.push("M 62 100 Q 50 90 48 80"); 
      subs.push("M 128 100 Q 140 90 142 80"); 
    }
    if (weekInMonth >= 4) { 
      subs.push("M 55 65 Q 65 55 68 45"); 
      subs.push("M 135 65 Q 125 55 122 45"); 
      subs.push("M 175 80 Q 185 75 190 70"); 
    }
    return subs;
  };

  const treeScale = [0.55, 0.7, 0.85, 1.0][weekInMonth - 1];

  return (
    <svg viewBox="0 0 190 190" width={size} height={size} style={{ overflow: 'visible' }}>
      <style>{`
        @keyframes sttSway { 0%, 100% { transform: rotate(-0.5deg); } 50% { transform: rotate(0.5deg); } }
        @keyframes sttLeafPulse { 0%, 100% { transform: scale(1); filter: brightness(1); } 50% { transform: scale(1.08); filter: brightness(1.3); } }
        @keyframes sttFlowerPop { 0% { transform: scale(0); } 100% { transform: scale(1); } }
        .stt-tree-group { transform-origin: bottom center; animation: sttSway 4s ease-in-out infinite; }
        .stt-leaf-lit { transform-origin: center; animation: sttLeafPulse 3s ease-in-out infinite; }
        .stt-flower { transform-origin: center; animation: sttFlowerPop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
      `}</style>
      <defs>
        {finalBranches.map((b, i) => {
          const mainColor = getSeasonalColor(b.color, i);
          const uid = mainColor.replace('#', '');
          return (
            <React.Fragment key={i}>
              <radialGradient id={`leafGlow-${treeId}-${uid}`}>
                <stop offset="0%" stopColor={mainColor} stopOpacity="0.6"/>
                <stop offset="100%" stopColor={mainColor} stopOpacity="0"/>
              </radialGradient>
              <linearGradient id={`leafFill-${treeId}-${uid}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={mainColor}/>
                <stop offset="100%" stopColor={mainColor} stopOpacity="0.5"/>
              </linearGradient>
            </React.Fragment>
          );
        })}
      </defs>

      <ellipse cx="95" cy="178" rx="50" ry="5" fill="#000" opacity="0.4" />

      <g className="stt-tree-group" style={{ transform: `scale(${treeScale})`, transformOrigin: '95px 180px', transition: 'transform 0.6s ease' }}>
        {/* Trunk & Branches with dynamic thickness */}
        <path d="M 95 180 L 95 160" stroke={trunkColor} strokeWidth={8 + weekInMonth * 1.5} strokeLinecap="round" fill="none"/>
        {finalBranches.map((b, i) => (
          <path key={i} d={branchPaths[i]} stroke={trunkColor} strokeWidth={5 + weekInMonth * 1.2} strokeLinecap="round" fill="none" opacity="0.95"/>
        ))}
        {getSubBranches().map((subPath, i) => (
          <path key={`sub-${i}`} d={subPath} stroke={trunkColor} strokeWidth={3 + weekInMonth * 0.8} strokeLinecap="round" fill="none" opacity="0.95"/>
        ))}

        {finalBranches.map((b, bi) => {
          const lit = b.currentHrs || 0;
          const mainColor = getSeasonalColor(b.color, bi);
          const uid = mainColor.replace('#', '');
          const isFull = lit >= 7;

          return branchLeaves[bi].map((lf, li) => {
            const isLit = li < lit;
            const hasFlower = flowers && isFull && (li === 3 || li === 6); // Add flowers to full branches
            
            return (
              <g key={`${bi}-${li}`} className={isLit ? 'stt-leaf-lit' : ''} style={{ transformOrigin: `${lf.cx}px ${lf.cy}px` }}>
                {isLit && glow && (
                  <circle cx={lf.cx} cy={lf.cy} r={lf.r * 1.6} fill={`url(#leafGlow-${treeId}-${uid})`} style={{ mixBlendMode: 'screen' }} />
                )}
                <circle
                  cx={lf.cx} cy={lf.cy} r={lf.r}
                  fill={isLit ? `url(#leafFill-${treeId}-${uid})` : 'rgba(255,255,255,0.03)'}
                  stroke={isLit ? 'rgba(255,255,255,0.4)' : `rgba(255,255,255,0.15)`}
                  strokeWidth={isLit ? 1.5 : 1}
                  strokeDasharray={isLit ? 'none' : '3 3'}
                  style={{
                    transition: 'all 600ms',
                    filter: isLit && glow ? `drop-shadow(0 0 5px ${mainColor})` : 'none',
                    transformOrigin: `${lf.cx}px ${lf.cy}px`,
                    transform: isLit ? 'scale(1)' : 'scale(0.85)',
                  }}
                />
                {hasFlower && (
                  <g className="stt-flower" style={{ transform: `translate(${lf.cx}px, ${lf.cy}px) translate(-6px, -12px)` }}>
                    <path d="M6 2 Q8 0 10 2 Q12 4 10 6 Q8 8 6 6 Q4 4 6 2" fill="#fff" />
                    <circle cx="6" cy="4" r="1.5" fill="#fcd34d" />
                  </g>
                )}
                {isLit && (
                  <ellipse cx={lf.cx - lf.r/2.5} cy={lf.cy - lf.r/2.5} rx={lf.r/2.5} ry={lf.r/4} fill="#fff" opacity="0.6" transform={`rotate(-30, ${lf.cx - lf.r/2.5}, ${lf.cy - lf.r/2.5})`} />
                )}
              </g>
            );
          });
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
