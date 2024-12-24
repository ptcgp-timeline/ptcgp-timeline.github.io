import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Timeline Error:', {
      error: error.message,
      stack: errorInfo.componentStack
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-white p-4">
          <h2>Something went wrong.</h2>
          {this.state.error && (
            <p className="text-red-400 text-sm mt-2">
              Error: {this.state.error.message}
            </p>
          )}
          <button 
            onClick={() => this.setState({ hasError: false, error: null })}
            className="text-blue-400 underline mt-4"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired
};

export default ErrorBoundary; 