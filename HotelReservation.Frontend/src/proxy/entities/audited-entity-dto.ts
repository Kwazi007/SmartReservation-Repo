import { EntityDto } from "./entity-dto";

export interface AuditedEntityDto<T> extends EntityDto<T> {
    creationTime?: string;
    creatorId?: number;
    lastModificationTime?: Date;
    lastModifierUserId?: number;
}
