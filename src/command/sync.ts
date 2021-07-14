import { admin } from '../admin'
import { postgresConfig } from '../config'
const { Client } = require('pg');
const { getUserQuery, updateUserQuery, postNewUserQuery } = require('../command/userQueries');

const client = new Client({
    user: postgresConfig.username,
    host: postgresConfig.host,
    database: postgresConfig.database,
    password: postgresConfig.password,
    port: postgresConfig.port,
});

const userExists = async (uid) => {
    const result = await client.query(getUserQuery(uid));
      return result.rowCount > 0;
}

const updateUser = async (user) => {
  const result = await client.query(updateUserQuery(user));
}

const createUser = async (user) => {
  const result = await client.query(postNewUserQuery(user));
}


export const sync = async (options) => {
  client.connect();
  const { users } = await admin.auth().listUsers(1000)

  users.forEach(async user => {
    //check if user exists
    if (await userExists(user.uid)) {

      await updateUser(user)
      console.log(`Updated User ${user.email}`)

    } else {
      //else create the user
      await createUser(user)
      console.log(`Created User ${user.email}`)

    }

  });
  console.log('done!')
}
