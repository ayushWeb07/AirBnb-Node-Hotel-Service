interface createHotel {
	name: string;
	address: string;
}

interface updateHotel {
	name?: string;
	address?: string;
}

export { createHotel, updateHotel };
