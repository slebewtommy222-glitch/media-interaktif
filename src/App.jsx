import React, { useState, useEffect, useRef } from 'react';
import cuteBg from './assets/cute_kindergarten_bg.png';
import kidsBgMusic from './assets/kids_background_music.mp3';
import playBtnImg from './assets/play_button.svg';
import homeBtnImg from './assets/home_button.svg';
import trophyBtnImg from './assets/trophy_button.svg';
import safetyBtnImg from './assets/safety_button.svg';

// Cartoon Neo-Brutalist Assets — Home
import cartoonBg from './assets/cartoon_home/background.png';
import cartoonPlayBtn from './assets/cartoon_home/play_button.png';
import cartoonStar from './assets/cartoon_home/star.png';
import cartoonCloud from './assets/cartoon_home/cloud.png';
import cartoonCharacter from './assets/cartoon_home/character.png';
import ornamentPhone from './assets/cartoon_home/ornament_phone.png';
import ornamentTablet from './assets/cartoon_home/ornament_tablet.png';

// Name Input Screen Assets
import niOrnamentPhone from './assets/name_input/ornament_corner_phone.png';
import niOrnamentTablet from './assets/name_input/ornament_corner_tablet.png';
import niOrnamentStar from './assets/name_input/ornament_star_pink.png';

// Quiz Screen Assets
import qProgressBarTrack from './assets/quiz/progress_bar_track.png';
import qQuestionCard from './assets/quiz/question_card.png';
import qChoiceANormal from './assets/quiz/choice_a_normal.png';
import qChoiceAHover from './assets/quiz/choice_a_hover.png';
import qChoiceBNormal from './assets/quiz/choice_b_normal.png';
import qChoiceBHover from './assets/quiz/choice_b_hover.png';
import qNumberBadge from './assets/quiz/number_badge.png';

// Feedback Modal Assets
import fCorrectBg from './assets/feedback/correct_modal_bg.png';
import fCorrectBtn from './assets/feedback/correct_btn.png';
import fWrongBg from './assets/feedback/wrong_modal_bg.png';
import fWrongBtn from './assets/feedback/wrong_btn.png';
import fStarDecor from './assets/feedback/star_decor.png';
import fSparkleDecor from './assets/feedback/sparkle_decor.png';

// Leaderboard & Confetti Assets
import lbTrophyBadge from './assets/leaderboard/trophy_badge.png';
import lbScoreCard from './assets/leaderboard/score_card.png';
import lbMedalGold from './assets/leaderboard/medal_gold.png';
import lbMedalSilver from './assets/leaderboard/medal_silver.png';
import lbMedalBronze from './assets/leaderboard/medal_bronze.png';
import lbNextBtn from './assets/leaderboard/next_student_btn.png';
import cfRectRed from './assets/leaderboard/confetti_rect_red.png';
import cfRectYellow from './assets/leaderboard/confetti_rect_yellow.png';
import cfRectGreen from './assets/leaderboard/confetti_rect_green.png';
import cfRectBlue from './assets/leaderboard/confetti_rect_blue.png';
import cfRectPink from './assets/leaderboard/confetti_rect_pink.png';
import cfDotRed from './assets/leaderboard/confetti_dot_red.png';
import cfDotYellow from './assets/leaderboard/confetti_dot_yellow.png';
import cfDotGreen from './assets/leaderboard/confetti_dot_green.png';
import cfDotBlue from './assets/leaderboard/confetti_dot_blue.png';
import cfDotPink from './assets/leaderboard/confetti_dot_pink.png';


// Helper to shuffle arrays using Fisher-Yates algorithm for uniform distribution
const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

// Helper to shuffle choices and shuffle questions for each student session
const prepareSessionQuestions = () => {
  const shuffledQuestions = shuffleArray(QUESTIONS);
  return shuffledQuestions.map((q) => {
    const choices = [
      { text: q.optionA, isCorrect: true, icon: q.iconA },
      { text: q.optionB, isCorrect: false, icon: q.iconB }
    ];
    return {
      ...q,
      choices: shuffleArray(choices)
    };
  });
};

// Indonesian Kid-friendly educational questions about wise gadget usage.
const QUESTIONS = [
  {
    id: 1,
    question: "Saat waktu belajar di kelas atau di rumah, apa yang harus kita lakukan?",
    optionA: "Fokus belajar dan menyimpan gadget",
    optionB: "Bermain game di gadget diam-diam",
    iconA: "menu_book",
    iconB: "tablet_mac",
    correctFeedback: "Hebat! Kamu Benar! Belajar itu seru dan membuat kita jadi lebih pintar.",
    wrongFeedback: "Oops! Gadget dimainkan nanti saja setelah belajar selesai ya."
  },
  {
    id: 2,
    question: "Berapa lama waktu maksimal bermain gadget dalam sehari untuk anak-anak?",
    optionA: "Maksimal 1 hingga 2 jam saja",
    optionB: "Bebas bermain seharian sampai malam",
    iconA: "schedule",
    iconB: "bedtime",
    correctFeedback: "Keren! Membatasi waktu main gadget menjaga tubuh kita tetap sehat.",
    wrongFeedback: "Kurang tepat. Terlalu lama bermain gadget bisa membuat mata lelah dan pusing."
  },
  {
    id: 3,
    question: "Apa yang harus dilakukan jika mata terasa lelah atau perih saat menggunakan gadget?",
    optionA: "Istirahat dan melihat benda atau pemandangan jauh",
    optionB: "Terus bermain sambil mengucek-ngucek mata",
    iconA: "visibility",
    iconB: "eye_tracking",
    correctFeedback: "Bagus sekali! Istirahatkan matamu agar tetap sehat dan segar.",
    wrongFeedback: "Aduh, mengucek mata saat lelah bisa membuatnya merah dan iritasi."
  },
  {
    id: 4,
    question: "Kapan waktu yang paling penting untuk TIDAK menggunakan gadget sama sekali?",
    optionA: "Saat makan bersama keluarga dan menjelang tidur malam",
    optionB: "Kapan saja bebas sesuka hati kita tanpa aturan",
    iconA: "dinner_dining",
    iconB: "mobile_off",
    correctFeedback: "Tepat! Makan bersama keluarga dan tidur malam lebih penting untuk kesehatan.",
    wrongFeedback: "Bermain gadget saat makan atau sebelum tidur bisa mengganggu pencernaan dan tidurmu."
  },
  {
    id: 5,
    question: "Sebelum memasang (mengunduh) game baru di gadget, apa yang harus kamu lakukan?",
    optionA: "Meminta izin orang tua atau guru terlebih dahulu",
    optionB: "Langsung unduh sendiri tanpa memberi tahu siapa pun",
    iconA: "family_history",
    iconB: "download",
    correctFeedback: "Pintar! Orang tua harus tahu apa yang kamu pasang agar aman.",
    wrongFeedback: "Hati-hati! Beberapa game tidak cocok untuk anak-anak dan bisa berbahaya."
  },
  {
    id: 6,
    question: "Bagaimana posisi duduk yang baik saat menggunakan gadget?",
    optionA: "Duduk tegak dengan jarak layar minimal 30 cm",
    optionB: "Tiduran tengkurap sangat dekat dengan layar",
    iconA: "accessibility_new",
    iconB: "airline_seat_flat",
    correctFeedback: "Hebat! Duduk tegak menjaga tulang punggung dan matamu tetap sehat.",
    wrongFeedback: "Tiduran sambil bermain gadget bisa membuat mata cepat rusak dan punggung pegal."
  },
  {
    id: 7,
    question: "Jika ada orang tidak dikenal mengajak mengobrol di game online, apa tindakanmu?",
    optionA: "Segera melapor ke orang tua atau guru",
    optionB: "Membalas dan memberikan nama lengkap serta alamat rumah",
    iconA: "security",
    iconB: "chat",
    correctFeedback: "Luar biasa! Selalu jaga keamanan datamu dengan melapor ke orang dewasa.",
    wrongFeedback: "Bahaya! Jangan pernah memberikan informasi pribadi kepada orang asing di internet."
  },
  {
    id: 8,
    question: "Apa yang sebaiknya dilakukan saat teman datang ke rumah untuk bermain?",
    optionA: "Menaruh gadget dan bermain bersama teman dengan ceria",
    optionB: "Masing-masing sibuk bermain game di gadget sendiri",
    iconA: "groups",
    iconB: "phonelink_off",
    correctFeedback: "Keren! Bermain bersama teman jauh lebih menyenangkan secara langsung.",
    wrongFeedback: "Sayang sekali, nanti temanmu merasa diabaikan dan bosan."
  },
  {
    id: 9,
    question: "Mengapa kita dilarang bermain gadget di ruangan yang gelap?",
    optionA: "Cahaya layar di ruangan gelap dapat merusak mata kita",
    optionB: "Supaya baterai gadget tidak cepat habis dan hemat",
    iconA: "brightness_alert",
    iconB: "battery_charging_full",
    correctFeedback: "Benar! Menatap layar terang di tempat gelap sangat berbahaya bagi mata.",
    wrongFeedback: "Kesehatan matamu jauh lebih penting daripada sekadar baterai gadget."
  },
  {
    id: 10,
    question: "Apa kegunaan gadget yang paling baik untuk mendukung kegiatan belajarmu?",
    optionA: "Mencari informasi materi pelajaran sekolah yang bermanfaat",
    optionB: "Menonton video hiburan terus-menerus tanpa henti",
    iconA: "school",
    iconB: "tv",
    correctFeedback: "Luar biasa! Gadget adalah alat belajar yang hebat jika digunakan dengan bijak.",
    wrongFeedback: "Boleh menonton hiburan, tapi jangan sampai lupa waktu dan mengabaikan belajar."
  }
];

export default function App() {
  // Navigation State
  const [screen, setScreen] = useState('home');

  // Quiz & Session State
  const [studentName, setStudentName] = useState('');
  const [currentSessionQuestions, setCurrentSessionQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedbackModal, setFeedbackModal] = useState(null);

  // Leaderboard State
  const [leaderboard, setLeaderboard] = useState([]);
  const [currentEntryId, setCurrentEntryId] = useState(null);

  // Modals & Settings
  const [showSettings, setShowSettings] = useState(false);
  const [showSafetyModal, setShowSafetyModal] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [bgMusicEnabled, setBgMusicEnabled] = useState(true);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showResetSuccess, setShowResetSuccess] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const bgMusicRef = useRef(null);

  // Initialize Background Music
  useEffect(() => {
    bgMusicRef.current = new Audio(kidsBgMusic);
    bgMusicRef.current.loop = true;
    bgMusicRef.current.volume = 0.12; // Keep it soft and pleasant for kids

    return () => {
      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
      }
    };
  }, []);

  // Sync background music play/pause state
  useEffect(() => {
    if (!bgMusicRef.current) return;
    if (bgMusicEnabled) {
      bgMusicRef.current.play().catch(() => {
        // Handled via user interaction events below
      });
    } else {
      bgMusicRef.current.pause();
    }
  }, [bgMusicEnabled]);

  // Handle user interaction to bypass browser autoplay policies
  useEffect(() => {
    const startMusicOnInteraction = () => {
      if (bgMusicRef.current && bgMusicEnabled && bgMusicRef.current.paused) {
        bgMusicRef.current.play().catch(() => { });
      }
    };

    document.addEventListener('click', startMusicOnInteraction);
    document.addEventListener('keydown', startMusicOnInteraction);
    document.addEventListener('touchstart', startMusicOnInteraction);

    return () => {
      document.removeEventListener('click', startMusicOnInteraction);
      document.removeEventListener('keydown', startMusicOnInteraction);
      document.removeEventListener('touchstart', startMusicOnInteraction);
    };
  }, [bgMusicEnabled]);

  const playSound = (type) => {
    if (!soundEnabled) return;
    try {
      let audioUrl = '';
      if (type === 'click') audioUrl = 'https://www.soundjay.com/buttons/button-37.mp3';
      else if (type === 'correct') audioUrl = 'https://www.soundjay.com/button/beep-07.mp3';
      else if (type === 'wrong') audioUrl = 'https://www.soundjay.com/button/beep-05.mp3';
      const audio = new Audio(audioUrl);
      audio.volume = 0.15;
      audio.play().catch(() => { });
    } catch (e) { }
  };

  // Confetti
  const [confettiList, setConfettiList] = useState([]);
  useEffect(() => {
    if (screen !== 'leaderboard') { setConfettiList([]); return; }
    const colors = ['#FFD700', '#FF69B4', '#00BFFF', '#32CD32', '#FFA500', '#FF4500'];
    const interval = setInterval(() => {
      const id = Math.random().toString();
      const newC = {
        id,
        left: Math.random() * 100 + 'vw',
        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
        animationDuration: (Math.random() * 2.5 + 2) + 's',
        width: (Math.random() * 8 + 6) + 'px'
      };
      setConfettiList(prev => [...prev, newC]);
      setTimeout(() => setConfettiList(prev => prev.filter(c => c.id !== id)), 5000);
    }, 150);
    return () => clearInterval(interval);
  }, [screen]);

  const currentQuestion = currentSessionQuestions.length > 0 ? currentSessionQuestions[currentQuestionIndex] : null;
  const sortedLeaderboard = [...leaderboard].sort((a, b) => b.score - a.score);

  // Handlers
  const handlePlayClick = () => { playSound('click'); setScreen('nameInput'); };

  const handleNameSubmit = (e) => {
    if (e) e.preventDefault();
    if (!studentName.trim()) return;
    playSound('click');
    setCurrentSessionQuestions(prepareSessionQuestions());
    setScreen('quiz');
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedOption(null);
    setFeedbackModal(null);
  };

  const handleOptionSelect = (choice) => {
    setSelectedOption(choice);
    if (choice.isCorrect) { playSound('correct'); setScore(p => p + 1); setFeedbackModal('correct'); }
    else { playSound('wrong'); setFeedbackModal('wrong'); }
  };

  const handleNextQuestion = () => {
    playSound('click');
    setFeedbackModal(null);
    setSelectedOption(null);
    if (currentQuestionIndex < currentSessionQuestions.length - 1) {
      setCurrentQuestionIndex(p => p + 1);
    } else {
      const entryId = Date.now().toString();
      setLeaderboard(prev => [...prev, { id: entryId, name: studentName.trim(), score }]);
      setCurrentEntryId(entryId);
      setScreen('leaderboard');
    }
  };

  const handleResetForNextStudent = () => {
    playSound('click');
    setStudentName(''); setScore(0); setCurrentQuestionIndex(0);
    setCurrentEntryId(null); setCurrentSessionQuestions([]);
    setSelectedOption(null); setFeedbackModal(null);
    setScreen('nameInput');
  };

  const handleGoHome = () => {
    playSound('click');
    setStudentName(''); setScore(0); setCurrentQuestionIndex(0);
    setCurrentEntryId(null); setCurrentSessionQuestions([]);
    setSelectedOption(null); setFeedbackModal(null);
    setScreen('home');
  };

  const handleExitApp = () => {
    playSound('click');
    if (window.electronAPI && window.electronAPI.closeApp) {
      window.electronAPI.closeApp();
    } else {
      window.close();
      alert('Silakan tutup tab atau jendela browser Anda untuk keluar dari game.');
      setShowExitConfirm(false);
    }
  };

  // ─────────────────────────────────────────────────────────
  //  RENDER
  // ─────────────────────────────────────────────────────────
  return (
    <div className="game-bg min-h-screen flex flex-col relative select-none w-full h-screen overflow-hidden" style={{ fontFamily: "'Nunito',sans-serif" }}>

      {/* ── TOP BAR ── */}
      <header className="flex justify-between items-center w-full px-4 md:px-8 py-3 z-50 absolute top-0">
        <div className="flex items-center gap-2 bg-white cursor-pointer px-4 py-2 rounded-2xl"
          style={{ border: '4px solid #1a1a1a', boxShadow: '4px 4px 0 #1a1a1a' }}
          onClick={handleGoHome}>
          <span className="material-symbols-outlined text-[#FF6B35] text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>face_6</span>
          <h1 className="text-lg md:text-xl font-black text-[#1a1a1a] leading-none" style={{ fontFamily: "'Lilita One',cursive" }}>Wise Gadget Guide</h1>
        </div>
        <div className="flex gap-3">
          <button onClick={() => { playSound('click'); setBgMusicEnabled(!bgMusicEnabled); }}
            title={bgMusicEnabled ? "Matikan Musik" : "Nyalakan Musik"}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-[#FFD600] border-cartoon-4 shadow-retro-black-sm hover:scale-110 active:scale-95 transition-all text-xl"
            style={{ fontFamily: "'Nunito',sans-serif" }}>
            {bgMusicEnabled ? '🔊' : '🔇'}
          </button>
          <button onClick={() => { playSound('click'); setShowSettings(true); }}
            title="Pengaturan"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-[#FF6B35] border-cartoon-4 shadow-retro-black-sm hover:scale-110 active:scale-95 transition-all text-xl"
            style={{ fontFamily: "'Nunito',sans-serif" }}>
            ⚙️
          </button>
          {screen === 'home' && (
            <button onClick={() => { playSound('click'); setShowExitConfirm(true); }}
              title="Keluar Aplikasi"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-red-500 border-cartoon-4 shadow-retro-black-sm hover:scale-110 active:scale-95 transition-all text-white text-xl"
              style={{ fontFamily: "'Nunito',sans-serif" }}>
              ❌
            </button>
          )}
        </div>
      </header>

      {/* ── MAIN ── */}
      <main className="flex-1 relative w-full h-full flex flex-col items-center justify-center overflow-hidden">

        {/* Confetti */}
        {screen === 'leaderboard' && (
          <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
            {confettiList.map(c => (
              <div key={c.id} className="confetti"
                style={{ left: c.left, backgroundColor: c.backgroundColor, animationDuration: c.animationDuration, width: c.width, height: c.width }} />
            ))}
          </div>
        )}

        {/* ══ 1. HOME ══ */}
        {screen === 'home' && (
          <>
            {/* Cartoon Kindergarten Background */}
            <div className="absolute inset-0 -z-20">
              <img className="w-full h-full object-cover" src={cartoonBg} alt="background" />
              <div className="absolute inset-0 bg-[#87CEEB]/10 pointer-events-none" />
            </div>

            {/* Cloud Decorations */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
              <img src={cartoonCloud} alt="Awan" className="absolute w-32 md:w-44 animate-float-ud img-transparent-asset" style={{ top: '8%', left: '8%', animationDelay: '0s', animationDuration: '4s' }} />
              <img src={cartoonCloud} alt="Awan" className="absolute w-24 md:w-36 animate-float-ud img-transparent-asset" style={{ top: '22%', right: '12%', animationDelay: '1.5s', animationDuration: '4.5s' }} />
              <img src={cartoonCloud} alt="Awan" className="absolute w-28 md:w-40 animate-float-ud img-transparent-asset" style={{ top: '58%', left: '4%', animationDelay: '0.8s', animationDuration: '5s' }} />
            </div>

            {/* Star Decorations */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
              <img src={cartoonStar} alt="Bintang" className="absolute w-12 md:w-16 animate-wobble-lr img-transparent-asset" style={{ top: '32%', left: '22%', animationDelay: '0.2s' }} />
              <img src={cartoonStar} alt="Bintang" className="absolute w-10 md:w-14 animate-wobble-lr img-transparent-asset" style={{ top: '14%', right: '32%', animationDelay: '0.9s' }} />
              <img src={cartoonStar} alt="Bintang" className="absolute w-14 md:w-18 animate-wobble-lr img-transparent-asset" style={{ bottom: '28%', right: '22%', animationDelay: '1.4s' }} />
            </div>

            {/* Gadget Ornaments */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
              <img src={ornamentPhone} alt="Handphone" className="absolute w-12 md:w-16 animate-float-ud img-transparent-asset" style={{ bottom: '35%', left: '15%', animationDelay: '0.5s', animationDuration: '6s' }} />
              <img src={ornamentTablet} alt="Tablet" className="absolute w-16 md:w-22 animate-float-ud img-transparent-asset" style={{ top: '42%', right: '25%', animationDelay: '1.2s', animationDuration: '7s' }} />
            </div>

            {/* Cheerful Kid Character */}
            <img src={cartoonCharacter} alt="Anak Ceria" className="absolute bottom-0 right-8 w-48 md:w-64 z-10 pointer-events-none animate-float-ud img-transparent-asset" style={{ animationDuration: '5s' }} />

            {/* Flying Particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
              {[...Array(16)].map((_, i) => {
                const left = `${(i * 6) + 4}%`;
                const bottom = `${(i * 5) + 8}%`;
                const delay = `${i * 0.35}s`;
                const size = i % 2 === 0 ? 'w-3 h-3' : 'w-2 h-2';
                const color = i % 3 === 0 ? 'bg-[#FFD600]' : i % 3 === 1 ? 'bg-[#FF6B35]' : 'bg-[#4CAF50]';
                const animClass = i % 3 === 0 ? 'animate-particle-drift-1' : i % 3 === 1 ? 'animate-particle-drift-2' : 'animate-particle-drift-3';
                return (
                  <div
                    key={i}
                    className={`absolute rounded-full border-2 border-[#1a1a1a] ${size} ${color} ${animClass}`}
                    style={{
                      left,
                      bottom,
                      animationDelay: delay,
                    }}
                  />
                );
              })}
            </div>

            {/* Title & Play Section */}
            <div className="relative z-10 flex flex-col items-center justify-center gap-8 w-full max-w-4xl px-8 select-none">
              {/* Title Panel */}
              <div className="text-center float-anim" style={{ animationDuration: '4s' }}>
                <div className="inline-block bg-[#FFD600] px-8 py-4 rounded-3xl mb-4 border-cartoon-6 shadow-retro-black-lg">
                  <h2 className="text-4xl md:text-5xl font-black text-[#1a1a1a]" style={{ fontFamily: "'Lilita One', cursive" }}>
                    Ayo Bijak! 🎮
                  </h2>
                </div>
                <br />
                <div className="inline-block bg-[#FF6B35] px-6 py-3 rounded-2xl border-cartoon-4 shadow-retro-black">
                  <p className="text-xl md:text-2xl font-black text-white" style={{ fontFamily: "'Lilita One', cursive" }}>
                    Menggunakan Gadget
                  </p>
                </div>
              </div>

              {/* Play Button */}
              <button onClick={handlePlayClick}
                className="relative focus:outline-none hover:scale-108 active:scale-92 transition-all w-44 h-44 md:w-52 md:h-52 cursor-pointer select-none flex items-center justify-center">
                <img src={cartoonPlayBtn} alt="Play" className="w-full h-full object-contain" />
                {/* Glowing pulse ring around the button */}
                <div className="absolute -inset-2 rounded-full border-4 border-[#FFD600] glow-pulse pointer-events-none" />
              </button>

              <p className="text-xl font-black text-[#1a1a1a] bg-white/80 px-4 py-1.5 rounded-full border-2 border-[#1a1a1a] shadow-retro-black-sm" style={{ textShadow: 'none' }}>
                Tap untuk mulai! 👇
              </p>
            </div>
          </>
        )}

        {/* ══ 2. NAME INPUT ══ */}
        {screen === 'nameInput' && (
          <>
            {/* Same cartoon BG as Home */}
            <div className="absolute inset-0 -z-20">
              <img className="w-full h-full object-cover" src={cartoonBg} alt="background" />
              <div className="absolute inset-0 bg-[#87CEEB]/20 pointer-events-none" />
            </div>

            {/* Floating cloud decorations */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
              <img src={cartoonCloud} alt="" className="absolute w-36 animate-float-ud img-transparent-asset" style={{ top: '6%', left: '5%', animationDelay: '0s', animationDuration: '4s' }} />
              <img src={cartoonCloud} alt="" className="absolute w-28 animate-float-ud img-transparent-asset" style={{ top: '18%', right: '8%', animationDelay: '1.2s', animationDuration: '5s' }} />
            </div>

            {/* Corner ornaments */}
            <img src={niOrnamentPhone} alt="" className="absolute bottom-20 left-8 w-14 animate-float-ud img-transparent-asset pointer-events-none z-0" style={{ animationDelay: '0.3s', animationDuration: '5s' }} />
            <img src={niOrnamentTablet} alt="" className="absolute bottom-20 right-8 w-20 animate-float-ud img-transparent-asset pointer-events-none z-0" style={{ animationDelay: '1s', animationDuration: '6s' }} />
            <img src={niOrnamentStar} alt="" className="absolute top-28 left-16 w-10 animate-wobble-lr img-transparent-asset pointer-events-none z-0" style={{ animationDelay: '0.5s' }} />
            <img src={niOrnamentStar} alt="" className="absolute top-36 right-20 w-8 animate-wobble-lr img-transparent-asset pointer-events-none z-0" style={{ animationDelay: '1.3s' }} />

            {/* Main Card */}
            <div className="relative z-10 w-full max-w-lg px-4">
              <div className="relative bg-white rounded-[28px] p-8 md:p-10"
                style={{ border: '5px solid #1a1a1a', boxShadow: '8px 8px 0 #1a1a1a' }}>

                {/* Floating decorations on card corners */}
                <div className="absolute -top-7 -right-5 text-5xl soft-floating">🐻</div>
                <div className="absolute -top-6 -left-5 text-4xl wobble-anim">
                  <img src={niOrnamentStar} alt="" className="w-10 img-transparent-asset" />
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-black text-center mb-2"
                  style={{ fontFamily: "'Lilita One', cursive", color: '#FF6B35', WebkitTextStroke: '1.5px #1a1a1a', textShadow: '3px 3px 0 #1a1a1a' }}>
                  Siapa Namamu? 👋
                </h1>
                <p className="text-center text-sm font-bold text-gray-400 mb-7">
                  Tulis namamu untuk mulai petualangan!
                </p>

                {/* Input Box */}
                <form onSubmit={handleNameSubmit} className="w-full mb-4">
                  <div className="relative">
                    <input
                      type="text"
                      id="name-input"
                      value={studentName}
                      onChange={e => setStudentName(e.target.value)}
                      maxLength={15}
                      placeholder="Masukkan namamu..."
                      autoComplete="off"
                      className="w-full h-16 pl-5 pr-16 text-lg font-black text-[#1a1a1a] bg-white rounded-2xl outline-none transition-all"
                      style={{
                        border: '4px solid #1a1a1a',
                        boxShadow: '4px 4px 0 #1a1a1a',
                        fontFamily: "'Nunito', sans-serif",
                      }}
                      onFocus={e => { e.target.style.boxShadow = '6px 6px 0 #1a1a1a, 0 0 0 3px #FFD600'; }}
                      onBlur={e => { e.target.style.boxShadow = '4px 4px 0 #1a1a1a'; }}
                    />
                    {/* Pencil icon */}
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-[#FFD600] flex items-center justify-center pointer-events-none"
                      style={{ border: '3px solid #1a1a1a' }}>
                      <span className="text-lg">✏️</span>
                    </div>
                  </div>
                  {/* Char counter */}
                  <div className="flex justify-end mt-1 pr-1">
                    <span className="text-xs font-bold text-gray-400">{studentName.length}/15</span>
                  </div>
                </form>

                {/* MULAI Button — 2 kondisi */}
                <button
                  onClick={handleNameSubmit}
                  disabled={!studentName.trim()}
                  className="w-full h-16 rounded-2xl text-xl font-black uppercase flex items-center justify-center gap-3 transition-all select-none"
                  style={{
                    fontFamily: "'Lilita One', cursive",
                    ...(studentName.trim()
                      ? {
                        background: '#FFD600',
                        border: '5px solid #1a1a1a',
                        boxShadow: '0 7px 0 #b38200',
                        color: '#1a1a1a',
                        cursor: 'pointer',
                      }
                      : {
                        background: '#D1D5DB',
                        border: '4px solid #9CA3AF',
                        boxShadow: 'none',
                        color: '#9CA3AF',
                        cursor: 'not-allowed',
                      }
                    ),
                  }}
                  onMouseEnter={e => { if (studentName.trim()) { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 10px 0 #b38200'; } }}
                  onMouseLeave={e => { if (studentName.trim()) { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 7px 0 #b38200'; } }}
                  onMouseDown={e => { if (studentName.trim()) { e.currentTarget.style.transform = 'translateY(4px)'; e.currentTarget.style.boxShadow = '0 2px 0 #b38200'; } }}
                >
                  MULAI! 🚀
                </button>

                {/* Hint text */}
                <p className="text-center text-sm font-bold text-gray-400 mt-5">
                  Ayo kita mulai petualangan pintarmu! 🌈
                </p>
              </div>
            </div>
          </>
        )}

        {/* ══ 3. QUIZ ══ */}
        {screen === 'quiz' && currentQuestion && (
          <>
            {/* Same cartoon BG as Home */}
            <div className="absolute inset-0 -z-20">
              <img className="w-full h-full object-cover" src={cartoonBg} alt="background" />
              <div className="absolute inset-0 bg-[#87CEEB]/20 pointer-events-none" />
            </div>

            {/* Floating cloud decorations */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
              <img src={cartoonCloud} alt="" className="absolute w-36 animate-float-ud img-transparent-asset" style={{ top: '8%', left: '6%', animationDelay: '0s', animationDuration: '4.5s' }} />
              <img src={cartoonCloud} alt="" className="absolute w-28 animate-float-ud img-transparent-asset" style={{ top: '24%', right: '10%', animationDelay: '1.5s', animationDuration: '5s' }} />
            </div>

            <div className="w-full max-w-4xl px-4 md:px-8 flex flex-col gap-6 z-10 pb-20 select-none">

              {/* Progress Bar (ELEMEN 1) */}
              <div className="w-full flex flex-col gap-1.5 mt-16 md:mt-20">
                <div className="flex justify-between items-center px-1">
                  <span className="text-base md:text-lg font-black text-[#1a1a1a]" style={{ fontFamily: "'Nunito', sans-serif" }}>
                    Soal {currentQuestionIndex + 1} dari {currentSessionQuestions.length}
                  </span>
                  <span className="text-sm font-black text-[#FF6B35] bg-white px-3 py-1 rounded-full border-2 border-[#1a1a1a] shadow-retro-black-sm">
                    🎯 Ayo Jawab!
                  </span>
                </div>
                {/* Track */}
                <div className="w-full h-6 bg-gray-200 rounded-full border-[3px] border-[#1a1a1a] overflow-hidden relative"
                  style={{ boxShadow: '3px 3px 0 #1a1a1a' }}>
                  {/* Fill */}
                  <div className="h-full rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${((currentQuestionIndex + 1) / currentSessionQuestions.length) * 100}%`,
                      background: 'linear-gradient(90deg, #FF6B35 0%, #FFD600 100%)',
                    }}
                  />
                </div>
              </div>

              {/* Question Card (ELEMEN 2 & ELEMEN 5) */}
              <div className="relative w-full bg-[#FFFDF5] rounded-2xl p-8 md:p-12 text-center"
                style={{
                  border: '5px solid #1a1a1a',
                  boxShadow: '8px 8px 0px #1a1a1a',
                }}>
                {/* Number Badge (Top Left Corner of the card) */}
                <div className="absolute -top-5 -left-3 bg-[#FFD600] px-4 py-1.5 rounded-xl text-sm font-black text-[#1a1a1a]"
                  style={{
                    border: '3px solid #1a1a1a',
                    boxShadow: '3px 3px 0px #1a1a1a',
                    fontFamily: "'Nunito', sans-serif"
                  }}>
                  No. {currentQuestionIndex + 1}
                </div>

                {/* Floating bear emoji decoration for children */}
                <div className="absolute -top-7 right-5 text-4xl soft-floating">🐻</div>

                <h2 className="text-xl md:text-2xl font-black text-[#1a1a1a] leading-relaxed pt-2"
                  style={{ fontFamily: "'Nunito', sans-serif" }}>
                  {currentQuestion.question}
                </h2>
              </div>

              {/* Options (ELEMEN 3 & ELEMEN 4) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                {currentQuestion.choices.map((choice, index) => {
                  const isA = index === 0;
                  const icon = isA ? '📱' : '🎮';
                  const btnBgClass = isA
                    ? 'bg-gradient-to-t from-[#1a8fd1] to-[#5ec2f5] hover:from-[#2ba2e8] hover:to-[#8fd7ff]'
                    : 'bg-gradient-to-t from-[#e8275e] to-[#ff8fb5] hover:from-[#f54275] hover:to-[#ffb3cc]';

                  return (
                    <button
                      key={index}
                      onClick={() => handleOptionSelect(choice)}
                      disabled={selectedOption !== null}
                      className={`relative flex items-center gap-4 p-5 min-h-[96px] text-left transition-all rounded-2xl border-4 border-[#1a1a1a] shadow-retro-black-lg cursor-pointer select-none text-white hover:-translate-y-1 active:translate-y-1 ${btnBgClass} ${selectedOption ? 'pointer-events-none opacity-60' : ''}`}
                      style={{
                        fontFamily: "'Nunito', sans-serif",
                      }}
                    >
                      {/* Emoji Icon */}
                      <span className="text-4xl filter drop-shadow-[2px_2px_0px_#1a1a1a]">{icon}</span>

                      {/* Choice Text */}
                      <div className="flex-1">
                        <span className="font-black text-lg md:text-xl block leading-snug drop-shadow-[2px_2px_0px_rgba(0,0,0,0.5)]">
                          {choice.text}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Correct Feedback */}
            {feedbackModal === 'correct' && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-6">
                <div className="relative bg-[#4CAF50] rounded-[28px] p-8 text-center max-w-lg w-full animate-scaleUp overflow-visible select-none"
                  style={{ border: '5px solid #1a1a1a', boxShadow: '8px 8px 0 #1a1a1a' }}>

                  {/* Decorative stars and sparkles in corners */}
                  <img src={fStarDecor} alt="" className="absolute -top-6 -left-6 w-12 animate-wobble-lr img-transparent-asset pointer-events-none" />
                  <img src={fSparkleDecor} alt="" className="absolute -bottom-6 -right-6 w-12 animate-float-ud img-transparent-asset pointer-events-none" style={{ animationDuration: '4s' }} />
                  <img src={fSparkleDecor} alt="" className="absolute -top-6 right-10 w-8 animate-float-ud img-transparent-asset pointer-events-none" style={{ animationDuration: '5s' }} />
                  <img src={fStarDecor} alt="" className="absolute bottom-10 -left-6 w-8 animate-wobble-lr img-transparent-asset pointer-events-none" />

                  {/* Bouncing Large Emoji */}
                  <div className="text-8xl mb-4 bounce-bounce select-none pointer-events-none display-inline-block animate-bounce" style={{ animationDuration: '1.5s' }}>
                    🎉
                  </div>

                  {/* Title */}
                  <h3 className="text-4xl md:text-5xl font-black text-white mb-4"
                    style={{ fontFamily: "'Lilita One', cursive", WebkitTextStroke: '1.5px #1a1a1a', textShadow: '3px 3px 0 #1a1a1a' }}>
                    Benar! ✨
                  </h3>

                  {/* Explanation */}
                  <p className="text-lg font-bold text-white mb-6 leading-relaxed" style={{ fontFamily: "'Nunito', sans-serif" }}>
                    {currentQuestion.correctFeedback}
                  </p>

                  {/* LANJUT Button */}
                  <button onClick={handleNextQuestion}
                    className="w-full h-14 bg-white hover:scale-105 active:scale-95 transition-transform text-[#4CAF50] font-black text-xl rounded-2xl flex items-center justify-center cursor-pointer select-none"
                    style={{
                      border: '4px solid #1b5e20',
                      boxShadow: '0 6px 0 #1b5e20',
                      fontFamily: "'Lilita One', cursive"
                    }}>
                    LANJUT ➔
                  </button>
                </div>
              </div>
            )}

            {/* Wrong Feedback */}
            {feedbackModal === 'wrong' && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-6">
                <div className="relative bg-[#FF6B35] rounded-[28px] p-8 text-center max-w-lg w-full animate-scaleUp overflow-visible select-none"
                  style={{ border: '5px solid #1a1a1a', boxShadow: '8px 8px 0 #1a1a1a' }}>

                  {/* Decorative stars and sparkles in corners */}
                  <img src={fStarDecor} alt="" className="absolute -top-6 -left-6 w-12 animate-wobble-lr img-transparent-asset pointer-events-none" />
                  <img src={fSparkleDecor} alt="" className="absolute -bottom-6 -right-6 w-12 animate-float-ud img-transparent-asset pointer-events-none" style={{ animationDuration: '4s' }} />
                  <img src={fSparkleDecor} alt="" className="absolute -top-6 right-10 w-8 animate-float-ud img-transparent-asset pointer-events-none" style={{ animationDuration: '5s' }} />
                  <img src={fStarDecor} alt="" className="absolute bottom-10 -left-6 w-8 animate-wobble-lr img-transparent-asset pointer-events-none" />

                  {/* Large Lightbulb Emoji */}
                  <div className="text-8xl mb-4 select-none pointer-events-none display-inline-block animate-pulse" style={{ animationDuration: '2s' }}>
                    💡
                  </div>

                  {/* Title */}
                  <h3 className="text-4xl md:text-5xl font-black text-white mb-4"
                    style={{ fontFamily: "'Lilita One', cursive", WebkitTextStroke: '1.5px #1a1a1a', textShadow: '3px 3px 0 #1a1a1a' }}>
                    Kurang Tepat! 💪
                  </h3>

                  {/* Explanation */}
                  <p className="text-lg font-bold text-white mb-6 leading-relaxed" style={{ fontFamily: "'Nunito', sans-serif" }}>
                    {currentQuestion.wrongFeedback}
                  </p>

                  {/* LANJUT Button */}
                  <button onClick={handleNextQuestion}
                    className="w-full h-14 bg-white hover:scale-105 active:scale-95 transition-transform text-[#FF6B35] font-black text-xl rounded-2xl flex items-center justify-center cursor-pointer select-none"
                    style={{
                      border: '4px solid #7f270b',
                      boxShadow: '0 6px 0 #7f270b',
                      fontFamily: "'Lilita One', cursive"
                    }}>
                    LANJUT ➔
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* ══ 4. LEADERBOARD ══ */}
        {screen === 'leaderboard' && (
          <>
            {/* Cartoon BG */}
            <div className="absolute inset-0 -z-20">
              <img className="w-full h-full object-cover" src={cartoonBg} alt="background" />
              <div className="absolute inset-0 bg-[#87CEEB]/10 pointer-events-none" />
            </div>

            {/* === CONFETTI RAIN === */}
            {(() => {
              const pieces = [
                cfRectRed, cfRectYellow, cfRectGreen, cfRectBlue, cfRectPink,
                cfDotRed, cfDotYellow, cfDotGreen, cfDotBlue, cfDotPink,
              ];
              return Array.from({ length: 32 }).map((_, i) => {
                const src = pieces[i % pieces.length];
                const left = (i * 3.2 + (i % 5) * 2.7) % 98;
                const delay = (i * 0.37) % 4;
                const dur = 2.8 + (i % 6) * 0.4;
                const size = 10 + (i % 4) * 4;
                return (
                  <img key={i} src={src} alt=""
                    className="absolute top-0 pointer-events-none img-transparent-asset z-20"
                    style={{
                      left: `${left}%`,
                      width: `${size}px`,
                      animation: `confetti-fall ${dur}s ${delay}s linear infinite`,
                    }}
                  />
                );
              });
            })()}

            {/* Header */}
            <div className="relative z-10 w-full flex flex-col items-center mt-16 mb-2">
              <h1 className="text-4xl md:text-5xl font-black flex items-center gap-2 select-none"
                style={{ fontFamily: "'Lilita One', cursive", color: '#FFD600', WebkitTextStroke: '2.5px #1a1a1a', textShadow: '4px 4px 0 #1a1a1a' }}>
                🏆 Papan Peringkat
              </h1>
            </div>

            {/* Main two-column layout */}
            <div className="relative z-10 w-full max-w-5xl px-4 flex flex-col md:flex-row gap-5">

              {/* ── LEFT: Score Card ── */}
              <section className="flex-1 flex flex-col items-center">
                <div className="relative w-full bg-[#FFD600] rounded-[28px] p-6 flex flex-col items-center text-center select-none"
                  style={{ border: '5px solid #1a1a1a', boxShadow: '8px 8px 0 #1a1a1a' }}>

                  {/* Corner stars */}
                  <span className="absolute top-3 left-4 text-3xl soft-floating">⭐</span>
                  <span className="absolute top-3 right-4 text-3xl soft-floating" style={{ animationDelay: '0.5s' }}>⭐</span>

                  {/* Score label badge */}
                  <div className="bg-white px-5 py-1.5 rounded-full mb-3"
                    style={{ border: '3px solid #1a1a1a', boxShadow: '3px 3px 0 #1a1a1a' }}>
                    <span className="font-black text-base text-[#FF6B35]" style={{ fontFamily: "'Nunito', sans-serif" }}>
                      Skor Akhir 🏆
                    </span>
                  </div>

                  {/* Player Name */}
                  <p className="text-3xl font-black text-[#1a1a1a] mb-1" style={{ fontFamily: "'Nunito', sans-serif" }}>
                    {studentName || 'Pemain'}
                  </p>

                  {/* Big Score text (Neo-Brutalist cartoon style) */}
                  <div className="text-7xl font-black my-4 text-[#1a1a1a]"
                    style={{ fontFamily: "'Lilita One', cursive", WebkitTextStroke: '2.5px #1a1a1a', textShadow: '4px 4px 0 #fff' }}>
                    {score} / {currentSessionQuestions.length || 10}
                  </div>

                  {/* Star Rating row */}
                  <div className="flex gap-1.5 justify-center mb-3 select-none">
                    {Array.from({ length: 5 }).map((_, i) => {
                      const isFilled = i < Math.round((score / (currentSessionQuestions.length || 10)) * 5);
                      return (
                        <span key={i} className="text-3xl" style={{
                          color: isFilled ? '#FFF' : 'rgba(26, 26, 26, 0.2)',
                          WebkitTextStroke: '2px #1a1a1a',
                          textShadow: isFilled ? '2px 2px 0 #1a1a1a' : 'none'
                        }}>
                          ★
                        </span>
                      );
                    })}
                  </div>

                  {/* Eval message */}
                  <p className="font-black text-xl text-[#1a1a1a] mt-2 mb-1 animate-bounce" style={{ fontFamily: "'Nunito', sans-serif", animationDuration: '2s' }}>
                    {score >= 8 ? '🌟 Selamat! Kamu Hebat!' : score >= 5 ? '👍 Bagus! Terus Belajar!' : '💪 Tetap Semangat!'}
                  </p>
                  <p className="text-sm font-bold text-[#1a1a1a]/70 mt-1" style={{ fontFamily: "'Nunito', sans-serif" }}>
                    {studentName}, kamu telah menyelesaikan kuis!
                  </p>
                </div>
              </section>

              {/* ── RIGHT: Ranking Table ── */}
              <section className="flex-1 flex flex-col">
                <div className="bg-white rounded-[28px] p-6 flex flex-col h-full select-none"
                  style={{ border: '5px solid #1a1a1a', boxShadow: '8px 8px 0 #1a1a1a' }}>

                  {/* Table header */}
                  <div className="grid grid-cols-[80px_1fr_90px] gap-2 px-4 py-2.5 border-b-[4px] border-[#1a1a1a] mb-4 text-[#1a1a1a] font-black text-sm uppercase"
                    style={{ fontFamily: "'Lilita One', cursive", letterSpacing: '1px' }}>
                    <div>Rank</div>
                    <div>Nama Siswa</div>
                    <div className="text-right">Skor</div>
                  </div>

                  {/* Rank rows (Top 5 entries, comic-style table cards) */}
                  <div className="flex flex-col gap-2.5 flex-1 overflow-y-auto pr-1">
                    {sortedLeaderboard.length === 0 ? (
                      <div className="text-center py-8 text-gray-500 font-bold flex flex-col items-center gap-2">
                        <span className="text-5xl">🎮</span>
                        <span>Belum ada skor.<br />Ayo jadi yang pertama! 🏆</span>
                      </div>
                    ) : (
                      sortedLeaderboard.slice(0, 5).map((entry, index) => {
                        const isCurrent = entry.id === currentEntryId;
                        return (
                          <div key={entry.id}
                            className="grid grid-cols-[80px_1fr_90px] items-center gap-2 px-4 py-3 rounded-2xl transition-all"
                            style={isCurrent
                              ? { background: '#FFF59D', border: '4px solid #1a1a1a', boxShadow: '4px 4px 0 #1a1a1a' }
                              : { background: index % 2 === 0 ? '#FFFFFF' : '#FFFDF0', border: '3px solid #1a1a1a', boxShadow: '3px 3px 0 #1a1a1a' }
                            }>
                            {/* Medal or rank number */}
                            <div className="flex items-center justify-start font-black text-lg select-none"
                              style={{ fontFamily: "'Lilita One', cursive" }}>
                              {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}`}
                            </div>

                            {/* Name */}
                            <span className="font-bold text-base md:text-lg text-[#1a1a1a] truncate"
                              style={{ fontFamily: "'Nunito', sans-serif" }}>
                              {entry.name} {isCurrent && (
                                <span className="text-xs font-black text-[#FF6B35] bg-white border-2 border-[#1a1a1a] px-2 py-0.5 rounded-full ml-1 select-none">
                                  Kamu
                                </span>
                              )}
                            </span>

                            {/* Score */}
                            <span className="font-black text-lg md:text-xl text-[#1a1a1a] text-right"
                              style={{ fontFamily: "'Lilita One', cursive" }}>
                              {entry.score} / {currentSessionQuestions.length || 10}
                            </span>
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* Next student button */}
                  <button onClick={handleResetForNextStudent}
                    className="mt-6 w-full h-14 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-2 hover:-translate-y-1 active:translate-y-1 transition-all cursor-pointer select-none"
                    style={{
                      fontFamily: "'Lilita One', cursive",
                      background: '#4CAF50',
                      border: '5px solid #1a1a1a',
                      boxShadow: '5px 5px 0 #1a1a1a',
                    }}>
                    Siswa Selanjutnya ▶
                  </button>
                </div>
              </section>
            </div>
          </>
        )}

      </main>

      {/* ── BOTTOM NAV ── */}
      <nav className="fixed bottom-0 left-0 w-full z-40 flex justify-around items-center px-4 py-2 cartoon-nav">
        <button onClick={handleGoHome}
          className={`flex flex-col items-center justify-center px-4 py-1 rounded-2xl transition-all hover:scale-110 active:scale-95 ${screen === 'home' || screen === 'nameInput' ? 'nav-active' : ''}`}>
          <img src={homeBtnImg} alt="Home"
            className={`w-10 h-10 object-contain transition-all ${screen === 'home' || screen === 'nameInput' ? 'drop-shadow-lg scale-110' : 'opacity-70'}`} />
          <span className="text-xs font-black mt-0.5">Home</span>
        </button>
        <button onClick={() => { playSound('click'); setCurrentEntryId(null); setScreen('leaderboard'); }}
          className={`flex flex-col items-center justify-center px-4 py-1 rounded-2xl transition-all hover:scale-110 active:scale-95 ${screen === 'leaderboard' ? 'nav-active' : ''}`}>
          <img src={trophyBtnImg} alt="Trophy"
            className={`w-10 h-10 object-contain transition-all ${screen === 'leaderboard' ? 'drop-shadow-lg scale-110' : 'opacity-70'}`} />
          <span className="text-xs font-black mt-0.5">Trophy</span>
        </button>
        <button onClick={() => { playSound('click'); setShowSafetyModal(true); }}
          className={`flex flex-col items-center justify-center px-4 py-1 rounded-2xl transition-all hover:scale-110 active:scale-95 ${showSafetyModal ? 'nav-active' : ''}`}>
          <img src={safetyBtnImg} alt="Safety"
            className={`w-10 h-10 object-contain transition-all ${showSafetyModal ? 'drop-shadow-lg scale-110' : 'opacity-70'}`} />
          <span className="text-xs font-black mt-0.5">Safety</span>
        </button>
      </nav>

      {/* ── SAFETY MODAL ── */}
      {showSafetyModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 p-6">
          <div className="bg-white rounded-3xl p-6 max-w-xl w-full animate-scaleUp relative"
            style={{ border: '5px solid #1a1a1a', boxShadow: '8px 8px 0 #1a1a1a' }}>
            <button onClick={() => { playSound('click'); setShowSafetyModal(false); }}
              className="absolute top-3 right-3 w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200"
              style={{ border: '3px solid #1a1a1a', boxShadow: '3px 3px 0 #1a1a1a' }}>
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 bg-[#FFD600] rounded-2xl flex items-center justify-center" style={{ border: '3px solid #1a1a1a' }}>
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>shield_with_heart</span>
              </div>
              <h2 className="text-2xl font-black" style={{ fontFamily: "'Lilita One',cursive" }}>Tips Bijak Main Gadget 🛡️</h2>
            </div>
            <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1">
              {[
                { icon: 'timer', title: 'Batasi Waktu Main', desc: 'Gunakan gadget maksimal 1-2 jam sehari agar tubuh dan matamu tetap sehat bugar!', color: '#4FC3F7' },
                { icon: 'visibility', title: 'Jaga Jarak Layar', desc: 'Jarak layar minimal 30 cm dan jangan gunakan gadget di ruangan gelap.', color: '#81C784' },
                { icon: 'forum', title: 'Terbuka dengan Orang Tua', desc: 'Selalu lapor orang tua jika ingin mendownload aplikasi baru atau ada hal aneh di internet.', color: '#FFB74D' },
                { icon: 'self_improvement', title: 'Prioritaskan Belajar', desc: 'Simpan gadget saat jam belajar, jam makan keluarga, dan sebelum tidur malam.', color: '#F48FB1' },
              ].map((tip, i) => (
                <div key={i} className="flex gap-3 p-3 rounded-2xl"
                  style={{ background: `${tip.color}33`, border: `3px solid ${tip.color}` }}>
                  <span className="material-symbols-outlined text-2xl flex-shrink-0" style={{ color: tip.color }}>{tip.icon}</span>
                  <div>
                    <h4 className="font-black text-base text-[#1a1a1a]">{tip.title}</h4>
                    <p className="text-sm font-bold text-gray-600">{tip.desc}</p>
                  </div>
                </div>
              ))}
              <div className="text-center pt-3 mt-3 border-t border-dashed border-gray-200">
                <p className="text-[11px] font-bold text-gray-400 leading-snug">
                  Musik Latar: "Carefree" oleh Kevin MacLeod (incompetech.com)<br />
                  Lisensi Creative Commons: By Attribution 4.0
                </p>
              </div>
            </div>
            <button onClick={() => { playSound('click'); setShowSafetyModal(false); }}
              className="cartoon-btn mt-5 w-full h-14 bg-[#4CAF50] text-white text-lg uppercase"
              style={{ boxShadow: '0 6px 0 #2a6e2f' }}>
              Aku Paham! 👍
            </button>
          </div>
        </div>
      )}

      {/* ── SETTINGS MODAL ── */}
      {showSettings && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 p-6">
          <div className="bg-white rounded-[28px] p-7 max-w-lg w-full animate-scaleUp relative"
            style={{ border: '5px solid #1a1a1a', boxShadow: '8px 8px 0 #1a1a1a' }}>

            {/* Close Button */}
            <button onClick={() => { playSound('click'); setShowSettings(false); }}
              className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-red-100 hover:text-red-500 transition-colors"
              style={{ border: '3px solid #1a1a1a', boxShadow: '3px 3px 0 #1a1a1a' }}>
              <span className="material-symbols-outlined text-xl">close</span>
            </button>

            {/* Modal Title */}
            <h2 className="text-2xl font-black mb-1" style={{ fontFamily: "'Lilita One',cursive", color: '#FF6B35' }}>⚙️ Pengaturan Game</h2>
            <div className="w-full h-1 rounded-full mb-5" style={{ background: 'linear-gradient(90deg, #FF6B35, #FFD600)', border: '2px solid #1a1a1a' }} />

            <div className="space-y-3 mb-6">

              {/* Row 1 — SFX Toggle */}
              <div className="flex items-center justify-between px-4 py-3 rounded-2xl"
                style={{ background: '#F9FAFB', border: '3px solid #1a1a1a', boxShadow: '3px 3px 0 #1a1a1a' }}>
                <span className="font-black text-base flex items-center gap-2" style={{ fontFamily: "'Nunito',sans-serif" }}>
                  <span className="text-xl">{soundEnabled ? '🔔' : '🔕'}</span>
                  Efek Suara
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black" style={{ color: soundEnabled ? '#4CAF50' : '#9CA3AF' }}>
                    {soundEnabled ? 'ON' : 'OFF'}
                  </span>
                  <button
                    onClick={() => {
                      const ns = !soundEnabled; setSoundEnabled(ns);
                      if (ns) { try { const a = new Audio('https://www.soundjay.com/buttons/button-37.mp3'); a.volume = 0.15; a.play().catch(() => { }); } catch (e) { } }
                    }}
                    className={`w-14 h-8 rounded-full transition-all relative flex items-center px-1 cursor-pointer ${soundEnabled ? 'bg-[#4CAF50]' : 'bg-gray-300'}`}
                    style={{ border: '3px solid #1a1a1a', boxShadow: soundEnabled ? '2px 2px 0 #2a6e2f' : '2px 2px 0 #9CA3AF' }}>
                    <div className={`w-5 h-5 rounded-full bg-white shadow transform transition-transform ${soundEnabled ? 'translate-x-6' : 'translate-x-0'}`}
                      style={{ border: '2px solid #1a1a1a' }} />
                  </button>
                </div>
              </div>

              {/* Row 2 — BGM Toggle */}
              <div className="flex items-center justify-between px-4 py-3 rounded-2xl"
                style={{ background: '#F9FAFB', border: '3px solid #1a1a1a', boxShadow: '3px 3px 0 #1a1a1a' }}>
                <span className="font-black text-base flex items-center gap-2" style={{ fontFamily: "'Nunito',sans-serif" }}>
                  <span className="text-xl">{bgMusicEnabled ? '🎵' : '🔇'}</span>
                  Musik Latar
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black" style={{ color: bgMusicEnabled ? '#4CAF50' : '#9CA3AF' }}>
                    {bgMusicEnabled ? 'ON' : 'OFF'}
                  </span>
                  <button
                    onClick={() => {
                      const nm = !bgMusicEnabled; setBgMusicEnabled(nm);
                      if (nm) { playSound('click'); }
                    }}
                    className={`w-14 h-8 rounded-full transition-all relative flex items-center px-1 cursor-pointer ${bgMusicEnabled ? 'bg-[#4CAF50]' : 'bg-gray-300'}`}
                    style={{ border: '3px solid #1a1a1a', boxShadow: bgMusicEnabled ? '2px 2px 0 #2a6e2f' : '2px 2px 0 #9CA3AF' }}>
                    <div className={`w-5 h-5 rounded-full bg-white shadow transform transition-transform ${bgMusicEnabled ? 'translate-x-6' : 'translate-x-0'}`}
                      style={{ border: '2px solid #1a1a1a' }} />
                  </button>
                </div>
              </div>

              {/* Row 3 — Reset Leaderboard */}
              <div className="flex items-center justify-between px-4 py-3 rounded-2xl"
                style={{ background: '#FFF1F1', border: '3px solid #FECACA', boxShadow: '3px 3px 0 #FCA5A5' }}>
                <span className="font-black text-base flex items-center gap-2" style={{ fontFamily: "'Nunito',sans-serif", color: '#991B1B' }}>
                  <span className="text-xl">🗑️</span>
                  Hapus Semua Data
                </span>
                <button onClick={() => { playSound('click'); setShowResetConfirm(true); }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-white font-black text-sm cursor-pointer hover:opacity-90 active:scale-95 transition-all"
                  style={{
                    fontFamily: "'Nunito',sans-serif",
                    background: '#EF4444',
                    border: '3px solid #1a1a1a',
                    boxShadow: '3px 3px 0 #1a1a1a'
                  }}>
                  🗑️ Hapus
                </button>
              </div>

              {/* Row 4 — Exit App */}
              <div className="flex items-center justify-between px-4 py-3 rounded-2xl"
                style={{ background: '#F9FAFB', border: '3px solid #1a1a1a', boxShadow: '3px 3px 0 #1a1a1a' }}>
                <span className="font-black text-base flex items-center gap-2" style={{ fontFamily: "'Nunito',sans-serif" }}>
                  <span className="material-symbols-outlined">power_settings_new</span>
                  Keluar Aplikasi
                </span>
                <button onClick={() => { playSound('click'); setShowSettings(false); setShowExitConfirm(true); }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-white font-black text-sm cursor-pointer hover:opacity-90 active:scale-95 transition-all"
                  style={{
                    fontFamily: "'Nunito',sans-serif",
                    background: '#EF4444',
                    border: '3px solid #1a1a1a',
                    boxShadow: '3px 3px 0 #1a1a1a'
                  }}>
                  🚪 Keluar
                </button>
              </div>

            </div>

            {/* Save & Close Button */}
            <button onClick={() => { playSound('click'); setShowSettings(false); }}
              className="w-full h-14 text-white font-black text-lg uppercase rounded-2xl cursor-pointer hover:-translate-y-1 active:translate-y-1 transition-all"
              style={{
                fontFamily: "'Lilita One',cursive",
                background: '#1a8fd1',
                border: '4px solid #1a1a1a',
                boxShadow: '5px 5px 0 #1a1a1a'
              }}>
              Simpan & Tutup ✓
            </button>
          </div>
        </div>
      )}

      {/* ── RESET CONFIRM ── */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center bg-black/60 p-6">
          <div className="bg-white rounded-[28px] p-8 max-w-md w-full animate-scaleUp text-center"
            style={{ border: '5px solid #1a1a1a', boxShadow: '8px 8px 0 #1a1a1a' }}>
            <div className="text-7xl mb-4 animate-bounce" style={{ animationDuration: '1.5s' }}>⚠️</div>
            <h2 className="text-2xl font-black text-[#EF4444] mb-3"
              style={{ fontFamily: "'Lilita One',cursive", WebkitTextStroke: '0.5px #1a1a1a' }}>Hapus Leaderboard?</h2>
            <p className="font-bold text-gray-500 mb-7 leading-relaxed" style={{ fontFamily: "'Nunito',sans-serif" }}>
              Yakin ingin menghapus semua data?<br />Tindakan ini <strong className="text-red-500">tidak dapat dibatalkan</strong>.
            </p>
            <div className="flex gap-4">
              <button onClick={() => { playSound('click'); setShowResetConfirm(false); }}
                className="flex-1 h-14 rounded-2xl font-black text-base text-gray-700 cursor-pointer hover:-translate-y-1 active:translate-y-1 transition-all"
                style={{
                  fontFamily: "'Nunito',sans-serif",
                  background: '#E5E7EB',
                  border: '4px solid #1a1a1a',
                  boxShadow: '4px 4px 0 #1a1a1a'
                }}>Batal</button>
              <button onClick={() => { playSound('click'); setLeaderboard([]); setShowResetConfirm(false); setShowResetSuccess(true); }}
                className="flex-1 h-14 rounded-2xl font-black text-base text-white cursor-pointer hover:-translate-y-1 active:translate-y-1 transition-all"
                style={{
                  fontFamily: "'Nunito',sans-serif",
                  background: '#EF4444',
                  border: '4px solid #1a1a1a',
                  boxShadow: '4px 4px 0 #7f1d1d'
                }}>🗑️ Ya, Hapus</button>
            </div>
          </div>
        </div>
      )}

      {/* ── RESET SUCCESS ── */}
      {showResetSuccess && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center bg-black/60 p-6">
          <div className="rounded-[28px] p-8 max-w-md w-full animate-scaleUp text-center"
            style={{ background: '#DCFCE7', border: '5px solid #1a1a1a', boxShadow: '8px 8px 0 #1a1a1a' }}>
            <div className="text-8xl mb-4 animate-bounce" style={{ animationDuration: '1.2s' }}>✅</div>
            <h2 className="text-3xl font-black text-[#4CAF50] mb-2"
              style={{ fontFamily: "'Lilita One',cursive", WebkitTextStroke: '0.5px #1a1a1a' }}>Berhasil!</h2>
            <p className="font-bold text-gray-600 mb-7" style={{ fontFamily: "'Nunito',sans-serif" }}>
              Data leaderboard berhasil dihapus! 🧹
            </p>
            <button onClick={() => { playSound('click'); setShowResetSuccess(false); }}
              className="w-full h-14 text-white font-black text-xl uppercase rounded-2xl cursor-pointer hover:-translate-y-1 active:translate-y-1 transition-all"
              style={{
                fontFamily: "'Lilita One',cursive",
                background: '#4CAF50',
                border: '4px solid #1a1a1a',
                boxShadow: '0 6px 0 #2a6e2f'
              }}>
              Oke! 🎉
            </button>
          </div>
        </div>
      )}

      {/* ── EXIT CONFIRM ── */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-[140] flex items-center justify-center bg-black/50 p-6">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full animate-scaleUp text-center"
            style={{ border: '5px solid #1a1a1a', boxShadow: '8px 8px 0 #1a1a1a' }}>
            <div className="text-6xl mb-4">👋</div>
            <h2 className="text-2xl font-black text-red-500 mb-3" style={{ fontFamily: "'Lilita One',cursive" }}>Keluar Game?</h2>
            <p className="font-bold text-gray-600 mb-6">Apakah kamu yakin ingin keluar dari game?</p>
            <div className="flex gap-4">
              <button onClick={() => { playSound('click'); setShowExitConfirm(false); }}
                className="cartoon-btn flex-1 h-14 bg-gray-200 text-gray-800 text-base">Batal</button>
              <button onClick={handleExitApp}
                className="cartoon-btn flex-1 h-14 bg-red-500 text-white text-base"
                style={{ boxShadow: '0 6px 0 #7f1d1d' }}>Ya, Keluar</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
