/* eslint-disable */

// @ts-nocheck

import type { ActorMethod } from '@icp-sdk/core/agent';
import type { IDL } from '@icp-sdk/core/candid';
import type { Principal } from '@icp-sdk/core/principal';

export interface Booking {
  'id' : bigint,
  'name' : string,
  'email' : string,
  'message' : string,
  'preferredDate' : string,
  'preferredTime' : string,
  'phone' : string,
  'status' : string,
  'locked' : boolean,
}
export interface Comment { 'name' : string, 'message' : string }
export interface _SERVICE {
  'getAllBookings' : ActorMethod<[], Array<Booking>>,
  'getAllComments' : ActorMethod<[], Array<Comment>>,
  'getVisitorCount' : ActorMethod<[], bigint>,
  'incrementVisitorCount' : ActorMethod<[], bigint>,
  'submitBooking' : ActorMethod<
    [string, string, string, string, string, string],
    bigint
  >,
  'submitComment' : ActorMethod<[string, string], undefined>,
  'updateBookingStatus' : ActorMethod<[bigint, string], boolean>,
  'updateBookingLock' : ActorMethod<[bigint, boolean], boolean>,
}
export declare const idlService: IDL.ServiceClass;
export declare const idlInitArgs: IDL.Type[];
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
