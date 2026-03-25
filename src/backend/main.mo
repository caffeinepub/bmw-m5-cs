import List "mo:core/List";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Order "mo:core/Order";



actor {
  // --- Legacy type: matches the OLD Booking stored in stable memory ---
  // Field names and types must be identical to the original Booking to pass
  // the upgrade compatibility check.
  type BookingLegacy = {
    name : Text;
    email : Text;
    phone : Text;
    preferredDate : Text;
    preferredTime : Text;
    message : Text;
  };

  // --- New Booking type with persistence fields ---
  type Booking = {
    id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    preferredDate : Text;
    preferredTime : Text;
    message : Text;
    status : Text;   // "pending" | "confirmed" | "rejected"
    locked : Bool;
  };

  type Comment = {
    name : Text;
    message : Text;
  };

  // --- State ---
  // bookingList keeps the OLD type so the stable upgrade is compatible.
  // Legacy data is migrated to bookingListV2 on first postupgrade.
  let bookingList = List.empty<BookingLegacy>();
  let bookingListV2 = List.empty<Booking>();
  let commentList = List.empty<Comment>();
  var visitorCount = 0;
  stable var nextBookingId : Nat = 0;
  stable var migrationDone : Bool = false;

  // --- Migration on first upgrade ---
  system func postupgrade() {
    if (not migrationDone) {
      for (b in bookingList.toArray().vals()) {
        let id = nextBookingId;
        nextBookingId += 1;
        bookingListV2.add({
          id;
          name = b.name;
          email = b.email;
          phone = b.phone;
          preferredDate = b.preferredDate;
          preferredTime = b.preferredTime;
          message = b.message;
          status = "pending";
          locked = false;
        });
      };
      migrationDone := true;
    };
  };

  // --- Core Features ---

  public shared ({ caller }) func incrementVisitorCount() : async Nat {
    visitorCount += 1;
    visitorCount;
  };

  public query ({ caller }) func getVisitorCount() : async Nat {
    visitorCount;
  };

  public shared ({ caller }) func submitComment(name : Text, message : Text) : async () {
    commentList.add({ name; message });
  };

  public query ({ caller }) func getAllComments() : async [Comment] {
    commentList.toArray();
  };

  // Submit a booking — returns the new booking id
  public shared ({ caller }) func submitBooking(name : Text, email : Text, phone : Text, preferredDate : Text, preferredTime : Text, message : Text) : async Nat {
    let id = nextBookingId;
    nextBookingId += 1;
    bookingListV2.add({
      id;
      name;
      email;
      phone;
      preferredDate;
      preferredTime;
      message;
      status = "pending";
      locked = false;
    });
    id;
  };

  public query ({ caller }) func getAllBookings() : async [Booking] {
    bookingListV2.toArray();
  };

  // Update booking status — skips if booking is locked
  public shared ({ caller }) func updateBookingStatus(id : Nat, newStatus : Text) : async Bool {
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
  public shared ({ caller }) func updateBookingLock(id : Nat, newLocked : Bool) : async Bool {
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
