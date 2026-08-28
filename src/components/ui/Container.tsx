import { cn } from "@/lib/utils";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section";
  id?: string;
};

export default function Container({
  children,
  className,
  as: Tag = "div",
  id,
}: ContainerProps) {
  return (
    <Tag
      id={id}
      className={cn("mx-auto w-full max-w-360 px-5 sm:px-8 lg:px-12", className)}
    >
      {children}
    </Tag>
  );
}
