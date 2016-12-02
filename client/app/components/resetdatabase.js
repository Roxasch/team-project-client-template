import React from 'react';
import { Link } from 'react-router';
import { resetDb } from '../server';

/**
 * Reset database button.
 */
export default class ResetDatabase extends React.Component {
  render() {
    return (
      <button className="btn btn-default" type="button" onClick={() => {
        resetDb();
        window.alert("Database reset! Refreshing the page now...");
        document.location.reload(false);
      }}>Reset Mock DB</button>
    );
  }
}