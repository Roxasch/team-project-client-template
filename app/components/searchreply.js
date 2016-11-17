import React from 'react';
import { Link } from 'react-router';

export default class SearchReply extends React.Component {
  render() {
    return (
      <li>
        <a>
          <div className="row result">
            <div className="col-sm-4">
              name close to the thing searched for
            </div>
            <div className="col-sm-8">
              some info about the thing searched for
            </div>
          </div>
        </a>
      </li>
    )
  }
}
