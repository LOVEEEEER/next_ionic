import { useEffect, useState } from 'react';
import { validator } from '../utils/validator';

export default function useForm(initialState = {}, config) {
  const [data, setData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = ({ target }) => {
    setData(prevState => ({
      ...prevState,
      [target.name]: target.type === 'number' ? Number(target.value) : target.value,
    }));
  };

  const validate = () => {
    if (config) {
      const errors = validator(data, config);
      setErrors(errors);
      return errors;
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      validate();
    }
  }, [data]);

  const clearForm = () => {
    setData(initialState);
  };

  return { data, handleChange, errors, validate, clearForm };
}
