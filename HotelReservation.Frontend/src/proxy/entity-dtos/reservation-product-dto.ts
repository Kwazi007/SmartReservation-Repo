import { AuditedEntityDto } from "../entities/audited-entity-dto"
import { EntityDto } from "../entities/entity-dto"

export interface ReservationProductDto extends EntityDto<number> {
    reservationId?: number
    RoomNo?: number
    unitPrice?: number
    adultPax?: number
    childPax?: number
    totalAmount?: number
}
