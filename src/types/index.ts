export type NavLink = {
  label: string;
  href: string;
};

export type NavDropdown = {
  label: string;
  items: NavLink[];
};

export type ProjectBadge = {
  number: string;
  label: string;
  author: string;
  avatar?: string;
};

export type ProjectMedia =
  | {
      type: "image";
      src: string;
      alt?: string;
    }
  | {
      type: "video";
      videoId: string;
      poster?: string;
    }
  | {
      type: "file";
      src: string;
      poster?: string;
    };

export type Project = {
  id: string;
  title: string;
  year: string;
  href?: string;
  metaPosition: "top" | "bottom";
  media: ProjectMedia;
  badge?: ProjectBadge;
};

export type ServiceItem = {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  categories: string[];
};

export type StatItem = {
  id: string;
  number: string;
  value: number;
  suffix: string;
  decimals?: number;
  label: string;
  description: string;
};

export type ProcessStep = {
  step: string;
  title: string;
  titleLines?: string[];
  description: string;
};

export type TestimonialSocial = {
  label: string;
  href: string;
};

export type TestimonialProfile = {
  name: string;
  role: string;
  avatar: string;
  socials: TestimonialSocial[];
};

export type TestimonialQuote = {
  company: string;
  rating: number;
  text: string;
};

export type TestimonialColumn = {
  order: Array<"profile" | "quote">;
  profile: TestimonialProfile;
  quote: TestimonialQuote;
};

export type Testimonial = {
  quote: string;
  rating: number;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
};

export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  date: string;
  image: string;
  href: string;
  excerpt?: string;
  featured?: boolean;
  content?: {
    intro?: string;
    sections: {
      heading: string;
      paragraphs: string[];
    }[];
  };
};

export type SocialLink = {
  label: string;
  href: string;
  viewBox: string;
  path: string;
};

export type AwardItem = {
  organization: string;
  title: string;
  category: string;
  type: string;
  year: string;
};

export type AwardSummary = {
  id: string;
  label: string;
  value: number;
  suffix: string;
};

export type IndustryItem = {
  icon?: string;
  title: string;
  description: string;
};

export type SolutionItem = {
  number: string;
  title: string;
  description: string;
  href: string;
};

export type ResultStatItem = {
  id: string;
  value: number;
  suffix: string;
  label: string;
};

export type PageHeroContent = {
  title: string;
  eyebrow: string;
  quote: string;
  image: string;
  imageAlt: string;
  /** CSS object-position value, e.g. "center", "bottom center", "50% 80%" */
  imagePosition?: string;
};

export type AwardsSectionContent = {
  title: string;
  eyebrow: string;
  items: AwardItem[];
};

export type IndustriesSectionContent = {
  title: string;
  eyebrow: string;
  description: string;
  items: IndustryItem[];
};

export type SolutionsSectionContent = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  challengeCta: {
    label: string;
    link: string;
    href: string;
  };
  items: SolutionItem[];
  results: {
    title: string;
    items: ResultStatItem[];
  };
  linkLabel?: string;
};

export type ServiceHighlight = {
  label: string;
  value: string;
};

export type ServiceCapability = {
  title: string;
  description: string;
};

export type ServiceProcessStep = {
  step: string;
  title: string;
  description: string;
};

export type ServiceLayout =
  | "editorial"
  | "device"
  | "bento"
  | "stack"
  | "gallery"
  | "funnel"
  | "web-solutions";

export type ServicePageContent = {
  slug: string;
  title: string;
  shortTitle: string;
  eyebrow: string;
  tagline: string;
  description: string;
  heroImage: string;
  heroImagePosition?: string;
  layout: ServiceLayout;
  ctaLabel: string;
  highlights: ServiceHighlight[];
  capabilities: ServiceCapability[];
  process: ServiceProcessStep[];
  outcomes: string[];
};
