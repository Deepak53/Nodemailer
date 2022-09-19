const mongoose = require('mongoose');
const schema = mongoose.Schema;
const user = new schema(
    {
        date : {type : String},
        task : {type : String},
        status : {type : Boolean , default : true}
    }
)

module.exports = mongoose.model("user",user);