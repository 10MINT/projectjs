let mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
let UserSchema = new Schema({
    displayName: String,
    emails: [ { value: { type: String } } ],
    username: String,
    photos: [ { value: { type: String } } ],
    provider: String,
    id: String
}, { timestamps: true });

UserSchema.methods.isAdmin = function() {
    return admins.includes(this._id.toString());
};

var admins =  [
    
];

mongoose.model('User', UserSchema);
