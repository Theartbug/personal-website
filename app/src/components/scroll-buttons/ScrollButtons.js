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

  handleDownClick = () => {
    const { currentSection } = this.props;
  //if the currentSection position is at the end and the direction wants to go further, dont let it.
    if(currentSection === 5) return;
    const next = currentSection + 1;
    this.props.setCurrentSectionByButtons(next);
  };

  handleUpClick = () => {
    const { currentSection } = this.props;
  //if the currentSection position is at the beginning the direction wants to go further, dont let it.
    if(currentSection === 0) return;
    const prev = currentSection - 1;
    this.props.setCurrentSectionByButtons(prev);
  };

  componentWillUnmount() {
    Events.scrollEvent.remove('end');
  }

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
  ({ currentSection }) => ({
    currentSection
  }),
  ({ setCurrentSectionByButtons, setButtonScroll })
)(ScrollButtons);