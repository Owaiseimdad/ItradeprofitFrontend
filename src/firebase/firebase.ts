import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDQqs_Rp99JwJ1U8n3JmpgbOiU6kEasYwo',
  authDomain: 'metricshub-e11ed.firebaseapp.com',
  projectId: 'metricshub-e11ed',
  storageBucket: 'metricshub-e11ed.appspot.com',
  messagingSenderId: '875211567143',
  appId: '1:875211567143:web:f9e46d46a90b9895475e02',
  measurementId: 'G-B9TW386EHL',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
