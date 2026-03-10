import React, { useState, useRef, useCallback, useEffect, memo, lazy } from "react";

import { useTranslation } from "react-i18next";
import "@/i18n";
import heroPhoneGif from "@/assets/hero-phone.gif";
import instaNinjaLogo from "@/assets/instaninja-logo.webp";
import instagramApiBadge from "@/assets/instagram-api-badge.png";

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
    id: "RAFAELE_MONTEIRO___AFILIADO_SHOPEE_EXPERT_0",
    title: "RAFAELE MONTEIRO - Afiliado Shopee Expert",
    name: "RAFAELE MONTEIRO",
    duration: "08:57",
    desc: "Rafaele Monteiro é especialista em faturamento na Shopee e já auxiliou <strong>mais de 15 mil alunos</strong> a alcançarem entre <strong>R$ 3 mil e R$ 10 mil por mês</strong>, mesmo começando do zero. Com <strong>231 mil seguidores</strong>, demonstra na prática que é possível <strong>vender todos os dias como afiliada</strong> — inclusive enquanto dorme — sem precisar passar o dia inteiro no celular. Para garantir atendimento rápido, respostas precisas e <strong>não perder vendas</strong>, Rafaele usa o <strong>InstaNinja</strong> como aliada nas automações.",
    bullets: ["✔️ Automação de respostas", "✔️ Envio de links no Direct", "✔️ Atendimento 24/7"],
    videoUrl: "https://www.instaninja.com.br/wp-content/uploads/2025/12/Rafaele.mp4",
    thumbnail: "https://www.instaninja.com.br/wp-content/uploads/2025/12/Afiliado_Shopee_Expert_eurafaelemonteiro.webp"
  },
  {
    id: "D_BORAH_OLIVEIRA___AFILIADA_TOP_DO_BRASIL___R_3_MILH_ES_EM_VENDAS_1",
    title: "Déborah Oliveira — Afiliada Top do Brasil | R$3 milhões em vendas",
    name: "Déborah Oliveira — Afiliada Top do Brasil",
    duration: "01:08",
    desc: "Déborah Oliveira é referência para quem trabalha com afiliados e vendas digitais. Já ajudou <strong>mais de 10 mil alunos</strong> a faturarem vendendo na Shopee, Amazon e Kiwify — e sozinha já ultrapassou os <strong>3 milhões em vendas</strong>. Com quase <strong>200 mil seguidores</strong>, ela mostra que dá, sim, para <strong>vender todos os dias como afiliada</strong>, mesmo sem aparecer — e sem ficar o dia todo no celular. Para escalar o atendimento, responder mais rápido e <strong>não perder nenhuma venda</strong>, Déborah usa o <strong>InstaNinja</strong> como aliada nas automações.",
    bullets: ["✔️ Automação de respostas", "✔️ Envio de links no Direct", "✔️ Atendimento 24/7"],
    videoUrl: "https://www.youtube.com/shorts/pWwCWtFcWNo?feature=share",
    thumbnail: "https://img.youtube.com/vi/pWwCWtFcWNo/hqdefault.jpg"
  },
  {
    id: "CHRIS_PRADO___MARKETING_DE_CONTE_DO_2",
    title: "Chris Prado | Marketing de Conteúdo",
    name: "Chris Prado",
    duration: "01:20",
    desc: "Chris Prado é especialista em marketing de conteúdo e ajuda empreendedores a criarem estratégias eficazes para suas redes sociais. Com anos de experiência, ela compartilha dicas valiosas para engajar a audiência e converter seguidores em clientes. Ela utiliza o InstaNinja para otimizar suas interações e garantir que nenhuma mensagem fique sem resposta.",
    bullets: ["✔️ Automação de respostas", "✔️ Envio de links no Direct", "✔️ Atendimento 24/7"],
    videoUrl: "https://www.youtube.com/shorts/8Mpw6cJEgvg?feature=share",
    thumbnail: "https://img.youtube.com/vi/8Mpw6cJEgvg/hqdefault.jpg"
  },
  {
    id: "ISLAM_SOUZA___MAIS_DE_13_MILH_ES_3",
    title: "Islam Souza - Mais de 13 Milhões",
    name: "Islam Souza",
    duration: "2:56",
    desc: "Islam Souza é um dos maiores nomes em vendas online, com mais de 13 milhões em faturamento. Ele ensina técnicas avançadas para escalar negócios digitais e maximizar lucros. Islam confia no InstaNinja para automatizar o atendimento e garantir que todas as oportunidades de venda sejam aproveitadas.",
    bullets: ["✔️ Automação de respostas", "✔️ Envio de links no Direct", "✔️ Atendimento 24/7"],
    videoUrl: "https://www.youtube.com/shorts/-bJsPMlAIco?feature=share",
    thumbnail: "https://img.youtube.com/vi/-bJsPMlAIco/hqdefault.jpg"
  },
  {
    id: "MARI_GIMENES___MATERNIDADE_REAL___FITNESS_4",
    title: "Mari Gimenes | Maternidade real | Fitness",
    name: "Mari Gimenes",
    duration: "2:20",
    desc: "Mari Gimenes compartilha sua jornada de maternidade e fitness, inspirando milhares de mulheres a cuidarem de si mesmas. Ela usa o InstaNinja para gerenciar a interação com sua comunidade, respondendo a dúvidas e enviando informações importantes de forma automática, permitindo que ela se dedique mais à criação de conteúdo.",
    bullets: ["✔️ Automação de respostas", "✔️ Envio de links no Direct", "✔️ Atendimento 24/7"],
    videoUrl: "https://www.instaninja.com.br/wp-content/uploads/2025/06/AQMhYHG8bgEnGdlloOhFOMQgdyyOryJAo6N0km8t7JP4fcEDQG3mZBHH09IclNTQ-3Jein0oJAHwgYmotI9YbaqzPhk98LbMiU90wzk.mp4",
    thumbnail: "https://www.instaninja.com.br/wp-content/uploads/2025/06/mil-reais-shopee-afiliada.png"
  },
  {
    id: "NARLA_AGUIAR___JORNALISTA_E_COMUNICADORA_5",
    title: "Narla Aguiar - Jornalista e Comunicadora",
    name: "Narla Aguiar",
    duration: "1:05",
    desc: "Narla Aguiar é uma jornalista e comunicadora experiente, conhecida por sua habilidade em transmitir informações de forma clara e envolvente. Ela utiliza o InstaNinja para automatizar a comunicação com sua audiência, garantindo que suas mensagens sejam entregues de forma eficiente e personalizada.",
    bullets: ["✔️ Automação de respostas", "✔️ Envio de links no Direct", "✔️ Atendimento 24/7"],
    videoUrl: "https://www.youtube.com/shorts/fAZPYb2lAHI?feature=share",
    thumbnail: "https://img.youtube.com/vi/fAZPYb2lAHI/hqdefault.jpg"
  },
  {
    id: "RIANNE_NETTO___DO_BRASIL_PARA_O_MUNDO_COM_V_DEOS_CURTOS__277K_6",
    title: "Rianne Netto | Do Brasil para o mundo com vídeos curtos +277K",
    name: "Rianne Netto",
    duration: "0:48",
    desc: "Rianne Netto é uma empreendedora digital que expandiu seus negócios para o mercado internacional. Ela compartilha suas estratégias para alcançar sucesso global e como o InstaNinja a ajuda a manter a comunicação com clientes de diferentes países, garantindo um atendimento de excelência e sem barreiras.",
    bullets: ["✔️ Automação de respostas", "✔️ Envio de links no Direct", "✔️ Atendimento 24/7"],
    videoUrl: "https://www.youtube.com/shorts/5b6SvpZe91s?feature=share",
    thumbnail: "https://img.youtube.com/vi/5b6SvpZe91s/hqdefault.jpg"
  },
  {
    id: "KAROL_DUARTE____20K_SEGUIDORES_COM_UM__NICO_V_DEO_7",
    title: "Karol Duarte | +20K Seguidores com um único vídeo",
    name: "Karol Duarte",
    duration: "0:39",
    desc: "Karol Duarte alcançou mais de 20 mil seguidores com um único vídeo e compartilha suas técnicas para criar conteúdo viral. Ela usa o InstaNinja para gerenciar o grande volume de interações que recebe, garantindo que todos os seus seguidores sejam atendidos de forma rápida e eficiente.",
    bullets: ["✔️ Automação de respostas", "✔️ Envio de links no Direct", "✔️ Atendimento 24/7"],
    videoUrl: "https://www.youtube.com/shorts/YyjmK15ezKg?feature=share",
    thumbnail: "https://img.youtube.com/vi/YyjmK15ezKg/hqdefault.jpg"
  },
  {
    id: "CANAVARRO___SHOWS__FARRA_E_AUTOMA__O_8",
    title: "Canavarro | Shows, Farra e Automação",
    name: "Canavarro",
    duration: "0:52",
    desc: "Canavarro é um artista que usa o InstaNinja para gerenciar a comunicação com seus fãs e promover seus shows. A automação permite que ele responda a comentários e envie informações sobre ingressos e datas de apresentações de forma automática, facilitando a interação com seu público.",
    bullets: ["✔️ Automação de respostas", "✔️ Envio de links no Direct", "✔️ Atendimento 24/7"],
    videoUrl: "https://www.youtube.com/shorts/DodfEhJg6r4?feature=share",
    thumbnail: "https://img.youtube.com/vi/DodfEhJg6r4/hqdefault.jpg"
  },
  {
    id: "CANAL_FABIANA_PRADO_11",
    title: "Canal Fabiana Prado",
    name: "Canal Fabiana Prado",
    duration: "18:40",
    desc: "Fabiana Prado compartilha tutoriais detalhados e dicas de empreendedorismo em seu canal. Ela utiliza o InstaNinja para gerenciar as interações em seu perfil do Instagram, garantindo que seus seguidores recebam suporte e informações sobre seus cursos de forma eficiente.",
    bullets: ["✔️ Automação de respostas", "✔️ Envio de links no Direct", "✔️ Atendimento 24/7"],
    videoUrl: "https://www.youtube.com/shorts/1dI2l1OphN0?feature=share",
    thumbnail: "https://img.youtube.com/vi/1dI2l1OphN0/hqdefault.jpg"
  },
  {
    id: "CCLOSETDANA___CEO_SHOP_THERAPY_13",
    title: "Cclosetdana - CEO SHOP THERAPY",
    name: "Cclosetdana",
    duration: "0:57",
    desc: "Dana é a CEO da Shop Therapy e usa o InstaNinja para gerenciar o atendimento ao cliente de sua loja no Instagram. A automação permite que ela envie links de produtos e responda a dúvidas sobre pedidos de forma instantânea, melhorando a experiência de compra de seus clientes.",
    bullets: ["✔️ Automação de respostas", "✔️ Envio de links no Direct", "✔️ Atendimento 24/7"],
    videoUrl: "https://www.youtube.com/shorts/P_HAVUXxXOA?feature=share",
    thumbnail: "https://img.youtube.com/vi/P_HAVUXxXOA/hqdefault.jpg"
  },
];

const purpleGrad = {
  background: `linear-gradient(135deg, ${C.primary}, ${C.cta})`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text" as const,
};

const segmentCards = [
  { icon: "🛍️", title: "Afiliados", desc: "Automatize respostas no Instagram e envie ofertas e links de afiliado na hora." },
  { icon: "📱", title: "Criadores de Conteúdo", desc: "Automatize respostas e transforme comentários em seguidores." },
  { icon: "🏪", title: "Pequenas Empresas", desc: "Quem manda mensagem quer resposta imediata. Se não houver resposta, ele sai." },
  { icon: "🏢", title: "Grandes Empresas", desc: "Use mensagens de boas-vindas automáticas para responder na hora." },
];

const storesList = [
  { logo: amazonLogo, name: "Amazon" },
  { logo: aliLogo, name: "AliExpress" },
  { logo: magaluLogo, name: "Magalu" },
  { logo: mlLogo, name: "Mercado Livre" },
  { logo: naturaLogo, name: "Natura" },
  { logo: shopeeLogo, name: "Shopee" },
];

// ── Helpers ──────────────────────────────────────────
function CTAButton({ href = APP_URL, children, large = false, className = "" }: { href?: string; children: React.ReactNode; large?: boolean; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer"
      className={`inline-flex items-center justify-center font-bold text-white rounded-xl transition-all hover:opacity-90 active:scale-[0.97] ${large ? "text-base sm:text-lg px-7 py-3.5" : "text-sm px-8 py-2.5"} ${className}`}
      style={{ background: `linear-gradient(135deg, ${C.cta}, ${C.primary})`, boxShadow: `0 4px 20px -4px ${C.cta}88` }}>
      {children}
    </a>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl overflow-hidden cursor-pointer transition-all"
      style={{ border: `1px solid ${open ? C.primary + "55" : "#e0e0e0"}`, background: open ? `${C.primary}06` : "#fff" }}
      onClick={() => setOpen(v => !v)}>
      <div className="flex items-center justify-between p-4 sm:p-5 gap-3">
        <h3 className="text-sm sm:text-base font-semibold leading-snug" style={{ color: C.text }}>{question}</h3>
        <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full transition-transform duration-200"
          style={{ border: `1.5px solid ${open ? C.primary : "#ccc"}`, transform: open ? "rotate(45deg)" : "none", color: open ? C.primary : "#999" }}>
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
        </span>
      </div>
      {open && (
        <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-sm leading-relaxed border-t pt-3" style={{ color: C.muted, borderColor: "#eee" }}>{answer}</div>
      )}
    </div>
  );
}

function pauseIframe(iframe: HTMLIFrameElement | null) {
  if (!iframe) return;
  try { iframe.contentWindow?.postMessage(JSON.stringify({ event: "command", func: "pauseVideo", args: [] }), "*"); } catch (_) {}
}

const PhoneCarousel = memo(function PhoneCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const prevIdxRef = useRef(0);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const pauseSlide = useCallback((idx: number) => {
    setPlayingId(null);
    const track = trackRef.current;
    if (!track) return;
    pauseIframe(track.querySelectorAll(".phone-slide")[idx]?.querySelector("iframe"));
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
        if (idx !== prevIdxRef.current) { pauseSlide(prevIdxRef.current); prevIdxRef.current = idx; }
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
                    allowFullScreen className="w-full h-full border-0"
                    loading="lazy"
                  />
                ) : (
                  <div className="relative w-full h-full cursor-pointer group" onClick={() => setPlayingId(ytId)}>
                    <img src={`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`}
                      alt={`Depoimento ${i + 1}`} loading="lazy" decoding="async"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors">
                      <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
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
});

function TypewriterEffect({ phrases = [], speed = 50, deleteSpeed = 30, pauseDuration = 2000 }: { phrases: string[]; speed?: number; deleteSpeed?: number; pauseDuration?: number }) {
  const [displayedText, setDisplayedText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    let timer: ReturnType<typeof setTimeout>;
    if (!isDeleting) {
      if (displayedText.length < currentPhrase.length) {
        timer = setTimeout(() => setDisplayedText(currentPhrase.substring(0, displayedText.length + 1)), speed);
      } else {
        timer = setTimeout(() => setIsDeleting(true), pauseDuration);
      }
    } else {
      if (displayedText.length > 0) {
        timer = setTimeout(() => setDisplayedText(displayedText.substring(0, displayedText.length - 1)), deleteSpeed);
      } else { setIsDeleting(false); setPhraseIndex((prev) => (prev + 1) % phrases.length); }
    }
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, phraseIndex, phrases, speed, deleteSpeed, pauseDuration]);

  return <span>{displayedText}<span className="animate-pulse">|</span></span>;
}

function CountUp({ end, duration = 2000 }: { end: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); }
    }, { threshold: 0.1 });
    if (countRef.current) observer.observe(countRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const endValue = parseInt(end);
    if (endValue === 0) return;
    let start = 0;
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
  const [currentVideo, setCurrentVideo] = useState(videos?.[0] ?? partnerVideosNew[0]);
  const [playerLoaded, setPlayerLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  if (!videos || videos.length === 0) return null;

  const getYouTubeId = (url: string) => {
    if (!url) return null;
    const patterns = [/(?:youtube\.com\/shorts\/|youtu\.be\/)([\w-]+)/, /youtube\.com\/watch\?v=([\w-]+)/, /youtube\.com\/embed\/([\w-]+)/];
    for (const pattern of patterns) { const match = url.match(pattern); if (match) return match[1]; }
    return null;
  };
  const isYouTube = (url: string) => url && (url.includes('youtube.com') || url.includes('youtu.be'));
  const youtubeId = getYouTubeId(currentVideo.videoUrl);
  const isCurrentYouTube = isYouTube(currentVideo.videoUrl);

  // Reset facade when switching videos
  const handleVideoSwitch = (video: typeof currentVideo) => {
    setCurrentVideo(video);
    setPlayerLoaded(false);
    if (videoRef.current && !isYouTube(video.videoUrl)) videoRef.current.load();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6 items-start">
      {/* Player */}
      <div className="lg:col-span-3 rounded-2xl overflow-hidden shadow-lg order-1" style={{ background: "#fff", border: "1.5px solid #e8e8e8" }}>
        <div className="relative w-full aspect-video bg-black">
          {isCurrentYouTube && youtubeId ? (
            playerLoaded ? (
              <iframe width="100%" height="100%"
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                title={currentVideo.title} frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen className="w-full h-full" />
            ) : (
              <button
                className="w-full h-full relative cursor-pointer border-0 p-0 bg-black group"
                onClick={() => setPlayerLoaded(true)}
                aria-label={`Reproduzir ${currentVideo.title}`}>
                <img
                  src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
                  alt={currentVideo.title}
                  loading="lazy" decoding="async"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                  <svg width="68" height="48" viewBox="0 0 68 48" className="drop-shadow-lg">
                    <path d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55C3.97 2.33 2.27 4.81 1.48 7.74.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z" fill="red"/>
                    <path d="M45 24L27 14v20" fill="white"/>
                  </svg>
                </div>
              </button>
            )
          ) : (
            <video ref={videoRef} controls poster={currentVideo.thumbnail} preload="none" className="w-full h-full">
              <source src={currentVideo.videoUrl} type="video/mp4" />
            </video>
          )}
        </div>
        <div className="p-4 sm:p-5">
          <h3 className="text-sm sm:text-base font-extrabold mb-2" style={{ color: C.text }}>Descrição</h3>
          <p className="text-xs sm:text-sm mb-3 leading-relaxed [&_strong]:font-bold [&_strong]:text-foreground" style={{ color: C.muted }} dangerouslySetInnerHTML={{ __html: currentVideo.desc }} />
          <p className="text-xs sm:text-sm font-semibold leading-relaxed" style={{ color: C.primary }}>
            Assista ao vídeo e veja como a {currentVideo.name} usa o InstaNinja para aumentar o faturamento como afiliada — de forma inteligente e sem complicação.
          </p>
        </div>
      </div>
      {/* Lista lateral */}
      <div className="lg:col-span-2 rounded-2xl shadow-lg p-3 sm:p-4 order-2" style={{ background: "#fff", border: "1.5px solid #e8e8e8" }}>
        <h3 className="text-xs font-bold uppercase tracking-widest mb-3 px-1" style={{ color: C.cta }}>
          🎬 Depoimentos
        </h3>
        <div className="max-h-[480px] overflow-y-auto pr-1 video-list-scroll space-y-1.5">
          {videos.map((video) => {
            const isActive = currentVideo.id === video.id;
            return (
              <div key={video.id}
                className="flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-all"
                style={{
                  background: isActive ? `${C.primary}0A` : "transparent",
                  border: isActive ? `1.5px solid ${C.primary}30` : "1.5px solid transparent",
                }}
                onClick={() => handleVideoSwitch(video)}>
                <div className="relative flex-shrink-0">
                  <img src={video.thumbnail} alt={video.title} loading="lazy" decoding="async"
                    className="w-16 h-10 object-cover rounded-lg" />
                  {isActive && (
                    <div className="absolute inset-0 rounded-lg flex items-center justify-center" style={{ background: `${C.primary}55` }}>
                      <span className="text-white text-xs">▶</span>
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-bold leading-tight truncate" style={{ color: isActive ? C.primary : C.text }}>{video.title}</p>
                  <p className="text-[10px] mt-0.5" style={{ color: C.muted }}>{video.duration}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Floating Badge ──────────────────────────────────
function FloatingBadge({ className, icon, title, sub }: { className: string; icon: string; title: string; sub: string }) {
  return (
    <div className={className}>
      <div className="bg-white rounded-xl p-2 flex items-center gap-1.5 shadow-[0_8px_24px_rgb(0,0,0,0.1)] border border-gray-100 min-w-[140px]">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: `linear-gradient(135deg, ${C.primary}18, ${C.cta}18)` }}>
          <span className="text-lg">{icon}</span>
        </div>
        <div>
          <div className="text-sm font-black leading-tight" style={{ color: C.text }}>{title}</div>
          <div className="text-[9px] font-bold uppercase tracking-wider opacity-50" style={{ color: C.text }}>{sub}</div>
        </div>
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    const onResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onResize); };
  }, []);

  const statsItems = t("stats.items", { returnObjects: true }) as any[];
  const howItWorksSteps = t("howItWorks.steps", { returnObjects: true }) as any[];
  const featureItems = t("features.items", { returnObjects: true }) as any[];
  const triggerItems = t("triggers.items", { returnObjects: true }) as any[];
  const affiliateItems = t("affiliate.items", { returnObjects: true }) as any[];
  const faqItems = t("faq.items", { returnObjects: true }) as any[];

  const PRESS_VIDEO_URL = "https://www.instaninja.com.br/videos/instaninja_Divulganinja_ZAP24_Imprenssa.mp4";


  return (
    <div className="min-h-screen font-sans overflow-x-hidden" style={{ background: C.bg, color: C.text }}>
    <main>

      {/* MODAL VÍDEO IMPRENSA */}
      {pressVideoOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.88)" }} onClick={() => setPressVideoOpen(false)}>
          <div className="relative w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl bg-black" onClick={e => e.stopPropagation()}>
            <button onClick={() => setPressVideoOpen(false)} className="absolute top-2 right-2 z-10 w-10 h-10 rounded-full flex items-center justify-center text-white text-2xl font-bold hover:scale-110 transition-transform" style={{ background: "rgba(0,0,0,0.7)", border: "2px solid rgba(255,255,255,0.5)" }}>✕</button>
            <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 rounded-full px-3 py-1" style={{ background: "rgba(255,186,77,0.9)", color: "#000" }}>
              <span className="text-[11px] font-bold">Imprensa Nacional</span>
            </div>
            <video src={PRESS_VIDEO_URL} controls autoPlay className="w-full block" style={{ maxHeight: "70vh" }} />
          </div>
        </div>
      )}

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
        style={{ background: "rgba(255,255,255,0.97)", backdropFilter: "blur(14px)", borderBottom: scrolled ? "2px solid #e5e7eb" : "1px solid transparent", boxShadow: scrolled ? "0 2px 12px rgba(0,0,0,0.06)" : "none" }}>
        <div className="max-w-6xl mx-auto px-2 sm:px-6 py-1.5 sm:py-2.5 flex items-center justify-between gap-1.5">
          <img src={instaNinjaLogo} alt="InstaNinja" className="h-9 sm:h-9 w-auto flex-shrink-0" width="119" height="36" loading="eager" />
          <div className="hidden md:flex items-center gap-5 text-sm font-medium">
            <a href="#como-funciona" className="hover:opacity-80 transition-opacity" style={{ color: C.primary }}>{t("nav.howItWorks")}</a>
            <a href="#recursos" className="hover:opacity-80 transition-opacity" style={{ color: C.primary }}>{t("nav.features")}</a>
            <a href="#faq" className="hover:opacity-80 transition-opacity" style={{ color: C.primary }}>{t("nav.faq")}</a>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5 rounded-full p-0.5" style={{ background: "#f0f0f0" }}>
              {languages.map(l => (
                <button key={l.code} onClick={() => i18n.changeLanguage(l.code)}
                  className="rounded-full px-1.5 py-0.5 flex items-center gap-1 transition-all"
                  style={{ background: i18n.language === l.code ? "#fff" : "transparent", boxShadow: i18n.language === l.code ? "0 1px 6px rgba(0,0,0,0.08)" : "none" }}>
                  <img src={l.flag} alt={l.label} className="w-5 h-auto rounded-sm" width="20" height="15" loading="lazy" />
                  <span className="text-[10px] font-bold leading-none hidden sm:inline" style={{ color: i18n.language === l.code ? C.primary : "#666" }}>{l.label}</span>
                </button>
              ))}
            </div>
            <a href={APP_URL} target="_blank" rel="noreferrer"
              className="text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-all hover:opacity-90 flex-shrink-0"
              style={{ background: `linear-gradient(135deg, ${C.cta}, ${C.primary})` }}>
              Entrar
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative pt-14 sm:pt-16 pb-0 overflow-hidden" style={{ background: "#fff" }}>
        {/* Background blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute -top-24 -right-16 w-[400px] h-[400px] rounded-[60%_40%_55%_45%/45%_55%_40%_60%] opacity-40" style={{ background: "radial-gradient(ellipse at 60% 40%, #FFBA4D44, #FF6B6B22 50%, transparent 80%)", filter: "blur(36px)" }} />
          <div className="absolute top-10 right-24 w-[280px] h-[280px] rounded-[45%_55%_60%_40%/55%_45%_55%_45%] opacity-40" style={{ background: `radial-gradient(ellipse at 40% 60%, ${C.cta}33, ${C.primary}18 60%, transparent 85%)`, filter: "blur(24px)" }} />
          <div className="absolute -bottom-4 -left-10 w-[320px] h-[220px] rounded-[50%_50%_40%_60%/60%_40%_60%_40%] opacity-40" style={{ background: "radial-gradient(ellipse at 50% 50%, #C77DFF22, #7B2FBE18 60%, transparent 85%)", filter: "blur(28px)" }} />
        </div>

        <div className="w-full px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
              {/* Left text */}
              <div className="flex-1 pt-2 pb-4 sm:pb-6 lg:pb-12 text-left w-full">
                <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] sm:text-[11px] font-semibold mb-3 sm:mb-4"
                  style={{ background: `${C.primary}10`, color: C.primary, border: `1px solid ${C.primary}25` }}>
                  🏆 {t("hero.badge")}
                </div>
                <h1 className="text-xl sm:text-3xl lg:text-[2.75rem] font-extrabold leading-[1.15] mb-3" style={{ color: C.text }}>
                  Responda de modo automático e ilimitado no Instagram
                </h1>
                <div className="text-base sm:text-xl lg:text-2xl font-bold leading-tight mb-3" style={{ color: C.primary, minHeight: "1.4em" }}>
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
                <p className="text-sm sm:text-base mb-1.5 leading-relaxed max-w-xl" style={{ color: C.muted }}>{t("hero.sub")}</p>
                <p className="text-xs sm:text-sm font-bold mb-1.5" style={{ color: C.primary }}>{t("hero.stat")}</p>
                <p className="text-xs sm:text-sm mb-4 italic" style={{ color: "#888" }}>{t("hero.differentiator")}</p>
                <CTAButton href={APP_URL} large className="w-full sm:w-auto">{t("hero.ctaPrimary")}</CTAButton>
                {/* Trust badges */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1 mt-3 opacity-50">
                  {[
                    { icon: "🌐", label: "API Oficial" },
                    { icon: "💳", label: "Pix ou Cartão" },
                    { icon: "👥", label: "+50 mil Usuários Ativos" },
                  ].map((badge, i) => (
                    <React.Fragment key={i}>
                      {i > 0 && <div className="hidden sm:block w-px h-3 bg-gray-300" />}
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm">{badge.icon}</span>
                        <span className="text-[9px] sm:text-[11px] font-bold text-gray-600 uppercase tracking-wide whitespace-nowrap">{badge.label}</span>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
              {/* Phone carousel */}
              <div className="relative flex-shrink-0 w-full lg:w-auto flex justify-center">
                <PhoneCarousel />
                {isDesktop && <>
                  <FloatingBadge className="absolute top-12 -left-20 z-50 animate-float-1" icon="📈" title="3x mais" sub="conversões" />
                  <FloatingBadge className="absolute top-40 -right-16 z-50 animate-float-2" icon="💬" title="24/7" sub="automação ativa" />
                  <FloatingBadge className="absolute bottom-24 -left-12 z-50 animate-float-3" icon="⚡" title="15 segundos" sub="para ativar" />
                </>}
              </div>
            </div>
          </div>
        </div>

        {/* TAGLINE */}
        <div className="w-full px-4 sm:px-6 pb-8 sm:pb-10 mt-2">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-6">
              <p className="font-bold leading-snug" style={{ fontSize: "clamp(1rem, 2vw, 1.35rem)", color: C.primary }}>{t("tagline")}</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {segmentCards.map((seg, i) => (
                <a key={i} href={APP_URL} target="_blank" rel="noopener noreferrer"
                  className="group flex flex-col gap-1.5 rounded-xl p-4 transition-all cursor-pointer no-underline hover:-translate-y-1 hover:shadow-lg"
                  style={{ background: "#fff", border: `1.5px solid ${C.primary}15`, boxShadow: "0 2px 8px rgba(153,0,204,0.04)" }}>
                  <span className="text-2xl">{seg.icon}</span>
                  <span className="font-extrabold text-xs sm:text-sm" style={{ color: C.text }}>{seg.title}</span>
                  <span className="text-[10px] sm:text-[11px] leading-relaxed" style={{ color: C.muted }}>{seg.desc}</span>
                  <span className="text-[10px] sm:text-[11px] font-bold mt-auto" style={{ color: C.cta }}>Teste Grátis →</span>
                </a>
              ))}
            </div>
          </div>
        </div>
        <SectionDivider from="#fff" to={C.statsBg} />
      </section>

      {/* RECONHECIMENTO NACIONAL */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 overflow-hidden" style={{ background: "linear-gradient(135deg, #471359 0%, #6B2E7E 50%, #471359 100%)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="rounded-2xl sm:rounded-3xl p-5 sm:p-10" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(10px)" }}>
            {/* Plataformas */}
            <div className="mb-8 sm:mb-10 pb-8 sm:pb-10 border-b" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 mb-3 px-4 py-2 rounded-full" style={{ background: "rgba(213,32,195,0.15)", border: "1px solid rgba(213,32,195,0.35)" }}>
                  <span className="text-lg">⭐</span>
                  <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#D520C3" }}>Reconhecimento Nacional</span>
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold mb-1.5 text-white">
                  O <span style={{ color: "#D520C3" }}>#1 em Automação</span> para Afiliados, Produtores de Conteúdo e Empresas no Brasil
                </h3>
                <p className="text-xs sm:text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>Nos maiores programas de afiliados do Brasil</p>
              </div>
              {/* Marquee de plataformas */}
              <div className="marquee-container">
                <div className="marquee-track">
                  {[...platforms, ...platforms].map((p, i) => (
                    <div key={i} className="marquee-item flex flex-col items-center gap-2 p-4 sm:p-5 rounded-xl flex-shrink-0"
                      style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", minWidth: "140px" }}>
                      <img src={p.logo} alt={p.name} loading="lazy" decoding="async" className="w-12 h-12 sm:w-14 sm:h-14 object-contain" />
                      <span className="text-[10px] sm:text-xs font-semibold text-center whitespace-nowrap" style={{ color: "rgba(255,255,255,0.85)" }}>{p.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Imprensa */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 mb-3 px-4 py-2 rounded-full" style={{ background: "rgba(213,32,195,0.15)", border: "1px solid rgba(213,32,195,0.35)" }}>
                <span className="text-lg">📰</span>
                <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#D520C3" }}>Em Destaque</span>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold mb-1.5 text-white">O Maior da América Latina</h3>
              <p className="text-xs sm:text-sm mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>Presença nos principais veículos de comunicação do Brasil</p>
              {/* Marquee de imprensa */}
              <div className="marquee-container">
                <div className="marquee-track marquee-reverse">
                  {[...pressLogos, ...pressLogos].map((logo, i) => (
                    <div key={i} className="marquee-item flex flex-col items-center gap-2 p-4 sm:p-5 rounded-xl flex-shrink-0 cursor-pointer hover:scale-105 transition-transform"
                      style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", minWidth: "160px" }}
                      onClick={() => setPressVideoOpen(true)}>
                      <img src={logo.file} alt={logo.name} loading="lazy" decoding="async" className="w-14 h-14 sm:w-16 sm:h-16 object-contain" />
                      <span className="text-[10px] sm:text-xs font-semibold text-center whitespace-nowrap" style={{ color: "rgba(255,255,255,0.85)" }}>{logo.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALERIA DE VÍDEOS */}
      <section className="py-10 sm:py-14 px-4 sm:px-6" style={{ background: C.bg }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold mb-2 leading-tight" style={{ color: C.primary }}>
              Todo mundo já está usando o InstaNinja. E você? O que está fazendo para não perder vendas, clientes e seguidores?
            </h2>
            <p className="text-xs sm:text-sm max-w-3xl mx-auto" style={{ color: C.muted }}>
              Não é só para grandes influenciadores — qualquer pessoa pode vender mais e ganhar tempo com o InstaNinja. É simples, acessível e rápido de ativar. Somos a maior automação de Instagram da América do Sul 🌎, prontos para colocar você no nível dos maiores.
            </p>
          </div>
          <VideoGallery videos={partnerVideosNew} />
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section id="como-funciona" className="py-12 sm:py-14 px-4 sm:px-6" style={{ background: C.bg }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 sm:mb-10">
            <span className="text-[10px] sm:text-[11px] font-bold tracking-widest uppercase" style={{ color: C.cta }}>{t("howItWorks.badge")}</span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold mt-1.5" style={{ color: C.text }}>{t("howItWorks.title")}</h2>
          </div>
          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Array.isArray(howItWorksSteps) && howItWorksSteps.map((step: any, i: number) => (
                <div key={i} className="rounded-xl p-4 transition-all hover:-translate-y-1 hover:shadow-md"
                  style={{ background: "#fff", border: "1.5px solid #e8e8e8" }}>
                  <div className="text-2xl font-extrabold mb-1" style={{ color: C.primary, opacity: 0.2 }}>{step.num}</div>
                  <h3 className="font-bold text-sm mb-1" style={{ color: C.text }}>{step.title}</h3>
                  <p className="text-[10px] sm:text-[11px] leading-relaxed" style={{ color: C.muted }}>{step.desc}</p>
                </div>
              ))}
              <div className="col-span-1 sm:col-span-2 mt-2">
                <CTAButton href={APP_URL} large className="w-full sm:w-auto">Teste Grátis agora</CTAButton>
              </div>
            </div>
            <div className="flex-shrink-0 flex justify-center">
              <div className="relative" style={{ filter: `drop-shadow(0 20px 40px ${C.primary}30)` }}>
                <img src={heroPhoneGif} alt="InstaNinja no celular" loading="lazy" decoding="async"
                  width="256" height="458"
                  className="w-48 lg:w-64 rounded-2xl" style={{ boxShadow: "0 24px 48px -12px rgba(0,0,0,0.2)" }} />
                <div className="absolute -top-2 -right-3 rounded-full px-2.5 py-1 text-[10px] font-bold text-white shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${C.cta}, ${C.primary})` }}>
                  No piloto automático
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider from={C.bg} to={C.statsBg} />

      {/* STATS */}
      <section className="py-12 sm:py-14 px-4 sm:px-6" style={{ background: C.statsBg }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-[10px] sm:text-[11px] font-bold tracking-widest uppercase" style={{ color: C.cta }}>{t("stats.badge")}</span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold mt-1.5 mb-1.5" style={{ color: C.text }}>{t("stats.title")}</h2>
            <p className="text-xs sm:text-sm" style={{ color: C.muted }}>{t("stats.sub")}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
            {Array.isArray(statsItems) && statsItems.map((item: any, i: number) => (
              <div key={i} className="rounded-xl p-5 text-center transition-all hover:-translate-y-1 hover:shadow-md"
                style={{ background: "#fff", border: "1.5px solid #e8e8e8" }}>
                <div className="text-4xl sm:text-5xl font-extrabold mb-1.5" style={purpleGrad}><CountUp end={item.value} /></div>
                <p className="text-[10px] sm:text-[11px]" style={{ color: C.muted }}>{item.label}</p>
              </div>
            ))}
          </div>
          <div className="rounded-xl p-4 text-center" style={{ background: "#fff3f3", border: "1.5px solid #ffcccc" }}>
            <p className="text-sm font-medium" style={{ color: "#cc0000" }}>{t("stats.warning")}</p>
          </div>
          <div className="mt-6 text-center">
            <CTAButton href={APP_URL} large>Planos A Partir De R$ 39,90/Mês →</CTAButton>
          </div>
        </div>
      </section>

      <SectionDivider from={C.statsBg} to={C.bg} />

      {/* FEATURES */}
      <section id="recursos" className="py-12 sm:py-14 px-4 sm:px-6" style={{ background: C.statsBg }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 sm:mb-10">
            <span className="text-[10px] sm:text-[11px] font-bold tracking-widest uppercase" style={{ color: C.cta }}>{t("features.badge")}</span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold mt-1.5 mb-1.5" style={{ color: C.text }}>{t("features.title")}</h2>
            <p className="text-xs sm:text-sm" style={{ color: C.muted }}>{t("features.sub")}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {Array.isArray(featureItems) && featureItems.map((item: any, i: number) => (
              <div key={i} className="rounded-xl p-4 transition-all hover:-translate-y-1 hover:shadow-md"
                style={{ background: "#fff", border: "1.5px solid #e8e8e8" }}>
                <div className="text-2xl mb-1.5">{item.icon}</div>
                <h3 className="font-bold text-sm mb-1" style={{ color: C.text }}>{item.title}</h3>
                <p className="text-[10px] sm:text-[11px] leading-relaxed" style={{ color: C.muted }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider from={C.statsBg} to={C.bg} />

      {/* TRIGGERS */}
      <section className="py-12 sm:py-14 px-4 sm:px-6" style={{ background: C.bg }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-[10px] sm:text-[11px] font-bold tracking-widest uppercase" style={{ color: C.cta }}>{t("triggers.badge")}</span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold mt-1.5 mb-1.5" style={{ color: C.text }}>{t("triggers.title")}</h2>
            <p className="text-xs sm:text-sm" style={{ color: C.muted }}>{t("triggers.sub")}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Array.isArray(triggerItems) && triggerItems.map((item: any, i: number) => (
              <div key={i} className="rounded-xl p-4 transition-all hover:-translate-y-1 hover:shadow-md"
                style={{ background: "#fff", border: `1.5px solid ${C.primary}18` }}>
                <p className="font-bold text-sm mb-0.5" style={{ color: C.primary }}>{item.trigger}</p>
                <p className="text-[10px] sm:text-[11px]" style={{ color: C.muted }}>{item.result}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AFFILIATE */}
      <section className="py-14 sm:py-16 px-4 sm:px-6" style={{ background: C.dark }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-[10px] sm:text-[11px] font-bold tracking-widest uppercase" style={{ color: "#f5c842" }}>{t("affiliate.badge")}</span>
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold mt-1.5 mb-1.5 text-white">{t("affiliate.title")}</h2>
            <p className="text-xs sm:text-sm max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.65)" }}>
              Comissões maiores que Shopee, Amazon e Mercado Livre — pagas todo mês, para sempre.
            </p>
          </div>
          <div className="rounded-2xl p-6 sm:p-8 mb-6 text-center" style={{ background: "rgba(255,255,255,0.07)", border: "1.5px solid rgba(255,255,255,0.12)" }}>
            <div className="text-5xl sm:text-7xl font-extrabold mb-1.5 text-white">20%</div>
            <p className="text-lg sm:text-xl font-bold mb-0.5 text-white">de comissão recorrente todo mês</p>
            <p className="text-[10px] sm:text-[11px]" style={{ color: "rgba(255,255,255,0.5)" }}>Por todo o tempo que o seu indicado for assinante — sem limite de indicações</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {Array.isArray(affiliateItems) && affiliateItems.map((item: any, i: number) => (
              <div key={i} className="flex gap-3 rounded-xl p-4 transition-all hover:-translate-y-1"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <span className="text-xl flex-shrink-0">{item.icon}</span>
                <p className="text-[10px] sm:text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>{item.text}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <a href="https://instaninja.com.br/indique-ganhe-link-afiliado-instaninja-hotmart/" target="_blank" rel="noreferrer"
              className="inline-block text-white font-bold text-base sm:text-lg px-8 py-3.5 rounded-xl hover:opacity-90 transition-all w-full sm:w-auto"
              style={{ background: `linear-gradient(135deg, ${C.cta}, ${C.primary})`, boxShadow: `0 6px 24px -6px ${C.cta}88` }}>
              {t("affiliate.cta")}
            </a>
            <p className="mt-2.5 text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>Pagamentos via Hotmart — a maior plataforma de afiliados do mundo</p>
          </div>
        </div>
      </section>

      {/* DIVULGANINJA */}
      <section className="py-6 sm:py-8 px-4 sm:px-6" style={{ background: C.statsBg }}>
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl sm:rounded-3xl p-6 sm:p-10 text-center" style={{ background: "#fff", border: "1.5px solid #e8e8e8", boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}>
            <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "#25D366" }}>CONHEÇA TAMBÉM</span>
            <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold mt-2 mb-3" style={{ color: C.text }}>
              {t("divulganinja.title")}{" "}
              <span style={{ color: "#25D366" }}>{t("divulganinja.titleWa")}</span>{" "}
              {t("divulganinja.titleAnd")}{" "}
              <span style={{ color: "#2AABEE" }}>{t("divulganinja.titleTg")}</span>
            </h2>
            <div className="text-sm sm:text-base font-bold mb-3" style={{ color: C.primary }}>{t("divulganinja.highlight")}</div>
            <p className="text-sm max-w-2xl mx-auto mb-6 leading-relaxed" style={{ color: C.muted }}>{t("divulganinja.sub")}</p>
            <a href="https://www.divulganinja.com.br" target="_blank" rel="noreferrer"
              className="inline-block text-white font-bold px-7 py-2.5 rounded-xl text-sm hover:opacity-90 transition-all"
              style={{ background: "linear-gradient(90deg, #25D366, #128C7E)" }}>
              {t("divulganinja.cta1")}
            </a>
            <div className="mt-8 pt-8 border-t" style={{ borderColor: "#e8e8e8" }}>
              <span className="text-[9px] font-bold tracking-widest uppercase" style={{ color: "#25D366" }}>{t("divulganinja.stores_badge")}</span>
              <h3 className="text-base sm:text-xl font-bold mt-2 mb-2" style={{ color: C.text }}>{t("divulganinja.stores_title")}</h3>
              <p className="text-xs sm:text-sm mb-6" style={{ color: C.muted }}>{t("divulganinja.stores_sub")}</p>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {storesList.map((store, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-2" style={{ background: "#f5f5f5", border: "1px solid #e8e8e8" }}>
                      <img src={store.logo} alt={store.name} loading="lazy" decoding="async" className="w-10 h-10 object-contain" />
                    </div>
                    <span className="text-[10px] font-medium text-center" style={{ color: C.muted }}>{store.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider from={C.statsBg} to={C.bg} />

      {/* FAQ */}
      <section id="faq" className="py-12 sm:py-14 px-4 sm:px-6" style={{ background: C.bg }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-10 items-start">
            <div className="md:col-span-2">
              <div className="bg-white rounded-xl p-5 sm:p-6 w-full shadow-md sticky top-20">
                <img src={instagramApiBadge} alt="Conectado à API oficial do Instagram" loading="lazy" decoding="async" className="w-full h-auto" />
              </div>
            </div>
            <div className="md:col-span-3">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold mb-5" style={{ color: C.text }}>{t("faq.title")}</h2>
              <div className="space-y-2.5">
                {Array.isArray(faqItems) && faqItems.map((item: any, i: number) => (
                  <FaqItem key={i} question={item.q} answer={item.a} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      </main>
      {/* FOOTER */}
      <footer style={{ background: C.dark }}>
        <div className="py-10 sm:py-12 px-4 sm:px-6 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">Teste agora mesmo e veja como automatizar suas interações no Instagram pode transformar suas vendas.</h2>
            <p className="text-xs sm:text-sm mb-5" style={{ color: "rgba(255,255,255,0.65)" }}>Teste o plano gratuito do InstaNinja e comece a responder comentários e enviar links automaticamente.</p>
            <a href={APP_URL} target="_blank" rel="noreferrer" className="inline-block px-7 py-2.5 rounded-lg font-semibold transition-all hover:opacity-90 text-white text-sm"
              style={{ background: C.primary }}>
              Teste agora mesmo
            </a>
          </div>
        </div>
        <div className="py-8 sm:py-10 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div>
                <h3 className="font-bold text-sm mb-3 text-white">{t("footer.product")}</h3>
                <ul className="space-y-1.5 text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>
                  <li><a href={APP_URL} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">{t("footer.features")}</a></li>
                  <li><a href={APP_URL} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">{t("footer.pricing")}</a></li>
                  <li><a href={APP_URL} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">{t("footer.how_it_works")}</a></li>
                  <li><a href={APP_URL} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">{t("footer.testimonials")}</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-sm mb-3 text-white">📚 {t("footer.learn")}</h3>
                <ul className="space-y-1.5 text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>
                  <li><a href={APP_URL} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">{t("footer.instagram_automation")}</a></li>
                  <li><a href={APP_URL} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">{t("footer.automation_guide")}</a></li>
                  <li><a href={APP_URL} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">{t("footer.meta_approved")}</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-sm mb-3 text-white">{t("footer.support")}</h3>
                <ul className="space-y-1.5 text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>
                  <li><a href={APP_URL} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">{t("footer.faq")}</a></li>
                  <li><a href={APP_URL} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">{t("footer.contact")}</a></li>
                  <li><a href="/privacy-policy" className="hover:text-white transition-colors">{t("footer.privacy_policy")}</a></li>
                  <li><a href="/terms-of-use" className="hover:text-white transition-colors">{t("footer.terms_of_use")}</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-sm mb-3 text-white">{t("footer.social_media")}</h3>
                <div className="space-y-1.5 mb-4">
                  <a href="https://www.instagram.com/instaninja.app/" target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:opacity-80 text-xs text-white" style={{ background: "rgba(255,255,255,0.08)" }}>
                    @instaninja.app
                  </a>
                  <a href="https://www.youtube.com/@instaninja" target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:opacity-80 text-xs text-white" style={{ background: "rgba(255,255,255,0.08)" }}>
                    @InstaNinja_App
                  </a>
                </div>
                <div className="border-t pt-3" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                  <p className="font-bold text-[10px] text-white mb-2">Selos de Confiança</p>
                  <div className="space-y-1 text-[10px]" style={{ color: "rgba(255,255,255,0.6)" }}>
                    <div className="flex items-center gap-1.5"><span style={{ color: "#22c55e" }}>✓</span><span>API Oficial da Meta</span></div>
                    <div className="flex items-center gap-1.5"><span style={{ color: "#22c55e" }}>✓</span><span>Plano Gratuito</span></div>
                    <div className="flex items-center gap-1.5"><span style={{ color: "#22c55e" }}>✓</span><span>Cancele quando quiser</span></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px]" style={{ borderColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.35)" }}>
              <p>© 2026 {t("footer.company_name")}. {t("footer.all_rights")}</p>
              <p>{t("footer.made_in_brazil")}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}