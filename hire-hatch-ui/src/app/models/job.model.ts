export interface Job {
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
      "jobTitle": "Frontend Developer",
      "companyName": "Tech Innovations Inc.",
      "priority": "High",
      "status": "Submitted Application",
      "source": "LinkedIn",
      "postingUrl": "https://www.linkedin.com/jobs/12345",
      "notes": "Angular-focused team. Values collaboration and continuous learning. Good work-life balance."
    },
    {
      "jobTitle": "Angular Developer",
      "companyName": "Web Wizards Agency",
      "priority": "High",
      "status": "Interviewed",
      "source": "Glassdoor",
      "postingUrl": "https://www.glassdoor.com/jobs/67890",
      "notes": "Startup culture. Encourages candid dialogue. Flexible and remote. Great reviews."
    },
    {
      "jobTitle": "Full Stack Developer",
      "companyName": "Creative Minds Co.",
      "priority": "Medium",
      "status": "Prepping Interview",
      "source": "Company Website",
      "postingUrl": "https://www.webwizards.com/careers",
      "notes": ".NET Core and React in stack. Good salary. Offers annual tech conference tickets."
    },
    {
      "jobTitle": "Software Engineer",
      "companyName": "Digital Solutions Ltd.",
      "priority": "Medium",
      "status": "Offer Received",
      "source": "Indeed",
      "postingUrl": "https://www.indeed.com/jobs/54321",
      "notes": "Dynamic culture with emphasis on agile development. Competitive benefits."
    },
    {
      "jobTitle": "Lead Developer",
      "companyName": "InnovateTech Solutions",
      "priority": "Low",
      "status": "Reviewing Posting",
      "source": "CareerBuilder",
      "postingUrl": "https://www.careerbuilder.com/jobs/98765",
      "notes": "Offers mentorship programs, supports professional development."
    }
  ]
  