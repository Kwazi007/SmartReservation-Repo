import { AuditedEntityDto } from "../entities/audited-entity-dto"
import { EntityDto } from "../entities/entity-dto"
import { RoomType } from "../enums/room-type"

export interface ReservationProductDto extends EntityDto<number> {
    reservationId?: number
    roomType?: RoomType
    RoomNo?: number
    unitPrice?: number
    adultPax?: number
    childPax?: number
    totalAmount?: number
}
