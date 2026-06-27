interface createRoom {
	number: number;
	price: number;
	roomTypeId: number;
	bookingId: number | null;
	hotelId: number;
	availableOn: Date;
}

interface bulkCreateRooms {
	rooms: createRoom[];
}

interface updateRoom {
	number?: number;
	price?: number;
	roomTypeId?: number;
	bookingId?: number;
	hotelId?: number;
	availableOn?: Date;
}

interface getRoomsByRoomTypeIdAndAvailableDateRange {
	roomTypeId: number;
	startDate: Date;
	endDate: Date;
}

export {
	createRoom,
	bulkCreateRooms,
	updateRoom,
	getRoomsByRoomTypeIdAndAvailableDateRange,
};
