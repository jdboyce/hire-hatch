import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Job } from 'src/app/models/job.model';
import { JobService } from 'src/app/services/job.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NavigationDirection } from 'src/app/models/navigation-direction.enum';

@Component({
  selector: 'app-job-table',
  templateUrl: './job-table.component.html',
  styleUrls: ['./job-table.component.scss'],
})
export class JobTableComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Output() jobSelected = new EventEmitter<Job>();

  dataSource = new MatTableDataSource<Job>([]);
  selectedJob!: Job | undefined;
  newJobSelected = false;

  displayedColumns: string[] = [
    'jobTitle',
    'companyName',
    'dateAdded',
    'priority',
    'status',
    'postingUrl',
  ];

  private jobsSubscription?: Subscription;
  private selectedJobSubscription?: Subscription;
  private jobNavigationSubscription?: Subscription;

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.jobsSubscription = this.jobService.jobs$.subscribe(
      (jobs) => (this.dataSource.data = jobs)
    );
    this.selectedJobSubscription = this.jobService.selectedJob$.subscribe(
      (selectedJob) => {
        if (selectedJob) {
          this.selectedJob = selectedJob;
          this.newJobSelected = !selectedJob.id;
        } else {
          this.selectedJob = undefined;
          this.newJobSelected = false;
        }
      }
    );
    this.jobNavigationSubscription = this.jobService.jobNavigation$.subscribe(
      (direction) => {
        this.navigateToJob(direction);
      }
    );
    this.jobService.loadData();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    if (this.jobsSubscription) {
      this.jobsSubscription.unsubscribe();
    }
    if (this.selectedJobSubscription) {
      this.selectedJobSubscription.unsubscribe();
    }
    if (this.jobNavigationSubscription) {
      this.jobNavigationSubscription.unsubscribe();
    }
  }

  selectJob(job: Job): void {
    this.jobService.selectJob(job);
    this.selectedJob = job;
  }

  deselectJob(): void {
    this.jobService.deselectJob();
    this.selectedJob = undefined;
  }

  navigateToJob(direction: NavigationDirection): void {
    const data = this.dataSource.filteredData;
    const numberOfJobs = data.length;
    const lastJobIndex = numberOfJobs - 1;

    if (numberOfJobs > 1) {
      if (this.selectedJob === undefined) {
        this.selectJob(data[0]);
        return;
      }

      const selectedJobIndex = data.findIndex(
        (job) => job.id === this.selectedJob?.id
      );

      if (direction === NavigationDirection.Next) {
        if (selectedJobIndex < lastJobIndex) {
          this.selectJob(data[selectedJobIndex + 1]);
        } else {
          this.selectJob(data[0]);
        }
      } else if (direction === NavigationDirection.Previous) {
        if (selectedJobIndex > 0) {
          this.selectJob(data[selectedJobIndex - 1]);
        } else {
          this.selectJob(data[lastJobIndex]);
        }
      }
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

    if (this.dataSource.filteredData.length > 0) {
      this.selectJob(this.dataSource.filteredData[0]);
    } else {
      this.deselectJob();
    }
  }

  addJob = (): void => {
    this.jobService.addJob();
  };

  deleteJob = (): void => {
    this.jobService.deleteJob();
  };
}
