// The shape of one job. Written once here, imported everywhere else.
export type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
};
