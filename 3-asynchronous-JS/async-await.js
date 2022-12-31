const fs = require('fs');
const superagent = require('superagent');

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf-8', (err, data) => {
      if (err) reject('I could no find that file 😕');
      resolve(data);
    });
  });
};

const writeFilePro = (pathaname, filename) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(pathaname, filename, (err) => {
      if (err) {
        reject('An error occured while writing file 😥');
      }
      resolve('Dog image successfully saved to file!');
    });
  });
};

const getDogPic = async () => {
  try {
    const data = await readFilePro('./dog.txt');
    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const file = await writeFilePro(`${data}-image.txt`, res.body.message);
    console.log(file);
  } catch (err) {
    console.log(err);
  }
};

getDogPic();
