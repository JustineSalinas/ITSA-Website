import type { Officer } from "@/lib/types";
import { initials } from "@/lib/format";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
} from "@/components/icons/social";

const socialMeta = [
  { key: "facebook", label: "Facebook", Icon: FacebookIcon },
  { key: "instagram", label: "Instagram", Icon: InstagramIcon },
  { key: "linkedin", label: "LinkedIn", Icon: LinkedinIcon },
  { key: "github", label: "GitHub", Icon: GithubIcon },
] as const;

export function OfficerCard({ officer }: { officer: Officer }) {
  return (
    <Card className="group overflow-hidden text-center transition-shadow hover:shadow-md">
      <CardContent className="flex flex-col items-center px-6">
        <Avatar className="size-24 ring-2 ring-primary/10 ring-offset-2 ring-offset-card">
          {officer.photoUrl ? (
            <AvatarImage src={officer.photoUrl} alt={officer.name} />
          ) : null}
          <AvatarFallback className="bg-primary/10 text-lg font-bold text-primary">
            {initials(officer.name)}
          </AvatarFallback>
        </Avatar>

        <h3 className="mt-4 text-lg font-bold">{officer.name}</h3>
        <p className="text-sm font-medium text-primary">{officer.position}</p>

        {officer.bio && (
          <p className="mt-3 text-sm text-muted-foreground">{officer.bio}</p>
        )}

        <div className="mt-4 flex gap-1.5">
          {socialMeta.map(({ key, label, Icon }) => {
            const href = officer.socials?.[key];
            if (!href) return null;
            return (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={`${officer.name} on ${label}`}
                className="grid size-8 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
              >
                <Icon className="size-4" />
              </a>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
