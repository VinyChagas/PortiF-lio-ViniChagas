import { SiteShell } from '@/components/layout/SiteShell';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

export function NotFoundPage() {
  return (
    <SiteShell>
      <main id="conteudo" className="flex min-h-[100svh] items-center">
        <Container>
          <p className="type-label tracking-[0.16em] text-text-secondary uppercase">404</p>
          <h1 className="mt-5 max-w-[12ch] text-[clamp(2.4rem,7vw,4.5rem)] leading-[0.96] font-semibold tracking-[-0.04em]">
            Esta página ainda não existe.
          </h1>
          <p className="mt-6 max-w-md text-text-secondary">
            Esse endereço não corresponde a nenhuma página do portfólio.
          </p>
          <div className="mt-10">
            <Button href="/">Voltar à Home</Button>
          </div>
        </Container>
      </main>
    </SiteShell>
  );
}
