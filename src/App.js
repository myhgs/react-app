import React, { Component } from 'react';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MemberList from './MemberList';
import MemberEdit from "./MemberEdit";

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/' exact={true} component={Home}/>
                    <Route path='/members' exact={true} component={MemberList}/>
                    <Route path='/members/:id' component={MemberEdit}/>
                </Switch>
            </Router>
        )
    }
}

export default App;