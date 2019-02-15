// User storage variable
const users = { users: {} };

const getUsers = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/json' });
  res.write(JSON.stringify(users));
  res.end();
};

const addUser = (req, res, body) => {
  if (Object.prototype.hasOwnProperty.call(users.users, body.name)) {
    users.users[body.name].age = body.age;
    res.writeHead(204);
    res.end();
  } else {
    users.users[body.name] = body;
    res.writeHead(201, { 'Content-Type': 'text/json' });
    res.write(JSON.stringify({
      message: 'Created successfully',
    }));
    res.end();
  }
};

const sendError = (req, res, errorNumber, id, message) => {
  res.writeHead(errorNumber, { 'Content-Type': 'text/json' });
  res.write(JSON.stringify({ id, message }));
  res.end();
};

module.exports = { getUsers, addUser, sendError };
