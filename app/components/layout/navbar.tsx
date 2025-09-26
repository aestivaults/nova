import { Suspense } from "react";
import SuspenseNav from "./suspenseNav";

export default function Navbar() {
  return (
    <Suspense fallback={null}>
      <SuspenseNav />
    </Suspense>
  );
}
