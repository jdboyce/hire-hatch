import { TestBed } from '@angular/core/testing';

import { JobService } from './job.service';
import { Job, MOCK_DATA } from '../models/job.model';

describe('JobService', () => {
  let service: JobService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getJobs should return mock jobs', (done: DoneFn) => {
    service.getJobs().subscribe((value) => {
      expect(value).toBe(MOCK_DATA);
      done();
    });
  });

  it('#selectJob should change selectedJob value', () => {
    const job: Job = MOCK_DATA[0];
    service.selectJob(job);
    service.selectedJob$.subscribe((value) => {
      expect(value).toBe(job);
    });
  });
});
