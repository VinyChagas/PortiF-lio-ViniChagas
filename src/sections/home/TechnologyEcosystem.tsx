import { Reveal } from '@/components/animations/Reveal';
import { TechnologyGroup } from '@/components/technology/TechnologyGroup';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AmbientGlow } from '@/components/visual/AmbientGlow';
import { SectionIndex } from '@/components/visual/SectionIndex';
import { TechnicalGrid } from '@/components/visual/TechnicalGrid';
import { technologyGroups } from '@/data/technologies';

export function TechnologyEcosystem() {
  return (
    <section id="tecnologias" className="relative scroll-mt-24 overflow-x-clip py-[var(--space-section)]">
      <TechnicalGrid className="opacity-50" />
      <AmbientGlow tone="split" className="opacity-40" />
      <SectionIndex value="03" />

      <Container className="relative">
        <Reveal>
          <SectionHeading
            index="03"
            label="Ecossistema"
            description="Do modelo à infraestrutura. Cada grupo é uma parte do trabalho."
          />
        </Reveal>

        <div className="relative z-10 mt-10 md:mt-14">
          {technologyGroups.map((group, index) => (
            <Reveal key={group.id} delay={index * 0.06}>
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
