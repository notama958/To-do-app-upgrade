const fs = require('fs');
let faker = require('faker');

const tags = ['priority', 'normal', 'important'];
// generate example 5 tasks
const createJSON = () => {
  const data = { list: [] };
  for (let i = 0; i < 5; i++) {
    const desc = faker.git.commitMessage();
    const uuid = faker.datatype.uuid();
    data.list.push({
      id: uuid,
      tag: tags[Math.floor(Math.random() * 3)],
      desc: desc,
      created: new Date(),
      status: 'unchecked',
    });
  }
  // const dataString = JSON.stringify(data);
  fs.writeFile('db.json', data, (err, result) => {
    if (err) console.log("CAN'T SAVE FILE");
    else console.log('FILE SAVED!!!!');
  });
};
createJSON();
