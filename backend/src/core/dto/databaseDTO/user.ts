export interface IUserInterface {
    create< T extends IUserCreateDto >( data:T ):Promise<IUserOutputDto | null>

    delete_by_id< T extends  IUserIdDto >( userId:T ):Promise<IUserOutputDto | null>

    update< T extends  IUserUpdateDto >( userId: IUserIdDto, data:T ):Promise<IUserOutputDto | null>

    find_by_id< T extends  IUserIdDto >( userId:T ):Promise<IUserOutputDto | null>

    find_by_email?< T = string >( email:T ):Promise<IUserOutputDto | null>

    find_by_telefone?< T = string >( telefone:T ):Promise<IUserOutputDto | null>
}


export interface IUserCreateDto {
    nome: string
    telefone?: string
    email: string
    password: string
}

export interface IUserUpdateDto {
    nome?: string
    telefone?: string
    email?: string
    password?: string
}

export interface IUserOutputDto {
    id: number;
    nome: string;
    telefone: string | null;
    email: string ;
    password: string;
    created_at: Date;
    update_at: Date;
}


export type IUserIdDto = string | number