import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { autoRehydrate, persistStore } from "redux-persist";
// import { localStorage } from "redux-persist/storages";
import rootReducer from "./reducers/rootReducer.js";

// const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

// export default store;

export default function configureStore() {
  return new Promise((resolve, reject) => {
    try {
      const store = createStore(
        rootReducer,
        undefined,
        compose(
          autoRehydrate(),
          applyMiddleware(thunk)
        )
      );

      persistStore(
        store,
        // { storage: localStorage },
        // () =>
        resolve(store)
      );
    } catch (e) {
      reject(e);
    }
  });
}
