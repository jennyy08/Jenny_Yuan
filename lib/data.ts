// Edit everything in this file with your real info — the rest of the
// site just renders whatever's here.

export const profile = {
  name: "Jenny Yuan",
  tagline: "computer science student who builds things.",
  school: "computer science @ university of waterloo",
  schoolUrl: "https://uwaterloo.ca/future-students/programs/computer-science",
  status: "seeking summer 2027 internship opportunities",
  email: "jyuan042508@gmail.com",
  links: {
    github: "https://github.com/jennyy08",
    linkedin: "www.linkedin.com/in/jennyyuan08",
    resume: "/resume.pdf",
  },
};

export const now = [
  "seeking summer 2027 internship opportunities",
  "building [project name] — one line on what it does",
];

export const done = [
  "incoming CS @ Waterloo, class of 2031",
  "built [project], [one line on what it does / stack]",
  "[hackathon result] @ [event name]",
];

export type Project = {
  title: string;
  tag: string; // e.g. "Dev Tools", "Web App"
  year: string;
  description: string;
  image?: string; // path in /public/images
  github?: string;
  live?: string;
};

export const projects: Project[] = [
  {
    title: "Project One",
    tag: "Web App",
    year: "2026",
    description:
      "One or two sentences on what it does and the stack you used. Be specific — name the real tech, the real problem it solves.",
    image: "/images/project-1.png",
    github: "https://github.com/yourhandle/project-one",
    live: "https://project-one.vercel.app",
  },
  {
    title: "Project Two",
    tag: "Mobile",
    year: "2026",
    description:
      "Same as above — swap in your real project. Keep descriptions tight, one to two sentences max.",
    image: "/images/project-2.png",
    github: "https://github.com/yourhandle/project-two",
  },
  {
    title: "Project Three",
    tag: "Hackathon",
    year: "2025",
    description:
      "A third project slot. Delete or duplicate this block in lib/data.ts to add more.",
    image: "/images/project-3.png",
    github: "https://github.com/yourhandle/project-three",
  },
];

// The interests strip is meant to be texture, not a theme — a few icons
// or short labels that hint at who you are outside of code. Swap the
// labels for whatever's actually true (a club, a sport, a hobby).
export const interests: { label: string; caption: string }[] = [
  { label: "soccer", caption: "midfielder, weekend league" },
  { label: "travel", caption: "12 countries and counting" },
  { label: "photography", caption: "mostly film, mostly friends" },
  { label: "coffee", caption: "pour-over enthusiast" },
];

// Travel / friends photos for the personal strip. Drop real images in
// /public/images and point these at them.
export const photos: { src: string; alt: string }[] = [
  { src: "/images/photo-1.jpg", alt: "Describe this photo" },
  { src: "/images/photo-2.jpg", alt: "Describe this photo" },
  { src: "/images/photo-3.jpg", alt: "Describe this photo" },
];
