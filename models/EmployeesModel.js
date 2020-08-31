const db = require('../connection');
const tools = require('../tools');

module.exports = {

    async getByEmployeeNumber(employeeNumber) {
        let sqlEmployee =
            'SELECT e.*, rt.lastName AS reportsToLastName, rt.firstName AS reportsToFirstName, rt.jobTitle AS reportsToJobTitle, o.City AS officeCity FROM employees e ' +
            ' LEFT OUTER JOIN offices o ON o.officeCode = e.officeCode ' +
            ' LEFT OUTER JOIN employees rt ON rt.employeeNumber = e.reportsTo ' +
            ' WHERE e.employeeNumber = ? ' +
            ' ORDER BY lastName, FirstName';
        let sqlEmployeeDirectReports =
            'SELECT * FROM employees e ' +
            ' WHERE e.reportsTo = ? ' +
            ' ORDER BY lastName, FirstName';
        let employee = await db.query(sqlEmployee, [employeeNumber]);
        if (employee.length < 1) {
            throw new Error('Employee with this employeeNumber was not found');
        }
        const employeeDirectReports = await db.query(sqlEmployeeDirectReports, [employeeNumber]);
        employee[0].directReports = employeeDirectReports;
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