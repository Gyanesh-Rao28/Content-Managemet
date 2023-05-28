const mongoose = require("mongoose");
const schema = mongoose.Schema;

const contentSchema = new schema(
  {
    title: {
      type: String,
      required: true,
    },
    snippet: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Content = mongoose.model("Content", contentSchema);
module.exports = Content;
