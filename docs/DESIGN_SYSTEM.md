# Design System — V0.1

## Filosofia

A identidade digital de Vinicius Chagas deve parecer **tecnologia cinematográfica minimalista**.

O site respira. Poucos elementos, bem compostos. Tipografia, espaço negativo, a paisagem da marca e movimento extremamente controlado fazem o trabalho. Azul e laranja aparecem como luz, não como preenchimento.

Dois universos se encontram:

- **Azul** — tecnologia, engenharia, precisão, estrutura, software.
- **Laranja** — transformação, impacto, negócio, resultado, criatividade.

O centro é a convergência. O oceano digital é a superfície onde isso acontece.

## O que evitar

Templates de portfólio, dashboard SaaS, neon, Matrix, terminal, partículas, glassmorphism excessivo, cards em série, skill bars, métricas inventadas e gradiente em todo texto.

Se houver conflito entre efeito e sofisticação, prevalece a sofisticação.

## Cores

Tokens semânticos em `src/styles/tokens.css`. Não espalhar hex avulso pelos componentes.

| Token | Uso |
| --- | --- |
| `--background` | Fundo principal, próximo de preto |
| `--background-soft` | Superfície editorial discreta |
| `--surface` / `--surface-hover` | Blocos raros, hover de case |
| `--text-primary` | Títulos e texto principal |
| `--text-secondary` | Corpo e apoio |
| `--text-muted` | Eyebrows, meta, números |
| `--brand-blue` | Meia-noite, estrutura |
| `--brand-cyan` | Luz elétrica, foco, azul à esquerda |
| `--brand-orange` | Impacto, laranja à direita |
| `--brand-orange-light` | Destaque pontual |
| `--border-subtle` | Filetes quase invisíveis |
| `--glow-blue` / `--glow-orange` | Iluminação, nunca preenchimento |

O fundo do site permanece preto. Azul e laranja não tomam a página.

Na V0.1, os valores foram derivados da identidade descrita e da composição do oceano (céu escuro acima, azul à esquerda, laranja à direita). Quando `background-ocean.png` e `logo-vc.png` estiverem no repositório, os tokens devem ser recalibrados por amostragem direta desses arquivos — sem alterar os assets.

## Tipografia

- **Plus Jakarta Sans** — interface, títulos, números, navegação.
- **Instrument Serif** — citação editorial da seção Sobre e o fecho “Vamos conversar.”

Títulos principais usam `clamp()` e tracking negativo. Eyebrows usam caixa alta e tracking aberto.

## Espaçamento

- Container: `70rem`, com `px-6` / `md:px-8`.
- Seções: `--space-section` (`clamp(5.5rem, 12vw, 9.5rem)`).
- Em ultrawide, o texto não se espalha: o container segura a medida.

## Radius

- `0.375rem` em botões e filetes.
- `0.65rem` no retrato.
- `0.75rem` apenas quando um bloco precisa de um pouco mais de ar.

Cantos quase retos. Nada de pílula.

## Sombras e glows

Sombra única, profunda e escura, só no retrato. Glows azul/laranja são radiais de baixa opacidade, com respiração lenta no Hero. Nunca uma borda brilhante em volta de tudo.

## Movimento

- Entrada: `0.8–0.95s`, easing `[0.22, 1, 0.36, 1]`, delays curtos.
- Oceano: deriva de ~42s.
- Links: cor/opacidade.
- Botões: `1px` de elevação e glow controlado.
- Cases: poucos pixels e borda mais clara.

`prefers-reduced-motion` desliga deriva, glows, parallax de cursor e offsets de entrada.

## Breakpoints de referência

375, 768, 1024, 1440 e 1920. O Hero preserva céu acima e oceano abaixo em todas elas. No mobile, o texto continua protagonista.

## Regras de azul e laranja

1. O site não vira azul.
2. Azul habita a esquerda; laranja, a direita — sobretudo no Hero e no CTA final.
3. Cases podem herdar um filete: laranja para impacto/negócio, azul para engenharia.
4. A logo nunca recebe filtro que altere suas cores.
5. O oceano não deve ser coberto por grid, código ou overlay pesado.
