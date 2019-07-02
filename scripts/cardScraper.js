const fs = require("fs");
const path = require("path");
const request = require("request");
const db = require("../db");

const RAW_PATH=path.join(__dirname,'/../assets/cards.json');
const AUTH_URL="https://us.battle.net/oauth/token";
const CARDS_URL="https://us.api.blizzard.com/hearthstone/cards"

function get_access_token(callback) {

  //get credentials
  fs.readFile('../secrets.json', (err, data) => {
    if (err) {
      throw err;
    }
    const raw = JSON.parse(data);
    let client_id = raw['blizzard_client_id'];
    let client_secret = raw['blizzard_client_secret'];
    let auth = "Basic " + Buffer.from(client_id+ ":" + client_secret).toString("base64");

    let request_options = {
      method: 'POST',
      url: AUTH_URL,
      headers: {
        "Authorization": auth,
        "Content-Type": "multipart/form-data"
      },
      formData: {
        "grant_type": "client_credentials"
      }
    }

    //make request and pass access token to callback
    request(request_options, (err, res, body) => {
      if (err) {
        throw err;
      }
      let access_token = JSON.parse(body)["access_token"];
      get_card_data(access_token, callback)
    });

  });
}

function get_card_data(access_token, callback){
  var cardData=[];

  //recursively increment pageNum until current page is equal to total page count
  function get_page(pageNum) {
    //set request parameters
    let auth = " Bearer " + access_token
    let request_options = {
      method: "GET",
      url: CARDS_URL,
      qs: {
        locale: "en_US",
        page: ""+pageNum
      },
      headers: {
        "Authorization": auth
      }
    }

    //make request
    request(request_options, (err, res, body) => {
      if(err) {
        throw err;
      }
      res_body= JSON.parse(body);
      let c = res_body["cards"];
      cardData = cardData.concat(c);
      console.log(cardData[0]);
      console.log(pageNum);
      console.log(cardData.length);

      let pageCount = parseInt(res_body["pageCount"]);
      if (pageNum < pageCount) {
        get_page(pageNum+1);
      } else {
        save_card_data(cardData, callback);
      }
    });
  }
  get_page(1);
}

//saves a list of cardData objects to a file
function save_card_data(cardData, callback) {
  fs.writeFile(RAW_PATH, JSON.stringify(cardData), function(){});
  callback();
}

// update a single card to the database
function update_card(cardData) {
  //
}

function update_db() {
  let rawCardData = fs.readFileSync(RAW_PATH);
  let cardData = JSON.parse(rawCardData);
  console.log(cardData.length);
}

get_access_token(()=>{});
