const mongoose = require("mongoose");

var transcriptSchema = mongoose.Schema({
  // title: { type: String, default: null },
  thubnall: { type: String, default: null },
  url: { type: String, default: null },
  fullTranscript: { type: String, default: null },
  summarizedTranscript: { type: String, default: null },
});

transcriptSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const Transcript = mongoose.model("Transcript", transcriptSchema);
module.exports = Transcript;
