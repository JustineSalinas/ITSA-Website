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
    description: "A game inspired by spider fighting in the Philippines. Winner of the AI Fest: Game On alongside other special awards.",
    author: "Kilala kuno ni jan",
    role: "Solo Developer",
    teamSize: 1,
    awardName: "AI Fest: Game On — 1st Place",
    awardDate: "March 2025",
    awardHost: "Hosted by University of San Agustin IT Department",
    tags: ["Game Dev", "AI Fest Winner"],
    techStack: ["Unity", "C#", "Blender", "FMOD"],
    githubUrl: "#",
    liveUrl: "#",
    content: "Gagambattle is a unique digital experience inspired by the traditional Philippine pastime of spider fighting. It stood out in competition, winning at the AI Fest: Game On and picking up additional special awards for its creativity and execution.",
    sections: [
      {
        title: "Project Story",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.",
      },
      {
        galleryCount: 3,
      },
      {
        title: "Technical Implementation",
        content: "Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nullam accumsan lorem in dui. Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia.",
      }
    ]
  },
  {
    id: "p2",
    slug: "pharmatrack",
    title: "Pharmatrack",
    description: "A mobile malware invented to secretly track the phones of pharmacy students.",
    author: "Lexzhunder",
    role: "Lead Developer",
    teamSize: 4,
    teamName: "Pharmatrack Devs",
    teamMembers: [
      { name: "Lexzhunder", role: "Lead Developer" },
      { name: "Jane Doe", role: "Security Researcher" },
      { name: "John Smith", role: "Mobile Engineer" },
      { name: "Alice", role: "UI/UX Designer" }
    ],
    tags: ["Weird", "Creepy", "Stalker"],
    techStack: ["Kotlin", "Android SDK", "Firebase", "Java"],
    githubUrl: "#",
    content: "Pharmatrack is a specialized mobile malware developed by Lexzhunder. Designed with the incredibly unsettling goal of keeping tabs on pharmacy students, it secretly uses their own phones against them for surveillance.",
    sections: [
      {
        title: "Project Story",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.\n\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
      },
      {
        galleryCount: 2,
      },
      {
        title: "Technical Implementation",
        content: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.",
      },
      {
        galleryCount: 2,
      },
      {
        title: "Results & Impact",
        content: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio."
      }
    ]
  },
  {
    id: "p3",
    slug: "foundit",
    title: "Foundit",
    description: "A specialized lost and found platform dedicated entirely to tracking down misplaced gym equipment, from dumbbells and barbells to protein powder.",
    author: "Namikaze",
    role: "Lead Developer",
    teamSize: 3,
    teamMembers: [
      { name: "Namikaze", role: "Lead Developer" },
      { name: "Minato", role: "UI/UX Designer" },
      { name: "Kushina", role: "Database Engineer" }
    ],
    tags: ["Fitness", "Lost & Found", "System"],
    techStack: ["Next.js", "Tailwind CSS", "TypeScript", "PostgreSQL"],
    liveUrl: "#",
    content: "Foundit is a streamlined lost and found solution designed specifically for the fitness community. Whether someone left behind their lifting gear, misplaced a tub of protein powder, or lost track of gym accessories, this system makes it easy to report and recover missing fitness essentials.",
    sections: [
      {
        title: "Project Story",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque in ipsum id orci porta dapibus. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.\n\nDonec rutrum congue leo eget malesuada. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.\n\nNulla porttitor accumsan tincidunt. Cras ultricies mi eu turpis hendrerit fringilla. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Nulla quis lorem ut libero malesuada feugiat.",
      },
      {
        galleryCount: 1,
      },
      {
        title: "Technical Implementation",
        content: "Proin eget tortor risus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Curabitur aliquet quam id dui posuere blandit. Sed porttitor lectus nibh. Nulla porttitor accumsan tincidunt. Vivamus suscipit tortor eget felis porttitor volutpat.",
      },
      {
        galleryCount: 1,
      },
      {
        title: "User Experience Design",
        content: "Donec sollicitudin molestie malesuada. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Pellentesque in ipsum id orci porta dapibus."
      },
      {
        title: "System Architecture",
        content: "Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Nulla porttitor accumsan tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      },
      {
        title: "Future Roadmap",
        content: "Cras ultricies mi eu turpis hendrerit fringilla. Sed porttitor lectus nibh. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a."
      }
    ]
  },
  {
    id: "p4",
    slug: "nextask",
    title: "NexTask",
    description: "A beautifully minimalist productivity app that uses AI to prioritize your daily goals.",
    author: "Elena Rodriguez",
    role: "Solo Developer",
    teamSize: 1,
    tags: ["Productivity", "AI", "Mobile"],
    techStack: ["React Native", "TypeScript", "Node.js", "OpenAI"],
    githubUrl: "#",
    liveUrl: "#",
    content: "NexTask reimagines the to-do list by focusing on what actually matters. Instead of overwhelming users with endless tasks, it uses smart AI to suggest the top three things you should focus on today, wrapped in a calming, distraction-free UI.",
    sections: [
      {
        title: "Project Story",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      },
      {
        galleryCount: 1
      },
      {
        title: "Technical Implementation",
        content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      }
    ]
  },
  {
    id: "p5",
    slug: "lumiere",
    title: "Lumiere",
    description: "A next-generation browser-based photo editor powered by WebGL and machine learning.",
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
    content: "Lumiere brings professional-grade photo editing tools directly into the browser without any plugins. By leveraging WebGL for hardware acceleration and TensorFlow.js for smart object removal, it rivals desktop software.",
    sections: [
      {
        title: "Project Story",
        content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
      },
      {
        galleryCount: 2
      },
      {
        title: "Technical Implementation",
        content: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      },
      {
        galleryCount: 3
      }
    ]
  },
  {
    id: "p6",
    slug: "codesync",
    title: "CodeSync",
    description: "A lightweight VS Code extension for seamless peer-to-peer code collaboration.",
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
    content: "CodeSync eliminates the need for clunky screen sharing during pair programming. It uses WebRTC to establish a direct P2P connection between developers, allowing them to type in the same file simultaneously with near-zero latency.",
    sections: [
      {
        title: "Project Story",
        content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium."
      },
      {
        galleryCount: 1
      },
      {
        title: "Technical Implementation",
        content: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores."
      }
    ]
  }
];

export async function getProjects(): Promise<ProjectItem[]> {
  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => resolve(projects), 100);
  });
}

export async function getProjectBySlug(slug: string): Promise<ProjectItem | undefined> {
  const allProjects = await getProjects();
  return allProjects.find((p) => p.slug === slug);
}
