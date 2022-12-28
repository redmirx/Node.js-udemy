const fs = require('fs');
const superagent = require('superagent');

fs.readFile(`${__dirname}/dog.txt`, 'utf-8', (err, data) => {
  // console.log(data);
  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .end((err, res) => {
      if (err) return console.log(err.message);
      fs.writeFile(`${data}-image.txt`, res.body.message, (err) => {
        console.log('Random dog image saved to file!');
      });
    });
});
