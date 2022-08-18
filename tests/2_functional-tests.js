const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');
let translator = new Translator();

suite('Functional Tests', () => {

  suite('post request', () => {
    
    test('1 text with locale', done => {
      chai
        .request(server)
        .post('/api/translate')
        .send({ text: 'Mangoes are my favorite fruit.', locale: 'american-to-british' })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(
            res.body.translation, 
            'Mangoes are my <span class="highlight">favourite</span> fruit.'
          );
        });
      done();
    });

    test('2 invalid locale', done => {
      chai
        .request(server)
        .post('/api/translate')
        .send({ text: 'Mangoes are my favorite fruit.', locale: 'asd' })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(
            res.body.error, 
            'Invalid value for locale field'
          );
        });
      done();
    });

    test('3 missing text file', done => {
      chai
        .request(server)
        .post('/api/translate')
        .send({ locale: 'american-to-british' })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(
            res.body.error, 
            'Required field(s) missing'
          );
        });
      done();
    });

    test('4 missing locale file', done => {
      chai
        .request(server)
        .post('/api/translate')
        .send({ text: 'Mangoes are my favorite fruit.' })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(
            res.body.error, 
            'Required field(s) missing'
          );
        });
      done();
    });

    test('5 text with locale', done => {
      chai
        .request(server)
        .post('/api/translate')
        .send({ text: '', locale: 'american-to-british' })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(
            res.body.error, 
            'No text to translate'
          );
        });
      done();
    });

    test('6 no translation needed', done => {
      chai
        .request(server)
        .post('/api/translate')
        .send({ text: 'Mangoes are my favorite fruit.', locale: 'british-to-american' })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(
            res.body.translation, 
            'Everything looks good to me!'
          );
        });
      done();
    });
    
  });
  
});
