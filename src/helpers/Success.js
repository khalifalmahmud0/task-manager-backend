const { knowYourHttpWell } = require("./packages"),
	phraseWell = knowYourHttpWell.statusCodesToPhrases;
class Success {
	constructor(res, statuscode, data) {
		this.errorHandler(res, statuscode, data);
	}
	errorHandler = (res, statuscode, data) => {
		res.status(statuscode).json({
			status: {
				code: statuscode,
				phrase: phraseWell[statuscode],
			},
			result: { success: data },
		});
	};
}
module.exports = Success;
