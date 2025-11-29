"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

export default function NProgressBar() {
  const pathname = usePathname();
  const previousPath = useRef(pathname);

  useEffect(() => {
    if (previousPath.current !== pathname) {
      NProgress.start();
      NProgress.done();
      previousPath.current = pathname;
    }
  }, [pathname]);

  return null;
}
