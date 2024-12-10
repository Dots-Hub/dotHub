import logo from './images/dotHub.png';
import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from './UserContext';
import { faVideo } from '@fortawesome/free-solid-svg-icons';




export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">
        <img src={logo} alt="dotHub Logo" className="logo-image" />
      </Link>
      <nav>
        {username && (
          <>
            <Link to="/create">
              <FontAwesomeIcon icon={faPenToSquare} style={{ marginRight: '10px' }} />
              Write
            </Link>
            <Link to="/watch">
            <FontAwesomeIcon icon={faVideo} style={{ marginRight: '10px'}}/>
            Watch
            </Link>
            <a onClick={logout}>Logout</a>

          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
