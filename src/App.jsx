import { useState, useRef, useEffect, useCallback } from "react";
import "./index.css";

const NAME = "Al Zia Online Quran Academy";
const MALE = { name: "Muhaimin Zia", phone: "0305 5290068", wa: "https://wa.me/923055290068" };
const FEMALE = { name: "Munaza Zia", phone: "0303 6509597", wa: "https://wa.me/923036509597" };
const tel = (p) => `tel:${p.replace(/\s/g, "")}`;
const HELLO = "Assalamu Alaikum, I would like to know about your online Quran classes.";
const wam = (p, text = HELLO) => `${p.wa}?text=${encodeURIComponent(text)}`;

const NAV = [["Home", "#top"], ["About Us", "#about"], ["Our Courses", "#courses"], ["Our Achievements", "#achievements"], ["Pricing", "#pricing"], ["Contact", "#contact"]];
const PERIOD = "month"; // change to "week", "class" etc. if needed
const PLANS = [
  { icon: "👨‍👩‍👧‍👦", name: "Group Classes", who: "For children", price: 4, badge: "Best for Children", list: ["Live online group class", "Children learn together", "Proper Tajweed", "Male & female teachers"] },
  { icon: "🧑‍🎓", name: "One-to-One", who: "For one student", price: 8, hot: true, badge: "Personal Attention", list: ["Live one-to-one class", "Full focus on one student", "Nazra, Hifz, Tajweed & Tafseer", "Male & female teachers"] },
];
const FEATURES = [["👥", "Qualified Teachers", "Experienced teachers who teach the Quran with proper Tajweed."], ["💬", "Online Classes", "Live one-to-one classes from the comfort of your home."], ["👩", "For Children & Women", "A caring, respectful learning environment for children and women."]];
const MISSION = "Our mission is to spread the light of the Holy Quran by providing quality online Quran education with proper Tajweed, translation, and Tafseer. We aim to help children and women learn the Quran correctly, understand its teachings, and apply Islamic values in their daily lives.";
const VISION = "Our vision is to build a Quran-loving generation that understands the message of Allah, follows the teachings of Islam, and spreads goodness, knowledge, and kindness in society. We aspire to make authentic Quran education accessible to every home.";
const VALUES = [
  ["Quran & Sunnah", "Following the teachings of the Holy Quran and Sunnah."],
  ["Sincerity", "Teaching with pure intentions for the pleasure of Allah."],
  ["Quality Education", "Providing accurate Quran teaching with proper Tajweed."],
  ["Respect", "Treating every student with kindness and respect."],
  ["Patience", "Teaching every student with love, care, and patience."],
  ["Trust", "Maintaining honesty, responsibility, and professionalism."],
  ["Islamic Character", "Building good manners and strong Islamic values."],
];
const VICONS = ["📖", "🤲", "🎓", "🤝", "🌿", "🛡️", "🌙"];
const GALLERY = [
 {
  "type": "feedback",
  "src": "/certificates/student-impressions.webp",
  "title": "Students’ Impressions",
  "sub": "Feedback from three students",
  "w": 1449,
  "h": 810
 },
 {
  "type": "feedback",
  "src": "/certificates/feedback-ayesha-khuwaja.webp",
  "title": "Ayesha Khuwaja",
  "sub": "Student feedback · Madni Qaida",
  "w": 1016,
  "h": 807
 },
 {
  "type": "feedback",
  "src": "/certificates/feedback-anila-noreen.webp",
  "title": "Anila Noreen",
  "sub": "Student feedback · Madni Qaida",
  "w": 649,
  "h": 800
 },
 {
  "type": "feedback",
  "src": "/certificates/feedback-nageen-imran.webp",
  "title": "Nageen Imran",
  "sub": "MashaAllah! Madni Qaida completed",
  "w": 524,
  "h": 804
 },
 {
  "type": "feedback",
  "src": "/certificates/experience-ayesha-khuwaja.webp",
  "title": "Ayesha Khuwaja",
  "sub": "My experience · Madni Qaida",
  "w": 777,
  "h": 728
 },
 {
  "type": "poster",
  "src": "/certificates/poster-girls-women-courses.webp",
  "title": "Online Classes for Girls & Women",
  "sub": "Our courses poster",
  "w": 527,
  "h": 789
 },
 {
  "type": "certificate",
  "src": "/certificates/cert-ayesha-khuwaja.webp",
  "title": "Ayesha Khuwaja",
  "sub": "Madni Qaida Course",
  "w": 1185,
  "h": 784
 },
 {
  "type": "certificate",
  "src": "/certificates/cert-rukhsar.webp",
  "title": "Rukhsar",
  "sub": "Madni Qaida Course",
  "w": 1209,
  "h": 782
 },
 {
  "type": "certificate",
  "src": "/certificates/cert-nageen-imran.webp",
  "title": "Nageen Imran",
  "sub": "Madni Qaida Course",
  "w": 1182,
  "h": 834
 },
 {
  "type": "certificate",
  "src": "/certificates/cert-ayiesha-khwaja.webp",
  "title": "Ayiesha Khwaja",
  "sub": "Madni Qaida Course",
  "w": 1177,
  "h": 793
 },
 {
  "type": "certificate",
  "src": "/certificates/cert-zainab-khuwaja.webp",
  "title": "Zainab Khuwaja",
  "sub": "Madni Qaida Course",
  "w": 1172,
  "h": 785
 },
 {
  "type": "certificate",
  "src": "/certificates/cert-iqra-qazafi.webp",
  "title": "Iqra Qazafi",
  "sub": "Madni Qaida Course",
  "w": 1163,
  "h": 777
 },
 {
  "type": "certificate",
  "src": "/certificates/cert-rubina-imran.webp",
  "title": "Rubina Imran",
  "sub": "Madni Qaida Course",
  "w": 1165,
  "h": 793
 },
 {
  "type": "certificate",
  "src": "/certificates/cert-aneela-noreen.webp",
  "title": "Aneela Noreen",
  "sub": "Madni Qaida Course",
  "w": 1181,
  "h": 786
 },
 {
  "type": "certificate",
  "src": "/certificates/cert-shakeela-shah.webp",
  "title": "Shakeela Shah",
  "sub": "Madni Qaida Course",
  "w": 1174,
  "h": 794
 },
 {
  "type": "poster",
  "src": "/certificates/poster-surah-yaseen.webp",
  "title": "Surah Yaseen Course",
  "sub": "Special course poster",
  "w": 537,
  "h": 787
 },
 {
  "type": "poster",
  "src": "/certificates/poster-translation-tafseer.webp",
  "title": "Translation & Tafseer Course",
  "sub": "Course poster",
  "w": 516,
  "h": 802
 }
];
const CERTS = GALLERY.filter((g) => g.type === "certificate");
const slugOf = (g) => g.src.split("/").pop().replace(/\.webp$/, "");
const TYPE_LABEL = { certificate: "🎓 Certificate", feedback: "💬 Feedback", poster: "📢 Course Poster" };
const TABS = [["all", "All"], ["certificate", "🎓 Certificates"], ["feedback", "💬 Student Feedback"], ["poster", "📢 Course Posters"]];
const STATS = [["🎓", CERTS.length, "+", "Certificates Awarded"], ["📚", 7, "+", "Courses Offered"], ["👨‍🏫", "1:1", "", "Live Classes"], ["💻", 100, "%", "Online Learning"]];
const JOURNEY = [
  ["🔤", "Madni Qaida", "Learn the letters and correct pronunciation."],
  ["📖", "Nazra", "Read the Quran fluently with a teacher."],
  ["📗", "Tajweed", "Apply the rules of beautiful recitation."],
  ["🕋", "Hifz & Tafseer", "Memorize and understand the meaning."],
  ["🎓", "Certificate", "Receive a certificate of completion."],
];
const PREVIEW = CERTS.slice(0, 3);
const TOPICS = [
  ["Fees & plans", "Assalamu Alaikum, I would like to know about the fees and plans."],
  ["Courses", "Assalamu Alaikum, I would like details about your courses."],
  ["Class timings", "Assalamu Alaikum, I would like to know the class timings."],
  ["Enrollment", "Assalamu Alaikum, I would like to enroll."],
];
const COURSES = [["📖", "Nazra", "Learn to read the Quran correctly, with a teacher’s guidance."], ["🕋", "Hifz", "Memorize the Quran with a structured, patient revision plan."], ["📗", "Tajweed", "Master the rules of Tajweed step by step."], ["🤲", "Masnoon Duain", "Learn the daily supplications taught by the Prophet ﷺ."], ["🕌", "Namaz", "Learn how to pray correctly, with meanings."], ["☪", "6 Kalmas", "Learn and understand the six Kalmas."], ["🧒", "Translation & Tafseer", "Understand the meaning and message of every verse."]];

/* ---------- small icons ---------- */
const WAIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.2 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .5l-.4.6-.3.3c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.1 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.6-.1l2 1c.3.1.5.2.5.3.1.2.1.8-.1 1.4z" /></svg>
);
const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11 11 0 0 0 3.5.56 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.2.2 2.4.56 3.5a1 1 0 0 1-.25 1z" /></svg>
);

/* ---------- Hero illustration (redrawn, better proportions) ---------- */
const Kids = () => (
  <svg viewBox="0 0 480 540" role="img" aria-label="Two students reading the Holy Quran together">
    <defs>
      <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1f9a14" /><stop offset="1" stopColor="#073d06" /></linearGradient>
      <radialGradient id="gl" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#ffe9a8" stopOpacity=".95" /><stop offset="1" stopColor="#ffe9a8" stopOpacity="0" /></radialGradient>
      <linearGradient id="bk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fffdf5" /><stop offset="1" stopColor="#efe0bb" /></linearGradient>
      <clipPath id="archclip"><path d="M30 540V210Q30 30 240 30T450 210V540Z" /></clipPath>
    </defs>
    <path d="M30 540V210Q30 30 240 30T450 210V540Z" fill="url(#ag)" stroke="#c98a1b" strokeWidth="6" />
    <path d="M52 540V212Q52 52 240 52T428 212V540Z" fill="none" stroke="#f2c36b" strokeOpacity=".55" strokeWidth="2" strokeDasharray="3 8" />
    <g fill="none" stroke="#f2c36b" strokeOpacity=".14" strokeWidth="1.5">
      {[0, 1, 2, 3].map((r) => [0, 1, 2].map((c) => <path key={r + "-" + c} d="M0 -26L8 -8L26 0L8 8L0 26L-8 8L-26 0L-8 -8Z" transform={`translate(${110 + c * 130} ${130 + r * 80})`} />))}
    </g>
    <path className="mn" d="M355 100a34 34 0 1 0 22 56a28 28 0 1 1-22-56z" fill="#f2c36b" />
    {[[110, 90], [150, 130], [400, 190], [90, 200], [330, 60]].map(([x, y], i) => <path key={i} className="tw" style={{ animationDelay: i * 0.5 + "s" }} d={`M${x} ${y - 7}l2 5l5 2l-5 2l-2 5l-2-5l-5-2l5-2z`} fill="#fde9b0" />)}
    <g className="lan"><path d="M86 52v50" stroke="#c98a1b" strokeWidth="2" /><path d="M72 102h28l-4 38h-20z" fill="#f2c36b" /><rect x="70" y="98" width="32" height="6" rx="3" fill="#c98a1b" /><ellipse cx="86" cy="124" rx="6" ry="10" fill="#fff6d1" /></g>
    <g className="lan" style={{ animationDelay: "1.2s" }}><path d="M394 52v70" stroke="#c98a1b" strokeWidth="2" /><path d="M380 122h28l-4 38h-20z" fill="#f2c36b" /><rect x="378" y="118" width="32" height="6" rx="3" fill="#c98a1b" /><ellipse cx="394" cy="144" rx="6" ry="10" fill="#fff6d1" /></g>
    <ellipse cx="240" cy="440" rx="190" ry="130" fill="url(#gl)" />

    <g clipPath="url(#archclip)">
      <path d="M30 506Q240 462 450 506V540H30Z" fill="#7a1f2b" />
      <path d="M30 506Q240 462 450 506" stroke="#f2c36b" strokeWidth="4" fill="none" />
      <path d="M30 520Q240 478 450 520" stroke="#f2c36b" strokeOpacity=".5" strokeWidth="2" fill="none" strokeDasharray="6 6" />
    </g>

    {/* boy */}
    <path d="M78 512Q150 466 226 512Q150 540 78 512Z" fill="#f4f6f5" stroke="#d3dcd8" strokeWidth="2" />
    <path d="M104 496Q100 406 128 390L172 390Q200 406 196 496Z" fill="#fff" stroke="#d3dcd8" strokeWidth="2" />
    <path d="M150 392V446" stroke="#d3dcd8" strokeWidth="2" />
    {[404, 420, 436].map((y) => <circle key={y} cx="150" cy={y} r="2.2" fill="#b9c6c0" />)}
    <rect x="140" y="366" width="20" height="28" rx="8" fill="#e8b88a" />
    <ellipse cx="150" cy="338" rx="29" ry="32" fill="#f1c9a0" />
    <circle cx="121" cy="342" r="5" fill="#e8b88a" /><circle cx="179" cy="342" r="5" fill="#e8b88a" />
    <path d="M120 332Q118 298 150 296Q182 298 180 332Q150 320 120 332Z" fill="#fff" stroke="#cfd8d4" strokeWidth="2" />
    <path d="M121 326Q150 316 179 326" stroke="#cfd8d4" fill="none" strokeWidth="2" />
    <path d="M122 334Q120 346 125 351M178 334Q180 346 175 351" stroke="#2a1a10" strokeWidth="4" fill="none" strokeLinecap="round" />
    <ellipse cx="139" cy="343" rx="3.2" ry="4" fill="#2b1a10" /><ellipse cx="161" cy="343" rx="3.2" ry="4" fill="#2b1a10" />
    <circle cx="140" cy="341.5" r="1.1" fill="#fff" /><circle cx="162" cy="341.5" r="1.1" fill="#fff" />
    <path d="M133 335Q139 332 145 335M155 335Q161 332 167 335" stroke="#2a1a10" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M141 356Q150 363 159 356" stroke="#a5532f" strokeWidth="3" fill="none" strokeLinecap="round" />
    <circle cx="131" cy="352" r="6" fill="#f09a86" opacity=".45" /><circle cx="169" cy="352" r="6" fill="#f09a86" opacity=".45" />

    {/* girl */}
    <path d="M254 512Q330 466 402 512Q330 540 254 512Z" fill="#f2c36b" stroke="#d9a63f" strokeWidth="2" />
    <path d="M284 496Q280 406 308 390L352 390Q380 406 376 496Z" fill="#f2c36b" stroke="#d9a63f" strokeWidth="2" />
    <ellipse cx="330" cy="342" rx="25" ry="28" fill="#f1c9a0" />
    <path d="M290 394Q330 430 370 394L384 444Q330 474 276 444Z" fill="#0f6d73" />
    <path fillRule="evenodd" d="M296 348Q290 296 330 292Q370 296 364 348Q362 374 350 386L310 386Q298 374 296 348ZM306 340Q306 314 330 314Q354 314 354 340Q354 366 330 368Q306 366 306 340Z" fill="#0f6d73" />
    <ellipse cx="322" cy="344" rx="3" ry="3.8" fill="#2b1a10" /><ellipse cx="338" cy="344" rx="3" ry="3.8" fill="#2b1a10" />
    <circle cx="323" cy="342.6" r="1" fill="#fff" /><circle cx="339" cy="342.6" r="1" fill="#fff" />
    <path d="M317 336Q322 333 327 336M333 336Q338 333 343 336" stroke="#2a1a10" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    <path d="M323 357Q330 363 337 357" stroke="#a5532f" strokeWidth="3" fill="none" strokeLinecap="round" />
    <circle cx="314" cy="353" r="5" fill="#f09a86" opacity=".5" /><circle cx="346" cy="353" r="5" fill="#f09a86" opacity=".5" />

    {/* arms */}
    <path d="M134 400Q118 450 176 458L204 448" stroke="#d3dcd8" strokeWidth="25" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M134 400Q118 450 176 458L204 448" stroke="#fff" strokeWidth="21" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M346 400Q362 450 304 458L276 448" stroke="#d9a63f" strokeWidth="25" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M346 400Q362 450 304 458L276 448" stroke="#f2c36b" strokeWidth="21" strokeLinecap="round" strokeLinejoin="round" fill="none" />

    {/* rehal + Quran */}
    <path d="M204 536L240 504L276 536" stroke="#6b4423" strokeWidth="10" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M168 456Q204 442 240 456V510Q204 496 168 510Z" fill="url(#bk)" stroke="#c98a1b" strokeWidth="3" strokeLinejoin="round" />
    <path d="M240 456Q276 442 312 456V510Q276 496 240 510Z" fill="url(#bk)" stroke="#c98a1b" strokeWidth="3" strokeLinejoin="round" />
    {[466, 477, 488, 499].map((y) => <g key={y} stroke="#2a6b22" strokeOpacity=".5" strokeWidth="2" strokeLinecap="round"><path d={`M180 ${y}Q204 ${y - 6} 230 ${y + 1}`} /><path d={`M250 ${y + 1}Q276 ${y - 6} 300 ${y}`} /></g>)}

    {/* hands */}
    <circle cx="208" cy="447" r="10" fill="#f1c9a0" /><circle cx="272" cy="447" r="10" fill="#f1c9a0" />
  </svg>
);

const VERSES = ["ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ", "ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ", "مَـٰلِكِ يَوْمِ ٱلدِّينِ", "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", "قُلْ هُوَ ٱللَّهُ أَحَدٌ", "ٱللَّهُ ٱلصَّمَدُ", "ٱقْرَأْ بِٱسْمِ رَبِّكَ"];
const BgFx = () => (
  <div className="bgfx" aria-hidden="true">
    <div className="pat" /><div className="rays" />
    {VERSES.map((v, i) => <span key={i} className="vs" style={{ left: ((i * 29) % 88) + 2 + "%", animationDelay: -i * 3.1 + "s", animationDuration: 20 + (i % 3) * 5 + "s", fontSize: 1.3 + (i % 3) * 0.5 + "rem" }}>{v}</span>)}
    {Array.from({ length: 22 }, (_, i) => <i key={i} className="pt" style={{ left: ((i * 37) % 100) + "%", animationDelay: -(i * 0.9) + "s", animationDuration: 9 + (i % 5) * 2 + "s", width: 3 + (i % 3) * 2, height: 3 + (i % 3) * 2 }} />)}
  </div>
);

const Mosque = () => (
  <svg className="mosque" viewBox="0 0 1200 240" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
    <g fill="#031a07">
      <rect x="0" y="200" width="1200" height="40" />
      <path d="M470 200V150Q470 70 600 60Q730 70 730 150V200Z" />
      <path d="M598 60V30" stroke="#031a07" strokeWidth="4" /><circle cx="600" cy="26" r="6" />
      <path d="M380 200V140Q380 100 430 96Q480 100 480 140V200Z" /><path d="M720 200V140Q720 100 770 96Q820 100 820 140V200Z" />
      <rect x="250" y="70" width="26" height="130" /><path d="M244 70L263 20L282 70Z" /><rect x="243" y="70" width="40" height="8" />
      <rect x="924" y="70" width="26" height="130" /><path d="M918 70L937 20L956 70Z" /><rect x="917" y="70" width="40" height="8" />
      <rect x="150" y="150" width="90" height="50" /><path d="M150 150Q195 110 240 150Z" />
      <rect x="960" y="150" width="90" height="50" /><path d="M960 150Q1005 110 1050 150Z" />
      <rect x="40" y="165" width="80" height="35" /><rect x="1080" y="165" width="80" height="35" />
    </g>
    <g fill="#f2c36b" opacity=".85">
      <path d="M570 200V150Q570 126 600 126T630 150V200Z" />
      <path d="M404 200V158Q404 140 430 140T456 158V200Z" /><path d="M744 200V158Q744 140 770 140T796 158V200Z" />
      <rect x="257" y="110" width="12" height="18" rx="6" /><rect x="931" y="110" width="12" height="18" rx="6" />
      <circle cx="263" cy="22" r="3" /><circle cx="937" cy="22" r="3" />
    </g>
  </svg>
);

const Logo = ({ size }) => (
  <a className={"logo" + (size === "lg" ? " lg" : "")} href="#top" aria-label={NAME}>
    <img src="/logo.png" alt={NAME} />
    <span className="sr">{NAME}</span>
  </a>
);
const Head = ({ tag, title, sub }) => (<><span className="tag">{tag}</span><h2 style={{ fontSize: "2.4rem" }}>{title}</h2><p style={{ maxWidth: 680, margin: "0 auto 40px" }}>{sub}</p></>);

/* ---------- Forms ---------- */
const Fld = ({ id, label, ph, full, area, type = "text", req = true, min, max }) => (
  <div className={"f" + (full ? " full" : "")}>
    <label htmlFor={id}>{label} {req && <b>*</b>}</label>
    {area ? <textarea id={id} name={id} required={req} placeholder={ph} /> : <input id={id} name={id} required={req} placeholder={ph} type={type} min={min} max={max} />}
  </div>
);

function ContactForm() {
  const [sent, setSent] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    const d = new FormData(e.target);
    const text = `Assalamu Alaikum, I am ${d.get("fn")} ${d.get("ln")}.\nSubject: ${d.get("sub")}\n${d.get("msg")}`;
    const t = d.get("who") === "female" ? FEMALE : MALE;
    window.open(`${t.wa}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    setSent(true); e.target.reset();
  };
  return (
    <form className="form" onSubmit={submit}>
      <Fld id="fn" label="First Name" ph="First name" />
      <Fld id="ln" label="Last Name" ph="Last name" />
      <Fld id="sub" label="Subject" ph="e.g. Course fees" full />
      <div className="f full"><label htmlFor="who">I am a <b>*</b></label>
        <select id="who" name="who" required defaultValue="">
          <option value="" disabled>Select</option>
          <option value="male">Male student (or parent of a boy)</option>
          <option value="female">Female student (or parent of a girl)</option>
        </select></div>
      <Fld id="msg" label="Comments / Questions" ph="Write your question here..." full area />
      <button className="btn full" type="submit">💬 Send via WhatsApp</button>
      {sent && <p className="ok" role="status">WhatsApp has opened with your message. Please press send there.</p>}
    </form>
  );
}

function EnrollForm() {
  const [sent, setSent] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    const d = new FormData(e.target);
    const t = d.get("gender") === "Female" ? FEMALE : MALE;
    const lines = [
      "Assalamu Alaikum! I would like to enroll.",
      "",
      `Student name: ${d.get("name")}`,
      `Age: ${d.get("age")}`,
      `Gender: ${d.get("gender")}`,
      `Course: ${d.get("course")}`,
      `Plan: ${d.get("plan")}`,
      `Country: ${d.get("country")}`,
      `Preferred time: ${d.get("time")}`,
      `Contact number: ${d.get("phone")}`,
    ];
    if (d.get("notes")) lines.push("", `Notes: ${d.get("notes")}`);
    window.open(`${t.wa}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener");
    setSent(true); e.target.reset();
  };
  return (
    <form className="form" onSubmit={submit}>
      <Fld id="name" label="Student Name" ph="Full name" />
      <Fld id="age" label="Age" ph="e.g. 8" type="number" min="3" max="99" />
      <div className="f"><label htmlFor="gender">Student is <b>*</b></label>
        <select id="gender" name="gender" required defaultValue="">
          <option value="" disabled>Select</option><option>Male</option><option>Female</option>
        </select></div>
      <div className="f"><label htmlFor="course">Course <b>*</b></label>
        <select id="course" name="course" required defaultValue="">
          <option value="" disabled>Select a course</option>
          {COURSES.map((c) => <option key={c[1]}>{c[1]}</option>)}
        </select></div>
      <div className="f full"><label htmlFor="plan">Plan <b>*</b></label>
        <select id="plan" name="plan" required defaultValue="">
          <option value="" disabled>Select a plan</option>
          {PLANS.map((p) => <option key={p.name} value={`${p.name} ($${p.price}/${PERIOD})`}>{p.name} · ${p.price} / {PERIOD}</option>)}
        </select></div>
      <Fld id="country" label="Country / City" ph="e.g. Pakistan, Lahore" />
      <div className="f"><label htmlFor="time">Preferred Time <b>*</b></label>
        <select id="time" name="time" required defaultValue="">
          <option value="" disabled>Select</option><option>Morning</option><option>Afternoon</option><option>Evening</option><option>Night</option>
        </select></div>
      <Fld id="phone" label="WhatsApp / Phone Number" ph="e.g. +92 300 1234567" type="tel" full />
      <Fld id="notes" label="Anything else?" ph="Optional" full area req={false} />
      <button className="btn full" type="submit">📖 Enroll on WhatsApp</button>
      {sent && <p className="ok" role="status">WhatsApp has opened with your details. Please press send there and our teacher will reply.</p>}
    </form>
  );
}

function JoinSection() {
  const [tab, setTab] = useState("trial");
  const trial = tab === "trial";
  return (
    <section className="ask3 trial" id="join">
      <div className="abfx" aria-hidden="true"><div className="abmoon" /></div>
      <div className="w">
        <div className="c jh">
          <span className="tag">Join Us</span>
          <h2>Start Your Quran Journey Today</h2>
        </div>
        <div className="tabs" role="tablist">
          <button type="button" role="tab" aria-selected={trial} className={trial ? "on" : ""} onClick={() => setTab("trial")}>📝 Enroll Now</button>
          <button type="button" role="tab" aria-selected={!trial} className={!trial ? "on" : ""} onClick={() => setTab("ask")}>💬 Ask a Question</button>
        </div>
        <div className="askcard">
          <div className="askpanel">
            <div className="abpat" aria-hidden="true" />
            {trial ? (
              <>
                <span className="tag">Enrollment</span>
                <h2>Enroll in Your Course</h2>
                <p>Fill in the short form. It opens WhatsApp with your details and goes straight to the right teacher.</p>
                <ul className="askul">
                  <li>Group classes for children: ${PLANS[0].price} / {PERIOD}</li>
                  <li>One-to-one classes: ${PLANS[1].price} / {PERIOD}</li>
                  <li>Male students: male teacher. Female students: female teacher</li>
                </ul>
              </>
            ) : (
              <>
                <span className="tag">Send a Message</span>
                <h2>Don't Hesitate to Ask a Question</h2>
                <p>Send us your question on WhatsApp and we will reply soon.</p>
                <ul className="askul">
                  <li>Course details and timings</li>
                  <li>Live one-to-one online classes</li>
                  <li>Male and female students welcome</li>
                </ul>
              </>
            )}
            <div className="tq">
              <a href={wam(MALE)}><WAIcon /> Male students</a>
              <a href={wam(FEMALE)}><WAIcon /> Female students</a>
            </div>
          </div>
          <div className="askform" key={tab}>{trial ? <EnrollForm /> : <ContactForm />}</div>
        </div>
        <div className="hows">
          {[["1", "Fill the form", "Takes less than a minute."], ["2", "WhatsApp opens", "Your details are already typed."], ["3", "Teacher replies", "We confirm your class time."]].map(([n, t, d]) => (
            <div key={n}><b>{n}</b><span><strong>{t}</strong><small>{d}</small></span></div>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ---------- Certificates: lightbox, home showcase, full page ---------- */
function Lightbox({ items, index, onClose, onNav }) {
  useEffect(() => {
    const k = (e) => { if (e.key === "Escape") onClose(); if (e.key === "ArrowRight") onNav(1); if (e.key === "ArrowLeft") onNav(-1); };
    window.addEventListener("keydown", k);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", k); document.body.style.overflow = prev; };
  }, [onClose, onNav]);
  const it = items[index];
  if (!it) return null;
  return (
    <div className="lb" role="dialog" aria-modal="true" aria-label={it.title} onClick={onClose}>
      <button type="button" className="lbx" onClick={onClose} aria-label="Close">×</button>
      <button type="button" className="lbn prev" onClick={(e) => { e.stopPropagation(); onNav(-1); }} aria-label="Previous">‹</button>
      <figure onClick={(e) => e.stopPropagation()}>
        <img src={it.src} alt={`${it.title} – ${it.sub}`} />
        <figcaption><b>{it.title}</b><span>{it.sub}</span><small>{index + 1} / {items.length}</small></figcaption>
      </figure>
      <button type="button" className="lbn next" onClick={(e) => { e.stopPropagation(); onNav(1); }} aria-label="Next">›</button>
    </div>
  );
}

/* Lightbox band hone par address se certificate ka naam hata do (#/certificates/naam -> #/certificates) */
const clearFocus = () => {
  if (window.location.hash.startsWith("#/certificates/")) window.history.replaceState(null, "", "#/certificates");
};

function useLightbox(items, afterClose) {
  const [idx, setIdx] = useState(null);
  const close = useCallback(() => { setIdx(null); if (afterClose) afterClose(); }, [afterClose]);
  const nav = useCallback((d) => setIdx((i) => (i === null ? i : (i + d + items.length) % items.length)), [items.length]);
  const node = idx !== null ? <Lightbox items={items} index={idx} onClose={close} onNav={nav} /> : null;
  return [setIdx, node];
}

/* Number jo scroll karne par ginti ki tarah barhta hai */
function CountUp({ to, suffix = "" }) {
  const ref = useRef(null);
  const [v, setV] = useState(typeof to === "number" ? 0 : to);
  useEffect(() => {
    if (typeof to !== "number") return;
    const el = ref.current; if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) { setV(to); return; }
    let raf;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const step = (t) => {
        const p = Math.min((t - t0) / 1400, 1);
        setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to]);
  return <span ref={ref}>{v}{suffix}</span>;
}

function CertificatesPage({ focus }) {
  const [tab, setTab] = useState("all");
  const list = tab === "all" ? GALLERY : GALLERY.filter((g) => g.type === tab);
  const [open, lb] = useLightbox(list, clearFocus);
  const count = (t) => GALLERY.filter((g) => g.type === t).length;

  /* Agar home se kisi certificate par click hua ho to wo yahan foran khul jaye */
  useEffect(() => {
    if (!focus) return;
    const i = GALLERY.findIndex((g) => slugOf(g) === focus);
    if (i >= 0) { setTab("all"); open(i); }
  }, [focus, open]);

  return (
    <main id="top" className="cpage">
      <section className="chero">
        <div className="abpat" aria-hidden="true" /><div className="abmoon" aria-hidden="true" />
        <div className="w c chin">
          <div className="crumb"><a href="#top">Home</a><span>›</span><b>Certificates</b></div>
          <span className="ctar" dir="rtl" aria-hidden="true">خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ</span>
          <h1>Certificates &amp; Student Success</h1>
          <p>Every certificate here is a student who learned to read the Holy Quran with confidence, Alhamdulillah. See their certificates and kind words.</p>
          <div className="cst">
            <div><b>{count("certificate")}</b><span>Certificates</span></div>
            <div><b>{count("feedback")}</b><span>Student Feedback</span></div>
            <div><b>{count("poster")}</b><span>Course Posters</span></div>
          </div>
        </div>
        <Mosque />
      </section>

      <section className="cgal">
        <div className="crsfx" aria-hidden="true" />
        <div className="w crsin">
          <div className="ctabs" role="tablist">
            {TABS.map(([k, l]) => (
              <button type="button" role="tab" aria-selected={tab === k} key={k} className={tab === k ? "on" : ""} onClick={() => setTab(k)}>{l}</button>
            ))}
          </div>
          <p className="chint c">Tap any card to view it full size.</p>
          <div className="gal">
            {list.map((g, i) => (
              <button type="button" className="gi" key={g.src} onClick={() => open(i)} aria-label={`View ${g.title}`}>
                <span className={"gb " + g.type}>{TYPE_LABEL[g.type]}</span>
                <img src={g.src} alt={`${g.title} – ${g.sub}`} loading="lazy" width={g.w} height={g.h} />
                <span className="go"><b>{g.title}</b><small>{g.sub}</small><i>🔍 View</i></span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="cta2 cpcta">
        <div className="abfx" aria-hidden="true"><div className="abpat" /></div>
        <div className="w c ctin">
          <span className="ctar" dir="rtl" aria-hidden="true">رَّبِّ زِدْنِي عِلْمًا</span>
          <h2>Be Our Next Success Story</h2>
          <p>Join Al Zia Online Quran Academy and start learning the Holy Quran from home.</p>
          <div className="ctb">
            <a className="btn gold" href="#join">Enroll Now</a>
            <a className="btn ghost" href="#top">← Back to Home</a>
          </div>
        </div>
        <Mosque />
      </section>
      {lb}
    </main>
  );
}

function useHashPage() {
  const parse = () => {
    const h = window.location.hash;
    if (h.startsWith("#/certificates")) return { page: "certificates", focus: decodeURIComponent(h.split("/")[2] || "") };
    return { page: "home", focus: "" };
  };
  const [st, setSt] = useState(parse);
  useEffect(() => {
    const on = () => {
      const p = parse();
      setSt(p);
      if (p.page === "certificates") { window.scrollTo(0, 0); return; }
      const id = window.location.hash.slice(1);
      setTimeout(() => {
        const el = id && document.getElementById(id);
        if (el) el.scrollIntoView(); else if (!id || id === "top") window.scrollTo(0, 0);
      }, 60);
    };
    window.addEventListener("hashchange", on);
    if (parse().page === "certificates") window.scrollTo(0, 0);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  return st;
}

function FloatWA() {
  const [open, setOpen] = useState(false);
  return (
    <div className="fwa">
      {open && (
        <div className="fmenu">
          <a href={wam(MALE)} target="_blank" rel="noopener noreferrer"><span>👨</span><div><b>Male students</b><small>{MALE.name}</small></div></a>
          <a href={wam(FEMALE)} target="_blank" rel="noopener noreferrer"><span>🧕</span><div><b>Female students</b><small>{FEMALE.name}</small></div></a>
        </div>
      )}
      <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Chat on WhatsApp"><WAIcon /><span>{open ? "Close" : "Chat on WhatsApp"}</span></button>
    </div>
  );
}

export default function App() {
  const { page, focus } = useHashPage();
  const vref = useRef(null);
  const [muted, setMuted] = useState(true);
  const toggleSound = () => {
    const v = vref.current; if (!v) return;
    v.muted = !v.muted; setMuted(v.muted);
    if (!v.muted) v.play().catch(() => {});
  };
  return (
    <>
      <header className="site">
        <div className="top"><div className="w">
          <span className="ayah" dir="rtl">اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ ﴿١﴾ خَلَقَ الْإِنسَانَ مِنْ عَلَقٍ</span>
          <div className="topr"><a href={tel(MALE.phone)}>✆ Male: {MALE.phone}</a><a href={tel(FEMALE.phone)}>✆ Female: {FEMALE.phone}</a><a className="wa" href={wam(MALE)}>WhatsApp</a></div>
        </div></div>
        <div className="mid"><div className="w">
          <Logo />
          <div className="htag"><b>Learn the Holy Quran Online</b><span>Tajweed · Hifz · Translation · Live One-to-One</span></div>
          <div className="hinfo">
            {[[MALE, "👨", "Male students"], [FEMALE, "🧕", "Female students"]].map(([p, ic, role]) => (
              <div className="hc2" key={role}>
                <span className="hav">{ic}</span>
                <span className="hn"><b>{p.name}</b><small>{role} · {p.phone}</small></span>
                <a className="mini wa" href={wam(p)} aria-label={`WhatsApp ${p.name}`}><WAIcon /></a>
                <a className="mini call" href={tel(p.phone)} aria-label={`Call ${p.name}`}><PhoneIcon /></a>
              </div>
            ))}
          </div>
        </div></div>
        <nav><div className="w">
          <ul>{NAV.map(([t, h], i) => <li key={t}><a className={i === 0 ? "on" : ""} href={h}>{t}</a></li>)}</ul>
          <a className="trial" href="#join">📖 Enroll Now</a>
        </div></nav>
      </header>

      {page === "certificates" ? <CertificatesPage focus={focus} /> : (
      <main id="top">
        <section className="hero">
          <BgFx />
          <video ref={vref} className="herovid" src="/hero.mp4" poster="/hero.jpg" autoPlay muted loop playsInline preload="auto" aria-hidden="true" onError={(e) => { e.currentTarget.style.display = "none"; }} />
          <div className="w hg">
            <div className="hc">
              <span className="bism" aria-hidden="true">بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</span>
              <span className="tag">{NAME}</span>
              <h1>Learn the <em>Holy Quran</em> Online, From Home</h1>
              <p>Live one-to-one classes with proper Tajweed, translation and Tafseer. Open for male and female students of every age.</p>
              <div className="chips"><span>📖 Tajweed</span><span>🕋 Hifz</span><span>👨‍👩‍👧‍👦 All Ages</span><span>💻 Live Online</span></div>
              <div className="who">
                <a className="whoc" href={wam(MALE)}><span>👨</span><div><b>Male students</b><small>{MALE.name} · tap to WhatsApp</small></div></a>
                <a className="whoc" href={wam(FEMALE)}><span>🧕</span><div><b>Female students</b><small>{FEMALE.name} · tap to WhatsApp</small></div></a>
              </div>
              <a className="btn" href="#join">Enroll Now</a><a className="btn k" href="#pricing">View Pricing</a>
            </div>
            <div className="art"><div className="artbox"><Kids /><div className="fb b1">🎓 Kids &amp; Adults</div><div className="fb b2">✅ Proper Tajweed</div></div></div>
          </div>
          <button className="snd" type="button" onClick={toggleSound} aria-pressed={!muted}>{muted ? "🔇 Sound On" : "🔊 Sound Off"}</button>
        </section>

        <section className="feat"><div className="w fgrid">
          {FEATURES.map(([i, t, d]) => (
            <article className="fc" key={t}>
              <div className="fi">{i}</div>
              <div><h3>{t}</h3><p>{d}</p></div>
            </article>
          ))}
        </div></section>

        <section className="about2" id="about">
          <div className="abfx" aria-hidden="true"><div className="abmoon" /><div className="abpat" /></div>
          <div className="w c abin">
            <span className="tag">About Us</span>
            <h2>{NAME}</h2>
            <p className="absub">Our introduction, our journey and our educational services.</p>
            <div className="mv">
              <div className="mvc"><div className="mvi">🌙</div><h3>Our Mission</h3><p>{MISSION}</p></div>
              <div className="mvc"><div className="mvi">🌟</div><h3>Our Vision</h3><p>{VISION}</p></div>
            </div>
          </div>
          <Mosque />
        </section>

        <section className="vals"><div className="w c">
          <Head tag="What we stand for" title="Our Core Values" sub="The principles behind every class we teach." />
          <div className="vgrid">
            {VALUES.map(([t, d], i) => (
              <article className="vc" key={t}>
                <div className="vi">{VICONS[i]}</div>
                <h3>{t}</h3>
                <p>{d}</p>
              </article>
            ))}
          </div>
        </div></section>

        <section className="crs" id="courses">
          <div className="crsfx" aria-hidden="true" />
          <div className="w c crsin">
            <Head tag="Our Courses" title="Courses We Offer" sub="Nazra, Hifz, Tajweed, Masnoon Duain, Namaz, 6 Kalmas, Translation & Tafseer." />
            <div className="cgrid">
              {COURSES.map(([i, t, d]) => (
                <article className="crc" key={t}>
                  <div className="cri">{i}</div>
                  <h3>{t}</h3>
                  <p>{d}</p>
                  <a className="crl" href="#join">Enroll Now <span>→</span></a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="ach" id="achievements">
          <div className="abpat" aria-hidden="true" />
          <div className="w c achin">
            <Head tag="Our Achievements" title="Our Students’ Success" sub="Every certificate is a student who learned to read the Holy Quran with confidence, Alhamdulillah." />
            <div className="stx">
              {STATS.map(([ic, n, suf, l]) => (
                <div className="stc" key={l}>
                  <span className="sti" aria-hidden="true">{ic}</span>
                  <b><CountUp to={n} suffix={suf} /></b>
                  <span>{l}</span>
                </div>
              ))}
            </div>

            <div className="jrn">
              <h3 className="jt">The Student Journey</h3>
              <p className="js">Step by step, from the first letter to a certificate.</p>
              <ol className="jl">
                {JOURNEY.map(([ic, t, d], i) => (
                  <li key={t}>
                    <span className="jn">{i + 1}</span>
                    <span className="ji" aria-hidden="true">{ic}</span>
                    <span className="jtx"><b>{t}</b><small>{d}</small></span>
                  </li>
                ))}
              </ol>
            </div>

            <a className="cprev" href="#/certificates">
              <div className="cstack" aria-hidden="true">
                {PREVIEW.map((c, i) => <img key={c.src} className={"cs" + i} src={c.src} alt="" loading="lazy" width={c.w} height={c.h} />)}
              </div>
              <div className="ctx">
                <span className="tag">Certificates &amp; Feedback</span>
                <h3>Proud Moments of Our Students</h3>
                <p>See the certificates of completion awarded to our students, and read their kind words about learning with us.</p>
                <span className="btn gold">View All Certificates &amp; Feedback →</span>
              </div>
            </a>
          </div>
        </section>

        <section className="prc" id="pricing">
          <div className="crsfx" aria-hidden="true" />
          <div className="w c crsin">
            <Head tag="Our Fees" title="Simple, Affordable Pricing" sub="Choose the class that suits you best. Same qualified teachers and the same proper Tajweed in every plan." />
            <div className="pgrid">
              {PLANS.map((p) => (
                <article className={"pcard" + (p.hot ? " hot" : "")} key={p.name}>
                  <span className="pbadge">{p.badge}</span>
                  <div className="pico">{p.icon}</div>
                  <h3>{p.name}</h3>
                  <p className="pfor">{p.who}</p>
                  <div className="pprice"><sup>$</sup><b>{p.price}</b><span>/ {PERIOD}</span></div>
                  <ul>{p.list.map((l) => <li key={l}>{l}</li>)}</ul>
                  <a className="pbtn" href="#join">Choose {p.name}</a>
                </article>
              ))}
            </div>
            <p className="pnote">Questions about fees? <a href={wam(MALE)}>WhatsApp us</a> and we will help you choose the right plan.</p>
          </div>
        </section>

        <JoinSection />

        <section className="cnt" id="contact">
          <div className="crsfx" aria-hidden="true" />
          <div className="w c crsin">
            <Head tag="Contact Us" title="Have any Questions?" sub="Choose your teacher and message on WhatsApp or call. Male students contact our male teacher, female students our female teacher." />
            <div className="cth">
              {[[MALE, "👨", "Male Students", "Our teacher for boys and men", ""], [FEMALE, "🧕", "Female Students", "Our teacher for girls and women", " fem"]].map(([p, ic, t, sub, cls]) => (
                <article className={"tc" + cls} key={t}>
                  <div className="tch"><div className="abpat" aria-hidden="true" /><div className="tca">{ic}</div></div>
                  <div className="tcb">
                    <span className="tcr">{t}</span>
                    <h3>{p.name}</h3>
                    <p className="tcs">{sub}</p>
                    <div className="tcn">✆ {p.phone}</div>
                    <div className="tcq"><em>Quick message:</em>{TOPICS.map(([l, m]) => <a key={l} href={wam(p, m)} target="_blank" rel="noopener noreferrer">{l}</a>)}</div>
                    <a className="cbig wa" href={wam(p)} target="_blank" rel="noopener noreferrer"><WAIcon />Chat on WhatsApp</a>
                    <a className="cbig call" href={tel(p.phone)}><PhoneIcon />Call {p.phone}</a>
                  </div>
                </article>
              ))}
            </div>
            <div className="cinfo">
              <span>💻 Online classes from anywhere</span>
              <span>👩‍🏫 Male &amp; female teachers</span>
              <span>💬 Reply on WhatsApp</span>
            </div>
            <div className="cask">
              <div><h3>Prefer to write your details?</h3><p>Fill the short form and it opens WhatsApp with everything typed for you.</p></div>
              <a className="btn gold" href="#join">Open the Form</a>
            </div>
          </div>
        </section>

        <section className="cta2">
          <svg className="wave" viewBox="0 0 1200 80" preserveAspectRatio="none" aria-hidden="true"><path d="M0 0H1200V30C1000 80 800 0 600 30S200 80 0 30Z" fill="#fffaf0" /></svg>
          <div className="abfx" aria-hidden="true"><div className="abmoon" /><div className="abpat" /></div>
          <div className="w c ctin">
            <span className="ctar" dir="rtl" aria-hidden="true">رَّبِّ زِدْنِي عِلْمًا</span>
            <h2>Let’s Start Online Quran Learning</h2>
            <p>Enroll today and see how easy and joyful learning the Quran from home can be.</p>
            <div className="ctc"><span>✓ Group &amp; one-to-one classes</span><span>✓ Live online classes</span><span>✓ Male &amp; female students</span></div>
            <div className="ctb">
              <a className="btn gold" href="#join">Enroll Now</a>
              <a className="btn ghost" href={wam(MALE)}>Chat on WhatsApp</a>
            </div>
          </div>
          <Mosque />
        </section>
      </main>
      )}

      <footer className="ft">
        <div className="abpat" aria-hidden="true" />
        <div className="w ftg">
          <div>
            <Logo size="lg" />
            <p style={{ marginTop: 18 }}>Quality online Quran education with proper Tajweed, translation and Tafseer for male and female students.</p>
            <span className="ftdua" dir="rtl" aria-hidden="true">رَّبِّ زِدْنِي عِلْمًا</span>
          </div>
          <div><h3>Quick Links</h3><ul>{NAV.map(([t, h]) => <li key={t}><a href={h}>{t}</a></li>)}</ul></div>
          <div><h3>Our Courses</h3><ul>{COURSES.map((c) => <li key={c[1]}><a href="#courses">{c[1]}</a></li>)}</ul></div>
          <div>
            <h3>Contact Us</h3>
            <div className="ftc"><b>Male students</b><span>{MALE.name}</span><a href={tel(MALE.phone)}>✆ {MALE.phone}</a><a href={wam(MALE)}>WhatsApp</a></div>
            <div className="ftc"><b>Female students</b><span>{FEMALE.name}</span><a href={tel(FEMALE.phone)}>✆ {FEMALE.phone}</a><a href={wam(FEMALE)}>WhatsApp</a></div>
          </div>
        </div>
      </footer>
      <div className="copy"><div className="w">Copyright © 2026 {NAME}. All Rights Reserved.</div></div>
      <FloatWA />
    </>
  );
}