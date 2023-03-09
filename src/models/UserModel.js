const { mongoose } = require("../helpers/packages");
const schema = mongoose.Schema(
	{
		email: {
			type: String,
			unique: true,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		photo: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true, versionKey: false }
);
module.exports = mongoose.model("User", schema);
