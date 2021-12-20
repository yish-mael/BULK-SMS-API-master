import superTest from 'supertest';
import DatabaseConnection from '../../src/utills/connection';
import app from '../../src/index';
import {
  ContactProps,
  DepartmentProps,
} from '../../src/Types/interfaces';
import models from '../../src/models';
/*
   Test 1 => it should successfully create a contact
   Test 2 => it should fail to create a contact if name or orther required field is not given
   Test 3 => Admin should be able to get all contact
   Test 4 => should be able to get contacts by group
   Test 5 => should fail if params is incorrect
   Test 6 => it should be able to update a contact
   Test 7 => it should not be able to update if contact ID is not provided / empty
   Test 8 => it should not be able to update if contact ID is incorrect
   Test 9 => should be able to delete a contact with correct ID
*/

let newContact = {
  name: 'test',
  number: 20909,
};

let updates = {
  name: 'contact1updated',
  number: 23,
  // groupId: newDepartmentId,
};
var arrayOfIds: any[] = [];
models.Contact.insertMany([newContact, newContact]).then((docs) => {
  docs.forEach((doc) => arrayOfIds.push(doc._id));
});

const SuperTest = superTest(app);

let incorrectId = '6166360199c49afae4f22712';
var newDepartmentId: any;
beforeAll(async () => {
  try {
    const department = new models.Department({
      name: 'deptX',
      credit: 13,
    }) as DepartmentProps;
    await department.save();
    newDepartmentId = department._id.toHexString();
  } catch (e) {}
});
afterAll(async () => {
  try {
    await DatabaseConnection.dropCollection('contacts');
    await DatabaseConnection.dropCollection('departments');
  } catch (e) {
    // console.log(e);
  }
});
describe('Contact Test', () => {
  let contactId = '';
  test('it should successfully create a contact', async (done) => {
    SuperTest.post('/contact')
      .send({ ...newContact, groupId: newDepartmentId })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        const { message, payload } = response.body;
        contactId = payload._id;
        expect(message).toBeDefined();
        expect(typeof payload).toBe('object');
        done();
      })
      .catch((e) => {
        // console.log(e);

        done(e);
      });
  });

  test('it should fail to create a contact if name or other required field is not given', async (done) => {
    SuperTest.post('/contact')
      .send({ ...newContact, name: '', number: '' })
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

  test('Admin should be able to get all Contacts', async (done) => {
    SuperTest.get('/admin/get-contact')
      .query({
        pageNumber: 1,
        pageSize: 10,
        searchText: '',
        agency: '',
        uid: '',
        role: '',
      })
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

  test('should be able to get contacts belonging to a group or agencies', async (done) => {
    SuperTest.get('/admin/get-contact')
      .set('Accept', 'application/json')
      .query({
        pageNumber: 1,
        pageSize: 10,
        searchText: '',
        agency: newDepartmentId,
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

  test(' it should be able to update a contact', async (done) => {
    SuperTest.put('/contact')
      .send({ id: contactId, updates })
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

  test('it should not be able to update if contact ID is not provided / empty', async (done) => {
    SuperTest.put('/contact')
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

  test(' Admin should not be able to update if department ID is incorrect', async (done) => {
    SuperTest.put('/contact')
      .send({ id: '6166360199c49afae4f22714', updates })
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

  test('should be able to delete a contact with correct ID', async (done) => {
    SuperTest.delete('/contact/' + contactId)
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
    SuperTest.delete('/contact/delete-contacts')
      .send({ contactIds: arrayOfIds })
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
