import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AngularFireMessaging } from "@angular/fire/messaging";

@Injectable({
  providedIn: "root",
})
export class PushMessageService {
  pushMessageSubject = new BehaviorSubject(null);

  constructor(private angularFireMessaging: AngularFireMessaging) {}

  /**
   * update token in firebase database
   *
   * @param userId userId as a key
   * @param token token as a value
   */
  updateToken(userId: string, token: string) {
    // we can change this function to request our backend service
    console.log(userId, token);
    this.receiveMessage();
  }

  /**
   * request permission for notification from firebase cloud messaging
   *
   * @param userId userId
   */
  requestPermission(userId: string) {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        console.log(token);
        this.updateToken(userId, token);
      },
      (err) => {
        console.error("Unable to get permission to notify.", err);
      }
    );
  }

  /**
   * hook method when new notification received in foreground
   */
  receiveMessage() {
    this.angularFireMessaging.messages.subscribe((payload) => {
      console.log("new message received. ", payload);
      // this.pushMessageSubject.next(payload);
    });
  }
}
