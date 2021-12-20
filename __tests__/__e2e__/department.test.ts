import superTest from 'supertest';
import DatabaseConnection from '../../src/utills/connection';
import app from '../../src/index';
import models from '../../src/models';
import { SenderIds } from '../../src/Types/interfaces';
/*
   Test 1 => Admin should successfully create a department
   Test 2 => Admin should not be abe to create a department if name or credit is not given
   Test 3 => Admin should be able to get all Departments
   Test 4 => should be able to get a single department
   Test 5 => should fail if params is incorrect
   Test 6 => Admin should be able to update a department
   Test 7 => Admin should not be able to update if department ID is not provided
   Test 8 => Admin should not be able to update if department ID isincorrect
   Test 9 => Admin should  be able to add credit
   Test 10 => should fail if credit is not a number

*/
// login Test Account Creadentials
let newDepartment: any = {
  name: 'test',
  credit: 20,
};

let updates = {
  name: 'dept1updated',
  credit: 23,
};

let newSenderId: any;

var arrayOfIds: any[] = [];
models.Department.insertMany([newDepartment, newDepartment]).then(
  (docs) => {
    docs.map((doc) => arrayOfIds.push(doc._id));
  },
);

const SuperTest = superTest(app);

beforeAll(async () => {
  try {
    // await DatabaseConnection.dropCollection('departments');
    const department = new models.SenderIDs({
      name: 'Dixre',
    }) as SenderIds;
    await department.save();
    console.log('----------------------before all ---------------');
    newSenderId = department._id.toHexString();
  } catch (e) {
    //
  }
});
afterAll(async () => {
  try {
    await DatabaseConnection.dropCollection('departments');
    await DatabaseConnection.dropCollection('roles');
    await DatabaseConnection.dropCollection('senderids');
  } catch (e) {}
});

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

describe('Department Test', () => {
  let deptID = '';
  test('Admin should successfully create a department', async (done) => {
    SuperTest.post('/admin/create-department')
      .send({ ...newDepartment, senderIds: [newSenderId] })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        const { message, payload } = response.body;
        console.log(
          '------------------------------------------------',
        );
        console.log(payload);
        deptID = payload._id;

        expect(message).toBeDefined();
        expect(typeof payload).toBe('object');
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  test('Admin should not be abe to create a department if name or credit is not given', async (done) => {
    SuperTest.post('/admin/create-department')
      .send({ ...newDepartment, name: '' })
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

  test('should be able to get all departments', async (done) => {
    SuperTest.get('/admin/get-department')
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

  test('should be able to get all departments', async (done) => {
    SuperTest.get('/admin/get-department')
      .set('Accept', 'application/json')
      .query({
        pageNumber: 1,
        pageSize: 10,
        searchText: '',
        agency: newSenderId,
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

  test('should be able to get a single department', async (done) => {
    SuperTest.get('/department/' + deptID)
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
    SuperTest.get('/department/6166360199c49afae4f22712')
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

  test(' Admin should be able to update a department', async (done) => {
    SuperTest.put('/admin/update-department/')
      .send({ id: deptID, updates })
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

  test('Admin should not be able to update if department ID is not provided', async (done) => {
    SuperTest.put('/admin/update-department/')
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
    SuperTest.put('/admin/update-department/')
      .send({ id: '6166360199c49afae4f25714', updates })
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

  test(' Admin should  be able to add credit', async (done) => {
    SuperTest.put('/admin/add-credit')
      .send({ id: deptID, credit: 2 })
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

  test('should fail if credit is not a number', async (done) => {
    SuperTest.put('/admin/add-credit')
      .send({ id: deptID, credit: 'a' })
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

  test('should be able to delete multiple IDs', async (done) => {
    SuperTest.delete('/admin/delete-groups')
      .send({ groupIds: arrayOfIds })
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
