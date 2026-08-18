import { ReactNode } from "react";
import { SmoothScroll } from "@/components/projects/smooth-scroll";

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return (
    <SmoothScroll>
      {children}
    </SmoothScroll>
  );
}
