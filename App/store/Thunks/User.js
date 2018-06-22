import axios from 'axios';
export const GET_USER = 'GET_USER';
export const REMOVE_USER = 'REMOVE_USER';


export const defaultUser = {
};

export const getUser = user => (
    { type: GET_USER, user })
export const removeUser = () => ({ type: REMOVE_USER });


export const me = () => async dispatch => {
   const {data} = await axios.get('http://localhost:19004/auth/me')
   console.log(data)
    dispatch(getUser(data || defaultUser))}


    export const auth = (userData, method) => async dispatch => {
          if (method === 'signup') {
            const {data } = await axios.post(`http://localhost:19004/auth/${method}`, { ...userData[0], ...userData[1], ...userData[2]})
            console.log(data)
            dispatch(getUser(data))
          }
          else {
            const {data} =  await axios.post(`http://localhost:19004/auth/${method}`, userData)
            dispatch(getUser(data))
          }

    }
      // fetch(`http://localhost:19004/auth/${method}`, {method: 'POST', body: JSON.stringify(
      //  userData
      // )})
      // .then(
      //     res => {
      //         dispatch(getUser(res.data))
      //     },
      //     authError => {
      //         // rare example: a good use case for parallel (non-catch) error handler
      //         dispatch(getUser({error: authError}))
      //     }
      // )
      // .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))}


export const logout = () => dispatch =>
  axios
    .post('/auth/logout')
    .then(_ => {
      dispatch(removeUser());
    })
    .catch(err => console.error(err));


export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
    return action.user
    case REMOVE_USER:
    return defaultUser;
    default:
    return state;
  }
}

