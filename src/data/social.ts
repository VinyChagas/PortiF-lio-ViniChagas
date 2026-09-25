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
    href: null,
  },
  {
    id: 'email',
    label: 'E-mail',
    href: 'mailto:vinicius179179@gmail.com',
  },
];

export const contactEmail = 'vinicius179179@gmail.com';
