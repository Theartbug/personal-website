import React, { PureComponent } from 'react';
import { Events } from 'react-scroll';
import { connect } from 'react-redux';
import { setCurrentSectionByButtons, setButtonScroll } from './actions';
import UpAngleIcon from 'react-icons/lib/fa/caret-up';
import DownAngleIcon from 'react-icons/lib/fa/caret-down';
import './scroll-buttons.css';

class ScrollButtons extends PureComponent {

  componentDidMount() {
    //so the intersection observer does not interfere with react-scroll, must keep track in state
    const { setButtonScroll } = this.props;
    Events.scrollEvent.register('end', () => setButtonScroll(false));
  }

  handleDownClick = () => this.props.setCurrentSectionByButtons(true);

  handleUpClick = () => this.props.setCurrentSectionByButtons(false);

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

export default connect(
  null,
  ({ setCurrentSectionByButtons, setButtonScroll })
)(ScrollButtons);