import { Component, OnDestroy, OnInit } from '@angular/core';
import { JobService } from 'src/app/services/job.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';
import { Job } from 'src/app/models/job.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss'],
})
export class JobDetailComponent implements OnInit, OnDestroy {
  jobForm!: FormGroup;
  originalJobData: Job | undefined;
  selectedJobSubscription?: Subscription;
  // TODO: Remove hardcoded dropdown options and fetch from server instead.
  types = ['Full-time', 'Contract', 'Part-time'];
  priorities = ['High', 'Medium', 'Low'];
  statuses = [
    'Reviewing Posting',
    'Not Interested',
    'Prepping Application',
    'Submitted Application',
    'Prepping Interview',
    'Interviewed',
    'Offer Received',
    'Declined',
    'Offer Accepted',
  ];

  constructor(
    private jobService: JobService,
    private notificationService: NotificationService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.jobForm = this.fb.group({
      id: [''],
      jobTitle: ['', Validators.required],
      companyName: ['', Validators.required],
      priority: [''],
      status: [''],
      postingUrl: ['', Validators.required],
      source: [''],
      salary: [''],
      type: [''],
      location: [''],
      dateApplied: [''],
      followUpDate: [''],
      notes: [''],
    });

    this.selectedJobSubscription = this.jobService.selectedJob$.subscribe(
      (job) => {
        if (job) {
          // TODO: Move date conversion logic to JobService.
          if (job.dateApplied) {
            job.dateApplied = new Date(job.dateApplied);
          }
          if (job.followUpDate) {
            job.followUpDate = new Date(job.followUpDate);
          }
          this.originalJobData = { ...job };
          this.jobForm.reset(job);
        } else {
          this.jobForm.reset();
        }
      }
    );
  }

  ngOnDestroy(): void {
    if (this.selectedJobSubscription) {
      this.selectedJobSubscription.unsubscribe();
    }
  }

  openUrl() {
    window.open(this.jobForm.get('postingUrl')?.value, '_blank');
  }

  saveJob = () => {
    if (this.jobForm.dirty && this.jobForm.valid) {
      const job = this.jobForm.value;
      this.jobService.saveJob(job).subscribe({
        next: () => {
          this.notificationService.showSuccess('Job saved successfully!');
          this.jobForm.reset();
        },
        error: (error) => {
          this.notificationService.showError(
            'An error occurred while saving the job: ' + error.message
          );
        },
      });
    }
  };

  cancel = () => {
    this.jobForm.reset(this.originalJobData);
  };
}
