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
  newJobSelected = false;

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
      (selectedJob) => {
        if (selectedJob) {
          // TODO: Move date conversion logic to JobService.
          if (selectedJob.dateApplied) {
            selectedJob.dateApplied = new Date(selectedJob.dateApplied);
          }
          if (selectedJob.followUpDate) {
            selectedJob.followUpDate = new Date(selectedJob.followUpDate);
          }
          this.originalJobData = { ...selectedJob };
          this.newJobSelected = !selectedJob.id;
          this.jobForm.reset(selectedJob);
        } else {
          this.jobForm.reset();
          this.newJobSelected = false;
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

  saveJob = (): void => {
    if (this.jobForm.dirty && this.jobForm.valid) {
      let job = this.jobForm.value;
      if (!this.newJobSelected) {
        job = { id: this.originalJobData?.id, ...this.jobForm.value };
      }
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

  cancel = (): void => {
    if (this.newJobSelected) {
      this.jobForm.reset();
      this.jobService.discardNewJob();
    } else {
      this.jobForm.reset(this.originalJobData);
    }
  };
}
