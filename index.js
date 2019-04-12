const mongoose = require("mongoose")
const Recipe = require("./models/Recipe") // Import of the model Recipe from './models/Recipe'
const data = require("./data.js") // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
	.connect("mongodb://localhost/recipeApp", { useNewUrlParser: true })
	.then(() => {
		console.log("Connected to Mongo!")
	})
	.catch(err => {
		console.error("Error connecting to mongo", err)
	})
mongoose.connection.on("connected", () => {
	console.log("connected")
})
mongoose.connection.on("error", () => {
	console.error("error")
})
mongoose.connection.on("disconnected", () => {
	console.log("disconnected")
})
process.on("SIGINT", () => {
	mongoose.connection.close(() => {
		console.log("Mongoose default connection disconnected through app termination")
		process.exit(0)
	})
})
console.log(data)
const insertRecipe = () =>
	Recipe.insertMany(data).then(docs => {
		docs.forEach(el => {
			console.log(el.title)
		})
	})

const updateRigatoni = () =>
	Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }, { new: true })

const deleteCarrot = () =>
	Recipe.deleteOne({ title: "Carrot Cake" })


insertRecipe()
	.then(updateRigatoni)
	.then(deleteCarrot)
	.then(() => {
		console.log("disconnected")
		mongoose.disconnect
	})
	.catch(err => {
		console.error(err)
	})