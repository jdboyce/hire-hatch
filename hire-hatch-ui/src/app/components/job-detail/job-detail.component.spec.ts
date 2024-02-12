import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDetailComponent } from './job-detail.component';
import { Job } from 'src/app/models/job.model';
import { MatCardModule } from '@angular/material/card';
describe('JobDetailComponent', () => {
  let component: JobDetailComponent;
  let fixture: ComponentFixture<JobDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobDetailComponent],
      imports: [MatCardModule],
    }).compileComponents();

    fixture = TestBed.createComponent(JobDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the job title', () => {
    const job: Job = {
      id: '1',
      jobTitle: 'Software Engineer',
      companyName: 'Awesome Company',
      priority: 'High',
      status: 'Open',
      source: 'LinkedIn',
      postingUrl: 'https://example.com',
      notes: 'Test note',
    };
    component.job = job;
    fixture.detectChanges();
    const jobTitleElement: HTMLElement =
      fixture.nativeElement.querySelector('mat-card-title');
    expect(jobTitleElement.textContent).toContain(job.jobTitle);
  });

  it('should display the company name', () => {
    const job: Job = {
      id: '2',
      jobTitle: 'Frontend Developer',
      companyName: 'Amazing Company',
      priority: 'Medium',
      status: 'Closed',
      source: 'Indeed',
      postingUrl: 'https://example2.com',
      notes: 'Another test note',
    };
    component.job = job;
    fixture.detectChanges();
    const companyNameElement: HTMLInputElement =
      fixture.nativeElement.querySelector('input[type="text"]');
    expect(companyNameElement.value).toContain(job.companyName);
  });
});
