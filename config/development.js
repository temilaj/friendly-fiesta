module.exports = {
	env: 'development',
	db: process.env.DATABASEURI,
	port: process.env.PORT || 4000,
	loglevel: process.env.LOGLEVEL,
};