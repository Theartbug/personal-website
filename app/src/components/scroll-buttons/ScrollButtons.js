import React, { PureComponent } from 'react';
import UpAngleIcon from 'react-icons/lib/fa/caret-up';
import DownAngleIcon from 'react-icons/lib/fa/caret-down';
import './scroll-buttons.css';

export default class ScrollButtons extends PureComponent {

  handleDownClick = () => this.props.changeScrollView(true);

  handleUpClick = () => this.props.changeScrollView(false);

  render() {

    const { handleDownClick, handleUpClick } = this;

    return (
      <div className="scroll-buttons">
        <button className="reset-button" onClick={handleUpClick}><UpAngleIcon/></button>
        <button className="reset-button" onClick={handleDownClick}><DownAngleIcon/></button>
      </div>
    );
  }
}