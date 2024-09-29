import { EntityDto } from "../entities/entity-dto";

export interface CurrencyDto<T> extends EntityDto<T> {
    name?: string
}
