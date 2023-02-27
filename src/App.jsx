import Breadcrumb from "./components/Breadcrumb";
import Header from "./components/Header";
import { Router } from "./router";

function App() {
  return (
    <div className="App">
      <Header />
      <Breadcrumb />
      <Router />
    </div>
  );
}

export default App;
