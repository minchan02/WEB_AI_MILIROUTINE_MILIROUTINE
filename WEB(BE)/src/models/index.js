const db = require('../db/config');

const sql = {
  select: (table, item) => {
    return 'SELECT * FROM ' + table + ' WHERE ' + item + ' =?';
  },

  insert: (table, inputs) => {
    return 'INSERT INTO ' + table + ' ' + inputs + ' VALUES ?';
  },
};

const user = {
  get: async (item, val) => {
    return new Promise(function (resolve, reject) {
      db.query('SELECT * FROM user WHERE ' + item + ' = ?', val, function (err, rows, fields) {
        if (err) {
          throw new Error(err);
        }
        resolve(rows);
      });
    });
  },

  add: async (values) => {
    db.query('INSERT INTO user (id,pw,email,nickname,salt) VALUES (?)', [values], function (err, rows, fields) {
      if (err) {
        throw new Error(err);
      }
    });
  },

  update: async (field, value, id) => {
    db.query('UPDATE user SET ' + field + ' = ? WHERE id = ?', [value, id], function (err, rows, fields) {
      if (err) {
        throw new Error(err);
      }
    });
  },
};

const user_category = {
  get: async (item, val) => {
    return new Promise(function (resolve, reject) {
      db.query('SELECT * FROM user_category WHERE ' + item + ' = ?', val, function (err, rows, fields) {
        if (err) {
          throw new Error(err);
        }
        resolve(rows);
      });
    });
  },

  add: async (values) => {
    db.query('INSERT INTO user_category (user_no, category) VALUES (?)', [values], function (err, rows, fields) {
      if (err) {
        throw new Error(err);
      }
    });
  },

  delete: async (item, val) => {
    db.query('DELETE FROM user_category WHERE ' + item + ' = ' + val + '', function (err, result) {
      if (err) {
        throw new Error(err);
      }
    });
  },
};

const level_exp = {
  get: async (item, val) => {
    return new Promise(function (resolve, reject) {
      db.query('SELECT * FROM level_exp WHERE ' + item + ' = ?', val, function (err, rows, fields) {
        if (err) {
          throw new Error(err);
        }
        resolve(rows);
      });
    });
  },
};

const routine = {
  get: async (item, val) => {
    return new Promise(function (resolve, reject) {
      db.query('SELECT * FROM routine WHERE ' + item + ' = ?', val, function (err, rows, fields) {
        if (err) {
          throw new Error(err);
        }
        resolve(rows);
      });
    });
  },

  getWithItems: async (val1, val2) => {
    return new Promise(function (resolve, reject) {
      db.query('SELECT * FROM routine WHERE host = ? AND name = ?', [val1, val2], function (err, rows, fields) {
        if (err) {
          throw err;
        }
        resolve(rows);
      });
    });
  },

  add: async (values) => {
    db.query(
      'INSERT INTO routine (host,name,category,thumbnail_img,auth_cycle,auth_description_list,start_date,duration) VALUES (?)',
      [values],
      function (err, rows, fields) {
        if (err) {
          throw new Error(err);
        }
      }
    );
  },

  getRandom: async (routineNum) => {
    return new Promise(function (resolve, reject) {
      db.query('SELECT * FROM routine ORDER BY RAND() LIMIT ' + routineNum + '', function (err, rows, fields) {
        if (err) {
          throw new Error(err);
        }
        resolve(rows);
      });
    });
  },
};

const user_routine = {
  get: async (item, val) => {
    return new Promise(function (resolve, reject) {
      db.query('SELECT * FROM user_routine WHERE ' + item + ' = ?', val, function (err, rows, fields) {
        if (err) {
          throw new Error(err);
        }
        resolve(rows);
      });
    });
  },

  getParticipantsById: async (id) => {
    return new Promise(function (resolve, reject) {
      db.query("SELECT COUNT(*) AS count FROM user_routine WHERE routine_id = ? AND type = 'join'", id, function (err, rows, fields) {
        if (err) {
          throw new Error(err);
        }
        resolve(rows);
      });
    });
  },

  getMyRoutine: async (id, host) => {
    return new Promise(function (resolve, reject) {
      db.query(
        "SELECT * FROM user_routine WHERE routine_id = ? AND user_no = ? AND type = 'join'",
        [id, host],
        function (err, rows, fields) {
          if (err) {
            throw new Error(err);
          }
          resolve(rows);
        }
      );
    });
  },

  getAll: async () => {
    return new Promise(function (resolve, reject) {
      db.query('SELECT * FROM user_routine', function (err, rows, fields) {
        if (err) {
          throw new Error(err);
        }
        resolve(rows);
      });
    });
  },

  add: async (values) => {
    db.query('INSERT INTO user_routine (user_no, routine_id, type) VALUES (?)', [values], function (err, rows, fields) {
      if (err) {
        throw new Error(err);
      }
    });
  },
};

const auth = {
  get: async (item, val) => {
    return new Promise(function (resolve, reject) {
      db.query('SELECT * FROM auth WHERE ' + item + ' = ?', val, function (err, rows, fields) {
        if (err) {
          throw new Error(err);
        }
        resolve(rows);
      });
    });
  },

  add: async (values) => {
    console.log(values);
    db.query('INSERT INTO auth (user_no, routine_id, week, day, date, text) VALUES (?)', [values], function (err, rows, fields) {
      if (err) {
        throw new Error(err);
      }
    });
  },

  getOrderByDate: async (item, val, limitNum) => {
    return new Promise(function (resolve, reject) {
      db.query('SELECT * FROM auth WHERE ' + item + ' = ? ORDER BY date LIMIT ' + limitNum + '', val, function (err, rows, fields) {
        if (err) {
          throw new Error(err);
        }
        resolve(rows);
      });
    });
  },
	
  getOrderByDateNoLimit: async (user_no, routine_id) => {
    return new Promise(function (resolve, reject) {
      db.query('SELECT * FROM auth WHERE user_no = ? AND routine_id = ? ORDER BY date DESC', [user_no, routine_id], function (err, rows, fields) {
        if (err) {
          throw new Error(err);
        }
        resolve(rows);
      });
    });
  },
	
  getTotalCount : async (userNo, routineId) => {
	  return new Promise(function (resolve, reject) {
		db.query('SELECT COUNT(*) AS count FROM auth WHERE user_no = ? AND routine_id = ?', [userNo, routineId], function (err, rows, fields) {
			if (err) {
			  throw new Error(err);
			}
			resolve(rows);
      	});
      }); 
  }
};

const goods = {
  get: async (item, val) => {
    return new Promise(function (resolve, reject) {
      db.query('SELECT * FROM goods WHERE ' + item + ' = ?', val, function (err, rows, fields) {
        if (err) {
          throw new Error(err);
        }
        resolve(rows);
      });
    });
  },

  getAll: async () => {
    return new Promise(function (resolve, reject) {
      db.query('SELECT * FROM goods', function (err, rows, fields) {
        if (err) {
          throw new Error(err);
        }
        resolve(rows);
      });
    });
  },

  add: async (values) => {
    db.query('INSERT INTO goods (name, description, thumbnail_img, price) VALUES (?)', [values], function (err, rows, fields) {
      if (err) {
        throw new Error(err);
      }
    });
  },
};

const user_goods = {
  get: async (item, val) => {
    return new Promise(function (resolve, reject) {
      db.query('SELECT * FROM user_goods WHERE ' + item + ' = ?', val, function (err, rows, fields) {
        if (err) {
          throw new Error(err);
        }
        resolve(rows);
      });
    });
  },

  add: async (values) => {
    db.query('INSERT INTO user_goods (user_no, goods_id, datetime) VALUES (?)', [values], function (err, rows, fields) {
      if (err) {
        throw new Error(err);
      }
    });
  },
};

module.exports = {
  user,
  user_category,
  level_exp,
  routine,
  user_routine,
  auth,
  goods,
  user_goods,
};
