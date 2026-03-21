import List "mo:core/List";
import Nat "mo:core/Nat";

module {
  type OldComment = {
    name : Text;
    message : Text;
  };

  type OldActor = {
    commentList : List.List<OldComment>;
    visitorCount : Nat;
  };

  type NewComment = OldComment;

  type NewBooking = {
    name : Text;
    email : Text;
    phone : Text;
    preferredDate : Text;
    preferredTime : Text;
    message : Text;
  };

  type NewActor = {
    commentList : List.List<NewComment>;
    bookingList : List.List<NewBooking>;
    visitorCount : Nat;
  };

  public func run(old : OldActor) : NewActor {
    {
      commentList = old.commentList;
      bookingList = List.empty<NewBooking>();
      visitorCount = old.visitorCount;
    };
  };
};
