interface createRoomGenerationJob {
	roomTypeId: number;
	price: number;
	startDate: string;
	endDate: string;
	batchSize: number;
}

interface batchProcessRooms {
	roomTypeId: number;
	hotelId: number;
	price: number;
	startDate: Date;
	endDate: Date;
}

interface roomGenerationJobResponseDto {
	totalRoomsCreated: number;
	totalDatesProccessed: number;
	success: boolean;
	errors: string[];
	jobId: string;
}

export {
	createRoomGenerationJob,
	batchProcessRooms,
	roomGenerationJobResponseDto,
};
