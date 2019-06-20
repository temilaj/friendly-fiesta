module.exports = {
	env: 'development',
	db: process.env.DATABASEURI,
	port: process.env.PORT || 4000,
	loglevel: process.env.LOGLEVEL,
	database: {
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		databaseName: process.env.DB_NAME,
		host: "127.0.0.1",
		dialect: "mysql"
	},
};