export interface ProjectSection {
  title?: string;
  content?: string;
  galleryCount?: number;
}

export interface TeamMember {
  name: string;
  role: string;
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  author: string;
  role?: string;
  teamSize?: number;
  teamName?: string;
  teamMembers?: TeamMember[];
  awardName?: string;
  awardDate?: string;
  awardHost?: string;
  tags: string[];
  techStack?: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  content: string;
  sections: ProjectSection[];
}

export const projects: ProjectItem[] = [
  {
    id: "p1",
    slug: "gagambattle",
    title: "Gagambattle",
    description: "An award-winning physics-based fighting game inspired by the cultural heritage of Philippine spider fighting, featuring advanced AI opponents and dynamic mechanics.",
    author: "Jan",
    role: "Solo Developer",
    teamSize: 1,
    awardName: "AI Fest: Game On — 1st Place",
    awardDate: "March 2025",
    awardHost: "Hosted by University of San Agustin IT Department",
    tags: ["Game Dev", "AI Fest Winner", "Physics Engine"],
    techStack: ["Unity", "C#", "Blender", "FMOD"],
    githubUrl: "#",
    liveUrl: "#",
    content: "Gagambattle is a unique digital experience that modernizes the traditional Philippine pastime of spider fighting. It stood out in competition, winning at the AI Fest: Game On and picking up additional special awards for its advanced AI implementation and stunning physics engine.",
    sections: [
      {
        title: "Project Story",
        content: "The concept was born out of a desire to preserve local culture through modern interactive media. By simulating the precise tension of webs and the unpredictable nature of arachnid combat, the game offers a deeply nostalgic yet entirely novel experience for players.",
      },
      {
        galleryCount: 3,
      },
      {
        title: "Technical Implementation",
        content: "Under the hood, Gagambattle uses a custom inverse kinematics (IK) solver to handle the complex leg movements of the spiders. The AI opponents utilize behavior trees and reinforcement learning to adapt to the player's fighting style, making every match uniquely challenging.",
      }
    ]
  },
  {
    id: "p2",
    slug: "pharmatrack",
    title: "Pharmatrack",
    description: "A sophisticated mobile security research project demonstrating vulnerabilities in geolocation services, designed as a proof-of-concept for student safety.",
    author: "Lexzhunder",
    role: "Lead Security Researcher",
    teamSize: 4,
    teamName: "NetSec Devs",
    teamMembers: [
      { name: "Lexzhunder", role: "Lead Security Researcher" },
      { name: "Jane Doe", role: "Systems Analyst" },
      { name: "John Smith", role: "Mobile Engineer" },
      { name: "Alice", role: "UI/UX Designer" }
    ],
    tags: ["Cybersecurity", "Mobile", "Proof of Concept"],
    techStack: ["Kotlin", "Android SDK", "Firebase", "Java"],
    githubUrl: "#",
    content: "Pharmatrack is a comprehensive security audit tool. It was developed to highlight how easily everyday mobile applications can exploit background location permissions, serving as a critical educational tool for privacy awareness.",
    sections: [
      {
        title: "Project Story",
        content: "What started as an experimental tracker quickly turned into a deep dive into Android's permission architecture. The team realized that the same technology used for the tracker could be weaponized, prompting a pivot toward creating a defensive analysis tool instead.",
      },
      {
        galleryCount: 2,
      },
      {
        title: "Technical Implementation",
        content: "The application utilizes advanced background service workers and geofencing APIs to maintain low-power tracking. It encrypts all payload data locally before transmitting it to a secure Firebase backend, ensuring that even intercepted packets yield no usable intelligence.",
      },
      {
        galleryCount: 2,
      },
      {
        title: "Results & Impact",
        content: "The findings from this project were presented at the university's cybersecurity symposium, leading to a campus-wide initiative to review and secure student data practices across official university mobile applications."
      }
    ]
  },
  {
    id: "p3",
    slug: "foundit",
    title: "Foundit",
    description: "A real-time lost and found management system engineered for high-traffic fitness centers, utilizing automated matching algorithms to recover misplaced gear.",
    author: "Namikaze",
    role: "Lead Developer",
    teamSize: 3,
    teamMembers: [
      { name: "Namikaze", role: "Lead Developer" },
      { name: "Minato", role: "UI/UX Designer" },
      { name: "Kushina", role: "Database Engineer" }
    ],
    tags: ["Web App", "Logistics", "System"],
    techStack: ["Next.js", "Tailwind CSS", "TypeScript", "PostgreSQL"],
    liveUrl: "#",
    content: "Foundit is a streamlined lost and found solution designed specifically for the fitness community. By crowdsourcing the recovery process and employing smart matching algorithms, it drastically reduces the time between losing an item and its safe return.",
    sections: [
      {
        title: "Project Story",
        content: "After losing multiple expensive shaker bottles and weightlifting belts, the team realized that traditional 'lost and found' boxes were fundamentally broken. They set out to build a digital-first solution that proactively alerts users when their specific item type is turned in.",
      },
      {
        galleryCount: 1,
      },
      {
        title: "Technical Implementation",
        content: "The platform is built on a serverless Next.js architecture, backed by a highly optimized PostgreSQL database. It features real-time notifications via WebSockets and fuzzy-search capabilities to match descriptions of lost items with found inventory.",
      },
      {
        galleryCount: 1,
      },
      {
        title: "User Experience Design",
        content: "The interface was designed for maximum efficiency. Gym staff can log an item in under 10 seconds using quick-select categories, while users can file a lost report with just three taps on their mobile devices."
      },
      {
        title: "Future Roadmap",
        content: "Upcoming features include computer vision integration, allowing staff to simply snap a photo of a found item while the system automatically tags its color, brand, and category."
      }
    ]
  },
  {
    id: "p4",
    slug: "nextask",
    title: "NexTask AI",
    description: "A beautifully minimalist productivity ecosystem that leverages natural language processing to intelligently prioritize your daily workflows.",
    author: "Elena Rodriguez",
    role: "Solo Developer",
    teamSize: 1,
    tags: ["Productivity", "AI", "Mobile"],
    techStack: ["React Native", "TypeScript", "Node.js", "OpenAI"],
    githubUrl: "#",
    liveUrl: "#",
    content: "NexTask AI reimagines the to-do list by focusing on what actually matters. Instead of overwhelming users with endless tasks, it uses smart AI to suggest the top three things you should focus on today, wrapped in a calming, distraction-free UI.",
    sections: [
      {
        title: "Project Story",
        content: "Burnout is a common issue among computer science students. NexTask was created to combat 'productivity paralysis'—the anxiety of having too much to do and not knowing where to start. By limiting daily active tasks to three, it forces intentionality."
      },
      {
        galleryCount: 1
      },
      {
        title: "Technical Implementation",
        content: "The app processes user brain-dumps using OpenAI's API, categorizing tasks by urgency and effort. The React Native frontend is heavily optimized for smooth 60fps animations, providing a tactile and deeply satisfying user experience."
      }
    ]
  },
  {
    id: "p5",
    slug: "lumiere",
    title: "Lumiere Studio",
    description: "A next-generation, browser-native photo editor powered by WebGL hardware acceleration and on-device machine learning.",
    author: "Marcus Chen",
    role: "Lead Engineer",
    teamSize: 5,
    teamName: "Lumiere Studio",
    teamMembers: [
      { name: "Marcus Chen", role: "Lead Engineer" },
      { name: "Sarah Jenkins", role: "Frontend Developer" },
      { name: "David Kim", role: "ML Engineer" },
      { name: "Olivia Wright", role: "Product Designer" },
      { name: "Tom Baker", role: "QA Tester" }
    ],
    tags: ["Creative", "WebGL", "Machine Learning"],
    techStack: ["React", "Three.js", "TensorFlow.js", "Python"],
    githubUrl: "#",
    content: "Lumiere brings professional-grade photo editing tools directly into the browser without any plugins. By leveraging WebGL for hardware acceleration and TensorFlow.js for smart object removal, it completely rivals desktop software in performance and capability.",
    sections: [
      {
        title: "Project Story",
        content: "The team wanted to prove that the web platform is ready for intensive creative applications. What began as a simple filter app evolved into a full-fledged node-based image compositor capable of handling 4K RAW files directly in Chrome."
      },
      {
        galleryCount: 2
      },
      {
        title: "Technical Implementation",
        content: "We utilized custom GLSL shaders for all image adjustments (brightness, contrast, curves) to ensure zero latency. The 'Magic Eraser' feature runs a quantized segmentation model locally via TensorFlow.js, keeping user data completely private."
      },
      {
        galleryCount: 3
      }
    ]
  },
  {
    id: "p6",
    slug: "codesync",
    title: "CodeSync Core",
    description: "A lightning-fast VS Code extension utilizing WebRTC and CRDTs to enable seamless, low-latency peer-to-peer code collaboration.",
    author: "Alex Rivera",
    role: "Co-Founder",
    teamSize: 2,
    teamName: "CodeSync Core",
    teamMembers: [
      { name: "Alex Rivera", role: "Backend Architecture" },
      { name: "Sam Taylor", role: "Extension Developer" }
    ],
    tags: ["Developer Tools", "Real-time", "VS Code"],
    techStack: ["TypeScript", "WebRTC", "Yjs", "VS Code API"],
    liveUrl: "#",
    content: "CodeSync eliminates the need for clunky screen sharing during pair programming. It uses WebRTC to establish a direct P2P connection between developers, allowing them to type in the same file simultaneously with near-zero latency and no cloud dependencies.",
    sections: [
      {
        title: "Project Story",
        content: "Frustrated by the lag of existing remote collaboration tools during late-night hackathons, Alex and Sam decided to build a solution that bypasses central servers entirely. CodeSync is built for speed and privacy."
      },
      {
        galleryCount: 1
      },
      {
        title: "Technical Implementation",
        content: "Conflict-Free Replicated Data Types (CRDTs) through Yjs handle all the heavy lifting for state synchronization. The connection is established via a lightweight signaling server, after which all keystrokes and cursor positions are transmitted directly peer-to-peer."
      }
    ]
  }
];

export async function getProjects(): Promise<ProjectItem[]> {
  // Sanity is the intended long-term home for projects (ITSA-WEB-PMP-001,
  // S2) -- checked first. This array was never backed by a real database at
  // all (no Firestore path existed here, just this hardcoded list with a
  // fake delay), so it stays as the last-resort fallback rather than being
  // deleted outright.
  const { getSanityProjects } = await import("@/sanity/lib/projects");
  const sanityProjects = await getSanityProjects();
  if (sanityProjects && sanityProjects.length) return sanityProjects;

  return new Promise((resolve) => {
    setTimeout(() => resolve(projects), 100);
  });
}

export async function getProjectBySlug(slug: string): Promise<ProjectItem | undefined> {
  const allProjects = await getProjects();
  return allProjects.find((p) => p.slug === slug);
}
