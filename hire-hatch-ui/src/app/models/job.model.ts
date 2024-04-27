export interface Job {
  id?: string;
  jobTitle: string;
  companyName: string;
  priority: string;
  status: string;
  postingUrl: string;
  source: string;
  salary: string;
  jobType: string;
  location: string;
  dateApplied?: Date;
  followUpDate?: Date;
  notes: string;
}
