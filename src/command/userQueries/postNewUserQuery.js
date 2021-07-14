const postNewUserQuery = (user) => {
  return `
  INSERT INTO portals.users (provider_id, name, email, claims)
  VALUES ('${user.uid}', '${user.displayName}', '${user.email}', '${user.customClaims ? JSON.stringify(user.customClaims) : null}');
    `;
};

module.exports = postNewUserQuery;
