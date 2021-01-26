import { Provider } from "react-redux";
import { store } from "./redux/store";
import { AppRouter } from "./components/routers/AppRouter";
import "./global.css";

function App() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default App;
