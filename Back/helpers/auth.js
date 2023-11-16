import bcrypt from "bcrypt";

async function hashPassword(plaintextPassword) {
	const hash = await bcrypt.hash(plaintextPassword, 10);
	// Store hash in the database
	return hash;
}

// compare password
async function comparePassword(plaintextPassword, hash) {
	const result = await bcrypt.compare(plaintextPassword, hash);
	return result;
}

export { hashPassword, comparePassword };
