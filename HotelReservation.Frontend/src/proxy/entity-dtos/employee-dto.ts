import { EntityDto } from "../entities/entity-dto";

export interface EmployeeDto<T> extends EntityDto<T> {
    name?: string
    surname?: string
    username?: string
    password?: string
}
