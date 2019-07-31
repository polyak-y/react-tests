import React, { Component } from 'react';
import classes from './QuizList.css'
import {NavLink} from 'react-router-dom'
import Loader from '../../components/UI/Loader/Loader'
import {connect} from 'react-redux'
import {fetchQuizes} from '../../store/actions/actionQuiz'

class QuizList extends Component { 
  
  renderQuizes = () => {
    return this.props.quizes.map((elem) => {
      return (
        <li key={elem.id}>
          <NavLink to={'/quiz/' + elem.id}>
            {elem.name}
          </NavLink>
        </li>
      )
    })
  }

   componentDidMount(){
     this.props.fetchQuizes() //соединение с сервером и получение джейсона   
  } 

  render() {
    return (
      <div className={classes.QuizList}>
        <div>
          <h1>Список тестов</h1>
          
          {
            this.props.loading && this.props.quizes.length !== 0
            ? <Loader /> 
            : <ul>
                {this.renderQuizes()}            
              </ul>
          }          
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  /* console.log(state) */
  return {
    quizes: state.quiz.quizes, //стало пропсом
    loading: state.quiz.loading //стало пропсом
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizes: () => dispatch(fetchQuizes()) //fetchQuizes() - возвращает объект с типом экшена для обработки редьюсером
  }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(QuizList);
