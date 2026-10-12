export type ExperiencePeriod = {
  start: string;
  end: string | null;
  label: string;
};

export type ExperienceMetric = {
  value: string;
  label: string;
};

export type ExperienceEntry = {
  id: string;
  organization: string;
  role: string;
  location: string;
  stage: string;
  period: ExperiencePeriod;
  summary: string;
  metrics?: ExperienceMetric[];
};

export type EducationEntry = {
  id: string;
  institution: string;
  course: string;
  period: string;
  note?: string;
};
