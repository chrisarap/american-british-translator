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

    console.log('test ', text, locale);

    if (locale == 'american-to-british') {

      if (/\d\d*\:\d\d*/.test(text)) {
        let hour = text.match(/\d\d*\:\d\d*/).join('');
        console.log('hey', hour);
        let newHour = hour.replace(':', '.');
        text = text.replace(hour, `<span class="highlight">${newHour}</span>`)
      }

      // normal translation
      for (let key in americanOnly) {
        text = text.replace(key, `<span class="highlight">${americanOnly[key]}</span>`);
      }

      // spelling translation
      for (let key in americanToBritishSpelling) {
        text = text.replace(key, `<span class="highlight">${americanToBritishSpelling[key]}</span>`);
      }

      // tittle translation
      for (let key in americanToBritishTitles) {
        let value = americanToBritishTitles[key];

        let splitText = text.slice().split(' ');

        if(splitText.indexOf(key) >= 0) {
          text = text.replace(key, `<span class="highlight">${this.parseFirstLetter(value)}</span>`);
        } else if (splitText.indexOf(this.parseFirstLetter(key)) >= 0) {
          text = text.replace(this.parseFirstLetter(key), `<span class="highlight">${this.parseFirstLetter(value)}</span>`);
        }
      }

    } else {
      // british to american

      // normal translation
      for (let key in britishOnly) {
        text = text.replace(key, `<span class="highlight">${britishOnly[key]}</span>`);
      }

      // spelling translation
      for (let key in americanToBritishSpelling) {
        text = text.replace(americanToBritishSpelling[key], `<span class="highlight">${key}</span>`);
      }

      // tittle translation
      for (let value in americanToBritishTitles) {
        let key = americanToBritishTitles[value];

        let splitText = text.slice().split(' ');
        splitText = text.slice().split('.');

        if(splitText.indexOf(key) >= 0) {
          text = text.replace(key, `<span class="highlight">${this.parseFirstLetter(value)}</span>`);
        } else if (splitText.indexOf(this.parseFirstLetter(key)) >= 0) {
          text = text.replace(this.parseFirstLetter(key), `<span class="highlight">${this.parseFirstLetter(value)}</span>`);
        }
      }
    }



    return text != original ? {text: original, translation: text} :{text: original, translation: 'Everything looks good to me!'};
  }

  parseFirstLetter(word) {
    word = word.toLowerCase();
    let firstLetter = word[0].toUpperCase();
    let letters = word.slice(1, word.length);

    return firstLetter + letters
  }
}

module.exports = Translator;
