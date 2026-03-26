import List   "mo:core/List";
import Buffer "mo:base/Buffer";

actor {
  // -----------------------------------------------------------------------
  // Types
  // -----------------------------------------------------------------------
  type BookingLegacy = {
    name          : Text;
    email         : Text;
    phone         : Text;
    preferredDate : Text;
    preferredTime : Text;
    message       : Text;
  };

  type Booking = {
    id            : Nat;
    name          : Text;
    email         : Text;
    phone         : Text;
    preferredDate : Text;
    preferredTime : Text;
    message       : Text;
    status        : Text;
    locked        : Bool;
  };

  type Comment = { name : Text; message : Text };

  // -----------------------------------------------------------------------
  // OLD implicit-stable vars kept ONLY to satisfy M0169 upgrade compatibility.
  // These match the previous version exactly so Motoko does not complain
  // about discarding them.  New code does NOT write to these vars.
  // -----------------------------------------------------------------------
  let bookingList   = List.empty<BookingLegacy>();
  let bookingListV2 = List.empty<Booking>();
  let commentList   = List.empty<Comment>();
  var visitorCount  : Nat  = 0;   // preserved by name — public API still uses this
  var nextBookingId : Nat  = 0;   // preserved by name — used as ID counter
  var migrationDone : Bool = false;

  // -----------------------------------------------------------------------
  // NEW explicit stable arrays — all reads/writes go through these
  // -----------------------------------------------------------------------
  stable var bookings : [Booking] = [];
  stable var comments : [Comment] = [];

  // -----------------------------------------------------------------------
  // One-time migration: lift old List data into the new stable arrays
  // -----------------------------------------------------------------------
  system func postupgrade() {
    if (not migrationDone) {
      // Migrate v2 bookings (already have id/status/locked)
      let v2 = bookingListV2.toArray();
      if (v2.size() > 0) {
        bookings := v2;
        // Make sure nextBookingId is past all migrated IDs
        for (b in v2.vals()) {
          if (b.id >= nextBookingId) { nextBookingId := b.id + 1 };
        };
      };

      // Migrate v1 legacy bookings (no id/status/locked yet)
      let v1 = bookingList.toArray();
      if (v1.size() > 0) {
        let buf = Buffer.fromArray<Booking>(bookings);
        for (b in v1.vals()) {
          let id = nextBookingId;
          nextBookingId += 1;
          buf.add({
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
        bookings := Buffer.toArray(buf);
      };

      // Migrate comments
      let carr = commentList.toArray();
      if (carr.size() > 0) {
        comments := carr;
      };

      migrationDone := true;
    };
  };

  // -----------------------------------------------------------------------
  // Visitor counter
  // -----------------------------------------------------------------------
  public shared func incrementVisitorCount() : async Nat {
    visitorCount += 1;
    visitorCount;
  };

  public query func getVisitorCount() : async Nat { visitorCount };

  // -----------------------------------------------------------------------
  // Comments
  // -----------------------------------------------------------------------
  public shared func submitComment(name : Text, message : Text) : async () {
    let buf = Buffer.fromArray<Comment>(comments);
    buf.add({ name; message });
    comments := Buffer.toArray(buf);
  };

  public query func getAllComments() : async [Comment] { comments };

  // -----------------------------------------------------------------------
  // Bookings — submit
  // -----------------------------------------------------------------------
  public shared func submitBooking(
    name          : Text,
    email         : Text,
    phone         : Text,
    preferredDate : Text,
    preferredTime : Text,
    message       : Text,
  ) : async Nat {
    let id = nextBookingId;
    nextBookingId += 1;
    let buf = Buffer.fromArray<Booking>(bookings);
    buf.add({
      id; name; email; phone; preferredDate; preferredTime; message;
      status = "pending"; locked = false;
    });
    bookings := Buffer.toArray(buf);
    id;
  };

  public query func getAllBookings() : async [Booking] { bookings };

  // -----------------------------------------------------------------------
  // Bookings — update status (no-op when locked)
  // -----------------------------------------------------------------------
  public shared func updateBookingStatus(id : Nat, newStatus : Text) : async Bool {
    var found = false;
    let buf = Buffer.Buffer<Booking>(bookings.size());
    for (b in bookings.vals()) {
      if (b.id == id and not b.locked) {
        buf.add({ b with status = newStatus });
        found := true;
      } else {
        buf.add(b);
      };
    };
    bookings := Buffer.toArray(buf);
    found;
  };

  // -----------------------------------------------------------------------
  // Bookings — update lock
  // -----------------------------------------------------------------------
  public shared func updateBookingLock(id : Nat, newLocked : Bool) : async Bool {
    var found = false;
    let buf = Buffer.Buffer<Booking>(bookings.size());
    for (b in bookings.vals()) {
      if (b.id == id) {
        buf.add({ b with locked = newLocked });
        found := true;
      } else {
        buf.add(b);
      };
    };
    bookings := Buffer.toArray(buf);
    found;
  };
};
