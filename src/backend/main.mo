import List "mo:core/List";
import Text "mo:core/Text";

actor {
  // -----------------------------------------------------------------------
  // Types
  // -----------------------------------------------------------------------
  type BookingLegacy = {
    name : Text;
    email : Text;
    phone : Text;
    preferredDate : Text;
    preferredTime : Text;
    message : Text;
  };

  type Booking = {
    id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    preferredDate : Text;
    preferredTime : Text;
    message : Text;
    status : Text;
    locked : Bool;
  };

  type Comment = {
    name : Text;
    message : Text;
  };

  // -----------------------------------------------------------------------
  // State — all variables are implicitly stable via enhanced orthogonal
  // persistence (--default-persistent-actors). Original variable names kept
  // for upgrade compatibility.
  // -----------------------------------------------------------------------
  let bookingList   = List.empty<BookingLegacy>(); // v1 legacy, kept for compat
  let bookingListV2 = List.empty<Booking>();       // active list
  let commentList   = List.empty<Comment>();
  var visitorCount  : Nat  = 0;
  var nextBookingId : Nat  = 0;
  var migrationDone : Bool = false;

  // -----------------------------------------------------------------------
  // One-time migration: lift v1 bookings into v2 on first upgrade
  // -----------------------------------------------------------------------
  system func postupgrade() {
    if (not migrationDone) {
      for (b in bookingList.toArray().vals()) {
        let id = nextBookingId;
        nextBookingId += 1;
        bookingListV2.add({
          id;
          name          = b.name;
          email         = b.email;
          phone         = b.phone;
          preferredDate = b.preferredDate;
          preferredTime = b.preferredTime;
          message       = b.message;
          status        = "pending";
          locked        = false;
        });
      };
      migrationDone := true;
    };
  };

  // -----------------------------------------------------------------------
  // Public API
  // -----------------------------------------------------------------------

  public shared func incrementVisitorCount() : async Nat {
    visitorCount += 1;
    visitorCount;
  };

  public query func getVisitorCount() : async Nat { visitorCount };

  public shared func submitComment(name : Text, message : Text) : async () {
    commentList.add({ name; message });
  };

  public query func getAllComments() : async [Comment] {
    commentList.toArray();
  };

  public shared func submitBooking(
    name : Text,
    email : Text,
    phone : Text,
    preferredDate : Text,
    preferredTime : Text,
    message : Text,
  ) : async Nat {
    let id = nextBookingId;
    nextBookingId += 1;
    bookingListV2.add({
      id; name; email; phone; preferredDate; preferredTime; message;
      status = "pending"; locked = false;
    });
    id;
  };

  public query func getAllBookings() : async [Booking] {
    bookingListV2.toArray();
  };

  // Update booking status — no-op if booking is locked
  public shared func updateBookingStatus(id : Nat, newStatus : Text) : async Bool {
    var found = false;
    let arr = bookingListV2.toArray();
    bookingListV2.clear();
    for (b in arr.vals()) {
      if (b.id == id) {
        if (not b.locked) {
          bookingListV2.add({ b with status = newStatus });
          found := true;
        } else {
          bookingListV2.add(b);
        };
      } else {
        bookingListV2.add(b);
      };
    };
    found;
  };

  // Update booking lock state
  public shared func updateBookingLock(id : Nat, newLocked : Bool) : async Bool {
    var found = false;
    let arr = bookingListV2.toArray();
    bookingListV2.clear();
    for (b in arr.vals()) {
      if (b.id == id) {
        bookingListV2.add({ b with locked = newLocked });
        found := true;
      } else {
        bookingListV2.add(b);
      };
    };
    found;
  };
};
