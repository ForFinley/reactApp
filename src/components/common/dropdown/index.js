import React from 'react';
import { Link } from 'react-router-dom';
import './Dropdown.scss';

class Dropdown extends React.Component {

  state = {
    isOpen: false
  }

  openDropdown = () => {
    this.setState({isOpen: true})
  }

  closeDropdown = () => {
    this.setState({isOpen: false})
  }

  renderDropdown = () => (
    <ul className="Dropdown__list">
      {
        this.props.items.length > 0 && this.props.items.map(i =>
          <li key={i.display} className="Dropdown__list-item">
            {
              i.type === 'router-link' && (
                <Link to={i.to}>{i.display}</Link>
              )
            }
            {
              i.type === 'click' && (
                <div onClick={i.onClick}>{i.display}</div>
              )
            }
          </li>
        )
      }
    </ul>)

  render() {
    const { isOpen } = this.state;
    return (
      <div className="Dropdown" onMouseEnter={this.openDropdown} onMouseLeave={this.closeDropdown}>
        <div className="Dropdown__element-container">
          {this.props.renderElement()}
        </div>
        {isOpen && this.renderDropdown()}
      </div>
    )
  }
}

export default Dropdown;
