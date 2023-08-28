

export interface DayValue {
    day: number
    month: number 
    year: number 
}

export enum SlotTimeValue {
    SLOT_1 = 1,
    SLOT_2 = 2,
    SLOT_3 = 3,
    SLOT_4 = 4,
    SLOT_5 = 5,
    SLOT_6 = 6,
    SLOT_7 = 7,
    SLOT_8 = 8,
    SLOT_9 = 9,
    SLOT_10 = 10,
    SLOT_11 = 11,
    SLOT_12 = 12,
}

export interface Slot {
    Id: string
    Value: string
    Label: string
}