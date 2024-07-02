export interface Job {
  id?: string;
  jobTitle: string;
  companyName: string;
  dateAdded?: Date;
  priority: string;
  status: string;
  postingUrl: string;
  lastUpdated?: Date;
  source: string;
  salary: string;
  jobType: string;
  location: string;
  dateApplied?: Date;
  followUpDate?: Date;
  notes: string;
}
