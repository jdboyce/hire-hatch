import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { tap, catchError, switchMap } from 'rxjs/operators';
import { User, LoginRequest, AuthResponse } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string | null = null;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<void> {
    const loginRequest: LoginRequest = { email, password };

    return this.http
      .post<AuthResponse>(`${this.apiUrl}/auth/login`, loginRequest)
      .pipe(
        tap((response) => {
          this.token = response.token;
          const user: User = {
            id: 0,
            email: response.email,
          };
          this.currentUserSubject.next(user);
        }),
        switchMap(() => this.fetchCurrentUser()),
        catchError((error: any) => {
          console.error('Login failed:', error);
          const errorMessage = error.error?.message || 'Login failed';
          return throwError(() => new Error(errorMessage));
        })
      );
  }

  private fetchCurrentUser(): Observable<void> {
    if (!this.token) {
      return throwError(() => new Error('No token available'));
    }

    return this.http.get<User>(`${this.apiUrl}/auth/me`).pipe(
      tap((user) => {
        this.currentUserSubject.next(user);
      }),
      switchMap(() => of(void 0)),
      catchError((error: any) => {
        console.error('Failed to fetch user:', error);
        return throwError(() => new Error('Failed to fetch user information'));
      })
    );
  }

  logout(): void {
    this.token = null;
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return this.token;
  }

  getCurrentUser(): Observable<User | null> {
    return this.currentUser$;
  }

  isLoggedIn(): boolean {
    return this.token !== null;
  }
}
