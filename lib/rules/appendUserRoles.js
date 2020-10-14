function userRoles(user, context, callback) {
  if (context.authorization !== null && context.authorization.roles !== null) {
    context.idToken['https://mediajams-studio/roles'] =
      context.authorization.roles;
    context.accessToken['https://mediajams-studio/roles'] =
      context.authorization.roles;
  }
  return callback(null, user, context);
}
