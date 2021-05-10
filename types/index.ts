export interface EventInterface {
    name: string
    heroImg: {
        name?: string
        size?: number
        image?: string
        error?: {
            message: string
        }
    }
    date: string
    address: string
    city: string
    state: string
    time: string
    eventDetails: string
}

export interface UserDataInterface {
    email: string
    email_verified: string
    sub: string
} 

export interface EventActionInterface {
    type: string
    payload?: any
}
