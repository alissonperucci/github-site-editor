import React, { useState, useRef, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "@/i18n";
import heroPhoneGif from "@/assets/hero-phone.gif";
import instaNinjaLogo from "@/assets/instaninja-logo.webp";
import instagramApiBadge from "@/assets/instagram-api-badge.png";
import { injectSEOTags } from "@/lib/seoOptimization";

// Platform logos
import temuLogo from "@/assets/platforms/temu.jpg";
import shopeeLogo from "@/assets/platforms/shopee.jpg";
import aliLogo from "@/assets/platforms/aliexpress.jpg";
import mlLogo from "@/assets/platforms/mercadolivre.jpg";
import kiwifyLogo from "@/assets/platforms/kiwify.png";
import amazonLogo from "@/assets/platforms/amazon.jpg";
import magaluLogo from "@/assets/platforms/magalu.jpg";
import naturaLogo from "@/assets/platforms/natura.jpg";

// ── Brand colors ────────────────────────────────────
const C = {
  bg: "#F8F9FA",
  primary: "#9900CC",
  cta: "#D520C3",
  dark: "#471359",
  statsBg: "#F1F5FF",
  text: "#1a1a1a",
  muted: "#555",
};

const APP_URL = "https://app.instaninja.com.br";

const languages = [
  { code: "pt", flag: "https://flagcdn.com/w40/br.png", label: "BR" },
  { code: "en", flag: "https://flagcdn.com/w40/us.png", label: "US" },
  { code: "es", flag: "https://flagcdn.com/w40/es.png", label: "ES" },
];

const pressLogos = [
  { name: "em.com.br", file: "/logos/em-com-br.webp" },
  { name: "Mundo do Marketing", file: "/logos/mundo-do-marketing.webp" },
  { name: "O Globo", file: "/logos/o-globo.webp" },
  { name: "InfoGlobo", file: "/logos/ig.webp" },
  { name: "Valor Econômico", file: "/logos/valor-economico.webp" },
  { name: "Terra", file: "/logos/terra.webp" },
  { name: "Pequenas Empresas", file: "/logos/pequenas-empresas-grandes-negocios.webp" },
];

const platforms = [
  { name: "Temu", logo: temuLogo },
  { name: "Shopee", logo: shopeeLogo },
  { name: "AliExpress", logo: aliLogo },
  { name: "Mercado Livre", logo: mlLogo },
  { name: "Kiwify", logo: kiwifyLogo },
  { name: "Amazon", logo: amazonLogo },
  { name: "Magalu", logo: magaluLogo },
  { name: "Natura", logo: naturaLogo },
];

const phoneVideos = [
  "8Mpw6cJEgvg","pWwCWtFcWNo","fAZPYb2lAHI","-bJsPMlAIco","_OlvIPTOtd0",
  "DodfEhJg6r4","5b6SvpZe91s","YyjmK15ezKg","qjMmtfsLlq4","P_HAVUXxXOA",
  "1dI2l1OphN0","MOSsgEkmMJ8","eLs5eaXXgWU","WMbUYKWG8JM","Gx5pAi5uZs8",
  "zt1ibNJdKTQ","5Jt8MmvzYWk","ts-wajtoFKQ","n5VpCNp4IB8","NyZLJc2-QB0",
];

const partnerVideosNew = [
  {
    id: "RAFAELE_MONTEIRO_0",
    title: "RAFAELE MONTEIRO - Afiliado Shopee Expert",
    name: "RAFAELE MONTEIRO",
    duration: "08:57",
    desc: "Rafaele Monteiro é especialista em faturamento na Shopee e já auxiliou mais de 15 mil alunos no ASE a alcançarem entre R$ 3 mil e R$ 10 mil por mês.",
    bullets: ["✔️ Automação de respostas", "✔️ Envio de links no Direct", "✔️ Atendimento 24/7"],
    videoUrl: "https://www.instaninja.com.br/wp-content/uploads/2025/12/Rafaele.mp4",
    thumbnail: "https://www.instaninja.com.br/wp-content/uploads/2025/12/Afiliado_Shopee_Expert_eurafaelemonteiro.webp"
  },
  {
    id: "DEBORAH_OLIVEIRA_1",
    title: "Déborah Oliveira — Afiliada Top do Brasil | R$3 milhões em vendas",
    name: "Déborah Oliveira",
    duration: "01:08",
    desc: "Déborah Oliveira é referência para quem trabalha com afiliados e vendas digitais. Já ajudou mais de 10 mil alunos a faturarem vendendo na Shopee, Amazon e Kiwify.",
    bullets: ["✔️ Automação de respostas", "✔️ Envio de links no Direct", "✔️ Atendimento 24/7"],
    videoUrl: "https://www.youtube.com/shorts/pWwCWtFcWNo?feature=share",
    thumbnail: "https://img.youtube.com/vi/pWwCWtFcWNo/hqdefault.jpg"
  },
  {
    id: "CHRIS_PRADO_2",
    title: "Chris Prado | Marketing de Conteúdo",
    name: "Chris Prado",
    duration: "01:20",
    desc: "Chris Prado é especialista em marketing de conteúdo e ajuda empreendedores a criarem estratégias eficazes para suas redes sociais.",
    bullets: ["✔️ Automação de respostas", "✔️ Envio de links no Direct", "✔️ Atendimento 24/7"],
    videoUrl: "https://www.youtube.com/shorts/8Mpw6cJEgvg?feature=share",
    thumbnail: "https://img.youtube.com/vi/8Mpw6cJEgvg/hqdefault.jpg"
  },
];

// ── Helpers ──────────────────────────────────────────
const purpleGrad = {
  background: `linear-gradient(135deg, ${C.primary}, ${C.cta})`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text" as const,
};

function CTAButton({ href = APP_URL, children, large = false, className = "" }: { href?: string; children: React.ReactNode; large?: boolean; className?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center justify-center font-bold text-white rounded-xl transition-all hover:opacity-90 active:scale-95 ${large ? "text-base sm:text-lg px-8 py-4" : "text-sm px-10 py-2.5"} ${className}`}
      style={{ background: `linear-gradient(135deg, ${C.cta}, ${C.primary})`, boxShadow: `0 4px 20px -4px ${C.cta}88` }}
    >
      {children}
    </a>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-xl overflow-hidden cursor-pointer transition-all"
      style={{
        border: `1px solid ${open ? C.primary + "55" : "#e0e0e0"}`,
        background: open ? `${C.primary}06` : "#fff",
      }}
      onClick={() => setOpen(v => !v)}
    >
      <div className="flex items-center justify-between p-5 gap-4">
        <h3 className="text-sm sm:text-base font-semibold leading-snug" style={{ color: C.text }}>{question}</h3>
        <span
          className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full transition-transform duration-200"
          style={{
            border: `1.5px solid ${open ? C.primary : "#ccc"}`,
            transform: open ? "rotate(45deg)" : "none",
            color: open ? C.primary : "#999",
          }}
        >
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
            <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
      </div>
      {open && (
        <div className="px-5 pb-5 text-sm leading-relaxed border-t pt-4" style={{ color: C.muted, borderColor: "#eee" }}>
          {answer}
        </div>
      )}
    </div>
  );
}

function pauseIframe(iframe: HTMLIFrameElement | null) {
  if (!iframe) return;
  try {
    iframe.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func: "pauseVideo", args: [] }), "*"
    );
  } catch (_) {}
}

function PhoneCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const prevIdxRef = useRef(0);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const pauseSlide = useCallback((idx: number) => {
    setPlayingId(null);
    const track = trackRef.current;
    if (!track) return;
    const slides = track.querySelectorAll(".phone-slide");
    pauseIframe(slides[idx]?.querySelector("iframe"));
  }, []);

  const scroll = useCallback((dir: number) => {
    const track = trackRef.current;
    if (!track) return;
    pauseSlide(prevIdxRef.current);
    const slideW = track.querySelector(".phone-slide")?.clientWidth ?? 298;
    track.scrollBy({ left: dir * (slideW + 18), behavior: "smooth" });
  }, [pauseSlide]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let timer: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const slides = [...track.querySelectorAll(".phone-slide")];
        const center = track.getBoundingClientRect().left + track.offsetWidth / 2;
        let idx = 0, dist = 1e9;
        slides.forEach((s, i) => {
          const c = s.getBoundingClientRect().left + s.clientWidth / 2;
          const d = Math.abs(center - c);
          if (d < dist) { dist = d; idx = i; }
        });
        if (idx !== prevIdxRef.current) {
          pauseSlide(prevIdxRef.current);
          prevIdxRef.current = idx;
        }
        setActiveIdx(idx);
      }, 120);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => { track.removeEventListener("scroll", onScroll); clearTimeout(timer); };
  }, [pauseSlide]);

  const goToSlide = useCallback((i: number) => {
    const track = trackRef.current;
    if (!track) return;
    pauseSlide(prevIdxRef.current);
    track.querySelectorAll(".phone-slide")[i]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [pauseSlide]);

  return (
    <div className="phone-carousel-wrapper">
      <button className="phone-nav phone-prev" onClick={() => scroll(-1)} aria-label="Anterior">‹</button>
      <button className="phone-nav phone-next" onClick={() => scroll(1)} aria-label="Próximo">›</button>
      <div className="phone-track" ref={trackRef}>
        {phoneVideos.map((ytId, i) => (
          <div key={ytId} className="phone-slide">
            <div className="phone-shell">
              <div className="phone-notch" />
              <div className="phone-screen">
                {playingId === ytId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0&enablejsapi=1`}
                    title={`Depoimento ${i + 1}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                ) : (
                  <div
                    className="relative w-full h-full cursor-pointer group"
                    onClick={() => setPlayingId(ytId)}
                  >
                    <img
                      src={`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`}
                      alt={`Depoimento ${i + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors">
                      <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="phone-dots">
        {phoneVideos.map((_, i) => (
          <div key={i} className={"phone-dot" + (i === activeIdx ? " active" : "")} onClick={() => goToSlide(i)} />
        ))}
      </div>
    </div>
  );
}

function TypewriterEffect({ phrases = [], speed = 50, deleteSpeed = 30, pauseDuration = 2000 }: { phrases: string[]; speed?: number; deleteSpeed?: number; pauseDuration?: number }) {
  const [displayedText, setDisplayedText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (displayedText.length < currentPhrase.length) {
        timer = setTimeout(() => {
          setDisplayedText(currentPhrase.substring(0, displayedText.length + 1));
        }, speed);
      } else {
        timer = setTimeout(() => { setIsDeleting(true); }, pauseDuration);
      }
    } else {
      if (displayedText.length > 0) {
        timer = setTimeout(() => {
          setDisplayedText(displayedText.substring(0, displayedText.length - 1));
        }, deleteSpeed);
      } else {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, phraseIndex, phrases, speed, deleteSpeed, pauseDuration]);

  return <span>{displayedText}</span>;
}

function CountUp({ end, duration = 2000 }: { end: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (countRef.current) observer.observe(countRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const endValue = parseInt(end);
    if (start === endValue) return;
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= endValue) clearInterval(timer);
    }, duration / endValue);
    return () => clearInterval(timer);
  }, [isVisible, end, duration]);

  return <span ref={countRef}>{count}%</span>;
}

function SectionDivider({ from, to, flip = false }: { from: string; to: string; flip?: boolean }) {
  return (
    <div style={{ marginTop: "-1px", lineHeight: 0 }}>
      <svg viewBox="0 0 1440 48" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
        style={{ display: "block", width: "100%", height: "48px", transform: flip ? "scaleY(-1)" : "none" }}>
        <path d={flip ? "M0,0 C480,48 960,0 1440,24 L1440,48 L0,48 Z" : "M0,24 C480,48 960,0 1440,24 L1440,48 L0,48 Z"} fill={to} />
      </svg>
    </div>
  );
}

function VideoGallery({ videos }: { videos: typeof partnerVideosNew }) {
  if (!videos || videos.length === 0) return null;
  const [currentVideo, setCurrentVideo] = useState(videos[0]);
  const videoRef = useRef<HTMLVideoElement>(null);

  const getYouTubeId = (url: string) => {
    if (!url) return null;
    const patterns = [
      /(?:youtube\.com\/shorts\/|youtu\.be\/)([\w-]+)/,
      /youtube\.com\/watch\?v=([\w-]+)/,
      /youtube\.com\/embed\/([\w-]+)/
    ];
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const isYouTube = (url: string) => url && (url.includes('youtube.com') || url.includes('youtu.be'));
  const youtubeId = getYouTubeId(currentVideo.videoUrl);
  const isCurrentYouTube = isYouTube(currentVideo.videoUrl);

  useEffect(() => {
    if (videoRef.current && !isCurrentYouTube) {
      videoRef.current.load();
    }
  }, [currentVideo, isCurrentYouTube]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <div className="bg-white rounded-lg shadow-lg p-4 order-2 lg:order-1">
        <h3 className="text-lg font-bold mb-4">Lista</h3>
        <div className="max-h-96 overflow-y-auto pr-2">
          {videos.map((video) => (
            <div
              key={video.id}
              className={`flex items-center gap-3 p-2 rounded-md cursor-pointer mb-2 transition-colors
                ${currentVideo.id === video.id ? 'bg-purple-100' : 'hover:bg-gray-50'}`}
              onClick={() => setCurrentVideo(video)}
            >
              <img src={video.thumbnail} alt={video.title} className="w-16 h-10 object-cover rounded-sm flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold leading-tight">{video.title}</p>
                <p className="text-xs text-gray-500">{video.duration}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-4 order-1 lg:order-2">
        <div className="relative w-full aspect-video bg-black rounded-md overflow-hidden mb-4">
          {isCurrentYouTube && youtubeId ? (
            <iframe
              width="100%" height="100%"
              src={`https://www.youtube.com/embed/${youtubeId}`}
              title={currentVideo.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          ) : (
            <video ref={videoRef} controls poster={currentVideo.thumbnail} className="w-full h-full">
              <source src={currentVideo.videoUrl} type="video/mp4" />
            </video>
          )}
        </div>
        <h3 className="text-lg font-bold mb-2">Descrição</h3>
        <p className="text-sm text-gray-700 mb-4 whitespace-pre-line">{currentVideo.desc}</p>
        <ul className="list-disc list-inside text-sm text-gray-700 mb-4">
          {currentVideo.bullets.map((bullet, idx) => (
            <li key={idx} className="mb-1">{bullet}</li>
          ))}
        </ul>
        <p className="text-sm font-semibold" style={{ color: "#9900CC" }}>
          Assista ao vídeo e veja como a {currentVideo.name} usa o InstaNinja para aumentar o faturamento como afiliada.
        </p>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────
export default function Index() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [pressVideoOpen, setPressVideoOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(typeof window !== 'undefined' ? window.innerWidth >= 1024 : true);

  useEffect(() => { injectSEOTags(); }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const statsItems = t("stats.items", { returnObjects: true }) as any[];
  const howItWorksSteps = t("howItWorks.steps", { returnObjects: true }) as any[];
  const featureItems = t("features.items", { returnObjects: true }) as any[];
  const triggerItems = t("triggers.items", { returnObjects: true }) as any[];
  const affiliateItems = t("affiliate.items", { returnObjects: true }) as any[];
  const faqItems = t("faq.items", { returnObjects: true }) as any[];

  const PRESS_VIDEO_URL = "https://www.instaninja.com.br/videos/instaninja_Divulganinja_ZAP24_Imprenssa.mp4";

  return (
    <div className="min-h-screen font-sans overflow-x-hidden pt-8 sm:pt-12" style={{ background: C.bg, color: C.text }}>

      {/* MODAL VÍDEO IMPRENSA */}
      {pressVideoOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.88)" }} onClick={() => setPressVideoOpen(false)}>
          <div className="relative w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl" style={{ background: "#000" }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setPressVideoOpen(false)} className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.15)", color: "#fff", fontSize: "18px" }}>×</button>
            <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 rounded-full px-3 py-1" style={{ background: "rgba(255,186,77,0.9)", color: "#000" }}>
              <span className="text-[11px] font-bold">Imprensa Nacional</span>
            </div>
            <video src={PRESS_VIDEO_URL} controls autoPlay className="w-full" style={{ display: "block", maxHeight: "70vh" }} />
          </div>
        </div>
      )}

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b-2 border-gray-300 shadow-lg"
        style={{ background: "rgba(255,255,255,0.97)", backdropFilter: "blur(14px)", borderBottom: scrolled ? "2px solid #d1d5db" : "1px solid transparent", boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,0.07)" : "none" }}>
        <div className="max-w-6xl mx-auto px-2 sm:px-6 py-1.5 sm:py-3 flex items-center justify-between gap-1.5">
          <div className="flex items-center gap-2 flex-shrink-0">
            <img src={instaNinjaLogo} alt="InstaNinja" className="h-9 w-auto" />
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="#como-funciona" className="transition-colors hover:opacity-80" style={{ color: C.primary }}>{t("nav.howItWorks")}</a>
            <a href="#recursos" className="transition-colors hover:opacity-80" style={{ color: C.primary }}>{t("nav.features")}</a>
            <a href="#faq" className="transition-colors hover:opacity-80" style={{ color: C.primary }}>{t("nav.faq")}</a>
          </div>
          <div className="flex items-center gap-1 sm:gap-1.5">
            <div className="flex items-center gap-0.5 sm:gap-1 rounded-full p-0.5 sm:p-1" style={{ background: "#f0f0f0" }}>
              {languages.map(l => (
                <button key={l.code} onClick={() => i18n.changeLanguage(l.code)}
                  className="rounded-full px-1.5 sm:px-2 py-0.5 sm:py-1 flex items-center gap-1 transition-all"
                  style={{ background: i18n.language === l.code ? "#fff" : "transparent", boxShadow: i18n.language === l.code ? "0 2px 8px rgba(0,0,0,0.1)" : "none" }}>
                  <img src={l.flag} alt={l.label} className="w-5 sm:w-4 h-auto object-contain rounded-sm" />
                  <span className="text-[10px] sm:text-[11px] font-bold leading-none hidden sm:inline" style={{ color: i18n.language === l.code ? C.primary : "#666" }}>{l.label}</span>
                </button>
              ))}
            </div>
            <a href={APP_URL} target="_blank" rel="noreferrer"
              className="text-white text-[13px] sm:text-[11px] font-bold px-6 sm:px-5 py-2.5 sm:py-2 rounded-lg sm:rounded-xl transition-all hover:opacity-90 flex-shrink-0 lg:px-8 lg:py-3 flex items-center"
              style={{ background: `linear-gradient(135deg, ${C.cta}, ${C.primary})`, minHeight: "48px" }}>
              Entrar
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative pt-8 sm:pt-12 pb-0 overflow-hidden" style={{ background: "#fff" }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div style={{ position:"absolute", top:"-100px", right:"-60px", width:"500px", height:"500px", borderRadius:"60% 40% 55% 45% / 45% 55% 40% 60%", background:"radial-gradient(ellipse at 60% 40%, #FFBA4D44 0%, #FF6B6B22 50%, transparent 80%)", filter:"blur(36px)" }} />
          <div style={{ position:"absolute", top:"40px", right:"100px", width:"320px", height:"320px", borderRadius:"45% 55% 60% 40% / 55% 45% 55% 45%", background:`radial-gradient(ellipse at 40% 60%, ${C.cta}33 0%, ${C.primary}18 60%, transparent 85%)`, filter:"blur(24px)" }} />
          <div style={{ position:"absolute", bottom:"0", left:"-40px", width:"360px", height:"260px", borderRadius:"50% 50% 40% 60% / 60% 40% 60% 40%", background:"radial-gradient(ellipse at 50% 50%, #C77DFF22 0%, #7B2FBE18 60%, transparent 85%)", filter:"blur(28px)" }} />
        </div>

        <div className="w-full px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12">
              <div className="flex-1 pt-2 sm:pt-4 pb-6 sm:pb-8 lg:pb-16 text-left w-full">
                <div className="inline-flex items-center gap-1.5 rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-[11px] font-semibold mb-4 sm:mb-5"
                  style={{ background: `${C.primary}12`, color: C.primary, border: `1px solid ${C.primary}28` }}>
                  🏆 {t("hero.badge")}
                </div>
                <h1 className="text-xl sm:text-3xl lg:text-5xl font-extrabold leading-tight mb-4" style={{ color: C.text }}>
                  Responda de modo automático e ilimitado no Instagram
                </h1>
                <div className="text-lg sm:text-2xl lg:text-3xl font-bold leading-tight mb-4" style={{ color: C.primary, minHeight: "1.5em" }}>
                  <TypewriterEffect
                    phrases={[
                      "Responda comentários e envie Direct automaticamente",
                      "Envie até 20 links por vez, com áudios e botões",
                      "Envia mensagens de boas-vindas",
                      "Realize autoatendimento",
                      "Ganhe mais seguidores orgânicos"
                    ]}
                    speed={30} deleteSpeed={18} pauseDuration={2000}
                  />
                </div>
                <p className="text-sm sm:text-base lg:text-lg mb-2 leading-relaxed max-w-xl" style={{ color: C.muted }}>{t("hero.sub")}</p>
                <p className="text-xs sm:text-sm font-bold mb-2" style={{ color: C.primary }}>{t("hero.stat")}</p>
                <p className="text-xs sm:text-sm mb-4 sm:mb-6 italic" style={{ color: "#888" }}>{t("hero.differentiator")}</p>
                <CTAButton href={APP_URL} large className="w-full sm:w-auto">{t("hero.ctaPrimary")}</CTAButton>
                <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1.5 sm:gap-x-3 lg:gap-x-5 mt-2 sm:mt-3 opacity-60 pb-2 sm:pb-0">
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-sm">🌐</span>
                    <span className="text-[8.5px] sm:text-[12px] font-bold text-gray-600 uppercase tracking-wide whitespace-nowrap">API Oficial</span>
                  </div>
                  <div className="hidden sm:block w-px h-3 bg-gray-300 flex-shrink-0" />
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-sm">💳</span>
                    <span className="text-[8.5px] sm:text-[12px] font-bold text-gray-600 uppercase tracking-wide whitespace-nowrap">Pix ou Cartão</span>
                  </div>
                  <div className="hidden sm:block w-px h-3 bg-gray-300 flex-shrink-0" />
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-sm">👥</span>
                    <span className="text-[8.5px] sm:text-[12px] font-bold text-gray-600 uppercase tracking-wide whitespace-nowrap">+50 mil Usuários Ativos</span>
                  </div>
                </div>
              </div>
              <div className="relative flex-shrink-0 w-full lg:w-auto flex justify-center pb-0">
                <PhoneCarousel />
                {isDesktop && <div className="absolute top-2 -left-8 sm:top-12 sm:-left-20 z-50 animate-float-1">
                  <div className="bg-white rounded-2xl p-2.5 flex items-center gap-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-50 min-w-[160px]">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `linear-gradient(135deg, ${C.primary}22, ${C.cta}22)` }}>
                      <span className="text-xl">📈</span>
                    </div>
                    <div>
                      <div className="text-base font-black leading-tight" style={{ color: C.text }}>3x mais</div>
                      <div className="text-[10px] font-bold uppercase tracking-wider opacity-60" style={{ color: C.text }}>conversões</div>
                    </div>
                  </div>
                </div>}
                {isDesktop && <div className="absolute top-40 -right-16 z-50 animate-float-2">
                  <div className="bg-white rounded-2xl p-2.5 flex items-center gap-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-50 min-w-[160px]">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `linear-gradient(135deg, ${C.primary}22, ${C.cta}22)` }}>
                      <span className="text-xl">💬</span>
                    </div>
                    <div>
                      <div className="text-base font-black leading-tight" style={{ color: C.text }}>24/7</div>
                      <div className="text-[10px] font-bold uppercase tracking-wider opacity-60" style={{ color: C.text }}>automação ativa</div>
                    </div>
                  </div>
                </div>}
                {isDesktop && <div className="absolute bottom-24 -left-12 z-50 animate-float-3">
                  <div className="bg-white rounded-2xl p-2.5 flex items-center gap-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-50 min-w-[180px]">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `linear-gradient(135deg, ${C.primary}22, ${C.cta}22)` }}>
                      <span className="text-xl">⚡</span>
                    </div>
                    <div>
                      <div className="text-base font-black leading-tight" style={{ color: C.text }}>15 segundos</div>
                      <div className="text-[10px] font-bold uppercase tracking-wider opacity-60" style={{ color: C.text }}>para ativar</div>
                    </div>
                  </div>
                </div>}
              </div>
            </div>
          </div>
        </div>

        {/* TAGLINE */}
        <div className="w-full px-4 sm:px-6 pb-12 mt-2 tagline-container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <p className="font-bold leading-snug" style={{ fontSize:"clamp(1.1rem, 2.2vw, 1.45rem)", color: C.primary }}>{t("tagline")}</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon:"🛍️", title:"Afiliados", desc:"Automatize respostas no Instagram e envie ofertas e links de afiliado na hora." },
                { icon:"📱", title:"Criadores de Conteúdo", desc:"Automatize respostas e transforme comentários em seguidores." },
                { icon:"🏪", title:"Pequenas Empresas", desc:"Quem manda mensagem quer resposta imediata. Se não houver resposta, ele sai." },
                { icon:"🏢", title:"Grandes Empresas", desc:"Use mensagens de boas-vindas automáticas para responder na hora." },
              ].map((seg, i) => (
                <a key={i} href="https://app.instaninja.com.br" target="_blank" rel="noopener noreferrer"
                  className="group flex flex-col gap-1.5 rounded-2xl p-5 transition-all cursor-pointer no-underline"
                  style={{ background:"#fff", border:`1.5px solid ${C.primary}18`, boxShadow:"0 2px 12px rgba(153,0,204,0.06)" }}>
                  <span style={{ fontSize:"1.8rem" }}>{seg.icon}</span>
                  <span className="font-extrabold text-sm" style={{ color: C.text }}>{seg.title}</span>
                  <span className="text-[11px] leading-relaxed" style={{ color: C.muted }}>{seg.desc}</span>
                  <span className="text-[11px] font-bold mt-1" style={{ color: C.cta }}>Teste Grátis →</span>
                </a>
              ))}
            </div>
          </div>
        </div>
        <SectionDivider from="#fff" to={C.statsBg} />
      </section>

      {/* RECONHECIMENTO NACIONAL */}
      <section className="py-16 sm:py-20 px-4 sm:px-6" style={{ background: "linear-gradient(135deg, #471359 0%, #6B2E7E 100%)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="rounded-3xl p-8 sm:p-12" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(10px)" }}>
            <div className="mb-12 pb-12 border-b" style={{ borderColor: "rgba(255,255,255,0.15)" }}>
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full" style={{ background: "rgba(213,32,195,0.2)", border: "1px solid rgba(213,32,195,0.4)" }}>
                  <span style={{ fontSize: "1.5rem" }}>⭐</span>
                  <span className="text-sm font-bold tracking-widest uppercase" style={{ color: "#D520C3" }}>Reconhecimento Nacional</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold mb-2" style={{ color: "#fff" }}>
                  O <span style={{ color: "#D520C3" }}>#1 em Automação</span> para Afiliados, Produtores de Conteúdo e Empresas no Brasil
                </h3>
                <p className="text-sm sm:text-base" style={{ color: "rgba(255,255,255,0.8)" }}>Nos maiores programas de afiliados do Brasil</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                {platforms.map((platform, i) => (
                  <div key={i} className="flex flex-col items-center gap-3 p-4 sm:p-6 rounded-2xl transition-all hover:scale-105 hover:-translate-y-1"
                    style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}>
                    <img src={platform.logo} alt={platform.name} className="w-12 h-12 sm:w-16 sm:h-16 object-contain" />
                    <span className="text-xs sm:text-sm font-semibold text-center" style={{ color: "rgba(255,255,255,0.9)" }}>{platform.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full" style={{ background: "rgba(213,32,195,0.2)", border: "1px solid rgba(213,32,195,0.4)" }}>
                <span style={{ fontSize: "1.5rem" }}>📰</span>
                <span className="text-sm font-bold tracking-widest uppercase" style={{ color: "#D520C3" }}>Em Destaque</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold mb-2" style={{ color: "#fff" }}>O Maior da América Latina</h3>
              <p className="text-sm sm:text-base mb-8" style={{ color: "rgba(255,255,255,0.8)" }}>Presença nos principais veículos de comunicação do Brasil</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                {pressLogos.map((logo, i) => (
                  <div key={i} className="flex flex-col items-center gap-3 p-4 sm:p-6 rounded-2xl transition-all hover:scale-105 hover:-translate-y-1 cursor-pointer"
                    style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}
                    onClick={() => setPressVideoOpen(true)}>
                    <img src={logo.file} alt={logo.name} className="w-16 h-16 sm:w-20 sm:h-20 object-contain" />
                    <span className="text-xs sm:text-sm font-semibold text-center" style={{ color: "rgba(255,255,255,0.9)" }}>{logo.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALERIA DE VÍDEOS */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 tagline-section" style={{ background: C.bg }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-4xl font-extrabold mb-2 leading-tight" style={{ color: C.primary }}>
              Todo mundo já está usando o InstaNinja. E você?
            </h2>
            <p className="text-sm sm:text-base max-w-4xl mx-auto" style={{ color: C.muted }}>
              Não é só para grandes influenciadores — qualquer pessoa pode vender mais e ganhar tempo com o InstaNinja.
            </p>
          </div>
          <VideoGallery videos={partnerVideosNew} />
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section id="como-funciona" className="py-16 px-4 sm:px-6" style={{ background: C.bg }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[11px] font-bold tracking-widest uppercase" style={{ color: C.cta }}>{t("howItWorks.badge")}</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mt-2" style={{ color: C.text }}>{t("howItWorks.title")}</h2>
          </div>
          <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-10 lg:gap-14">
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-4">
              {Array.isArray(howItWorksSteps) && howItWorksSteps.map((step: any, i: number) => (
                <div key={i} className="rounded-2xl p-5 transition-all hover:-translate-y-1"
                  style={{ background: "#fff", border: "1.5px solid #e8e8e8", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
                  <div className="text-3xl font-extrabold mb-2" style={{ color: C.primary, opacity: 0.22 }}>{step.num}</div>
                  <h3 className="font-bold text-base mb-1" style={{ color: C.text }}>{step.title}</h3>
                  <p className="text-[11px] leading-relaxed" style={{ color: C.muted }}>{step.desc}</p>
                </div>
              ))}
              <div className="col-span-1 sm:col-span-2 mt-2 flex flex-col sm:flex-row items-center gap-4">
                <CTAButton href={APP_URL} large className="w-full sm:w-auto">Teste Grátis agora</CTAButton>
              </div>
            </div>
            <div className="flex-shrink-0 flex justify-center w-full sm:w-auto">
              <div className="relative" style={{ filter: `drop-shadow(0 24px 48px ${C.primary}33)` }}>
                <img src={heroPhoneGif} alt="InstaNinja no celular" className="w-56 lg:w-72 rounded-3xl" style={{ boxShadow: "0 32px 64px -16px rgba(0,0,0,0.25)" }} />
                <div className="absolute -top-3 -right-4 rounded-full px-3 py-1.5 text-[11px] font-bold text-white shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${C.cta}, ${C.primary})`, boxShadow: `0 4px 16px -4px ${C.cta}88` }}>
                  No piloto automático
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider from={C.bg} to={C.statsBg} />

      {/* STATS */}
      <section className="py-16 px-4 sm:px-6" style={{ background: C.statsBg }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-[11px] font-bold tracking-widest uppercase" style={{ color: C.cta }}>{t("stats.badge")}</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mt-2 mb-2" style={{ color: C.text }}>{t("stats.title")}</h2>
            <p className="text-sm sm:text-base" style={{ color: C.muted }}>{t("stats.sub")}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
            {Array.isArray(statsItems) && statsItems.map((item: any, i: number) => (
              <div key={i} className="rounded-2xl p-6 text-center transition-all hover:-translate-y-1"
                style={{ background: "#fff", border: "1.5px solid #e8e8e8", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
                <div className="text-5xl font-extrabold mb-2" style={purpleGrad}><CountUp end={item.value} /></div>
                <p className="text-[11px]" style={{ color: C.muted }}>{item.label}</p>
              </div>
            ))}
          </div>
          <div className="rounded-2xl p-5 text-center" style={{ background: "#fff3f3", border: "1.5px solid #ffcccc" }}>
            <p className="text-base font-medium" style={{ color: "#cc0000" }}>{t("stats.warning")}</p>
          </div>
          <div className="mt-8 text-center">
            <a href={APP_URL} target="_blank" rel="noreferrer"
              className="inline-flex items-center justify-center font-bold text-white px-8 py-3 rounded-xl text-base hover:opacity-90 transition-all"
              style={{ background: `linear-gradient(135deg, ${C.cta}, ${C.primary})`, boxShadow: `0 4px 20px -4px ${C.cta}88` }}>
              Planos A Partir De R$ 39,90/Mês →
            </a>
          </div>
        </div>
      </section>

      <SectionDivider from={C.statsBg} to={C.bg} />

      {/* FEATURES */}
      <section id="recursos" className="py-16 px-4 sm:px-6" style={{ background: C.statsBg }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[11px] font-bold tracking-widest uppercase" style={{ color: C.cta }}>{t("features.badge")}</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mt-2 mb-2" style={{ color: C.text }}>{t("features.title")}</h2>
            <p style={{ color: C.muted }}>{t("features.sub")}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.isArray(featureItems) && featureItems.map((item: any, i: number) => (
              <div key={i} className="rounded-2xl p-5 transition-all hover:-translate-y-1"
                style={{ background: "#fff", border: "1.5px solid #e8e8e8", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
                <div className="text-3xl mb-2">{item.icon}</div>
                <h3 className="font-bold text-base mb-2" style={{ color: C.text }}>{item.title}</h3>
                <p className="text-[11px] leading-relaxed" style={{ color: C.muted }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider from={C.statsBg} to={C.bg} />

      {/* TRIGGERS */}
      <section className="py-16 px-4 sm:px-6" style={{ background: C.bg }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[11px] font-bold tracking-widest uppercase" style={{ color: C.cta }}>{t("triggers.badge")}</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mt-2 mb-2" style={{ color: C.text }}>{t("triggers.title")}</h2>
            <p style={{ color: C.muted }}>{t("triggers.sub")}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Array.isArray(triggerItems) && triggerItems.map((item: any, i: number) => (
              <div key={i} className="rounded-2xl p-5 transition-all hover:-translate-y-1"
                style={{ background: "#fff", border: `1.5px solid ${C.primary}20`, boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                <p className="font-bold text-base mb-1" style={{ color: C.primary }}>{item.trigger}</p>
                <p className="text-[11px]" style={{ color: C.muted }}>{item.result}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AFFILIATE */}
      <section className="py-20 px-4 sm:px-6" style={{ background: C.dark }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-[11px] font-bold tracking-widest uppercase" style={{ color: "#f5c842" }}>{t("affiliate.badge")}</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold mt-2 mb-2 text-white">{t("affiliate.title")}</h2>
            <p className="text-sm sm:text-base max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.7)" }}>
              Comissões maiores que Shopee, Amazon e Mercado Livre — pagas todo mês, para sempre.
            </p>
          </div>
          <div className="rounded-3xl p-10 mb-8 text-center" style={{ background: "rgba(255,255,255,0.08)", border: "1.5px solid rgba(255,255,255,0.15)" }}>
            <div className="text-7xl font-extrabold mb-2 text-white">20%</div>
            <p className="text-xl font-bold mb-1 text-white">de comissão recorrente todo mês</p>
            <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.6)" }}>Por todo o tempo que o seu indicado for assinante — sem limite de indicações</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
            {Array.isArray(affiliateItems) && affiliateItems.map((item: any, i: number) => (
              <div key={i} className="flex gap-4 rounded-2xl p-5 transition-all hover:-translate-y-1"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}>
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <p className="text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>{item.text}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <a href={`${APP_URL}/afiliados`} target="_blank" rel="noreferrer"
              className="inline-block text-white font-bold text-lg px-10 py-4 rounded-xl hover:opacity-90 transition-all w-full sm:w-auto"
              style={{ background: `linear-gradient(135deg, ${C.cta}, ${C.primary})`, boxShadow: `0 8px 32px -8px ${C.cta}88` }}>
              {t("affiliate.cta")}
            </a>
            <p className="mt-3 text-[11px]" style={{ color: "rgba(255,255,255,0.4)" }}>Pagamentos via Hotmart — a maior plataforma de afiliados do mundo</p>
          </div>
        </div>
      </section>

      {/* DIVULGANINJA */}
      <section className="py-6 sm:py-8 px-4 sm:px-6" style={{ background: C.statsBg }}>
        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl p-12 text-center" style={{ background: "#fff", border: "1.5px solid #e8e8e8", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
            <span className="text-[11px] font-bold tracking-widest uppercase" style={{ color: "#25D366" }}>CONHEÇA TAMBÉM</span>
            <h2 className="text-xl sm:text-3xl font-bold mt-3 mb-4" style={{ color: C.text }}>
              {t("divulganinja.title")}{" "}
              <span style={{ color: "#25D366" }}>{t("divulganinja.titleWa")}</span>{" "}
              {t("divulganinja.titleAnd")}{" "}
              <span style={{ color: "#2AABEE" }}>{t("divulganinja.titleTg")}</span>
            </h2>
            <div className="text-base sm:text-lg font-bold mb-4" style={{ color: C.primary }}>{t("divulganinja.highlight")}</div>
            <p className="text-base max-w-2xl mx-auto mb-8 leading-relaxed" style={{ color: C.muted }}>{t("divulganinja.sub")}</p>
            <div className="flex justify-center">
              <a href="https://www.divulganinja.com.br" target="_blank" rel="noreferrer"
                className="text-white font-bold px-8 py-3 rounded-xl text-base hover:opacity-90 transition-all"
                style={{ background: "linear-gradient(90deg, #25D366, #128C7E)" }}>
                {t("divulganinja.cta1")}
              </a>
            </div>
            <div className="mt-12 pt-12 border-t" style={{ borderColor: "#e8e8e8" }}>
              <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "#25D366" }}>{t("divulganinja.stores_badge")}</span>
              <h3 className="text-lg sm:text-2xl font-bold mt-3 mb-3" style={{ color: C.text }}>{t("divulganinja.stores_title")}</h3>
              <p className="text-sm mb-8" style={{ color: C.muted }}>{t("divulganinja.stores_sub")}</p>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                {[
                  { logo: amazonLogo, name: "Amazon" },
                  { logo: aliLogo, name: "AliExpress" },
                  { logo: magaluLogo, name: "Magalu" },
                  { logo: mlLogo, name: "Mercado Livre" },
                  { logo: naturaLogo, name: "Natura" },
                  { logo: shopeeLogo, name: "Shopee" },
                ].map((store, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-xl flex items-center justify-center mb-3" style={{ background: "#f5f5f5", border: "1px solid #e8e8e8" }}>
                      <img src={store.logo} alt={store.name} className="w-12 h-12 object-contain" />
                    </div>
                    <span className="text-xs font-medium text-center" style={{ color: C.muted }}>{store.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider from={C.statsBg} to={C.bg} />

      {/* FAQ */}
      <section id="faq" className="py-16 px-4 sm:px-6" style={{ background: C.bg }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 items-start">
            <div className="md:col-span-2 flex flex-col items-center md:items-start">
              <div className="bg-white rounded-2xl p-8 w-full shadow-lg">
                <div className="flex justify-center">
                  <img src={instagramApiBadge} alt="Conectado à API oficial do Instagram" className="w-full h-auto" />
                </div>
              </div>
            </div>
            <div className="md:col-span-3">
              <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: C.text }}>{t("faq.title")}</h2>
              </div>
              <div className="space-y-3">
                {Array.isArray(faqItems) && faqItems.map((item: any, i: number) => (
                  <FaqItem key={i} question={item.q} answer={item.a} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: C.dark }}>
        <div className="py-16 px-4 sm:px-6 border-b" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Teste agora mesmo e veja como automatizar suas interações no Instagram pode transformar suas vendas.</h2>
            <p className="text-sm sm:text-base mb-6" style={{ color: "rgba(255,255,255,0.7)" }}>Teste o plano gratuito do InstaNinja e comece a responder comentários e enviar links automaticamente.</p>
            <a href={APP_URL} target="_blank" rel="noreferrer" className="inline-block px-8 py-3 rounded-lg font-semibold transition-all hover:opacity-90" style={{ background: C.primary, color: "white" }}>
              Teste agora mesmo
            </a>
          </div>
        </div>
        <div className="py-12 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 mb-8">
              <div>
                <h3 className="font-bold text-base mb-4 text-white">{t("footer.product")}</h3>
                <ul className="space-y-2 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                  <li><a href={APP_URL} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">{t("footer.features")}</a></li>
                  <li><a href={APP_URL} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">{t("footer.pricing")}</a></li>
                  <li><a href={APP_URL} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">{t("footer.how_it_works")}</a></li>
                  <li><a href={APP_URL} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">{t("footer.testimonials")}</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-base mb-4 text-white">📚 {t("footer.learn")}</h3>
                <ul className="space-y-2 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                  <li><a href={APP_URL} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">{t("footer.instagram_automation")}</a></li>
                  <li><a href={APP_URL} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">{t("footer.automation_guide")}</a></li>
                  <li><a href={APP_URL} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">{t("footer.meta_approved")}</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-base mb-4 text-white">{t("footer.support")}</h3>
                <ul className="space-y-2 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                  <li><a href={APP_URL} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">{t("footer.faq")}</a></li>
                  <li><a href={APP_URL} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">{t("footer.contact")}</a></li>
                  <li><a href="/privacy-policy" className="hover:text-white transition-colors">{t("footer.privacy_policy")}</a></li>
                  <li><a href="/terms-of-use" className="hover:text-white transition-colors">{t("footer.terms_of_use")}</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-base mb-4 text-white">{t("footer.social_media")}</h3>
                <div className="space-y-2 mb-6">
                  <a href="https://www.instagram.com/instaninja.app/" target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all hover:opacity-80 text-sm" style={{ background: "rgba(255,255,255,0.1)", color: "white" }}>
                    @instaninja.app
                  </a>
                  <a href="https://www.youtube.com/@instaninja" target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all hover:opacity-80 text-sm" style={{ background: "rgba(255,255,255,0.1)", color: "white" }}>
                    @InstaNinja_App
                  </a>
                </div>
                <div className="border-t pt-4" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                  <p className="font-bold text-xs text-white mb-3">Selos de Confiança</p>
                  <div className="space-y-2 text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>
                    <div className="flex items-center gap-2"><span style={{ color: "#22c55e" }}>✓</span><span>API Oficial da Meta</span></div>
                    <div className="flex items-center gap-2"><span style={{ color: "#22c55e" }}>✓</span><span>Plano Gratuito</span></div>
                    <div className="flex items-center gap-2"><span style={{ color: "#22c55e" }}>✓</span><span>Cancele quando quiser</span></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs" style={{ borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)" }}>
              <p>© 2026 {t("footer.company_name")}. {t("footer.all_rights")}</p>
              <p>{t("footer.made_in_brazil")}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
