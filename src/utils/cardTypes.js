export const DEFAULT_CVC_LENGTH = 3;
export const DEFAULT_ZIP_LENGTH = 5;
export const DEFAULT_CARD_FORMAT = /(\d{1,4})/g;
export const CARD_TYPES = {
  amex: {
    name: 'Amex',
    color: 'green',
  },
  visa: {
    name: 'Visa',
    color: 'lime',
  },
  diners: {
    name: 'Diners',
    color: 'orange',
  },
  discover: {
    name: 'Discover',
    color: 'purple',
  },
  jcb: {
    name: 'Jcb',
    color: 'red',
  },
  jcb15: {
    name: 'Jcb',
    color: 'red',
  },
  maestro: {
    name: 'Maestro',
    color: 'yellow',
  },
  mastercard: {
    name: 'Mastercard',
    color: 'lightblue',
  },
  unionpay: {
    name: 'Unipay',
    color: 'cyan',
  },
};

export const getCardType = (cardNum) => {
  var payCardType = '';
  var regexMap = [
    { regEx: /^4[0-9]{5}/gi, cardType: 'VISA' },
    { regEx: /^5[1-5][0-9]{4}/gi, cardType: 'MASTERCARD' },
    { regEx: /^3[47][0-9]{3}/gi, cardType: 'AMEX' },
    { regEx: /^(5[06-8]\d{4}|6\d{5})/gi, cardType: 'MAESTRO' },
  ];

  for (var j = 0; j < regexMap.length; j++) {
    if (cardNum.match(regexMap[j].regEx)) {
      payCardType = regexMap[j].cardType;
      break;
    }
  }

  if (cardNum.indexOf('50') === 0 || cardNum.indexOf('60') === 0 || cardNum.indexOf('65') === 0) {
    var g = '508500-508999|606985-607984|608001-608500|652150-653149';
    var i = g.split('|');
    for (var d = 0; d < i.length; d++) {
      var c = parseInt(i[d].split('-')[0], 10);
      var f = parseInt(i[d].split('-')[1], 10);
      if (cardNum.substr(0, 6) >= c && cardNum.substr(0, 6) <= f && cardNum.length >= 6) {
        payCardType = 'RUPAY';
        break;
      }
    }
  }
  return payCardType;
};

export const ccFormat = (value) => {
  var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  var matches = v.match(/\d{4,16}/g);
  var match = (matches && matches[0]) || '';
  var parts = [];
  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }
  if (parts.length) {
    return parts.join(' ');
  } else {
    return value;
  }
};
