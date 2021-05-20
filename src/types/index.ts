export interface EventInterface {
    name: string;
    heroImg: HeroImg;
    date: string;
    address: string;
    city: string;
    state: string;
    time: string;
    eventDetails: string;
}

export interface HeroImg {
    name: string | null;
    size: number | null;
    src: string | null;
    file: File | null;
    error: string | null;
}
export interface UserDataInterface {
    email: string;
    email_verified: string;
    sub: string;
}

export interface EventActionInterface {
    type: string;
    payload?: any;
}
