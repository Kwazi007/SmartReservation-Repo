import { FullAuditedEntityDto } from "../entities/full-audited-entity-dto";

export interface PaymentDto extends FullAuditedEntityDto<number> {
    reservationId?: number
    paymentMethod?: string
    currencyId?: number
    amount?: number
    cardNo?: string
    bank?: string
}
