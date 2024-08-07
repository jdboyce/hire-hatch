import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { JobTableComponent } from './components/job-table/job-table.component';
import { JobDetailComponent } from './components/job-detail/job-detail.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActionButtonComponent } from './shared/action-button/action-button.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatSnackBarModule,
        MatDialogModule,
        MatPaginatorModule,
        MatSortModule,
      ],
      declarations: [
        AppComponent,
        JobTableComponent,
        JobDetailComponent,
        ActionButtonComponent,
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'hire-hatch-ui'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('hire-hatch-ui');
  });
});
