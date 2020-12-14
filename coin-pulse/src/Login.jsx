import { useState } from 'react';
import { createSession } from './services';
import MessageDialogBox from './MessageDialogBox';
import './public/login.css';

const Login = function({ onLogin }) {

  const [username, setUsername] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const [error,setError] = useState('');

  const onChange = (e) => {
    setUsername(e.target.value);
    setIsDisabled(!e.target.value);
  };

  const login = () => {
    setIsPending(true);
    createSession({ username })
    .then( () => {
      onLogin({ username });
      setIsPending(false);
      setError('');
    })
    .catch( err => {
      setIsPending(false);
      setError(err);
    });
  };

  let contentError;

  if(error){
    contentError = <MessageDialogBox errorMessage={error} err={setError}/>;
  }
  else
    contentError = null;


  return (
    <div className="status">
      <div className="login-section">
        <h2 className="login-header">Login to Crypto Pulse</h2>
        <label className="user-label">
          Username
          <input className="login-input" disabled={isPending} onChange={onChange} value={username} />
        </label>
        <button className="login-btn" onClick={login} disabled={isDisabled || isPending} >{ isPending ? "..." : "Login"}</button>
      </div>
      {contentError}
    </div>
  );
};
export default Login;
