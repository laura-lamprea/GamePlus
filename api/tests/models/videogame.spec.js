const { Videogame, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Videogame model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Videogame.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Videogame.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Videogame.create({ name: 'Super Mario Bros' }); //estaba con Recipe
      });
    });
  });

  describe('Property image', () => {
    it('should throw an error if image is not a string', (done) => {
      Videogame.create({ image: 123 })
        .then(() => done(new Error('It requires a valid name')))
        .catch(() => done());
    });
    it('should work when its a valid image', () => {
      Videogame.create({ image: 'https://cloudfront-us-east-1.images.arcpublishing.com/infobae/MN2XNZY4XJH27KAROURFGYWLYY.jpg' }); //estaba con Recipe
    });
  });

  describe('Property description', () => {
    it('should throw an error if description is empty', (done) => {
      Videogame.create({ description: '' })
        .then(() => done(new Error('It requires a valid name')))
        .catch(() => done());
    });
    it('should work when its a valid description', () => {
      Videogame.create({ description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it' }); //estaba con Recipe
    });
  });

  describe('Property description', () => {
    it('should throw an error if description is empty', (done) => {
      Videogame.create({ description: '' })
        .then(() => done(new Error('It requires a valid description')))
        .catch(() => done());
    });
    it('should work when its a valid description', () => {
      Videogame.create({ description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it' }); 
    });
  });  

  describe('Property rating', () => {
    it('should throw an error if rating is not a float', (done) => {
      Videogame.create({ rating: 'hello' })
        .then(() => done(new Error('It requires a valid rating')))
        .catch(() => done());
    });
    it('should work when its a valid rating', () => {
      Videogame.create({ rating: '4.7' }); 
    });
  }); 

});
