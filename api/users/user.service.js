const pool = require('../../db_config/database');

module.exports = {
  create: (data, callBack) =>{
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
                return callBack(error);
            }
            return callBack(null, results);
        } 
    );
  },

  //Get All Users
  getUsers: callBack => {
    pool.query(
      `select first_name, last_name, gender, email, phone_number from personal_info`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  //Get User by ID
  getUserByUserId: (data, callBack) => {
    console.log(data.Id)
    pool.query(
      `select first_name, last_name, gender, email, phone_number from personal_info where 
      Id = ?`,
      [
        data.Id
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  //Update User info
  updateUserById: (data, callBack)=>{
    pool.query(
      `update personal_info set first_name = ?,
        last_name = ?,
        email = ?,
        gender = ?,
        phone_number = ?
        where Id = ?`,
      [
        data.first_name,
        data.last_name,
        data.email,
        data.gender,
        data.phone_number,
        data.Id
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    )
  },

  //Delete User info
  deleteUserById: (data, callBack)=>{
    pool.query(
      `delete from personal_info where Id = ?`,
      [data.Id],
      (error, results, fields)=>{
        if(error){
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    )
  }
};
