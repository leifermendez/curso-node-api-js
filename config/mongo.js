const mongoose = require("mongoose");

const NODE_ENV = process.env.NODE_ENV;

const dbConnect = async () => {
  const DB_URI = (NODE_ENV === 'test')? process.env.DB_URI_TEST : process.env.DB_URI;
  mongoose.connect(
    DB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err, res) => {
        if(!err){
            console.log('**** CONEXION CORRECTA ****')
        }else{
            console.log('**** ERROR DE CONEXION ****')
        }
    }
  );
};

module.exports = dbConnect;
