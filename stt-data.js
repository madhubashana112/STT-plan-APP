// Mock science STT task data for Grade 10-11 (January)
// 4 weeks ("trees"), 3 tasks per week, 12 tasks total.

window.STT_DATA = {
  student: {
    superName: "Super Scientist",
    grade: 11,
    examDaysLeft: 123,
    totalWeeksLeft: 11,
    startDate: "23 ඇප් 26",
    targetDate: "1 ඔක් 27",
    monthsLeft: 19,
  },
  // 3 STT branches — Class/Recording, Study/Short Notes, Paper/Revision
  branches: [
    {
      id: "class",
      label: "Class / Recording",
      labelSi: "පන්ති / Recording",
      color: "#4ade80",         // green
      colorDark: "#166534",
      targetHrs: 8,
      currentHrs: 5,
      icon: "🎓",
    },
    {
      id: "study",
      label: "Study / Short Notes",
      labelSi: "පාඩම් / Short Notes",
      color: "#2dd4bf",         // teal
      colorDark: "#0f766e",
      targetHrs: 6,
      currentHrs: 4,
      icon: "📝",
    },
    {
      id: "paper",
      label: "Paper / Revision",
      labelSi: "Paper / Revision",
      color: "#f472b6",         // pink
      colorDark: "#be185d",
      targetHrs: 4,
      currentHrs: 2,
      icon: "📄",
    },
  ],
  quotes: [
    "කුඩා පියවර, මහා ජයග්‍රහණ: අද දවසේ ඔබ කරන කුඩා කැපකිරීම්, හෙට දවසේ මහා ජයග්‍රහණයක අත්තිවාරමයි. — CK sir",
    "සැලැස්මේ බලය: සැලැස්මක් නැතිව පාඩම් කිරීම, මාලිමාවක් නැතිව නැවක් පැදවීම වැනිය. STT සැලැස්මට අනුව වැඩ කරන්න. — CK sir",
    "අධිෂ්ඨානයේ ශක්තිය: ජයග්‍රහණය තීරණය වන්නේ ඔබේ බුද්ධිය මත පමණක් නොව, 'මට පුළුවන්' කියන ඔබේ නොසැලෙන අධිෂ්ඨානය මතය. — CK sir",
    "කාලය රත්තරන්: කාලය කළමනාකරණය කිරීම යනු ඔබේ අනාගතය කළමනාකරණය කිරීමයි. එක විනාඩියක්වත් අපතේ නොහරින්න. — CK sir",
    "නැවත නැගිටීම: වැටීම පරාජයක් නොවේ; වැටුණු තැනම නතර වීම පරාජයයි. සෑම අසාර්ථකත්වයකින්ම ඉගෙනගෙන නැවත නැගිටින්න. — CK sir",
    "ඒකායන අරමුණ: අවධානය එක තැනක තබා ගන්න. එකවර එක අරමුණක් ජය ගැනීමට වෙහෙසීම සාර්ථකත්වයේ රහසයි. — CK sir",
    "ක්‍රමවත් බව: වසරක් පුරා කරන අවිධිමත් පාඩම් කිරීමට වඩා, මාසයක් පුරා කරන ක්‍රමවත්, දිනපතා පාඩම් කිරීම ඵලදායී වේ. — CK sir",
    "දැනුම සහ භාවිතය: පොත් කියවීමෙන් පමණක් ප්‍රඥාව නොලැබේ; උගත් දේ ප්‍රායෝගිකව ගැටලු විසඳීමට භාවිතා කිරීමට පුරුදු වන්න. — CK sir",
    "දුෂ්කර මග, මිහිරි ඵල: ජයග්‍රහණය කරා යන මාර්ගය කටුක හා දුෂ්කර විය හැක; නමුත් එහි අවසාන ප්‍රතිඵලය ඉතා මිහිරි වනු ඇත. — CK sir",
    "ආත්ම විශ්වාසය: ලෝකයම ඔබ ගැන සැක කළත්, ඔබ ඔබ ගැන විශ්වාස කරන්න. ඔබ තුළ ඇති විභවය අසීමිතය. — CK sir",
  ],
  subjects: [
    { id: "sci",  label: "විද්‍යාව", color: "#4ade80" },
    { id: "math", label: "ගණිතය", color: "#a78bfa" },
    { id: "sin",  label: "සිංහල", color: "#fb923c" },
    { id: "eng",  label: "ඉංග්‍රීසි", color: "#f472b6" },
    { id: "his",  label: "ඉතිහාසය", color: "#eab308" },
    { id: "rel",  label: "ආගම", color: "#38bdf8" },
    { id: "cat1", label: "Group 1", color: "#2dd4bf" },
    { id: "cat2", label: "Group 2", color: "#94a3b8" },
    { id: "cat3", label: "Group 3", color: "#ef4444" },
  ],
  weeks: [
    // Month 1: January
    { id: 1, tree: "TREE 01", stage: "Tiny Seedling", stageSi: "පැළයක්", targetHrs: 7, title: "Week 01 — මූලික අත්තිවාරම", subtitle: "පටන් ගන්න.", color: "#4ade80", tasks: [], month: 1 },
    { id: 2, tree: "TREE 02", stage: "Small Tree", stageSi: "පොඩි ගහ", targetHrs: 7, title: "Week 02 — practice", subtitle: "දැනගත්ත දේවල් අතේ තියන්න.", color: "#22d3a0", tasks: [], month: 1 },
    { id: 3, tree: "TREE 03", stage: "Young Tree", stageSi: "තරුණ ගහ", targetHrs: 7, title: "Week 03 — structured", subtitle: "Essay answer වලට වෙලාව මකන්න.", color: "#10b981", tasks: [], month: 1 },
    { id: 4, tree: "TREE 04", stage: "Full Tree", stageSi: "පූර්ණ ගහ", targetHrs: 7, title: "Week 04 — monthly mock", subtitle: "මාසෙ අන්තිමට full mock එක.", color: "#059669", tasks: [], month: 1 },
    // Month 2: February
    { id: 5, tree: "TREE 01", stage: "Tiny Seedling", stageSi: "පැළයක්", targetHrs: 7, title: "Week 05 — New Theory", subtitle: "අලුත් දේවල් ඉගෙන ගමු.", color: "#38bdf8", tasks: [], month: 2 },
    { id: 6, tree: "TREE 02", stage: "Small Tree", stageSi: "පොඩි ගහ", targetHrs: 7, title: "Week 06 — Speed test", subtitle: "වේගය වැඩි කරගන්න.", color: "#0ea5e9", tasks: [], month: 2 },
    { id: 7, tree: "TREE 03", stage: "Young Tree", stageSi: "තරුණ ගහ", targetHrs: 7, title: "Week 07 — Hard problems", subtitle: "අමාරු දේවල් ලේසි කරගන්න.", color: "#0284c7", tasks: [], month: 2 },
    { id: 8, tree: "TREE 04", stage: "Full Tree", stageSi: "පූර්ණ ගහ", targetHrs: 7, title: "Week 08 — Evaluation", subtitle: "පරීක්ෂණයට සූදානම් වෙන්න.", color: "#0369a1", tasks: [], month: 2 },
    // Month 3: March
    { id: 9, tree: "TREE 01", stage: "Tiny Seedling", stageSi: "පැළයක්", targetHrs: 7, title: "Week 09 — Revision 01", subtitle: "ආවර්ජනය පටන් ගමු.", color: "#f472b6", tasks: [], month: 3 },
    { id: 10, tree: "TREE 02", stage: "Small Tree", stageSi: "පොඩි ගහ", targetHrs: 7, title: "Week 10 — MCQ practice", subtitle: "MCQ ඉක්මනට කරන්න.", color: "#db2777", tasks: [], month: 3 },
    { id: 11, tree: "TREE 03", stage: "Young Tree", stageSi: "තරුණ ගහ", targetHrs: 7, title: "Week 11 — Logic building", subtitle: "තර්කානුකූලව හිතන්න.", color: "#be185d", tasks: [], month: 3 },
    { id: 12, tree: "TREE 04", stage: "Full Tree", stageSi: "පූර්ණ ගහ", targetHrs: 7, title: "Week 12 — Final exam prep", subtitle: "මාසික විභාගය.", color: "#9d174d", tasks: [], month: 3 },
    // Month 4: April
    { id: 13, tree: "TREE 01", stage: "Tiny Seedling", stageSi: "පැළයක්", targetHrs: 7, title: "Week 13 — New Concept", subtitle: "අප්‍රේල් අලුත් පටන් ගැන්මක්.", color: "#fb923c", tasks: [], month: 4 },
    { id: 14, tree: "TREE 02", stage: "Small Tree", stageSi: "පොඩි ගහ", targetHrs: 7, title: "Week 14 — Concept Map", subtitle: "කරුණු ගොනු කරන්න.", color: "#f97316", tasks: [], month: 4 },
    { id: 15, tree: "TREE 03", stage: "Young Tree", stageSi: "තරුණ ගහ", targetHrs: 7, title: "Week 15 — Past papers", subtitle: "පසුගිය ප්‍රශ්න පත්‍ර.", color: "#ea580c", tasks: [], month: 4 },
    { id: 16, tree: "TREE 04", stage: "Full Tree", stageSi: "පූර්ණ ගහ", targetHrs: 7, title: "Week 16 — Month Mock", subtitle: "මාසික පරීක්ෂණය.", color: "#c2410c", tasks: [], month: 4 },
    // Month 5: May
    { id: 17, tree: "TREE 01", stage: "Tiny Seedling", stageSi: "පැළයක්", targetHrs: 7, title: "Week 17 — Special Focus", subtitle: "විශේෂ අවධානය.", color: "#a78bfa", tasks: [], month: 5 },
    { id: 18, tree: "TREE 02", stage: "Small Tree", stageSi: "පොඩි ගහ", targetHrs: 7, title: "Week 18 — Detailed notes", subtitle: "විස්තරාත්මක සටහන්.", color: "#8b5cf6", tasks: [], month: 5 },
    { id: 19, tree: "TREE 03", stage: "Young Tree", stageSi: "තරුණ ගහ", targetHrs: 7, title: "Week 19 — Group study", subtitle: "කණ්ඩායම් වැඩ.", color: "#7c3aed", tasks: [], month: 5 },
    { id: 20, tree: "TREE 04", stage: "Full Tree", stageSi: "පූර්ණ ගහ", targetHrs: 7, title: "Week 20 — Monthly Test", subtitle: "මැයි මාසයේ පරීක්ෂණය.", color: "#6d28d9", tasks: [], month: 5 },
    // Month 6: June
    { id: 21, tree: "TREE 01", stage: "Tiny Seedling", stageSi: "පැළයක්", targetHrs: 7, title: "Week 21 — Halfway mark", subtitle: "අර්ධ මාවතේ ජය.", color: "#2dd4bf", tasks: [], month: 6 },
    { id: 22, tree: "TREE 02", stage: "Small Tree", stageSi: "පොඩි ගහ", targetHrs: 7, title: "Week 22 — Summary notes", subtitle: "සාරාංශ සටහන්.", color: "#14b8a6", tasks: [], month: 6 },
    { id: 23, tree: "TREE 03", stage: "Young Tree", stageSi: "තරුණ ගහ", targetHrs: 7, title: "Week 23 — Diagram practice", subtitle: "රූප සටහන් පුහුණුව.", color: "#0d9488", tasks: [], month: 6 },
    { id: 24, tree: "TREE 04", stage: "Full Tree", stageSi: "පූර්ණ ගහ", targetHrs: 7, title: "Week 24 — June Mock", subtitle: "ජුනි මාසයේ පරීක්ෂණය.", color: "#0f766e", tasks: [], month: 6 },
    // Month 7: July
    { id: 25, tree: "TREE 01", stage: "Tiny Seedling", stageSi: "පැළයක්", targetHrs: 7, title: "Week 25 — July Sprint", subtitle: "ජූලි වේගවත් වටය.", color: "#facc15", tasks: [], month: 7 },
    { id: 26, tree: "TREE 02", stage: "Small Tree", stageSi: "පොඩි ගහ", targetHrs: 7, title: "Week 26 — Paper analysis", subtitle: "විශ්ලේෂණය කරන්න.", color: "#eab308", tasks: [], month: 7 },
    { id: 27, tree: "TREE 03", stage: "Young Tree", stageSi: "තරුණ ගහ", targetHrs: 7, title: "Week 27 — Error fix", subtitle: "වැරදි නිවැරදි කරගමු.", color: "#ca8a04", tasks: [], month: 7 },
    { id: 28, tree: "TREE 04", stage: "Full Tree", stageSi: "පූර්ණ ගහ", targetHrs: 7, title: "Week 28 — July Grand Mock", subtitle: "ජූලි මාසික විභාගය.", color: "#a16207", tasks: [], month: 7 },
    // Month 8: August
    { id: 29, tree: "TREE 01", stage: "Tiny Seedling", stageSi: "පැළයක්", targetHrs: 7, title: "Week 29 — August Boost", subtitle: "අගෝස්තු ජයග්‍රහණය.", color: "#ef4444", tasks: [], month: 8 },
    { id: 30, tree: "TREE 02", stage: "Small Tree", stageSi: "පොඩි ගහ", targetHrs: 7, title: "Week 30 — Memory tricks", subtitle: "මතක තබා ගැනීමේ උපක්‍රම.", color: "#dc2626", tasks: [], month: 8 },
    { id: 31, tree: "TREE 03", stage: "Young Tree", stageSi: "තරුණ ගහ", targetHrs: 7, title: "Week 31 — Final polish", subtitle: "අවසන් මෙහෙයුම.", color: "#b91c1c", tasks: [], month: 8 },
    { id: 32, tree: "TREE 04", stage: "Full Tree", stageSi: "පූර්ණ ගහ", targetHrs: 7, title: "Week 32 — August Mock", subtitle: "අගෝස්තු පරීක්ෂණය.", color: "#991b1b", tasks: [], month: 8 },
    // Month 9: September
    { id: 33, tree: "TREE 01", stage: "Tiny Seedling", stageSi: "පැළයක්", targetHrs: 7, title: "Week 33 — September Goal", subtitle: "සැප්තැම්බර් ඉලක්කය.", color: "#ec4899", tasks: [], month: 9 },
    { id: 34, tree: "TREE 02", stage: "Small Tree", stageSi: "පොඩි ගහ", targetHrs: 7, title: "Week 34 — Answer speed", subtitle: "පිළිතුරු වේගය.", color: "#db2777", tasks: [], month: 9 },
    { id: 35, tree: "TREE 03", stage: "Young Tree", stageSi: "තරුණ ගහ", targetHrs: 7, title: "Week 35 — Key points", subtitle: "ප්‍රධාන කරුණු.", color: "#be185d", tasks: [], month: 9 },
    { id: 36, tree: "TREE 04", stage: "Full Tree", stageSi: "පූර්ණ ගහ", targetHrs: 7, title: "Week 36 — September Mock", subtitle: "සැප්තැම්බර් පරීක්ෂණය.", color: "#9d174d", tasks: [], month: 9 },
    // Month 10: October
    { id: 37, tree: "TREE 01", stage: "Tiny Seedling", stageSi: "පැළයක්", targetHrs: 7, title: "Week 37 — October Finish", subtitle: "ඔක්තෝබර් අවසානය.", color: "#6366f1", tasks: [], month: 10 },
    { id: 38, tree: "TREE 02", stage: "Small Tree", stageSi: "පොඩි ගහ", targetHrs: 7, title: "Week 38 — Final lap", subtitle: "අවසන් වටය.", color: "#4f46e5", tasks: [], month: 10 },
    { id: 39, tree: "TREE 03", stage: "Young Tree", stageSi: "තරුණ ගහ", targetHrs: 7, title: "Week 39 — Exam tactics", subtitle: "විභාග උපක්‍රම.", color: "#4338ca", tasks: [], month: 10 },
    { id: 40, tree: "TREE 04", stage: "Full Tree", stageSi: "පූර්ණ ගහ", targetHrs: 7, title: "Week 40 — October Mock", subtitle: "ඔක්තෝබර් පරීක්ෂණය.", color: "#3730a3", tasks: [], month: 10 },
    // Month 11: November
    { id: 41, tree: "TREE 01", stage: "Tiny Seedling", stageSi: "පැළයක්", targetHrs: 7, title: "Week 41 — Pre-exam focus", subtitle: "විභාගයට පෙර සූදානම.", color: "#14b8a6", tasks: [], month: 11 },
    { id: 42, tree: "TREE 02", stage: "Small Tree", stageSi: "පොඩි ගහ", targetHrs: 7, title: "Week 42 — Rapid fire", subtitle: "ඉක්මන් ප්‍රශ්න.", color: "#0d9488", tasks: [], month: 11 },
    { id: 43, tree: "TREE 03", stage: "Young Tree", stageSi: "තරුණ ගහ", targetHrs: 7, title: "Week 43 — Stress control", subtitle: "මානසික ඒකාග්‍රතාවය.", color: "#0f766e", tasks: [], month: 11 },
    { id: 44, tree: "TREE 04", stage: "Full Tree", stageSi: "පූර්ණ ගහ", targetHrs: 7, title: "Week 44 — November Mock", subtitle: "නොවැම්බර් පරීක්ෂණය.", color: "#115e59", tasks: [], month: 11 },
    // Month 12: December
    { id: 45, tree: "TREE 01", stage: "Tiny Seedling", stageSi: "පැළයක්", targetHrs: 7, title: "Week 45 — December Review", subtitle: "දෙසැම්බර් සමාලෝචනය.", color: "#f87171", tasks: [], month: 12 },
    { id: 46, tree: "TREE 02", stage: "Small Tree", stageSi: "පොඩි ගහ", targetHrs: 7, title: "Week 46 — Success path", subtitle: "ජයග්‍රාහී මාවත.", color: "#ef4444", tasks: [], month: 12 },
    { id: 47, tree: "TREE 03", stage: "Young Tree", stageSi: "තරුණ ගහ", targetHrs: 7, title: "Week 47 — Final words", subtitle: "අවසන් උපදෙස්.", color: "#dc2626", tasks: [], month: 12 },
    { id: 48, tree: "TREE 04", stage: "Full Tree", stageSi: "පූර්ණ ගහ", targetHrs: 7, title: "Week 48 — Final Mock", subtitle: "අවසන් මහා පරීක්ෂණය.", color: "#b91c1c", tasks: [], month: 12 },
  ],
};
