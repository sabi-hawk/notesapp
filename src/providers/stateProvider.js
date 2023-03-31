import { Provider } from "react-redux";
import store from "../flux/store/index";

function StateProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

export default StateProvider;
