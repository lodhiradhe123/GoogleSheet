// import React, { useEffect } from "react";
// import { gapi } from "gapi-script";

// const CLIENT_ID =
//   "1089927612551-cq5j522pn8p4skie9ub0i5ukl3bmo793.apps.googleusercontent.com";
// const API_KEY = "AIzaSyDJMmlv7Y4MzBeja0pM11zdn6y4k9G4yyE";
// const SCOPES =
//   "https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive.file";

// const GoogleAuth = ({ onSignIn }) => {
//   useEffect(() => {
//     const initClient = () => {
//       gapi.client
//         .init({
//           apiKey: API_KEY,
//           clientId: CLIENT_ID,
//           discoveryDocs: [
//             "https://sheets.googleapis.com/$discovery/rest?version=v4",
//           ],
//           scope: SCOPES,
//         })
//         .then(() => {
//           const authInstance = gapi.auth2.getAuthInstance();
//           if (authInstance.isSignedIn.get()) {
//             onSignIn(authInstance.currentUser.get());
//           }
//         });
//     };
//     gapi.load("client:auth2", initClient);
//   }, [onSignIn]);

//   const handleSignIn = () => {
//     const authInstance = gapi.auth2.getAuthInstance();
//     authInstance.signIn().then((user) => {
//       onSignIn(user);
//     });
//   };

//   return <button onClick={handleSignIn}>Sign in with Google</button>;
// };

// export default GoogleAuth;
