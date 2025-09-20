import { Component, type PropsWithChildren, type ReactNode } from "react";

type ErrorBoundaryProps = PropsWithChildren<{ fallback: ReactNode }>;
type ErrorBoundaryState = { hasError: boolean };

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}
