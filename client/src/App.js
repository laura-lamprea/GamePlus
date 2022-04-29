import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './components/Landing/Landing'
import Home from './components/Home/Home'
import DetailPage from './components/Detail/Details'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Switch>
          <Route exact path='/'>
            <LandingPage/>
          </Route>
          <Route path='/home'>
            <Home />
          </Route>
         {/* <Route path='/create'>
            <CreatePokemon />
          </Route> */}
          <Route path='/details/:id'>
            <DetailPage />
          </Route>
          {/* <Route path='/about'>
            <AboutPage />
          </Route>  */}
        </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
