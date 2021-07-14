

const getListUsersQuery = (input) => {
  const { filters, page, pageSize, sorts } = input;
  const { promotion, searchText } = filters;
  return `
      SELECT
        provider_id as uid,
        name,
        email,
        to_char(created_at, 'MM/DD/YYYY HH12:MI:SS AM') as created,
        claims ->> 'client' as client,
        claims as roles
      FROM portals.users
      where users.claims ->> 'client' = '${promotion}'
      AND (
        '${searchText}' = ''
        OR users.name LIKE '%${searchText}%'
        OR users.email LIKE '%${searchText}%'
      )
      ORDER BY
      LIMIT ${pageSize} OFFSET ${page * pageSize};
    `;
};

module.exports = getListUsersQuery;
