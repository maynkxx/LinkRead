const multer = require("multer");

const MAX_FILE_SIZE_MB = Number(process.env.MAX_UPLOAD_SIZE_MB || 5);
const MAX_FILES = Number(process.env.MAX_UPLOAD_FILES || 4);

const allowedMimeTypes = new Set([
	"image/jpeg",
	"image/png",
	"image/gif",
	"image/webp",
	"video/mp4",
	"video/webm",
	"video/quicktime",
]);

const storage = multer.memoryStorage();

const fileFilter = (_req, file, cb) => {
	if (allowedMimeTypes.has(file.mimetype)) {
		return cb(null, true);
	}

	const error = new multer.MulterError("LIMIT_UNEXPECTED_FILE", file.fieldname);
	error.message = `Unsupported file type: ${file.mimetype}`;
	return cb(error);
};

const upload = multer({
	storage,
	limits: {
		fileSize: MAX_FILE_SIZE_MB * 1024 * 1024,
		files: MAX_FILES,
	},
	fileFilter,
});

const uploadSingle = (field = "media") => upload.single(field);
const uploadMultiple = (field = "media", max = MAX_FILES) => upload.array(field, max);
const uploadFields = (fields) => upload.fields(fields);

module.exports = upload;
