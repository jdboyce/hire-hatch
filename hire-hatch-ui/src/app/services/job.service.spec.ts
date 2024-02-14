import { TestBed } from '@angular/core/testing';
import { JobService } from './job.service';
import { Job } from '../models/job.model';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('JobService', () => {
  let service: JobService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [JobService],
    });
    service = TestBed.inject(JobService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve jobs from API via GET', () => {
    const mockJobs: Job[] = [
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
    ];

    service.getJobs().subscribe((jobs) => {
      expect(jobs.length).toBe(2);
      expect(jobs).toEqual(mockJobs);
    });

    const request = httpMock.expectOne(`http://localhost:3000/jobs`);
    expect(request.request.method).toBe('GET');
    request.flush(mockJobs);
  });

  it('should select a job', () => {
    const mockJob: Job = {
      id: 'dfd1aced-c9b2-48cf-9029-789a9fe4d4de',
      jobTitle: 'Lead Developer',
      companyName: 'InnovateTech Solutions',
      priority: 'Low',
      status: 'Reviewing Posting',
      source: 'CareerBuilder',
      postingUrl: 'https://www.careerbuilder.com/jobs/98765',
      notes: 'Offers mentorship programs, supports professional development.',
    };

    service.selectJob(mockJob);
    service.selectedJob$.subscribe((selectedJob) => {
      expect(selectedJob).toEqual(mockJob);
    });
  });
});
