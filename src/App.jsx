import Breadcrumb from './components/Breadcrumb';
import Header from './components/Header';
import { Router } from './router';
import Summary from './components/Summary';
import Search from './components/Filters/Search';
import OrderBy from './components/Filters/OrderBy';

function App() {
    return (
        <div className="App">
            <Header />
            <Breadcrumb/>
            <Router />
            <Search />
        </div>
    );
}

export default App;
