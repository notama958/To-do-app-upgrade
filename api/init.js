const fs = require('fs');
let faker = require('faker');

const tags = ['priority', 'normal', 'important'];
// generate example 5 tasks
const createJSON = () => {
  const data = {
    list: [],
    tags: [],
  };
  for (let i = 0; i < 5; i++) {
    const desc = faker.git.commitMessage();
    const uuid = faker.datatype.uuid();
    data.list.push({
      id: uuid,
      desc: desc,
      created: new Date(),
      status: Math.floor(Math.random() * 2) === 0 ? 'unchecked' : 'checked',
      tag: tags[Math.floor(Math.random() * 3)],
      alarm: 0,
    });
    // data.tags.forEach((el) => {
    //   for (const [key, value] of Object.entries(el)) {
    //     if (key === 'id' && value === tags[Math.floor(Math.random() * 3)]) {
    //       // console.log(key, value, uuid);
    //       el['data'].push(uuid);
    //     }
    //   }
    // });
    data.tags = tags.map((el) => {
      let obj = { id: faker.datatype.uuid(), name: el };
      return obj;
    });
  }
  const dataString = JSON.stringify(data);
  fs.writeFile('db.json', dataString, (err, result) => {
    if (err) console.log("CAN'T SAVE FILE");
    else console.log('FILE SAVED!!!!');
  });
};
createJSON();
