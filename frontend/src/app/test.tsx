"use client";

import { useEffect, useState } from "react";
import Charts from "@/components/charts-01";

export default function Test() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    console.log(isReady);
    setIsReady(true);
  }, []);

  if (!isReady) {
    return <div>Loading...</div>;
  }

  return <Charts />;
}
