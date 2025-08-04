import { TestBed } from '@angular/core/testing';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { of } from 'rxjs';

import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from '../services/auth.service';

describe('AuthInterceptor', () => {
  let interceptor: AuthInterceptor;
  let authService: jasmine.SpyObj<AuthService>;
  let nextHandler: jasmine.SpyObj<HttpHandler>;

  beforeEach(() => {
    const authSpy = jasmine.createSpyObj('AuthService', ['getToken']);
    nextHandler = jasmine.createSpyObj('HttpHandler', ['handle']);

    TestBed.configureTestingModule({
      providers: [AuthInterceptor, { provide: AuthService, useValue: authSpy }],
    });

    interceptor = TestBed.inject(AuthInterceptor);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should add Authorization header when token exists', () => {
    const token = 'test-token';
    const request = new HttpRequest('GET', '/api/test');
    const expectedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    authService.getToken.and.returnValue(token);
    nextHandler.handle.and.returnValue(of({} as HttpEvent<any>));

    interceptor.intercept(request, nextHandler);

    expect(authService.getToken).toHaveBeenCalled();
    expect(nextHandler.handle).toHaveBeenCalledWith(expectedRequest);
  });

  it('should not add Authorization header when no token exists', () => {
    const request = new HttpRequest('GET', '/api/test');

    authService.getToken.and.returnValue(null);
    nextHandler.handle.and.returnValue(of({} as HttpEvent<any>));

    interceptor.intercept(request, nextHandler);

    expect(authService.getToken).toHaveBeenCalled();
    expect(nextHandler.handle).toHaveBeenCalledWith(request);
  });

  it('should pass through the request unchanged when no token', () => {
    const request = new HttpRequest('POST', '/api/test', { data: 'test' });

    authService.getToken.and.returnValue(null);
    nextHandler.handle.and.returnValue(of({} as HttpEvent<any>));

    interceptor.intercept(request, nextHandler);

    expect(nextHandler.handle).toHaveBeenCalledWith(request);
  });
});
