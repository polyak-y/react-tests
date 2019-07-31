import axios from 'axios' 

export default axios.create({
  baseURL: 'https://react-quiz-2b791.firebaseio.com/'
})