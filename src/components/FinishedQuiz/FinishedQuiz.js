import React from 'react'
import classes from './FinishedQuiz.css'
import Button from '../UI/Button/Button'
import {Link} from 'react-router-dom'

const FinishedQuiz = (props) => {
  const succesCount = Object.keys(props.results).reduce((sum, num) => {
    if(props.results[num] === 'green') {
      sum++
    } 

    return sum
  }, 0)

  return (
    
    <div className={classes.FinishedQuiz}>
    
      <ul>
        {
          props.quiz.map((oneVopros, index) => { //props.quiz - массив всех вопросов 

            const cls = [
              'fa',              
              props.results[oneVopros.id] === 'error' ? 'fa-times ' : 'fa-check',
              classes[props.results[oneVopros.id]]              
            ] 

            return(
              <li key={index}>
                <strong>{index + 1}</strong>.&nbsp;
                {oneVopros.question}
                <i className={cls.join(' ')} /> 
              </li>
            )
          })
        }
      </ul>

      <p>Правильных ответов {succesCount} из {props.quiz.length}</p>

      <div>
        <Button buttonClick={props.onRepeat} type='primary'>Повторить</Button>
        
        <Link to='/'>
          <Button type='succes'>Перейти в список тестов</Button>
        </Link>
       
      </div>

    </div>
  )
}

export default FinishedQuiz
//подключается Qiuz.js