// generate.db.js
var faker = require("faker");

function generateData() {
  var users = [];
  for (var id = 0; id < 100; id++) {
    var firstName = faker.name.firstName();
    var lastName = faker.name.lastName();
    var email = faker.internet.email();

    const uuid = (Math.random() + 1).toString(36).substring(2);

    users.push({
      id: uuid,
      first_name: firstName,
      last_name: lastName,
      email: email,
      address: {
        street: faker.address.streetName(),
        zip_code: faker.address.zipCode(),
        city: faker.address.city(),
        number: Number((Math.random() * (1000 - 10) + 10).toFixed()),
        state: faker.address.state(),
      },
    });
  }

  /**
   * return = {
   *    "data_name": [
   *        { ...data },
   *        { ...data },
   *        { ...data },
   *        { ...data }
   *    ]
   * }
   */
  return { users: users };
}

module.exports = generateData;
