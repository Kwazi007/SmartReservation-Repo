import { FullAuditedEntityDto } from "../entities/full-audited-entity-dto"
import { Country } from "../enums/country"
import { ReservationProductDto } from "./reservation-product-dto"

export interface ReservationDto extends FullAuditedEntityDto<number>  {
    name?: string
    surname?: string
    phone?: string
    email?: string
    idNo?: string
    address?: string
    country?: Country
    totalAmount?: Date
    adultPax?: number
    childPax?: number
    checkInDate?: Date
    checkOutDate?: Date
    reservationProduct?: ReservationProductDto[]
}
