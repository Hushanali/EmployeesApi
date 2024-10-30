const express = require('express');
const { getEmployees, getEmployeeById } = require('./controllers/index');

const app = express();

app.use(express.json());

// 1
app.get('/employees', async (req, res) => {
  let employees = getEmployees();
  res.json({employees});
});

// 2
app.get('/employees/details/:id', async (req, res) => {
  let employee = getEmployeeById(parseInt(req.params.id));
  res.json({employee});
});

module.exports = {
  app,
};
