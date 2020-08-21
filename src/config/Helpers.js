import { firebaseDatabase } from './Firebase';

export const saveData = (data, cb) => {
	console.log(`Saving data to the database`);
	firebaseDatabase
		.ref('distributors_affiliation')
		.push({ ...data })
		.then(() => cb())
		.catch((error) => console.log(error.message));
};
