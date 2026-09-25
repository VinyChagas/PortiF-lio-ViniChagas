export type SocialLink = {
  id: 'github' | 'linkedin' | 'email';
  label: string;
  href: string | null;
};

export const social: SocialLink[] = [
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/VinyChagas',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/vinychagasoficial',
  },
  {
    id: 'email',
    label: 'E-mail',
    href: 'mailto:vinychagasoficial@gmail.com',
  },
];

export const contactEmail = 'vinychagasoficial@gmail.com';
