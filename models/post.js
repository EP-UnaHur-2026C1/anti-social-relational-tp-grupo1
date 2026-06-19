const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    fecha: { type: Date, default: Date.now },
    texto: { type: String, required: true },
    usuario: {
      type: mongoose.Types.ObjectId,
      ref: "Usuario",
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

module.exports = mongoose.model("Post", postSchema);
