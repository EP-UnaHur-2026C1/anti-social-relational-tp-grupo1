const mongoose = require("mongoose");

const postTagSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    tag: {
      type: mongoose.Types.ObjectId,
      ref: "Tag",
      required: true,
    },
  },
  { timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            ret.id = ret._id.toString();
            delete ret._id;
            delete ret._v;
            delete ret.__v;
            return ret
        }
    }
  }
);

postTagSchema.index({ post: 1, tag: 1 }, { unique: true });

module.exports = mongoose.model("PostTag", postTagSchema);
