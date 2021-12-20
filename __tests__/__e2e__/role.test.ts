import superTest from 'supertest';
import DatabaseConnection from '../../src/utills/connection';
import app from '../../src/index';
import models from '../../src/models';
/*
   Test 1 => Admin should successfully create a role
   Test 2 => Admin should fail to create a role if name or other required field is not given
   Test 3 => Admin should be able to get all role
   Test 4 => Admin should be able to get a single role
   Test 5 => should fail if params is incorrect
   Test 6 => it should be able to update a role

   Test 7 => should fail to update if role ID is not provided / empty
   Test 8 => should fail to update  if contact ID is incorrect
   Test 9 => should be able to delete a role with correct ID
*/
// login Test Account Creadentials
let newRole = {
  sendMessage: true,
  readMessage: true,
  name: 'taker',
  addContact: true,
};

let updates = {
  sendMessage: false,
  readMessage: false,
  name: 'taker',
  addContact: false,
};

var arrayOfIds: any[] = [];
models.Role.insertMany([newRole, newRole]).then((docs) => {
  docs.forEach((doc) => arrayOfIds.push(doc._id));
});

const SuperTest = superTest(app);

let incorrectId = '6166360199c49afae4f22712';
beforeAll(async () => {
  try {
    await DatabaseConnection.dropCollection('roles');
  } catch (e) {}
});

describe('Role Test', () => {
  let newRoleID = '';

  test('Admin should successfully create a role', async (done) => {
    SuperTest.post('/admin/create-role')
      .send(newRole)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        const { message, payload } = response.body;
        newRoleID = payload._id;
        expect(message).toBeDefined();
        expect(typeof payload).toBe('object');
        done();
      })
      .catch((e) => {
        // console.log(e);

        done(e);
      });
  });

  test(' Admin should fail to create a role if name or other required field is not given', async (done) => {
    SuperTest.post('/admin/create-role')
      .send({
        ...newRole,
        name: '',
        sendMessage: '',
        readMessage: '',
      })
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

  test('Admin should be able to get all role', async (done) => {
    SuperTest.get('/admin/get-role')
      .set('Accept', 'application/json')
      .query({
        pageNumber: 1,
        pageSize: 10,
        searchText: '',
        agency: '',
        uid: '',
        role: '',
      })
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

  test(' Admin should be able to get a single role', async (done) => {
    SuperTest.get('/admin/get-role/' + newRoleID)
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
    SuperTest.get('/admin/get-role/' + incorrectId)
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

  test('it should be able to update a role', async (done) => {
    SuperTest.put('/admin/update-role')
      .send({ id: newRoleID, updates })
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

  test('should fail to update if role ID is not provided / empty', async (done) => {
    SuperTest.put('/admin/update-role')
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

  test('should fail to update  if role ID is incorrect', async (done) => {
    SuperTest.put('/admin/update-role')
      .send({ id: incorrectId, updates })
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

  test('should be able to delete a role with correct ID', async (done) => {
    SuperTest.delete('/admin/delete-role/' + newRoleID)
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

  test('should be able to delete multiple IDs', async (done) => {
    SuperTest.delete('/admin/delete-roles')
      .send({ roleIds: arrayOfIds })
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
