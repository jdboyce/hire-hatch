import { TestBed } from '@angular/core/testing';
import { JobService } from './job.service';
import { Job } from '../models/job.model';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

describe('JobService', () => {
  let service: JobService;
  let httpMock: HttpTestingController;
  const mockJobs: Job[] = [
    {
      id: 'd9f3d0c2-7b6e-4b1e-9c3e-8d7f6c5e4d3d',
      jobTitle: 'Full Stack Developer',
      companyName: 'Creative Minds Co.',
      priority: 'Medium',
      status: 'Prepping Interview',
      postingUrl: 'https://www.webwizards.com/careers',
      source: 'Company Website',
      salary: '$100,000',
      type: 'Contract',
      location: 'Hybrid (Charlotte, NC)',
      dateApplied: new Date('2024-02-06T00:00:00-05:00'),
      followUpDate: undefined,
      notes:
        '.NET Core and React in stack. Good salary. Offers annual tech conference tickets.',
    },
    {
      id: 'b4c2b0a4-3d6e-4c1e-9b3e-8a7f6b5c4a3b',
      jobTitle: 'Software Engineer',
      companyName: 'Digital Solutions Ltd.',
      priority: 'Medium',
      status: 'Offer Received',
      postingUrl: 'https://www.indeed.com/jobs/54321',
      source: 'Indeed',
      salary: '$85,000',
      type: 'Full-time',
      location: 'Remote',
      dateApplied: new Date('2024-02-06T00:00:00-05:00'),
      followUpDate: new Date('2024-02-19T00:00:00-05:00'),
      notes:
        'Dynamic culture with emphasis on agile development. Competitive benefits.',
    },
    {
      id: 'dfd1aced-c9b2-48cf-9029-789a9fe4d4de',
      jobTitle: 'Lead Developer',
      companyName: 'InnovateTech Solutions',
      priority: 'Low',
      status: 'Reviewing Posting',
      postingUrl: 'https://www.careerbuilder.com/jobs/98765',
      source: 'CareerBuilder',
      salary: '$40/hour',
      type: 'Part-time',
      location: 'On-site (Charlotte, NC)',
      dateApplied: undefined,
      followUpDate: undefined,
      notes: 'Offers mentorship programs, supports professional development.',
    },
  ];

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

  describe('service setup', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('getJobs', () => {
    it('should retrieve jobs from API via GET', () => {
      service.getJobs().subscribe((jobs) => {
        expect(jobs.length).toBe(3);
        expect(jobs).toEqual(mockJobs);
      });

      const request = httpMock.expectOne(`http://localhost:3000/jobs`);
      expect(request.request.method).toBe('GET');
      request.flush(mockJobs);
    });
  });

  describe('selectJob', () => {
    it('should select a job', () => {
      service.selectJob(mockJobs[2]);
      service.selectedJob$.subscribe((selectedJob) => {
        expect(selectedJob).toEqual(mockJobs[2]);
      });
    });
  });

  describe('loadData', () => {
    it('should load data and select a job', () => {
      const selectedJobId = mockJobs[1].id;
      spyOn(service, 'getJobs').and.returnValue(of(mockJobs));
      spyOn(service, 'selectJob');

      service.loadData(selectedJobId);

      expect(service.getJobs).toHaveBeenCalled();
      expect(service.selectJob).toHaveBeenCalledWith(mockJobs[1]);
    });

    it('should load data and select the first job if no id is provided', () => {
      spyOn(service, 'getJobs').and.returnValue(of(mockJobs));
      spyOn(service, 'selectJob');

      service.loadData();

      expect(service.getJobs).toHaveBeenCalled();
      expect(service.selectJob).toHaveBeenCalledWith(mockJobs[0]);
    });
  });

  describe('saveJob', () => {
    it('should save a job and reload data', () => {
      const jobToSave = mockJobs[0];
      spyOn(service, 'loadData');

      service.saveJob(jobToSave).subscribe((job) => {
        expect(job).toEqual(jobToSave);
        expect(service.loadData).toHaveBeenCalledWith(jobToSave.id);
      });

      const req = httpMock.expectOne(
        `http://localhost:3000/jobs/${jobToSave.id}`
      );
      expect(req.request.method).toBe('PUT');
      req.flush(jobToSave);
    });

    it('should handle error when saving a job fails', () => {
      const jobToSave = mockJobs[0];
      const mockError = 'test 404 error';

      service.saveJob(jobToSave).subscribe(
        () => fail('should have failed with 404 error'),
        (error: HttpErrorResponse) => {
          expect(error.status).toEqual(404);
          expect(error.error).toContain(mockError);
        }
      );

      const req = httpMock.expectOne(
        `http://localhost:3000/jobs/${jobToSave.id}`
      );
      expect(req.request.method).toBe('PUT');
      req.flush(mockError, { status: 404, statusText: 'Not Found' });
    });
  });
});
