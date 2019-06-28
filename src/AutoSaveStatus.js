import React from 'react';
import propTypes from 'prop-types';

export default class AutoSaveStatus extends React.Component {
  state = {};

  static contextTypes = {
    saveStatus: propTypes.object
  };

  componentWillMount() {
    const { saveStatus } = this.context;
    saveStatus.subscribe(update => this.setState(update));
  }

  render() {
    const { render } = this.props;
    const { saved, sinceSave } = this.state;
    return render({ saved, sinceSave });
  }
}
