import { ApiAddressForm } from "#/modules/homepage/components/ApiAddressForm";
import { GITHUB_URL, VERSION } from "#/shared/constants";
import { GraduationCap, Info, Star } from "lucide-react";
import toast from "react-hot-toast";

type Link = {
  icon: React.ReactNode;
  label: string;
  href: string | null;
};

const links: Link[] = [
  {
    icon: <GraduationCap color="white" size={16} />,
    label: "Documentation",
    href: GITHUB_URL,
  },
  {
    icon: <Info color="white" size={16} />,
    label: "How to use",
    href: GITHUB_URL,
  },
  {
    icon: <Star color="white" size={16} />,
    label: "Star the project",
    href: GITHUB_URL,
  },
];

export const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-10">
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-2xl font-bold">Welcome to Elysia Vision </h1>
        <div className="badge badge-neutral">v{VERSION}</div>
      </div>
      <div className="flex items-start justify-start gap-8">
        <ul className="menu bg-base-200 rounded-box w-56">
          {links.map((link) => (
            <li>
              <a
                href={link.href ?? undefined}
                onClick={() => {
                  if (link.href) return;
                  toast.error("This link is not available yet");
                }}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.icon}
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <ApiAddressForm />
    </div>
  );
};
