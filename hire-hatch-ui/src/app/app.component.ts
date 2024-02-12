import { Component } from '@angular/core';
import { Job } from './models/job.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'hire-hatch-ui';
  selectedJob!: Job;
}
