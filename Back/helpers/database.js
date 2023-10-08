import mongoose from 'mongoose'

const dbConnection = async () => {
	try {
		await mongoose.connect(process.env.mongodburi);
		console.log("Conectado a la base de datos");
	} catch(error) {
		console.log("Error conectándose a la base de datos");
		throw new Error(error);
	}
}

export {
	dbConnection
}