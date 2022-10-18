import React from "react";
import { Nav } from "../Nav";
import * as UserInfo from "../../contracts/userinfo";
import { Dashboard } from "../Dashboard";

export function App() {
  React.useEffect(() => {
    
  }, []);

  return (
    <>
      <Nav />
      <Dashboard />
    </>
  );
}
