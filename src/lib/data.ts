export const services = [
  {
    title: "Web Design",
    description:
      "Čist, moderan dizajn interfejsa prilagođen vašem brendu i korisnicima, od wireframe-a do detaljno dorađenog UI-ja.",
    image: "/projects/provenance.jpg",
  },
  {
    title: "Web Development",
    description:
      "Brzi, responzivni sajtovi i web aplikacije izrađeni pomoću modernih alata poput React-a, Next.js-a i FastAPI-a.",
    image: "/projects/tahoservice.jpg",
  },
  {
    title: "E-Commerce",
    description:
      "Onlajn prodavnice jednostavne za upravljanje i napravljene da prodaju, od stranica proizvoda do plaćanja.",
    image: "/projects/matiola.jpg",
  },
  {
    title: "Performance & SEO",
    description:
      "Optimizovano za brzinu, pristupačnost i vidljivost na pretraživačima, kako bi vas korisnici zaista pronašli.",
    image: "/projects/elevationworship.jpg",
  },
  {
    title: "Maintenance & Support",
    description:
      "Redovna ažuriranja, ispravke i unapređenja kako bi sajt nesmetano radio i nakon lansiranja.",
    image: "/projects/tealfather.jpg",
  },
];

export const projects: {
  title: string;
  tags: string[];
  image: string;
  url: string;
  featured?: boolean;
}[] = [
  {
    title: "Ancora",
    tags: ["AI Application", "Next.js"],
    image: "/projects/ancora.png",
    url: "https://ancora-ai.vercel.app",
    featured: true,
  },
  {
    title: "Matiola",
    tags: ["E-Commerce", "Next.js"],
    image: "/projects/matiola.jpg",
    url: "https://matiola-flowershop.vercel.app",
    featured: true,
  },
  {
    title: "Patriot Winery",
    tags: ["E-Commerce", "Webflow"],
    image: "/projects/patriot_winery.jpg",
    url: "https://patriot-winery.webflow.io",
    featured: true,
  },
  {
    title: "Elevation Worship",
    tags: ["Landing Page", "Webflow"],
    image: "/projects/elevationworship.jpg",
    url: "https://elevationworshiphome.webflow.io",
  },
  {
    title: "TahoService",
    tags: ["Web App", "Laravel"],
    image: "/projects/tahoservice.jpg",
    url: "https://tahoservice.onrender.com/login",
  },
  {
    title: "Provenance",
    tags: ["Landing Page", "Webflow"],
    image: "/projects/provenance.jpg",
    url: "https://provenance-blockchain-vukasinriznic.webflow.io",
    featured: true,
  },
  {
    title: "TealFather",
    tags: ["Landing Page", "Webflow"],
    image: "/projects/tealfather.jpg",
    url: "https://tealfather.webflow.io",
  },
];
