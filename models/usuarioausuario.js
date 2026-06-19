const mongoose = require("mongoose");

const usuarioAUsuarioSchema = new mongoose.Schema(
  {
    seguidor: {
      type: mongoose.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    seguido: {
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

usuarioAUsuarioSchema.index({ seguidor: 1, seguido: 1 }, { unique: true });

module.exports = mongoose.model("UsuarioAUsuario", usuarioAUsuarioSchema);
