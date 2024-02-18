import { Component, EventEmitter, Output } from '@angular/core';
import { Job } from 'src/app/models/job.model';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-job-table',
  templateUrl: './job-table.component.html',
  styleUrls: ['./job-table.component.scss'],
})
export class JobTableComponent {
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

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.jobService.getJobs().subscribe((jobs) => (this.jobs = jobs));
  }

  selectJob(job: Job): void {
    this.jobService.selectJob(job);
    this.selectedJob = job;
  }
}
