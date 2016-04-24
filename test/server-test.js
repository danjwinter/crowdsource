const app = require('../server');
const request = require('supertest');
const chai = require('chai');
const assert = chai.assert;


describe('Server', () => {
  it('should exist', () => {
    assert(app);
  });

  describe('GET /', function(){
    it('responds with success', function(done){
      request(app)
        .get('/')
        .expect(200, done);
    });
  });

  describe('GET /', function(){
    it('responds with question form', function(done){
      request(app)
      .get('/')
      .expect(200)
      .end(function(err, res) {
        assert(res.text.includes("Question"));
        assert(res.text.includes("First Response"));
        assert(res.text.includes("Second Response"));
        assert(res.text.includes("Third Response"));
        assert(res.text.includes("Fourth Response"));
        assert(res.text.includes("Pollees See Results?"));
        assert(res.text.includes("Set Close Time"));
        done();
      });
    });

    it('defaults with an empty survey', function(done){
        assert.deepEqual(app.locals.surveys, {});
        done();
      });
    });
  describe('GET /survey/:id', function(){
    it('responds with survey question and choices', function(done){
     app.locals.surveys['1'] = { question: 'What is your favorite color?',
  responses: [ 'Red', 'Blue', 'Green' ],
  closeTimer: '',
  actualCloseTime: '',
  polleesSeeResults: 'true',
  id: 1,
  results: { Red: [], Blue: [], Green: [] },
  resultText: ' Red: 0 Blue: 0 Green: 0',
  pollOpen: true };

      request(app)
      .get('/survey/1')
      .expect(200)
      .end(function(err, res) {
        assert(res.text.includes('Red'));
        assert(res.text.includes('Blue'));
        assert(res.text.includes('Green'));
        assert(res.text.includes('What is your favorite color?'));
        done();
      });
    });

  });

  describe('GET /admin/:id', function(){
    it('responds with question form', function(done){
     app.locals.surveys['1'] = { question: 'What is your favorite color?',
  responses: [ 'Red', 'Blue', 'Green' ],
  closeTimer: '',
  actualCloseTime: '',
  polleesSeeResults: 'true',
  id: 1,
  results: { Red: [], Blue: [], Green: [] },
  resultText: ' Red: 0 Blue: 0 Green: 0',
  pollOpen: true };

      request(app)
      .get('/admin/1')
      .expect(200)
      .end(function(err, res) {
        assert(res.text.includes('What is your favorite color?'));
        assert(res.text.includes('Results:'));
        assert(res.text.includes('Red: 0 Blue: 0 Green: 0'));
        assert(res.text.includes('Close Survey'));
        done();
      });
    });
  });
});
