import Foundation
import React
@objc(NotificationModule)
public class NotificationModule: RCTEventEmitter {
    private var deviceToken: String?
    private let deviceTokenKey = "com.espressif.espsdkdemo.devicetoken"
    // Singleton instance
  @objc static var shared: NotificationModule?
    private override init() {
        super.init()
      NotificationModule.shared = self
    }
  
  override public static func moduleName() -> String {
    return "NotificationModule"
  }
  public override static func requiresMainQueueSetup() -> Bool {
        return true
    }
    // List of supported events
  public override func supportedEvents() -> [String]! {
        return ["NotificationModule"]
    }
    // Method to set the device token
    @objc(setDeviceToken:)
    func setDeviceToken(_ token: String) {
      UserDefaults.standard.setValue(token, forKey: deviceTokenKey)
        // You can add additional logic here if needed
    }
    // Method to get the device token
    @objc(getDeviceToken:reject:)
  func getDeviceToken(resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    if let token = UserDefaults.standard.value(forKey: deviceTokenKey) {
            resolve(token)
        } else {
            reject("no_token", "Device token not set", nil)
        }
    }
}
  