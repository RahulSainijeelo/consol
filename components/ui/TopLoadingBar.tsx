import { useEffect } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false, trickleSpeed: 100 });

export function TopLoadingBar({ loading }: { loading: boolean }) {
  useEffect(() => {
    if (loading) {
      NProgress.start();
    } else {
      NProgress.done();
    }
    return () => {
      NProgress.done();
    };
  }, [loading]);

  return null;
}
