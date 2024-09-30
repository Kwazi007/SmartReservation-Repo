import { EntityDto } from "../entities/entity-dto";
import { RoomType } from "../enums/room-type";

export interface RoomDto extends EntityDto<number> {
    roomType?: RoomType
    rate?: number
    pax?: number
    isBooked?: boolean
}
