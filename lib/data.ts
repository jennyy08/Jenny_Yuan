export const profile = {
  name: "Jenny Yuan",
  tagline: "studying computer science at the University of Waterloo.",
  school: "computer science @ university of waterloo",
  schoolUrl: "https://uwaterloo.ca/future-students/programs/computer-science",
  status: "seeking summer 2027 internships",
  email: "jyuan042508@gmail.com",
  links: {
    github: "https://github.com/jennyy08",
    linkedin: "https://www.linkedin.com/in/jennyyuan08",
    devpost: "https://devpost.com/jennyy08?ref_content=user-portfolio&ref_feature=portfolio&ref_medium=global-nav",
  },
};

export const now = [
  "seeking summer 2027 internship opportunities",
  "turning curious ideas into thoughtful, useful things",
];

export const done = [
  "built Local Voice, a civic-tech app for reporting local infrastructure issues",
];

export type Project = {
  title: string;
  tag: string;
  year: string;
  description: string;
  images: string[];
  accent: "gold" | "blue";
  imageClass?: string;
  award?: string;
  video?: string;
  devpost?: string;
  github?: string;
  live?: string;
};

export const projects: Project[] = [
  {
    "title": "AirCAD",
    "tag": "Spatial CAD",
    "description": "Sketch in midair with a tracked pen, speak a dimension, and pull the outline into a 3D solid. Export the model to FreeCAD to keep editing.",
    "year": "2026",
    "accent": "blue",
    "images": [
      "/previews/aircad.webp"
    ],
    "video": "/previews/aircad.mp4",
    "award": "Hack the North semifinalist",
    "github": "https://github.com/changkevin51/AirCad",
    "devpost": "https://devpost.com/software/aircad"
  },
  {
    "title": "BUMPitup",
    "tag": "Physiotherapy",
    "description": "Patients follow care-team routines and track movement with a camera or wristband. After each session, they log how they feel so their provider can adjust the next one.",
    "year": "2026",
    "accent": "blue",
    "images": [
      "/previews/bump-screen.webp"
    ],
    "video": "/previews/bump-screen.mp4",
    "award": "WiE hackathon winner",
    "github": "https://github.com/lindaeq/BUMPitup",
    "devpost": "https://devpost.com/software/bump-it-up"
  },
  {
    "title": "Touchline",
    "tag": "Computer vision",
    "description": "Practice a soccer drill, then replay it with the ball’s path marked on screen. Touchline estimates juggling touches and toe taps so players can check the count themselves.",
    "year": "2026",
    "accent": "blue",
    "images": [
      "/previews/touchline.webp"
    ],
    "video": "/previews/touchline.mp4",
    "github": "https://github.com/jennyy08/Touchline"
  },
  {
    "title": "Local Voice",
    "tag": "Civic tech",
    "description": "Pin a neighbourhood issue on a shared map, vote on reports, and follow their progress.",
    "year": "2026",
    "accent": "blue",
    "images": [
      "/images/local-voice-home.png"
    ],
    "github": "https://github.com/jennyy08/Local-Voice",
    "video": "/previews/local-voice.mp4",
    "live": "https://local-voice-omega.vercel.app"
  },
  {
    "title": "Auri",
    "tag": "Wearable hardware",
    "description": "A wristband listens for environmental sounds and spoken names, then alerts the wearer with a light or vibration. Choose which sounds matter at home, outside, or while asleep.",
    "year": "2026",
    "accent": "blue",
    "images": [
      "/previews/auri-hardware.webp"
    ],
    "video": "/previews/auri.mp4",
    "github": "https://github.com/lindaeq/auri",
    "devpost": "https://devpost.com/software/auri-gvp74e"
  },
  {
    "title": "NBA Archetype Studio",
    "tag": "Sports analytics",
    "description": "Compare NBA players by playing style, then take a lineup onto a virtual court. Draw routes and run the play to see how the defense reacts.",
    "year": "2026",
    "accent": "blue",
    "images": [
      "/images/nba-play-lab.png"
    ],
    "github": "https://github.com/jennyy08/nba-archetypes-app",
    "video": "/previews/nba.mp4"
  }
];

export const interests = [
  { title: "football", detail: "real madrid · psg · matchday energy", symbol: "⚽" },
  { title: "basketball", detail: "toronto raptors · always watching", symbol: "🏀" },
  { title: "places", detail: "travelling, wandering, keeping the photos", symbol: "✦" },
];
