// Firebase is already initialized in firebase-config-new.js
// Auth reference
const auth = firebase.auth();
// Database reference
let db = firebase.database();

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

// --- Bookings ---
function getAllBookings() {
  return db.ref('bookings').once('value').then(snap => snap.val());
}

function updateBooking(bookingId, data) {
  return db.ref('bookings/' + bookingId).update(data);
}

function deleteBooking(bookingId) {
  return db.ref('bookings/' + bookingId).remove();
}

// --- Announcements ---
function getAllAnnouncements() {
  return db.ref('announcements').once('value').then(snap => snap.val());
}

function addAnnouncement(text) {
  const newRef = db.ref('announcements').push();
  return newRef.set({ text });
}

function updateAnnouncement(id, text) {
  return db.ref('announcements/' + id).update({ text });
}

function deleteAnnouncement(id) {
  return db.ref('announcements/' + id).remove();
}

// --- Services ---
function getAllServices() {
  return db.ref('services').once('value').then(snap => snap.val());
}

function addService(serviceObj) {
  const newRef = db.ref('services').push();
  return newRef.set(serviceObj);
}

function updateService(id, serviceObj) {
  return db.ref('services/' + id).update(serviceObj);
}

function deleteService(id) {
  return db.ref('services/' + id).remove();
}

// --- Bundles ---
function getAllBundles() {
  return db.ref('bundles').once('value').then(snap => snap.val());
}

function addBundle(bundleObj) {
  const newRef = db.ref('bundles').push();
  return newRef.set(bundleObj);
}

function updateBundle(id, bundleObj) {
  return db.ref('bundles/' + id).update(bundleObj);
}

function deleteBundle(id) {
  return db.ref('bundles/' + id).remove();
}

// --- Admin Check ---
// Example: check if user email is in a list of admin emails in the database
function isAdmin(user) {
  if (!user || !user.email) return Promise.resolve(false);
  return db.ref('admins').orderByChild('email').equalTo(user.email).once('value').then(snap => snap.exists());
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