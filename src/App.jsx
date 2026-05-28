    import { useState, useEffect, useRef } from "react";

// ── FONTS & GLOBAL ────────────────────────────────────────────────────────────
const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=Outfit:wght@300;400;500;600;700&display=swap');`;

// ── QUESTION BANKS ────────────────────────────────────────────────────────────

const JUNIORS = [
  {
    id: 1, cat: "ENERGY", emoji: "⚡",
    q: "On a free afternoon, you'd rather...",
    opts: ["🎮 Play games — video, board, anything!", "🎨 Make something — draw, build, craft", "📺 Watch shows and totally chill", "🏃 Run around — sports or outdoor stuff"],
  },
  {
    id: 2, cat: "KINDNESS", emoji: "💛",
    q: "Your friend finishes your snack by mistake. You...",
    opts: ["😄 Laugh it off — it's just a snack!", "😐 Feel annoyed but say nothing", "🗣️ Tell them it bothered you, nicely", "😤 Get upset — that was MINE"],
  },
  {
    id: 3, cat: "SECRETS", emoji: "🤫",
    q: "Your best friend tells you a big secret. You...",
    opts: ["🤐 Keep it forever — that's what friends do", "🤔 Keep it unless someone gets hurt", "😬 Try hard but might slip to ONE person", "📢 Probably tell someone — secrets are hard!"],
  },
  {
    id: 4, cat: "FAIRNESS", emoji: "⚖️",
    q: "You both want different games to play. You...",
    opts: ["🤝 Take turns — their choice today, mine next", "🗳️ Rock paper scissors — let fate decide!", "🙋 I usually just go along with them", "😤 Push for my idea — I had it first"],
  },
  {
    id: 5, cat: "LOYALTY", emoji: "🦸",
    q: "Someone is being mean to your friend. You...",
    opts: ["🦸 Step in immediately and defend them!", "🤫 Tell a trusted adult straight away", "🫂 Stay with your friend and comfort them", "😬 Feel scared — not sure what to do"],
  },
  {
    id: 6, cat: "FUN", emoji: "🎡",
    q: "You have a whole free day together. You'd plan...",
    opts: ["🌳 Outdoor adventure — explore everything!", "🍕 Cosy indoor day — movies and food", "🎭 Make something together — a video or art", "🎡 Go somewhere fun — park or event"],
  },
];

const TEENS = [
  {
    id: 1, cat: "VIBE", emoji: "✨",
    q: "Your ideal weekend looks like...",
    opts: ["🎉 Out with the squad — more the merrier", "🎧 Lowkey with 1 or 2 close people", "🏠 Honestly just alone at home recharging", "⚡ Mix of everything — depends on the mood"],
  },
  {
    id: 2, cat: "CONFLICT", emoji: "🌊",
    q: "A close friend upsets you. You...",
    opts: ["🗣️ Tell them directly — I hate keeping things in", "📱 Text them — easier than face to face", "🤐 Go quiet and hope they notice", "😅 Pretend it's fine and move on"],
  },
  {
    id: 3, cat: "LOYALTY", emoji: "🔐",
    q: "Your friend's ex starts being nice to you. You...",
    opts: ["🚫 Keep distance — loyalty to my friend, period", "🤔 Be polite but tell my friend about it", "😐 It's fine — people can talk to whoever", "🤷 I'd probably just vibe with them"],
  },
  {
    id: 4, cat: "COMMUNICATION", emoji: "💬",
    q: "When you have something important to say, you prefer...",
    opts: ["📞 Call them — voice is the only way", "💬 Long text or voice note first", "🧍 In person always — text kills the meaning", "🙈 I find it hard to say important things"],
  },
  {
    id: 5, cat: "EMOTIONS", emoji: "🫂",
    q: "When you're really stressed, you...",
    opts: ["💬 Need to talk it out with someone close", "🧘 Need space and alone time to reset", "😄 Distract myself — humour is my armour", "🎵 Music, journal, gym — I have my system"],
  },
  {
    id: 6, cat: "SOCIAL WORLD", emoji: "🌍",
    q: "Your friendship group is best described as...",
    opts: ["👯 Big and loud — I know everyone", "🌟 Small and tight — 3-4 real ones only", "🔀 Different groups for different vibes", "🐺 I'm more of a solo person honestly"],
  },
  {
    id: 7, cat: "FUTURE", emoji: "🚀",
    q: "When you think about your future, you feel...",
    opts: ["🚀 Excited — I have big plans, let's go!", "🌊 Relaxed — it'll work out somehow", "😰 Anxious — too many unknowns", "🎨 Creative — I want something that's mine"],
  },
  {
    id: 8, cat: "AUTHENTICITY", emoji: "🪞",
    q: "Around this person, you can be...",
    opts: ["😂 Completely weird and unfiltered", "😊 Yourself but still a bit mindful", "🎭 Slightly different around them", "😶 I edit myself more than I'd like to"],
  },
];

const ADULTS = [
  {
    id: 1, cat: "ENERGY", emoji: "⚡",
    q: "Your ideal Saturday looks like...",
    opts: ["🏠 Blanket fort, snacks, zero human contact", "🎉 Out — party, dinner, any excuse to go", "🌿 Brunch, walk, something lowkey social", "🎨 Working on a passion project or creative thing"],
  },
  {
    id: 2, cat: "CONFLICT", emoji: "🌊",
    q: "When you're upset with someone close, you...",
    opts: ["😤 Say it immediately — I can't hold it in", "🤐 Go quiet. I need time before I can talk", "📱 Text it out — easier than face to face", "😅 Laugh it off and hope it resolves itself"],
  },
  {
    id: 3, cat: "LOVE LANGUAGE", emoji: "💌",
    q: "You feel most cared for when someone...",
    opts: ["🎁 Surprises you with something thoughtful", "⏰ Gives you their full, undivided time", "🫂 Touches your arm, hugs you randomly", "💬 Says 'I'm proud of you' or checks in"],
  },
  {
    id: 4, cat: "TRUST", emoji: "🔒",
    q: "Your person is at a party without you. You...",
    opts: ["😌 Don't even think about it — full trust", "📲 Check in casually, nothing heavy", "😬 Try not to spiral but lowkey anxious", "🔍 Need frequent updates or I overthink"],
  },
  {
    id: 5, cat: "COMMUNICATION", emoji: "🗣️",
    q: "After a big argument, you need to...",
    opts: ["🗣️ Resolve it immediately — no going to bed upset", "🛏️ Sleep on it, talk tomorrow with fresh eyes", "✍️ Write my feelings first, then have the talk", "🤝 Move on without a full debrief — we're good"],
  },
  {
    id: 6, cat: "FUTURE", emoji: "🌱",
    q: "In 5 years, your dream life looks like...",
    opts: ["🌆 Big city, career climbing, always building", "🏡 Settled, stable, close to people I love", "✈️ Travelling, freelancing, figuring it out", "🌱 Something meaningful — impact over income"],
  },
  {
    id: 7, cat: "SPONTANEITY", emoji: "🚀",
    q: "Someone says 'road trip, leave in 2 hours.' You...",
    opts: ["🚀 Already packing — let's GO!", "📋 Only if we plan the route and book stays", "😅 Excited but need at least 24 hours notice", "😬 Hard pass — I need my routine"],
  },
  {
    id: 8, cat: "EMOTIONS", emoji: "💙",
    q: "When you're going through something hard, you...",
    opts: ["💬 Need to talk it out with my person", "🧘 Process alone first, share later if at all", "😄 Distract myself — humour is my coping", "📓 Journal, gym, music — I have my system"],
  },
  {
    id: 9, cat: "SOCIAL WORLD", emoji: "🌍",
    q: "Your friendship style is...",
    opts: ["👯 Ride or die with a big loud squad", "🌟 3-4 deep friendships, very tight circle", "🤝 Many acquaintances, few truly close ones", "🐺 Mostly a lone wolf — very selective"],
  },
  {
    id: 10, cat: "VALUES", emoji: "🙏",
    q: "The thing you absolutely cannot compromise on is...",
    opts: ["🙏 Shared values — worldview, culture, beliefs", "💰 Financial compatibility and money habits", "👨‍👩‍👧 Clarity on family — kids, living situation", "🌍 Lifestyle — where and how we live day to day"],
  },
];

const REL_TYPES = {
  juniors: [
    { id: "bff",      label: "💛 Best Friend",  desc: "Your ride-or-die" },
    { id: "sibling",  label: "👫 Sibling",       desc: "Brother or sister" },
    { id: "classmate",label: "🏫 Classmate",     desc: "School friend" },
    { id: "cousin",   label: "🤝 Cousin",        desc: "Family friend" },
  ],
  teens: [
    { id: "bff",    label: "💛 Best Friend",    desc: "Your absolute ride-or-die" },
    { id: "crush",  label: "💗 Crush",          desc: "Someone special maybe?" },
    { id: "squad",  label: "🔥 Squad Member",   desc: "Part of your group" },
    { id: "sibling",label: "👫 Sibling",        desc: "Love them, fight them" },
  ],
  adults: [
    { id: "romantic",     label: "❤️ Romantic",        desc: "Partner or potential partner" },
    { id: "friends",      label: "💛 Close Friend",    desc: "Your person" },
    { id: "situationship",label: "👀 Situationship",   desc: "It's complicated" },
    { id: "workbestie",   label: "💼 Work Bestie",     desc: "Office soulmate" },
  ],
};

// ── SCORING ───────────────────────────────────────────────────────────────────
function calcScore(answers, relType, mode) {
  const weights = {
    adults: {
      romantic:      { CONFLICT:3, COMMUNICATION:3, LOVE_LANGUAGE:3, TRUST:2, VALUES:3, ENERGY:1.5, FUTURE:2, EMOTIONS:2, SOCIAL_WORLD:1, SPONTANEITY:1 },
      friends:       { CONFLICT:2, COMMUNICATION:2, ENERGY:3, SPONTANEITY:3, SOCIAL_WORLD:2, EMOTIONS:2, FUTURE:1.5, VALUES:1.5, LOVE_LANGUAGE:1, TRUST:1 },
      situationship: { TRUST:3, COMMUNICATION:2, ENERGY:2, EMOTIONS:2, CONFLICT:2, SOCIAL_WORLD:1.5, VALUES:1, FUTURE:1, LOVE_LANGUAGE:2, SPONTANEITY:1.5 },
      workbestie:    { COMMUNICATION:3, CONFLICT:3, ENERGY:2, VALUES:2, EMOTIONS:1.5, FUTURE:1, SOCIAL_WORLD:2, TRUST:1, LOVE_LANGUAGE:0.5, SPONTANEITY:1 },
    },
    teens: {
      default: { VIBE:2, CONFLICT:2, LOYALTY:3, COMMUNICATION:2, EMOTIONS:2, SOCIAL_WORLD:1.5, FUTURE:1.5, AUTHENTICITY:3 },
    },
    juniors: {
      default: { ENERGY:2, KINDNESS:3, SECRETS:3, FAIRNESS:2, LOYALTY:3, FUN:2 },
    },
  };

  const q = mode === "juniors" ? JUNIORS : mode === "teens" ? TEENS : ADULTS;
  const w = mode === "adults" ? weights.adults[relType] : weights[mode].default;

  let score = 0, total = 0;
  q.forEach((question, i) => {
    const weight = w[question.cat] || 1;
    total += weight * 3;
    const diff = Math.abs((answers.self[i] ?? 0) - (answers.perception[i] ?? 0));
    if (diff === 0) score += weight * 3;
    else if (diff === 1) score += weight * 1.5;
  });

  const raw = Math.round((score / total) * 100);
  // Small variance to avoid same scores
  const salt = ((answers.self.reduce((a,b)=>a+b,0) * 3) % 7) - 3;
  return Math.min(98, Math.max(38, raw + salt));
}

function getResult(score, mode, relType) {
  const results = {
    high: {
      juniors:  { emoji:"🌟", title:"Dream Squad!", punchline:"You two are basically the same person. Your teachers are worried.", desc:"Rare matching energy. You'll never run out of things to do together." },
      teens:    { emoji:"👯", title:"Iconic Duo!", punchline:"The universe specifically made you two for this friendship.", desc:"High vibe match. You get each other on a level most people don't." },
      romantic: { emoji:"🔥", title:"Cosmic Match!", punchline:"The algorithm is scared of you two.", desc:"Rare, deep alignment. You see each other clearly AND want the same things." },
      friends:  { emoji:"💛", title:"Soul Friends!", punchline:"You're the friendship people write songs about.", desc:"Deep compatibility. This is the kind of friendship that lasts decades." },
      situationship: { emoji:"😳", title:"Uh Oh.", punchline:"This isn't a situationship anymore. Just saying.", desc:"Your compatibility is too high to stay undefined. Time for a conversation." },
      workbestie: { emoji:"⚡", title:"Dream Team!", punchline:"Your manager is going to take credit for your results.", desc:"Complementary strengths and matching work styles. You'd crush any project." },
    },
    mid: {
      juniors:  { emoji:"😄", title:"Pretty Good Pals!", punchline:"Some differences, but nothing a good snack break can't fix.", desc:"Good foundation. You'll keep each other interesting." },
      teens:    { emoji:"💚", title:"Great Duo!", punchline:"Different enough to grow. Similar enough to have a great time.", desc:"Strong compatibility with just enough difference to keep things interesting." },
      romantic: { emoji:"💕", title:"Real Potential!", punchline:"Good chemistry. The mystery keeps it interesting.", desc:"Strong foundation. A little work goes a long way here." },
      friends:  { emoji:"🤝", title:"Good Vibes!", punchline:"You see each other. That's rarer than you think.", desc:"Solid compatibility. The differences make it more interesting, not less." },
      situationship: { emoji:"🌊", title:"Complicated.",  punchline:"You're compatible enough to be confused about this for a while.", desc:"Real connection, some friction. Worth figuring out what this actually is." },
      workbestie: { emoji:"💪", title:"Solid Partners!", punchline:"Different styles, shared goals. That's actually ideal.", desc:"Complementary approaches. You cover each other's blind spots well." },
    },
    low: {
      juniors:  { emoji:"🤷", title:"Interesting Pair!", punchline:"Opposites sometimes make the best chaos together.", desc:"Very different styles. Could be exciting — or a lot of arguing about games." },
      teens:    { emoji:"⚡", title:"Opposites Attract?", punchline:"Chaotic. Probably exciting. Definitely unpredictable.", desc:"Big differences. You'll either bring out the best or the wildest in each other." },
      romantic: { emoji:"🤷", title:"Big Work Ahead.", punchline:"The universe is testing you both.", desc:"Significant differences. Not impossible — but both need to genuinely want it." },
      friends:  { emoji:"🫤", title:"Unlikely Duo.", punchline:"Different planets. Space travel exists though.", desc:"Different worlds. Could surprise each other — if you're both open to it." },
      situationship: { emoji:"😬", title:"Proceed with Care.", punchline:"The vibe is off. Trust the data.", desc:"Low alignment. The connection might be more situational than real." },
      workbestie: { emoji:"😬", title:"Handle with Care.", punchline:"You'll need very clear roles and boundaries.", desc:"Very different work styles. Not impossible — just requires deliberate effort." },
    },
  };

  const tier = score >= 75 ? "high" : score >= 52 ? "mid" : "low";
  const modeKey = mode === "adults" ? relType : mode;
  return { ...results[tier][modeKey] || results[tier].romantic, tier, score };
}

// ── STYLES ────────────────────────────────────────────────────────────────────
const S = {
  app: {
    minHeight: "100vh",
    background: "#070510",
    fontFamily: "'Outfit', sans-serif",
    display: "flex", flexDirection: "column", alignItems: "center",
    padding: "0 0 80px", position: "relative", overflow: "hidden",
  },
  card: (anim = true) => ({
    width: "100%", maxWidth: 420, padding: "0 20px", boxSizing: "border-box",
    animation: anim ? "fadeUp 0.5s ease forwards" : "none",
  }),
  glassCard: (color = "rgba(255,255,255,0.04)") => ({
    background: color,
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 24,
    overflow: "hidden",
    boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
  }),
  btn: (bg = "#FF6B9D", ghost = false) => ({
    width: "100%", padding: "16px", borderRadius: 16,
    border: ghost ? `2px solid ${bg}` : "none",
    background: ghost ? "transparent" : bg,
    color: "#fff", fontSize: 16, fontWeight: 700,
    fontFamily: "'Outfit', sans-serif", cursor: "pointer",
    boxShadow: ghost ? "none" : `0 8px 24px ${bg}55`,
    transition: "all 0.2s", letterSpacing: 0.3,
  }),
  label: { color: "rgba(255,255,255,0.4)", fontSize: 11, letterSpacing: 2.5, fontWeight: 700 },
};

// ── FLOATING PARTICLES ────────────────────────────────────────────────────────
const Particles = ({ color1 = "#FF6B9D", color2 = "#FFD93D" }) => (
  <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0, overflow:"hidden" }}>
    {[...Array(14)].map((_, i) => (
      <div key={i} style={{
        position:"absolute",
        width: `${5 + (i%4)*4}px`, height: `${5 + (i%4)*4}px`,
        borderRadius: "50%",
        background: [color1+"33", color2+"33", "#6BCB7733", "#a78bfa33"][i%4],
        left: `${(i*37+13)%100}%`, top: `${(i*53+7)%100}%`,
        animation: `float${i%3} ${6+(i%5)}s ease-in-out infinite`,
        animationDelay: `${i*0.4}s`,
      }} />
    ))}
  </div>
);

// ── PROGRESS BAR ──────────────────────────────────────────────────────────────
const ProgressBar = ({ current, total, color }) => (
  <div style={{ width:"100%", height:4, background:"rgba(255,255,255,0.08)", borderRadius:99, marginBottom:28 }}>
    <div style={{ height:"100%", width:`${(current/total)*100}%`, background:color, borderRadius:99, transition:"width 0.4s ease" }} />
  </div>
);

// ── SCORE RING ─────────────────────────────────────────────────────────────────
const ScoreRing = ({ score, color, size = 160 }) => {
  const r = size*0.42, circ = 2*Math.PI*r;
  return (
    <svg width={size} height={size} style={{ filter:`drop-shadow(0 0 20px ${color}88)` }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={size*0.07} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={size*0.07}
        strokeDasharray={`${(score/100)*circ} ${circ}`} strokeLinecap="round"
        transform={`rotate(-90 ${size/2} ${size/2})`}
        style={{ transition:"stroke-dasharray 1.4s cubic-bezier(.4,0,.2,1)" }} />
      <text x={size/2} y={size/2-6} textAnchor="middle" fill="white" fontSize={size*0.22} fontWeight={900} fontFamily="'Syne',sans-serif">{score}</text>
      <text x={size/2} y={size/2+16} textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize={size*0.08} fontFamily="'Outfit',sans-serif" letterSpacing={2}>MATCH</text>
    </svg>
  );
};

// ── MAIN APP ──────────────────────────────────────────────────────────────────
export default function VibeCheck() {
  const [screen, setScreen]     = useState("splash");       // splash|age|reltype|names|quiz_self|quiz_peer|result
  const [mode, setMode]         = useState(null);           // juniors|teens|adults
  const [relType, setRelType]   = useState(null);
  const [name1, setName1]       = useState("");
  const [name2, setName2]       = useState("");
  const [qIndex, setQIndex]     = useState(0);
  const [phase, setPhase]       = useState("self");         // self|perception
  const [answers, setAnswers]   = useState({ self:[], perception:[] });
  const [selected, setSelected] = useState(null);
  const [result, setResult]     = useState(null);
  const [unlocked, setUnlocked] = useState(false);
  const [animIn, setAnimIn]     = useState(true);
  const scrollRef = useRef(null);

  const questions = mode === "juniors" ? JUNIORS : mode === "teens" ? TEENS : ADULTS;
  const relTypes  = mode ? REL_TYPES[mode] : [];

  const modeConfig = {
    juniors: { color:"#EA580C", accent:"#FED7AA", label:"🟠 Juniors",  bg:"rgba(234,88,12,0.15)"  },
    teens:   { color:"#16A34A", accent:"#BBF7D0", label:"🟢 Teens",    bg:"rgba(22,163,74,0.15)"  },
    adults:  { color:"#7C3AED", accent:"#DDD6FE", label:"🟣 Adults",   bg:"rgba(124,58,237,0.15)" },
  };
  const mc = mode ? modeConfig[mode] : modeConfig.adults;

  const go = (to) => {
    setAnimIn(false);
    setTimeout(() => { setScreen(to); setAnimIn(true); if(scrollRef.current) scrollRef.current.scrollTop = 0; }, 260);
  };

  const handleAnswer = (idx) => {
    setSelected(idx);
    setTimeout(() => {
      setSelected(null);
      const key = phase === "self" ? "self" : "perception";
      const updated = { ...answers, [key]: [...answers[key], idx] };
      setAnswers(updated);
      if (qIndex + 1 < questions.length) {
        setQIndex(qIndex + 1);
      } else {
        if (phase === "self") {
          setPhase("perception");
          setQIndex(0);
          go("quiz_peer");
        } else {
          const score = calcScore(updated, relType, mode);
          const r = getResult(score, mode, relType);
          setResult({ ...r, score });
          go("result");
        }
      }
    }, 350);
  };

  const reset = () => {
    setScreen("splash"); setMode(null); setRelType(null);
    setName1(""); setName2(""); setQIndex(0); setPhase("self");
    setAnswers({ self:[], perception:[] }); setResult(null); setUnlocked(false);
    setAnimIn(true);
  };

  // ── SCREENS ──────────────────────────────────────────────────────────────────

  // SPLASH
  if (screen === "splash") return (
    <div style={S.app} ref={scrollRef}>
      <style>{FONTS}{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes float0{0%,100%{transform:translateY(0)}50%{transform:translateY(-18px)}}
        @keyframes float1{0%,100%{transform:translateY(0)}50%{transform:translateY(-24px)}}
        @keyframes float2{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
        @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
        @keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(255,107,157,0.5)}50%{box-shadow:0 0 0 16px rgba(255,107,157,0)}}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        button:active{transform:scale(0.97)!important}
        input{outline:none}
        *{box-sizing:border-box;margin:0;padding:0}
      `}</style>
      <Particles />
      <div style={{ ...S.card(), paddingTop:60, animation:"fadeUp 0.7s ease forwards" }}>
        <div style={{ textAlign:"center", marginBottom:40 }}>
          <div style={{ fontSize:64, marginBottom:16, animation:"float0 4s ease-in-out infinite" }}>🔮</div>
          <div style={{
            fontFamily:"'Syne',sans-serif", fontWeight:900, fontSize:52, lineHeight:1,
            background:"linear-gradient(135deg, #FF6B9D 0%, #FFD93D 50%, #a78bfa 100%)",
            backgroundSize:"200% auto", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
            animation:"shimmer 4s linear infinite", marginBottom:8,
          }}>VibeCheck</div>
          <div style={{ color:"rgba(255,255,255,0.5)", fontSize:14, letterSpacing:3, fontWeight:600 }}>
            ARE YOU ACTUALLY COMPATIBLE?
          </div>
        </div>

        <div style={{ ...S.glassCard(), padding:"24px", marginBottom:20 }}>
          <div style={{ color:"rgba(255,255,255,0.75)", fontSize:15, lineHeight:1.7, textAlign:"center" }}>
            One person answers about <strong style={{color:"#FF6B9D"}}>themselves</strong> AND about their <strong style={{color:"#FFD93D"}}>person</strong>.<br/>
            The gap between those answers is your real compatibility.
          </div>
        </div>

        <div style={{ display:"flex", gap:10, marginBottom:20 }}>
          {["💘 Romantic","💛 Friends","💼 Work","👫 Siblings","🔥 Squad"].map((t,i) => (
            <div key={i} style={{ padding:"6px 12px", borderRadius:99, background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", color:"rgba(255,255,255,0.6)", fontSize:12, whiteSpace:"nowrap" }}>{t}</div>
          ))}
        </div>

        <button style={{ ...S.btn("#FF6B9D"), marginBottom:12, animation:"pulse 2.5s infinite" }}
          onClick={() => go("age")}>
          Check Your Vibe ✨
        </button>
        <div style={{ textAlign:"center", color:"rgba(255,255,255,0.3)", fontSize:12 }}>
          Free · No account needed · Takes 2 mins
        </div>
      </div>
    </div>
  );

  // AGE SELECTION
  if (screen === "age") return (
    <div style={S.app}>
      <style>{FONTS}{`@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}@keyframes float0{0%,100%{transform:translateY(0)}50%{transform:translateY(-18px)}}@keyframes float1{0%,100%{transform:translateY(0)}50%{transform:translateY(-24px)}}@keyframes float2{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}button:active{transform:scale(0.97)!important}*{box-sizing:border-box;margin:0;padding:0}`}</style>
      <Particles />
      <div style={{ ...S.card(), paddingTop:50, opacity:animIn?1:0, transform:animIn?"translateY(0)":"translateY(16px)", transition:"all 0.26s ease" }}>
        <div style={{ marginBottom:32 }}>
          <div style={{ color:"rgba(255,255,255,0.4)", fontSize:12, letterSpacing:3, marginBottom:8 }}>STEP 1 OF 4</div>
          <div style={{ fontFamily:"'Syne',sans-serif", color:"#fff", fontSize:28, fontWeight:800, lineHeight:1.2 }}>
            How old are you?
          </div>
          <div style={{ color:"rgba(255,255,255,0.5)", fontSize:14, marginTop:8 }}>
            We'll show you questions that actually make sense for your life.
          </div>
        </div>

        {[
          { key:"juniors", emoji:"🟠", range:"10 – 12", label:"Juniors", sub:"BFF, Sibling, Classmate, Cousin", color:"#EA580C" },
          { key:"teens",   emoji:"🟢", range:"13 – 17", label:"Teens",   sub:"BFF, Crush, Squad, Sibling",     color:"#16A34A" },
          { key:"adults",  emoji:"🟣", range:"18 – 26", label:"Adults",  sub:"Romantic, Friends, Situationship, Work", color:"#7C3AED" },
        ].map(({ key, emoji, range, label, sub, color }) => (
          <div key={key}
            onClick={() => { setMode(key); go("reltype"); }}
            style={{
              ...S.glassCard(mode===key ? `${color}22` : "rgba(255,255,255,0.04)"),
              padding:"20px", marginBottom:12, cursor:"pointer",
              border: mode===key ? `1.5px solid ${color}66` : "1px solid rgba(255,255,255,0.08)",
              transition:"all 0.2s",
            }}>
            <div style={{ display:"flex", alignItems:"center", gap:16 }}>
              <div style={{ fontSize:32 }}>{emoji}</div>
              <div style={{ flex:1 }}>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <span style={{ color:"#fff", fontWeight:700, fontSize:18 }}>{label}</span>
                  <span style={{ color, fontWeight:700, fontSize:14, background:`${color}22`, padding:"2px 10px", borderRadius:99 }}>{range}</span>
                </div>
                <div style={{ color:"rgba(255,255,255,0.45)", fontSize:13, marginTop:3 }}>{sub}</div>
              </div>
              <div style={{ color:"rgba(255,255,255,0.3)", fontSize:18 }}>›</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // RELATIONSHIP TYPE
  if (screen === "reltype") return (
    <div style={S.app}>
      <style>{FONTS}{`@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}button:active{transform:scale(0.97)!important}*{box-sizing:border-box;margin:0;padding:0}`}</style>
      <Particles color1={mc.color} color2={mc.accent} />
      <div style={{ ...S.card(), paddingTop:50, opacity:animIn?1:0, transform:animIn?"translateY(0)":"translateY(16px)", transition:"all 0.26s ease" }}>
        <div style={{ marginBottom:32 }}>
          <div style={{ display:"inline-block", padding:"4px 14px", borderRadius:99, background:mc.bg, border:`1px solid ${mc.color}44`, color:mc.color, fontSize:12, fontWeight:700, letterSpacing:1, marginBottom:12 }}>
            {mc.label}
          </div>
          <div style={{ fontFamily:"'Syne',sans-serif", color:"#fff", fontSize:28, fontWeight:800 }}>
            Who are you checking?
          </div>
          <div style={{ color:"rgba(255,255,255,0.5)", fontSize:14, marginTop:8 }}>
            Pick the relationship type you want to test.
          </div>
        </div>

        {relTypes.map(rt => (
          <div key={rt.id}
            onClick={() => { setRelType(rt.id); go("names"); }}
            style={{
              ...S.glassCard(relType===rt.id ? `${mc.color}22` : "rgba(255,255,255,0.04)"),
              padding:"18px 20px", marginBottom:12, cursor:"pointer",
              border: relType===rt.id ? `1.5px solid ${mc.color}66` : "1px solid rgba(255,255,255,0.08)",
              transition:"all 0.2s",
            }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <div>
                <div style={{ color:"#fff", fontWeight:700, fontSize:17 }}>{rt.label}</div>
                <div style={{ color:"rgba(255,255,255,0.45)", fontSize:13, marginTop:2 }}>{rt.desc}</div>
              </div>
              <div style={{ color:"rgba(255,255,255,0.3)", fontSize:18 }}>›</div>
            </div>
          </div>
        ))}

        <button style={{ ...S.btn("rgba(255,255,255,0.08)", true), marginTop:8, border:"1px solid rgba(255,255,255,0.15)" }}
          onClick={() => go("age")}>
          ← Back
        </button>
      </div>
    </div>
  );

  // NAMES
  if (screen === "names") return (
    <div style={S.app}>
      <style>{FONTS}{`@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}button:active{transform:scale(0.97)!important}input::placeholder{color:rgba(255,255,255,0.25)}*{box-sizing:border-box;margin:0;padding:0}`}</style>
      <Particles color1={mc.color} color2={mc.accent} />
      <div style={{ ...S.card(), paddingTop:50, opacity:animIn?1:0, transform:animIn?"translateY(0)":"translateY(16px)", transition:"all 0.26s ease" }}>
        <div style={{ marginBottom:32 }}>
          <div style={{ color:"rgba(255,255,255,0.4)", fontSize:12, letterSpacing:3, marginBottom:8 }}>STEP 2 OF 4</div>
          <div style={{ fontFamily:"'Syne',sans-serif", color:"#fff", fontSize:28, fontWeight:800 }}>
            Who are we checking?
          </div>
          <div style={{ color:"rgba(255,255,255,0.5)", fontSize:14, marginTop:8 }}>
            Just first names are enough. Nothing is saved.
          </div>
        </div>

        <div style={{ ...S.glassCard(), padding:"24px", marginBottom:20 }}>
          <div style={{ color:"rgba(255,255,255,0.4)", fontSize:11, letterSpacing:2, marginBottom:8, fontWeight:700 }}>YOUR NAME</div>
          <input value={name1} onChange={e=>setName1(e.target.value)} maxLength={20}
            placeholder="Enter your name"
            style={{ width:"100%", padding:"14px 16px", borderRadius:12, fontSize:16, background:"rgba(255,255,255,0.06)", border:`1.5px solid ${name1?"rgba(255,255,255,0.2)":"rgba(255,255,255,0.08)"}`, color:"#fff", fontFamily:"'Outfit',sans-serif", marginBottom:20, transition:"border 0.2s" }} />

          <div style={{ color:"rgba(255,255,255,0.4)", fontSize:11, letterSpacing:2, marginBottom:8, fontWeight:700 }}>THEIR NAME</div>
          <input value={name2} onChange={e=>setName2(e.target.value)} maxLength={20}
            placeholder="Enter their name"
            style={{ width:"100%", padding:"14px 16px", borderRadius:12, fontSize:16, background:"rgba(255,255,255,0.06)", border:`1.5px solid ${name2?"rgba(255,255,255,0.2)":"rgba(255,255,255,0.08)"}`, color:"#fff", fontFamily:"'Outfit',sans-serif", transition:"border 0.2s" }} />
        </div>

        <button style={{ ...S.btn(mc.color), opacity: name1.trim()&&name2.trim() ? 1 : 0.4 }}
          disabled={!name1.trim()||!name2.trim()}
          onClick={() => { setPhase("self"); setQIndex(0); go("quiz_self"); }}>
          Start the Quiz →
        </button>
        <button style={{ ...S.btn("rgba(255,255,255,0.08)", true), marginTop:10, border:"1px solid rgba(255,255,255,0.15)" }}
          onClick={() => go("reltype")}>← Back</button>
      </div>
    </div>
  );

  // QUIZ — SELF
  if (screen === "quiz_self" || screen === "quiz_peer") {
    const isPeer = screen === "quiz_peer";
    const q = questions[qIndex];
    const activeName = isPeer ? name1 : name1;
    const subjectName = isPeer ? name2 : name1;
    const questionLabel = isPeer
      ? `How do you see ${name2}?`
      : `How do you see yourself?`;
    const questionSub = isPeer
      ? `Answer as ${name1} — what do you think ${name2} would say?`
      : `Answer honestly as ${name1}`;

    return (
      <div style={S.app}>
        <style>{FONTS}{`@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}@keyframes optionIn{from{opacity:0;transform:translateX(-10px)}to{opacity:1;transform:translateX(0)}}button:active{transform:scale(0.97)!important}*{box-sizing:border-box;margin:0;padding:0}`}</style>
        <Particles color1={mc.color} color2={mc.accent} />
        <div style={{ ...S.card(), paddingTop:36, opacity:animIn?1:0, transform:animIn?"translateY(0)":"translateY(16px)", transition:"all 0.26s ease" }}>

          {/* Who's answering */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ width:8, height:8, borderRadius:"50%", background: isPeer ? mc.accent : mc.color }} />
              <span style={{ color:"#fff", fontSize:14, fontWeight:600 }}>{name1}</span>
              <span style={{ color:"rgba(255,255,255,0.3)", fontSize:12 }}>answering about</span>
              <span style={{ color: isPeer ? mc.accent : mc.color, fontSize:14, fontWeight:700 }}>{isPeer ? name2 : "themselves"}</span>
            </div>
            <span style={{ color:"rgba(255,255,255,0.35)", fontSize:13 }}>{qIndex+1}/{questions.length}</span>
          </div>

          <ProgressBar current={qIndex+1} total={questions.length} color={isPeer ? mc.accent : mc.color} />

          {/* Category chip */}
          <div style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"4px 12px", borderRadius:99, background:`${mc.color}22`, border:`1px solid ${mc.color}44`, marginBottom:16 }}>
            <span style={{ fontSize:14 }}>{q.emoji}</span>
            <span style={{ color:mc.color, fontSize:11, fontWeight:700, letterSpacing:1.5 }}>{q.cat}</span>
          </div>

          {/* Question */}
          <div style={{ fontFamily:"'Syne',sans-serif", color:"#fff", fontSize:22, fontWeight:800, lineHeight:1.35, marginBottom:6 }}>
            {q.q}
          </div>
          <div style={{ color:"rgba(255,255,255,0.4)", fontSize:13, marginBottom:24, fontStyle:"italic" }}>
            {questionLabel}
          </div>

          {/* Options */}
          {q.opts.map((opt, i) => (
            <button key={i}
              onClick={() => handleAnswer(i)}
              style={{
                width:"100%", padding:"15px 18px", borderRadius:14, marginBottom:10,
                background: selected===i ? `${mc.color}33` : "rgba(255,255,255,0.04)",
                border: selected===i ? `1.5px solid ${mc.color}` : "1px solid rgba(255,255,255,0.08)",
                color:"#fff", fontSize:15, textAlign:"left", cursor:"pointer",
                fontFamily:"'Outfit',sans-serif", fontWeight: selected===i ? 600 : 400,
                transition:"all 0.18s",
                transform: selected===i ? "scale(0.98)" : "scale(1)",
                animation:`optionIn 0.3s ease ${i*0.05}s both`,
              }}>
              {opt}
            </button>
          ))}

          {/* Phase indicator dots */}
          <div style={{ display:"flex", justifyContent:"center", gap:8, marginTop:8 }}>
            {["self","perception"].map((ph,i) => (
              <div key={ph} style={{ width: isPeer&&i===1 || !isPeer&&i===0 ? 20 : 8, height:8, borderRadius:99, background: isPeer&&i===1 || !isPeer&&i===0 ? mc.color : "rgba(255,255,255,0.2)", transition:"all 0.3s" }} />
            ))}
          </div>
          <div style={{ textAlign:"center", color:"rgba(255,255,255,0.3)", fontSize:12, marginTop:6 }}>
            {isPeer ? "Round 2 of 2" : "Round 1 of 2"}
          </div>
        </div>
      </div>
    );
  }

  // RESULT
  if (screen === "result" && result) {
    const isHigh = result.score >= 75;
    const isMid  = result.score >= 52;
    const resultColor = isHigh ? "#6BCB77" : isMid ? "#FFD93D" : "#FF6B9D";

    // Fake breakdown for display
    const breakdown = questions.slice(0,5).map((q, i) => {
      const diff = Math.abs((answers.self[i]??0)-(answers.perception[i]??0));
      const cat_score = diff===0 ? 88+Math.floor(Math.random()*10) : diff===1 ? 60+Math.floor(Math.random()*15) : 35+Math.floor(Math.random()*20);
      return { cat: q.cat, emoji: q.emoji, score: cat_score };
    });

    return (
      <div style={S.app}>
        <style>{FONTS}{`@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}@keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}@keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(107,203,119,0.5)}50%{box-shadow:0 0 0 16px rgba(107,203,119,0)}}button:active{transform:scale(0.97)!important}*{box-sizing:border-box;margin:0;padding:0}`}</style>
        <Particles color1={resultColor} color2={mc.color} />

        <div style={{ ...S.card(), paddingTop:36, opacity:animIn?1:0, transform:animIn?"translateY(0)":"translateY(16px)", transition:"all 0.26s ease" }}>

          {/* Header */}
          <div style={{ textAlign:"center", marginBottom:24 }}>
            <div style={{ color:"rgba(255,255,255,0.35)", fontSize:11, letterSpacing:3, marginBottom:16, fontWeight:700 }}>COMPATIBILITY RESULT</div>

            <div style={{ display:"flex", justifyContent:"center", marginBottom:16 }}>
              <ScoreRing score={result.score} color={resultColor} />
            </div>

            <div style={{ fontSize:40, marginBottom:6 }}>{result.emoji}</div>
            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:26, color:"#fff", fontWeight:900, marginBottom:6 }}>
              {result.title}
            </div>
            <div style={{ color:"rgba(255,255,255,0.6)", fontSize:14, lineHeight:1.5, marginBottom:16 }}>
              {result.desc}
            </div>

            {/* Pair names */}
            <div style={{ display:"inline-flex", alignItems:"center", gap:10, padding:"8px 20px", borderRadius:99, background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)" }}>
              <span style={{ color:"#fff", fontWeight:700 }}>{name1}</span>
              <span style={{ color:"rgba(255,255,255,0.3)" }}>×</span>
              <span style={{ color:"#fff", fontWeight:700 }}>{name2}</span>
            </div>
          </div>

          {/* FREE SECTION */}
          <div style={{ ...S.glassCard(), padding:"20px", marginBottom:16 }}>
            <div style={{ ...S.label, marginBottom:12 }}>WHERE YOU CLICK ✨</div>
            <div style={{ color:"#fff", fontSize:15, lineHeight:1.6 }}>
              Your <strong style={{color:resultColor}}>{breakdown[0]?.cat}</strong> styles are naturally in sync — this is your strongest compatibility dimension.
            </div>
          </div>

          {/* TEASER — blurred unless unlocked */}
          <div style={{ ...S.glassCard(), padding:"20px", marginBottom:16, position:"relative", overflow:"hidden" }}>
            <div style={{ ...S.label, marginBottom:12 }}>YOUR #1 FRICTION POINT 🔥</div>
            <div style={{
              color:"#fff", fontSize:15, lineHeight:1.6,
              filter: unlocked ? "none" : "blur(7px)",
              userSelect: unlocked ? "auto" : "none",
              transition:"filter 0.5s",
            }}>
              Your <strong style={{color:"#FF6B9D"}}>{breakdown[breakdown.length-1]?.cat}</strong> styles are where you differ most. This is your most likely friction point — the area where miscommunication could quietly build if you're not aware of it.
            </div>
            {!unlocked && (
              <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", background:"rgba(7,5,16,0.6)", backdropFilter:"blur(2px)" }}>
                <div style={{ fontSize:24, marginBottom:6 }}>🔒</div>
                <div style={{ color:"rgba(255,255,255,0.6)", fontSize:13 }}>Unlock to reveal</div>
              </div>
            )}
          </div>

          {/* PAID: full breakdown */}
          {unlocked && (
            <div style={{ ...S.glassCard(), padding:"20px", marginBottom:16, animation:"fadeUp 0.5s ease forwards" }}>
              <div style={{ ...S.label, marginBottom:16 }}>FULL BREAKDOWN</div>
              {breakdown.map((b, i) => (
                <div key={i} style={{ marginBottom:14 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                    <span style={{ color:"rgba(255,255,255,0.8)", fontSize:14 }}>{b.emoji} {b.cat}</span>
                    <span style={{ fontSize:14, fontWeight:700, color: b.score>=75?"#6BCB77":b.score>=55?"#FFD93D":"#FF6B9D" }}>{b.score}%</span>
                  </div>
                  <div style={{ height:5, borderRadius:99, background:"rgba(255,255,255,0.08)" }}>
                    <div style={{ height:"100%", width:`${b.score}%`, borderRadius:99, background: b.score>=75?"#6BCB77":b.score>=55?"#FFD93D":"#FF6B9D", transition:`width 1s ease ${i*0.15}s` }} />
                  </div>
                </div>
              ))}

              {/* Punchline */}
              <div style={{ marginTop:20, padding:"18px", borderRadius:16, background:"rgba(255,255,255,0.04)", border:`1px solid ${resultColor}44`, textAlign:"center" }}>
                <div style={{ fontFamily:"'Syne',sans-serif", fontSize:16, color:"#fff", fontStyle:"italic", lineHeight:1.5, marginBottom:6 }}>
                  "{result.punchline}"
                </div>
                <div style={{ color:"rgba(255,255,255,0.3)", fontSize:11, letterSpacing:1 }}>vibecheck.in ✨</div>
              </div>

              {/* What to do */}
              <div style={{ marginTop:16, padding:"16px", borderRadius:14, background:`${mc.color}15`, border:`1px solid ${mc.color}33` }}>
                <div style={{ ...S.label, marginBottom:8, color:mc.color }}>WHAT TO DO ABOUT IT</div>
                <div style={{ color:"rgba(255,255,255,0.75)", fontSize:14, lineHeight:1.6 }}>
                  Talk about your {breakdown[breakdown.length-1]?.cat?.toLowerCase()} styles openly — not during a conflict, but in a calm moment. Understanding the pattern is the first step to changing it.
                </div>
              </div>
            </div>
          )}

          {/* CTA */}
          {!unlocked ? (
            <>
              <button style={{ ...S.btn(resultColor), marginBottom:10 }}
                onClick={() => setUnlocked(true)}>
                🔓 Unlock Full Report + Share Card · ₹29
              </button>
              {/* Ad strip */}
              <div style={{ padding:"10px 14px", borderRadius:12, background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.06)", display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                <span style={{ color:"rgba(255,255,255,0.2)", fontSize:10, letterSpacing:1, fontWeight:700 }}>AD</span>
                <span style={{ color:"rgba(255,255,255,0.4)", fontSize:12 }}>Bewakoof — outfits that match your vibe 👕</span>
              </div>
            </>
          ) : (
            <button style={{ ...S.btn("#6BCB77"), marginBottom:10, animation:"pulse 2.5s infinite" }}>
              📤 Share to Instagram Stories
            </button>
          )}

          <button style={{ ...S.btn("rgba(255,255,255,0.08)", true), border:"1px solid rgba(255,255,255,0.12)" }}
            onClick={reset}>
            🔄 Test Another Pair
          </button>
        </div>
      </div>
    );
  }

  return null;
}

    
