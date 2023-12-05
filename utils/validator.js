export function validator(data, config) {
  const errors = {};
  function validate(validateMethod, data, config) {
    let statusValidate;
    switch (validateMethod) {
      case 'isRequired': {
        if (data.toString().trim() === '') {
          statusValidate = config.message;
        }
        break;
      }
      default:
        break;
    }
    return statusValidate;
  }

  for (const fieldName in data) {
    for (const validateMethod in config[fieldName]) {
      const error = validate(validateMethod, data[fieldName], config[fieldName][validateMethod]);
      if (!errors[fieldName] && error) {
        errors[fieldName] = error;
      }
    }
  }
  return errors;
}
