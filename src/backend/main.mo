import Text "mo:core/Text";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Int "mo:core/Int";

actor {
  type ReservationId = Text;
  type PersonalInfo = {
    guestName : Text;
    phoneNumber : Text;
    email : Text;
  };

  type ReservationDetails = {
    personalInfo : PersonalInfo;
    numberOfGuests : Nat;
    preferredTime : Text;
    specialRequests : ?Text;
    submittedAt : Time.Time;
  };

  module Reservation {
    public func compareByDateTime(res1 : (ReservationId, ReservationDetails), res2 : (ReservationId, ReservationDetails)) : Order.Order {
      switch (Int.compare(res1.1.submittedAt, res2.1.submittedAt)) {
        case (#equal) { Text.compare(res1.0, res2.0) };
	      case (order) { order };
      };
    };
  };

  let reservations = Map.empty<ReservationId, ReservationDetails>();

  func generateReservationId() : ReservationId {
    Time.now().toText();
  };

  public shared ({ caller }) func submitReservation(
    guestName : Text,
    phoneNumber : Text,
    email : Text,
    numberOfGuests : Nat,
    preferredTime : Text,
    specialRequests : ?Text,
  ) : async ReservationId {
    let reservationId = generateReservationId();
    let reservationDetails : ReservationDetails = {
      personalInfo = {
        guestName;
        phoneNumber;
        email;
      };
      numberOfGuests;
      preferredTime;
      specialRequests;
      submittedAt = Time.now();
    };

    reservations.add(reservationId, reservationDetails);
    reservationId;
  };

  public query ({ caller }) func getAllReservations() : async [(ReservationId, ReservationDetails)] {
    reservations.entries().toArray().sort(Reservation.compareByDateTime);
  };

  public query ({ caller }) func getReservation(id : ReservationId) : async ReservationDetails {
    switch (reservations.get(id)) {
      case (null) { Runtime.trap("Reservation not found.") };
      case (?reservation) { reservation };
    };
  };
};
