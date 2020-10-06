import React from "react";
import Alert from 'react-bootstrap/Alert'

export default function AlertDismissible({ message, onClose }) {

  return (
    <Alert show={!!message} variant="danger" onClose={onClose} dismissible>
      {message}
    </Alert>
  );
}

