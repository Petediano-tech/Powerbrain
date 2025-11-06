'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';

let firebaseApp: FirebaseApp;
const USE_EMULATORS = process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATORS === 'true';

// IMPORTANT: DO NOT MODIFY THIS FUNCTION
export function initializeFirebase() {
  if (!getApps().length) {
    // When deployed to Firebase App Hosting, the SDK is automatically initialized.
    // In other environments, we need to provide the config.
    if (process.env.FIREBASE_APP_HOSTING_URL) {
      firebaseApp = initializeApp();
    } else {
      firebaseApp = initializeApp(firebaseConfig);
    }

    if (USE_EMULATORS) {
      console.log('Using Firebase Emulators');
      connectFirestoreEmulator(getFirestore(firebaseApp), 'localhost', 8080);
      connectAuthEmulator(getAuth(firebaseApp), 'http://localhost:9099');
      connectStorageEmulator(getStorage(firebaseApp), 'localhost', 9199);
      connectFunctionsEmulator(getFunctions(firebaseApp), 'localhost', 5001);
    }

    return getSdks(firebaseApp);
  }

  // If already initialized, return the SDKs with the already initialized App
  return getSdks(getApp());
}

export function getSdks(firebaseApp: FirebaseApp) {
  const firestore = getFirestore(firebaseApp);
  const storage = getStorage(firebaseApp);
  return {
    firebaseApp,
    auth: getAuth(firebaseApp),
    firestore: firestore,
    storage: storage,
  };
}

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './errors';
export * from './error-emitter';