import React from 'react';

type ErrorComponentState = {
  hasError: boolean;
  error: Error | null;
};

class ErrorComponent extends React.Component<object, ErrorComponentState> {
  constructor(props: object) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  handleClick = () => {
    try {
      throw new Error('Something went wrong');
    } catch (error) {
      this.setState({
        hasError: true,
        error: error as Error,
      });
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Something went wrong ayya.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
          </details>
        </div>
      );
    }
    return (
      <button
        type="button"
        className="btn btn-danger w-25 mb-3"
        onClick={this.handleClick}
      >
        Something went wrong
      </button>
    );
  }
}

export default ErrorComponent;
