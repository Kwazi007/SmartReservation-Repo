import { FullAuditedEntityDto } from "../entities/full-audited-entity-dto"
import { Country } from "../enums/country"
import { PaymentDto } from "./payment-dto"
import { ReservationProductDto } from "./reservation-product-dto"

export interface ReservationDto extends FullAuditedEntityDto<number>  {
    firstName?: string
    lastName?: string
    phone?: string
    email?: string
    idNo?: string
    address?: string
    country?: Country
    totalAmount?: number
    adultPax?: number
    childPax?: number
    checkInDate?: string
    checkOutDate?: string
    reservationProducts?: ReservationProductDto[]
    payments?: PaymentDto[]
}
