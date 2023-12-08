// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyAnNBSTdqF29DNtVbHyccSB-ih6rZs7ouw',
	authDomain: 'plusframes-dev.firebaseapp.com',
	projectId: 'plusframes-dev',
	storageBucket: 'plusframes-dev.appspot.com',
	messagingSenderId: '916275048567',
	appId: '1:916275048567:web:9027825e341fb7773c9672',
	measurementId: 'G-R9G0E3J7CH'
}

// Initialize Firebase
const firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
const analytics = getAnalytics(firebase_app)

export default firebase_app
