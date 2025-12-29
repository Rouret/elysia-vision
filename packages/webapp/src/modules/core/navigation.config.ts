import { HomePage } from "#/modules/homepage/HomePage";
import { RequestSectionPage } from "#/modules/request/RequestSectionPage";
import type { JSX } from "react";

type Path = {
  label: string;
  href: string;
  component: () => JSX.Element;
};

export const navigationConfig: Path[] = [
  {
    label: "Home",
    href: "/",
    component: HomePage,
  },
  {
    label: "Requests",
    href: "/requests-monitoring",
    component: RequestSectionPage,
  },
];
