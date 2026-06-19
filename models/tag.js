const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, unique: true },
    deletedAt: { type: Date, default: null },
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

tagSchema.pre("find", function () {
  this.where({ deletedAt: null });
});
tagSchema.pre("findOne", function () {
  this.where({ deletedAt: null });
});

module.exports = mongoose.model("Tag", tagSchema);
