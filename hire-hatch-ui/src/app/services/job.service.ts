import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Job } from '../models/job.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private selectedJob = new BehaviorSubject<Job | null>(null);
  selectedJob$ = this.selectedJob.asObservable();

  constructor(private http: HttpClient) {}

  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>('http://localhost:3000/jobs');
  }

  selectJob(job: Job): void {
    this.selectedJob.next(job);
  }
}
