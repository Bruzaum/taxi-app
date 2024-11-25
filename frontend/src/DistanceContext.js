import React, { createContext, useState } from "react";

export const DistanceContext = createContext();

export function DistanceProvider({ children }) {
  const [distance, setDistance] = useState(0);

  return (
    <DistanceContext.Provider value={{ distance, setDistance }}>
      {children}
    </DistanceContext.Provider>
  );
}
