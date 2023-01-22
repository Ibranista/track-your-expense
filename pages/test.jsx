import React, { useState, createContext, useContext } from "react";
import { NameContext } from "./_app";
import Test1 from "./test1";
import { theNames } from "./_app";
export const MYContext = createContext();
function Test({ name }) {
  let nameCollections = theNames();
  const { names, graduation } = useContext(NameContext);
  return (
    <>
      <h1>Test</h1>
      <h1>{name}</h1>
      <h1>my name is: {names}</h1>
      <h1>my graduation is: {graduation}</h1>
      <hr />
      <h1>name:{nameCollections.names}</h1>
    </>
  );
}

export default Test;
