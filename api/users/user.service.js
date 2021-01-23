const pool = require('../../db_config/database');

module.exports = {
    create: (data, callback) =>{
        pool.query(
            `insert into personal_info (first_name, last_name, email, gender, password, phone_number) 
                values (?,?,?,?,?,?)`,
            [
                data.first_name,
                data.last_name,
                data.email,
                data.gender,
                data.password,
                data.phone_number
            ],
            (error, results, fields) =>{
                if(error){
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getUsers: callBack => {
        pool.query(
          `select * from personal_info`,
          [],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results);
          }
        );
      },
};