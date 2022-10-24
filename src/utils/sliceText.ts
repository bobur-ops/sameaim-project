export const sliceText = (value: string | any[], sliceNumber: number) => {
	let result = value;
	if (value.length > sliceNumber) {
		result = `${value.slice(0, sliceNumber)}...`;
	}
	return result;
};
