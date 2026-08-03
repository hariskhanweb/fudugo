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
  description: string;
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
  title: string;
  category: string;
  date: string;
  image: string;
  href: string;
};

export type SocialLink = {
  label: string;
  href: string;
  viewBox: string;
  path: string;
};
