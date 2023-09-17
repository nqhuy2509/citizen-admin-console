enum StatusUser{
    pending,
    verified,
    suspended,
}

interface User{
    id: number,
    email: string,
    status: StatusUser,

}