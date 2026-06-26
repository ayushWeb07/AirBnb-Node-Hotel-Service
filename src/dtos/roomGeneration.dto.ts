interface roomGenerationJob {
	roomTypeId: number;
	price: number;
	startDate: string;
	endDate: string;
	batchNumber: number;
}

interface roomGenerationJobResponse {
	totalRoomsCreated: number;
	totalDatesProccessed: number;
	success: boolean;
	erros: string[];
	jobId: string;
}
