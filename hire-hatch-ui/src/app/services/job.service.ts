import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Job, MOCK_DATA } from '../models/job.model';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private selectedJob = new BehaviorSubject<Job | null>(null);
  selectedJob$ = this.selectedJob.asObservable();

  constructor() {}

  getJobs(): Observable<Job[]> {
    return of(MOCK_DATA);
  }

  selectJob(job: Job): void {
    this.selectedJob.next(job);
  }
}
