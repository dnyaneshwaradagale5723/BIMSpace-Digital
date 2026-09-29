import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in BIMSpace Digital:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
          <div className="max-w-md w-full p-8 rounded-3xl bg-slate-900 border border-red-500/40 text-center space-y-4 shadow-2xl">
            <div className="w-14 h-14 rounded-2xl bg-red-500/20 text-red-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-white">तांत्रिक त्रुटी (Something went wrong)</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              3D किंवा CAD मॉडेल रेंडरिंग करताना तात्पुरती अडचण आली आहे. कृपया खालील बटनावर क्लिक करून पेज रीलोड करा.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn-gold text-xs py-2.5 px-6 mx-auto flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> रीलोड करा (Reload Application)
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
