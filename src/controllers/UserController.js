const { bcrypt, dotenv, jwt } = require("../helpers/packages");
dotenv.config();
const Error = require("../helpers/Error");
const Success = require("../helpers/Success");
const UserModel = require("../models/UserModel");
module.exports = {
	// Signup
	signup: async (req, res) => {
		const { email, name, phone, password, photo } = req.body;
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		const userData = { email, name, phone, password: hashedPassword, photo };
		await UserModel.create(userData)
			.then((userData) => {
				UserModel.findById(userData._id)
					.select("-password -__v")
					.then((user) => {
						new Success(res, 201, user);
					})
					.catch((error) => {
						new Error(res, 404, error);
					});
			})
			.catch((error) => {
				new Error(res, 406, error);
			});
	},
	// Login
	login: async (req, res) => {
		const { email, password } = req.body;
		let existUser = await UserModel.findOne({ email });
		if (existUser) {
			const matchPassword = await bcrypt.compare(password, existUser.password);
			if (matchPassword) {
				let token = jwt.sign({ existUser }, process.env.JWT_SECRET_KEY, {
					expiresIn: process.env.JWT_EXPIRY,
				});
				const { email, name, phone, photo } = existUser;
				let data = { user: { email, name, phone, photo }, token };
				new Success(res, 200, data);
			} else {
				new Error(res, 404, error);
			}
		}
	},
	// Update Profile
	update: async (req, res) => {
		let userEmail = await req.headers["email"];
		let updatedData = await req.body;
		await UserModel.updateOne({ email: userEmail }, updatedData)
			.then((data) => {
				new Success(res, 200, data);
			})
			.catch((err) => {
				new Error(res, 400, error);
			});
	},
};
