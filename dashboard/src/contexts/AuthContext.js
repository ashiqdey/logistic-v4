import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';

// hook
// import useLocalStorage from '../hooks/useLocalStorage';
import useApi from '../hooks/api/useApi';
//
import { urls } from '../configs';


// -----------------------------------------------


const initialState = {
  // TODO : remove this or use this
  // user: null,
  // isAuthenticated: false,

  user: null,
};

/*
const handlers = {
  LOGIN: (state, action) => ({
    ...state,
    isAuthenticated: true,
    user: action.payload,
  }),
  SETDATA: (state, action) => {
    const {
      kitchens,
      selectedKitchen,
      salesTypes,
      paymentTypes,
      dataInputTypes
    } = action.payload;
    return {
      ...state,
      kitchens,
      selectedKitchen,
      salesTypes,
      paymentTypes,
      dataInputTypes
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    auth: null,
    kitchens: null,
    selectedKitchen: null,
    salesTypes: null,
    paymentTypes: null,
    dataInputTypes: null,
  }),
};


const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);
*/


const AuthContext = createContext({
  ...initialState,
  setUser: () => { },
  login: () => { },
  getToken: () => { },
  logout: () => { },
  resetAuth: () => { },
});

// -----------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }) {
  const { enqueueSnackbar } = useSnackbar();
  const { fetchResponse } = useApi();

  // const [state, dispatch] = useReducer(reducer, initialState);

  const [user, setUser] = useState(null);



  useEffect(() => {
    if (user) {
      // console.log('c/ac/108 auth changed', user);

    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])


  const setUserData = (res) => {
    setUser({
      access: res.access || 0,
      dp: res.dp || '',
      email: res.email || '',
      id: res.id || '',
      name: res.name || '',
      status: res.status || '',
      token: res.token || null,
    });
  }



  const login = async (email, password, type = 'password') => (
    fetchResponse(urls.authenticate, 'POST', { email, password, type }, {}, true)
      .then((res) => {
        if (res.error) return;

        setUserData(res);
      })
    // .catch(err => {
    //   console.error('authContext/124', err);
    // });
  );



  // get token 
  const getToken = () => (
    fetchResponse(urls.getToken, 'GET', {}, {}, true, false)
      .then((res) => {
        if (res.error) return;

        setUserData(res);
      })
    // .catch(err => {
    //   console.error('authContext/143', err);
    // });
  );



  const logout = () => {
    fetchResponse(urls.logout, 'GET', {}, {}, true)
      .then((res) => {
        console.log('authContext/147', res);

        if (res.error) return;

        setUser(null);
      })
    // .catch(err => {
    //   console.error('authContext/155', err);
    // });
  };



  const resetAuth = () => {
    console.log("App data resetAuth");

    setUser(null);

    console.log('243', user);

    // clear only compulsory keys
    // localStorage.clear();
    // window.localStorage.removeItem("auth");
  };




  /*
    const login = async () => {
      await auth0Client.loginWithPopup();
      const isAuthenticated = await auth0Client.isAuthenticated();
   
      if (isAuthenticated) {
        const user = await auth0Client.getUser();
        dispatch({ type: 'LOGIN', payload: { user } });
      }
    };
   
    const logout = () => {
      auth0Client.logout();
      dispatch({ type: 'LOGOUT' });
    };
  */

  return (
    <AuthContext.Provider
      value={{
        // ...state,
        user,
        setUser,
        login,
        getToken,
        logout,
        resetAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
