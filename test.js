import chai from 'chai';
import chaiHttp from 'chai-http';
import app from './app.js';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Express App', () => {
  // Test GET /project route
  describe('GET /project', () => {
    it('should return a random project as HTML', (done) => {
      chai
        .request(app)
        .get('/project')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.html;
          // You can add more assertions for the HTML content if needed
          done();
        });
    });
  });

  // Test GET /projects route
  describe('GET /projects', () => {
    it('should return a list of projects as HTML', (done) => {
      chai
        .request(app)
        .get('/projects')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.html;
          // You can add more assertions for the HTML content if needed
          done();
        });
    });
  });

 // Test POST /add-project route
describe('POST /add-project', () => {
  it('should add a new project and return the redirection URL', (done) => {
    const newProject = {
      name: 'Test Project',
      description: 'This is a test project',
      difficulty: 'Easy',
      tags: 'test, project',
    };

    chai
      .request(app)
      .post('/add-project')
      .send(newProject)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('redirectUrl').that.equals('/project');
        done();
      });
  });

  it('should return 400 if required fields are missing', (done) => {
    const invalidProject = {
      // Missing fields
    };

    chai
      .request(app)
      .post('/add-project')
      .send(invalidProject)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  })
});