import { Button } from '@/components/ui/Button';

type ArgusCtaProps = {
  className?: string;
};

export function ArgusCta({ className }: ArgusCtaProps) {
  return (
    <Button href="#argus" variant="ghost" className={className}>
      Conheça o Argus
      <span aria-hidden="true" className="ml-2 text-brand-orange-light">
        ✦
      </span>
    </Button>
  );
}
