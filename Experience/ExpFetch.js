import { getAuth } from 'firebase/auth'; // Correct import for Firebase Auth
import { getDocs, doc, getFirestore, collection, query, orderBy } from 'firebase/firestore'; // Firestore imports
import app from '../firebaseConfig'; // Your Firebase config

// Initialize services
const auth = getAuth(app); // Get Auth instance
const db = getFirestore(app); // Get Firestore instance

const ExpFetch = async () => {
  const user = auth.currentUser; // Get current user
  //alert(user.uid)
  if (!user) {
    throw new Error("User not authenticated");
  }
  
  const querySnapshot = await getDocs(
    query(
      collection(db, "jatekosok", user.uid, "meccsek"),
      orderBy("datum", "desc")
    )
  );
  const documents = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return documents;
};

export default ExpFetch;