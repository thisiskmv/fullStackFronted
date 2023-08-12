import { legacy_createStore as createStore } from "redux";
import { reducer } from "./reducer";
const store = createStore(reducer);
store.subscribe(() => {
  return console.log(store.getState(), "hhh");
});
export default store;
