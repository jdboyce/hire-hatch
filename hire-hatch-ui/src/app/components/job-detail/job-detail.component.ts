import { Component, OnDestroy, OnInit } from '@angular/core';
import { JobService } from 'src/app/services/job.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';
import { Job } from 'src/app/models/job.model';
import { Subscription, take } from 'rxjs';
import { DropdownOptions } from 'src/app/models/dropdown-options.model';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss'],
})
export class JobDetailComponent implements OnInit, OnDestroy {
  jobForm!: FormGroup;
  dropdownOptions: DropdownOptions = {
    jobTypes: [],
    priorities: [],
    statuses: [],
  };
  originalJobData: Job | undefined;
  selectedJobSubscription?: Subscription;
  newJobSelected = false;

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
      jobType: [''],
      location: [''],
      dateApplied: [''],
      followUpDate: [''],
      notes: [''],
    });

    this.selectedJobSubscription = this.jobService.selectedJob$.subscribe(
      (selectedJob) => {
        if (selectedJob) {
          this.originalJobData = { ...selectedJob };
          this.newJobSelected = !selectedJob.id;
          this.jobForm.reset(selectedJob);
        } else {
          this.jobForm.reset();
          this.newJobSelected = false;
        }
      }
    );

    this.jobService.getDropdownOptions().subscribe((options) => {
      if (options) {
        this.dropdownOptions.jobTypes = options.jobTypes;
        this.dropdownOptions.priorities = options.priorities;
        this.dropdownOptions.statuses = options.statuses;
      }
    });
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
