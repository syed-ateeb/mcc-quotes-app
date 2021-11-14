import firebase from 'firebase';
import { FIREBASE } from '../constants/keys';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: FIREBASE.apiKey,
  authDomain: FIREBASE.authDomain,
  projectId: FIREBASE.projectId,
  storageBucket: FIREBASE.storageBucket,
  messagingSenderId: FIREBASE.messagingSenderId,
  appId: FIREBASE.appId,
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth(app);
const db = firebase.firestore(app);

const saveQuoteToFirebase = async quote => {
  let quotes = [];
  try {
    const x = await loadQuotesFromFirebase();
    quotes = x.quote;
    for (let i = 0; i < quotes.length; i++) {
      if (quotes[i] === quote) return;
    }
  } catch (err) {}

  await db
    .collection('quotes')
    .doc(auth.currentUser.email)
    .set({ quote: [...quotes, quote] }, { merge: true });
};

const loadQuotesFromFirebase = async () => {
  const doc = await db.collection('quotes').doc(auth.currentUser.email).get();
  return doc.data();
};

export { auth, db, saveQuoteToFirebase, loadQuotesFromFirebase };
