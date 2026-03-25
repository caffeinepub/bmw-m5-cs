/* eslint-disable */

// @ts-nocheck

import { IDL } from '@icp-sdk/core/candid';

export const Booking = IDL.Record({
  'id' : IDL.Nat,
  'name' : IDL.Text,
  'email' : IDL.Text,
  'message' : IDL.Text,
  'preferredDate' : IDL.Text,
  'preferredTime' : IDL.Text,
  'phone' : IDL.Text,
  'status' : IDL.Text,
  'locked' : IDL.Bool,
});
export const Comment = IDL.Record({ 'name' : IDL.Text, 'message' : IDL.Text });

export const idlService = IDL.Service({
  'getAllBookings' : IDL.Func([], [IDL.Vec(Booking)], ['query']),
  'getAllComments' : IDL.Func([], [IDL.Vec(Comment)], ['query']),
  'getVisitorCount' : IDL.Func([], [IDL.Nat], ['query']),
  'incrementVisitorCount' : IDL.Func([], [IDL.Nat], []),
  'submitBooking' : IDL.Func(
      [IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text],
      [IDL.Nat],
      [],
    ),
  'submitComment' : IDL.Func([IDL.Text, IDL.Text], [], []),
  'updateBookingStatus' : IDL.Func([IDL.Nat, IDL.Text], [IDL.Bool], []),
  'updateBookingLock' : IDL.Func([IDL.Nat, IDL.Bool], [IDL.Bool], []),
});

export const idlInitArgs = [];

export const idlFactory = ({ IDL }) => {
  const Booking = IDL.Record({
    'id' : IDL.Nat,
    'name' : IDL.Text,
    'email' : IDL.Text,
    'message' : IDL.Text,
    'preferredDate' : IDL.Text,
    'preferredTime' : IDL.Text,
    'phone' : IDL.Text,
    'status' : IDL.Text,
    'locked' : IDL.Bool,
  });
  const Comment = IDL.Record({ 'name' : IDL.Text, 'message' : IDL.Text });
  
  return IDL.Service({
    'getAllBookings' : IDL.Func([], [IDL.Vec(Booking)], ['query']),
    'getAllComments' : IDL.Func([], [IDL.Vec(Comment)], ['query']),
    'getVisitorCount' : IDL.Func([], [IDL.Nat], ['query']),
    'incrementVisitorCount' : IDL.Func([], [IDL.Nat], []),
    'submitBooking' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text],
        [IDL.Nat],
        [],
      ),
    'submitComment' : IDL.Func([IDL.Text, IDL.Text], [], []),
    'updateBookingStatus' : IDL.Func([IDL.Nat, IDL.Text], [IDL.Bool], []),
    'updateBookingLock' : IDL.Func([IDL.Nat, IDL.Bool], [IDL.Bool], []),
  });
};

export const init = ({ IDL }) => { return []; };
