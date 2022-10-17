import React from "react";
import { Nav } from "../Nav";
import * as GuestBook from "../../contracts/guest-book";
import {Login} from "../Login";

export function App() {
  React.useEffect(() => {
  }, []);

  return (
    <>
      <Nav />
      <Login />
    </>
  );
}
