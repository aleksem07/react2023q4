import React from 'react';
import Header from './components/header/header';
import Main from './components/main/main';
import ErrorBoundary from './components/error-boundary/errorBoundary';
import ErrorComponent from './components/error-component/errorComponent';

class App extends React.Component {
  handleSearchChange = (searchValue: string) => {
    this.setState({ searchValue });
  };

  render() {
    return (
      <>
        <Header onSearch={this.handleSearchChange} />
        <Main searchValue={localStorage.getItem('search') || ''} />
        <ErrorBoundary>
          <ErrorComponent />
        </ErrorBoundary>
      </>
    );
  }
}

export default App;
