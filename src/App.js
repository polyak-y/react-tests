import React, { Component } from 'react';
import Layout from './hos/Layout/Layout'
import {Route, Switch, Redirect, withRouter} from 'react-router-dom'
import Quiz from './containers/Quiz/Quiz'
import QuizList from './containers/QuizList/QuizList'
import Auth from './containers/Auth/Auth'
import QuizCreator from './containers/QuizCreator/QuizCreator'
import {connect} from 'react-redux'
import Logout from './components/Logout/Logout';
import { autologin } from './store/actions/actionAuth';


class App extends Component {

  componentDidMount(){
    this.props.autologin()
  } 
  
  render() {
    let routes = (
      <Switch>
        <Route path='/auth' component={Auth}/>
        <Route path='/quiz-creator' component={QuizCreator}/>
        <Route path='/quiz/:id' component={Quiz}/>
        <Route path='/' exact component={QuizList}/>
        <Redirect to={'/'}/>
      </Switch>
    )

    if(this.props.isAuthenticated) { //если пользователь залогирован
      routes = (
        <Switch>
          <Route path='/quiz-creator' component={QuizCreator}/>
          <Route path='/quiz/:id' component={Quiz}/>
          <Route path='/logout' component={Logout} />
          <Route path='/' component={QuizList}/>          
          <Redirect to={'/'}/>
        </Switch>
      )

    }

    return (
      <Layout>
        {routes}
      </Layout>
    );
  }
}


function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token
  }
}

function mapDispatchToProps(dispatch) {
  return {
    autologin: () => dispatch(autologin())
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
