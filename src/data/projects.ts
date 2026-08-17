export interface ProjectSection {
  title?: string;
  content?: string;
  galleryCount?: number;
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  author: string;
  tags: string[];
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
    tags: ["Game Dev", "AI Fest Winner"],
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
    tags: ["Weird", "Creepy", "Stalker"],
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
    tags: ["Fitness", "Lost & Found", "System"],
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
