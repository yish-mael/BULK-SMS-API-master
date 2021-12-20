import superTest from 'supertest';
import DatabaseConnection from '../../src/utills/connection';
import app from '../../src/index';
import models from '../../src/models';
/*
   Test 1 => Admin should successfully create an account
   Test 2 => Admin should not be able to create an account if required field is no provided
   Test 4 => should be able to get a single account by ID
   Test 5 => should fail if params is incorrect
   Test 6 => Admin should be able to update an account
   Test 7 => Admin should not be able to update if ID is not provided

*/
// login Test Account Creadentials

const requestParam = {
  pageNumber: 1,
  pageSize: 10,
  filter: {
    searchText: '',
    agency: '',
    uid: '',
    role: '',
  },
};

let newAdmin = {
  name: 'test',
  email: 'abc@gmail.com',
  password: 'aaaa',
};

let updates = {
  name: 'testupdate',
  email: 'def@gmail.com',
  password: 'bbb',
};

var arrayOfIds: any[] = [];
models.Admin.insertMany([newAdmin, newAdmin]).then((docs) => {
  docs.forEach((doc) => arrayOfIds.push(doc._id));
});

const SuperTest = superTest(app);

beforeAll(async () => {
  try {
    await DatabaseConnection.dropCollection('admins');
  } catch (e) {
    //
  }
});

describe('Admin Test', () => {
  let adminID = '';
  let incorrectId = '6166360199c49afae4f22712';
  let accessToken = '';

  test('Admin should successfully create an account', async (done) => {
    SuperTest.post('/admin')
      .send(newAdmin)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        const { message, payload } = response.body;
        adminID = payload._id;

        expect(message).toBeDefined();
        expect(typeof payload).toBe('object');
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  // test('Should be able to login from a verified account', async (done) => {
  //   SuperTest.post('/admin/login')
  //     .send({
  //       email: newAdmin.email,
  //       password: newAdmin.password,
  //     })
  //     .set('Accept', 'application/json')
  //     .expect('Content-Type', /json/)
  //     .expect(200)
  //     .then((response) => {
  //       const data = response.body;
  //       expect(response.status).toBe(200);
  //       expect(data.message).toBeDefined();
  //       expect(data.accessToken).toBeDefined();
  //       expect(data.refreshToken).toBeDefined();
  //       expect(typeof data.payload).toBe('object');
  //       accessToken = data.accessToken;
  //       done();
  //     })
  //     .catch((e) => {
  //       done(e);
  //     });
  // });

  test(' Admin should not be able to create an account if required field is no provided', async (done) => {
    SuperTest.post('/admin/create-department')
      .send({ name: '', email: '', password: '' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .then((response) => {
        const { message } = response.body;
        expect(message).toBeDefined();
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  test('should be able to get a single account by ID', async (done) => {
    SuperTest.get('/admin/' + adminID)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        const { message, payload } = response.body;
        expect(message).toBeDefined();
        expect(typeof payload).toBe('object');

        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  test('should fail if params is incorrect', async (done) => {
    SuperTest.get('/admin/' + incorrectId)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
      .then((response) => {
        const { message } = response.body;

        expect(message).toBeDefined();
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  test(' Admin should be able to update an account', async (done) => {
    SuperTest.put('/admin/')
      .send({ id: adminID, updates })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        const { message, payload } = response.body;

        expect(message).toBeDefined();
        expect(typeof payload).toBe('object');

        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  test('Admin should not be able to update if ID is not provided', async (done) => {
    SuperTest.put('/admin')
      .send({ id: '', updates })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .then((response) => {
        const { message } = response.body;

        expect(message).toBeDefined();

        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  // test('should be able to get all admins', async (done) => {
  //   SuperTest.get('/admin')
  //     .set('Accept', 'application/json')
  //     .query({
  //       pageNumber: 1,
  //       pageSize: 10,
  //       filter: {
  //         searchText: '',
  //         agency: '',
  //         uid: '',
  //         role: '',
  //       },
  //     })
  //     .expect('Content-Type', /json/)
  //     .expect(200)
  //     .then((response) => {
  //       const { message, payload } = response.body;

  //       expect(message).toBeDefined();
  //       expect(typeof payload).toBe('object');
  //       done();
  //     })
  //     .catch((e) => {
  //       done(e);
  //     });
  // });

  test('should be able to delete multiple IDs', async (done) => {
    SuperTest.delete('/admin/delete-admins')
      .send({ adminIds: arrayOfIds })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        const { message, payload } = response.body;

        expect(message).toBeDefined();
        expect(typeof payload).toBe('object');

        done();
      })
      .catch((e) => {
        done(e);
      });
  });
});
