const { getEmployees, getEmployeeById } = require('../controllers/index');
const request = require('supertest');
const http = require('http');
const { app } = require('../index');

jest.mock('../controllers/index', () => ({
  ...jest.requireActual('../controllers/index'),
  getEmployees: jest.fn(),
  getEmployeeById: jest.fn(),
}));

let server;

beforeAll(async () => {
  server = http.createServer(app);
  server.listen(3001);
});

afterAll(() => {
  server.close();
});

// 3
describe('Test API endpoint', () => {
  it('GET /employees should get all employees', async () => {
    const mockEmployees = [
      {
        employeeId: 1,
        name: 'Rahul Sharma',
        email: 'rahul.sharma@example.com',
        departmentId: 1,
        roleId: 1,
      },
      {
        employeeId: 2,
        name: 'Priya Singh',
        email: 'priya.singh@example.com',
        departmentId: 2,
        roleId: 2,
      },
      {
        employeeId: 3,
        name: 'Ankit Verma',
        email: 'ankit.verma@example.com',
        departmentId: 1,
        roleId: 3,
      },
    ];

    getEmployees.mockReturnValue(mockEmployees);
    const res = await request(server).get('/employees');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      employees: mockEmployees,
    });
    expect(res.body.employees.length).toBe(3);
  });

  // 4
  it('GET /employees/details/:id should get an employee by Id', async () => {
    const mockEmployee = {
      employeeId: 1,
      name: 'Rahul Sharma',
      email: 'rahul.sharma@example.com',
      departmentId: 1,
      roleId: 1,
    };

    getEmployeeById.mockReturnValue(mockEmployee);
    const res = await request(server).get('/employees/details/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      employee: mockEmployee,
    });
  });
});

// 5
describe('Test Controller function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should return all employees', () => {
    let mockEmployees = [
      {
        employeeId: 1,
        name: 'Rahul Sharma',
        email: 'rahul.sharma@example.com',
        departmentId: 1,
        roleId: 1,
      },
      {
        employeeId: 2,
        name: 'Priya Singh',
        email: 'priya.singh@example.com',
        departmentId: 2,
        roleId: 2,
      },
      {
        employeeId: 3,
        name: 'Ankit Verma',
        email: 'ankit.verma@example.com',
        departmentId: 1,
        roleId: 3,
      },
    ];

    getEmployees.mockReturnValue(mockEmployees);
    let result = getEmployees();
    expect(result).toEqual(mockEmployees);
    expect(result.length).toBe(3);
  });
});
