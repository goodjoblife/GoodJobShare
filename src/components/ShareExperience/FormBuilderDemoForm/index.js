import React from 'react';
import FormBuilder from 'common/FormBuilder';

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  padding: '1em',
};

const questions = [];

const FormBuilderDemoForm = () => (
  <div style={containerStyle}>
    <FormBuilder
      open
      title="Title"
      submitButtonText="Submit"
      questions={questions}
      submitButtonEnabled
      onChange={console.info}
      onSubmit={console.info}
      onClickCloseBtn={console.info}
    />
  </div>
);

export default FormBuilderDemoForm;
