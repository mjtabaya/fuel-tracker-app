import React from 'react';

const LoggedInHeader = (props) => {
  const logout = () => {
    props.onClick();
  }

  if(props) {
    return (
      <div>
        <h1>Welcome, {props.user.first_name}</h1>
        <h1>Role: {props.user.role}</h1>
        <button className="ui button right floated"
              onClick={logout}>Logout</button>
      </div>
    )
  }
  else
    return null;
}

export default LoggedInHeader;
