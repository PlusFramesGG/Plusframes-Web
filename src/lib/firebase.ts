import { getApps, initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import {
	FIREBASE_API_KEY,
	FIREBASE_APP_ID,
	FIREBASE_AUTH_DOMAIN,
	FIREBASE_MEASUREMENT_ID,
	FIREBASE_MESSAGING_SENDER_ID,
	FIREBASE_PROJECT_ID,
	FIREBASE_STORAGE_BUCKET
} from '@/shared/constants'
// TODO: We can add the SDKs for any additional firebase products below
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
	apiKey: FIREBASE_API_KEY,
	authDomain: FIREBASE_AUTH_DOMAIN,
	projectId: FIREBASE_PROJECT_ID,
	storageBucket: FIREBASE_STORAGE_BUCKET,
	messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
	appId: FIREBASE_APP_ID,
	measurementId: FIREBASE_MEASUREMENT_ID
}


// TODO add firebase-admin to secure firestore
const firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
// export const analytics = getAnalytics(firebase_app)

export default firebase_app
