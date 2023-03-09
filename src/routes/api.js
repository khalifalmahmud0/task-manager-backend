const { express } = require("../helpers/packages");
const { signup, login, update } = require("../controllers/UserController");
const { verifyAuth } = require("../middlewares/Middleware");
const {
	create,
	statusUpdate,
	remove,
	tasksBasedOnStatus,
	tasksSummary,
} = require("../controllers/TaskController");

const router = express.Router();

// User Routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/update-profile", verifyAuth, update);

// task Routes
router.post("/task-create", verifyAuth, create);
router.get("/task-status-update/:id/:status", verifyAuth, statusUpdate);
router.get("/task-remove/:id", verifyAuth, remove);
router.get("/tasks-based-on-status/:status", verifyAuth, tasksBasedOnStatus);
router.get("/tasks-summary", verifyAuth, tasksSummary);

module.exports = router;
