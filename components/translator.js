const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {

  checkFields(text, locale) {
    let result = {};

    if (text == undefined || locale == undefined) {
      result.error = 'Required field(s) missing';
    } else if (text == '') {
      result.error = 'No text to translate';
    } else if (locale != 'american-to-british' || locale != 'british-to-american') {
      result.error = 'Invalid value for locale field';
    }

    return result;
  }


}

module.exports = Translator;
