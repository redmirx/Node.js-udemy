const fs = require('fs');
const superagent = require('superagent');

fs.readFile(`${__dirname}/dog.txt`, 'utf-8', (err, data) => {
  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .then((res) => {
      fs.writeFile(`${data}-image.txt`, res.body.message, (err) => {
        if (err) console.log('An error occured while writing file!');
        console.log('Dog image successfully saved to file!');
      });
    })
    .catch((err) => {
      return console.log(err.message);
    });
});
