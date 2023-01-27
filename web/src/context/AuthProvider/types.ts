export interface User {
    login?: string;
    token?: string;
}

export interface Context extends User {
    authenticate: (login: string, pass:string) => Promise<void>;
    logout: () => void;
}

export interface IAuthProvider {
    children: JSX.Element;
}