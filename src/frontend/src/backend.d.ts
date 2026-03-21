import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Booking {
    name: string;
    email: string;
    message: string;
    preferredDate: string;
    preferredTime: string;
    phone: string;
}
export interface Comment {
    name: string;
    message: string;
}
export interface backendInterface {
    getAllBookings(): Promise<Array<Booking>>;
    getAllComments(): Promise<Array<Comment>>;
    getVisitorCount(): Promise<bigint>;
    incrementVisitorCount(): Promise<bigint>;
    submitBooking(name: string, email: string, phone: string, preferredDate: string, preferredTime: string, message: string): Promise<void>;
    submitComment(name: string, message: string): Promise<void>;
}
