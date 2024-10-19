import { ApplicationConfig } from '@angular/core';
import { provideZoneChangeDetection } from "@angular/core"
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD49epG0Fsok2RoywKu1Qm4zfREWwp6zH0",
  authDomain: "depi-3bd96.firebaseapp.com",
  projectId: "depi-3bd96",
  storageBucket: "depi-3bd96.appspot.com",
  messagingSenderId: "1056112168322",
  appId: "1:1056112168322:web:a1127bd177b9610290d39b",
  measurementId: "G-5T99EFBS88"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), 
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
  ]
};
