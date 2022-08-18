const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
let amtobri = 'american-to-british';
let britoam = 'british-to-american';
let goodMessage = 'Everything looks good to me!';
let translator = new Translator();
let callback = (text, locale) => translator.checkFields(text, locale);

suite('Unit Tests', () => {

  test('test 1', () => {
    assert.strictEqual(
      callback('Mangoes are my favorite fruit.', amtobri).translation,
      'Mangoes are my <span class="highlight">favourite</span> fruit.'
    );
  });

  test('test 2', () => {
    assert.strictEqual(
      callback('I ate yogurt for breakfast.', amtobri).translation,
      'I ate <span class="highlight">yoghurt</span> for breakfast.'
    );
  });

  test('test 3', () => {
    assert.strictEqual(
      callback('We had a party at my friend\'s condo.', amtobri).translation,
      'We had a party at my friend\'s <span class="highlight">flat</span>.'
    );
  });

  test('test 4', () => {
    assert.strictEqual(
      callback('Can you toss this in the trashcan for me?', amtobri).translation,
      'Can you toss this in the <span class="highlight">bin</span> for me?'
    );
  });

  test('test 5', () => {
    assert.strictEqual(
      callback('The parking lot was full.', amtobri).translation,
      'The <span class="highlight">car park</span> was full.'
    );
  });

  test('test 6', () => {
    assert.strictEqual(
      callback('Like a high tech Rube Goldberg machine.', amtobri).translation,
      'Like a high tech <span class="highlight">Heath Robinson device</span>.'
    );
  });

  test('test 7', () => {
    assert.strictEqual(
      callback('To play hooky means to skip class or work.', amtobri).translation,
      'To <span class="highlight">bunk off</span> means to skip class or work.'
    );
  });

  test('test 8', () => {
    assert.strictEqual(
      callback('No Mr. Bond, I expect you to die.', amtobri).translation,
      'No <span class="highlight">Mr</span> Bond, I expect you to die.'
    );
  });

  test('test 9', () => {
    assert.strictEqual(
      callback('Dr. Grosh will see you now.', amtobri).translation,
      '<span class="highlight">Dr</span> Grosh will see you now.'
    );
  });

  test('test 10', () => {
    assert.strictEqual(
      callback('Lunch is at 12:15 today.', amtobri).translation,
      'Lunch is at <span class="highlight">12.15</span> today.'
    );
  });

  test('test 11', () => {
    assert.strictEqual(
      callback('We watched the footie match for a while.', britoam).translation,
      'We watched the <span class="highlight">soccer</span> match for a while.'
    );
  });

  test('test 12', () => {
    assert.strictEqual(
      callback('Paracetamol takes up to an hour to work.', britoam).translation,
      '<span class="highlight">Tylenol</span> takes up to an hour to work.'
    );
  });

  test('test 13', () => {
    assert.strictEqual(
      callback('First, caramelise the onions.', britoam).translation,
      'First, <span class="highlight">caramelize</span> the onions.'
    );
  });

  test('test 14', () => {
    assert.strictEqual(
      callback('I spent the bank holiday at the funfair.', britoam).translation,
      'I spent the <span class="highlight">public holiday</span> at the <span class="highlight">carnival</span>.'
    );
  });

  test('test 15', () => {
    assert.strictEqual(
      callback('I had a bicky then went to the chippy.', britoam).translation,
      'I had a <span class="highlight">cookie</span> then went to the <span class="highlight">fish-and-chip shop</span>.'
    );
  });

  test('test 16', () => {
    assert.strictEqual(
      callback('I\'ve just got bits and bobs in my bum bag.', britoam).translation,
      'I\'ve just got <span class="highlight">odds and ends</span> in my <span class="highlight">fanny pack</span>.'
    );
  });

  test('test 17', () => {
    assert.strictEqual(
      callback('The car boot sale at Boxted Airfield was called off.', britoam).translation,
      'The <span class="highlight">swap meet</span> at Boxted Airfield was called off.'
    );
  });

  test('test 18', () => {
    assert.strictEqual(
      callback('Have you met Mrs Kalyani?', britoam).translation,
      'Have you met <span class="highlight">Mrs.</span> Kalyani?'
    );
  });

  test('test 19', () => {
    assert.strictEqual(
      callback('Prof Joyner of King\'s College, London.', britoam).translation,
      '<span class="highlight">Prof.</span> Joyner of King\'s College, London.'
    );
  });

  test('test 20', () => {
    assert.strictEqual(
      callback('Tea time is usually around 4 or 4.30.', britoam).translation,
      'Tea time is usually around 4 or <span class="highlight">4:30</span>.'
    );
  });

   test('test 21', () => {
    assert.include(
      callback('Mangoes are my favorite fruit.', amtobri).translation,
      '<span class="highlight">favourite</span>'
    );
  });

  test('test 22', () => {
    assert.include(
      callback('I ate yogurt for breakfast.', amtobri).translation,
      '<span class="highlight">yoghurt</span>'
    );
  });

  test('test 23', () => {
    assert.include(
      callback('We watched the footie match for a while.', britoam).translation,
      '<span class="highlight">soccer</span>'
    );
  });

  test('test 24', () => {
    assert.include(
      callback('Paracetamol takes up to an hour to work.', britoam).translation,
      '<span class="highlight">Tylenol</span>'
    );
  });
});
