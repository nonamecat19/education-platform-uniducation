import { SidebarLink } from "@/components/SidebarItems";
import { Cog, Globe, HomeIcon } from "lucide-react";

type AdditionalLinks = {
  title: string;
  links: SidebarLink[];
};

export const defaultLinks: SidebarLink[] = [
  { href: "/dashboard", title: "Home", icon: HomeIcon },
  { href: "/account", title: "Account", icon: Cog },
  { href: "/settings", title: "Settings", icon: Cog },
];

export const additionalLinks: AdditionalLinks[] = [
  {
    title: "Entities",
    links: [
      {
        href: "/students",
        title: "Students",
        icon: Globe,
      },
      {
        href: "/groups",
        title: "Groups",
        icon: Globe,
      },
      {
        href: "/teachers",
        title: "Teachers",
        icon: Globe,
      },
      {
        href: "/teacher",
        title: "Teacher",
        icon: Globe,
      },
    ],
  },

];

