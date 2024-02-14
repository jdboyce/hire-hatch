import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobDetailComponent } from './job-detail.component';
import { Job } from 'src/app/models/job.model';
import { MatCardModule } from '@angular/material/card';
import { of } from 'rxjs';
import { JobService } from 'src/app/services/job.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
describe('JobDetailComponent', () => {
  let component: JobDetailComponent;
  let fixture: ComponentFixture<JobDetailComponent>;
  let jobService: JobService;
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobDetailComponent],
      providers: [JobService],
      imports: [MatCardModule, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(JobDetailComponent);
    component = fixture.componentInstance;
    jobService = TestBed.inject(JobService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnInit should subscribe to selectedJob$ from JobService', () => {
    const job: Job = mockJobs[0];
    jobService.selectedJob$ = of(job);
    component.ngOnInit();
    expect(component.selectedJob).toEqual(job);
  });

  it('should display the job title', () => {
    component.selectedJob = mockJobs[1];
    fixture.detectChanges();
    const jobTitleElement: HTMLElement =
      fixture.nativeElement.querySelector('mat-card-title');
    expect(jobTitleElement.textContent).toContain(mockJobs[1].jobTitle);
  });

  it('should display the company name', () => {
    component.selectedJob = mockJobs[0];
    fixture.detectChanges();
    const companyNameElement: HTMLInputElement =
      fixture.nativeElement.querySelector('input[type="text"]');
    expect(companyNameElement.value).toContain(mockJobs[0].companyName);
  });
});
