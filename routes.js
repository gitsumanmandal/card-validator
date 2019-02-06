var express = require('express');
var router = express.Router();
var YAML = require('json2yaml');
var writeFile = require('write-file');

router.get('/validate', function (req, res) {
  var cNo = req.query.cardNo;
  var cardType = null;
  var validity = false;

  if (cNo.startsWith("34") || cNo.startsWith("37")) {
    cardType = "amex";
  }
  if (cNo.startsWith("301") || cNo.startsWith("302") || cNo.startsWith("303") || cNo.startsWith("304") || cNo.startsWith("305")) {
    cardType = "dinersclub-carte-blanche";
  }
  if (cNo.startsWith("36")) {
    cardType = "dinersclub-international";
  }
  if (cNo.startsWith("54")) {
    cardType = "dinersclub-usa-canada";
  }
  if (cNo.startsWith("6011") || cNo.startsWith("644") || cNo.startsWith("645") || cNo.startsWith("646") || cNo.startsWith("647") || cNo.startsWith("648") || cNo.startsWith("649") || cNo.startsWith("65")) {
    cardType = "discover";
  }
  if (parseInt(cNo.substring(0, 6)) >= 622126 && parseInt(cNo.substring(0, 6)) <= 622925) {
    cardType = "discover";
  }
  if (parseInt(cNo.substring(0, 4)) >= 3528 && parseInt(cNo.substring(0, 4)) <= 3589) {
    cardType = "jcb";
  }
  if (cNo.startsWith("637") || cNo.startsWith("638") || cNo.startsWith("639")) {
    cardType = "insta-payment"
  }
  if (cNo.startsWith("5018") || cNo.startsWith("5020") || cNo.startsWith("5038") || cNo.startsWith("5893") || cNo.startsWith("6304") || cNo.startsWith("6759") || cNo.startsWith("6761") || cNo.startsWith("6762") || cNo.startsWith("6763")) {
    cardType = "maestro";
  }
  if (cNo.startsWith("51") || cNo.startsWith("52") || cNo.startsWith("53") || cNo.startsWith("54") || cNo.startsWith("55")) {
    cardType = "master-card";
  }
  if (parseInt(cNo.substring(0, 6)) >= 222100 && parseInt(cNo.substring(0, 6)) <= 272099) {
    cardType = "master-card";
  }
  if (cNo.startsWith("4")) {
    if (cNo.startsWith("4026") || cNo.startsWith("417500") || cNo.startsWith("4508") || cNo.startsWith("4844") || cNo.startsWith("4913") || cNo.startsWith("4917")) {
      cardType = "visa-electron";
    }
    else {
      cardType = "visa";
    }
  }

  var result = false;
  var cardNo = cNo.toString();
  var nDigits = cardNo.length;
  var nSum = 0;
  var isSecond = true;
  var lastDigit = cardNo.charAt(nDigits - 1);
  for (var i = nDigits - 2; i >= 0; i--) {
    var d = cardNo.charAt(i);
    if (isSecond == true) {
      d = d * 2;
      if (d > 9) {
        d -= 9;
      }
    }
    nSum += parseInt(d);
    isSecond = !isSecond;
  }
  nSum += parseInt(lastDigit);
  result = (nSum % 10 == 0);
  if (cardType == "amex") {
    validity = (cNo.length == 15);
  }

  if (cardType == "amex") {
    validity = (cNo.length == 15);
  }
  if (cardType == "dinersclub-carte-blanche") {
    validity = (cNo.length == 14);
  }
  if (cardType == "dinersclub-international") {
    validity = (cNo.length == 14);
  }
  if (cardType == "dinersclub-usa-canada") {
    validity = (cNo.length == 16);
  }
  if (cardType == "discover") {
    validity = (cNo.length == 16 || cNo.length == 19);
  }
  if(cardType == "insta-payment"){
    validity = (cNo.length == 16);
  }
  if(cardType == "jcb"){
    validity = (cNo.length == 16 || cNo.length == 19);
  }
  if(cardType == "maestro"){
    validity = (cNo.length == 16 || cNo.length == 19);
  }
  if(cardType == "master-card"){
    validity = (cNo.length == 16);
  }
  if(cardType == "visa-electron"){
    validity = (cNo.length == 16);
  }
  if(cardType == "visa"){
    validity = (cNo.length == 13 || cNo.length == 16 || cNo.length == 19);
  }
  
  if (result && validity) {
    res.status(200).send({ data: { card: cardType }, status: "valid" });
  }
  else {
    res.status(200).send({ status: "invalid" });
  }
});

module.exports = router;