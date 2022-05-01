const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var librarySchema = mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  transcriptId: { type: Schema.Types.ObjectId, ref: "Transcript" },
});

const Library = mongoose.model("Library", librarySchema);
module.exports = Library;
