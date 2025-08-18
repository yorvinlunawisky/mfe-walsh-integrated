// loggedUserDetails.model.ts

export interface UserPrefix {
    Id: number;
    Prefix: string;
}

export interface LoggedUserDetails {
    Id: number;
    UserId: string;
    Email: string;
    FirstName: string;
    LastName: string;
    DisplayName: string;
    Prefix: UserPrefix[];
    Status: string;
    LockoutEnabled: boolean;
    PasswordExpired: boolean;
    CreatedBy: string;
    CreateTimestamp: string; // or Date if you prefer to parse it
    ModifiedBy: string;
    ModifiedTimestamp: string; // or Date if you prefer to parse it
    DataStateFlag: string;
    UserPrefix: string;
}
