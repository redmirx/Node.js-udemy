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

readFilePro('./dog.txt')
  .then((data) => {
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    return writeFilePro(`dog-image.txt`, res.body.message);
  })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
