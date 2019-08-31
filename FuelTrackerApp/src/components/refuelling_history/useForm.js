import { useState, useEffect } from 'react';

const useForm = (callback) => {

  const [values, setValues] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      callback();
    }
  });

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    setIsSubmitting(true);
    setValues('');
  };

  const handleChange = (event) => {
    event.persist();
    setValues(values => ({ ...values, [event.target.name]: event.target.value }));
  };

  return {
    handleChange,
    handleSubmit,
    values
  }
};

export default useForm;
