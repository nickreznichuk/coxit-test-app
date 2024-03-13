export interface Tab {
    label: string
    value: string
    disabled: boolean
    icon: any
}

export interface File {
    id: number,
    date: string,
    name: string,
    size: string,
    owner: string,
    status: string,
    ownerId: number,
    comments: number
}
