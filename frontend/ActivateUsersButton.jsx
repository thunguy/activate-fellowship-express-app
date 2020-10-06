import React from "react";
import Button from 'react-bootstrap/Button';

/**
 *
 * @param {Object} props
 * @param {function(Event):undefined} props.onClick - function to run when this component is clicked
 * @returns {React.Component}
 */

export default function ActivateUsersButton({ onClick, disabled, /** show */ } = {}) {

  // if (!show)
  //   return null;

  return <Button variant="info" onClick={onClick} disabled={disabled}>ACTIVATE</Button>
}
