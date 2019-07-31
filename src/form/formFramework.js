export function createControl(config, validation) { //принимает некую конфигурацию (config) и набор правил валидации ()
  return {
    ...config,
    validation,
    valid: !validation, //изначально valid = false, изначально не валидно, потому что пустое
    touched: false, //был ли введен хотя бы один символ
    value: ''
  }
} 

export function validate(value, validation = null) { //в качестве параметров принимает value и набор правил валидации(validation) по умолчанию равны null
  if(!validation) {
    return true
  }

  let isValid = true

  if(validation.required) { //если есть требование о валидации  
    isValid = value.trim() !== '' && isValid
  }

  return isValid //если true значить поле валидно
}

export function validateForm(formControls) { //праверяет всю форму на валидность, т.е все поля
  let isFormValid = true // по умолчанию форма валидна

  for (let control in formControls) {
    if(formControls.hasOwnProperty(control)) {
      isFormValid = formControls[control].valid && isFormValid
    }
  }

  return isFormValid
}