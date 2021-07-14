const updateUserQuery = (user) => {
  return `
    UPDATE portals.users
    SET name = '${user.displayName}',
        email = '${user.email}',
        claims = '${user.customClaims ? JSON.stringify(user.customClaims) : null}'
    where provider_id = '${user.uid}';
    `;
};

module.exports = updateUserQuery;
