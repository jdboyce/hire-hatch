import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobDetailComponent } from './job-detail.component';
import { Job } from 'src/app/models/job.model';
import { MatCardModule } from '@angular/material/card';
import { Subject, of } from 'rxjs';
import { JobService } from 'src/app/services/job.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
      postingUrl: 'https://www.linkedin.com/jobs/12345',
      source: 'LinkedIn',
      salary: '$95,000',
      type: 'Full-time',
      location: 'Remote',
      dateApplied: new Date('2024-02-10T00:00:00-05:00'),
      followUpDate: new Date('2024-02-23T20:17:38-05:00'),
      notes:
        'Angular-focused team. Values collaboration and continuous learning. Good work-life balance.',
    },
    {
      id: 'a6e5e5a0-5c1d-4f6e-8e5f-7e7f8c6e9c7e',
      jobTitle: 'Angular Developer',
      companyName: 'Web Wizards Agency',
      priority: 'High',
      status: 'Interviewed',
      postingUrl: 'https://www.glassdoor.com/jobs/67890',
      source: 'Glassdoor',
      salary: '$90,000',
      type: 'Full-time',
      location: 'Office',
      dateApplied: new Date('2024-02-06T00:00:00-05:00'),
      followUpDate: undefined,
      notes:
        'Startup culture. Encourages candid dialogue. Flexible and remote. Great reviews.',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobDetailComponent],
      providers: [JobService],
      imports: [
        MatCardModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(JobDetailComponent);
    component = fixture.componentInstance;
    jobService = TestBed.inject(JobService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize jobForm on ngOnInit', () => {
    jobService.selectedJob$ = of(null);
    component.ngOnInit();
    expect(component.jobForm).toBeDefined();
  });

  it('should patch jobForm values when different jobs are selected', () => {
    const selectedJobSubject = new Subject<Job>();
    jobService.selectedJob$ = selectedJobSubject.asObservable();
    component.ngOnInit();
    selectedJobSubject.next(mockJobs[0]);
    expect(component.jobForm.value).toEqual(mockJobs[0]);
    selectedJobSubject.next(mockJobs[1]);
    expect(component.jobForm.value).toEqual(mockJobs[1]);
  });

  it('should reset jobForm when no job is selected', () => {
    jobService.selectedJob$ = of(null);
    component.ngOnInit();
    expect(component.jobForm.value).toEqual({
      id: null,
      jobTitle: null,
      companyName: null,
      priority: null,
      status: null,
      postingUrl: null,
      source: null,
      salary: null,
      type: null,
      location: null,
      dateApplied: null,
      followUpDate: null,
      notes: null,
    });
  });

  it('should display the job title', () => {
    const jobTitleControl = component.jobForm.get('jobTitle');
    if (jobTitleControl) {
      jobTitleControl.setValue(mockJobs[1].jobTitle);
      fixture.detectChanges();

      const jobTitleInput: HTMLInputElement =
        fixture.nativeElement.querySelector(
          'input[formControlName="jobTitle"]'
        );
      expect(jobTitleInput).toBeTruthy();
      expect(jobTitleInput.value).toBe(mockJobs[1].jobTitle);
    } else {
      fail('Job title control does not exist');
    }
  });

  it('should display the company name', () => {
    const companyNameControl = component.jobForm.get('companyName');
    if (companyNameControl) {
      companyNameControl.setValue(mockJobs[0].companyName);
      fixture.detectChanges();

      const companyNameInput: HTMLInputElement =
        fixture.nativeElement.querySelector(
          'input[formControlName="companyName"]'
        );
      expect(companyNameInput).toBeTruthy();
      expect(companyNameInput.value).toBe(mockJobs[0].companyName);
    } else {
      fail('Company name control does not exist');
    }
  });

  it('should open a new window with the postingUrl when openUrl is called', () => {
    const url = 'http://example.com';
    spyOn(window, 'open');
    component.jobForm.get('postingUrl')?.setValue(url);
    component.openUrl();
    expect(window.open).toHaveBeenCalledWith(url, '_blank');
  });
});
