
export interface Lang {
    id: number
    title: string
    describe: string
}


export interface Level {
    id: number
    title: string
    describe: string
}

export interface Tech {
    id: number
    title: string
    describe: string
    lang: number
}

export interface Question {
    id: number
    title: string
    describe: string
    photo: string | null
    points: number
    lang: Lang,
    tech: Tech
    level: Level
}

export interface User {
    admin: boolean
    email: string
    id: number
    name: string
    phone: string
    verify: boolean
    verifyToken: string
}

export interface Comment {
    message: string
    date: Date
    question: number
}