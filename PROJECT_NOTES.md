# Vukašin Riznić — Portfolio sajt — Beleške za nastavak rada

Ovaj fajl postoji da nova sesija (posle prebacivanja zbog tokena) razume šta je projekat, šta je urađeno i kako da nastavi. Piši/ažuriraj ovaj fajl kad god se nešto bitno promeni.

## O projektu

Lični portfolio sajt za **Vukašina Riznića**, web developera. Sajt će kasnije biti referenca sa vizit karte (`www.vukasinriznic.me`). Vlasnik ima i digital studio agenciju **VUAN / Afera Digital** (`www.aferadigital.rs`) — to je zaseban brend, ne meša se sa ovim portfoliom, ali se pojavljuje kao prvi social link.

**Glavna vizuelna referenca:** [dymasalfin.web.id](https://www.dymasalfin.web.id/) (UI/UX Designer portfolio). Struktura sekcija, layout i interakcije se ugledaju na taj sajt, ali sa **našim** brendom, bojama, fontovima i sadržajem — cilj je "inspirisano", ne 1:1 kopija. Korisnik VRLO ČESTO traži da se referentni sajt ponovo pogleda/izmeri pre nego što se nešto stilizuje po njemu — ne nagađaj vrednosti, izmeri ih (vidi tehniku ispod).

**Tehnika merenja reference:** referentni sajt je Vite/React SPA (ne Next.js) sa jednim JS bundle-om na `https://www.dymasalfin.web.id/assets/index-*.js`. Umesto da se DOM inspektuje element-po-element, često je BRŽE i PRECIZNIJE `fetch()`-ovati taj bundle direktno (`javascript_tool`) i `indexOf()`/`slice()` tražiti poznatu klasu ili tekst (npr. `"lg:w-[466px]"`, `"mix-blend-mode"`, `"difference"`) — minifikovan kod ali čitljiv, i otkriva TAČNE vrednosti (padding, transition, cubic-bezier krive, boje) direktno iz izvora, bez nagađanja iz computed stilova. Ovako su pronađeni: custom cursor (`mix-blend-mode:difference` + Framer spring), hover animacija strelice na project karticama (scale/opacity sa "bounce" cubic-bezier), i tačne dimenzije kartica (220/270/330px slika, padding vrednosti).

## Tech stack

- **Next.js** (App Router, Turbopack dev server) + **TypeScript** + **Tailwind CSS v4**
- **motion** (Framer Motion naslednik, `import { motion } from "motion/react"`) — animacije ulaska (fade+slide), accordion animacije u Services, i custom cursor (`useMotionValue`/`useSpring`)
- **gsap** + **@gsap/react** + **ScrollTrigger** — SAD SE AKTIVNO KORISTI (ranije "nije korišćeno", promenjeno ove sesije) — pokreće pin+scrub scroll animaciju u `About.tsx`. **VAŽNO:** `gsap.registerPlugin(useGSAP, ScrollTrigger)` — MORA da uključi i `useGSAP` u `registerPlugin`, ne samo `ScrollTrigger`, inače u Next.js/Turbopack okruženju može doći do desinhronizacije GSAP instance korišćene u hook-u vs. one koju ti importuješ (poznat izvor "animacija se uopšte ne pokreće" bagova).
- **lenis** — smooth scroll biblioteka, dodata ove sesije (`src/components/SmoothScroll.tsx`, montirana jednom u `layout.tsx`). Povezana sa GSAP ScrollTrigger preko `lenis.on("scroll", ScrollTrigger.update)` + `gsap.ticker.add(...)` (standardan, dokumentovan pattern). `lerp: 0.15` (podignuto sa default `0.1` na eksplicitan zahtev — korisnik je hteo BRŽI/manje "smoothovan" osećaj, ne sporiji — veći `lerp` = brže sustizanje cilja = manje laga).
- **lucide-react** v1.31 — ⚠️ **nema brend ikonice** (Github/Instagram/Linkedin su uklonjene iz paketa u ovoj verziji). Zato postoje custom SVG ikonice u `src/components/icons/social-icons.tsx`. `ArrowUpRight` iz lucide se i dalje koristi u par mesta koje NISU ekvivalent dugmićima (Work.tsx card preview overlay je bio, sad je i to `top-right.png`), ali **strelice u SVIM dugmićima (Header/Hero/CTA "Let's Talk"/"Let's collaborate"/"Start a Conversation") su `/top-right.png`, NE lucide** — korisnik je eksplicitno tražio ovo, probano je obrnuto (unifikacija na lucide `ArrowUpRight`) pa VRAĆENO na PNG jer mu se više dopada taj vizuelni stil (deblji stroke, bez paddinga).
- **Custom PNG ikonice** — `public/top-right.png` (crna strelica ↗, DEBEO stroke, BEZ paddinga u samoj slici — zauzima ceo 512×512 canvas) i `public/close.png` (crno X). Pošto PNG nema padding a lucide ima, ista nominalna veličina (npr. 18px) izgleda VIZUELNO KRUPNIJE kod PNG-a — zato su sve instance PNG strelice u dugmićima na kraju smanjene na **`width={12} height={12}`** (finalna vrednost, prošlo kroz 18→14→12px iteracije) da vizuelno odgovaraju prethodnoj lucide veličini. Na tamnoj pozadini: `className="invert"`.
- **SVG logo** (`src/components/Logo.tsx`) — logo VIŠE NIJE PNG. Ova sesija: originalni `public/images/Logo_black.png` (1024×1024, "V" sa circuit detaljima) je vektorizovan preko `potrace` npm paketa (privremeno instaliran, `npm install --no-save potrace`, pa uklonjen posle) — path podaci su ručno prekopirani u `Logo.tsx` kao `forwardRef<SVGSVGElement>` komponenta, `viewBox="234 254 553 517"` (isečen tačno na granice crteža, bez margine), `fill="currentColor"` (boja se kontroliše preko `text-*` klase na parent-u, npr. `text-white`). `public/images/Logo_black.png`/`Logo_white.png` VIŠE SE NE KORISTE u kodu (ostavljeni u `public/` kao asset, nisu obrisani).
- Fontovi: **Syne** (display/naslovi, `font-display`) + **Inter** (telo teksta, `font-sans`), učitani preko `next/font/google` u `src/app/layout.tsx`. Inter weights `["400","500","600"]`.

## Custom cursor (`src/components/Cursor.tsx`) — NOVO ove sesije

- Repliciran 1:1 sa dymasalfin.web.id (pronađen tačan izvorni kod u njihovom JS bundle-u, ne nagađan).
- 24×24px beli krug, `mix-blend-mode: difference` (invertuje boju ispod sebe — crno↔belo), `position: fixed`, `z-index: 99999`, `pointer-events: none`.
- Pozicija: `useMotionValue` + `useSpring({ stiffness: 400, damping: 28 })` iz `motion/react` — glatko prati kursor.
- Fade in/out (`opacity 0.2s`) na prvi `mousemove` / kad miš napusti `document`.
- **Isključen na touch uređajima** preko `window.matchMedia("(pointer: coarse)")` — VAŽNO: provera je u `useState(getIsTouch)` (lenji inicijalizator), NE `setState` unutar `useEffect`-a — eslint pravilo `react-hooks/set-state-in-effect` to zabranjuje (baca grešku pri lint-u ako se uradi pogrešno).
- **Globalno `* { cursor: none !important; }` u `globals.css`** — NUŽNO jer `cursor-pointer` Tailwind klasa na linkovima/dugmićima (eksplicitna vrednost na elementu) NADJAČAVA nasleđeni `cursor: none` sa `<body>`-ja, bez obzira na specifičnost. Bez ovog pravila, hover preko linkova/dugmadi bi vraćao sistemski pokazivač.

## Pokretanje dev servera

- Uvek koristi `mcp__Claude_Browser__preview_start` sa `name: "portfolio-dev"` (config u `.claude/launch.json`), **nikad Bash** za dev server.
- Port 3000 često drži server iz DRUGE (paralelne) chat sesije — `preview_start` u tom slučaju vraća grešku, ili automatski dodeli drugi port (proveri response, `port` polje). Ne pokušavaj da ubiješ tuđi proces.
- `preview_logs` je kumulativan bafer — stare greške ostaju vidljive zauvek. Ne veruj mu slepo, proveri stvarno stanje preko `javascript_tool`.

### ⚠️ NAJVAŽNIJI poznat problem (potvrđen VIŠE PUTA i ove sesije): `requestAnimationFrame` je zamrznut kad Browser pane nije prikazan

- Kad korisnikov Browser pane nije vidljiv/fokusiran na njegovoj strani, browser tretira taj tab kao "hidden" i **pauzira `requestAnimationFrame`** — standardno browser ponašanje za pozadinske tabove. Ovo pogađa SVE što se oslanja na rAF: **Framer Motion animacije, GSAP ticker (pa i ScrollTrigger scrub), i Lenis smooth scroll**.
- Simptom: `getComputedStyle()` na dinamički animiran element (opacity, transform/scale, boja) ostaje "zaglavljen" na početnoj vrednosti, ČAK I POSLE sekundi čekanja, ČAK I kad React/inline `style` atribut POKAZUJE ispravnu ciljnu vrednost (proveri `el.getAttribute('style')` — to JE ažurirano ispravno, samo se ne KOMPONUJE/render-uje vizuelno).
- Poklapa se sa `computer` alatom (`action: "screenshot"`) koji baca `"the Browser pane is not displayed, so the page is not compositing frames"`.
- **KAKO VERIFIKOVATI uprkos ovome:**
  1. **`element.getAttribute('style')` ili `.className` su UVEK pouzdani** — pokazuju šta je React/JS STVARNO postavio, čak i kad se to vizuelno ne renderuje. Ovo je dokaz da LOGIKA radi.
  2. **`getBoundingClientRect()` (layout/geometrija) JE pouzdan** za sinhrono komitovane DOM promene.
  3. Za GSAP ScrollTrigger konkretno: `ScrollTrigger.getAll()[0]` (posle privremenog `window.__ScrollTrigger = ScrollTrigger` exposure-a u kodu radi debug-a, OBAVEZNO ukloniti posle!) + ručni `ST.update()` poziv posle `window.scrollTo(...)` DAJE TAČAN, pouzdan rezultat (bypass-uje potrebu za pravim scroll event-om/rAF loop-om). Programski `window.scrollTo()` ili `dispatchEvent(new WheelEvent(...))` BEZ ručnog `ST.update()` NE ažurira pouzdano `ScrollTrigger` progress u ovoj test okolini (iako bi kod pravog korisnika sa mišem/trackpadom radilo normalno — to je razlika između "trusted" native scroll event-a i sintetičkog).
  4. Probano i Playwright (headless Chromium) kao alternativa — **headless (software render) je NEPOUZDAN za GPU-specifične bagove** (npr. clipping/tearing tokom CSS transform) jer nema pravi GPU; headed mod se NIJE mogao pokrenuti u ovoj sandboxed okolini (nema display sesije).
- **Ako korisnik kaže da nešto vizuelno ne radi kako treba, a sve tvoje provere pokazuju da JE ispravno — veruj korisniku, ne alatu.** Objasni transparentno da ne možeš vizuelno da potvrdiš.

### Tailwind v4 gotcha: `scale-*` klase koriste CSS `scale` svojstvo, NE `transform`

Otkriveno pri pravljenju hover animacije strelice na Work karticama: `transition-[transform_...]` ili arbitrary `[transition:...,transform_...]` NE animira `scale-50`/`scale-100` Tailwind klase, jer Tailwind v4 postavlja `scale: 0.5` kao SVOJU CSS `scale` property (native CSS, odvojeno od `transform`), ne kao `transform: scale()`. Transition MORA da cilja `scale`, ne `transform`, npr:
`[transition:opacity_0.28s_ease,scale_0.28s_cubic-bezier(0.34,1.56,0.64,1)]`.
Isto važi za `translate-*` (native CSS `translate` property) i `rotate-*`.

## Brend / identitet

- **Ime:** Vukašin Riznić, titula: Web Developer
- **Logo:** SAD SVG (`src/components/Logo.tsx`), vidi Tech stack sekciju gore.
- **Boje** (`src/app/globals.css`):
  - `--background: #fdfdfd`, `--foreground: #111111`, `--muted: #6b6b6b`, `--border: #e5e5e5`, `--ghost: #ececec`, `--surface: #f6f6f6`
  - `#efefef` — pozadinski tekst iza section heading-ova (hardkodovano u `SectionLabel.tsx`)
  - `#262626` — tamna pozadina (Services accordion otvoreno, About sekcija), hardkodovano, nije CSS varijabla
  - `#D3D3D3` — Services accordion opis paragraf (bilo `text-white/70`, promenjeno na eksplicitan zahtev)
  - `#525252` — CTA sekcija paragraf (bilo `text-muted`)
  - `#262626` — Work sekcija tag/bedž tekst (bilo `text-foreground` pa `text-muted`, finalno `#262626` sa `font-normal`)
- **Fontovi:** Syne za hero ime + section label pozadinski tekst; Inter (`font-sans`) svuda drugde uključujući section heading-ove i Services accordion naslove (namerno prebačeno sa Syne).
- **Font-weight na dugmićima:** SVI pravi dugmići (CTA "Start a Conversation", Hero "Let's collaborate", Header "Let's Talk" desktop+mobile, Work filter/social linkovi) su `font-normal` (400) — korisnik eksplicitno NIJE hteo bold/semi-bold tekst na dugmadima. Ovo NE važi za labele/tagove koji nisu klikabilni (ostavljeni kako jesu osim gde eksplicitno traženo).

## Struktura fajlova (`src/`)

```
app/
  layout.tsx       — root layout: fontovi, metadata, <SmoothScroll/> i <Cursor/> montirani ovde (jednom, globalno), body ima cursor-none
  page.tsx         — Header, Hero, Work, Services, About, CTA
  globals.css      — CSS varijable, cursor:none override, custom @keyframes (badge-dot-pulse)
components/
  Header.tsx       — nav bar
  Hero.tsx         — hero sekcija
  AvailabilityBadge.tsx — "Available for work" pill — backdrop-blur-sm + shadow-sm, custom badge-dot-pulse animacija (NE Tailwind animate-ping)
  ProfilePhoto.tsx
  SocialLinks.tsx  — VAŽNO: sad prima i `leading?: ReactNode` prop — kad je prosleđen, renderuje ga kao PRVU <li> u ISTOM <ul> (ne kao poseban sibling), sa `flex-col sm:flex-row sm:justify-between` da svi elementi (leading + social linkovi) budu ravnomerno raspoređeni kao JEDAN red. Koristi se u CTA.tsx da ime+avatar i social pilule budu 5 direktnih flex sibling-a.
  SectionLabel.tsx
  Services.tsx     — accordion, PRVA STAVKA SAD OTVORENA PO DEFAULT-U (`useState<number|null>(0)`, bilo `null`)
  Work.tsx         — VIDI detaljan opis niže, mnogo menjano ove sesije
  About.tsx        — VIDI detaljan opis niže, kompletno predizajnirano ove sesije (scroll-jack zoom+reveal animacija)
  Logo.tsx         — NOVO, SVG logo komponenta (forwardRef, fill=currentColor)
  SmoothScroll.tsx — NOVO, Lenis init + GSAP ScrollTrigger sync, montirana u layout.tsx
  Cursor.tsx       — NOVO, custom mix-blend-mode cursor, montirana u layout.tsx
  CTA.tsx          — VIDI detaljan opis niže, redizajnirano ove sesije
  icons/social-icons.tsx
lib/
  links.ts         — navLinks, socialLinks
  data.ts          — services[], projects[] — `projectFilters`/`ProjectFilter`/`category` polje OBRISANI ove sesije (kategorije uklonjene iz Work sekcije)
public/
  top-right.png, close.png
  cta-waves.svg    — NOVO, proceduralno generisan (sinusni talasi, 6 slojeva, 1920×900), pozadina CTA footer-a
  images/Logo_black.png, Logo_white.png (VIŠE SE NE KORISTE u kodu, samo asset), profile.png (koristi se u CTA name bedžu), vukasin_hero.png
```

## Redosled sekcija na stranici

`Header` (overlay) → `Hero` (`#home`) → `Work` (`#work`) → `Services` (`#services`) → `About` (`#about`) → `CTA` (`#contact`)

## About sekcija (`About.tsx`) — KOMPLETNO PREDIZAJNIRANO ove sesije, najkompleksniji deo

Korisnikov zahtev: kad sekcija uđe u viewport, "pinuje" se (ostaje na mestu) dok se logo zumira ka centru i fade-uje, a onda se otkriva veliki tekst — "portal zoom" scroll efekat.

**Trenutna implementacija** (posle DUGO iteracija i debug-ovanja — vidi upozorenje ispod):

```tsx
gsap.registerPlugin(useGSAP, ScrollTrigger);  // MORA useGSAP ovde, ne samo ScrollTrigger

useGSAP(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
    },
  })
    .to(logoRef.current, { scale: 16, opacity: 0, ease: "power1.in", duration: 1 })
    .fromTo(textRef.current, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, ease: "power2.out", duration: 0.6 }, 0.85)
    .to(words, { opacity: 1, stagger: 0.08, ease: "none", duration: 0.5 }, 1.5);  // word-by-word reveal
}, { scope: sectionRef });
```

- Sekcija: `h-[300vh]` (300vh scroll prostor), unutra `sticky top-0 h-screen overflow-hidden` panel (NE GSAP `pin:true` — probano, izazvalo je iste bagove, vraćeno na CSS sticky pristup).
- Logo: `<Logo overflow-visible ... />` — **`overflow-visible` je OBAVEZNO** na SVG-u (SVG root elementi imaju implicitan `overflow:hidden` po spec-u, klipuje sopstveni sadržaj na CSS box tokom transform-a).
- Paragraf tekst je razbijen na pojedinačne `<span>` reči (`paragraphWords` niz), svaka počinje na `opacity-20`, GSAP ih redom "pali" do `opacity-100` sa stagger-om — efekat: prvo se ceo blok fade/scale-uje, ZATIM se reči redom osvetljavaju kako se nastavlja skrolovanje (poslednjih ~45% ukupnog skrol opsega).
- Tekst: `font-sans`, `text-[24px] sm:text-[42px] lg:text-[60px]` (finalna veličina posle više iteracija — 54→60px), `text-left`, u ISTOM kontejneru (`var(--name-width)`) kao Services sekcija.

**⚠️ Istorija bagova (VAŽNO da se ne ponove):**
1. "Logo se seče/nestaje na tren pri startu uvećavanja" — pokušano: `will-change-transform` uklonjen, `overflow-visible` dodat na SVG (ovo je pravo rešenje — SVG implicitni clip), `force3D:true` dodat pa uklonjen. Analiza video snimka (frame-by-frame, `ffmpeg` privremeno instaliran preko `@ffmpeg-installer/ffmpeg` npm paketa pa uklonjen) je pokazala ČIST vodoravan rez — potpis CSS clip granice, ne GPU tearing. **`overflow-visible` na `<Logo>` je fix.**
2. "Animacija se uopšte ne aktivira" — desilo se POSLE pokušaja restrukturiranja sticky/overflow-hidden DOM hijerarhije (razdvajanje u dva ugnježdena diva) — TA restrukturacija je bila loša ideja, VRAĆENO na jednostavan jedan-div sticky pristup.
3. "Animacija se triggeruje ali ništa se ne dešava" — uzrok: `gsap.registerPlugin(ScrollTrigger)` BEZ `useGSAP` u istom pozivu — u Next.js/Turbopack okruženju dovodi do desinhronizacije GSAP instanci. Fix: `gsap.registerPlugin(useGSAP, ScrollTrigger)`. Takođe pojednostavljen `gsap.matchMedia()` wrapper na običan `if (matches) return;` (manje "magije", manje mesta za skriveni bag).
4. Kad je korisnik rekao "ne vidim promenu" ili "ne radi" — VIŠE PUTA se ispostavilo da je GSAP/React logika BILA ispravna (potvrđeno preko `ScrollTrigger.getAll()[0]` + ručni `.update()`), a problem je bio isključivo rAF throttling u test okolini (vidi glavno upozorenje gore). Nauči lekciju: ne menjaj kod naslepo na osnovu "ne radi" bez prvo POUZDANO verifikovati (inline style/className, ne getComputedStyle).

## Work sekcija (`Work.tsx`) — MNOGO MENJANA ove sesije

- **Kategorije POTPUNO UKLONJENE** — filter dugmad (All/Web Design/Development) i category-bedž na kartici su OBRISANI (korisnik: "ne želimo kategorije"). `projectFilters`, `ProjectFilter` tip i `category` polje obrisani iz `lib/data.ts`. Komponenta je opet Server Component (nema više `useState`, `"use client"` uklonjen).
- Kontejner: `max-w-[1044px]` (finalna vrednost, prošlo kroz max-w-6xl → max-w-5xl → +20px).
- **Svaki projekat je bela kartica**: `bg-white p-[2px]` (razmak slika↔ivica kartice, bilo 12px), OŠTRE IVICE (border-radius: 0 na kartici I slici, `rounded-2xl`/`rounded-xl` uklonjeni na eksplicitan zahtev, referenca ima zaobljene ivice ali korisnik HOĆE oštre kod nas).
- Slika: `h-[220px] sm:h-[270px] lg:h-[330px]` — TAČNE vrednosti izmerene sa dymasalfin.web.id (fetch bundle, vidi tehniku merenja gore).
- Tekst blok ispod slike: `px-[14px] pt-[20px] pb-[24px] lg:px-[16px] lg:pt-[24px] lg:pb-[24px]` (padding fino podešavan nekoliko puta na zahtev — POVEĆAN pa SMANJEN nazad na 24px kad je korisnik rekao da je 40px previše).
- Naslov: `text-[24px] font-medium` (fiksno, bez responsive varijanti).
- Gap naslov↔tagovi: `gap-2` (8px).
- Tag/bedž pilule: `px-5 py-2 text-sm sm:text-base`, boja **`text-[#262626]`**, **`font-normal`** (prošlo kroz `text-foreground`→`text-muted`→`#262626`, weight `font-medium`→`font-normal` — korisnik: boja treba da bude ista "kao paragraf", weight smanjen jer Manrope "medium" sa reference vizuelno izgleda tanje od Inter "medium" iste nominalne vrednosti).
- **Hover animacija strelice na slici** — repliciran TAČAN kod sa reference (pronađen u JS bundle-u): beli krug `scale(0.5)→scale(1)`, `opacity:0→1`, transition `opacity 0.28s ease, scale 0.28s cubic-bezier(0.34,1.56,0.64,1)` ("bounce"/overshoot krivа), + tamni overlay preko slike `opacity:0→20%`. Ikonica unutra je **`/top-right.png`** (ne lucide `ArrowUpRight`, korisnik eksplicitno tražio "istu strelicu kao u dugmićima"). ⚠️ Prvi pokušaj je koristio `transition-[transform_...]` što NIJE animiralo `scale-*` klase — vidi Tailwind v4 gotcha gore.

## Services sekcija (`Services.tsx`) — accordion, nije menjano ove sesije osim default open state

- **Prva stavka (`openIndex = 0` na inicijalizaciji, bilo `null`)** — otvorena čim se sajt učita.
- Opis paragraf boja: `text-[#D3D3D3]` (bilo `text-white/70`).
- Za detaljnu istoriju accordion "zavesa" (curtain) pattern-a, sinhronizacije animacija (`ACCORDION_TRANSITION`/`ACCORDION_EASE_CSS` konstante), i poznatih bagova sa pozicijom naslova/slike — pogledaj git istoriju ili pitaj korisnika, ti detalji nisu menjani ove sesije pa nisu ponovo dokumentovani ovde (bili su u ranijoj verziji ovog fajla, i dalje važe ako se taj kod ne dira).

## CTA sekcija (`CTA.tsx`) — REDIZAJNIRANO ove sesije

- Heading "Have a project in mind?": `font-sans` (Inter, bilo Syne), `whitespace-nowrap`, `text-[28px] sm:text-[42px] lg:text-[64px]` (jedan red, prošlo kroz 54→60→64px).
- Heading+paragraf wrap-ovani u ZASEBAN `<div className="flex flex-col items-center gap-1">` (gap 4px) — odvojeno od badge/dugme razmaka (koji koristi `gap-6` na spoljnom kontejneru).
- Paragraf: `text-[20px] text-[#525252]` (bilo `text-muted`/text-base).
- Dekorativna crna tačka između paragrafa i dugmeta — DODATA pa UKLONJENA (korisnik nije hteo).
- Dugme "Start a Conversation": `font-normal`, strelica `/top-right.png` 12px.
- **Footer red kompletno restrukturiran**: border-top linija UKLONJENA. Ime "Vukašin Riznić" više NIJE običan tekst — sad je crn pill bedž sa `profile.png` avatarom (28px krug), koristi novi `leading` prop na `SocialLinks` (vidi gornji opis komponente) da bude 5. direktni flex sibling zajedno sa 4 social linka, svih 5 ravnomerno raspoređenih (`sm:justify-between`) u ISTOM `<ul>` — NE grupisano odvojeno (probano `justify-around` sa 2 grupe, korisnik pokazao referentni screenshot da pokaže da treba `justify-between` sa svih 5 kao pojedinačni elementi).
- Social link tekst: `font-normal` (bilo `font-medium`), `text-base` (16px, bilo `text-sm`/14px) — ovo utiče i na Hero.tsx vertikalni social bar jer dele istu komponentu.
- **Pozadina**: probana CSS `radial-gradient` "cloud" tekstura (više iteracija, kontrast prilagođavan preko lokalnog SVG rendera sa `sharp` PRE ubacivanja u kod) — korisnik NIJE voleo, VRAĆENO na čist `bg-surface`. Zatim korisnik sam generisao apstraktnu wave SVG ilustraciju preko [Haikei](https://app.haikei.app/) (predložio sam Haikei/unDraw/Storyset/Blush kao izvore besplatnih ilustracija, dao konkretne hex vrednosti za boje da odgovaraju `#F6F6F6` paleti) i sačuvao kao `public/cta-waves.svg` — OVO JE ZADRŽANO i naknadno REDIZAJNIRANO (proceduralno generisan noviji SVG, 6 slojeva sinusnih talasa, 1920×900 aspect ratio umesto originalnih 900×600, da bolje pokrije `object-cover` na visokoj/širokoj sekciji). Renderovan kao `<Image fill className="object-cover" />`, prvi element u sekciji, `aria-hidden`, sadržaj ima `relative` da ostane iznad.

## Header (`Header.tsx`)

- Desktop nav linkovi: `text-[16px]` (bilo `text-sm`/14px) + `hover:[text-shadow:0_2px_6px_rgba(0,0,0,0.35)]` (crna senka na hover, dodato ove sesije).
- "Let's Talk" dugme (desktop+mobile): strelica `/top-right.png` 12px, `font-normal`.

## AvailabilityBadge (`AvailabilityBadge.tsx`)

- `backdrop-blur-sm` + `shadow-sm` dodati na pill (frosted-glass efekat).
- Zelena tačkica: custom `badge-dot-pulse` CSS `@keyframes` (definisano u `globals.css`) umesto Tailwind default `animate-ping` — meko "disanje" (`scale(1)→scale(1.2)`) + pulsirajući `box-shadow` sjaj u boji tačkice, `cubic-bezier(0.45,0,0.55,1)`, 2.4s ciklus. Markup pojednostavljen na JEDAN `<span>` (bilo dva ugnježdena — prsten + tačka).

## Šta NIJE urađeno / sledeći koraci

1. **Prava slika u Services accordion-u** — i dalje "Preview" placeholder box.
2. **Prave slike projekata** (Work) — i dalje gradient+inicijali placeholder.
3. Socials link URL-ovi (`lib/links.ts`): Afera, Instagram, LinkedIn, GitHub — proveri da li i dalje važe.
4. Mobile menu nav linkovi u Header-u NISU dobili 16px/hover-shadow tretman (samo desktop nav je eksplicitno tražen).

## Sesija (2026-08-14, nastavak) — Work spacing + mobile responsivnost

### Work sekcija — sitno fino podešavanje
- Razmak naslov↔tagovi: `gap-2` → `gap-4` (16px).
- Slika: `220/270/330px` → `200/250/300px` (smanjena za mobile/sm/lg).
- Donji tekst blok padding: `pt-[20px] pb-[24px] lg:pt-[24px] lg:pb-[24px]` → `pt-[28px] pb-[32px] lg:pt-[32px] lg:pb-[36px]` (povećan na eksplicitan zahtev — "poveaj height donjeg dela, sliku smanji").

### `.claude/launch.json` — dodato `"autoPort": true`
Port 3000 je više puta bio zauzet (druga sesija ili zaostali proces). Dodato `autoPort: true` da `preview_start` automatski dodeli slobodan port umesto grešaka. Ostaje da radi i kad je 3000 slobodan.

### MOBILE RESPONSIVE PASS — otkriveno i ispravljeno više realnih bagova (ne test-okolina artefakti)

Korisnikov zahtev: sredi mobile prikaz da bude na nivou reference (dymasalfin.web.id), About/Services adaptirani na naš sadržaj. Metodologija: `getBoundingClientRect()`/`scrollWidth` vs `clientWidth` provera na 320px/375px umesto oslanjanja na screenshot (Browser pane je često bio nedostupan ovaj put — vidi ispod).

**Nađeni pravi bagovi (potvrđeno merenjem, ne pretpostavka):**

1. **Hero.tsx — horizontalni overflow na mobile.** `ProfilePhoto` kontejner je imao FIKSNU širinu `w-[32rem]` (512px) bez mobile varijante — na 375px ekranu je gurao stranicu u horizontalni skrol (~137px overflow, potvrđeno `scrollWidth` 444 vs `clientWidth` 375). Fix: `w-[19rem]` mobile baza (304px), pa `sm:w-[32rem] md:w-[40rem] lg:w-[47rem]` (svaki breakpoint pomeren za jedan korak naviše da napravi mesta mobile vrednosti).
2. **Hero.tsx — CEO donji blok (podnaslov "Web developer", opis, CTA dugme, social linkovi) je bio `hidden md:flex`** — na mobile se NIJE PRIKAZIVAO UOPŠTE, samo ime+slika. Fix: uklonjeno `hidden`, blok je sad uvek `flex`; na mobile je u normalnom flow-u (centriran, `text-center`), na `md:` prelazi u apsolutno pozicioniran overlay u donjem desnom/levom uglu (originalni desktop dizajn). Sekcija promenjena sa `h-screen` (uvek) na `md:h-screen` (mobile je sad `min-height` po sadržaju, ne fiksna 100vh, jer sadržaj sad ide u flow ispod slike).
3. **Hero.tsx — ime "Vukašin Riznić" preliva se van ekrana na uskim telefonima (320-360px).** Font `clamp(2.5rem,7vw,6rem)` ima minimum 40px koji je preširok za samu reč "VUKAŠIN" (7 slova, uppercase, `tracking-[0.11em]`) na 320px ekranu — merenjem potvrđeno da SAMA reč iznosi 334px (dostupno ~272px posle padding-a). Fix: clamp minimum spušten na `2rem` (32px) + `tracking-[0.11em]` na mobile smanjen na `tracking-[0.02em]` (pun `0.11em` tracking vraćen tek na `sm:`).
4. **Hero.tsx — negativni margin overlap slike preko imena** (`-mt-[63px]`, kalibrisan za desktop veličinu fonta) na mobile veličini fonta gotovo POTPUNO PREKRIVA drugi red imena (~74% teksta sakriveno). Fix: mobile-specifična `-mt-[10px]` (samo ~26% reda prekriveno, čitljivo), `sm:-mt-[63px]` i naviše nepromenjeno.
5. **Services.tsx — accordion opis paragraf `w-1/2` BEZ mobile varijante** — na mobile je tekstualna kolona bila upola preuska (rezervisano mesto za "Preview" box koji na mobile uopšte nije vidljiv, `md:flex`), zbog čega se SVAKA REČ prelamala u zaseban red (kontejner ~82px širok). Fix: `w-full` mobile/sm baza, `md:w-1/2` tek od desktop (gde Preview box postoji), font `text-base sm:text-xl` (bio fiksno `text-xl`).
6. **CTA.tsx — heading "Have a project in mind?" imao `whitespace-nowrap` bez mobile izuzetka** — na ≤360px ekranima tekst je bio doslovno "zalepljen" za ivice viewporta (0.8px margine na 360px), garantovano bi pravio horizontalni overflow na bilo čemu užem (320px iPhone SE potvrđeno merenjem). Fix: `whitespace-nowrap` premešten na `sm:whitespace-nowrap` (mobile sad sme da prelomi u 2 reda), font baza spuštena `28px→26px`.

**Provereno i POTVRĐENO ispravno (nije trebalo menjati):**
- Work kartice — već responsive (`sm:grid-cols-2`, fiksni image height po breakpointu), nema overflow na 320-375px.
- Header mobile hamburger meni — radi ispravno, nema overflow otvorenog dropdown-a.
- About sekcija (GSAP scroll-jack) — tekst/logo veličine već imaju mobile varijante (`text-[20px]`, `h-48 w-48` logo), nema horizontalnog overflow-a ni na 320px. Korisnik je i sam rekao da ova sekcija "nije teška za mobile" — potvrđeno, nije zahtevala strukturne izmene.

**Metodološka napomena za sledeću sesiju:** `computer` (screenshot) je VEĆINU ove sesije vraćao `"the Browser pane is not displayed"` grešku (vidi postojeće upozorenje o rAF gore — isti uzrok). Svi nalazi gore su potvrđeni isključivo preko `document.documentElement.scrollWidth` vs `clientWidth` (horizontalni overflow) i `getBoundingClientRect()` na pojedinačnim elementima — POUZDANO i bez potrebe za vizuelnim renderom. Za brzo skeniranje cele stranice na overflow, korisan pattern:
```js
document.querySelectorAll('body *').forEach(el => {
  const r = el.getBoundingClientRect();
  if (r.right > window.innerWidth + 5 || r.left < -5) { /* log offender */ }
});
```
Takođe: `preview_start`/`preview_list` je ovu sesiju bio nekonzistentan (vraćao je različit port pri svakom pozivu, stari `serverId` odmah "not found", nekoliko pokušaja nije uspelo da veže port uopšte) — na kraju je server ipak radio na standardnom `localhost:3000` uprkos tome što je `preview_start` prijavljivao druge portove. Ako se ovo ponovi, probaj direktno `http://localhost:3000` bez obzira šta alat vrati.

## Sesija (2026-08-15) — Hero.tsx dobio posebnu mobile verziju (sekcija-po-sekciju mobile rad)

Korisnik je pokazao screenshot mobile hero-a sa dymasalfin.web.id i tražio da naš Hero prati TAČNO taj redosled: slika (sa 2 social dugmeta levo i 2 desno, floating preko slike) → ime centrirano → podnaslov "Web developer" → paragraf → CTA dugme "Let's collaborate". Prethodni mobile fix (prošla sesija) je samo re-flow-ovao POSTOJEĆI desktop layout (ime+overlap-slika na vrhu, dugme/opis ispod) — ovo je bilo nedovoljno, korisnik je hteo suštinski DRUGAČIJI mobile layout.

**Rešenje: `Hero.tsx` sad ima DVA POTPUNO ODVOJENA DOM stabla** (ne samo responsive klase na istom markup-u):
- `<div className="... md:hidden">` — mobile: `ProfilePhoto` full-bleed (`h-[52dvh] w-full`), sa 4 `socialLinks` iz `lib/links.ts` renderovana kao floating pill dugmići (`absolute`, `bg-white/80 backdrop-blur-md`) pozicionirana preko slike na TAČNIM procentima izmerenim iz dymasalfin.web.id JS bundle-a (fetch-ovanog ranije ove sesije): `left-4 top-[18%]` / `left-2 top-[54%]` / `right-4 top-[26%]` / `right-2 top-[58%]`. Ispod slike: ime (dva `<span>` u `flex-col`, ISTI outline-stroke brend stil kao desktop — "Vukašin" belo sa crnom konturom, "Riznić" puno crno — SAMO layout je promenjen iz overlap-a u obično stacking), pa `h2` "Web developer", pa `p` opis, pa CTA dugme. Font imena: `clamp(2.25rem,11vw,3.5rem)` — testirano i POTVRĐENO da ne pravi overflow ni na 320px (iPhone SE širina).
- `<div className="hidden md:flex ...">` — desktop: originalni overlap dizajn (ime iznad, slika sa negativnim margin-om ispod/preko), vraćen na PRVOBITNU verziju od pre prošle mobile-fix sesije (ukinut mobile-flow kompromis koji više nije potreban jer mobile sad ima svoj potpuno odvojen markup).

**⚠️ KRITIČNA zamka na koju paziti ako se ovo opet menja — `--name-width` CSS varijabla:**
`nameRef` (ResizeObserver koji postavlja `document.documentElement.style.setProperty("--name-width", ...)`, korišćen kao `maxWidth` u Header/Work/Services/About/CTA) MORA biti zakačen na DESKTOP-ov ime `<span>` (onaj koji nosi tačnu, brend-relevantnu širinu imena), NE na mobile verziju. Razlog: koji god element ima `ref={nameRef}` dok je SAKRIVEN (`display:none` preko Tailwind `hidden`/`md:hidden`), `getBoundingClientRect()` vraća `width:0` — BEZ guard-a (`if (width > 0) setProperty(...)`) to bi postavilo `--name-width: 0px` i SRUŠILO layout svuda (sve sekcije koje koriste taj var kao `max-width` bi kolabovale na 0). Prvi pokušaj ove sesije je slučajno stavio `ref` na MOBILE span i OSTAVIO desktop span bez ref-a — desktop je "radio" jer je guard sprečio 0px, ali `--name-width` se NIKAD nije postavljao na desktop-u (ostajao prazan string → fallback `80rem`), tiho pogrešno. Ispravljeno: `ref={nameRef}` NAZAD na desktop wrapping `<span>` (linija sa `inline-flex flex-wrap items-baseline gap-x-6 ...`), mobile span nema ref. Guard (`if (width > 0)`) OSTAJE u `useLayoutEffect`-u kao bezbednosna mreža za oba slučaja.

### Cursor.tsx — pravi hydration mismatch bag, NAĐEN i ISPRAVLJEN (nezavisan od Hero izmena)

Dok se testiralo na mobile/touch emulaciji, Next.js dev overlay je prijavio "1 Issue" — `Uncaught Error: Hydration failed`. Uzrok: `const [isTouch] = useState(getIsTouch)` — `getIsTouch()` poziva `window.matchMedia("(pointer: coarse)")` DIREKTNO u lenjom inicijalizatoru. Na serveru (`typeof window === "undefined"`) uvek vraća `false` → server renderuje cursor `<div>`. Na klijentu, ako je pravi uređaj touch (`pointer:coarse`), inicijalizator ODMAH (pre prvog render-a/hidratacije) vraća `true` → cursor div se NE renderuje. Server i klijent HTML se ne poklapaju na prvom prolazu = hydration error, React baca celo SSR stablo i re-renderuje ceo klijent od nule (loš za performanse, i vidljiva greška u dev modu).

**Fix:** `useState(false)` (uvek isti default kao server) + `useEffect(() => setIsTouch(getIsTouch()), [])` da se prava vrednost postavi TEK POSLE mount-a (van hidratacionog prolaza, React to dozvoljava bez upozorenja). Cursor će se na touch uređaju pojaviti na tren pa nestati (1 frame) — prihvatljiv trade-off, standardan pattern za ovu klasu bagova.

**Napomena za sledeći put:** `read_console_messages` bafer u Browser pane-u je NEPOUZDANO "lepljiv" — posle fix-a i reload-a ISTOG taba, stara greška se i dalje prijavljivala (izgledalo je da fix ne radi). Tek u POTPUNO NOVOM tabu (`tabs_create` + `navigate`) se videlo da grešaka više nema. Ako se posle fix-a i dalje prijavljuje ista greška u konzoli, prvo probaj svež tab pre nego što posumnjaš da fix nije upalio.

## Sesija (2026-08-15, nastavak) — Hero mobile finalizacija + Header/nav kompletan redizajn

Nastavak prethodne Hero mobile sesije, sekcija-po-sekciju fino podešavanje na eksplicitan zahtev korisnika ("mobile je gotovo").

### Hero.tsx — mobile foto tretman (VIŠE ITERACIJA, važno razumeti zašto)
- Slika kontejner: `h-[52dvh] w-full overflow-hidden` (NE `aspect-[5/3]` — taj pristup je probican pa ODBAČEN jer korisnik je hteo TAČNU repliku referentnog sajta koji koristi `height:52dvh` + gradient-fade, ne aspect-ratio crop).
- **Beli gradient overlay preko slike** (repliciran iz dymasalfin.web.id bundle-a, `linear-gradient` sa `color-mix(in srgb, var(--background) X%, transparent)` stop-ovima) — stapa fotografiju sa pozadinom na vrhu i dnu umesto tvrde ivice. Finalne vrednosti stop-ova (posle fine-tune-a): `var(--background) 0%, ...90% 4%, ...40% 10%, transparent 18%, transparent 50%, ...45% 66%, ...90% 84%, var(--background) 100%` — GORNJI deo prelaza namerno STEGNUT (0-18% umesto originalnih 0-28%) jer je korisnik primetio da kosa/vrh glave prebrzo nestaje u belo.
- ⚠️ **Pogrešan pokušaj koji NIJE upalio (ne ponavljati):** pomeranje slike NAVIŠE (wrapper `-top-12 h-[calc(100%+3rem)]`) da bi se "otkrilo više kose" — matematički izgleda ispravno (croppuje vrh source slike), ALI u praksi je odseklo DEO STVARNE KOSE (slika nema mnogo praznog prostora iznad glave) i pogoršalo problem. Korisnik je eksplicitno ispravio: **"trebalo je da je pomeriš dole, ne gore"**. Ispravno rešenje je bilo: (1) vratiti sliku na plain `<ProfilePhoto>` bez wrapper pomeraja, (2) stegnuti gradient da brže postane proziran pri vrhu (vidi gore), (3) tek onda mala `translate-y-3` (12px NADOLE, ne wrapper-trik) za fино poravnanje. **Lekcija: kad korisnik kaže "pomeri dole" a ti si pomerio gore misleći da je ekvivalentno — NIJE, proveri sa njim smer pre nego što pretpostaviš da je matematika intuitivna.**
- Ime "Vukašin Riznić" — OSTAJE ispod slike (već uspostavljeno prošle sesije, korisnik je samo tražio potvrdu/reformulaciju zahteva).
- Razmaci između ime/podnaslov/paragraf/dugme: kontejner `gap-6` (24px) baza, ali korisnik je SAM (preko hook/linter editing, vidi system-reminder poruke) doterao pojedinačne elemente sa `-mt-*` overRide (npr. `-mt-7`/`-mt-10` na h2, `-mt-3`/`-mt-5` na p) — OVO SU NAMERNE korisnikove izmene, ne diraj ih nazad na uniform gap bez pitanja.
- Dugme "Let's collaborate" (mobile): promenjeno iz `inline-flex` (shrink-to-fit) u `flex w-full max-w-[280px] justify-center`, `py-[14px]`, dodat `shadow-[0_4px_5px_rgba(0,0,0,0.2)]` — replika reference dugmeta (široko, ne kompaktno).
- Floating social dugmići i "chest-up" foto framing i dalje važe kako je opisano u prethodnoj sekciji ("Hero.tsx dobio posebnu mobile verziju").

### Header.tsx — kompletno redizajniran (mobile top bar + dropdown meni)
- **`position: fixed`** na mobile (bilo `absolute`) — nav sad ostaje vidljiv tokom celog skrolovanja kroz sajt, sa `bg-background` (čvrsta pozadina, ne providna). Desktop OSTAJE `sm:absolute sm:bg-transparent` (overlay preko Hero-a, nepromenjeno, namerno).
- Visina fiksirana na `h-16` (64px) na mobile (`sm:h-auto` vraća desktop na padding-based visinu). Hero mobile sekcija dobila `pt-16` da sadržaj ne ide ispod fiksnog nav-a.
- Layout: `flex justify-between` na mobile (bilo CSS grid) sa `px-5` (20px, isti kontejner konvencija kao ostatak mobile sajta), `md:grid md:grid-cols-[auto_1fr_auto]` za desktop (nepromenjeno).
- **AvailabilityBadge** — VIŠE PUTA menjano ovo veče: prvo custom kompaktna mobile-only verzija (kvadratić + "Available" tekst, bez pulsa) → korisnik je na kraju tražio da mobile bude **IDENTIČNO desktop-u** (ista `<AvailabilityBadge/>` komponenta svuda, ista `badge-dot-pulse` animacija, isti okrugli — NE kvadratni — indikator). `AvailabilityBadge.tsx` sad ima tekst samo **"Available"** (bilo "Available for work" — PAŽNJA: ovo je DELJENA komponenta, koristi je i CTA.tsx sekcija na dnu sajta, pa se skraćeni tekst odrazio i tamo). Finalni padding/font na zahtev: `text-[13px] px-[10px] py-[6px]` (bilo `text-sm px-5 py-2.5`).
- **Hamburger ikonica** — zamenjena sa lucide `Menu`/`X` (instant swap) na CUSTOM 3-bar SVG-manje strukturu (`motion.span` × 3, `framer-motion` `animate` prop) koja se glatko morphuje u X: gornja i donja linija rotiraju ±45° i translatuju 7px ka centru (gap-[5px] + 2px visina bara = 7px matematika da se linije poklope u tačan X), srednja linija fade+shrink na `opacity:0 width:0`.
- **Dropdown meni** — redizajniran da liči na dymasalfin.web.id mobile meni TAČNO (izmeren iz njihovog bundle-a ranije ove sesije): svaki link ima `text-[18px] font-medium` + opciono brojčani indikator `[N]` (`text-[12px] font-semibold text-[#a2a2a2]`) — brojevi dolaze IZ STVARNIH PODATAKA (`projects.length`, `services.length` iz `lib/data.ts`), NE hardkodovano. "About" i "Contact" nemaju brojčani indikator (nemaju smisla kao "liste"). UKLONJEN je prethodni "Let's Talk" CTA dugme unutar dropdown-a i duplirani AvailabilityBadge (reference ih nema, korisnik potvrdio da prati referencu tačno). Linkovi razdvojeni `border-b border-border` (svetlo siva, `#e5e5e5` — NAMERNO vraćeno sa `#525252` posle probe, korisnik je hteo istu boju kao linije između linkova, ne tamniju). Dodat isti `border-b border-border` na DNU celog menija.
- **"Curtain" animacija otvaranja** — `{open && <div>}` (instant mount/unmount) zamenjeno sa `AnimatePresence` + `motion.div` (`initial/animate/exit` na `height: 0 → "auto"` + `opacity`, `duration:0.4 ease:[0.22,1,0.36,1]`) — isti pattern koji već postoji u `Services.tsx` accordion-u (dokazano pouzdan). Padding je na UNUTRAŠNJEM div-u, `overflow-hidden` na SPOLJAŠNJEM (motion) div-u — inače height:"auto" animacija ne kliruje ispravno.
- ⚠️ **Otkriveno ovde: Framer Motion `animate` na `opacity`/`rotate`/`width`/`height` RADI ispravno u ovoj test-okolini uprkos poznatom rAF-zamrznut problemu** (potvrđeno: dropdown se ispravno MOUNT-uje i UNMOUNT-uje posle exit animacije, screenshot je pokazao ispravan hamburger→X). Ovo je RAZLIČITO od GSAP+ScrollTrigger+Lenis slučaja (koji JESTE bio zaglavljen) — verovatno zato što motion/react koristi Web Animations API (kompozitorska nit) za jednostavne transform/opacity animacije, koji nije podložan istom throttling-u kao `gsap.ticker`/`requestAnimationFrame` pozivi na glavnoj niti. **Za buduće debug-ovanje: probaj prvo Framer Motion animacije direktno (screenshot posle kratkog `wait`), GSAP scrub animacije zahtevaju `tl.progress()` trik iz ranije sekcije.**

## Sesija (2026-08-16) — Deploy, SEO/prevod na srpski, telefon+QR, `/projekti` stranica, container-width saga

Vrlo duga sesija, više odvojenih tema. Redosled ispod prati hronologiju.

### Git + Vercel deploy — sajt je SAD LIVE
- Repo inicijalizovan ovde (projekat RANIJE nije bio pod git kontrolom), povezan na `https://github.com/vukasinriznic/portfolio-bussiness`, branch `main`. Push radi normalno (`git push origin main`), GitHub Credential Manager na Windows-u je već autentifikovan (nije trebalo ručno podešavanje).
- Vercel projekat je povezan preko GitHub integracije — svaki push na `main` automatski triggeruje novi deploy.
- ⚠️ **NAUČENA LEKCIJA (skupa):** prvi push je SRUŠIO Vercel build sa TS greškom (`ease: number[]` nije `Easing` tip koji Framer Motion očekuje) u `Hero.tsx` `item`/`itemText` varijantama — greška se NIJE videla lokalno jer `next dev` ne radi pun type-check, samo `next build` (koji Vercel pokreće) to radi. Fix: `as const` na te objekte (isti pattern kao već postojeći `ACCORDION_TRANSITION` u `Services.tsx`). **Od tog trenutka: `npm run build` se pokreće LOKALNO pre SVAKOG push-a, bez izuzetka** — jeftinije je uhvatiti grešku ovde nego čekati Vercel da padne.
- `.gitignore` je već bio ispravan (node_modules, .next, .env* itd. isključeni) — nije trebalo dirati.

### Favicon — crni logo na beloj pozadini sa zaobljenim uglovima
- `src/app/icon.png` (512×512), `apple-icon.png` (180×180, OSTAO kvadratan namerno — iOS sam maskira ikonice svojim zaobljenjem, dupliranje efekta bi izgledalo čudno), `favicon.ico` (48×48, u stvari PNG bajtovi samo sa `.ico` ekstenzijom — moderni browseri to prihvataju bez problema, sniffuju sadržaj a ne ekstenziju).
- Generisano lokalno preko `sharp` (kompozicija: `public/images/Logo_black.png` preko belog `rounded-rect` SVG pozadine, `qrcode` paket privremeno instaliran/deinstaliran za QR generaciju — vidi ispod). NIJE ostalo kao zavisnost u `package.json`.
- Padding oko loga na kraju smanjen na ~6% (od originalnih ~16-18%) — "uveličaj da se uklapa u standard" zahtev, favicon treba da čita čitljivo i na 16×16px.
- Border-radius NIJE CSS — mora biti "upečen" u alfa kanal same PNG slike (browser chrome samo prikazuje sliku kakva jeste, ne primenjuje svoj radius). Proveravano preko `sharp` raw pixel alpha čitanja na uglovima (0 = providno, potvrđeno), NE vizuelno (preview u chatu je na beloj pozadini pa se providno stapa sa belim i "ne vidi se" razlika — to je artefakt prikaza, ne bag).

### SEO + prevod na srpski — RAĐENO SEKCIJA PO SEKCIJU, uz odobrenje pre ubacivanja
Korisnikov METODOLOŠKI zahtev koji VAŽI ZA SVAKI NAREDNI SLIČAN ZADATAK: **prvo pošalji predlog teksta/izmene, sačekaj "ubaci"/"može" pre nego što diraš kod.** Ovo je ponovljeno više puta ovu sesiju kao eksplicitan workflow.
- `layout.tsx`: `lang="sr"` (bilo `en`), `metadata` prošмного prošireno — `metadataBase`, Open Graph (`og:title/description/url/image/locale=sr_RS/type`), Twitter card (`summary_large_image`), JSON-LD `Person` schema (`@type:Person`, `sameAs` sa svim social linkovima) ubačen kao `<script type="application/ld+json">` u `<body>`. OG slika: `/images/vukasin_hero.png` (kvadratna, 1254×1254 — nije posebno kreirana 1200×630 verzija, radi ali nije idealna proporcija za sve platforme ako se ikad bude doterivalo).
- **Hero**: paragraf i CTA dugme prevedeni ("Dizajniram i razvijam brze, pristupačne sajtove i web aplikacije koje su jednostavne za korišćenje i napravljene da traju." / "Započnimo saradnju"). "Web developer" NAMERNO OSTAJE na engleskom (korisnikova odluka — u IT industriji u Srbiji se taj termin ne prevodi). Alt tekst na profilnoj slici: "Vukašin Riznić — Web Developer" (bilo samo ime).
- **Navbar**: `lib/links.ts` `navLinks` prevedeni — Work→**Projekti**, Service→**Usluge**, About→**O meni**, Contact→**Kontakt** (korisnik je EKSPLICITNO tražio "Projekti" umesto mog predloga "Radovi"). Header dugme "Let's Talk"→"**Pišite mi**", `aria-label` hamburgera→"Otvori/zatvori meni". ⚠️ `Header.tsx` `navCounts` mapa (brojevi u dropdown meniju) je KEYED PO LABELU (`Projekti: projects.length` itd.) — ako se label ikad opet menja, MORA se menjati i ovaj key, inače brojčani indikator nestaje nečujno (nema greške, samo se `navCounts[link.label]` vrati `undefined` i uslov `!== undefined` postane false).
- **Work/Projekti sekcija**: `SectionLabel` watermark "Portfolio"→"**Projekti**", heading "/Selected Work"→"**/Moji projekti**" (korisnikov eksplicitan izbor). Placeholder sadržaj kartica (nazivi projekata, tagovi) NAMERNO OSTAVLJEN na engleskom — čeka prava data, nema smisla prevoditi pa ponovo menjati.
- **Services/Usluge**: watermark "Service"→"Usluge", heading "/Service"→"/Usluge", "Preview" placeholder label→"Pregled". Naslovi usluga (Web Design, Web Development, E-Commerce, Performance & SEO, Maintenance & Support) NAMERNO OSTAJU na engleskom (korisnikova odluka nakon što sam predložio da su to univerzalno prepoznatljivi IT termini, "SEO" nema ni pravi prevod) — SAMO opisi ispod su prevedeni na srpski.
- **About**: tekst potpuno prepisan (ne samo preveden) za SEO — "Kao web developer, gradim sajtove i web aplikacije kod kojih dizajn i funkcionalnost rade zajedno, uz pažnju na svaki detalj od prve ideje do gotovog proizvoda." Korisnik je EKSPLICITNO tražio da NEMA crte (—) u tekstu — "izgleda kao da je AI generisano". **Zapamti ovo kao opšte pravilo stila za budući copy na ovom sajtu: izbegavaj em-dash, piši kao jedna prirodna rečenica.** `paragraphWords` niz u `About.tsx` mora se ručno razbiti reč-po-reč (koristi se za scroll-reveal animaciju) — ne zaboravi ovo pri budućim izmenama teksta te sekcije. Korisnik je posle SAM menjao veličinu fonta (30px→32px) preko editora, samo pushovano.
- **CTA**: heading "Have a project in mind?"→"**Imate projekat na umu?**", paragraf prepisan ("Bilo da vam treba nov sajt, redizajn postojećeg ili samo imate ideju koju želite da razvijemo zajedno, tu sam da pomognem da ona zaživi." — opet BEZ crte), dugme "Start a Conversation"→"**Započnimo saradnju**" (korisnik je namerno hteo ISTU frazu kao Hero dugme radi doslednosti/pamćenja, ne novu formulaciju).
- `AvailabilityBadge.tsx` sad ima `fullTextOnMobile` prop — mobile Header prikazuje kratko "Dostupan", CTA (i desktop svuda) prikazuje puno "Dostupan za saradnju". Bez ovog prop-a bi se ILI svuda skratilo ILI svuda produžilo — korisnik je hteo razliku PO KONTEKSTU, ne po breakpoint-u čisto.

### Services accordion — klik na otvoren item ga sad i zatvara
Ranije: `onClick={() => { if (!isOpen) setOpenIndex(index); }}` — klik na već otvoren item nije radio ništa (samo X dugme je zatvaralo). Fix: `onClick={() => setOpenIndex(isOpen ? null : index)}` — pravi toggle.

### Telefon + QR poziv kartica (zamenjeno Instagram dugme)
Korisnikov zahtev: umesto Instagram social linka, dugme "Telefon" koje na MOBILE odmah zove broj, a na DESKTOP-u prikazuje QR karticu za skeniranje telefonom.
- `lib/links.ts`: Instagram entry zamenjen sa `{ label: "Telefon", href: "tel:+381655339481", icon: "phone" }`.
- `public/qr-phone.png` — generisan preko `qrcode` npm paketa (PRIVREMENO instaliran `npm install --no-save qrcode`, generisan `tel:+381655339481` QR kod, PA UKLONJEN `npm uninstall qrcode` — nema traga u `package.json`). Boja `#111111` (naša `--foreground`) na beloj pozadini.
- `SocialLinks.tsx` restrukturiran: novi `SocialLinkItem` sub-komponenta po linku, sa `isPhone` granom — `onClick` proverava `window.matchMedia("(hover: hover) and (pointer: fine)").matches` (ISTA tehnika kao touch-detekcija u `Cursor.tsx`, sad ponovo iskorišćena) da odluči da li da `preventDefault()` + otvori QR `AnimatePresence` karticu (desktop) ili pusti prirodan `tel:` klik (mobile/touch).
- ⚠️ **PRAVI BAG nađen i ispravljen po korisnikovom prijavljivanju:** `onMouseEnter`/`onMouseLeave` NISU imali istu `canHover()` proveru kao `onClick` — na mobile-u tap na link ponekad okine sintetički `mouseenter` event (browser kompatibilnost), što je otvaralo QR karticu na dodir umesto da telefon odmah pozove. Fix: `canHover()` helper funkcija izvučena i primenjena na SVA TRI handler-a (`onClick`, `onMouseEnter`, `onMouseLeave`). **Opšta lekcija: kad god se hover/touch grana radi ručno (ne čisto CSS `:hover`), SVAKI event handler koji učestvuje mora imati IDENTIČNU proveru, ne samo onaj "glavni" (`onClick`).**
- Hero.tsx mobile floating social dugmići (odvojen hardkodovan markup, NE koristi `SocialLinks.tsx`) su TAKOĐE ažurirani — `mobileSocialIcons`/`mobileSocialPosition` mape keyed po labelu, "Instagram"→"Telefon" key promena, i `target="_blank"`/`rel` uslovno `undefined` za `tel:` link (ne bi imalo smisla `_blank` na poziv).
- **Afera link** — ikonica promenjena na Instagram stil (`icon: "instagram"`) JER ĆE USKORO voditi na Afera Digital-ov Instagram profil, ALI href ZASAD OSTAJE `aferadigital.rs` sajt — Instagram profil za taj brend još nije napravljen. **Kad korisnik pošalje taj URL, promeni SAMO `href` u `lib/links.ts`, icon je već tačan.**

### Social linkovi — hover animacija (probano više varijanti, korisnik odabrao)
Finalna verzija: `hover:-translate-y-0.5 hover:shadow-md` (lift + mekana senka) na pilulama. Verzija sa "icon krug se puni crnom bojom na hover" je PROBANA pa EKSPLICITNO ODBAČENA — korisnik je rekao "bez 2". Ne vraćaj to bez pitanja.

### "Pogledaj sve projekte" dugme + nova `/projekti` stranica
- Work sekcija dobila belo/crno-tekst dugme na dnu (referenca: screenshot koji je korisnik poslao) — `bg-white text-foreground font-semibold`, STROGO suprotno od standardnih crnih dugmadi na sajtu.
- Nova ruta `src/app/projekti/page.tsx` — modelovana po `dymasalfin.web.id/work` (BEZ filtera All/Real Project/Exploration, korisnik eksplicitno nije hteo filtere): "Nazad" dugme (lucide `ArrowLeft`, vodi na `/`) + `AvailabilityBadge` gore, `/Svi projekti` heading + broj projekata (Srpska pluralizacija: `projectWord()` helper, 1=projekat, 2-4=projekta, 5+=projekata, NE zaboravi izuzetke za 11-14), grid kartica (**3 kolone na `lg`**, širi od homepage-ovog 2-kolonskog grida — namerno, ovo je "vidi sve" stranica), pa ISTA `<CTA/>` komponenta na dnu (reuse, ne duplirano).
- `ProjectCard.tsx` izdvojen iz `Work.tsx` u zaseban fajl — koriste ga i homepage Work sekcija i `/projekti`, uvek sinhronizovani.
- Dugme "Pogledaj sve projekte" u `Work.tsx` sada `href="/projekti"` (bilo `#` placeholder).

### ⚠️⚠️ CONTAINER WIDTH SAGA — najvažniji arhitekturni nalaz ove sesije, PROČITAJ AKO DIRAŠ ŠIRINE SEKCIJA
Korisnik je više puta (3 kruga fine-tuning-a) prijavio da `/projekti` i CTA social red imaju DRUGAČIJU (užu) širinu nego Hero/Services. Kopalo se kroz TRI ODVOJENA UZROKA, redom kako su nađeni:

1. **`Hero.tsx` glavni desktop kontejner je koristio `max-w-6xl` (1152px, FIKSNO)** dok su Services/About/CTA-social koristili `var(--name-width, 80rem)` (JS-izmerena vrednost, obično ŠIRA). Fix: Hero prebačen na isti `var(--name-width)` pattern.
2. **`CTA.tsx` je imao `px-5 sm:px-10` padding na SAMOJ `<section>`**, dok je Services imao padding na UNUTRAŠNJEM `<div>` KOJI TAKOĐE nosi `maxWidth` style. Isti CSS var je zato davao RAZLIČIT efektivan rezultat — `width:100%` unutar padded parenta se računa OD content-box-a parenta (padding VEĆ oduzet), pa je `var(--name-width)` cap retko i uspevao da ograniči bilo šta (dostupan prostor je već bio uži nego cap). ⚠️ **Negative-margin trik (`-mx-5 sm:-mx-10` da se "pobegne" iz parent padding-a) NE RADI za ovo** — `width:100%`/`w-full` se RAČUNA prema containing-block content-box-u BEZ obzira na sopstveni margin elementa (margin utiče na POZICIJU/render, ne na % width bazu). Jedini ispravan fix: padding mora biti NA ISTOM elementu koji nosi `maxWidth`, ne na pretku. Restrukturirano: padding premešten sa `<section>` na unutrašnje content blokove.
3. **`/projekti` stranica NE renderuje `Hero.tsx`** — pa `--name-width` NIKAD nije bio setovan tamo (JS koji ga postavlja živeo je ISKLJUČIVO u Hero-u). Prvi pokušaj fix-a: hardkodovan `max-w-[80rem]` na `/projekti` — RADILO je na test viewport-u (1280px) ali je BILO POGREŠNO jer `--name-width` NIJE fiksna vrednost — Hero-ovo ime koristi `clamp()` font-size koji RASTE sa širinom ekrana, pa na širokom monitoru (testirano 1920px) prava vrednost postaje ~1378px, ZNATNO šira od 80rem/1280px fallback-a. Korisnik je ovo primetio na screenshot-u (home vs projekti social red, vidljivo uža na projekti). **PRAVI fix:** izvučena `NameWidthSync.tsx` — nevidljiva (`invisible fixed -z-50`) TAČNA kopija Hero desktop imena (isti font/tracking/breakpoint-ponašanje), mount-ovana JEDNOM u `layout.tsx` (root, radi na SVAKOJ stranici) umesto u `Hero.tsx`. Hero više NE nosi ovu odgovornost (ref/effect uklonjeni odatle). Testirano na 375px/1280px/1920px — SVUDA se `--name-width` i sva mesta koja ga koriste (Hero, Services, CTA social, `/projekti` × 3 kontejnera) poklapaju TAČNO na pixel.

**Ako se ikad doda NOVA sekcija/stranica koja treba da deli ovu širinu:** samo koristi `style={{maxWidth: "var(--name-width, 80rem)"}}` + `mx-auto` NA ISTOM elementu koji nosi i horizontalni padding (px-5/px-10) — ne razdvajaj ih na roditelj/dete. `NameWidthSync` garantuje da će var uvek biti tačno postavljen bez obzira koja je stranica trenutno aktivna.

### Dugmad — dosledna hover animacija
"Započnimo saradnju" (Hero×2, CTA) i "Pišite mi" (Header desktop) dobili isti `hover:-translate-y-0.5 hover:shadow-md` kao "Pogledaj sve projekte" dugme (`transition-colors`→`transition-all` da se i transform/shadow animiraju, ne samo boja).

## Nerešeno/napomene za oprez

- **Vidi "⚠️ NAJVAŽNIJI poznat problem" gore** (rAF zamrznut) — pre bilo kakvog animacionog debug-a, pročitaj to.
- **Vidi "⚠️⚠️ CONTAINER WIDTH SAGA" gore** — pre bilo kakve izmene max-width/padding na sekcijama, pročitaj to. `NameWidthSync.tsx` u root layout-u je sad jedini izvor istine za `--name-width`.
- Screenshot alat (`computer` sa `action:"screenshot"`) je često nepouzdan ("Browser pane is not displayed", ili prazan/beo screenshot odmah posle hot-reload-a — sačekaj i probaj ponovo, ili veruj DOM merenju umesto tome). `javascript_tool` (DOM/computed style/getBoundingClientRect/getAttribute) je glavni način verifikacije.
- `read_console_messages` je "lepljiv" — stare greške ostaju vidljive posle fix-a u ISTOM tabu. Uvek proveri u SVEŽEM tabu (`tabs_create`) pre nego što zaključiš da fix nije upalio.
- `preview_start` često prijavljuje pogrešan/nasumičan port — probaj DIREKTNO `http://localhost:3000` bez obzira šta alat vrati, server skoro uvek na kraju završi tamo.
- Pre SVAKOG `git push`: pokreni `npm run build` lokalno (ne samo `next dev`) — TS greške koje `next dev` ne hvata mogu srušiti Vercel deploy (vidi git+deploy sekciju gore).
- Sajt je sada DELIMIČNO preveden na srpski (Hero, Navbar, Work/Projekti, Services/Usluge, About, CTA) — nastavi sekciju-po-sekciju istim workflow-om (predlog → odobrenje → ubacivanje). Naslovi usluga i "Web developer" NAMERNO ostaju na engleskom (korisnikova odluka).
- Korisnik komunicira na srpskom. Copy stil: BEZ em-dash (—) karaktera u tekstu koji se prikazuje na sajtu — korisnik smatra da to "izgleda kao AI generisano". Piši kao jednu prirodnu rečenicu.
- Korisnik daje vrlo precizan, iterativan feedback — često šalje screenshot ili traži da se referentni sajt izmeri pre nego što nešto stilizuješ. Ne nagađaj piksele/boje, izmeri ih (bundle fetch tehnika ili DOM inspekcija).
- Korisnik ponekad da nepotpuno/isprekidano uputstvo (npr. "padding treba da bude X" bez broja) — u tom slučaju je razumno posegnuti za već izmerenim referentnim vrednostima ako postoje u kontekstu, ali JASNO napisati u odgovoru šta si pretpostavio da korisnik može ispraviti.
- Korisnik ponekad SAM menja kod direktno (preko editora/hook-a, vidljivo kroz system-reminder poruke usred sesije) — to su NAMERNE izmene, ne prepisuj ih nazad bez pitanja, samo ih uzmi u obzir i nastavi.
