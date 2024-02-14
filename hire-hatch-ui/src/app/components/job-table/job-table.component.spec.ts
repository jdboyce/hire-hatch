import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { JobTableComponent } from './job-table.component';
import { MatTableModule } from '@angular/material/table';
import { Job } from 'src/app/models/job.model';
import { of } from 'rxjs';
import { JobService } from 'src/app/services/job.service';

describe('JobTableComponent', () => {
  let component: JobTableComponent;
  let fixture: ComponentFixture<JobTableComponent>;
  let mockJobs: Job[] = [
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
  ];
  let mockJobService = {
    getJobs: () => of(mockJobs),
    selectJob: (job: Job) => {},
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobTableComponent],
      providers: [{ provide: JobService, useValue: mockJobService }],
      imports: [MatTableModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct displayed columns', () => {
    expect(component.displayedColumns).toEqual([
      'jobTitle',
      'companyName',
      'priority',
      'status',
      'source',
      'postingUrl',
      'notes',
    ]);
  });

  it('#ngOnInit should set jobs', fakeAsync(() => {
    spyOn(mockJobService, 'getJobs').and.returnValue(of(mockJobs));
    component.ngOnInit();
    tick();
    expect(component.jobs).toEqual(mockJobs);
  }));

  it('#selectJob should set selectedJob and call jobService.selectJob', () => {
    const job: Job = mockJobs[0];
    spyOn(mockJobService, 'selectJob');
    component.selectJob(job);
    expect(component.selectedJob).toEqual(job);
    expect(mockJobService.selectJob).toHaveBeenCalledWith(job);
  });
});
