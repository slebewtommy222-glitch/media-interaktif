import React, { useState, useEffect, useRef } from 'react';
import cuteBg from './assets/cute_kindergarten_bg.png';
import kidsBgMusic from './assets/kids_background_music.mp3';
import playBtnImg from './assets/play_button.svg';
import homeBtnImg from './assets/home_button.svg';
import trophyBtnImg from './assets/trophy_button.svg';
import safetyBtnImg from './assets/safety_button.svg';


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
        bgMusicRef.current.play().catch(() => {});
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
      audio.play().catch(() => {});
    } catch (e) {}
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
    <div className="game-bg min-h-screen flex flex-col relative select-none w-full h-screen overflow-hidden" style={{fontFamily:"'Nunito',sans-serif"}}>

      {/* ── TOP BAR ── */}
      <header className="flex justify-between items-center w-full px-4 md:px-8 py-3 z-50 absolute top-0">
        <div className="flex items-center gap-2 bg-white cursor-pointer px-4 py-2 rounded-2xl"
          style={{border:'4px solid #1a1a1a', boxShadow:'4px 4px 0 #1a1a1a'}}
          onClick={handleGoHome}>
          <span className="material-symbols-outlined text-[#FF6B35] text-3xl" style={{fontVariationSettings:"'FILL' 1"}}>face_6</span>
          <h1 className="text-lg md:text-xl font-black text-[#1a1a1a] leading-none" style={{fontFamily:"'Lilita One',cursive"}}>Wise Gadget Guide</h1>
        </div>
        <div className="flex gap-2">
          <button onClick={() => { playSound('click'); setBgMusicEnabled(!bgMusicEnabled); }}
            title={bgMusicEnabled ? "Matikan Musik" : "Nyalakan Musik"}
            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white hover:scale-105 active:scale-95 transition-transform"
            style={{border:'4px solid #1a1a1a', boxShadow:'4px 4px 0 #1a1a1a'}}>
            <span className="material-symbols-outlined">{bgMusicEnabled ? 'music_note' : 'music_off'}</span>
          </button>
          <button onClick={() => { playSound('click'); setShowSettings(true); }}
            title="Pengaturan"
            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white hover:scale-105 active:scale-95 transition-transform"
            style={{border:'4px solid #1a1a1a', boxShadow:'4px 4px 0 #1a1a1a'}}>
            <span className="material-symbols-outlined">settings</span>
          </button>
          {screen === 'home' && (
            <button onClick={() => { playSound('click'); setShowExitConfirm(true); }}
              title="Keluar Aplikasi"
              className="w-12 h-12 flex items-center justify-center rounded-2xl bg-red-500 hover:scale-105 active:scale-95 transition-transform text-white"
              style={{border:'4px solid #1a1a1a', boxShadow:'4px 4px 0 #1a1a1a'}}>
              <span className="material-symbols-outlined">power_settings_new</span>
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
                style={{left:c.left, backgroundColor:c.backgroundColor, animationDuration:c.animationDuration, width:c.width, height:c.width}}/>
            ))}
          </div>
        )}

        {/* ══ 1. HOME ══ */}
        {screen === 'home' && (
          <>
            {/* Cloud decorations */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-10 left-6 w-44 h-20 bg-white/70 rounded-full" style={{filter:'blur(3px)'}}/>
              <div className="absolute top-18 left-24 w-64 h-24 bg-white/60 rounded-full" style={{filter:'blur(3px)'}}/>
              <div className="absolute top-6 right-8 w-52 h-20 bg-white/70 rounded-full" style={{filter:'blur(3px)'}}/>
              <div className="absolute top-14 right-28 w-72 h-20 bg-white/55 rounded-full" style={{filter:'blur(3px)'}}/>
              <div className="absolute bottom-24 left-2 w-48 h-16 bg-white/50 rounded-full" style={{filter:'blur(3px)'}}/>
              <div className="absolute top-32 left-14 text-3xl float-anim" style={{animationDelay:'0s'}}>⭐</div>
              <div className="absolute top-44 right-16 text-2xl float-anim" style={{animationDelay:'0.8s'}}>✨</div>
              <div className="absolute bottom-36 right-14 text-3xl float-anim" style={{animationDelay:'1.5s'}}>🌟</div>
              <div className="absolute bottom-44 left-18 text-2xl float-anim" style={{animationDelay:'0.4s'}}>⭐</div>
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center gap-8 w-full px-8">
              {/* Title */}
              <div className="text-center float-anim">
                <div className="inline-block bg-[#FFD600] px-8 py-4 rounded-3xl mb-4"
                  style={{border:'5px solid #1a1a1a', boxShadow:'7px 7px 0 #1a1a1a'}}>
                  <h2 className="text-4xl md:text-5xl font-black text-[#1a1a1a]" style={{fontFamily:"'Lilita One',cursive"}}>
                    Ayo Bijak! 🎮
                  </h2>
                </div>
                <br/>
                <div className="inline-block bg-[#FF6B35] px-6 py-3 rounded-2xl"
                  style={{border:'5px solid #1a1a1a', boxShadow:'6px 6px 0 #1a1a1a'}}>
                  <p className="text-xl md:text-2xl font-black text-white">Menggunakan Gadget</p>
                </div>
              </div>

              {/* Play Button */}
              <button onClick={handlePlayClick}
                className="relative focus:outline-none hover:scale-105 active:scale-95 transition-transform w-44 h-44 md:w-52 md:h-52">
                <img src={playBtnImg} alt="Mulai" className="w-full h-full object-contain drop-shadow-xl" />
                <div className="absolute -inset-5 rounded-full border-4 border-[#FFD600] glow-pulse pointer-events-none"/>
              </button>

              <p className="text-lg font-black text-white" style={{textShadow:'2px 2px 0 #1a1a1a'}}>
                Tap untuk mulai! 👇
              </p>
            </div>
          </>
        )}

        {/* ══ 2. NAME INPUT ══ */}
        {screen === 'nameInput' && (
          <>
            <div className="absolute inset-0 z-0"><div className="w-full h-full blurred-bg opacity-50"/></div>
            <div className="relative z-10 w-full max-w-xl px-6 flex flex-col items-center">
              <div className="comic-card w-full p-8 md:p-12 flex flex-col items-center relative overflow-visible">
                <div className="absolute -top-10 -right-6 text-6xl soft-floating">🐻</div>
                <div className="absolute -top-8 -left-6 text-5xl wobble-anim">⭐</div>

                <h1 className="text-3xl md:text-4xl font-black text-center mb-8"
                  style={{fontFamily:"'Lilita One',cursive", color:'#FF6B35', WebkitTextStroke:'2px #1a1a1a', textShadow:'3px 3px 0 #1a1a1a'}}>
                  Siapa Namamu? 🎉
                </h1>

                <form onSubmit={handleNameSubmit} className="w-full mb-6">
                  <div className="relative">
                    <input type="text" id="name-input" value={studentName}
                      onChange={e => setStudentName(e.target.value)}
                      maxLength={15} placeholder="Ketik namamu di sini..."
                      className="cartoon-input w-full h-16 pr-14"/>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl pointer-events-none">✏️</div>
                  </div>
                </form>

                <button onClick={handleNameSubmit} disabled={!studentName.trim()}
                  className={`cartoon-btn w-full h-16 text-xl uppercase flex items-center justify-center gap-2 ${studentName.trim() ? 'bg-[#4CAF50] text-white' : 'bg-gray-300 text-gray-400 cursor-not-allowed'}`}
                  style={studentName.trim() ? {boxShadow:'0 6px 0 #2a6e2f'} : {boxShadow:'none', border:'4px solid #ccc'}}>
                  MULAI! 🚀
                </button>
              </div>
              <p className="mt-6 text-base font-black text-white" style={{textShadow:'2px 2px 0 #1a1a1a'}}>
                Ayo kita mulai petualangan pintarmu! 🌈
              </p>
            </div>
          </>
        )}

        {/* ══ 3. QUIZ ══ */}
        {screen === 'quiz' && currentQuestion && (
          <>
            <div className="absolute inset-0 -z-20">
              <img className="w-full h-full object-cover opacity-70" src={cuteBg} alt="bg"/>
              <div className="absolute inset-0 bg-[#87CEEB]/40"/>
            </div>

            <div className="w-full max-w-4xl px-4 md:px-8 flex flex-col gap-5 z-10 pb-20">

              {/* Progress */}
              <div className="flex items-center gap-3 bg-white p-3 rounded-2xl"
                style={{border:'4px solid #1a1a1a', boxShadow:'4px 4px 0 #1a1a1a'}}>
                <div className="w-10 h-10 rounded-xl bg-[#FFD600] flex items-center justify-center flex-shrink-0"
                  style={{border:'3px solid #1a1a1a'}}>
                  <span className="material-symbols-outlined text-xl" style={{fontVariationSettings:"'FILL' 1"}}>star</span>
                </div>
                <div className="flex-1 cartoon-progress-track h-5">
                  <div className="cartoon-progress-fill"
                    style={{width:`${((currentQuestionIndex+1)/currentSessionQuestions.length)*100}%`, height:'100%'}}/>
                </div>
                <span className="font-black text-lg min-w-[52px] text-center">
                  {currentQuestionIndex+1}/{currentSessionQuestions.length}
                </span>
              </div>

              {/* Question */}
              <div className="bg-white rounded-3xl p-6 md:p-10 text-center"
                style={{border:'5px solid #1a1a1a', boxShadow:'7px 7px 0 #1a1a1a'}}>
                <div className="inline-block bg-[#FFD600] px-4 py-1 rounded-full text-sm font-black mb-3"
                  style={{border:'3px solid #1a1a1a'}}>
                  SOAL {currentQuestionIndex+1} 🎯
                </div>
                <h2 className="text-xl md:text-2xl font-black text-[#1a1a1a] leading-tight">
                  {currentQuestion.question}
                </h2>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                {currentQuestion.choices.map((choice, index) => {
                  const isFirst = index === 0;
                  const btnClass = isFirst ? 'option-a-btn' : 'option-b-btn';
                  const label = isFirst ? 'A' : 'B';
                  const labelBg = isFirst ? '#003f6e' : '#660030';
                  return (
                    <button key={index} onClick={() => handleOptionSelect(choice)}
                      className={`${btnClass} relative flex items-center gap-4 p-5 min-h-[100px] text-left transition-all ${selectedOption ? 'pointer-events-none opacity-60' : ''}`}>
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 font-black text-2xl text-white"
                        style={{background:labelBg, border:'3px solid rgba(255,255,255,0.4)'}}>
                        {label}
                      </div>
                      <div className="w-14 h-14 bg-white/25 rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-[38px] text-white"
                          style={{fontVariationSettings:"'FILL' 1"}}>{choice.icon}</span>
                      </div>
                      <div className="flex-1">
                        <span className="font-black text-base md:text-lg text-white block leading-snug drop-shadow">
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
                <div className="bg-white rounded-3xl p-8 text-center max-w-lg w-full animate-scaleUp"
                  style={{border:'6px solid #1a1a1a', boxShadow:'8px 8px 0 #1a1a1a'}}>
                  <div className="text-7xl mb-4">🎉</div>
                  <div className="inline-block bg-[#4CAF50] px-5 py-2 rounded-2xl mb-4"
                    style={{border:'4px solid #1a1a1a', boxShadow:'4px 4px 0 #1a1a1a'}}>
                    <h3 className="text-2xl font-black text-white">Hebat! Kamu Benar!</h3>
                  </div>
                  <p className="text-lg font-bold text-[#1a1a1a] mb-6 leading-relaxed">{currentQuestion.correctFeedback}</p>
                  <button onClick={handleNextQuestion}
                    className="cartoon-btn w-full h-14 bg-[#FFD600] text-[#1a1a1a] text-lg uppercase">
                    {currentQuestionIndex === currentSessionQuestions.length-1 ? 'Lihat Hasil ➔' : 'Soal Berikutnya ➔'}
                  </button>
                </div>
              </div>
            )}

            {/* Wrong Feedback */}
            {feedbackModal === 'wrong' && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-6">
                <div className="bg-white rounded-3xl p-8 text-center max-w-lg w-full animate-scaleUp"
                  style={{border:'6px solid #1a1a1a', boxShadow:'8px 8px 0 #1a1a1a'}}>
                  <div className="text-7xl mb-4">💡</div>
                  <div className="inline-block bg-[#FF6B35] px-5 py-2 rounded-2xl mb-4"
                    style={{border:'4px solid #1a1a1a', boxShadow:'4px 4px 0 #1a1a1a'}}>
                    <h3 className="text-2xl font-black text-white">Oops, Kurang Tepat!</h3>
                  </div>
                  <p className="text-lg font-bold text-[#1a1a1a] mb-6 leading-relaxed">{currentQuestion.wrongFeedback}</p>
                  <button onClick={handleNextQuestion}
                    className="cartoon-btn w-full h-14 bg-[#FFD600] text-[#1a1a1a] text-lg uppercase">
                    {currentQuestionIndex === currentSessionQuestions.length-1 ? 'Lihat Hasil ➔' : 'Soal Berikutnya ➔'}
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* ══ 4. LEADERBOARD ══ */}
        {screen === 'leaderboard' && (
          <>
            <div className="absolute inset-0 z-0 overflow-hidden">
              {/* Decorative background for leaderboard */}
              <div className="w-full h-full" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)', opacity: 0.15}}/>
              {/* Floating star decorations */}
              <div className="absolute top-16 left-8 text-5xl float-anim" style={{animationDelay:'0.2s', opacity:0.3}}>🌟</div>
              <div className="absolute top-24 right-10 text-4xl float-anim" style={{animationDelay:'1.1s', opacity:0.25}}>⭐</div>
              <div className="absolute bottom-32 left-12 text-4xl float-anim" style={{animationDelay:'0.7s', opacity:0.25}}>✨</div>
              <div className="absolute bottom-20 right-8 text-5xl float-anim" style={{animationDelay:'1.8s', opacity:0.2}}>🏆</div>
              <div className="absolute top-1/2 left-4 text-3xl float-anim" style={{animationDelay:'0.5s', opacity:0.2}}>🎉</div>
            </div>

            <div className="relative z-20 w-full max-w-4xl px-4 md:px-8 flex flex-col md:flex-row items-start justify-center gap-6 py-6 overflow-y-auto max-h-[calc(100vh-130px)]">

              {/* Score Card */}
              <section className="flex-1 w-full comic-card p-6 flex flex-col items-center text-center">
                <div className="inline-block bg-[#FFD600] px-4 py-2 rounded-2xl mb-4"
                  style={{border:'4px solid #1a1a1a', boxShadow:'4px 4px 0 #1a1a1a'}}>
                  <h2 className="text-xl font-black" style={{fontFamily:"'Lilita One',cursive"}}>Skor Akhir 🏆</h2>
                </div>
                <div className="w-40 h-40 rounded-full bg-[#FFD600] flex items-center justify-center mb-4"
                  style={{border:'5px solid #1a1a1a', boxShadow:'6px 6px 0 #1a1a1a'}}>
                  <span className="text-5xl font-black" style={{fontFamily:"'Lilita One',cursive"}}>
                    {score}<span className="text-2xl">/{currentSessionQuestions.length || QUESTIONS.length}</span>
                  </span>
                </div>
                <p className="text-xl font-black mb-1">
                  {score >= 8 ? '🌟 Selamat! Kamu hebat!' : score >= 5 ? '👍 Bagus! Terus belajar!' : '💪 Tetap semangat!'}
                </p>
                <p className="text-base font-bold text-gray-600">{studentName}, kamu telah menyelesaikan kuis!</p>
              </section>

              {/* Leaderboard Card */}
              <section className="flex-1 w-full comic-card p-5 flex flex-col max-h-[420px]">
                <div className="flex items-center justify-center gap-2 mb-4 pb-3" style={{borderBottom:'3px solid #eee'}}>
                  <span className="text-2xl">🏆</span>
                  <h3 className="text-xl font-black" style={{fontFamily:"'Lilita One',cursive"}}>Leaderboard</h3>
                </div>
                <div className="space-y-2 overflow-y-auto flex-1 pr-1">
                  {sortedLeaderboard.length === 0 ? (
                    <div className="text-center py-8 text-gray-500 font-bold">
                      <div className="text-4xl mb-2">🎮</div>
                      Belum ada skor.<br/>Ayo jadi yang pertama! 🏆
                    </div>
                  ) : (
                    sortedLeaderboard.map((entry, index) => {
                      const isCurrent = entry.id === currentEntryId;
                      const medals = ['🥇','🥈','🥉'];
                      return (
                        <div key={entry.id}
                          className={`flex items-center justify-between p-3 rounded-2xl transition-all ${isCurrent ? 'bg-[#FFD600]' : 'bg-gray-100'}`}
                          style={isCurrent ? {border:'3px solid #1a1a1a', boxShadow:'3px 3px 0 #1a1a1a'} : {border:'3px solid transparent'}}>
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{medals[index] || `${index+1}.`}</span>
                            <span className={`font-black text-base ${isCurrent ? 'text-[#1a1a1a]' : 'text-gray-800'}`}>
                              {entry.name} {isCurrent && <span className="text-sm font-bold">(Kamu)</span>}
                            </span>
                          </div>
                          <span className={`font-black text-lg ${isCurrent ? 'text-[#FF6B35]' : 'text-gray-600'}`}>
                            {entry.score}/{currentSessionQuestions.length || QUESTIONS.length}
                          </span>
                        </div>
                      );
                    })
                  )}
                </div>
                <div className="mt-4 pt-3" style={{borderTop:'3px solid #eee'}}>
                  <button onClick={handleResetForNextStudent}
                    className="cartoon-btn w-full h-14 bg-[#4CAF50] text-white text-lg flex items-center justify-center gap-2"
                    style={{boxShadow:'0 6px 0 #2a6e2f'}}>
                    <span className="material-symbols-outlined">refresh</span>
                    Siswa Selanjutnya
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
            style={{border:'5px solid #1a1a1a', boxShadow:'8px 8px 0 #1a1a1a'}}>
            <button onClick={() => { playSound('click'); setShowSafetyModal(false); }}
              className="absolute top-3 right-3 w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200"
              style={{border:'3px solid #1a1a1a', boxShadow:'3px 3px 0 #1a1a1a'}}>
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 bg-[#FFD600] rounded-2xl flex items-center justify-center" style={{border:'3px solid #1a1a1a'}}>
                <span className="material-symbols-outlined text-2xl" style={{fontVariationSettings:"'FILL' 1"}}>shield_with_heart</span>
              </div>
              <h2 className="text-2xl font-black" style={{fontFamily:"'Lilita One',cursive"}}>Tips Bijak Main Gadget 🛡️</h2>
            </div>
            <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1">
              {[
                {icon:'timer', title:'Batasi Waktu Main', desc:'Gunakan gadget maksimal 1-2 jam sehari agar tubuh dan matamu tetap sehat bugar!', color:'#4FC3F7'},
                {icon:'visibility', title:'Jaga Jarak Layar', desc:'Jarak layar minimal 30 cm dan jangan gunakan gadget di ruangan gelap.', color:'#81C784'},
                {icon:'forum', title:'Terbuka dengan Orang Tua', desc:'Selalu lapor orang tua jika ingin mendownload aplikasi baru atau ada hal aneh di internet.', color:'#FFB74D'},
                {icon:'self_improvement', title:'Prioritaskan Belajar', desc:'Simpan gadget saat jam belajar, jam makan keluarga, dan sebelum tidur malam.', color:'#F48FB1'},
              ].map((tip, i) => (
                <div key={i} className="flex gap-3 p-3 rounded-2xl"
                  style={{background:`${tip.color}33`, border:`3px solid ${tip.color}`}}>
                  <span className="material-symbols-outlined text-2xl flex-shrink-0" style={{color:tip.color}}>{tip.icon}</span>
                  <div>
                    <h4 className="font-black text-base text-[#1a1a1a]">{tip.title}</h4>
                    <p className="text-sm font-bold text-gray-600">{tip.desc}</p>
                  </div>
                </div>
              ))}
              <div className="text-center pt-3 mt-3 border-t border-dashed border-gray-200">
                <p className="text-[11px] font-bold text-gray-400 leading-snug">
                  Musik Latar: "Carefree" oleh Kevin MacLeod (incompetech.com)<br/>
                  Lisensi Creative Commons: By Attribution 4.0
                </p>
              </div>
            </div>
            <button onClick={() => { playSound('click'); setShowSafetyModal(false); }}
              className="cartoon-btn mt-5 w-full h-14 bg-[#4CAF50] text-white text-lg uppercase"
              style={{boxShadow:'0 6px 0 #2a6e2f'}}>
              Aku Paham! 👍
            </button>
          </div>
        </div>
      )}

      {/* ── SETTINGS MODAL ── */}
      {showSettings && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/50 p-6">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full animate-scaleUp relative"
            style={{border:'5px solid #1a1a1a', boxShadow:'8px 8px 0 #1a1a1a'}}>
            <button onClick={() => { playSound('click'); setShowSettings(false); }}
              className="absolute top-3 right-3 w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200"
              style={{border:'3px solid #1a1a1a', boxShadow:'3px 3px 0 #1a1a1a'}}>
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
            <h2 className="text-2xl font-black mb-5" style={{fontFamily:"'Lilita One',cursive"}}>⚙️ Pengaturan Game</h2>
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50" style={{border:'3px solid #e0e0e0'}}>
                <span className="font-black text-base flex items-center gap-2">
                  <span className="material-symbols-outlined">{soundEnabled ? 'volume_up' : 'volume_off'}</span>
                  Efek Suara
                </span>
                <button onClick={() => {
                    const ns = !soundEnabled; setSoundEnabled(ns);
                    if (ns) { try { const a = new Audio('https://www.soundjay.com/buttons/button-37.mp3'); a.volume=0.15; a.play().catch(()=>{}); } catch(e){} }
                  }}
                  className={`w-14 h-8 rounded-full transition-colors relative flex items-center px-1 ${soundEnabled ? 'bg-[#4CAF50]' : 'bg-gray-300'}`}
                  style={{border:'3px solid #1a1a1a'}}>
                  <div className={`w-5 h-5 rounded-full bg-white shadow transform transition-transform ${soundEnabled ? 'translate-x-6' : 'translate-x-0'}`}/>
                </button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50" style={{border:'3px solid #e0e0e0'}}>
                <span className="font-black text-base flex items-center gap-2">
                  <span className="material-symbols-outlined">{bgMusicEnabled ? 'music_note' : 'music_off'}</span>
                  Musik Backsound
                </span>
                <button onClick={() => {
                    const nm = !bgMusicEnabled; setBgMusicEnabled(nm);
                    if (nm) { playSound('click'); }
                  }}
                  className={`w-14 h-8 rounded-full transition-colors relative flex items-center px-1 ${bgMusicEnabled ? 'bg-[#4CAF50]' : 'bg-gray-300'}`}
                  style={{border:'3px solid #1a1a1a'}}>
                  <div className={`w-5 h-5 rounded-full bg-white shadow transform transition-transform ${bgMusicEnabled ? 'translate-x-6' : 'translate-x-0'}`}/>
                </button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50" style={{border:'3px solid #e0e0e0'}}>
                <span className="font-black text-base flex items-center gap-2">
                  <span className="material-symbols-outlined">delete_sweep</span>
                  Reset Leaderboard
                </span>
                <button onClick={() => { playSound('click'); setShowResetConfirm(true); }}
                  className="cartoon-btn bg-red-500 text-white px-4 py-2 text-sm"
                  style={{boxShadow:'0 4px 0 #7f1d1d'}}>
                  Reset
                </button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50" style={{border:'3px solid #e0e0e0'}}>
                <span className="font-black text-base flex items-center gap-2">
                  <span className="material-symbols-outlined">power_settings_new</span>
                  Keluar Aplikasi
                </span>
                <button onClick={() => { playSound('click'); setShowSettings(false); setShowExitConfirm(true); }}
                  className="cartoon-btn bg-red-500 text-white px-4 py-2 text-sm"
                  style={{boxShadow:'0 4px 0 #7f1d1d'}}>
                  Keluar
                </button>
              </div>
            </div>
            <button onClick={() => { playSound('click'); setShowSettings(false); }}
              className="cartoon-btn w-full h-14 bg-[#1a8fd1] text-white text-lg uppercase"
              style={{boxShadow:'0 6px 0 #0c5a8a'}}>
              Simpan & Tutup ✓
            </button>
          </div>
        </div>
      )}

      {/* ── RESET CONFIRM ── */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center bg-black/50 p-6">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full animate-scaleUp text-center"
            style={{border:'5px solid #1a1a1a', boxShadow:'8px 8px 0 #1a1a1a'}}>
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-black text-red-500 mb-3" style={{fontFamily:"'Lilita One',cursive"}}>Hapus Leaderboard?</h2>
            <p className="font-bold text-gray-600 mb-6">Apakah kamu yakin? Tindakan ini tidak dapat dibatalkan.</p>
            <div className="flex gap-4">
              <button onClick={() => { playSound('click'); setShowResetConfirm(false); }}
                className="cartoon-btn flex-1 h-14 bg-gray-200 text-gray-800 text-base">Batal</button>
              <button onClick={() => { playSound('click'); setLeaderboard([]); setShowResetConfirm(false); setShowResetSuccess(true); }}
                className="cartoon-btn flex-1 h-14 bg-red-500 text-white text-base"
                style={{boxShadow:'0 6px 0 #7f1d1d'}}>Ya, Hapus</button>
            </div>
          </div>
        </div>
      )}

      {/* ── RESET SUCCESS ── */}
      {showResetSuccess && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center bg-black/50 p-6">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full animate-scaleUp text-center"
            style={{border:'5px solid #1a1a1a', boxShadow:'8px 8px 0 #1a1a1a'}}>
            <div className="text-7xl mb-4">✅</div>
            <h2 className="text-2xl font-black text-[#4CAF50] mb-3" style={{fontFamily:"'Lilita One',cursive"}}>Berhasil!</h2>
            <p className="font-bold text-gray-600 mb-6">Leaderboard berhasil direset!</p>
            <button onClick={() => { playSound('click'); setShowResetSuccess(false); }}
              className="cartoon-btn w-full h-14 bg-[#4CAF50] text-white text-lg uppercase"
              style={{boxShadow:'0 6px 0 #2a6e2f'}}>
              Oke! 🎉
            </button>
          </div>
        </div>
      )}

      {/* ── EXIT CONFIRM ── */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-[140] flex items-center justify-center bg-black/50 p-6">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full animate-scaleUp text-center"
            style={{border:'5px solid #1a1a1a', boxShadow:'8px 8px 0 #1a1a1a'}}>
            <div className="text-6xl mb-4">👋</div>
            <h2 className="text-2xl font-black text-red-500 mb-3" style={{fontFamily:"'Lilita One',cursive"}}>Keluar Game?</h2>
            <p className="font-bold text-gray-600 mb-6">Apakah kamu yakin ingin keluar dari game?</p>
            <div className="flex gap-4">
              <button onClick={() => { playSound('click'); setShowExitConfirm(false); }}
                className="cartoon-btn flex-1 h-14 bg-gray-200 text-gray-800 text-base">Batal</button>
              <button onClick={handleExitApp}
                className="cartoon-btn flex-1 h-14 bg-red-500 text-white text-base"
                style={{boxShadow:'0 6px 0 #7f1d1d'}}>Ya, Keluar</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
