import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  catchError,
  tap,
  throwError,
} from 'rxjs';
import { Job } from '../models/job.model';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from './notification.service';
import { DropdownOptions } from '../models/dropdown-options.model';
import { NavigationDirection } from '../models/navigation-direction.enum';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private jobsSubject: BehaviorSubject<Job[]> = new BehaviorSubject<Job[]>([]);
  jobs$: Observable<Job[]> = this.jobsSubject.asObservable();
  private selectedJob = new BehaviorSubject<Job | null>(null);
  selectedJob$ = this.selectedJob.asObservable();
  newJobSelected: boolean = false;
  private jobNavigation: Subject<NavigationDirection> =
    new Subject<NavigationDirection>();
  jobNavigation$ = this.jobNavigation.asObservable();
  private readonly apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) {}

  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.apiUrl}/jobs`).pipe(
      catchError((error) => {
        console.error('An error occurred:', error);
        return throwError(() => error);
      })
    );
  }

  getDropdownOptions(): Observable<DropdownOptions> {
    return this.http
      .get<DropdownOptions>(`${this.apiUrl}/dropdown-options`)
      .pipe(
        catchError((error) => {
          console.error('An error occurred:', error);
          return throwError(() => error);
        })
      );
  }

  selectJob(job: Job): void {
    if (this.newJobSelected) {
      return;
    } else {
      this.selectedJob.next(job);
      this.newJobSelected = !job?.id;
    }
  }

  deselectJob(): void {
    if (this.newJobSelected) {
      this.discardNewJob();
    } else {
      this.selectedJob.next(null);
    }
  }

  navigateToJob(direction: NavigationDirection): void {
    this.jobNavigation.next(direction);
  }

  loadData(selectedJobId?: string): void {
    this.getJobs()
      .pipe(
        tap((jobs) => {
          if (jobs.length) {
            jobs.forEach((job) => {
              job.dateAdded = job.dateAdded && new Date(job.dateAdded);
              job.lastUpdated = job.lastUpdated && new Date(job.lastUpdated);
              job.dateApplied = job.dateApplied && new Date(job.dateApplied);
              job.followUpDate = job.followUpDate && new Date(job.followUpDate);
            });
            this.jobsSubject.next(jobs);
            if (selectedJobId) {
              const job = jobs.find((j) => j.id === selectedJobId);
              if (job) {
                this.selectJob(job);
              }
            } else {
              this.selectJob(jobs[0]);
            }
          } else {
            this.jobsSubject.next([]);
            this.selectedJob.next(null);
          }
        })
      )
      .subscribe();
  }

  saveJob(job: Job): Observable<Job> {
    if (job.id) {
      return this.http.put<Job>(`${this.apiUrl}/jobs/${job.id}`, job).pipe(
        catchError((error) => {
          this.selectJob(this.jobsSubject.getValue()[0]);
          console.error('An error occurred while saving the job:', error);
          return throwError(() => error);
        }),
        tap(() => {
          this.loadData(job.id);
        })
      );
    } else {
      const newJob = job;
      return this.http.post<Job>(`${this.apiUrl}/jobs`, newJob).pipe(
        catchError((error) => {
          this.newJobSelected = false;
          this.selectJob(this.jobsSubject.getValue()[0]);
          console.error('An error occurred while creating the job:', error);
          return throwError(() => error);
        }),
        tap((savedJob: Job) => {
          this.newJobSelected = false;
          this.loadData(savedJob.id);
        })
      );
    }
  }

  addJob(): void {
    if (!this.newJobSelected) {
      const currentJobs = this.jobsSubject.getValue();
      const newJob: Job = {
        jobTitle: 'New Job',
        companyName: '',
        priority: '',
        status: '',
        postingUrl: '',
        source: '',
        salary: '',
        jobType: '',
        location: '',
        notes: '',
      };
      const updatedJobs = [newJob, ...currentJobs];
      this.jobsSubject.next(updatedJobs);
      this.selectJob(newJob);
    }
  }

  discardNewJob(): void {
    if (this.newJobSelected) {
      const existingJobs = this.jobsSubject.getValue().filter((job) => job.id);
      this.jobsSubject.next(existingJobs);
      this.newJobSelected = false;
      existingJobs.length
        ? this.selectJob(existingJobs[0])
        : this.selectedJob.next(null);
    }
  }

  deleteJob(): void {
    if (this.newJobSelected) {
      this.discardNewJob();
    } else {
      const currentSelectedJob = this.selectedJob.getValue();

      this.notificationService
        .showConfirmation('Are you sure you want to delete this job?')
        .subscribe((confirmed) => {
          if (confirmed) {
            this.http
              .delete(`${this.apiUrl}/jobs/${currentSelectedJob?.id}`)
              .subscribe({
                next: () => {
                  this.loadData();
                },
                error: (error) => {
                  console.error(
                    'An error occurred while deleting the job:',
                    error
                  );
                },
              });
          }
        });
    }
  }
}
