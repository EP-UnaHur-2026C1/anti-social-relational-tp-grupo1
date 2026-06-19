const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema(
  {
    nickName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
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

usuarioSchema.pre("find", function () {
  this.where({ deletedAt: null });
});
usuarioSchema.pre("findOne", function () {
  this.where({ deletedAt: null });
});
usuarioSchema.pre("countDocuments", function () {
  this.where({ deletedAt: null });
});

module.exports = mongoose.model("Usuario", usuarioSchema);
