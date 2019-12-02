import * as React from "react";
import { Observer } from "mobx-react";
import { store } from "../store2";

export const Data = () => (
  <>
    <Observer>
      {() => {
        if (store.auth.user) {
          return (
            <div>
              Hello, {store.auth.user.email}
              <button onClick={store.auth.signOut}>Sign out</button>
            </div>
          );
        }
        return <button onClick={store.auth.signIn}>Sign in</button>;
      }}
    </Observer>
    Another component:
    <Observer>
      {() => <div>isSignedIn: {store.auth.isSignedIn ? "true" : "false"}</div>}
    </Observer>
  </>
);
