import React from "react";
import { NavLink } from "react-router-dom";
import "./LinkList.scss";

class LinkList extends React.Component {
  render() {
    return (
      <div className="LinkList">
        {this.props.links &&
          this.props.links.length > 0 &&
          this.props.links.map(l => (
            <NavLink className="LinkList__link" to={l.path}>
              {l.icon ? l.icon : ""} {l.text}
            </NavLink>
          ))}
      </div>
    );
  }
}

export default LinkList;
