const dbErrors = Object.freeze({
  user_exists: 'user_exists',
  user_not_exists: 'user_not_exists',
  passwords_mismatch: 'passwords_mismatch',
  incorrect_password: 'incorrect password',
  failed_login: 'failed_login',
  user_not_verified: 'user_not_verified',
  invalid_token: 'invalid_token',
});

export default Object.freeze({
  ...dbErrors,
  validation: 'validation_error',
  parse: 'parse_error',
  not_authenticated: 'not_authenticated',
  permission_denied: 'permission_denied',
  not_found: 'not_found',
  method_not_allowed: 'method_not_allowed',
  not_acceptable: 'not_acceptable',
  unsupported_media_type: 'unsupported_media_type',
  throttled: 'throttled',
  server: 'internal_error',
});
