export const formatDate = (date: Date) => {
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const fDate = String(date.getDate()).padStart(2, '0');
	return `${date.getFullYear()}-${month}-${fDate}`;
};
