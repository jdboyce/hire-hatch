import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobTableComponent } from './job-table.component';
import { MatTableModule } from '@angular/material/table';
import { Job, MOCK_DATA } from 'src/app/models/job.model';
import { of } from 'rxjs';
import { JobService } from 'src/app/services/job.service';

describe('JobTableComponent', () => {
  let component: JobTableComponent;
  let fixture: ComponentFixture<JobTableComponent>;
  let mockJobService = {
    getJobs: () => of(MOCK_DATA),
    selectJob: (job: Job) => {},
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobTableComponent],
      providers: [{ provide: JobService, useValue: mockJobService }],
      imports: [MatTableModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct displayed columns', () => {
    expect(component.displayedColumns).toEqual([
      'jobTitle',
      'companyName',
      'priority',
      'status',
      'source',
      'postingUrl',
      'notes',
    ]);
  });

  it('#ngOnInit should set jobs', () => {
    component.ngOnInit();
    expect(component.jobs).toEqual(MOCK_DATA);
  });

  it('#selectJob should set selectedJob and call jobService.selectJob', () => {
    const job: Job = MOCK_DATA[0];
    spyOn(mockJobService, 'selectJob');
    component.selectJob(job);
    expect(component.selectedJob).toEqual(job);
    expect(mockJobService.selectJob).toHaveBeenCalledWith(job);
  });
});
