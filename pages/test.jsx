import React, { useState, createContext } from "react";
import Test1 from "./test1";
export const MYContext = createContext();
function Test({ children }) {
  const [test, setTest] = useState(true);
  const toggle = () => {
    setTest((prevState) => !prevState);
  };
  let values = {
    test,
    toggle,
  };
  return (
    <>
      <MYContext.Provider value={values}>
        <Test1 />
      </MYContext.Provider>
      {children}
    </>
  );
}

// explain {child}

export default Test;
