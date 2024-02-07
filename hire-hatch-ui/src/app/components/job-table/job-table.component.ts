import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Job, MOCK_DATA } from 'src/app/models/job.model';


@Component({
  selector: 'app-job-table',
  templateUrl: './job-table.component.html',
  styleUrls: ['./job-table.component.scss']
})
export class JobTableComponent {
  displayedColumns: string[] = ['jobTitle', 'companyName', 'priority', 'status', 'source', 'postingUrl', 'notes'];
  dataSource = new MatTableDataSource(MOCK_DATA);
}
