  // src/lib/firebase.ts
    import { initializeApp } from "firebase/app";
    import { getAuth } from "firebase/auth";
    import { getFirestore } from "firebase/firestore"; // Import getFirestore
    import { getAnalytics } from "firebase/analytics"; // Optional, if you plan to use Analytics

    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyAs2C7ulBcoXw1IDh1HKAJg93QR_GTz7Sc",
      authDomain: "whizbee-99d8d.firebaseapp.com",
      projectId: "whizbee-99d8d",
      storageBucket: "whizbee-99d8d.firebasestorage.app",
      messagingSenderId: "871222447595",
      appId: "1:871222447595:web:d37f4ebd1f5682e0979dae",
      measurementId: "G-J0P9V1L05M" // Optional, for Analytics
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    // Initialize Firebase Authentication and get a reference to the service
    export const auth = getAuth(app);

    // Initialize Firebase Firestore and get a reference to the service
    export const db = getFirestore(app); // Export db instance

    // Initialize Firebase Analytics (if needed)
    export const analytics = getAnalytics(app); // You can export this if you'll use it elsewhere

    export default app; // Export the app instance as default if needed
    