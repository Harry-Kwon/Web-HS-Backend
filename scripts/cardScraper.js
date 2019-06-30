const fs = require("fs");
const path = require("path");
const request = require("request");
const db = require("../db");

const RAW_PATH=path.join(__dirname,'/../assets/cards.json');
console.log(RAW_PATH);

function update_cards() {
  var url = "https://api.hearthstonejson.com/v1/latest/enUS/cards.json";
  request({
    url: url,
    json: true
  }, function (error, response, body) {
    if(!error && response.statusCode===200) {
      fs.writeFile(RAW_PATH, JSON.stringify(response), function(){});
    }
  });

  fs.writeFile("cards.json", "foo", function(){});
}

function update_db() {

  let rawCardData = fs.readFileSync(RAW_PATH);
  let cardData = JSON.parse(rawCardData)['body'];
  console.log(cardData[cardData.length-1]);
}

update_cards();
update_db();
