import Breadcrumb from './components/Breadcrumb';
import Header from './components/Header';
import { Router } from './router';
import Summary from './components/Summary';

function App() {
    return (
        <div className="App">
            <Header />
            <Breadcrumb/>
            <Router />
            <Summary />
        </div>
    );
}

export default App;
