import * as React from "react";
import { Observer } from "mobx-react";
import { store } from "../store2";
import { userInfo } from "os";

export const Data = () => (
  <>
    <Observer>
      {() => {
        if (store.auth.currentUser) {
          return (
            <div>
              Hello, {store.auth.currentUser.name}
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
