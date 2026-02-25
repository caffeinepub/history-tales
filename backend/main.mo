import Map "mo:core/Map";
import Text "mo:core/Text";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  public type MultilingualContent = {
    english : Text;
    hindi : Text;
    gujarati : Text;
  };

  public type Story = {
    title : MultilingualContent;
    summary : MultilingualContent;
    content : MultilingualContent;
  };

  public type UserProfile = {
    preferredLanguage : Text;
    isPremium : Bool;
  };

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let stories = List.empty<Story>();
  let users = Map.empty<Principal, UserProfile>();

  public shared ({ caller }) func addStory(story : Story) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add stories");
    };
    stories.add(story);
  };

  public query func getStories() : async [Story] {
    stories.toArray();
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get their profile");
    };
    users.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    users.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save their profile");
    };
    users.add(caller, profile);
  };

  public shared ({ caller }) func updateUserProfile(preferredLanguage : Text, isPremium : Bool) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update their profile");
    };
    users.add(
      caller,
      {
        preferredLanguage;
        isPremium;
      },
    );
  };
};
