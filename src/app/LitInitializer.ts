'use client';

import { useEffect } from "react";
import { Lit } from "litlyx-js";

export function LitInitializer() {
  useEffect(() => {
    Lit.init("your_project_id"); // Replace with your actual project ID
  }, []);

  return null;
}
