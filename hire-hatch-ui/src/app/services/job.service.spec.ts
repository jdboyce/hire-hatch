import { TestBed } from '@angular/core/testing';
import { JobService } from './job.service';
import { Job } from '../models/job.model';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from './notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DropdownOptions } from '../models/dropdown-options.model';

describe('JobService', () => {
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
  const mockDropdownOptions: DropdownOptions = {
    types: ['Full-time', 'Part-time'],
    priorities: ['High', 'Medium', 'Low'],
    statuses: ['Submitted Application', 'Interviewed', 'Offer Accepted'],
  };

  let service: JobService;
  let httpMock: HttpTestingController;
  let mockGetJobs: jasmine.Spy;
  let notificationService: jasmine.SpyObj<NotificationService>;

  beforeEach(() => {
    const notificationSpy = jasmine.createSpyObj('NotificationService', [
      'showConfirmation',
    ]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        JobService,
        {
          provide: MatDialog,
          useValue: {
            open: () => ({ afterClosed: () => of(true) }),
          },
        },
        {
          provide: MatSnackBar,
          useValue: { open: () => {} },
        },
        { provide: NotificationService, useValue: notificationSpy },
      ],
    });
    service = TestBed.inject(JobService);
    httpMock = TestBed.inject(HttpTestingController);
    notificationService = TestBed.inject(
      NotificationService
    ) as jasmine.SpyObj<NotificationService>;
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

    it('should handle errors', () => {
      const mockError = new ProgressEvent('Network error');

      service.getJobs().subscribe({
        next: () => fail('should have failed with the network error'),
        error: (error: HttpErrorResponse) => {
          expect(error.error).toBe(mockError);
        },
      });

      const request = httpMock.expectOne('http://localhost:3000/jobs');
      request.error(mockError);
    });
  });

  describe('getDropdownOptions', () => {
    it('should retrieve dropdown options from API via GET', () => {
      service.getDropdownOptions().subscribe((options) => {
        expect(options).toEqual(mockDropdownOptions);
      });

      const request = httpMock.expectOne(
        `http://localhost:3000/dropdown-options`
      );
      expect(request.request.method).toBe('GET');
      request.flush(mockDropdownOptions);
    });

    it('should handle errors', () => {
      const mockError = new ProgressEvent('Network error');

      service.getDropdownOptions().subscribe({
        next: () => fail('should have failed with the network error'),
        error: (error: HttpErrorResponse) => {
          expect(error.error).toBe(mockError);
        },
      });

      const request = httpMock.expectOne(
        'http://localhost:3000/dropdown-options'
      );
      request.error(mockError);
    });
  });

  describe('selectJob', () => {
    it('should call selectedJob.next with the job when newJobSelected is false', () => {
      const job = { ...mockJobs[0] };
      service.newJobSelected = false;
      spyOn(service['selectedJob'], 'next');
      service.selectJob(job);

      expect(service['selectedJob'].next).toHaveBeenCalledWith(job);
    });

    it('should not call selectedJob.next when newJobSelected is true', () => {
      const job = { ...mockJobs[0] };
      service.newJobSelected = true;
      spyOn(service['selectedJob'], 'next');

      service.selectJob(job);

      expect(service['selectedJob'].next).not.toHaveBeenCalled();
    });
  });

  describe('deselectJob', () => {
    it('should call discardNewJob if newJobSelected is true', () => {
      service.newJobSelected = true;
      spyOn(service, 'discardNewJob');

      service.deselectJob();

      expect(service.discardNewJob).toHaveBeenCalled();
    });

    it('should set selectedJob to null if newJobSelected is false', (done) => {
      service.newJobSelected = false;

      service.deselectJob();

      service.selectedJob$.subscribe((job) => {
        expect(job).toBeNull();
        done();
      });
    });
  });

  describe('loadData', () => {
    beforeEach(() => {
      mockGetJobs = spyOn(service, 'getJobs');
    });

    it('should convert date strings to Date objects, call jobsSubject.next and selectJob with the first job when jobs are returned and selectedJobId is not provided', () => {
      const jobs = [...mockJobs];
      mockGetJobs.and.returnValue(of(jobs));
      spyOn(service['jobsSubject'], 'next');
      spyOn(service, 'selectJob');

      service.loadData();

      const convertedJobs = jobs.map((job) => ({
        ...job,
        dateApplied: job.dateApplied
          ? new Date(job.dateApplied)
          : job.dateApplied,
        followUpDate: job.followUpDate
          ? new Date(job.followUpDate)
          : job.followUpDate,
      }));

      expect(service['jobsSubject'].next).toHaveBeenCalledWith(convertedJobs);
      expect(service.selectJob).toHaveBeenCalledWith(convertedJobs[0]);
    });

    it('should convert date strings to Date objects, call jobsSubject.next and selectJob with the selected job when jobs are returned and selectedJobId is provided', () => {
      const jobs = [...mockJobs];
      const selectedJobId = jobs[1].id;
      mockGetJobs.and.returnValue(of(jobs));
      spyOn(service['jobsSubject'], 'next');
      spyOn(service, 'selectJob');

      service.loadData(selectedJobId);

      const convertedJobs = jobs.map((job) => ({
        ...job,
        dateApplied: job.dateApplied
          ? new Date(job.dateApplied)
          : job.dateApplied,
        followUpDate: job.followUpDate
          ? new Date(job.followUpDate)
          : job.followUpDate,
      }));

      expect(service['jobsSubject'].next).toHaveBeenCalledWith(convertedJobs);
      expect(service.selectJob).toHaveBeenCalledWith(convertedJobs[1]);
    });

    it('should call jobsSubject.next with an empty array and selectedJob.next with null when no jobs are returned', () => {
      mockGetJobs.and.returnValue(of([]));
      spyOn(service['jobsSubject'], 'next');
      spyOn(service['selectedJob'], 'next');

      service.loadData();

      expect(service['jobsSubject'].next).toHaveBeenCalledWith([]);
      expect(service['selectedJob'].next).toHaveBeenCalledWith(null);
    });
  });

  describe('saveJob', () => {
    it('should update job via PUT request when job has an ID', () => {
      const consoleErrorSpy = spyOn(console, 'error');
      const loadDataSpy = spyOn(service, 'loadData');
      const mockJob = mockJobs[0];

      service.saveJob(mockJob).subscribe();

      const req = httpMock.expectOne(
        `http://localhost:3000/jobs/${mockJob.id}`
      );
      expect(req.request.method).toBe('PUT');
      req.flush(mockJob);

      expect(loadDataSpy).toHaveBeenCalledWith(mockJob.id);
      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    it('should create the job via POST when the job does not have an ID', () => {
      const job = { ...mockJobs[0], id: undefined };
      const createdJob = { ...job, id: '123' };
      spyOn(service, 'loadData');

      service.saveJob(job).subscribe((savedJob) => {
        expect(savedJob).toEqual(createdJob);
      });

      const request = httpMock.expectOne(`http://localhost:3000/jobs`);
      expect(request.request.method).toBe('POST');
      request.flush(createdJob);

      expect(service.loadData).toHaveBeenCalledWith(createdJob.id);
    });
  });

  describe('addJob', () => {
    it('should add a new job and select it', () => {
      const currentJobs = [mockJobs[0], mockJobs[1]];
      service['jobsSubject'].next(currentJobs);
      service['newJobSelected'] = false;

      service.addJob();

      service.jobs$.subscribe((jobs) => {
        expect(jobs.length).toBe(3);
        expect(jobs[0].jobTitle).toBe('New Job');
      });

      service.selectedJob$.subscribe((job) => {
        expect(job).toEqual(jasmine.objectContaining({ jobTitle: 'New Job' }));
      });
    });
  });

  describe('discardNewJob', () => {
    it('should discard a new job and select the first existing job', () => {
      const newJob: Job = {
        jobTitle: 'New Job',
        companyName: '',
        priority: '',
        status: '',
        postingUrl: '',
        source: '',
        salary: '',
        type: '',
        location: '',
        notes: '',
      };
      const currentJobs = [newJob, ...mockJobs];
      service['jobsSubject'].next(currentJobs);
      service['newJobSelected'] = true;

      service.discardNewJob();

      service.jobs$.subscribe((jobs) => {
        expect(jobs.length).toBe(mockJobs.length);
        expect(jobs[0].jobTitle).toBe(mockJobs[0].jobTitle);
      });

      service.selectedJob$.subscribe((job) => {
        expect(job).toEqual(
          jasmine.objectContaining({ jobTitle: mockJobs[0].jobTitle })
        );
      });
    });

    it('should discard a new job and select null if there are no existing jobs', () => {
      const newJob: Job = {
        jobTitle: 'New Job',
        companyName: '',
        priority: '',
        status: '',
        postingUrl: '',
        source: '',
        salary: '',
        type: '',
        location: '',
        notes: '',
      };
      const currentJobs = [newJob];
      service['jobsSubject'].next(currentJobs);
      service['newJobSelected'] = true;

      service.discardNewJob();

      service.jobs$.subscribe((jobs) => {
        expect(jobs.length).toBe(0);
      });

      service.selectedJob$.subscribe((job) => {
        expect(job).toBeNull();
      });
    });
  });

  describe('deleteJob', () => {
    it('should discard new job if newJobSelected is true', () => {
      const discardNewJobSpy = spyOn(service, 'discardNewJob');
      service.newJobSelected = true;

      service.deleteJob();

      expect(discardNewJobSpy).toHaveBeenCalled();
    });

    it('should not call http.delete if user does not confirm deletion', () => {
      service.newJobSelected = false;
      notificationService.showConfirmation.and.returnValue(of(false));

      service.deleteJob();

      const req = httpMock.expectNone('http://localhost:3000/jobs/123');
      expect(req).toBeUndefined();
    });

    it('should call http.delete with correct URL if user confirms deletion', () => {
      const mockJobId = mockJobs[0].id;
      service['selectedJob'].next(mockJobs[0]);

      notificationService.showConfirmation.and.returnValue(of(true));

      service.deleteJob();

      const req = httpMock.expectOne(`http://localhost:3000/jobs/${mockJobId}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);

      const getReq = httpMock.expectOne('http://localhost:3000/jobs');
      expect(getReq.request.method).toBe('GET');
      getReq.flush(mockJobs);
    });

    it('should call loadData on successful deletion', () => {
      const loadDataSpy = spyOn(service, 'loadData');
      service.newJobSelected = false;
      service['selectedJob'].next(mockJobs[1]);
      notificationService.showConfirmation.and.returnValue(of(true));

      service.deleteJob();

      const req = httpMock.expectOne(
        `http://localhost:3000/jobs/${mockJobs[1].id}`
      );
      req.flush(null);

      expect(loadDataSpy).toHaveBeenCalled();
    });

    it('should log error on failed deletion', () => {
      const consoleErrorSpy = spyOn(console, 'error');
      service.newJobSelected = false;
      service['selectedJob'].next(mockJobs[0]);
      notificationService.showConfirmation.and.returnValue(of(true));

      service.deleteJob();

      const req = httpMock.expectOne(
        `http://localhost:3000/jobs/${mockJobs[0].id}`
      );
      req.flush('Server error', { status: 500, statusText: 'Server Error' });

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'An error occurred while deleting the job:',
        jasmine.any(HttpErrorResponse)
      );
    });
  });
});
