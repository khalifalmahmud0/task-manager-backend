const { knowYourHttpWell } = require("./packages"),
	phraseWell = knowYourHttpWell.statusCodesToPhrases;
class Error {
	constructor(res, statuscode, err) {
		this.errorHandler(res, statuscode, err);
	}
	errorHandler = (res, statuscode, err) => {
		res.status(statuscode).json({
			status: {
				code: statuscode,
				phrase: phraseWell[statuscode],
			},
			result: { error: err },
		});
	};
}
module.exports = Error;
