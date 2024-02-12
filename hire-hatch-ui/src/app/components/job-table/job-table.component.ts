import { Component, EventEmitter, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Job, MOCK_DATA } from 'src/app/models/job.model';

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
    'source',
    'postingUrl',
    'notes',
  ];
  dataSource = new MatTableDataSource(MOCK_DATA);
  selectedJob!: Job;

  selectJob(job: Job) {
    this.selectedJob = job;
    this.jobSelected.emit(job);
  }
}
