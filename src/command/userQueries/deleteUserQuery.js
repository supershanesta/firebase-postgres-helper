const deleteUserQuery = (input) => {
  const { filters } = input;
  return `
    DELETE FROM portals.users
    WHERE provider_id = '${filters.uid}'
    `;
};

module.exports = deleteUserQuery;
