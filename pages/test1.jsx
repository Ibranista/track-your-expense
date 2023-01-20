import React, { useContext } from "react";
import { MYContext } from "./test";
function Test1() {
  const Custom = useContext(MYContext);
  let { test, toggle } = Custom;
  console.log(test);
  return (
    <div>
      <h1>Welcome</h1>
      <button onClick={toggle}>Toggle</button>
      <h1>{
        test ? "Hello" : "World"
        }</h1>
    </div>
  );
}

export default Test1;
