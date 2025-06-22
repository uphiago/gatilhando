import {
  aws,
  benefitIcon1,
  benefitIcon2,
  benefitIcon3,
  benefitIcon4,
  benefitIcon5,
  benefitIcon6,
  benefitImage1,
  benefitImage2,
  benefitImage3,
  benefitImage4,
  benefitImage5,
  benefitImage6,
  chromecast,
  disc02,
  discord,
  docker, // discordBlack,
  // facebook,
  file02,
  google,
  homeSmile,
  instagram,
  n8n,
  notification2,
  notification3,
  notification4,
  nvidia,
  ollama,
  openai,
  plusSquare,
  recording01,
  recording03,
  roadmap1,
  roadmap2,
  roadmap3,
  roadmap4,
  searchMd,
  slack,
  sliders04,
  telegram, // twitter,
  yourlogo,
  yourlogo1,
} from "../assets";
import { links } from "../config";

export const navigation = [
  {
    id: "0",
    title: "Nossa proposta",
    url: "#features",
  },
  {
    id: "1",
    title: "Negocios",
    url: "#how-to-use",
  },
  // {
  //   id: "2",
  //   title: "How to use",
  //   url: "#how-to-use",
  // },
  // {
  //   id: "3",
  //   title: "Roadmap",
  //   url: "#roadmap",
  // },
  {
    id: "4",
    title: "Source Code",
    url: links.sourceCode,
    onlyMobile: true,
    external: true,
  },
];

export const heroIcons = [homeSmile, file02, searchMd, plusSquare];

export const notificationImages = [notification4, notification3, notification2];

export const companyLogos = [yourlogo1, yourlogo, yourlogo, yourlogo, yourlogo];

export const brainwaveServices = ["Triggers Inteligentes", "Painéis 24/7", "Escala Imediata"];

export const brainwaveServicesIcons = [recording03, recording01, disc02, chromecast, sliders04];

export const roadmap = [
  {
    id: "0",
    title: "Voice recognition",
    text: "Enable the chatbot to understand and respond to voice commands, making it easier for users to interact with the app hands-free.",
    date: "May 2023",
    status: "done",
    imageUrl: roadmap1,
    colorful: true,
  },
  {
    id: "1",
    title: "Gamification",
    text: "Add game-like elements, such as badges or leaderboards, to incentivize users to engage with the chatbot more frequently.",
    date: "May 2023",
    status: "progress",
    imageUrl: roadmap2,
  },
  {
    id: "2",
    title: "Chatbot customization",
    text: "Allow users to customize the chatbot's appearance and behavior, making it more engaging and fun to interact with.",
    date: "May 2023",
    status: "done",
    imageUrl: roadmap3,
  },
  {
    id: "3",
    title: "Integration with APIs",
    text: "Allow the chatbot to access external data sources, such as weather APIs or news APIs, to provide more relevant recommendations.",
    date: "May 2023",
    status: "progress",
    imageUrl: roadmap4,
  },
];

export const collabText = "Atue com eficiência: otimize, padronize e esteja sempre em conformidade.";

export const collabContent = [
  {
    id: "0",
    title: "Integração de Sistemas",
    text: "Seus dados conectados em todas as plataformas",
  },
  {
    id: "1",
    title: "Workflows Consistentes",
    text: "Processos iguais, resultados previsíveis",
  },
  {
    id: "2",
    title: "Compliance Automático",
    text: "Normas atendidas em todos os processos",
  },
];

export const collabApps = [
  {
    id: "0",
    title: "Cloud Services",
    icon: aws,
    width: 26,
    height: 36,
  },
  {
    id: "1",
    title: "Automations",
    icon: n8n,
    width: 34,
    height: 36,
  },
  {
    id: "2",
    title: "Bots",
    icon: discord,
    width: 36,
    height: 28,
  },
  {
    id: "3",
    title: "AI Models",
    icon: ollama,
    width: 34,
    height: 35,
  },
  {
    id: "4",
    title: "Drivers",
    icon: nvidia,
    width: 34,
    height: 34,
  },
  {
    id: "5",
    title: "LLMs",
    icon: openai,
    width: 34,
    height: 34,
  },
  {
    id: "6",
    title: "Virtualization",
    icon: docker,
    width: 26,
    height: 34,
  },
  {
    id: "7",
    title: "Internet",
    icon: google,
    width: 38,
    height: 32,
  },
];

export const pricing = [
  {
    id: "0",
    title: "Basic",
    description: "AI chatbot, personalized recommendations",
    price: "0",
    features: [
      "An AI chatbot that can understand your queries",
      "Personalized recommendations based on your preferences",
      "Ability to explore the app and its features without any cost",
    ],
    premium: false,
  },
  {
    id: "1",
    title: "Premium",
    description: "Advanced AI chatbot, priority support, analytics dashboard",
    price: "9.99",
    features: [
      "An advanced AI chatbot that can understand complex queries",
      "An analytics dashboard to track your conversations",
      "Priority support to solve issues quickly",
    ],
    premium: true,
  },
  {
    id: "2",
    title: "Enterprise",
    description: "Custom AI chatbot, advanced analytics, dedicated account",
    price: null,
    features: [
      "An AI chatbot that can understand your queries",
      "Personalized recommendations based on your preferences",
      "Ability to explore the app and its features without any cost",
    ],
    premium: false,
  },
];

export const benefits = [
  {
    id: "0",
    title: "Performance Acelerada",
    text: "Ganhe tempo com respostas instantâneas e rotinas otimizadas por IA.",
    backgroundUrl: "/src/assets/benefits/card-1.svg",
    iconWrapperClass: "scale-[1.1]",
    iconUrl: benefitIcon1,
    imageUrl: benefitImage1,
  },
  {
    id: "1",
    title: "Otimize sua Rotina",
    text: "Transforme processos repetitivos em fluxos automáticos e inteligentes. Escalabilidade garantida.",
    backgroundUrl: "/src/assets/benefits/card-2.svg",
    iconUrl: benefitIcon2,
    iconWrapperClass: "scale-[0.7] translate-x-[0px] translate-y-[0px]",
    imageUrl: benefitImage2,
    light: true,
  },
  {
    id: "2",
    title: "Conecte Sistemas",
    text: "Integração total para operações contínuas e seguras dentro de um ecossistema eficiente.",
    backgroundUrl: "/src/assets/benefits/card-3.svg",
    iconWrapperClass: "scale-[0.75]",
    iconUrl: benefitIcon3,
    imageUrl: benefitImage3,
  },
  {
    id: "3",
    title: "Automação Inteligente",
    text: "Processos ágeis e exatos, aprendendo continuamente com seus dados para entregar eficiência e inovação.",
    backgroundUrl: "/src/assets/benefits/card-4.svg",
    iconUrl: benefitIcon4,
    iconWrapperClass: "scale-[0.8] translate-x-[1px] translate-y-[-1px]",
    imageUrl: benefitImage4,
    light: true,
  },
  {
    id: "4",
    title: "Tudo sob Controle",
    text: "Painéis em tempo real que monitoram cada fluxo com segurança.",
    backgroundUrl: "/src/assets/benefits/card-5.svg",
    iconUrl: benefitIcon5,
    iconWrapperClass: "scale-[1.1]",
    imageUrl: benefitImage5,
  },
  {
    id: "5",
    title: "Processos sem Fricção",
    text: "Agilidade contínua, zero repetição, comando remoto imediato.",
    backgroundUrl: "/src/assets/benefits/card-6.svg",
    iconUrl: benefitIcon6,
    iconWrapperClass: "scale-[0.7]",
    imageUrl: benefitImage6,
  },
];

export const socials = [
  // {
  //   id: "0",
  //   title: "Discord",
  //   iconUrl: discordBlack,
  //   url: "#",
  // },
  // {
  //   id: "1",
  //   title: "Twitter",
  //   iconUrl: twitter,
  //   url: "#",
  // },
  {
    id: "2",
    title: "Instagram",
    iconUrl: instagram,
    url: "https://www.instagram.com/flowgatilhando",
  },
  // {
  //   id: "3",
  //   title: "Telegram",
  //   iconUrl: telegram,
  //   url: "#",
  // },
  // {
  //   id: "4",
  //   title: "Facebook",
  //   iconUrl: facebook,
  //   url: "#",
  // },
];
