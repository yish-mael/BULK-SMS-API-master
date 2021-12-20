import superTest from 'supertest';
import DatabaseConnection from '../../src/utills/connection';
import app from '../../src/index';
import models from '../../src/models';
/*
   Test 1 => it should successfully create a senderid
   Test 2 => it should fail to create a senderid if name or orther required field is not given
   Test 3 => should be able to get all senderId
   Test 4 => it should be able to update a senderId
   Test 5 => it should not be able to update if sender ID is not provided / empty
   Test 6 => should be able to delete a senderId with correct ID
*/
let newReport = {
  message: 'message1',
};

var arrayOfIds: any[] = [];
models.Reports.insertMany([newReport, newReport]).then((docs) => {
  docs.forEach((doc) => arrayOfIds.push(doc._id));
});

const SuperTest = superTest(app);

beforeAll(async () => {
  try {
    await DatabaseConnection.dropCollection('report');
  } catch (e) {}
});

describe('Report Test', () => {
  let reportID = '';
  test('it should successfully create a report', async (done) => {
    SuperTest.post('/report/create-report')
      .send(newReport)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        const { message, payload } = response.body;
        reportID = payload._id;
        expect(message).toBeDefined();
        expect(typeof payload).toBe('object');
        expect(payload.message).toBeDefined();
        done();
      })
      .catch((e) => {
        // console.log(e);

        done(e);
      });
  });

  test('it should fail to create a report if message  field is not given', async (done) => {
    SuperTest.post('/report/create-report')
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

  test('Admin should be able to get all reports', async (done) => {
    SuperTest.get('/admin/get-report')
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

  test('should be able to delete a report with correct ID', async (done) => {
    SuperTest.delete('/admin/delete-report/' + reportID)
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
    SuperTest.delete('/admin/delete-reports/')
      .send({ reportIds: arrayOfIds })
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
