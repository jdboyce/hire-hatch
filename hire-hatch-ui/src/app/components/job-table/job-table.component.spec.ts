import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobTableComponent } from './job-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MOCK_DATA } from 'src/app/models/job.model';

describe('JobTableComponent', () => {
  let component: JobTableComponent;
  let fixture: ComponentFixture<JobTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobTableComponent],
      imports: [MatTableModule]
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
    expect(component.displayedColumns).toEqual(['jobTitle', 'companyName', 'priority', 'status', 'source', 'postingUrl', 'notes']);
  });

  it('should have the correct data source', () => {
    expect(component.dataSource).toBeInstanceOf(MatTableDataSource);
    expect(component.dataSource.data).toEqual(MOCK_DATA); // Assuming MOCK_DATA is defined
  });
});