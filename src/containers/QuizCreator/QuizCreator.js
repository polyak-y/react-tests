import React, { Component } from 'react';
import classes from './QuizCreator.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import Select from '../../components/UI/Select/Select'
import {createControl, validate, validateForm} from '../../form/formFramework'
import {connect} from 'react-redux'
import { createQuizQuestion, finishCreateQuiz } from '../../store/actions/actionCreateQuiz';



function createOptionControl (number){
  return createControl({
    label: `Вариант ${number}`,
    errorMessage: 'Значение не может быть пустым',
    id: number
  },{required: true})
}

function createFormControls(){
  return {
    question: createControl(
      {
        label: 'Введите вопрос',
        errorMessage: 'Вопрос не может быть пустым'
      },
      {
        required: true
      }      
    ),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4)
  }
}

class QuizCreator extends Component {

  state = {
    isFormValid: false, //в начале форма не валидна
    rightAnswerId: 1, //номер правильного ответа
    formControls: createFormControls()
  }

  submitHandler = (event) => {
    event.preventDefault()
  }

  addQuestionHandler = (event) => { //клик на кнопку "Добавить вопрос"
    event.preventDefault()

   
    const {question, option1, option2, option3, option4} = this.state.formControls


    const questionItem = {
      question: question.value, //то что ввели в поле вопроса
      id: this.props.quiz.length + 1, // id вопроса
      rightAnswerId: this.state.rightAnswerId, //номер правильного ответа мы его указали select-ом
      answers: [ //массив из ответов
        {text: option1.value, id: option1.id}, //то что ввели в первое поле + его id(его номер, в данном случае 1)
        {text: option2.value, id: option2.id}, //то что ввели во второе поле + его id(его номер, в данном случае 2) 
        {text: option3.value, id: option3.id},
        {text: option4.value, id: option4.id}
      ]
    }

    this.props.createQuizQuestion(questionItem)

/*     quiz.push(questionItem) */

    this.setState({
      /* quiz, */
      isFormValid: false, //в начале форма не валидна
      rightAnswerId: 1, //номер правильного ответа
      formControls: createFormControls()
    })
  }

  createQuizHandler = (event) => { //клик на кнопку "Создать тест"
    event.preventDefault()

    this.setState({    
      isFormValid: false, 
      rightAnswerId: 1, 
      formControls: createFormControls()
    })
      
    this.props.finishCreateQuiz()
    
  }

  changeHandler = (value, oneInputName) => { //набор текста в поле input
    const formControls = {...this.state.formControls}
    const control = {...formControls[oneInputName]} //объект одного инпута question или option1,2,3,4

    control.touched = true // то есть мы что-то ввели
    control.value = value
    control.valid = validate(control.value, control.validation )//при наборе в input определяет валидно оно или нет согласно заданных нами условий. Если true значить поле валидно
    
    formControls[oneInputName] = control

    this.setState({
      formControls,
      isFormValid: validateForm(formControls)
    })
  }
  
  rendersControls = () => {
     const inputs = Object.keys(this.state.formControls).map((oneInputName, index) => {
       const oneInput = this.state.formControls[oneInputName]
       
       return (
        <React.Fragment key={oneInputName+index}>
          <Input            
            label={oneInput.label}
            value={oneInput.value}
            valid={oneInput.valid}
            shouldValidate={!!oneInput.validation}
            touched={oneInput.touched}
            errorMessage={oneInput.errorMessage}
            inputChange={(event) => this.changeHandler(event.target.value, oneInputName)}          
          />
          {index === 0 ? <hr />: null}
        </React.Fragment>
       )
     })

     return inputs
  }

  selectChangeHandler = (event) => { //событие на выбор селектом, котоым мы выбираем номер правильного ответа
    this.setState({
      rightAnswerId: +event.target.value
    })
  }

  render() {

    const select = <Select
      label="Выберите правильный ответ"
      value={this.state.rightAnswerId}
      selectChange={this.selectChangeHandler}
      options={[
        {text: 1, value: 1},
        {text: 2, value: 2},
        {text: 3, value: 3},
        {text: 4, value: 4},
      ]}
    />

    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Создание теста</h1>
          <form onSubmit={this.submitHandler}>

            {this.rendersControls()}

            {select}

            <Button
              type="primary"
              buttonClick={this.addQuestionHandler}
              disabled={!this.state.isFormValid}
            >Добавить вопрос</Button>

            <Button
              type="succes"
              buttonClick={this.createQuizHandler}
              disabled={this.props.quiz.length === 0}
            >Создать тест</Button>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateTOProps(state) {
  return {
    quiz: state.create.quiz
  }
}

function mapDispatchTOProps(dispatch) {
  return {
     createQuizQuestion: item => dispatch(createQuizQuestion(item)),
     finishCreateQuiz: () => dispatch(finishCreateQuiz())

  }
}

export default connect(mapStateTOProps, mapDispatchTOProps)(QuizCreator);
