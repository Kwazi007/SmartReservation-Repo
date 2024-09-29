import { EntityDto } from "../entities/entity-dto";
import { RoomType } from "../enums/room-type";

export interface RoomDto<T> extends EntityDto<T> {
    roomType?: RoomType
    rate?: number
    pax?: number
}
