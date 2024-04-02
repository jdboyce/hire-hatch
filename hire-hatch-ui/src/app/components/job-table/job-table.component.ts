import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Job } from 'src/app/models/job.model';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-job-table',
  templateUrl: './job-table.component.html',
  styleUrls: ['./job-table.component.scss'],
})
export class JobTableComponent implements OnInit, OnDestroy {
  @Output() jobSelected = new EventEmitter<Job>();

  displayedColumns: string[] = [
    'jobTitle',
    'companyName',
    'priority',
    'status',
    'postingUrl',
  ];
  jobs!: Job[];
  selectedJob!: Job;
  private jobsSubscription?: Subscription;
  private selectedJobSubscription?: Subscription;

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.jobsSubscription = this.jobService.jobs$.subscribe(
      (jobs) => (this.jobs = jobs)
    );
    this.selectedJobSubscription = this.jobService.selectedJob$.subscribe(
      (selectedJob) => {
        if (selectedJob) {
          this.selectedJob = selectedJob;
        }
      }
    );
    this.jobService.loadData();
  }

  ngOnDestroy(): void {
    if (this.jobsSubscription) {
      this.jobsSubscription.unsubscribe();
    }
    if (this.selectedJobSubscription) {
      this.selectedJobSubscription.unsubscribe();
    }
  }

  selectJob(job: Job): void {
    this.jobService.selectJob(job);
    this.selectedJob = job;
  }
}
