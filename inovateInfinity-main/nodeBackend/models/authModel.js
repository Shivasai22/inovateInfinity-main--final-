const mongooe = require('mongoose');
const authModelSchema =new mongooe.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
})

module.exports = mongooe.model('authUsers',authModelSchema);