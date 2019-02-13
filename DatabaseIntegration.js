import * as firebase from 'firebase';

// Get a reference to the database service
var database = firebase.database();

// Basic write operations to save data to specific
// function writeUserData(userId, name, email, imageUrl) {
//   firebase.database().ref('users/' + userId).set({
//     username: name,
//     email: email,
//     profile_picture : imageUrl
//   });
// }

// Basic read operations
var allCasesRef = firebase.database().ref();
// Read data as static snapshot of database contents
// Watch for changes, returns null if no data
allCasesRef.on("value", function(snapshot) {
	console.log(snapshot.val());
}, function(error) {
	console.log("Error: " + error.code);
});

