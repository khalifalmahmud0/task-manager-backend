const { mongoose } = require("../helpers/packages");
const schema = mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			required: true,
			default: "new",
		},
		email: {
			type: String,
		},
	},
	{ timestamps: true, versionKey: false }
);
module.exports = mongoose.model("Task", schema);
