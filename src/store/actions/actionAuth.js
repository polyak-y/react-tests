import axios from "axios";
import { AUTH_SUCCESS, AUTH_LOGOUT } from "./actionTypes";

export function auth(email, password, isLogin) { //используется в Auth.js, функция принимает три параметра 1) то что введено в поле емаил, в поле пароль и булево значение(если щелкнули кнопку войти - true, зарегистрироваться  - false)
  
  return async (dispatch) => {

    const authData = { // для отправки на сервер и сравнивании
      email: email,
      password: password,
      returnSecureToken: true
    }

    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAUvIRSkzHP9XaTpqLLpf1BJcz10Y2knAw' //если щелкнули по кнопке зарегистрироваться

    if(isLogin) { // если щелкнули по кнопке войти
      url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAUvIRSkzHP9XaTpqLLpf1BJcz10Y2knAw'
    }

    const response = await axios.post(url, authData) //отпправляем данные на сервер и получаем в ответ объект с данными
    const data = response.data
    
    const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000) //1540852369132(милисек с 1970) + 3600000 - текущее время + 1 час  

    localStorage.setItem('token', data.idToken) //локалсторадж
    localStorage.setItem('userId', data.localId) //локалсторадж
    localStorage.setItem('expirationDate', expirationDate) //локалсторадж

    dispatch(authSuccess(data.idToken)) // функция authSuccess обращается к редьюсеру и делает ключ token = data.idToken
    dispatch(autoLogout(data.expiresIn)) //функция autoLogout через 1 час с момента регистрации вызывает функцию logout(), которая уничтожает все локалстораджи и делает ключ token = null
  }  
}

export function authSuccess(token) {
  return {
    type: AUTH_SUCCESS,
    token: token
  }
}

export function autoLogout(time) {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, time * 1000)
  }
}

export function logout() { // выход из системы и очистка локарсториджа
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('expirationDate')
  return {
    type: AUTH_LOGOUT
  }
}

export function autologin(){ //используется в App.js, как только компонент сформировался.
  return dispatch => {
    const token = localStorage.getItem('token')
    if(!token) { //если локалстораджа нет удаляем остальные локалстораджи и делает ключ token = null
      dispatch(logout())
    } else { // если локалсторадж есть то загружаемся как авторизованный пользователь
      const expirationDate = new Date(localStorage.getItem('expirationDate'))
      if(expirationDate <= new Date()) {
        dispatch(logout())
      } else {
        dispatch(authSuccess(token))
        dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000))
      }
    }
  }
}