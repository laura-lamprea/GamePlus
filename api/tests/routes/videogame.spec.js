/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');



const supertest = require('supertest');
const supertestSession = require('supertest-session');



const agent = session(app);
const videogame = {
  name: 'Super Mario Bros',
  description: 'this is the description for Super Mario Bros',
  released: '1900-01-01',
  rating: 4.9,
  image: 'https://cloudfront-us-east-1.images.arcpublishing.com/infobae/MN2XNZY4XJH27KAROURFGYWLYY.jpg',
  genres: ['Platformer'],
  platforms: ['NES']
};

describe('Videogame routes', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  beforeEach(() => Videogame.sync({ force: true })
    .then(() => Videogame.create(videogame))

  );

  describe('GET /videogames', () => {
    it('should get 200', () => {
      agent.get('/videogames').expect(200)
    });
  });



  //----------------------------------------------------- 
  describe('GET /videogames/:id', () => {
    it('should get 200', () => {
      agent.get('/videogames/5286').expect(200)
    });
  });
  //----------------------------------------------------- 
  describe('GET/videogames?name=the', () => {
    it('should get 200', () => {
      agent.get('/videogames?name=the').expect(200)
    })
  });
  //----------------------------------------------------- 
  describe("POST /videogames", () => {
    it("should get 200", async () => {
      await agent
        .post("/videogames")
        .send({
          name: 'Super Mario Bros',
          description: 'this is the description for Super Mario Bros',
          released: '1900-01-01',
          rating: 4.9,
          image: 'https://cloudfront-us-east-1.images.arcpublishing.com/infobae/MN2XNZY4XJH27KAROURFGYWLYY.jpg',
          genres: ['Platformer'],
          platforms: ['NES']
        })
        .expect(200);
    });
  });

  describe('GET /genres', () => {
    it('should get 200', () =>
      agent.get('/genres').expect(200)
    );
    it('first genre must be Action', () =>
    agent.get('/genres').then((res)=> {
      expect(res.body[0].name).to.equal("Action")
    }));
  });  

  describe('GET /platforms', () => {
    it('should get 200', () =>
      agent.get('/videogames/platforms').expect(200)
    );  //Xbox One
    it('first platform must be Xbox One', () =>
    agent.get('/videogames/platforms').then((res)=> {
      expect(res.body[0]).to.equal("Xbox One")
    }));
  });

  //   describe('GET /videogames?page=1', () => {
  //     it('should get 200', async (done) =>
  //     agent.get('/videogames?page=1')//.expect(200) 
  //     .then(function () {
  //       expect(200); //expect(res).to.have.status(200);
  //       done();
  //     }).timeout(10000)
  //    //7594.367 ms   3635.393 ms
  //   //  await delay(10000)
  //     ).timeout(10000)
  //   });
  // //https://www.paradigmadigital.com/dev/testeo-api-rest-mocha-chai-http/
  // //https://stackoverflow-com.translate.goog/questions/44149096/for-async-tests-and-hooks-ensure-done-is-called-if-returning-a-promise-en?_x_tr_sl=en&_x_tr_tl=es&_x_tr_hl=es-419&_x_tr_pto=sc
});

