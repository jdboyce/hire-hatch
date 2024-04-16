import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { Job } from '../models/job.model';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private jobsSubject: BehaviorSubject<Job[]> = new BehaviorSubject<Job[]>([]);
  jobs$: Observable<Job[]> = this.jobsSubject.asObservable();
  private selectedJob = new BehaviorSubject<Job | null>(null);
  selectedJob$ = this.selectedJob.asObservable();
  newJobSelected: boolean = false;

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) {}

  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>('http://localhost:3000/jobs');
  }

  selectJob(job: Job): void {
    if (this.newJobSelected) {
      return;
    } else {
      this.selectedJob.next(job);
      this.newJobSelected = !job?.id;
    }
  }

  loadData(selectedJobId?: string): void {
    this.getJobs()
      .pipe(
        tap((jobs) => {
          if (jobs.length) {
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
      return this.http
        .put<Job>(`http://localhost:3000/jobs/${job.id}`, job)
        .pipe(
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
      return this.http.post<Job>(`http://localhost:3000/jobs`, newJob).pipe(
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
        type: '',
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
              .delete(`http://localhost:3000/jobs/${currentSelectedJob?.id}`)
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
