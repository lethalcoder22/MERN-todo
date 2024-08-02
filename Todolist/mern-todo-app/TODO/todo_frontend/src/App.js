import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './Login';
import Register from './Register';
import Home from './Home'; 

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
