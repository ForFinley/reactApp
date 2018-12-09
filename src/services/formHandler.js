export function bootstrapFormHandler(_this, validateHandler) {
  _this.handleChange = function(e) {
    _this.setState(
      {
        formValues: {
          ..._this.state.formValues,
          [e.target.name]: e.target.value
        }
      },
      () => _this.runFormValidation()
    );
  };

  _this.handleBlur = function(e) {
    _this.setState({
      touched: { ..._this.state.touched, [e.target.name]: true }
    });
  };

  _this.runFormValidation = function(cb, isForSubmit) {
    const { errors, formIsValid } = validateHandler(_this.state.formValues);
    let touched = _this.state.touched;
    if (isForSubmit === true) {
      //set all touched to true, to show error message
      Object.keys(touched).forEach(k => {
        touched[k] = true;
      });
    }
    _this.setState(
      {
        validationMessage: {
          ..._this.state.validationMessage,
          ...errors
        },
        formIsValid,
        touched
      },
      cb || function() {}
    );
  };
}
