import { SectionIntro } from '@/components/ui/SectionIntro';

type SectionHeadingProps = {
  index: string;
  label: string;
  title?: string;
  description?: string;
  className?: string;
};

export function SectionHeading({ index, label, title, description, className }: SectionHeadingProps) {
  return (
    <SectionIntro
      number={index}
      label={label}
      title={title}
      description={description}
      className={className}
    />
  );
}
