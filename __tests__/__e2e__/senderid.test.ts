import superTest from 'supertest';
import DatabaseConnection from '../../src/utills/connection';
import app from '../../src/index';
import { DepartmentProps } from '../../src/Types/interfaces';
import models from '../../src/models';
/*
   Test 1 => it should successfully create a senderid
   Test 2 => it should fail to create a senderid if name or orther required field is not given
   Test 3 => should be able to get all senderId
   Test 4 => it should be able to update a senderId
   Test 5 => it should not be able to update if sender ID is not provided / empty
   Test 6 => should be able to delete a senderId with correct ID
*/
let newSenderID = {
  name: 'test',
};

let updates = {
  name: 'colosy',
};

var arrayOfIds: any[] = [];
models.SenderIDs.insertMany([newSenderID, newSenderID]).then(
  (docs) => {
    docs.forEach((doc) => arrayOfIds.push(doc._id));
  },
);

const SuperTest = superTest(app);

var newDepartmentId: any;
beforeAll(async () => {
  try {
    await DatabaseConnection.dropCollection('senderID');
  } catch (e) {}
});

describe('SenderID Test', () => {
  let senderId = '';
  test('it should successfully create a senderID', async (done) => {
    SuperTest.post('/senderID')
      .send({ ...newSenderID })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        const { message, payload } = response.body;
        senderId = payload._id;
        expect(message).toBeDefined();
        expect(typeof payload).toBe('object');
        expect(payload.name).toBeDefined();
        done();
      })
      .catch((e) => {
        // console.log(e);

        done(e);
      });
  });

  test('it should fail to create a senderid if name  field is not given', async (done) => {
    SuperTest.post('/senderID')
      .send({})
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

  test('Admin should be able to get all senderIDs', async (done) => {
    SuperTest.get('/senderID')
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
        // console.log('sender error message', response);
        const { message, payload } = response.body;
        expect(message).toBeDefined();
        expect(typeof payload).toBe('object');

        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  test(' it should be able to update a senderID', async (done) => {
    SuperTest.put('/senderID')
      .send({ id: senderId, updates })
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

  test('it should not be able to update if senderID id is not provided / empty', async (done) => {
    SuperTest.put('/senderID')
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

  test('should be able to delete a senderID with correct ID', async (done) => {
    SuperTest.delete('/senderID/' + senderId)
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
    SuperTest.delete('/admin/delete-senders')
      .send({ senderIds: arrayOfIds })
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
