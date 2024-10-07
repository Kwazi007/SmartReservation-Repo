import { EntityDto } from "../entities/entity-dto";

export interface EmployeeDto extends EntityDto<number> {
    firstName?: string
    lastName?: string
    Role?: string
    dateJoined?: string
    dateOfBirth?: string
}
