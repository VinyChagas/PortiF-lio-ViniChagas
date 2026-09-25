export type ExperiencePeriod = {
  start: string;
  end: string | null;
  label: string;
};

export type ExperienceEntry = {
  id: string;
  organization: string;
  role: string;
  period: ExperiencePeriod;
  summary: string;
};
