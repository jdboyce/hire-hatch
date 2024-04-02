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

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private jobsSubject: Subject<Job[]> = new Subject<Job[]>();
  jobs$: Observable<Job[]> = this.jobsSubject.asObservable();
  private selectedJob = new BehaviorSubject<Job | null>(null);
  selectedJob$ = this.selectedJob.asObservable();

  constructor(private http: HttpClient) {}

  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>('http://localhost:3000/jobs');
  }

  selectJob(job: Job): void {
    this.selectedJob.next(job);
  }

  loadData(selectedJobId?: string): void {
    this.getJobs()
      .pipe(
        tap((jobs) => {
          this.jobsSubject.next(jobs);
          if (selectedJobId) {
            const job = jobs.find((j) => j.id === selectedJobId);
            if (job) {
              this.selectJob(job);
            }
          } else {
            this.selectJob(jobs[0]);
          }
        })
      )
      .subscribe();
  }

  saveJob(job: Job): Observable<Job> {
    return this.http.put<Job>(`http://localhost:3000/jobs/${job.id}`, job).pipe(
      catchError((error) => {
        console.error('An error occurred while saving the job:', error);
        return throwError(() => error);
      }),
      tap(() => {
        this.loadData(job.id);
      })
    );
  }
}
