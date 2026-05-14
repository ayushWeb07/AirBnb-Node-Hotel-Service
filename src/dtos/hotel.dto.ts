interface create {
	name: string;
	address: string;
}

interface update {
	name?: string;
	address?: string;
}

export { create, update };
