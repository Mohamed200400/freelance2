const mongoose = require("mongoose")
const questionSchema = new mongoose.Schema({
    question : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    type : {
        type : Boolean,
        required : true,
    }

})
module.exports = mongoose.model("Question",questionSchema);