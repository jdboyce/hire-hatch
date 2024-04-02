import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { JobTableComponent } from './job-table.component';
import { MatTableModule } from '@angular/material/table';
import { Job } from 'src/app/models/job.model';
import { Subscription, of } from 'rxjs';
import { JobService } from 'src/app/services/job.service';
import { ActionButtonComponent } from 'src/app/shared/action-button/action-button.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

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
  let mockJobService = {
    getJobs: () => of(mockJobs),
    selectJob: (job: Job) => {},
    jobs$: of(mockJobs),
    selectedJob$: of(mockJobs[0]),
    loadData: () => {},
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobTableComponent, ActionButtonComponent],
      providers: [{ provide: JobService, useValue: mockJobService }],
      imports: [
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        MatSnackBarModule,
        MatDialogModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('component setup', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should have the correct displayed columns', () => {
      expect(component.displayedColumns).toEqual([
        'jobTitle',
        'companyName',
        'priority',
        'status',
        'postingUrl',
      ]);
    });
  });

  describe('ngOnInit', () => {
    it('should create subscriptions in ngOnInit', () => {
      const jobsSubscription = new Subscription();
      const selectedJobSubscription = new Subscription();
      spyOn(mockJobService.jobs$, 'subscribe').and.returnValue(
        jobsSubscription
      );
      spyOn(mockJobService.selectedJob$, 'subscribe').and.returnValue(
        selectedJobSubscription
      );
      spyOn(mockJobService, 'loadData');

      component.ngOnInit();

      expect((component as any).jobsSubscription).toBe(jobsSubscription);
      expect((component as any).selectedJobSubscription).toBe(
        selectedJobSubscription
      );
      expect(mockJobService.loadData).toHaveBeenCalled();
    });
  });

  describe('ngOnDestroy', () => {
    it('should unsubscribe in ngOnDestroy', () => {
      const jobsSubscription = new Subscription();
      const selectedJobSubscription = new Subscription();
      spyOn(jobsSubscription, 'unsubscribe');
      spyOn(selectedJobSubscription, 'unsubscribe');
      component['jobsSubscription'] = jobsSubscription;
      component['selectedJobSubscription'] = selectedJobSubscription;

      component.ngOnDestroy();

      expect(jobsSubscription.unsubscribe).toHaveBeenCalled();
      expect(selectedJobSubscription.unsubscribe).toHaveBeenCalled();
    });
  });

  describe('selectJob', () => {
    it('should set selectedJob and call jobService.selectJob', () => {
      const job: Job = mockJobs[0];
      spyOn(mockJobService, 'selectJob');
      component.selectJob(job);
      expect(component.selectedJob).toEqual(job);
      expect(mockJobService.selectJob).toHaveBeenCalledWith(job);
    });
  });
});
