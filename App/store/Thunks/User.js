// // CAN DELETE IF NO LONGER NEEDED

// import Firebase from "../../components/Firebase/Firebase";

// export const GET_USER = "GET_USER";
// export const REMOVE_USER = "REMOVE_USER";



// export const getUser = user => {
//   return { type: GET_USER, user };
// };
// export const removeUser = () => ({ type: REMOVE_USER });

// export const me = user => async dispatch => {
//   try {
//     const data = await Firebase.database
//       .ref(`users/${user.uid}`)
//       .once("value")
//       .then(snapshot => {
//         return snapshot.val();
//       });

//     dispatch(
//       getUser({
//         uid: user.uid,
//         purchases: data.purchases,
//         userInfo: data.userData,
//         recurringExpenses: data.recurringExpenses
//       })
//     );
//   } catch (err) {
//     console.error(err);
//   }
// };

// export const auth = (userData, method) => async dispatch => {
//   try {
//     if (method === "signup") {
//       const user = await Firebase.auth.createUserWithEmailAndPassword(
//         userData[0].email,
//         userData[0].password
//       );
//       Firebase.database.ref(`users/${user.user.uid}`).set({
//         userData: {
//           ...userData[0],
//           ...userData[1]
//         },
//         recurringExpenses: {
//           ...userData[2]
//         }
//       });
//       dispatch(getUser(user.user.uid));
//     } else {
//       const user = await Firebase.auth.signInWithEmailAndPassword(
//         userData.email,
//         userData.password
//       );
//       const data = await Firebase.database
//         .ref(`users/${user.user.uid}`)
//         .once("value");

//       dispatch(
//         getUser({
//           uid: user.user.uid,
//           purchases: data.purchases,
//           userInfo: data.userData,
//           recurringExpenses: data.recurringExpenses
//         })
//       );
//     }
//   } catch (err) {
//     return "Invalid Username or Password";
//   }
// };


// //     dispatch(
// //       getUser({
// //         uid: user.user.uid,
// //         purchases: data.purchases,
// //         userInfo: data.userData,
// //         recurringExpenses: data.recurringExpenses
// //       })
// //     );
// //   }
// //   } catch (err) {
// //     return 'Invalid Username or Password'
// //   }
// // };


// // export const logout = () => dispatch => {
// //   Firebase.auth
// //     .signOut()
// //     .then(() => dispatch(removeUser()))
// //     .catch(err => console.error(err));
// // };


// // export default function(state = defaultUser, action) {
// //   switch (action.type) {
// //     case GET_USER:
// //       return action.user;
// //     case REMOVE_USER:
// //       return defaultUser;
// //     default:
// //       return state;
// //   }
// // }

// export default function(state = defaultUser, action) {
//   switch (action.type) {
//     case GET_USER:
//       return action.user;
//     case REMOVE_USER:
//       return defaultUser;
//     default:
//       return state;
//   }
// }