import { NextPage } from "next";
import { useCallback, useRef } from "react";

const Admin: NextPage = () => {
  const targetRef = useRef<HTMLDivElement>(null);

  const handleGenerateNewDate = useCallback(() => {
    if (targetRef.current) {
      targetRef.current.textContent = String(new Date().getTime());
    }
  }, []);

  return (
    <div>
      <p>page builder/creator</p>

      <div ref={targetRef} className="target"></div>

      <button onClick={handleGenerateNewDate}>generate new date</button>
    </div>
  );
};

export default Admin;
