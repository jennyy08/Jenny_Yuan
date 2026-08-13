export const profile = {
  name: "Jenny Yuan",
  tagline: "computer science student who likes building things.",
  school: "computer science @ university of waterloo",
  schoolUrl: "https://uwaterloo.ca/future-students/programs/computer-science",
  status: "seeking summer 2027 internships",
  email: "jyuan042508@gmail.com",
  links: {
    github: "https://github.com/jennyy08",
    linkedin: "https://www.linkedin.com/in/jennyyuan08",
  },
};

export const now = [
  "seeking summer 2027 internship opportunities",
  "turning curious ideas into thoughtful, useful things",
];

export const done = [
  "incoming CS @ Waterloo, class of 2031",
  "built civic-tech and sports analytics tools from the ground up",
];

export type Project = {
  title: string;
  tag: string;
  year: string;
  description: string;
  images: string[];
  accent: "gold" | "blue";
  github?: string;
  live?: string;
};

export const projects: Project[] = [
  {
    title: "Local Voice",
    tag: "Civic Tech",
    year: "2026",
    description:
      "A civic-tech web app for reporting and tracking local infrastructure issues in real time. Built with React, TypeScript, and Firebase, with live geolocation mapping, atomic votes, role-based access, and OpenAI-powered content moderation.",
    images: ["/images/local-voice-home.png", "/images/local-voice-report.png"],
    accent: "gold",
  },
  {
    title: "NBA Archetype Studio",
    tag: "Sports Analytics",
    year: "2026",
    description:
      "A full-stack NBA analytics platform with client-side PCA and k-means player profiling, live data refresh, role comparisons, and a custom Canvas play simulator with draggable lineups, route drawing, coverage reactions, ball movement, and animation.",
    images: ["/images/nba-archetypes.png", "/images/nba-play-lab.png", "/images/nba-compare.png"],
    accent: "blue",
  },
];

export const interests = [
  { title: "football", detail: "real madrid · psg · matchday energy", symbol: "⚽" },
  { title: "basketball", detail: "toronto raptors · always watching", symbol: "🏀" },
  { title: "places", detail: "travelling, wandering, keeping the photos", symbol: "✦" },
];
