import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '70vh',
                    padding: '2rem',
                    textAlign: 'center'
                }}>
                    <h1 style={{ color: '#f44336', fontSize: '3rem', margin: '0 0 1rem 0' }}>
                        Oops! Something went wrong
                    </h1>
                    <p style={{ color: '#666', fontSize: '1.1rem', marginBottom: '2rem' }}>
                        We're sorry, but something unexpected happened. Please try refreshing the page.
                    </p>
                    <button
                        onClick={() => window.location.href = '/'}
                        style={{
                            padding: '1rem 2rem',
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '1rem',
                            cursor: 'pointer'
                        }}
                    >
                        Go to Home
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
