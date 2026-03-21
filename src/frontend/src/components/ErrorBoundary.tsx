import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div
            className="flex items-center justify-center"
            style={{
              minHeight: "40vh",
              backgroundColor: "#0a0d12",
              color: "rgba(32,224,230,0.5)",
              fontSize: "1rem",
              letterSpacing: "0.3em",
              fontWeight: 600,
            }}
          >
            3D VIEWER UNAVAILABLE
          </div>
        )
      );
    }
    return this.props.children;
  }
}
