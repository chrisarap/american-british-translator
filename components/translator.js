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
    } else if (['american-to-british', 'british-to-american'].indexOf(locale) == -1) {
      result.error = 'Invalid value for locale field';
    }

    return !Object.entries(result).length ? this.checkTranslate(text, locale) : result;
  }

  checkTranslate(text, locale) {
    let original = text.slice();

    for (let key in americanToBritishTitles) {
      let capitalKey = key.slice(1, key.length).split('');
      let capitalLetter = key[0].toUpperCase();

      let capitalValue = americanToBritishTitles[key].slice(1, americanToBritishTitles[key].length).split('');
      let capitalLetterValue = americanToBritishTitles[key][0].toUpperCase();

      capitalKey.unshift(capitalLetter);
      capitalValue.unshift(capitalLetterValue);

      capitalKey = capitalKey.join('');
      capitalValue = capitalValue.join('')

      americanToBritishTitles[capitalKey] = capitalValue;
    }

    console.log(americanToBritishTitles);

    if (locale == 'american-to-british') {
      for (let key in americanOnly) {
        text = text.replace(key, americanOnly[key]);
      }

      for (let key in americanToBritishSpelling) {
        text = text.replace(key, americanToBritishSpelling[key]);
      }

      for (let key in americanToBritishTitles) {
        text = text.replace(key, americanToBritishTitles[key]);
      }

    } else {
      for (let key in britishOnly) {
        text = text.replace(key, britishOnly[key]);
      }

      for (let key in americanToBritishSpelling) {
        text = text.replace(americanToBritishSpelling[key], key);
      }

      for (let key in americanToBritishTitles) {
        let capitalWord = key.slice(1, key.length).split('');
        let capitalLetter = key[0].toUpperCase();
        capitalWord.unshift(capitalLetter);
        capitalWord = capitalWord.join('');

        if (key != capitalWord) {
          text = text.replace(americanToBritishTitles[key], capitalWord);
        }        

        console.log(text, key, americanToBritishTitles[key], '-',capitalWord);
        console.log('\n');
        console.log(americanToBritishTitles);
        console.log('\n\n\n\n');
      }
    }

    return text != original ? {translation: text} :{translation: 'Everything looks good to me!'};
  }


}

module.exports = Translator;
