/* eslint-disable no-console */
require('dotenv').config()
const { log } = require("./functions")
const ExtendedClient = require('./class/ExtendedClient')
const { Database } = require("quickmongo")

// top-level awaits
const client = new ExtendedClient()
client.emoji = require('./utils/emojis.json')
client.db = new Database(process.env.MONGODB_URI)

client.db.on("ready", () => {
	log("Connected to the database", "done")
})

client.start().then(async () => {
	await client.db.connect()
})

// Handles errors and avoids crashes, better to not remove them.
process.on('unhandledRejection', console.error)
process.on('uncaughtException', console.error)