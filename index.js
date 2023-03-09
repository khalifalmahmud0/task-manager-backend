const { mongoose } = require("./src/helpers/packages"),
	app = require("./app");

mongoose.set("strictQuery", false);
let port = process.env.PORT || 8080;
(async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("DB Connection Success!!");
		app.listen(port, () => console.log(`Server running on port ${port}`));
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
})();
