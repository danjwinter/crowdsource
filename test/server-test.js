const app = require('../server');
const request = require('supertest');
const chai = require('chai');
const assert = chai.assert;


describe('Server', () => {

  // before(done => {
  //   this.port = 9876;
  //   this.server = app.listen(this.port, (err, result) => {
  //     if (err) { return done(err); }
  //     done();
  //   });
  //
  //   this.request = request.defaults({
  //     baseUrl: 'http://localhost:9876/'
  //   });
  // });
  //
  // after(() => {
  //   this.server.close();
  // });

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
    it('responds with success', function(done){
      var title = app.locals.title;
      request(app)
        .get('/')
        .assert(response.body.includes(title),
               `"${response.body}" does not include "${title}".`);
        done();
    });
  });

    // it('should have a body with the name of the application', (done) => {
    //   var title = app.locals.title;
    //
    //   this.request.get('/', (error, response) => {
    //     if (error) { done(error); }
        // assert(response.body.includes(title),
        //        `"${response.body}" does not include "${title}".`);
        // done();
    //   });
    // });
    //
    // it('should have a body with a question and four response fields', (done) => {

    //
    //   this.request.get('/', (error, response) => {
    //     if (error) { done(error); }
    //     // assert(response.body.includes(title),
    //     //        `"${response.body}" does not include "${title}".`);
    //     done();
    //   });
    // });


  // });

});
