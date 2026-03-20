import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Comment {
    name: string;
    message: string;
}
export interface backendInterface {
    getAllComments(): Promise<Array<Comment>>;
    getVisitorCount(): Promise<bigint>;
    incrementVisitorCount(): Promise<bigint>;
    submitComment(name: string, message: string): Promise<void>;
}
