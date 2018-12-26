import React from "react";
import { NavLink } from "react-router-dom";
import "./LinkList.scss";

class LinkList extends React.Component {
  render() {
    return (
      <div className="LinkList">
        <NavLink className="LinkList__link" to="/settings/password">
          <i class="fas fa-unlock-alt" /> Password
        </NavLink>
        <NavLink className="LinkList__link" to="/settings/payment">
          <i class="far fa-credit-card" /> Payment
        </NavLink>
      </div>
    );
  }
}

export default LinkList;
