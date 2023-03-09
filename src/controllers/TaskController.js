const Error = require("../helpers/Error");
const Success = require("../helpers/Success");
const TaskModel = require("../models/TaskModel");

module.exports = {
	create: async (req, res) => {
		let userEmail = await req.headers.email;
		let { title, description, status } = await req.body;
		let task = { email: userEmail, title, description, status };
		await TaskModel.create(task)
			.then((task) => {
				new Success(res, 201, task);
			})
			.catch((error) => {
				new Error(res, 406, error);
			});
	},
	statusUpdate: async (req, res) => {
		let id = await req.params.id;
		let status = await req.params.status;
		await TaskModel.updateOne({ _id: id }, { status: status })
			.then((data) => {
				new Success(res, 200, data);
			})
			.catch(() => {
				new Error(res, 400, error);
			});
	},
	remove: async (req, res) => {
		let id = await req.params.id;
		await TaskModel.deleteOne({ _id: id })
			.then((data) => {
				new Success(res, 200, data);
			})
			.catch((error) => {
				new Error(res, 404, error);
			});
	},
	tasksBasedOnStatus: async (req, res) => {
		let email = await req.headers.email;
		let status = await req.params.status;
		await TaskModel.aggregate([
			{ $match: { email: email, status: status } },
			{
				$project: {
					_id: 1,
					title: 1,
					description: 1,
					status: 1,
					createdAt: {
						$dateToString: {
							date: "$createdAt",
							format: "%d/%m/%Y %H:%M:%S",
							timezone: "+06",
						},
					},
					updatedAt: {
						$dateToString: {
							date: "$updatedAt",
							format: "%d/%m/%Y %H:%M:%S",
							timezone: "+06",
						},
					},
				},
			},
		])
			.then((data) => {
				new Success(res, 200, data);
			})
			.catch((error) => {
				new Error(res, 404, error);
			});
	},
	tasksSummary: async (req, res) => {
		let email = await req.headers.email;
		await TaskModel.aggregate([
			{ $match: { email: email } },
			{ $group: { _id: "$status", total: { $count: {} } } },
		])
			.then((data) => {
				new Success(res, 200, data);
			})
			.catch((error) => {
				new Error(res, 404, error);
			});
	},
};
