import React from "react";
import { Nav } from "../Nav";
import * as GuestBook from "../../contracts/guest-book";
import {Login} from "../Login";

export function App() {
  React.useEffect(() => {
    // this is showing an overly-simple way to use the GuestBook import by just
    // logging the result of the call to `getMessages`
    GuestBook.getMessages().then(console.log);
  }, []);

  return (
    <>
      <Nav />
      <Login />
    </>
  );
}
