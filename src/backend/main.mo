import List "mo:core/List";
import Text "mo:core/Text";
import Order "mo:core/Order";

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

  // --- State ---
  let commentList = List.empty<Comment>();
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
};
