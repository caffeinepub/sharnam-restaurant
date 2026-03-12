import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ReservationDetails {
    specialRequests?: string;
    submittedAt: Time;
    preferredTime: string;
    personalInfo: PersonalInfo;
    numberOfGuests: bigint;
}
export interface PersonalInfo {
    guestName: string;
    email: string;
    phoneNumber: string;
}
export type ReservationId = string;
export type Time = bigint;
export interface backendInterface {
    getAllReservations(): Promise<Array<[ReservationId, ReservationDetails]>>;
    getReservation(id: ReservationId): Promise<ReservationDetails>;
    submitReservation(guestName: string, phoneNumber: string, email: string, numberOfGuests: bigint, preferredTime: string, specialRequests: string | null): Promise<ReservationId>;
}
