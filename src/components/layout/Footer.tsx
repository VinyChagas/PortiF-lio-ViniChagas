import { BrandLogo } from '@/components/common/BrandLogo';
import { AmbientGlow } from '@/components/visual/AmbientGlow';
import { Container } from '@/components/ui/Container';
import { TextLink } from '@/components/ui/TextLink';
import { social } from '@/data/social';

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06]">
      <AmbientGlow tone="split" className="opacity-30" />
      <Container className="relative flex flex-col gap-10 py-14 md:flex-row md:items-end md:justify-between">
        <div className="space-y-5">
          <BrandLogo className="h-7 opacity-80" />
          <div>
            <p className="text-sm font-medium text-text-primary">Vinicius Chagas</p>
            <p className="mt-2 font-mono text-[0.68rem] tracking-[0.18em] text-text-muted uppercase">
              Software · Automação · IA
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
            {social.map((item) => (
              <li key={item.id}>
                {item.href ? (
                  <TextLink href={item.href} external={item.id !== 'email'}>
                    {item.label}
                  </TextLink>
                ) : (
                  <span className="text-text-muted">{item.label}</span>
                )}
              </li>
            ))}
          </ul>
          <p id="argus" className="max-w-sm text-xs leading-relaxed text-text-muted">
            Argus — uma forma de perguntar sobre projetos e experiência. Integração na próxima
            versão.
          </p>
        </div>
      </Container>
    </footer>
  );
}
