// required modules
let app = require('../app');
let chai = require('chai');
let chaiHttp = require('chai-http');
var _ = require('lodash');
const Product = require('../models/product');
const { expect } = require('chai');

// create a new test-agent
chai.use(chaiHttp);
const agent = chai.request.agent(app);

// dummy-data for add-product
const product = new Product({
  "name": "test name",
  "category": "phone",
  "description": "test description",
  "price": "69",
  "path": "test path",
  "discount": 100
});

// dummy-data for modify-product
const updatedProduct = new Product({
  "name": "test name updated",
  "category": "phone",
  "description": "test description updated",
  "price": "360",
  "path": "test path updated",
  "discount": 80
});

// error storage
let error = product.validateSync();
let errorCount = 0;
if (error) { errorCount = _.size(error.errors) }

describe('--------------------------------------\n  \tWebShopBackend API Tests:\n  --------------------------------------', () => {

  it('Should be able to login', function (done) {
    agent
      .post('/api/login')
      .send({ email: 'admin@nasapc.com', password: 'admin' })
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(agent).to.have.cookie('LOCAL_KEY');
        done();
      });
  });

  it('Should be able to get a session', function (done) {
    agent
      .get('/api/session')
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body[0]).to.have.property('email');
        expect(res.body[0].email).to.equal('admin@nasapc.com');
        expect(res.body[0].admin).to.equal(true);
        expect(agent).to.have.cookie('LOCAL_KEY');
        done();
      });
  });

  it('Should be able to get all products', function (done) {
    agent
      .get('/api/products')
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body[0]).to.have.property('_id');
        expect(res.body[0]).to.have.property('name');
        expect(res.body[0]).to.have.property('description');
        expect(res.body[0]).to.have.property('category');
        expect(res.body[0]).to.have.property('price');
        expect(res.body[0]).to.have.property('reviews');
        done();
      });
  });


  it('Should be able to get a product by id', function (done) {
    agent
      .get('/api/product/6269af62764b955a18307115')
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('_id');
        expect(res.body).to.have.property('name');
        expect(res.body).to.have.property('description');
        expect(res.body).to.have.property('category');
        expect(res.body).to.have.property('price');
        expect(res.body).to.have.property('reviews');
        done();
      });
  });

  it('Should be able to add a product to wishlist', function (done) {
    agent
      .post('/api/add-to-wishlist/6269af62764b955a18307115')
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Product has been added to your wishlist.')
        done();
      });
  });

  it('Should be able to get wishlist', function (done) {
    agent
      .get('/api/wishlist')
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an.instanceOf(Object);
        done();
      });
  });

  it('Should be able to remove a product from wishlist', function (done) {
    agent
      .post('/api/remove-from-wishlist/6269af62764b955a18307115')
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Your WishList has been updated.')
        done();
      });
  });

  it('Should be able to post a new product', function (done) {

    if (errorCount != 0) {
      throw error.errors;
    }

    agent
      .post('/api/admin/add-product')
      .send(product)
      .end(function (err, res) {
        expect(Object.keys(res.body).length).to.equal(10)
        expect(res).to.have.status(201);
        expect(res.body)
          .to.be.an.instanceof(Object)
          .that.includes.all.keys(['_id', 'name', 'price', 'description', 'category', 'path', 'discount', 'quantity', 'reviews', 'rating']);
        expect(agent).to.have.cookie('LOCAL_KEY');
        done();
      });
  });

  it('Should be able to modify the new product', function (done) {


    if (errorCount != 0) {
      throw error.errors;
    }

    Product.findOne({}, {}, { sort: { '_id': -1 } }, function (err, prod) {
      agent
        .put('/api/admin/modify-product/' + prod._id)
        .send(updatedProduct)
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res.body)
            .to.be.an.instanceof(Object)
            .that.includes.all.keys(['_id', 'name', 'price', 'description', 'category', 'path', 'discount']);
          expect(res.body.name).to.equal(product.name + ' updated')
          expect(res.body.category).to.equal(updatedProduct.category)
          expect(res.body.description).to.equal(product.description + ' updated')
          expect(res.body.price).to.equal(updatedProduct.price)
          expect(res.body.path).to.equal(product.path + ' updated')
          expect(res.body.discount).to.equal(updatedProduct.discount)
          expect(agent).to.have.cookie('LOCAL_KEY');
          done();
        });
    });

  });

  it('Should be able to delete the new product', function (done) {


    if (errorCount != 0) {
      throw error.errors;
    }

    Product.findOne({}, {}, { sort: { '_id': -1 } }, function (err, prod) {
      agent
        .delete('/api/admin/delete-product/' + prod._id)
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an.instanceOf(Object)
            .that.has.property('message');
          expect(res.body.message).to.equal('Deleted')
          expect(agent).to.have.cookie('LOCAL_KEY');
          done();
        });
    });

  });

  it('Should be able to request password change', function (done) {
    agent
      .post('/api/request-password-change')
      .send({ email: 'admin@nasapc.com' })
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Password change request sent!')
        expect(agent).to.have.cookie('LOCAL_KEY');
        done();
      });
  });

  it('Should be able to logout', function (done) {
    agent
      .get('/api/logout')
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(agent).to.not.have.cookie('LOCAL_KEY');
        done();
      });
  });

});