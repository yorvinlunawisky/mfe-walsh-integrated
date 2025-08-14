export interface Roles {

    Id: number,
    Name: string,
    Description: string,
    Status: string,
    CreatedBy: number,
    CreateTimestamp: string,
    ModifiedBy: string,
    ModifiedTimestamp: string
}

export interface RolesByUser {
  Name: string;
  Description: string;
  Id: number;
  Status: string;
  CreatedBy: string;
  CreateTimestamp: string;
  ModifiedBy: string;
  DataStateFlag: string;
}

