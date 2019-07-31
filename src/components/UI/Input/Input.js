import React from 'react';
import classes from './Input.css'

function isInvalid({valid, touched, shouldValidate}) { //valid - является ли валидным наше поле на данный момент, touched - было ли введено в поле хоть один символ, shouldValidate - подлежит ли поле валидации вообще
   return !valid && shouldValidate && touched
}

const Input = (props) => {
  const inputType = props.type || 'text'
  const cls = [classes.Input]
  const htmlFor = `${inputType}-${Math.random()}`

  if(isInvalid(props)) { //если инпут не валидный задаем новый класс, то есть если функция вернет true
    cls.push(classes.invalid)
  }


  return (
    <div  className={cls.join(' ')}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <input 
        type={inputType}        
        id={htmlFor}
        value={props.value}
        onChange={props.inputChange}
      />

      {
        isInvalid(props) ? <span>{props.errorMessage || "Введите верное значение"}</span> : null
      }

      
    </div>
  )
}

export default Input