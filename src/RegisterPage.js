// RegisterPage.js
import React from 'react';
import RegisterForm from './RegisterForm';

const RegisterPage = ({ onRegistro }) => {
  return (
    <div>
      <RegisterForm onRegistro={onRegistro} />
    </div>
  );
};

export default RegisterPage;
