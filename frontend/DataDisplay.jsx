import React from "react";
import "./css/DataDisplay.css";
import { Grid } from '@material-ui/core';
import { FcCancel, FcCheckmark } from "react-icons/fc";

export default function DataDisplay({ onChange, users, /** show */ }) {

  // if (!show)
  //   return null;

  return (
    <div className="user-display">
      <Grid container spacing={2} direction="row" justify="center" alignItems="center">
        <div className="user-name">
          <label>
            NAME
          </label>
          {users.map((user) => <p><input checked={user.checked} type="checkbox" key={user.id} value={user.id} onChange={onChange}/>{user.name}</p>)}
        </div>
        <div className="user-activated">
          <label>
            ACTIVATED
          </label>
          {users.map((user) => !(user.isActivated) ? <p><FcCancel/></p> : <p><FcCheckmark/></p>)}
        </div>
      </Grid>
    </div>
  )
}
