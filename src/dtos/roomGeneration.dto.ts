interface roomGenerationJobDto {
	roomTypeId: number;
	price: number;
	startDate: string;
	endDate: string;
	batchNumber: number;
}

interface roomGenerationJobResponseDto {
	totalRoomsCreated: number;
	totalDatesProccessed: number;
	success: boolean;
	erros: string[];
	jobId: string;
}
