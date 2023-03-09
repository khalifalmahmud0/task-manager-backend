const Error = require("../helpers/Error");
const { dotenv, jwt } = require("../helpers/packages");
dotenv.config();
module.exports = {
	verifyAuth: async (req, res, next) => {
		const token = await req.headers["token"];
		jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
			if (err) {
				new Error(res, 401, err);
			} else {
				req.headers.email = decoded.existUser.email;
				next();
			}
		});
	},
};
