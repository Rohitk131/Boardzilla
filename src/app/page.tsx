'use client';

import CreateButton from "@/components/CreateButton";
import Home from "@/components/Toolbar";

export default function App() {
  return (
    <>
      <div className="relative flex items-center justify-center">
       
        <Home />
      </div>

      <div className="fixed bottom-4 right-4">
        <CreateButton />
      </div>
    </>
  );
}
