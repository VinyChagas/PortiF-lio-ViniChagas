import { Reveal } from '@/components/animations/Reveal';
import { TechnologyGroup } from '@/components/technology/TechnologyGroup';
import { Container } from '@/components/ui/Container';
import { SectionIntro } from '@/components/ui/SectionIntro';
import { AmbientGlow } from '@/components/visual/AmbientGlow';
import { SectionIndex } from '@/components/visual/SectionIndex';
import { TechnicalGrid } from '@/components/visual/TechnicalGrid';
import { technologyGroups } from '@/data/technologies';

export function TechnologyEcosystem() {
  return (
    <section id="tecnologias" className="relative scroll-mt-24 overflow-x-clip py-[var(--section-gap-md)]">
      <TechnicalGrid className="opacity-50" />
      <AmbientGlow tone="split" className="opacity-40" />
      <SectionIndex value="03" />

      <Container className="relative">
        <Reveal>
          <SectionIntro
            number="03"
            label="Ecossistema"
            title="Cinco domínios."
            description="Do modelo à infraestrutura. Cada grupo é uma parte do trabalho."
          />
        </Reveal>

        <div className="relative z-10 mt-8 grid grid-cols-1 items-start gap-4 md:mt-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {technologyGroups.map((group, index) => (
            <Reveal key={group.id} delay={index * 0.05} className="h-full">
              <TechnologyGroup
                index={String(index + 1).padStart(2, '0')}
                label={group.label}
                ids={group.ids}
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
