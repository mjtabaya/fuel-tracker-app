import React from 'react';

const LoggedInHeader = (props) => {
  const logout = () => {
    props.onClick();
  }

  return (
    <div>
      <h1>Welcome, {props.user.first_name}</h1>
      <button className="ui button right floated"
            onClick={logout}>Logout</button>
    </div>
  )
}

export default LoggedInHeader;
