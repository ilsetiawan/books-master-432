import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: 'AIzaSyA0jk4iNpegHPJjfaaIKvtaf1VXrQcFiiw',
  authDomain: 'react-crud-f69de.firebaseapp.com',
  projectId: 'react-crud-f69de',
  storageBucket: 'react-crud-f69de.appspot.com',
  messagingSenderId: '226171069493',
  appId: '1:226171069493:web:a77f3d3b2c763b90273d7c',
  measurementId: 'G-EQKYJPS4EK',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
