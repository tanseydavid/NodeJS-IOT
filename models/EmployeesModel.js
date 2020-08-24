const db = require('../connection');
const tools = require('../tools');

module.exports = {

    async getByEmployeeNumber(employeeNumber) {
        let sqlEmployee =
            'SELECT e.*, o.City AS officeCity FROM employees e ' +
            ' LEFT OUTER JOIN offices o ON o.officeCode = e.officeCode ' +
            ' WHERE employeeNumber = ? ' +
            ' ORDER BY lastName, FirstName';
        const employee = await db.query(sqlEmployee, [employeeNumber]);
        if (employee.length < 1) {
            throw new Error('Employee with this employeeNumber was not found');
        }
        return employee[0];
    },

    async getAll() {
        let sqlEmployees =
            'SELECT e.*, o.City AS officeCity FROM employees e ' +
            ' LEFT OUTER JOIN offices o ON o.officeCode = e.officeCode ' +
            ' ORDER BY lastName, FirstName';
        const employees = await db.query(sqlEmployees);
        return employees;
    }

}