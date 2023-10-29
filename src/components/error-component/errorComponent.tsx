import React from 'react';
import { ErrorComponentState } from './errorComponent.types';

class ErrorComponent extends React.Component<object, ErrorComponentState> {
  constructor(props: ErrorComponentState) {
    super(props);
    this.state = {
      error: false,
    };
  }

  handlerErrorClick = () => {
    throw new Error('Error button clicked');
  };

  setErrorTrue() {
    this.setState({ error: true });
  }

  render() {
    if (this.state.error) this.handlerErrorClick();

    return (
      <button
        type="button"
        className="btn btn-danger w-25 mb-3"
        onClick={this.setErrorTrue.bind(this)}
      >
        Button-error
      </button>
    );
  }
}

export default ErrorComponent;
