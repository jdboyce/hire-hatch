import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { User, LoginRequest, AuthResponse } from '../models/user.model';
import { take } from 'rxjs/operators';
import { environment } from '../../environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  const mockAuthResponse: AuthResponse = {
    token: 'test-token',
    email: 'test@example.com',
    expiresAt: '2025-12-31T23:59:59Z',
  };

  const mockUser: User = {
    id: 1,
    email: 'test@example.com',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('should login successfully and fetch user data', () => {
      const loginRequest: LoginRequest = {
        email: 'test@example.com',
        password: 'password123',
      };

      service.login(loginRequest.email, loginRequest.password).subscribe();

      const loginReq = httpMock.expectOne(`${environment.apiUrl}/auth/login`);
      expect(loginReq.request.method).toBe('POST');
      expect(loginReq.request.body).toEqual(loginRequest);
      loginReq.flush(mockAuthResponse);

      const userReq = httpMock.expectOne(`${environment.apiUrl}/auth/me`);
      expect(userReq.request.method).toBe('GET');
      userReq.flush(mockUser);
    });

    it('should handle login error', () => {
      const loginRequest: LoginRequest = {
        email: 'test@example.com',
        password: 'wrongpassword',
      };

      service.login(loginRequest.email, loginRequest.password).subscribe({
        next: () => fail('should have failed'),
        error: (error) => {
          expect(error.message).toBe('Invalid login credentials.');
        },
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/auth/login`);
      req.flush(
        { message: 'Invalid login credentials.' },
        { status: 401, statusText: 'Unauthorized' }
      );
    });
  });

  describe('logout', () => {
    it('should clear token and user data', () => {
      service.login('test@example.com', 'password').subscribe();
      const loginReq = httpMock.expectOne(`${environment.apiUrl}/auth/login`);
      loginReq.flush(mockAuthResponse);
      const userReq = httpMock.expectOne(`${environment.apiUrl}/auth/me`);
      userReq.flush(mockUser);

      expect(service.isLoggedIn()).toBe(true);

      service.logout();

      expect(service.isLoggedIn()).toBe(false);
      expect(service.getToken()).toBeNull();
    });
  });

  describe('isLoggedIn', () => {
    it('should return false when no token', () => {
      expect(service.isLoggedIn()).toBe(false);
    });

    it('should return true when token exists', () => {
      service.login('test@example.com', 'password').subscribe();
      const loginReq = httpMock.expectOne(`${environment.apiUrl}/auth/login`);
      loginReq.flush(mockAuthResponse);
      const userReq = httpMock.expectOne(`${environment.apiUrl}/auth/me`);
      userReq.flush(mockUser);

      expect(service.isLoggedIn()).toBe(true);
    });
  });

  describe('getCurrentUser', () => {
    it('should return current user observable', () => {
      service.getCurrentUser().subscribe((user) => {
        if (user && user.id !== 0) {
          expect(user).toEqual(mockUser);
        }
      });

      service.login('test@example.com', 'password').subscribe();
      const loginReq = httpMock.expectOne(`${environment.apiUrl}/auth/login`);
      loginReq.flush(mockAuthResponse);
      const userReq = httpMock.expectOne(`${environment.apiUrl}/auth/me`);
      userReq.flush(mockUser);
    });
  });
});
