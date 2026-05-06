"use client";

import { useState } from "react";
import { useEffect } from "react";
import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: {
    transition: { staggerChildren: 0.08 },
  },
};

const sectionReveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
};

const CODE_SNIPPETS = {
  fr: [
    "await flutter.deploy(release: true);",
    "SELECT * FROM produits WHERE confiance = 'élevée';",
    "bridge.pigeon.sync(ios: Swift, android: Kotlin);",
    "class Impact extends MobileProduct {}",
  ],
  en: [
    "await flutter.deploy(release: true);",
    "SELECT * FROM products WHERE reliability = 'high';",
    "bridge.pigeon.sync(ios: Swift, android: Kotlin);",
    "class Impact extends MobileProduct {}",
  ],
} as const;

const TECH_ROW = [
  {name: "Flutter", logo: "/logos/flutter.webp"},
  {name: "Dart", logo: "/logos/dart.webp"},
  {name: "Angular", logo: "/logos/angular.webp"},
  {name: "TypeScript", logo: "/logos/typescript.webp"},
  {name: "Kotlin", logo: "/logos/kotlin.png"},
  {name: "Firebase", logo: "/logos/firebase_logo.webp"},
  {name: "Git", logo: "/logos/git.webp"},
  {name: "IoT", logo: "/logos/iot2.jpg"},

];

const SIDE_ROW = [
  {name: "Proxmox", logo: "/logos/proxmox.svg"},    
  {name: "LXC", logo: "/logos/lxc.svg"},
  {name: "VM", logo: "/logos/vm.jpg"},
  {name: "Nginx", logo: "/logos/nginx.svg"},
  {name: "Adguard", logo: "/logos/adguard.svg"},
  {name: "Home Assistant", logo: "/logos/home-assistant.svg"},
  {name: "ZeroTier", logo: "/logos/zerotier.svg"},
  {name: "Glance", logo: "/logos/glance.webp"},
  {name: "Immich", logo: "/logos/immich.svg"},
  {name: "NextCloud", logo: "/logos/nextcloud.svg"},
];

const NAV_ITEMS = ["#expertise", "#parcours", "#projets", "#contact"] as const;

type Locale = "fr" | "en";

const CONTENT = {
  fr: {
    nav: ["Expertise", "Parcours", "Projets", "Contact"],
    ctaDiscuss: "Discutons",
    role: "Ingénieur mobile & produit",
    heroTitleTop: "Des apps mobiles",
    heroTitleBottom: "fiables, scalables, orientées métier.",
    heroDescription:
      "Je conçois et livre des expériences Flutter en production : architecture maintenable, ponts natifs (Swift / Kotlin), IoT et intégrations critiques pour l’assurance et les marchés à forte exigence qualité.",
    heroPrimaryCta: "Voir les réalisations",
    heroSecondaryCta: "Me contacter",
    trustedLabel: "Trusted by leading enterprises",
    expertiseKicker: "Résoudre de vrais problèmes",
    expertiseTitle: "Ce que je livre",
    expertiseDescription:
      "Un profil orienté résultats : du cadrage technique à la mise en prod, avec une communication claire vers les parties prenantes métier.",
    expertiseBulletTitle: "Axes forts",
    techTitle: "Tech Stack",
    sideTitle: "Projects personnels",
    journeyKicker: "Parcours",
    journeyTitle: "Expérience récente",
    projectsKicker: "Sélection",
    projectsTitle: "Projets marquants",
    projectsDescription:
      "Quelques références qui illustrent la diversité des sujets : marché, vision par ordinateur, IoT et grands comptes assurance.",
    contactKicker: "Prochaine étape",
    contactTitle: "Construisons quelque chose de solide",
    contactDescription:
      "Recrutement, mission ou échange informel : je réponds avec plaisir. Indiquez votre contexte et vos objectifs — je reviens vers vous rapidement.",
    contactMailCta: "Écrire un e-mail",
    footer: "Portfolio",
  },
  en: {
    nav: ["Expertise", "Journey", "Projects", "Contact"],
    ctaDiscuss: "Let's talk",
    role: "Mobile & product engineer",
    heroTitleTop: "Mobile apps",
    heroTitleBottom: "reliable, scalable, business-driven.",
    heroDescription:
      "I design and deliver production-ready Flutter experiences: maintainable architecture, native bridges (Swift / Kotlin), IoT, and critical integrations for insurance and high-quality environments.",
    heroPrimaryCta: "View work",
    heroSecondaryCta: "Get in touch",
    trustedLabel: "Trusted by leading enterprises",
    expertiseKicker: "Solving real problems",
    expertiseTitle: "What I deliver",
    expertiseDescription:
      "A results-driven profile from technical framing to production, with clear communication for business stakeholders.",
    expertiseBulletTitle: "Strategic focus",
    techTitle: "Tech Stack",
    sideTitle: "Side projects",
    journeyKicker: "Journey",
    journeyTitle: "Recent experience",
    projectsKicker: "Selection",
    projectsTitle: "Featured projects",
    projectsDescription:
      "A few references that showcase diverse topics: marketplace, computer vision, IoT, and enterprise insurance platforms.",
    contactKicker: "Next step",
    contactTitle: "Let's build something solid",
    contactDescription:
      "Hiring, mission, or informal chat: happy to connect. Share your context and goals — I will get back to you quickly.",
    contactMailCta: "Send an email",
    footer: "Portfolio",
  },
} as const;

const TRUSTED_COMPANIES = [
  { name: "Flora by Ethias",monogram: "F",logo: "/logos/flora.png",logoClassName: "" },
  { name: "Ethias",monogram: "F",logo: "/logos/ethias.png",logoClassName: "scale-[1.2] object-left" },
  { name: "P&V", monogram: "P", logo: "/logos/pv.svg", logoClassName: "" },
  { name: "NRB", monogram: "N", logo: "/logos/nrb.png", logoClassName: "" },
  {
    name: "KEYES",
    monogram: "K",
    logo: "/logos/keyes_logo.jpeg",
    logoClassName: "scale-[1.2] object-left"
  },
  { name: "Contraste", monogram: "C", logo: "/logos/contraste.png", logoClassName: "" },
  { name: "SudInfo", monogram: "S", logo: "/logos/sudinfo.webp", logoClassName: "scale-[1.2] object-left" },
  { name: "Lesoir", monogram: "LS", logo: "/logos/lesoir.png", logoClassName: "scale-[1.7] object-left" },
  { name: "RTL", monogram: "R", logo: "/logos/rtl.webp", logoClassName: "scale-[1.2] object-left" },
];

export default function Home() {
  const [locale, setLocale] = useState<Locale>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("locale") as Locale) || "fr";
    }
    return "fr";
  });

  useEffect(() => {
    localStorage.setItem("locale", locale);
  }, [locale]);
  
  const t = CONTENT[locale];
  const navLabels = t.nav;
  const expertiseItems =
    locale === "fr"
      ? [
          {
            title: "Développement mobile Flutter",
            body: "Applications performantes, navigation et état maîtrisés, UX cohérente sur iOS et Android.",
            bullets: [
              "Architecture évolutive (Clean Architecture, modules)",
              "Qualité release : tests, revues, pipelines CI/CD",
              "Features complexes (parcours souscription, IoT, paiements)",
            ],
          },
          {
            title: "IoT & couches natives",
            body: "Connexion capteurs, SDKs constructeurs et ponts Pigeon / channels pour un comportement fiable.",
            bullets: [
              "Ponts Swift / Kotlin et intégration de SDKs multiples",
              "Synchronisation données et résilience réseau",
              "Collaboration étroite avec les équipes plateforme",
            ],
          },
          {
            title: "Produit & assurance",
            body: "Compréhension des enjeux réglementaires et des parcours utilisateurs dans un secteur sensible.",
            bullets: [
              "Traduction des règles métier en parcours app clairs",
              "Coordination avec partenaires et équipes transverses (SPOC)",
              "Stabilité en production sur des volumétries réelles",
            ],
          },
          {
            title: "IA & vision (cas d'usage)",
            body: "Intégration de briques intelligentes lorsque le métier l'exige — sans sur-ingénierie.",
            bullets: [
              "Scénarios vision / reconnaissance orientés terrain",
              "Choix pragmatique entre edge, API et coûts",
              "Mesure d'impact et itérations avec les utilisateurs",
            ],
          },
        ]
      : [
          {
            title: "Flutter mobile development",
            body: "High-performance apps with robust navigation and state management, consistent on iOS and Android.",
            bullets: [
              "Scalable architecture (Clean Architecture, modular design)",
              "Release quality: testing, reviews, CI/CD pipelines",
              "Complex features (subscription flows, IoT, payments)",
            ],
          },
          {
            title: "IoT & native layers",
            body: "Sensor connectivity, vendor SDK integration, and Pigeon/channels bridges for reliable behavior.",
            bullets: [
              "Swift / Kotlin bridges and multi-SDK integrations",
              "Data synchronization and network resilience",
              "Close collaboration with platform teams",
            ],
          },
          {
            title: "Product & insurance",
            body: "Strong understanding of regulatory constraints and user journeys in sensitive domains.",
            bullets: [
              "Translating business rules into clear app journeys",
              "Coordination with partners and cross-functional teams (SPOC)",
              "Production stability at real-world scale",
            ],
          },
          {
            title: "AI & computer vision",
            body: "Integrating intelligent capabilities when they create real value - without over-engineering.",
            bullets: [
              "Field-oriented vision and recognition scenarios",
              "Pragmatic choices between edge, API, and costs",
              "Impact measurement and user-driven iteration",
            ],
          },
        ];

  const experienceItems =
    locale === "fr"
      ? [
          {
            period: "Récent",
            company: "P&V Assurances",
            role: "Développeur Flutter / SPOC",
            intro:
              "Pilotage et développement de l'application assurance Kazazen : IoT, partenaires multiples et alignement métier-tech.",
            bullets: [
              "Point de contact unique entre business, partenaires et équipes d'ingénierie pour accélérer les décisions.",
              "Architecture Flutter scalable avec intégrations natives (caméras, capteurs, SDKs).",
              "Livraisons régulières en production avec focus stabilité et expérience utilisateur.",
            ],
          },
          {
            period: "Récent",
            company: "Ethias",
            role: "Développeur Flutter",
            intro:
              "Contribution à Flora : plateforme mobile d'assurance et écosystème web (Angular) pour l'abonnement.",
            bullets: [
              "Évolution de parcours souscription et gestion de polices sur mobile.",
              "Collaboration avec les APIs et modules Angular côté souscription.",
              "Priorité à la qualité, la lisibilité du code et la dette technique maîtrisée.",
            ],
          },
        ]
      : [
          {
            period: "Recent",
            company: "P&V Insurance",
            role: "Flutter Developer / SPOC",
            intro:
              "Led and delivered Kazazen insurance app: IoT integrations, multiple partners, and strong business-tech alignment.",
            bullets: [
              "Single point of contact between business, partners, and engineering teams to accelerate decisions.",
              "Scalable Flutter architecture with native integrations (cameras, sensors, SDKs).",
              "Regular production releases focused on stability and user experience.",
            ],
          },
          {
            period: "Recent",
            company: "Ethias",
            role: "Flutter Developer",
            intro:
              "Contributed to Flora: mobile insurance platform and subscription web ecosystem (Angular).",
            bullets: [
              "Evolved subscription and policy management flows on mobile.",
              "Collaborated with APIs and Angular modules for subscription journeys.",
              "Strong focus on quality, readability, and technical debt control.",
            ],
          },
        ];

  const projectItems =
    locale === "fr"
      ? [
          {
            year: "Produit",
            title: "Zaboka",
            description:
              "Marketplace géolocalisée : chat temps réel, monnaie in-app et parcours transactionnels exigeants.",
            tags: ["Flutter", "Firebase", "Paiements", "Cartes"],
          },
          {
            year: "IA",
            title: "MEGA",
            description:
              "Application de reconnaissance de réservoirs : inférence temps réel et expérience terrain simplifiée.",
            tags: ["Flutter", "Vision / ML", "Inférence"],
          },
          {
            year: "Assurance · IoT",
            title: "Kazazen (P&V)",
            description:
              "App assurance connectée : capteurs, caméras et communication native fiable sur iOS et Android.",
            tags: ["Flutter", "Kotlin", "Swift", "IoT"],
          },
          {
            year: "Assurance",
            title: "Flora (Ethias)",
            description:
              "Portail mobile assurance : polices, souscription et alignement avec les systèmes existants.",
            tags: ["Flutter", "Angular", "APIs"],
          },
        ]
      : [
          {
            year: "Product",
            title: "Zaboka",
            description:
              "Geo-localized marketplace with real-time chat, in-app currency, and demanding transaction flows.",
            tags: ["Flutter", "Firebase", "Payments", "Maps"],
          },
          {
            year: "AI",
            title: "MEGA",
            description:
              "Tank recognition application with real-time inference and streamlined field experience.",
            tags: ["Flutter", "Vision / ML", "Inference"],
          },
          {
            year: "Insurance · IoT",
            title: "Kazazen (P&V)",
            description:
              "Connected insurance app with sensors, cameras, and reliable native communication on iOS and Android.",
            tags: ["Flutter", "Kotlin", "Swift", "IoT"],
          },
          {
            year: "Insurance",
            title: "Flora (Ethias)",
            description:
              "Mobile insurance portal: policies, subscription flows, and alignment with existing systems.",
            tags: ["Flutter", "Angular", "APIs"],
          },
        ];

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.35]"
        aria-hidden
        style={{
          backgroundImage: `
            radial-gradient(ellipse 80% 50% at 50% -20%, rgba(34, 211, 238, 0.15), transparent),
            linear-gradient(to bottom, transparent 0%, #ffffff 45%),
            linear-gradient(rgba(15,23,42,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(15,23,42,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 100% 100%, 48px 48px, 48px 48px",
        }}
      />

      <motion.header
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="fixed left-1/2 top-4 z-50 w-[calc(100%-2rem)] max-w-4xl -translate-x-1/2 rounded-full border border-zinc-200/80 bg-white/75 shadow-[0_8px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl"
      >
        <div className="mx-auto flex h-11 items-center justify-between px-3 sm:px-5">
          <a href="#" className="text-sm font-semibold tracking-tight text-zinc-900 sm:text-base">
            Laurent Malmendier
          </a>
          <nav className="hidden items-center gap-5 text-sm text-zinc-600 md:flex">
            {NAV_ITEMS.map((href, index) => (
              <a
                key={href}
                href={href}
                className="transition hover:text-cyan-700"
              >
                {navLabels[index]}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <select
              value={locale}
              onChange={(event) => setLocale(event.target.value as Locale)}
              aria-label="Language selector"
              className="rounded-full border border-zinc-300 bg-white/90 px-2.5 py-1 text-xs font-medium uppercase text-zinc-700 outline-none transition hover:border-cyan-600/50 focus:border-cyan-600/70 sm:text-sm"
            >
              <option value="fr">FR</option>
              <option value="en">EN</option>
            </select>
            <a
              href="#contact"
              className="btn-shimmer rounded-full border border-zinc-300 bg-white/90 px-3.5 py-1.5 text-xs font-medium text-zinc-800 transition hover:border-cyan-600/50 hover:text-cyan-700 sm:text-sm"
            >
              {t.ctaDiscuss}
            </a>
          </div>
        </div>
      </motion.header>

      <main className="pt-24">
        {/* HERO */}
        <section className="relative mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 sm:pt-24 md:pb-28">
          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            className="max-w-4xl"
          >
            <motion.p
              variants={fadeUp}
              className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-cyan-400/90 sm:text-sm"
            >
              {t.role}
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="text-3xl font-bold leading-[1.08] tracking-tight text-zinc-900 sm:text-5xl md:text-6xl lg:text-7xl"
            >
              <span className="block">{t.heroTitleTop}</span>
              <span className="mt-1 block bg-gradient-to-r from-zinc-950 via-zinc-800 to-zinc-500 bg-clip-text text-transparent">
                {t.heroTitleBottom}
              </span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-600 sm:text-xl"
            >
              {t.heroDescription}
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <a
                href="#projets"
                className="btn-shimmer rounded-full bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-400"
              >
                {t.heroPrimaryCta}
              </a>
              <a
                href="#contact"
                className="rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-medium text-zinc-800 transition hover:border-zinc-400 hover:bg-zinc-100"
              >
                {t.heroSecondaryCta}
              </a>
            </motion.div>
          </motion.div>

          <div className="mt-16 border-t border-zinc-200/90 pt-10">
            <div className="flex items-center justify-center sm:justify-start">
              {TRUSTED_COMPANIES.map((company, index) => (
                <div
                  key={company.name}
                  className={`relative transition-transform duration-200 hover:z-10 hover:-translate-y-0.5 ${
                    index === 0 ? "" : "-ml-0.5 sm:-ml-1"
                  }`}
                  title={company.name}
                  aria-label={company.name}
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-zinc-200 bg-white shadow-[0_1px_6px_rgba(15,23,42,0.12)] sm:h-10 sm:w-10">
                    {company.logo ? (
                      <img
                        src={company.logo}
                        alt={`${company.name} logo`}
                        className={`h-full w-full object-contain p-1 ${company.logoClassName ?? ""}`}
                        loading="lazy"
                      />
                    ) : (
                      <span className="inline-flex h-full w-full items-center justify-center bg-zinc-900 text-[10px] font-bold text-white sm:text-xs">
                        {company.monogram}
                      </span>
                    )}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-5 text-center text-xs font-medium uppercase tracking-widest text-zinc-600 sm:text-left">
              {t.trustedLabel}
            </p>
          </div>
        </section>

        {/* EXPERTISE */}
        <motion.section
          id="expertise"
          className="border-t border-zinc-200/90 bg-zinc-50/80 py-20 sm:py-24"
          variants={sectionReveal}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-400/80">
              {t.expertiseKicker}
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
              {t.expertiseTitle}
            </h2>
            <p className="mt-3 max-w-2xl text-zinc-600">
              {t.expertiseDescription}
            </p>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {expertiseItems.map((item) => (
                <ExpertiseCard
                  key={item.title}
                  title={item.title}
                  body={item.body}
                  bullets={item.bullets}
                  bulletTitle={t.expertiseBulletTitle}
                />
              ))}
            </div>
          </div>
        </motion.section>

        {/* TECH MARQUEE */}
        <section className="border-y border-zinc-200/90 bg-zinc-50 py-6">
          <p className="mb-3 text-center text-xs font-medium uppercase tracking-widest text-zinc-600">
            {t.techTitle}
          </p>
          <div className="marquee-fade relative overflow-hidden">
            <div className="flex w-max animate-marquee gap-5 pr-5 font-mono text-sm text-zinc-600">
              {[...TECH_ROW, ...TECH_ROW].map((tech, i) => (
                <span key={i} className="shrink-0 flex items-center gap-2">
                  <img src={tech.logo} alt={tech.name} className="h-4 w-4" />
                  {tech.name}
                  <span className="ml-10 text-zinc-400">·</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Side MARQUEE */}
        <section className="border-y border-zinc-200/90 bg-zinc-50 py-6">
          <p className="mb-3 text-center text-xs font-medium uppercase tracking-widest text-zinc-600">
            {t.sideTitle}
          </p>
          <div className="marquee-fade relative overflow-hidden">
            <div className="flex w-max animate-marquee gap-5 pr-5 font-mono text-sm text-zinc-600">
              {[...SIDE_ROW, ...SIDE_ROW].map((tech, i) => (
                <span key={i} className="shrink-0 flex items-center gap-2">
                  <img src={tech.logo} alt={tech.name} className="h-4 w-4" />
                  {tech.name}
                  <span className="ml-10 text-zinc-400">·</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* PARCOURS */}
        <motion.section
          id="parcours"
          className="py-20 sm:py-24"
          variants={sectionReveal}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-400/80">
              {t.journeyKicker}
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
              {t.journeyTitle}
            </h2>

            <div className="mt-12 space-y-6">
              {experienceItems.map((item) => (
                <ExperienceBlock
                  key={`${item.company}-${item.role}`}
                  period={item.period}
                  company={item.company}
                  role={item.role}
                  intro={item.intro}
                  bullets={item.bullets}
                />
              ))}
            </div>
          </div>
        </motion.section>

        {/* PROJETS */}
        <motion.section
          id="projets"
          className="border-t border-zinc-200/90 bg-zinc-50/60 py-20 sm:py-24"
          variants={sectionReveal}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-400/80">
              {t.projectsKicker}
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
              {t.projectsTitle}
            </h2>
            <p className="mt-3 max-w-2xl text-zinc-600">
              {t.projectsDescription}
            </p>

            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {projectItems.map((item) => (
                <ProjectCard
                  key={`${item.title}-${item.year}`}
                  year={item.year}
                  title={item.title}
                  description={item.description}
                  tags={item.tags}
                />
              ))}
            </div>
          </div>
        </motion.section>

        {/* CONTACT */}
        <motion.section
          id="contact"
          className="py-20 sm:py-24"
          variants={sectionReveal}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-gradient-to-br from-white to-zinc-50 p-8 sm:p-12 md:flex md:items-center md:justify-between md:gap-12">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-400/80">
                  {t.contactKicker}
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
                  {t.contactTitle}
                </h2>
                <p className="mt-3 max-w-xl text-zinc-600">
                  {t.contactDescription}
                </p>
              </div>
              <div className="mt-8 flex shrink-0 flex-col gap-3 md:mt-0 md:items-end">
                <a
                  href="mailto:your@email.com?subject=Prise%20de%20contact%20%28portfolio%29"
                  className="btn-shimmer inline-flex items-center justify-center rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-cyan-400"
                >
                  {t.contactMailCta}
                </a>
                <div className="flex flex-wrap gap-2 md:justify-end">
                  <a
                    href="https://github.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-zinc-300 px-4 py-2 text-xs font-medium text-zinc-700 transition hover:border-zinc-400 hover:bg-zinc-100 sm:text-sm"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://linkedin.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-zinc-300 px-4 py-2 text-xs font-medium text-zinc-700 transition hover:border-zinc-400 hover:bg-zinc-100 sm:text-sm"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <footer className="border-t border-zinc-200/90 py-8 text-center text-xs text-zinc-600">
          © {new Date().getFullYear()} Laurent Malmendier — {t.footer}
        </footer>
      </main>
    </div>
  );
}

function ExpertiseCard({
  title,
  body,
  bullets,
  bulletTitle,
}: {
  title: string;
  body: string;
  bullets: string[];
  bulletTitle: string;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      whileHover={{ y: -3, scale: 1.01 }}
      className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 transition hover:border-zinc-300 hover:bg-zinc-50"
    >
      <h3 className="text-lg font-semibold text-zinc-900">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-600">{body}</p>
      <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-zinc-600">
        {bulletTitle}
      </p>
      <ul className="mt-2 list-inside list-disc space-y-1.5 text-sm text-zinc-600 marker:text-cyan-700">
        {bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
    </motion.article>
  );
}

function ExperienceBlock({
  period,
  company,
  role,
  intro,
  bullets,
}: {
  period: string;
  company: string;
  role: string;
  intro: string;
  bullets: string[];
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      whileHover={{ y: -2 }}
      className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-xl font-semibold text-zinc-900">{company}</h3>
          <p className="text-cyan-400/90">{role}</p>
        </div>
        <span className="shrink-0 font-mono text-sm text-zinc-600">{period}</span>
      </div>
      <p className="mt-4 text-zinc-600">{intro}</p>
      <ul className="mt-4 space-y-2 border-t border-zinc-200/90 pt-4 text-sm text-zinc-700">
        {bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </motion.article>
  );
}

function ProjectCard({
  year,
  title,
  description,
  tags,
}: {
  year: string;
  title: string;
  description: string;
  tags: string[];
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.38, ease: "easeOut" }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="group flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 transition hover:border-cyan-300 hover:shadow-[0_10px_30px_rgba(8,145,178,0.12)]"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full border border-zinc-300 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-zinc-600">
          {year}
        </span>
      </div>
      <h3 className="mt-4 text-xl font-semibold text-zinc-900 transition group-hover:text-cyan-700">
        {title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600">
        {description}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((t) => (
          <span
            key={t}
            className="rounded-md border border-zinc-200 bg-zinc-50 px-2 py-1 text-xs text-zinc-600"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.article>
  );
}
