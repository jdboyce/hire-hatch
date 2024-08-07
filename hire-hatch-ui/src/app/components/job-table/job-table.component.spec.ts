import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobTableComponent } from './job-table.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Job } from 'src/app/models/job.model';
import { Subject, Subscription, of } from 'rxjs';
import { JobService } from 'src/app/services/job.service';
import { ActionButtonComponent } from 'src/app/shared/action-button/action-button.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import {
  MatPaginator,
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ChangeDetectorRef } from '@angular/core';
import { NavigationDirection } from 'src/app/models/navigation-direction.enum';

describe('JobTableComponent', () => {
  const mockJobs: Job[] = [
    {
      id: '3107346e-69ca-4559-bf77-36ff01cfed22',
      jobTitle: 'Frontend Developer',
      companyName: 'Tech Innovations Inc.',
      dateAdded: new Date('2024-02-15T00:00:00-05:00'),
      priority: 'High',
      status: 'Submitted Application',
      postingUrl: 'https://www.linkedin.com/jobs/12345',
      lastUpdated: new Date('2024-02-17T00:00:00-05:00'),
      source: 'LinkedIn',
      salary: '$95,000',
      jobType: 'Full-time',
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
      dateAdded: new Date('2024-02-10T00:00:00-05:00'),
      priority: 'High',
      status: 'Interviewed',
      postingUrl: 'https://www.glassdoor.com/jobs/67890',
      lastUpdated: new Date('2024-02-12T00:00:00-05:00'),
      source: 'Glassdoor',
      salary: '$90,000',
      jobType: 'Full-time',
      location: 'Office',
      dateApplied: new Date('2024-02-06T00:00:00-05:00'),
      followUpDate: undefined,
      notes:
        'Startup culture. Encourages candid dialogue. Flexible and remote. Great reviews.',
    },
  ];
  const mockChangeDetectorRef = {
    markForCheck: () => {},
  } as unknown as ChangeDetectorRef;

  let component: JobTableComponent;
  let fixture: ComponentFixture<JobTableComponent>;
  let mockJobNavigationSubject = new Subject<NavigationDirection>();
  let mockJobService = {
    getJobs: () => of(mockJobs),
    selectJob: (job: Job) => {},
    deselectJob: () => {},
    jobs$: of(mockJobs),
    selectedJob$: of(mockJobs[0]),
    jobNavigation$: mockJobNavigationSubject.asObservable(),
    loadData: () => {},
    addJob: () => {},
    deleteJob: () => {},
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
        MatPaginatorModule,
        MatSortModule,
        NoopAnimationsModule,
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
        'dateAdded',
        'priority',
        'status',
        'postingUrl',
      ]);
    });
  });

  describe('ngOnInit', () => {
    it('should update jobs when jobs$ emits', () => {
      const jobs = mockJobs;
      mockJobService.jobs$ = of(jobs);

      component.ngOnInit();

      expect(component.dataSource.data).toEqual(jobs);
    });

    it('should update selectedJob and newJobSelected when selectedJob$ emits', () => {
      const selectedJob = mockJobs[0];
      mockJobService.selectedJob$ = of(selectedJob);

      component.ngOnInit();

      expect(component.selectedJob).toBe(selectedJob);
      expect(component.newJobSelected).toBe(!selectedJob.id);
    });

    it('should set selectedJob to undefined and newJobSelected to false when selectedJob$ emits null', () => {
      mockJobService.selectedJob$ = of(null as unknown as Job);

      component.ngOnInit();

      expect(component.selectedJob).toBeUndefined();
      expect(component.newJobSelected).toBe(false);
    });

    it('should call navigateToJob when jobNavigation$ emits', () => {
      const direction = NavigationDirection.Next;
      const navigateToJobSpy = spyOn(component, 'navigateToJob');
      mockJobService.jobNavigation$ = of(direction);

      component.ngOnInit();

      expect(navigateToJobSpy).toHaveBeenCalledWith(direction);
    });
  });

  describe('ngAfterViewInit', () => {
    it('should have paginator and sort in view query after view init', () => {
      fixture.detectChanges();

      expect(component.paginator).toBeDefined();
      expect(component.sort).toBeDefined();
    });
  });

  describe('ngOnDestroy', () => {
    it('should unsubscribe in ngOnDestroy', () => {
      const jobsSubscription = new Subscription();
      const selectedJobSubscription = new Subscription();
      const jobNavigationSubscription = new Subscription();
      spyOn(jobsSubscription, 'unsubscribe');
      spyOn(selectedJobSubscription, 'unsubscribe');
      spyOn(jobNavigationSubscription, 'unsubscribe');
      component['jobsSubscription'] = jobsSubscription;
      component['selectedJobSubscription'] = selectedJobSubscription;
      component['jobNavigationSubscription'] = jobNavigationSubscription;

      component.ngOnDestroy();

      expect(jobsSubscription.unsubscribe).toHaveBeenCalled();
      expect(selectedJobSubscription.unsubscribe).toHaveBeenCalled();
      expect(jobNavigationSubscription.unsubscribe).toHaveBeenCalled();
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

  describe('deselectJob', () => {
    it('should call deselectJob on jobService and set selectedJob to undefined', () => {
      const mockJobService = jasmine.createSpyObj<JobService>('JobService', [
        'deselectJob',
      ]);
      component = new JobTableComponent(mockJobService);

      component.deselectJob();

      expect(mockJobService.deselectJob).toHaveBeenCalled();
      expect(component.selectedJob).toBeUndefined();
    });
  });

  describe('navigateToJob', () => {
    let selectJobSpy: jasmine.Spy;

    beforeEach(() => {
      selectJobSpy = spyOn(component, 'selectJob');
    });

    it('should select the first job if no job is selected', () => {
      component.selectedJob = undefined;
      component.dataSource.filteredData = mockJobs;

      component.navigateToJob(NavigationDirection.Next);

      expect(selectJobSpy).toHaveBeenCalledWith(mockJobs[0]);
    });

    it('should select the next job if the next direction is given and the selected job is not the last one', () => {
      component.selectedJob = mockJobs[0];
      component.dataSource.filteredData = mockJobs;

      component.navigateToJob(NavigationDirection.Next);

      expect(selectJobSpy).toHaveBeenCalledWith(mockJobs[1]);
    });

    it('should select the first job if the next direction is given and the selected job is the last one', () => {
      component.selectedJob = mockJobs[mockJobs.length - 1];
      component.dataSource.filteredData = mockJobs;

      component.navigateToJob(NavigationDirection.Next);

      expect(selectJobSpy).toHaveBeenCalledWith(mockJobs[0]);
    });

    it('should select the previous job if the previous direction is given and the selected job is not the first one', () => {
      component.selectedJob = mockJobs[1];
      component.dataSource.filteredData = mockJobs;

      component.navigateToJob(NavigationDirection.Previous);

      expect(selectJobSpy).toHaveBeenCalledWith(mockJobs[0]);
    });

    it('should select the last job if the previous direction is given and the selected job is the first one', () => {
      component.selectedJob = mockJobs[0];
      component.dataSource.filteredData = mockJobs;

      component.navigateToJob(NavigationDirection.Previous);

      expect(selectJobSpy).toHaveBeenCalledWith(mockJobs[mockJobs.length - 1]);
    });
  });

  describe('applyFilter', () => {
    it('should set the dataSource filter', () => {
      const testFilterValue = 'test filter value';
      const event = { target: { value: testFilterValue } } as unknown as Event;
      component.dataSource = new MatTableDataSource<Job>(mockJobs);

      component.applyFilter(event);

      expect(component.dataSource.filter).toBe(testFilterValue);
    });

    it('should reset the paginator', () => {
      const event = {
        target: { value: 'test filter value' },
      } as unknown as Event;
      component.dataSource = new MatTableDataSource<Job>(mockJobs);
      component.dataSource.paginator = new MatPaginator(
        new MatPaginatorIntl(),
        mockChangeDetectorRef
      );
      spyOn(component.dataSource.paginator, 'firstPage');

      component.applyFilter(event);

      expect(component.dataSource.paginator.firstPage).toHaveBeenCalled();
    });

    it('should select the first job if there are filtered jobs', () => {
      const testFilterValue = mockJobs[0].jobTitle;
      const event = { target: { value: testFilterValue } } as unknown as Event;
      component.dataSource = new MatTableDataSource<Job>(mockJobs);
      spyOn(component, 'selectJob');

      component.applyFilter(event);

      expect(component.selectJob).toHaveBeenCalledWith(mockJobs[0]);
    });

    it('should deselect the job if there are no filtered jobs', () => {
      const event = {
        target: { value: 'nonexistent job' },
      } as unknown as Event;
      component.dataSource = new MatTableDataSource<Job>(mockJobs);
      spyOn(component, 'deselectJob');

      component.applyFilter(event);

      expect(component.deselectJob).toHaveBeenCalled();
    });
  });

  describe('addJob', () => {
    it('should call jobService.addJob', () => {
      spyOn(mockJobService, 'addJob');

      component.addJob();

      expect(mockJobService.addJob).toHaveBeenCalled();
    });
  });

  describe('deleteJob', () => {
    it('should call jobService.deleteJob', () => {
      spyOn(mockJobService, 'deleteJob');

      component.deleteJob();

      expect(mockJobService.deleteJob).toHaveBeenCalled();
    });
  });
});
