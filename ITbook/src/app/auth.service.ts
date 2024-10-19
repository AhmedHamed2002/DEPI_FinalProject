import { Injectable, inject } from '@angular/core';
import { Auth, User, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut, onAuthStateChanged } from '@angular/fire/auth';
import { Observable, BehaviorSubject, from } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private firebaseAuth = inject(Auth);
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor() {
    onAuthStateChanged(this.firebaseAuth, (user) => {
      this.userSubject.next(user);
    });
  }

  register(email: string, username: string, password: string): Observable<void> {
    return from(createUserWithEmailAndPassword(this.firebaseAuth, email, password)
      .then(response => updateProfile(response.user, { displayName: username }))
    ).pipe(
      tap(() => {
        // After successful registration, Firebase will trigger onAuthStateChanged
        // which will update our userSubject
      })
    );
  }

  login(email: string, password: string): Observable<User> {
    return from(signInWithEmailAndPassword(this.firebaseAuth, email, password)
      .then(response => response.user)
    ).pipe(
      tap(user => {
        // After successful login, Firebase will trigger onAuthStateChanged
        // which will update our userSubject
      })
    );
  }

  logout(): Observable<void> {
    return from(this.firebaseAuth.signOut()).pipe(
      tap(() => {
        // After logout, Firebase will trigger onAuthStateChanged
        // which will update our userSubject to null
      })
    );
  }

  getCurrentUser(): User | null {
    return this.userSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }
}