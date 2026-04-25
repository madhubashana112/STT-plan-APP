// 3-branch tree — Class/Study/Paper — each branch is a different color.
// Each branch has 3 leaves (9 total); leaves light up based on branch progress ratio.

const TreeSVG = ({ branches, size = 200, glow = true, week = 1, theme = 'default' }) => {
  // branches: [{color, currentHrs, targetHrs}, ...] length 3
  
  let trunkColor = "#7c2d12"; // brown
  if (theme === 'sakura') trunkColor = "#4a3030";
  if (theme === 'magic') trunkColor = "#1e1b4b";

  // Leaf positions per branch (3 leaves each)
  const branchLeaves = [
    // LEFT branch
    [
      { cx: 42, cy: 82, r: 10 },
      { cx: 28, cy: 75, r: 12 },
      { cx: 48, cy: 68, r: 13 },
      { cx: 35, cy: 60, r: 15 },
      { cx: 22, cy: 58, r: 11 },
      { cx: 45, cy: 52, r: 12 },
      { cx: 32, cy: 45, r: 13 },
    ],
    // CENTER branch
    [
      { cx: 86, cy: 62, r: 10 },
      { cx: 102, cy: 58, r: 12 },
      { cx: 92, cy: 45, r: 15 },
      { cx: 78, cy: 45, r: 12 },
      { cx: 106, cy: 42, r: 11 },
      { cx: 85, cy: 30, r: 13 },
      { cx: 100, cy: 28, r: 12 },
    ],
    // RIGHT branch
    [
      { cx: 148, cy: 82, r: 10 },
      { cx: 162, cy: 75, r: 12 },
      { cx: 142, cy: 68, r: 13 },
      { cx: 155, cy: 60, r: 15 },
      { cx: 168, cy: 58, r: 11 },
      { cx: 145, cy: 52, r: 12 },
      { cx: 158, cy: 45, r: 13 },
    ],
  ];

  // Branch path (trunk + branch)
  const branchPaths = [
    // left branch
    "M 95 160 Q 82 130 60 110 Q 44 95 36 78",
    // center branch (just up)
    "M 95 160 L 95 130 Q 94 100 92 70",
    // right branch
    "M 95 160 Q 108 130 130 110 Q 146 95 154 78",
  ];

  const getSubBranches = () => {
    const subs = [];
    if (week >= 2) {
      subs.push("M 60 110 Q 75 95 78 85"); // Left inward
      subs.push("M 130 110 Q 115 95 112 85"); // Right inward
    }
    if (week >= 3) {
      subs.push("M 44 95 Q 30 90 24 85"); // Left outward
      subs.push("M 95 125 Q 80 110 75 95"); // Center left
      subs.push("M 146 95 Q 160 90 166 85"); // Right outward
    }
    if (week >= 4) {
      subs.push("M 95 125 Q 110 110 115 95"); // Center right
      subs.push("M 36 78 Q 20 65 22 58"); // Left top out
      subs.push("M 154 78 Q 170 65 168 58"); // Right top out
    }
    return subs;
  };
  
  const treeScale = Math.min(1, 0.7 + (week * 0.08));
  const maxLeaves = [1, 3, 5, 7][Math.min(week - 1, 3)];

  return (
    <svg viewBox="0 0 190 190" width={size} height={size} style={{ overflow: 'visible' }}>
      <style>{`
        @keyframes sttSway {
          0%, 100% { transform: rotate(-0.5deg); }
          50% { transform: rotate(0.5deg); }
        }
        @keyframes sttLeafPulse {
          0%, 100% { transform: scale(1); filter: brightness(1); }
          50% { transform: scale(1.08); filter: brightness(1.3); }
        }
        .stt-tree-group {
          transform-origin: bottom center;
        }
        .stt-leaf-lit {
          transform-origin: center;
        }
      `}</style>
      <defs>
        {branches.map((b, i) => {
          const uid = b.color.replace('#', '');
          let mainColor = b.color;
          if (theme === 'sakura') {
            mainColor = ['#fbcfe8', '#f472b6', '#be185d'][i];
          } else if (theme === 'magic') {
            mainColor = ['#c084fc', '#a78bfa', '#818cf8'][i];
          }
          return (
            <React.Fragment key={i}>
              <radialGradient id={`leafGlow-${uid}`}>
                <stop offset="0%" stopColor={mainColor} stopOpacity="0.6"/>
                <stop offset="100%" stopColor={mainColor} stopOpacity="0"/>
              </radialGradient>
              <linearGradient id={`leafFill-${uid}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={mainColor}/>
                <stop offset="100%" stopColor={mainColor} stopOpacity="0.5"/>
              </linearGradient>
            </React.Fragment>
          );
        })}
      </defs>

      {/* Ground shadow */}
      <ellipse cx="95" cy="178" rx="50" ry="5" fill="#000" opacity="0.4" />

      <g className="stt-tree-group" style={{ transform: `scale(${treeScale})`, transformOrigin: '95px 180px', transition: 'transform 0.6s ease' }}>
        {/* Trunk (below split) */}
        <path d="M 95 180 L 95 160"
              stroke={trunkColor} strokeWidth="10" strokeLinecap="round" fill="none"/>

        {/* 3 Branches — brown */}
        {branches.map((b, i) => (
          <path key={i} d={branchPaths[i]}
                stroke={trunkColor}
                strokeWidth="7" strokeLinecap="round" fill="none"
                opacity="0.95"/>
        ))}
        {/* Sub-branches */}
        {getSubBranches().map((subPath, i) => (
          <path key={`sub-${i}`} d={subPath}
                stroke={trunkColor}
                strokeWidth="5" strokeLinecap="round" fill="none"
                opacity="0.95"/>
        ))}

      {/* Leaves per branch */}
      {branches.map((b, bi) => {
        const lit = b.currentHrs || 0;
        const uid = b.color.replace('#', '');
        return branchLeaves[bi].map((lf, li) => {
          const isLit = li < lit;
          return (
            <g key={`${bi}-${li}`} 
               className={isLit ? 'stt-leaf-lit' : ''}
               style={{
                 transformOrigin: `${lf.cx}px ${lf.cy}px`
               }}>
              {isLit && glow && (
                <circle cx={lf.cx} cy={lf.cy} r={lf.r * 1.5}
                        fill={mainColor} opacity="0.3" />
              )}
              <circle
                cx={lf.cx} cy={lf.cy} r={lf.r * 1.15}
                fill={isLit ? mainColor : 'rgba(255,255,255,0.03)'}
                stroke={isLit ? 'none' : `rgba(255,255,255,0.15)`}
                strokeWidth={isLit ? 0 : 1}
                strokeDasharray={isLit ? '0' : '3 3'}
                strokeOpacity={isLit ? 1 : 0.4}
                style={{
                  transformOrigin: `${lf.cx}px ${lf.cy}px`,
                  transform: isLit ? 'scale(1)' : 'scale(0.85)',
                }}
              />
              {isLit && (
                <ellipse cx={lf.cx - lf.r/2.5} cy={lf.cy - lf.r/2.5}
                        rx={lf.r/2.5} ry={lf.r/4} fill="#fff" opacity="0.6"
                        transform={`rotate(-30, ${lf.cx - lf.r/2.5}, ${lf.cy - lf.r/2.5})`} />
              )}
            </g>
          );
        });
      })}
      </g>
    </svg>
  );
};

// Mini tree icon for tabs/nav — 3 colored clusters
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
