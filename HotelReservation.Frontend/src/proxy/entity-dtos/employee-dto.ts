import { EntityDto } from "../entities/entity-dto";

export interface EmployeeDto extends EntityDto<number> {
    name?: string
    surname?: string
    username?: string
    password?: string
}
