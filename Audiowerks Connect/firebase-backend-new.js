// Firebase is already initialized in firebase-config-new.js
// Auth reference
const auth = firebase.auth();
// Database reference
window.db = firebase.database();

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
  return window.db.ref('feedback').push(feedbackObj);
}

// Get current user
function getCurrentUser() {
  return auth.currentUser;
}

// --- Bookings ---
function getAllBookings() {
  return window.db.ref('bookings').once('value').then(snap => snap.val());
}

function updateBooking(bookingId, data) {
  return window.db.ref('bookings/' + bookingId).update(data);
}

function deleteBooking(bookingId) {
  return window.db.ref('bookings/' + bookingId).remove();
}

// --- Announcements ---
function getAllAnnouncements() {
  return window.db.ref('announcements').once('value').then(snap => snap.val());
}

function addAnnouncement(text) {
  const newRef = window.db.ref('announcements').push();
  return newRef.set({ text });
}

function updateAnnouncement(id, text) {
  return window.db.ref('announcements/' + id).update({ text });
}

function deleteAnnouncement(id) {
  return window.db.ref('announcements/' + id).remove();
}

// --- Services ---
function getAllServices() {
  return window.db.ref('services').once('value').then(snap => snap.val());
}

function addService(serviceObj) {
  const newRef = window.db.ref('services').push();
  return newRef.set(serviceObj);
}

function updateService(id, serviceObj) {
  return window.db.ref('services/' + id).update(serviceObj);
}

function deleteService(id) {
  return window.db.ref('services/' + id).remove();
}

// --- Bundles ---
function getAllBundles() {
  return window.db.ref('bundles').once('value').then(snap => snap.val());
}

function addBundle(bundleObj) {
  const newRef = window.db.ref('bundles').push();
  return newRef.set(bundleObj);
}

function updateBundle(id, bundleObj) {
  return window.db.ref('bundles/' + id).update(bundleObj);
}

function deleteBundle(id) {
  return window.db.ref('bundles/' + id).remove();
}

// --- Admin Check ---
// Check if user is admin by finding their username and checking if it exists in admins node
function isAdmin(user) {
  return window.db.ref('users').once('value').then(snap => {
    const users = snap.val() || {};
    let username = null;
    
    // Find username by email
    for (const [uname, udata] of Object.entries(users)) {
      if (udata.email && udata.email.replace(/^"|"$/g, '') === user.email) {
        username = uname;
        break;
      }
    }
    
    if (!username) return false;
    
    // Check if username is in admins
    return window.db.ref('admins/' + username).once('value').then(adminSnap => adminSnap.exists());
  });
}

// Expose functions globally
window.register = register;
window.login = login;
window.logout = logout;
window.submitFeedback = submitFeedback;
window.getCurrentUser = getCurrentUser;
window.getAllBookings = getAllBookings;
window.updateBooking = updateBooking;
window.deleteBooking = deleteBooking;
window.getAllAnnouncements = getAllAnnouncements;
window.addAnnouncement = addAnnouncement;
window.updateAnnouncement = updateAnnouncement;
window.deleteAnnouncement = deleteAnnouncement;
window.getAllServices = getAllServices;
window.addService = addService;
window.updateService = updateService;
window.deleteService = deleteService;
window.getAllBundles = getAllBundles;
window.addBundle = addBundle;
window.updateBundle = updateBundle;
window.deleteBundle = deleteBundle;
window.isAdmin = isAdmin; 