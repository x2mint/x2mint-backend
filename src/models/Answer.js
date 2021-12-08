const mongoose = require("mongoose");
const { formatTimeUTC } = require("../utils/Timezone");

const answerSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    default: 0,
  },
  content: {
    type: String,
    require: true,
    default: null,
  },
  _status: {
    type: String,
    default: "",
  },
  questionId: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: formatTimeUTC,
  },

  updatedAt: {
    type: Date,
    default: formatTimeUTC,
  },
});

answerSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  const { _id: id, ...result } = object;
  return { ...result, id };
});

module.exports = mongoose.model("answers", answerSchema);
