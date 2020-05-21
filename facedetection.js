"use strict";

const axios = require("axios");
require("dotenv").config();
var fs = require("fs");

module.exports = async function getEmotion(filename) {
  const options = {
    url: `${process.env.ENDPOINT}face/v1.0/detect`,
    method: "post",
    params: {
      returnFaceAttributes: "emotion",
    },
    data: fs.readFileSync(filename),
    headers: {
      "Content-Type": "application/octet-stream",
      "Ocp-Apim-Subscription-Key": process.env.SUBS_KEY,
    },
  };

  return await axios(options).then((result) => {
    const emotions = result.data[0].faceAttributes.emotion;
    for (const property in emotions) {
      if (emotions[property] > 0.8) return property;
    }
  });
};
