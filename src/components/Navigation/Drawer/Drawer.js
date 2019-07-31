import React, { Component } from 'react';
import classes from './Drawer.css'
import {NavLink} from 'react-router-dom'
import Backdrop from '../../UI/Backdrop/Backdrop'



class Drawer extends Component {
  
  renderLinks(links) {
    return(
      links.map((elem, index) => {
        return(
          <li key={index}>
            <NavLink 
              to={elem.to} 
              exact={elem.exact}
              activeClassName={classes.active}
              onClick={this.clickHandler}
            >{elem.label}</NavLink>
          </li>
        )
      })
    )
  }

  clickHandler = () => {
    this.props.onClose()
  }

  render() {
    const cls = [
      classes.Drawer
    ]

    if(!this.props.isOpen) {
      cls.push(classes.close)
    }

    const links = [
      {to: '/', label: 'Список', exact: true}     
    ]

    console.log("Auth", this.props.isAuthenticated)

    if(this.props.isAuthenticated) { //если зарегистрированы в системе
      links.push({to: '/quiz-creator', label: 'Создать тест', exact: false})
      links.push({to: '/logout', label: 'Выйти', exact: false}) 
    } else {
      links.push({to: '/auth', label: 'Авторизация', exact: false})
    }

    return (
      <React.Fragment>
        <nav className={cls.join(' ')}>
          <ul>
            {this.renderLinks(links)}
          </ul>
        </nav>
        {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
       
      </React.Fragment>
    );
  }
}

export default Drawer;
//подключается в hos\Layout\Layout.js
