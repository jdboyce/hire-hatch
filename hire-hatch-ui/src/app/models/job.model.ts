export interface Job {
  id: string;
  jobTitle: string;
  companyName: string;
  priority: string;
  status: string;
  source: string;
  postingUrl: string;
  notes: string;
}

export const MOCK_DATA: Job[] = [
  {
    id: '3107346e-69ca-4559-bf77-36ff01cfed22',
    jobTitle: 'Frontend Developer',
    companyName: 'Tech Innovations Inc.',
    priority: 'High',
    status: 'Submitted Application',
    source: 'LinkedIn',
    postingUrl: 'https://www.linkedin.com/jobs/12345',
    notes:
      'Angular-focused team. Values collaboration and continuous learning. Good work-life balance.',
  },
  {
    id: 'a6e5e5a0-5c1d-4f6e-8e5f-7e7f8c6e9c7e',
    jobTitle: 'Angular Developer',
    companyName: 'Web Wizards Agency',
    priority: 'High',
    status: 'Interviewed',
    source: 'Glassdoor',
    postingUrl: 'https://www.glassdoor.com/jobs/67890',
    notes:
      'Startup culture. Encourages candid dialogue. Flexible and remote. Great reviews.',
  },
  {
    id: 'd9f3d0c2-7b6e-4b1e-9c3e-8d7f6c5e4d3d',
    jobTitle: 'Full Stack Developer',
    companyName: 'Creative Minds Co.',
    priority: 'Medium',
    status: 'Prepping Interview',
    source: 'Company Website',
    postingUrl: 'https://www.webwizards.com/careers',
    notes:
      '.NET Core and React in stack. Good salary. Offers annual tech conference tickets.',
  },
  {
    id: 'b4c2b0a4-3d6e-4c1e-9b3e-8a7f6b5c4a3b',
    jobTitle: 'Software Engineer',
    companyName: 'Digital Solutions Ltd.',
    priority: 'Medium',
    status: 'Offer Received',
    source: 'Indeed',
    postingUrl: 'https://www.indeed.com/jobs/54321',
    notes:
      'Dynamic culture with emphasis on agile development. Competitive benefits.',
  },
  {
    id: 'dfd1aced-c9b2-48cf-9029-789a9fe4d4de',
    jobTitle: 'Lead Developer',
    companyName: 'InnovateTech Solutions',
    priority: 'Low',
    status: 'Reviewing Posting',
    source: 'CareerBuilder',
    postingUrl: 'https://www.careerbuilder.com/jobs/98765',
    notes: 'Offers mentorship programs, supports professional development.',
  },
];
