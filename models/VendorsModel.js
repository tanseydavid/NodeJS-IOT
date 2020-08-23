const db = require('../connection');

module.exports = {

    // async getByOfficeCode(officeCode) {
    //     let sqlOffice = 'SELECT * FROM offices WHERE officeCode = ?';
    //     let sqlEmployees = 'SELECT * FROM employees WHERE officeCode = ? ORDER BY lastName, firstName';
    //     const office = await db.query(sqlOffice, officeCode);
    //     if (office.length < 1) {
    //         throw new Error('Office with this officeCode was not found');
    //     }
    //     const officeEmployees = await db.query( sqlEmployees, officeCode );
    //     office[0].employees = officeEmployees;
    //     return office[0];
    // },

    async getAll() {
        let sqlVendors = 'SELECT DISTINCT productVendor FROM products ORDER BY 1';
        const vendors = await db.query(sqlVendors);
        return vendors;
    }

}