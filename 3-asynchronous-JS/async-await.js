const fs = require('fs');
// const superagent = require('superagent');

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf-8', (err, data) => {
      if (err) reject('I could no find that file 😕');
      resolve(data);
    });
  });
};

const getDogPic = async () => {
  const data = await readFilePro('./dog.txt');
};
