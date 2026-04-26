// Persistent state hooks — localStorage-backed.
// Exposes: useLocalState, useSttState (the whole app state)
// NOTE: Uses React.useState / React.useEffect etc. directly to avoid
// top-level name collisions across <script type="text/babel"> files.

// Shared AudioContext for reliability on mobile/Android
let _stt_audio_ctx = null;
const getAudioCtx = () => {
  if (!_stt_audio_ctx) {
    _stt_audio_ctx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (_stt_audio_ctx.state === 'suspended') {
    _stt_audio_ctx.resume();
  }
  return _stt_audio_ctx;
};

const isSoundEnabled = () => {
  try {
    const raw = localStorage.getItem('stt.soundEnabled');
    return raw === null || JSON.parse(raw) !== false;
  } catch (e) { return true; }
};

const playCoinSound = () => {
  if (!isSoundEnabled()) return;
  try {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(987.77, ctx.currentTime);
    osc.frequency.setValueAtTime(1318.51, ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.4);
  } catch(e) {}
};

const playPopSound = () => {
  if (!isSoundEnabled()) return;
  try {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.1);
  } catch(e) {}
};

const playSuccessSound = () => {
  if (!isSoundEnabled()) return;
  try {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.setValueAtTime(554.37, ctx.currentTime + 0.1);
    osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.2);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.5);
  } catch(e) {}
};

window.DICT = {
  si: {
    login: 'පිවිසෙන්න 👋',
    register: 'ලියාපදිංචි වන්න 🌱',
    back: '← ආපසු',
    tap_profile: 'ඔයාගේ Profile එක තෝරන්න',
    no_profiles: 'Profiles කිසිවක් නැත',
    please_register: 'කරුණාකර නව ගිණුමක් සාදන්න.',
    delete_acc: 'ගිණුම මකන්න',
    register_new: 'නව ගිණුමක් සාදන්න',
    super_name: 'ඔබේ නම',
    your_name: 'උදා :- අල බබා',
    grade: 'ශ්‍රේණිය',
    journey_starts: 'ගමන ආරම්භය...',
    target_date: 'ඉලක්කගත දිනය (විභාගය)',
    fill_error: 'කරුණාකර නම, ශ්‍රේණිය සහ ඉලක්කගත දිනය තෝරන්න.',
    del_title: 'ගිණුම මකන්නද?',
    del_msg: 'ඔබට විශ්වාසද මෙම ගිණුම සම්පූර්ණයෙන්ම මකා දැමිය යුතුයි කියා',
    cancel: 'අවලංගු කරන්න',
    delete: 'මකන්න',
    logout: 'ඉවත් වන්න',
    home: 'මුල් පිටුව',
    weeks: 'සති',
    grow: 'වර්ධනය',
    me: 'මම',
    today: 'අද',
    greeting: 'ආයුබෝවන්, ',
    days: 'දවස්',
    streak: 'Streak',
    xp: 'XP',
    class: 'Class /',
    recording: 'Recording',
    study: 'Study /',
    short_notes: 'Short Notes',
    paper: 'Paper /',
    revision: 'Revision',
    target_more: 'leaves නම්, අද target complete!',
    target_done: '🎉 අද target complete!',
    keep_going: 'Keep going · Tree 2 එකේ 1 leaf + Tree 3 එකේ 3 leaves',
    tiny_seedling: 'කුඩා පැළය',
    small_tree: 'පොඩි ගස',
    young_tree: 'තරුණ ගස',
    full_tree: 'ලොකු ගස',
    week: 'සතිය',
    roadmap: 'මාර්ග සිතියම',
    achievements: 'ජයග්‍රහණ',
    month: 'මාසය',
    locked: 'අගුළු දමා ඇත',
    unlock_msg_month: 'කලින් මාසයේ අවසන් සතිය සම්පූර්ණ කරලා මේ මාසය Unlock කරගන්න.',
    unlock_msg_week: 'කලින් සතියේ අවම පැය 7ක ඉලක්කය සම්පූර්ණ කරලා මේ සතිය Unlock කරගන්න.',
    quick_actions: 'කෙටි පියවර',
    add_task: 'අලුත් Task එකක්',
    go_home: 'මුල් පිටුවට',
    my_profile: 'මගේ විස්තර',
    logout_confirm_msg: 'ඔබට විශ්වාසද මෙම ගිණුමෙන් ඉවත් විය යුතුයි කියා?',
    yes_logout: 'ඔව්, ඉවත් වන්න',
    no: 'නැත',
    ok: 'හරි',
    select_month: 'මාසය තෝරන්න',
    select_week: 'සතිය තෝරන්න',
    total_xp: 'මුළු XP ප්‍රමාණය',
    tasks_completed: 'සම්පූර්ණ කළ වැඩ',
    reach_a9: 'මට්ටමට යාමට තව',
    view_badges: 'Badges එකතුව බලන්න',
    settings: 'සැකසුම්',
    account_mgmt: 'ගිණුම් කළමනාකරණය',
    logged_in_as: 'ලෙස පිවිසී ඇත: ',
    app_lang: 'භාෂාව (Language)',
    version_info: 'අනුවාදය (Version)',
    study_analytics: 'අධ්‍යයන ප්‍රස්ථාරය (Analytics)',
    class_short: 'Class',
    study_short: 'Study',
    prac_short: 'Practice',
    rev_short: 'Revision',
    tasks: 'TASKS',
    no_tasks_msg: 'තාමත් Tasks මුකුත් නෑ. පහළ තියෙන බොත්තම ඔබලා අලුත් Task එකක් හදන්න.',
    add_new_task: '+ අලුත් Task එකක් එකතු කරන්න',
    del_task_title: 'Task එක මකන්නද?',
    del_task_msg: 'ස්ථිරවම ඉවත් කිරීමට ඔබට විශ්වාසද?',
    tasks_left: 'A9 Mode එකට යාමට ඇති වැඩ ප්‍රමාණය',
    developed_with: 'සංවර්ධනය කරන ලද්දේ',
    for_students: 'CK Sir ගේ සිසුන් වෙනුවෙන්',
    weekly_trend: 'සතිපතා ප්‍රගතිය',
    completion_rate: 'වැඩ අවසන් කිරීමේ ප්‍රතිශතය',
    subject_stats: 'විෂයන් අනුව දත්ත',
    smart_insights: 'Smart Insights 💡',
    good_job: 'නියමයි! දිගටම මේ විදිහට කරමු.',
    need_focus: 'තව ටිකක් උනන්දු වෙමු.',
    study_more_msg: 'ඔබ මේ සතියේ ඉලක්කයට වඩා අඩුවෙන් පාඩම් කරලා තියෙන්නේ. තව ටිකක් මහන්සි වෙමු!',
    paper_focus_msg: 'පහුගිය කාලේ වැඩියෙන්ම කළේ Theory. දැන් Papers වලටත් ටිකක් අවධානය දෙමු.',
    keep_streak_msg: 'ඔබේ Streak එක දිගටම තියාගන්න උත්සාහ කරන්න. ලකුණු වැඩි කරගන්න හොඳම ක්‍රමය ඒකයි.',
    sound_settings: 'ශබ්ද සැකසුම්',
    sound_on: 'සක්‍රියයි 🔊',
    sound_off: 'අක්‍රියයි 🔇',
  },
  en: {
    login: 'Login 👋',
    register: 'Register 🌱',
    back: '← Back',
    tap_profile: 'Tap your profile card',
    no_profiles: 'No profiles found',
    please_register: 'Please register a new account below.',
    delete_acc: 'Delete Account',
    register_new: 'Register new account',
    super_name: 'Your Name',
    your_name: 'e.g. Senudi...',
    grade: 'Grade',
    journey_starts: 'Journey starts...',
    target_date: 'Target date (Exam / Year end)',
    fill_error: 'Please fill in your name, select your grade, and choose a target date.',
    del_title: 'Delete Account?',
    del_msg: 'Are you sure you want to permanently delete the account',
    cancel: 'Cancel',
    delete: 'Delete',
    logout: 'Logout',
    home: 'Home',
    weeks: 'Weeks',
    grow: 'Grow',
    me: 'Me',
    today: 'Today',
    greeting: 'Hello, ',
    days: 'Days',
    streak: 'Streak',
    xp: 'XP',
    class: 'Class /',
    recording: 'Recording',
    study: 'Study /',
    short_notes: 'Short Notes',
    paper: 'Paper /',
    revision: 'Revision',
    target_more: 'more leaves to complete today’s target!',
    target_done: '🎉 Today’s target complete!',
    keep_going: 'Keep going · 1 leaf in Tree 2 + 3 leaves in Tree 3',
    tiny_seedling: 'Tiny Seedling',
    small_tree: 'Small Tree',
    young_tree: 'Young Tree',
    full_tree: 'Full Tree',
    week: 'Week',
    roadmap: 'Study Roadmap',
    achievements: 'Achievements',
    month: 'Month',
    locked: 'Locked',
    unlock_msg_month: 'Complete the last week of previous month to unlock this month.',
    unlock_msg_week: 'Complete at least 7 hours in previous week to unlock this week.',
    quick_actions: 'QUICK ACTIONS',
    add_task: 'Add New Task',
    go_home: 'Go to Home',
    my_profile: 'My Profile',
    logout_confirm_msg: 'Are you sure you want to logout from this account?',
    sound_settings: 'Sound Settings',
    sound_on: 'Sound ON 🔊',
    sound_off: 'Sound OFF 🔇',
    yes_logout: 'Yes, Logout',
    no: 'No',
    ok: 'OK',
    select_month: 'SELECT MONTH',
    select_week: 'SELECT WEEK',
    total_xp: 'Total XP Earned',
    tasks_completed: 'Tasks Completed',
    view_badges: 'View Badge Collection',
    settings: 'Settings',
    account_mgmt: 'Account Management',
    logged_in_as: 'Logged in as: ',
    app_lang: 'App Language',
    version_info: 'Version Info',
    study_analytics: 'Study Analytics',
    class_short: 'Class',
    study_short: 'Study',
    prac_short: 'Practice',
    rev_short: 'Revision',
    tasks: 'TASKS',
    no_tasks_msg: 'No tasks yet. Tap the button below to add your first task.',
    add_new_task: '+ Add New Task',
    del_task_title: 'Delete Task?',
    del_task_msg: 'Are you sure you want to permanently remove this task?',
    tasks_left: 'tasks left to reach A9 Mode!',
    developed_with: 'Developed with',
    for_students: 'for CK Sir Students',
    weekly_trend: 'Weekly Progress',
    completion_rate: 'Completion Rate',
    subject_stats: 'Subject Stats',
    smart_insights: 'Smart Insights 💡',
    good_job: 'Good job! Keep it up.',
    need_focus: 'Let\'s focus more.',
    study_more_msg: 'You have studied less than your target this week. Let\'s work harder!',
    paper_focus_msg: 'You focused a lot on Theory recently. Let\'s try some Papers now.',
    keep_streak_msg: 'Try to maintain your streak. It\'s the best way to earn more XP!'
  },
  ta: {
    login: 'உள்நுழைய 👋',
    register: 'பதிவு செய் 🌱',
    back: '← பின்செல்ல',
    tap_profile: 'உங்கள் சுயவிவரத்தை தேர்வு செய்க',
    no_profiles: 'சுயவிவரங்கள் காணப்படவில்லை',
    please_register: 'புதிய கணக்கை உருவாக்கவும்.',
    delete_acc: 'கணக்கை நீக்கு',
    register_new: 'புதிய கணக்கை உருவாக்கு',
    super_name: 'உங்கள் பெயர்',
    your_name: 'எ.கா. செனுதி...',
    grade: 'வகுப்பு',
    journey_starts: 'பயணம் தொடங்குகிறது...',
    target_date: 'இலக்கு தேதி (தேர்வு)',
    fill_error: 'பெயர், வகுப்பு மற்றும் இலக்கு தேதியை உள்ளிடவும்.',
    del_title: 'கணக்கை நீக்கவா?',
    del_msg: 'இந்த கணக்கை நிரந்தரமாக நீக்க விரும்புகிறீர்களா',
    cancel: 'ரத்துசெய்',
    delete: 'நீக்கு',
    logout: 'வெளியேறு',
    home: 'முகப்பு',
    weeks: 'வாரங்கள்',
    grow: 'வளரு',
    me: 'நான்',
    today: 'இன்று',
    greeting: 'வணக்கம், ',
    days: 'நாட்கள்',
    streak: 'ஸ்ட்ரீக்',
    xp: 'XP',
    class: 'வகுப்பு /',
    recording: 'பதிவு',
    study: 'படிப்பு /',
    short_notes: 'சிறு குறிப்பு',
    paper: 'தாள் /',
    revision: 'மீளாய்வு',
    target_more: 'இன்றைய இலக்கை முடிக்க இன்னும் இலைகள்!',
    target_done: '🎉 இன்றைய இலக்கு முடிந்தது!',
    keep_going: 'தொடருங்கள் · மரம் 2 இல் 1 இலை + மரம் 3 இல் 3 இலைகள்',
    tiny_seedling: 'சிறிய நாற்று',
    small_tree: 'சிறிய மரம்',
    young_tree: 'இளம் மரம்',
    full_tree: 'முழு மரம்',
    week: 'வாரம்',
    roadmap: 'ஆய்வு வரைபடம்',
    achievements: 'சாதனைகள்',
    month: 'மாதம்',
    locked: 'பூட்டப்பட்டது',
    unlock_msg_month: 'இந்த மாதத்தைத் திறக்க முந்தைய மாதத்தின் கடைசி வாரத்தை முடிக்கவும்.',
    unlock_msg_week: 'இந்த வாரத்தைத் திறக்க முந்தைய வாரத்தில் குறைந்தபட்சம் 7 மணிநேரத்தை முடிக்கவும்.',
    quick_actions: 'விரைவான செயல்கள்',
    add_task: 'புதிய பணியைச் சேர்',
    go_home: 'முகப்புக்குச் செல்',
    my_profile: 'எனது சுயவிவரம்',
    logout_confirm_msg: 'இந்தக் கணக்கிலிருந்து வெளியேற விரும்புகிறீர்களா?',
    yes_logout: 'ஆம், வெளியேறு',
    no: 'இல்லை',
    ok: 'சரி',
    select_month: 'மாதத்தைத் தேர்ந்தெடுக்கவும்',
    select_week: 'வாரத்தைத் தேர்ந்தெடுக்கவும்',
    total_xp: 'மொத்த XP ஈட்டப்பட்டது',
    tasks_completed: 'பணிகள் முடிந்தது',
    view_badges: 'பேட்ஜ் சேகரிப்பைக் காண்க',
    settings: 'அமைப்புகள்',
    account_mgmt: 'கணக்கு மேலாண்மை',
    logged_in_as: 'என உள்நுழைந்துள்ளார்: ',
    app_lang: 'பயன்பாட்டு மொழி',
    version_info: 'பதிப்புத் தகவல்',
    study_analytics: 'ஆய்வு பகுப்பாய்வு',
    class_short: 'வகுப்பு',
    study_short: 'படிப்பு',
    prac_short: 'பயிற்சி',
    rev_short: 'மீளாய்வு',
    tasks: 'பணிகள்',
    no_tasks_msg: 'இன்னும் பணிகள் இல்லை. உங்கள் முதல் பணியைச் சேர்க்க கீழே உள்ள பொத்தானைத் தட்டவும்.',
    add_new_task: '+ புதிய பணியைச் சேர்',
    del_task_title: 'பணியை நீக்கவா?',
    del_task_msg: 'இந்தப் பணியை நிரந்தரமாக நீக்க விரும்புகிறீர்களா?',
    for_students: 'CK Sir மாணவர்களுக்காக',
    weekly_trend: 'வாராந்திர போக்கு',
    completion_rate: 'பூர்த்தி விகிதம்',
    subject_stats: 'பாட புள்ளிவிவரங்கள்',
    smart_insights: 'ஸ்மார்ட் நுண்ணறிவு 💡',
    good_job: 'நன்று! இதைத் தொடருங்கள்.',
    need_focus: 'இன்னும் கவனம் தேவை.',
    study_more_msg: 'இந்த வாரம் உங்கள் இலக்கை விட குறைவாக படித்துள்ளீர்கள். இன்னும் கடினமாக உழைப்போம்!',
    paper_focus_msg: 'சமீபத்தில் தியரியில் அதிக கவனம் செலுத்தினீர்கள். இப்போது சில தாள்களை முயற்சிப்போம்.',
    keep_streak_msg: 'உங்கள் ஸ்ட்ரீக்கை பராமரிக்க முயற்சி செய்யுங்கள். அதிக XP ஈட்ட இதுவே சிறந்த வழி!'
  }
};

window.useLang = function() {
  const [lang, setLang] = useLocalState('stt.lang', 'si');
  const t = (key) => window.DICT[lang][key] || window.DICT['en'][key] || key;
  return { lang, setLang, t };
};

function useLocalState(key, initial) {
  const [value, setValue] = React.useState(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw !== null) {
        try {
          return JSON.parse(raw);
        } catch(err) {
          // Fallback if raw is not valid JSON (e.g. missing quotes)
          return raw;
        }
      }
    } catch (e) {}
    return typeof initial === 'function' ? initial() : initial;
  });

  const lastKeyRef = React.useRef(key);

  // Sync when key changes
  React.useEffect(() => {
    if (lastKeyRef.current !== key) {
      try {
        const raw = localStorage.getItem(key);
        let newVal = typeof initial === 'function' ? initial() : initial;
        if (raw !== null) {
          try {
            newVal = JSON.parse(raw);
          } catch(err) {
            newVal = raw;
          }
        }
        setValue(newVal);
      } catch (e) {}
      lastKeyRef.current = key;
    }
  }, [key, initial]);

  const setLocalValue = React.useCallback((newVal) => {
    // Determine the next value synchronously
    const v = typeof newVal === 'function' ? newVal(value) : newVal;
    try {
      const newRaw = JSON.stringify(v);
      if (localStorage.getItem(key) !== newRaw) {
        localStorage.setItem(key, newRaw);
        window.dispatchEvent(new CustomEvent('stt-storage', { detail: { key, value: v } }));
      }
    } catch (e) {}
    // Then update React state
    setValue(v);
  }, [key, value]);

  // Listen for storage events (other tabs) AND stt-storage (same tab)
  React.useEffect(() => {
    const handleSync = (e) => {
      const eventKey = e.key || (e.detail && e.detail.key);
      if (eventKey === key) {
        try {
          let newVal;
          if (e.detail && 'value' in e.detail) {
            newVal = e.detail.value;
          } else {
            try {
              newVal = JSON.parse(e.newValue);
            } catch(err) {
              newVal = e.newValue;
            }
          }
          setValue(newVal);
        } catch (err) {}
      }
    };
    window.addEventListener('storage', handleSync);
    window.addEventListener('stt-storage', handleSync);
    return () => {
      window.removeEventListener('storage', handleSync);
      window.removeEventListener('stt-storage', handleSync);
    };
  }, [key]);
  
  return [value, setLocalValue];
}

function summarize(doneMap, allTasks, hoursMap, streak, dailyBonuses) {
  const doneCount = allTasks.filter(t => doneMap[t.id]).length;
  const allHours = Object.values(hoursMap || {}).reduce((sum, h) => {
    return sum + (h.b1 || 0) + (h.b2 || 0) + (h.b3 || 0) + (h.b4 || 0);
  }, 0);

  // Weekly activity (last 7 days)
  const now = new Date();
  const weekActivity = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(now);
    d.setDate(d.getDate() - (6 - i));
    const dateStr = d.toDateString();
    return Object.values(doneMap).filter(iso => new Date(iso).toDateString() === dateStr).length;
  });

  // Subject breakdown
  const subjects = window.STT_DATA.subjects;
  const subjectStats = subjects.map(s => {
    const total = allTasks.filter(t => t.subject === s.id).length;
    const completed = allTasks.filter(t => t.subject === s.id && doneMap[t.id]).length;
    return { ...s, total, completed, percent: total ? Math.round((completed / total) * 100) : 0 };
  }).filter(s => s.total > 0 || s.completed > 0);

  const bonusCount = Object.keys(dailyBonuses || {}).length;

  return {
    doneCount,
    totalCount: allTasks.length,
    percent: allTasks.length ? Math.round((doneCount / allTasks.length) * 100) : 0,
    xp: doneCount * 105 + (streak?.count || 0) * 15 + allHours * 10 + bonusCount * 30,
    weekActivity,
    subjectStats
  };
}

function useSttState() {
  const [superName, setSuperName] = useLocalState('stt.superName', '');
  
  // Force fallback to localStorage if state is empty (due to race conditions)
  let actualName = superName;
  if (!actualName) {
    try {
      const raw = localStorage.getItem('stt.superName');
      if (raw) {
        try { actualName = JSON.parse(raw); } catch(e) { actualName = raw; }
      }
    } catch(e) {}
  }
  
  const pfx = actualName ? `_${actualName}` : '';

  const [customTasks, setCustomTasks] = useLocalState('stt.customTasks' + pfx, {});

  const data = React.useMemo(() => {
    const d = JSON.parse(JSON.stringify(window.STT_DATA));
    d.weeks.forEach(w => {
      w.tasks = customTasks[w.id] || [];
    });
    return d;
  }, [customTasks]);

  const allTasks = React.useMemo(
    () => data.weeks.flatMap(w => w.tasks.map(t => ({ ...t, weekId: w.id }))),
    [data]
  );


  const [done, setDone] = useLocalState('stt.done' + pfx, {});
  const [notes, setNotes] = useLocalState('stt.notes' + pfx, {});
  const [streak, setStreak] = useLocalState('stt.streak' + pfx, { count: 0, lastISO: null });
  const [activeWeek, setActiveWeek] = useLocalState('stt.activeWeek' + pfx, 1);
  const [activeSubject, setActiveSubject] = useLocalState('stt.activeSubject' + pfx, 'all');
  const [hoursMap, setHoursMap] = useLocalState('stt.hoursMap' + pfx, {});
  const hours = hoursMap[activeWeek] || { b1: 0, b2: 0, b3: 0, b4: 0 };
  const [treeTheme, setTreeTheme] = useLocalState('stt.treeTheme' + pfx, 'default');
  const [soundEnabled, setSoundEnabled] = useLocalState('stt.soundEnabled', true);
  const [dailyBonuses, setDailyBonuses] = useLocalState('stt.dailyBonuses' + pfx, {});

  const summary = summarize(done, allTasks, hoursMap, streak, dailyBonuses);

  const toggleDone = React.useCallback((taskId) => {
    setDone(prev => {
      const next = { ...prev };
      if (next[taskId]) {
        delete next[taskId];
        triggerHaptic('light');
      } else {
        next[taskId] = new Date().toISOString();
        playCoinSound();
        triggerHaptic('heavy');
        const todayISO = new Date().toDateString();
        setDailyBonuses(db => {
          if (!db[todayISO]) {
             setTimeout(() => {
                window.dispatchEvent(new CustomEvent('stt-daily-bonus'));
             }, 400);
             return { ...db, [todayISO]: true };
          }
          return db;
        });
        setStreak(s => {
          if (s.lastISO === todayISO) return s;
          const yesterday = new Date(Date.now() - 86400000).toDateString();
          const count = s.lastISO === yesterday ? s.count + 1 : 1;
          return { count, lastISO: todayISO };
        });
      }
      return next;
    });
  }, [setDone, setStreak, setDailyBonuses, soundEnabled]);

  const updateNote = React.useCallback((taskId, text) => {
    setNotes(prev => ({ ...prev, [taskId]: text }));
  }, [setNotes]);

  const triggerHaptic = (style = 'light') => {
    try {
      if (window?.Capacitor?.Plugins?.Haptics) {
        window.Capacitor.Plugins.Haptics.impact({ style: style === 'heavy' ? 'Heavy' : 'Light' });
      } else if (navigator.vibrate) {
        navigator.vibrate(style === 'heavy' ? 40 : 15);
      }
    } catch (e) {}
  };



  const bumpHour = React.useCallback((key, delta) => {
    if (delta > 0) playPopSound();
    setHoursMap(prev => {
      const weekH = prev[activeWeek] || { b1: 0, b2: 0, b3: 0, b4: 0 };
      const currentTotal = (weekH.b1||0) + (weekH.b2||0) + (weekH.b3||0) + (weekH.b4||0);
      const newVal = Math.max(0, Math.min(99, (weekH[key] || 0) + delta));
      const nextWeekH = { ...weekH, [key]: newVal };
      const nextTotal = (nextWeekH.b1||0) + (nextWeekH.b2||0) + (nextWeekH.b3||0) + (nextWeekH.b4||0);
      
      const weekData = window.STT_DATA.weeks.find(w => w.id === activeWeek);
      const weekTarget = weekData ? weekData.targetHrs : 7;
      
      if (delta > 0 && nextTotal >= weekTarget && currentTotal < weekTarget) {
        setTimeout(() => {
          playSuccessSound();
          if (window.confetti) window.confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
          
          const isMonthUnlock = activeWeek % 4 === 0;
          const nextWeekNum = activeWeek + 1;
          const nextMonthNum = Math.floor((activeWeek - 1) / 4) + 2; // e.g. week 4 -> month 2, week 16 -> month 5

          if (isMonthUnlock) {
             window.dispatchEvent(new CustomEvent('stt-unlock', { detail: { type: 'month', id: nextMonthNum } }));
          } else {
             window.dispatchEvent(new CustomEvent('stt-unlock', { detail: { type: 'week', id: nextWeekNum } }));
          }
        }, 50);
      }
      return { ...prev, [activeWeek]: nextWeekH };
    });
  }, [setHoursMap, activeWeek, soundEnabled]);

  const addTask = React.useCallback((weekId, subject, title, detail, minutes) => {
    setCustomTasks(prev => {
      const next = { ...prev };
      if (!next[weekId]) next[weekId] = [];
      const newTask = {
        id: 'c_' + Date.now() + Math.floor(Math.random()*1000),
        subject, title, detail, minutes: parseInt(minutes) || 30
      };
      next[weekId] = [...next[weekId], newTask];
      return next;
    });
  }, [setCustomTasks]);

  const removeTask = React.useCallback((weekId, taskId) => {
    setCustomTasks(prev => {
      const next = { ...prev };
      if (next[weekId]) {
        next[weekId] = next[weekId].filter(t => t.id !== taskId);
      }
      return next;
    });
  }, [setCustomTasks]);

  return {
    superName: actualName, setSuperName,
    data, allTasks, done, notes, streak, activeWeek, activeSubject, hoursMap, hours,
    summary, customTasks, treeTheme, soundEnabled,
    toggleDone, updateNote, bumpHour, addTask, removeTask,
    setSuperName, setActiveWeek, setActiveSubject, setHoursMap, setTreeTheme, setSoundEnabled,
  };
}

function usePomodoro() {
  const [seconds, setSeconds] = useLocalState('stt.timer.seconds', 25 * 60);
  const [running, setRunning] = useLocalState('stt.timer.running', false);
  const [preset, setPreset] = useLocalState('stt.timer.preset', 25);
  const [isBreak, setIsBreak] = useLocalState('stt.timer.isBreak', false);
  const [studyPreset, setStudyPreset] = useLocalState('stt.timer.studyPreset', 25);
  const [soundEnabled] = useLocalState('stt.soundEnabled', true);
  const tickRef = React.useRef();

  const playBell = () => {
    if (!isSoundEnabled()) return;
    try {
      const ctx = getAudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.frequency.value = 880;
      osc.type = 'sine';
      gain.gain.setValueAtTime(0.4, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
      osc.start(); osc.stop(ctx.currentTime + 1.2);
    } catch(e) {}
  };

  const showNotif = (title, body) => {
    try {
      if (Notification.permission === 'granted') {
        new Notification(title, { body, icon: '🌳' });
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission();
      }
    } catch(e) {}
  };

  React.useEffect(() => {
    if (!running) return;
    tickRef.current = setInterval(() => {
      setSeconds(s => {
        if (s <= 1) {
          clearInterval(tickRef.current);
          const nextIsBreak = !isBreak;
          setIsBreak(nextIsBreak);
          if (nextIsBreak) {
            // Study done → auto 5min break
            playBell();
            showNotif('☕ Break Time!', 'හොඳ වැඩ! 5 minutes ක් Rest කරන්න.');
            setPreset(5);
            setRunning(true);
            return 5 * 60;
          } else {
            // Break done → auto restart study
            playBell();
            showNotif('🌳 Focus Time!', 'Break ඉවරයි! නැවත පටන් ගනිමු.');
            setPreset(studyPreset);
            setRunning(true);
            return studyPreset * 60;
          }
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(tickRef.current);
  }, [running, isBreak, studyPreset]);

  const start = () => { setRunning(true); };
  const pause = () => setRunning(false);
  const reset = () => { 
    setRunning(false); 
    setIsBreak(false);
    setPreset(studyPreset);
    setSeconds(studyPreset * 60); 
  };
  const setPresetMin = (m, breakMode = false) => { 
    setPreset(m);
    if (!breakMode) setStudyPreset(m); // remember study preset
    setRunning(false); 
    setIsBreak(breakMode);
    setSeconds(m * 60); 
  };

  return { seconds, running, start, pause, reset, setPresetMin, preset, isBreak, setSeconds, studyPreset };
}

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
}

Object.assign(window, { useLocalState, useSttState, usePomodoro, formatTime, getAudioCtx, playSuccessSound, playCoinSound, playPopSound });
