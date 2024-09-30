import { EntityDto } from "../entities/entity-dto";

export interface CurrencyDto extends EntityDto<number> {
    name?: string
}
