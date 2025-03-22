type TProjectStatus = 'progressing' | 'completed' | 'canceled';

interface Project {
  id: stirng;
  shortName: string;
  companyId: string;
  name: string;
  description: string;
  budget: number;
  status: TProjectStatus;
  createdAt: string;
  updatedAt: string;
}
