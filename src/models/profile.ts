export interface ProfileModel {
    id: string;
    firstName: string;
    lastName: string;
    dob: string;
    nationalId: string;
    phoneNumber: string | null;
    createdAt: string;
    updatedAt: string;
    user: any| null;
    key: string;
}
