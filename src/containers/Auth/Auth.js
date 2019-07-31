import React, { Component } from 'react';
import classes from './Auth.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import is from 'is_js'
import {connect} from 'react-redux'
import { auth } from '../../store/actions/actionAuth';

class Auth extends Component {

  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Введите корректный email',
        valid: false, // отвечает валиден или не валиден input. Изначально он пустой и следовательно не валиден 
        touched: false, // отвечает был ли введен хоть один символ в input
        validation: { //указываем правила по которым нужно валидировать данный input
          required: true, //обязательное заполнение inut
          email: true //обязательно чтобы быб емаил
        }
      },
      password: {
        value: '',
        type: 'password',
        label: 'Пароль',
        errorMessage: 'Введите корректный пароль',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength:5
        }
      }
    }
  }

  loginHandler = () => {  //клик на кнопку войти
    this.props.auth ( //функция через mapDispatchToProps
      this.state.formControls.email.value, // то что введено в поле емаил на странице авторизации
      this.state.formControls.password.value, // то что введено в поле пароль на странице авторизации
      true // isLogin
    )  
  }

  registerHandler = () => { //клик на кнопку зарегистрироваться
    this.props.auth ( //функция через mapDispatchToProps
      this.state.formControls.email.value, // то что введено в поле емаил на странице авторизации
      this.state.formControls.password.value, // то что введено в поле пароль на странице авторизации
      false // isLogin
    )  
  }

  submitHandler = (event) => {
    event.preventDefault()
  }

  validateControl = (value, validation) => { //фукция возвращает true или false. true - если поле валидно заполнено
    if(!validation) {
      return true
    }
    let isValid = true

    if(validation.required) {
      isValid = value.trim() !== '' && isValid
    }
    if(validation.email) {
      isValid = is.email(value) && isValid
    }
    if(validation.minLength) {
      isValid = value.length >= validation.minLength
    }

    return isValid
  }

  onChangeHandler = (event, elem) => { // событие срабатывает при наборе текста в опеределенном input

    const formControls = {...this.state.formControls}
    const control = {...formControls[elem]} //обект email или password

    control.value = event.target.value
    control.touched = true
    control.valid = this.validateControl(control.value, control.validation)

    formControls[elem] = control

    let isFormValid = true

    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid
    })

    this.setState({
      formControls,
      isFormValid
    })
  }

  renderInputs = () => {
    const inputs = Object.keys(this.state.formControls).map((elem, index) => { // в данном случае elem будут email и password
      const control = this.state.formControls[elem] //объект сначала email: {} потом password: {}
      return (
        <Input 
          key={elem + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          inputChange={(event) => this.onChangeHandler(event, elem) }
        />
      )
    })

    return inputs
  }
  
  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Авторизация пользователя</h1>
          <form onSubmit={this.submitHandler} className={classes.AuthForm}>
           
            {this.renderInputs()}

            <Button 
              type='succes' 
              buttonClick={this.loginHandler}
              disabled={!this.state.isFormValid}
            >Войти</Button>
            <Button 
              type='primary' 
              buttonClick={this.registerHandler}
              disabled={!this.state.isFormValid}
            >Зарегистрироваться</Button>
          </form>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
  }
}

export default connect(null, mapDispatchToProps)(Auth);
//подключается в App.js