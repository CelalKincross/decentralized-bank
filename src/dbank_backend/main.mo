import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Float "mo:base/Float";


// in terminal - dfx canister call dbank_backend deposit - to call the deposit function in the main.mo file which is in dback_backend folder 
// use candid ui to call functions 
/* 
Candid Setup
1. project terminal 
enter: dfx canister id __Candid_UI
copy id

2. deploy and your url will be at the end with projectName: http... after "Backend canister via Candid interface: "
*/

// Orthogonal Persistance
/* using the stable key word will allow variables to keep its state through multiple cycles as long as you don't use an assigment operations later on (:=) */

actor {
  stable var currentValue: Float = 300;
  stable var startTime = Time.now();
  // currentValue := 100;
  Debug.print(debug_show (startTime));

  let id = 235328868;
  
  public func deposit(amount: Float) {
    currentValue+=amount;
    Debug.print(debug_show (currentValue));
  };

  public func withdraw(amount: Float) {
    let temp: Float = currentValue - amount;
    if (temp > 0) {
    currentValue+=amount;
    } else {
      Debug.print("Withdrawal amount greater than available funds");
    };
  };

  public query func checkBalance (): async Float {
    return currentValue;
  };

  public func compound() {
    var currentTime = Time.now();
    var timeElapsedSecs = (currentTime - startTime)/1000000000;
    currentValue := currentValue * (1.01 ** Float.fromInt(timeElapsedSecs));
    startTime := currentTime;
  };

  public query func greet(name : Text) : async Text {
    return "Hello, " # name # "!";
  };

};


