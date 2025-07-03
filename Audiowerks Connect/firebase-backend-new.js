// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Auth reference
const auth = firebase.auth();
// Database reference
const db = firebase.database();

// Register a new user
function register(email, password) {
  return auth.createUserWithEmailAndPassword(email, password);
}

// Login an existing user
function login(email, password) {
  return auth.signInWithEmailAndPassword(email, password);
}

// Logout current user
function logout() {
  return auth.signOut();
}

// Submit feedback (writes to /feedback in Realtime Database)
function submitFeedback(feedbackObj) {
  return db.ref('feedback').push(feedbackObj);
}

// Get current user
function getCurrentUser() {
  return auth.currentUser;
}

// Expose functions globally
window.register = register;
window.login = login;
window.logout = logout;
window.submitFeedback = submitFeedback;
window.getCurrentUser = getCurrentUser; 