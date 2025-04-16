'use client';

import { useEffect } from "react";
import { Lit } from "litlyx-js";

export function LitInitializer() {
  useEffect(() => {
    Lit.init("67ff8125b9698244377ec522"); // Replace with your actual project ID
  }, []);

  return null;
}
