let mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.Schema.Types.ObjectId;
    
let ProjectSchema = new Schema({
    name: { type: String, default: "Untitled", maxlength: 25 },
    description: { type: String, default: "No description provided" },
    content: { type: String, default: "" },
    owner: { type: ObjectId, required: true, ref: "User"},
    public: { type: Boolean, default: false },
    readAccess: [{ type: ObjectId,  ref: "User"} ],
    writeAccess: [ { type: ObjectId,  ref: "User"} ],
}, { timestamps: true });

ProjectSchema.statics.listByUser = function(userId, done) {
    this.find({ owner: userId },
        function(err, projects) {
            done(err ? [] : projects);
        }
    );
};

ProjectSchema.statics.createWithId = function(userId, data, done) {
    data.owner = userId;
    let project = new this(data);
    this.create(project, function(err, proj) {
        done(err, proj);
    }); 
};

ProjectSchema.statics.read = function(userId, projectId, done) {
    this.findOne({
        _id: projectId,
        $or: [ { owner: userId }, { readAccess: userId }, { public: true } ]
    }, (err, proj) => done(err, proj));
};

ProjectSchema.statics.update = function(userId, projectId, data, done) {
    this.findOneAndUpdate({
        _id: projectId,
        $or: [ { owner: userId }, { writeAccess: userId } ]
    }, data, { new: true }, (err, proj) => done(err, proj));
};

ProjectSchema.statics.delete = function(userId, projectId, done) {
    this.remove({ 
        _id: projectId, 
        owner: userId
    }, (err) => done(err));
};

ProjectSchema.methods.hasWriteAccess = function(userId) {
    return this.owner.toString() == userId.toString() || this.writeAccess.includes(userId.toString());
};

ProjectSchema.methods.hasReadAccess = function(userId) {
    return ProjectSchema.hasWriteAccess(userId) || this.readAccess.includes(userId.toString()) || this.public;
};

mongoose.model('Project', ProjectSchema);
