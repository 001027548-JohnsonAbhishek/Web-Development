import './App.css';
import { useState, useEffect } from 'react';
import { endSession, checkSession} from './services';
import Nav from './Nav';
import Login from './Login';
import CryptoPulse from './CryptoPulse';
import MessageDialogBox from './MessageDialogBox';

function App() {
 
  const [userState, setUserState] = useState({ isLoggedIn: false, isPending: true });
  const [error,setError] = useState();

  useEffect( () => {
    checkSession()
    .then( userinfo => {
      setUserState({
        isLoggedIn: true,
        isPending: false,
        username: userinfo.username,
      });
      setError('');
    })
    .catch( (err) => {
      setUserState({
        isLoggedIn: false,
        isPending: false,
      });
      setError(err.error);
    });
  }, []);

  //Login Logic triggered when login button clicked
  const login = function({username}) {
    setUserState({
      isLoggedIn: true,
      isPending: false,
      username,
    });
  };

  //Logout
  const logout = function() {
    setUserState({
      ...userState,
      isPending: true,
    });
    endSession()
    .then( (info) => {
      setUserState({
        isLoggedIn: false,
        isPending: false,
      });
      setError(info.status);//Sets the logout success status of the application
    })
    .catch( () => {
      setUserState({
        ...userState,
        isPending: false,
      });
      setError('Unable to Logout');      
    });

  };
  

  if(userState.isPending) {
    return (
      <div className="app">
        Loading...
      </div>
    );
  }

  let content;

  if(userState.isLoggedIn) {
    content = <CryptoPulse login={login} />;
  } else {
    content = <Login onLogin={login}/>;
  }

  return (
    <div className="app">
      <Nav user={userState} onLogout={logout}/>
      {content}
      <MessageDialogBox errorMessage={error} err={setError}/>
    </div>
  );
}

export default App;
