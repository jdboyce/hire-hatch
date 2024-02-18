import { Component } from '@angular/core';
import { JobService } from 'src/app/services/job.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss'],
})
export class JobDetailComponent {
  jobForm!: FormGroup;
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

  constructor(private jobService: JobService, private fb: FormBuilder) {}

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

    this.jobService.selectedJob$.subscribe((job) => {
      if (job) {
        // TODO: Move date conversion logic to JobService.
        if (job.dateApplied) {
          job.dateApplied = new Date(job.dateApplied);
        }
        if (job.followUpDate) {
          job.followUpDate = new Date(job.followUpDate);
        }
        this.jobForm.patchValue(job);
      } else {
        this.jobForm.reset();
      }
    });
  }

  openUrl() {
    window.open(this.jobForm.get('postingUrl')?.value, '_blank');
  }
}
