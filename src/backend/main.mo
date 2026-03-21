import List "mo:core/List";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Migration "migration";

(with migration = Migration.run)
actor {
  // --- Data Types ---
  type Comment = {
    name : Text;
    message : Text;
  };

  module Comment {
    public func compare(comment1 : Comment, comment2 : Comment) : Order.Order {
      Text.compare(comment1.name, comment2.name);
    };
  };

  type Booking = {
    name : Text;
    email : Text;
    phone : Text;
    preferredDate : Text;
    preferredTime : Text;
    message : Text;
  };

  module Booking {
    public func compare(booking1 : Booking, booking2 : Booking) : Order.Order {
      Text.compare(booking1.name, booking2.name);
    };
  };

  // --- State ---
  let commentList = List.empty<Comment>();
  let bookingList = List.empty<Booking>();
  var visitorCount = 0;

  // --- Core Features ---
  // Increment and get visitor count
  public shared ({ caller }) func incrementVisitorCount() : async Nat {
    visitorCount += 1;
    visitorCount;
  };

  // Get visitor count
  public query ({ caller }) func getVisitorCount() : async Nat {
    visitorCount;
  };

  // Submit a comment
  public shared ({ caller }) func submitComment(name : Text, message : Text) : async () {
    let comment : Comment = { name; message };
    commentList.add(comment);
  };

  // Get all comments (sorted by name)
  public query ({ caller }) func getAllComments() : async [Comment] {
    commentList.toArray().sort();
  };

  // Submit a booking
  public shared ({ caller }) func submitBooking(name : Text, email : Text, phone : Text, preferredDate : Text, preferredTime : Text, message : Text) : async () {
    let booking : Booking = {
      name;
      email;
      phone;
      preferredDate;
      preferredTime;
      message;
    };
    bookingList.add(booking);
  };

  // Get all bookings (sorted by name)
  public query ({ caller }) func getAllBookings() : async [Booking] {
    bookingList.toArray().sort();
  };
};
