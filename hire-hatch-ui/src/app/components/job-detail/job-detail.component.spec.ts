import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobDetailComponent } from './job-detail.component';
import { Job } from 'src/app/models/job.model';
import { MatCardModule } from '@angular/material/card';
import { Subject, Subscription, of, throwError } from 'rxjs';
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
import { ActionButtonComponent } from 'src/app/shared/action-button/action-button.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification.service';
import * as _ from 'lodash';

describe('JobDetailComponent', () => {
  const mockJobs: Job[] = [
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

  let component: JobDetailComponent;
  let fixture: ComponentFixture<JobDetailComponent>;
  let mockJobService: jasmine.SpyObj<JobService>;
  let mockNotificationService: jasmine.SpyObj<NotificationService>;
  let mockSelectedJobSubscription: jasmine.SpyObj<Subscription>;

  beforeEach(async () => {
    const selectedJobSubject = new Subject<Job>();
    mockJobService = jasmine.createSpyObj('JobService', [
      'getJobs',
      'saveJob',
      'discardNewJob',
    ]);
    mockJobService.selectedJob$ = selectedJobSubject.asObservable();
    mockNotificationService = jasmine.createSpyObj('NotificationService', [
      'showSuccess',
      'showError',
    ]);

    await TestBed.configureTestingModule({
      declarations: [JobDetailComponent, ActionButtonComponent],
      providers: [
        { provide: JobService, useValue: mockJobService },
        {
          provide: NotificationService,
          useValue: mockNotificationService,
        },
      ],
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
        MatButtonModule,
        MatSnackBarModule,
        MatDialogModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(JobDetailComponent);
    component = fixture.componentInstance;
    mockJobService.getJobs.and.returnValue(of([mockJobs[0]]));
    fixture.detectChanges();
  });

  describe('component setup', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
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
  });

  describe('ngOnInit', () => {
    it('should initialize jobForm on ngOnInit', () => {
      const selectedJobSubject = new Subject<Job>();
      mockJobService.selectedJob$ = selectedJobSubject.asObservable();
      mockJobService.selectedJob$ = of(null);
      component.ngOnInit();
      expect(component.jobForm).toBeDefined();
    });

    it('should update jobForm values and set newJobSelected when different jobs are selected', () => {
      const selectedJobSubject = new Subject<Job>();
      mockJobService.selectedJob$ = selectedJobSubject.asObservable();
      component.ngOnInit();
      selectedJobSubject.next(mockJobs[0]);
      expect(component.jobForm.value).toEqual(_.omit(mockJobs[0], 'id'));
      expect(component.newJobSelected).toBe(!mockJobs[0].id);
      selectedJobSubject.next(mockJobs[1]);
      expect(component.jobForm.value).toEqual(
        _.omit(
          {
            ...mockJobs[1],
            followUpDate: mockJobs[1].followUpDate || null,
          },
          'id'
        )
      );
      expect(component.newJobSelected).toBe(!mockJobs[1].id);
    });

    it('should reset jobForm and set newJobSelected to false when no job is selected', () => {
      mockJobService.selectedJob$ = of(null);
      component.ngOnInit();
      expect(component.jobForm.value).toEqual({
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
      expect(component.newJobSelected).toBe(false);
    });
  });

  describe('ngOnDestroy', () => {
    it('should unsubscribe from selectedJobSubscription', () => {
      mockSelectedJobSubscription = jasmine.createSpyObj('Subscription', [
        'unsubscribe',
      ]);
      component.selectedJobSubscription = mockSelectedJobSubscription;
      component.ngOnDestroy();
      expect(mockSelectedJobSubscription.unsubscribe).toHaveBeenCalled();
    });

    it('should not throw an error if selectedJobSubscription is null', () => {
      component.selectedJobSubscription = undefined;
      expect(() => component.ngOnDestroy()).not.toThrow();
    });
  });

  describe('openUrl', () => {
    it('should open a new window with the postingUrl when openUrl is called', () => {
      const url = 'http://example.com';
      spyOn(window, 'open');
      component.jobForm.get('postingUrl')?.setValue(url);
      component.openUrl();
      expect(window.open).toHaveBeenCalledWith(url, '_blank');
    });
  });

  describe('saveJob', () => {
    it('should call jobService.saveJob with form values and original job ID if the form is dirty, valid, and not new', () => {
      const job = mockJobs[0];
      component.jobForm.patchValue(job);
      component.jobForm.markAsDirty();
      component.originalJobData = job;
      component.newJobSelected = false;
      mockJobService.saveJob.and.returnValue(of(job));

      component.saveJob();

      expect(mockJobService.saveJob).toHaveBeenCalledWith(job);
    });

    it('should call jobService.saveJob with form values if the form is dirty, valid, and new', () => {
      const job = _.omit(mockJobs[1], 'id');
      component.jobForm.patchValue(job);
      component.jobForm.markAsDirty();
      component.newJobSelected = true;
      mockJobService.saveJob.and.returnValue(of(job));

      component.saveJob();

      expect(mockJobService.saveJob).toHaveBeenCalledWith(job);
    });

    it('should not call jobService.saveJob if the form is not dirty', () => {
      const job = mockJobs[0];
      component.jobForm.patchValue(job);
      component.jobForm.markAsPristine();
      mockJobService.saveJob.and.returnValue(of(job));

      component.saveJob();

      expect(mockJobService.saveJob).not.toHaveBeenCalled();
    });

    it('should not call jobService.saveJob if the form is not valid', () => {
      const job = mockJobs[1];
      component.jobForm.patchValue(job);
      component.jobForm.markAsDirty();
      component.jobForm.setErrors({ invalid: true });
      mockJobService.saveJob.and.returnValue(of(job));

      component.saveJob();

      expect(mockJobService.saveJob).not.toHaveBeenCalled();
    });

    it('should show a success notification and reset the form on success', () => {
      const job = mockJobs[0];
      component.jobForm.patchValue(job);
      component.jobForm.markAsDirty();
      mockJobService.saveJob.and.returnValue(of(job));
      spyOn(component.jobForm, 'reset');

      component.saveJob();

      expect(mockNotificationService.showSuccess).toHaveBeenCalledWith(
        'Job saved successfully!'
      );
      expect(component.jobForm.reset).toHaveBeenCalled();
    });

    it('should show an error notification on error', () => {
      const job = mockJobs[1];
      component.jobForm.patchValue(job);
      component.jobForm.markAsDirty();
      const error = new Error('Test error');
      mockJobService.saveJob.and.returnValue(throwError(() => error));

      component.saveJob();

      expect(mockNotificationService.showError).toHaveBeenCalledWith(
        'An error occurred while saving the job: ' + error.message
      );
    });
  });

  describe('cancel', () => {
    it('should reset the form and call jobService.discardNewJob if newJobSelected is true', () => {
      spyOn(component.jobForm, 'reset');
      mockJobService.discardNewJob.and.returnValue(undefined);
      component.newJobSelected = true;

      component.cancel();

      expect(component.jobForm.reset).toHaveBeenCalled();
      expect(mockJobService.discardNewJob).toHaveBeenCalled();
    });

    it('should reset the form to the original job data if newJobSelected is false', () => {
      const job = mockJobs[0];
      component.originalJobData = job;
      spyOn(component.jobForm, 'reset');
      component.newJobSelected = false;

      component.cancel();

      expect(component.jobForm.reset).toHaveBeenCalledWith(job);
    });
  });
});
