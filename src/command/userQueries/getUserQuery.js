const getUserQuery = (uid) => {
  return `
      SELECT
        provider_id as uid,
        name,
        email,
        to_char(created_at, 'MM/DD/YYYY HH12:MI:SS AM') as created,
        claims ->> 'client' as client,
        claims as roles
      FROM portals.users
      where provider_id = '${uid}';
    `;
};

module.exports = getUserQuery;
