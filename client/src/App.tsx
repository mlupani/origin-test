import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import MisAcciones from './components/MisAcciones';
import PageNotFound from './components/PageNotFound';
import { UserContextProvider } from './context/UserContext';
import ActionDetail from './components/actionDetail';

const App = () => {
  return (
    <UserContextProvider>
      <Router>
        <Switch>
            <Route exact path="/" component={Login}/>
            <Route exact path="/misAcciones" component={MisAcciones}/>
            <Route exact path="/actionDetail" component={ActionDetail}/>
            <Route component={PageNotFound}/>
        </Switch>
      </Router>
    </UserContextProvider>
  );
}

export default App;
