import React from 'react';

import ErrorPage from '@pages/ErrorPage';

type Props = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  message: string;
};

class ErrorBoundary extends React.Component<Props, ErrorBoundaryState> {
  constructor(props: Readonly<Props> | Props) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, message: error.message };
  }

  clearError = () => {
    this.setState({ hasError: false, message: '' });
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorPage message={this.state.message} clearErrorAction={this.clearError.bind(this)} />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
