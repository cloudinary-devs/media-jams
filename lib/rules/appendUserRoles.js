function userRoles(user, context, callback) {
  // has auth, and roles properties.
  // and has been assigned a role.
  if (
    context.authorization !== null &&
    context.authorization.roles !== null &&
    context.authorization.roles.length !== 0
  ) {
    context.idToken['https://mediajams-studio/roles'] =
      context.authorization.roles;
    context.accessToken['https://mediajams-studio/roles'] =
      context.authorization.roles;
  }
  return callback(null, user, context);
}
