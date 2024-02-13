import { Component } from '@angular/core';
import { Job } from 'src/app/models/job.model';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss'],
})
export class JobDetailComponent {
  selectedJob!: Job;

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.jobService.selectedJob$.subscribe((job) => (this.selectedJob = job!));
  }
}
