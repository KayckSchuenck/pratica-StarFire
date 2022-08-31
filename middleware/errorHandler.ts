export default function errorHandlingMiddleware(error, req, res, next) {
	if (error.type === "IncorrectData") return res.status(422).send(error.message)

	return res.sendStatus(500);
}