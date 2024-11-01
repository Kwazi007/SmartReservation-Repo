import { AuditedEntityDto } from "../entities/audited-entity-dto"
import { EntityDto } from "../entities/entity-dto"
import { RoomType } from "../enums/room-type"
import { ReservationDto } from "./reservation-dto"
import { RoomDto } from "./room-dto"

export interface ReservationProductDto extends EntityDto<number> {
    reservationId?: number
    roomType?: RoomType
    roomId?: number
    unitPrice?: number
    adultPax?: number
    childPax?: number
    totalAmount?: number
    room?: RoomDto
    reservation?: ReservationDto
}
