import React from "react";
import { Nav } from "../Nav";
import * as GuestBook from "../../contracts/guest-book";
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
