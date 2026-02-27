import * as React from "react";

export type ToastActionElement = React.ReactElement;

export interface ToastProps {
  id?: string;
  title?: string;
  description?: string;
  action?: ToastActionElement;
  onOpenChange?: (open: boolean) => void;
}
