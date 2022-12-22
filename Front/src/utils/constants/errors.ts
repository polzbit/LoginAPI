const JOY_ERRORS = Object.freeze({
  emailNotValid: 'Email not valid',
  passwordEmpty: "Password can't be empty",
  passwordShort: 'Password too short',
  passwordNumber: 'Password must contains characters',
  oops: 'Oops, something went wrong :(',
  resetSent: 'Check your email to continue with reset password. ',
});

export default Object.freeze({ ...JOY_ERRORS });
