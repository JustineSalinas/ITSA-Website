import type { EventItem } from "@/lib/types";

// Real ITSA events only -- no invented workshops, dates, or locations.
// Soonest first; add new events here.
export const localEvents: EventItem[] = [
  {
    id: "reachit-meet-the-machines",
    slug: "reachit-meet-the-machines",
    title: "ReachIT: Meet the Machines",
    description:
      "ReachIT: Meet the Machines is a robotics programming outreach initiative that aims to introduce Senior High School students to the fundamentals of robotics, programming, and problem-solving through hands-on learning activities. Participants will explore basic robot components, motors, sensors, and movement while learning how to program, test, and control robotic systems.\nThe initiative is led by Theodore Samuel Navarro and organized in collaboration with SACEO, DEVCON Iloilo, and Holotech Society, with the goal of making technology and STEM education more accessible to students. Through guided programming sessions and a team-based robotics challenge, participants will have the opportunity to apply what they learn, work with their teammates, and discover their interest in robotics and technology.",
    eventDate: "2026-11-06",
    location: "Tigbauan National High School, Tigbauan, Iloilo",
    attendees: "40 Senior High School Students",
    projectLead: "Theodore Samuel Navarro",
    itsaRole: "Organizer and Robotics Programming Mentors",
    partners: ["SACEO", "DEVCON Iloilo", "Holotech Society"],
    sdgs: ["SDG 4: Quality Education", "SDG 17: Partnerships for the Goals"],
    highlights: [
      { icon: "🤖", title: "Robotics Fundamentals", description: "Discover the basic components of robots, including motors, sensors, and how different parts work together to perform tasks." },
      { icon: "💻", title: "Basic Robotics Programming", description: "Learn how commands, sequences, conditions, and loops can be used to control robot movements and behavior." },
      { icon: "🛠️", title: "Hands-on Robotics Challenge", description: "Work in teams to program, test, and troubleshoot robots as they complete assigned tasks, encouraging logical thinking and problem-solving." },
      { icon: "🤝", title: "Teamwork & Collaboration", description: "Build communication and teamwork skills while working with fellow participants and ITSA mentors throughout the activities." },
      { icon: "🎓", title: "Community Outreach & STEM Education", description: "ITSA collaborates with partner organizations to provide students with practical learning opportunities and early exposure to robotics and technology." },
    ],
  },
];
