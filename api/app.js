import { faker, fakerPT_BR } from '@faker-js/faker';
import * as fs from 'fs';

const generatePersonsData = (number) => {
  const persons = [];
  const cnpjRegex = '[0-9][0-9].[0-9][0-9][0-9].[0-9][0-9][0-9]/0001-[0-9][0-9]';
  const cpfRegex = '[0-9][0-9][0-9].[0-9][0-9][0-9].[0-9][0-9][0-9]-[0-9][0-9]';

  while (number >= 0) {
    const type = faker.helpers.arrayElement(['company', 'person'])
    const document = type == 'company' ? faker.helpers.fromRegExp(cnpjRegex) : faker.helpers.fromRegExp(cpfRegex);
    const name = type == 'company' ? fakerPT_BR.company.name() : fakerPT_BR.person.fullName();
    persons.push({
      id: faker.string.uuid(),
      type,
      name,
      document,
      address: fakerPT_BR.location.streetAddress(),
      zipCode: fakerPT_BR.location.zipCode(),
      state: fakerPT_BR.location.state({ abbreviated: true }),
      country: 'BR'
    });
    number--;
  }
  return persons;
};

fs.readFileSync("./api/db.json", 'utf8')

fs.writeFileSync(
  "./api/db.json",
  JSON.stringify({ users: generatePersonsData(20) })
);