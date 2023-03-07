import Breadcrumb from "./components/Breadcrumb";
import Header from "./components/Header";
import { Router } from "./router";
import FormModal from "./components/Modal/FormModal";

function App() {
  return (
    <div className="App">
      <Header />
      <Breadcrumb />
      <Router />
      <FormModal />
    </div>
  );
}

export default App;
