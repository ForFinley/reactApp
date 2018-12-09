import React from 'react';

export default function withFormValidation (WrappedComponent, formConfig, validateHandler) {

  class ComponentWithFormValidation extends React.Component {

    constructor() {
      super();

      const initialState = {
        formIsValid: true,
        formValues: {},
        touched: {},
        validationMessage: {}
      }
      formConfig.forEach(i => {
        initialState.formValues[i] = '';
        initialState.touched[i] = false;
        initialState.validationMessage[i] = ''
      })

      this.state = initialState;
    }

    handleChange = e => {
      this.setState(
        {
          formValues: {
            ...this.state.formValues,
            [e.target.name]: e.target.value
          }
        },
        () => this.runFormValidation()
      );
    };

    handleBlur = e => {
      this.setState({
        touched: { ...this.state.touched, [e.target.name]: true }
      });
    };

    runFormValidation = (cb, isForSubmit) => {
      const { errors, formIsValid } = validateHandler(this.state.formValues);
      let touched = this.state.touched;
      if (isForSubmit === true) {
        //set all touched to true, to show error message
        Object.keys(touched).forEach(k => {
          touched[k] = true;
        });
      }

      this.setState(
        {
          validationMessage: {
            ...this.state.validationMessage,
            ...errors
          },
          formIsValid,
          touched
        },
        cb || function() {}
      );
    };

    render() {
      return <WrappedComponent  handleChange={this.handleChange}
                                handleBlur={this.handleBlur}
                                runFormValidation={this.runFormValidation}
                                {...this.state}
              />
    }
  }

  return ComponentWithFormValidation;
}
