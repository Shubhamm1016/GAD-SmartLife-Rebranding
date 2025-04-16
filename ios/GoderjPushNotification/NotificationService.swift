//
//  NotificationService.swift
//  GoderjPushNotification
//
//  Created by poojaran on 09/03/25.
//

//import UserNotifications
//
//class NotificationService: UNNotificationServiceExtension {
//
//    var contentHandler: ((UNNotificationContent) -> Void)?
//    var bestAttemptContent: UNMutableNotificationContent?
//
//  override func didReceive(_ request: UNNotificationRequest, withContentHandler contentHandler: @escaping (UNNotificationContent) -> Void) {
//      self.contentHandler = contentHandler
//      bestAttemptContent = (request.content.mutableCopy() as? UNMutableNotificationContent)
//
//      if let bestAttemptContent = bestAttemptContent {
//          print("📩 Notification Service Triggered")
//          print("📨 Full Payload: \(bestAttemptContent.userInfo)")
//
//        if let userInfo = bestAttemptContent.userInfo as? [String: Any] {
//            print("🔍 Processing notification data...")
//
//            let handler = ESPNotificationHandler(userInfo)
//            print("🛠️ ESPNotificationHandler initialized: \(handler)")
//
//            if let modifiedPayload = handler.modifiedContent() {
//                print("✅ Modified Notification: Title - \(modifiedPayload.title), Body - \(modifiedPayload.body)")
//                bestAttemptContent.body = modifiedPayload.body
//                bestAttemptContent.title = modifiedPayload.title
//            } else {
//                print("⚠️ ESPNotificationHandler returned nil")
//            }
//        }
//
//        else {
//              print("❌ Failed to parse userInfo")
//          }
//
//          print("🚀 Final Notification Content: Title - \(bestAttemptContent.title), Body - \(bestAttemptContent.body)")
//          contentHandler(bestAttemptContent)
//      }
//  }
//
//    override func serviceExtensionTimeWillExpire() {
//        // Called just before the extension will be terminated by the system.
//        // Use this as an opportunity to deliver your "best attempt" at modified content, otherwise the original push payload will be used.
//        if let contentHandler = contentHandler, let bestAttemptContent =  bestAttemptContent {
//            contentHandler(bestAttemptContent)
//        }
//    }
//}
//import UserNotifications
//
//class NotificationService: UNNotificationServiceExtension {
//
//    var contentHandler: ((UNNotificationContent) -> Void)?
//    var bestAttemptContent: UNMutableNotificationContent?
//
//    override func didReceive(_ request: UNNotificationRequest, withContentHandler contentHandler: @escaping (UNNotificationContent) -> Void) {
//        self.contentHandler = contentHandler
//        bestAttemptContent = (request.content.mutableCopy() as? UNMutableNotificationContent)
//
//        if let bestAttemptContent = bestAttemptContent {
//            print("📢 Notification Service triggered with request: \(request)")
//            print("📨 Full Payload: \(bestAttemptContent.userInfo)")
//
//            if let userInfo = bestAttemptContent.userInfo as? [String: Any] {
//                print("🔍 Processing notification data...")
//
//                let handler = ESPNotificationHandler(userInfo)
//                print("🛠️ ESPNotificationHandler initialized: \(handler)")
//
//                if let modifiedPayload = handler.modifiedContent() {
//                    print("✅ Modified Notification: Title - \(modifiedPayload.title), Body - \(modifiedPayload.body)")
//                    bestAttemptContent.body = modifiedPayload.body
//                    bestAttemptContent.title = modifiedPayload.title
//                } else {
//                    print("⚠️ ESPNotificationHandler returned nil")
//                }
//            }
//
//            print("🚀 Final Notification Content: Title - \(bestAttemptContent.title), Body - \(bestAttemptContent.body)")
//            contentHandler(bestAttemptContent)
//        }
//    }
//
//    override func serviceExtensionTimeWillExpire() {
//        if let contentHandler = contentHandler, let bestAttemptContent = bestAttemptContent {
//            contentHandler(bestAttemptContent)
//        }
//    }
//}

//import UserNotifications
//
//class NotificationService: UNNotificationServiceExtension {
//
//    var contentHandler: ((UNNotificationContent) -> Void)?
//    var bestAttemptContent: UNMutableNotificationContent?
//
//    override func didReceive(_ request: UNNotificationRequest, withContentHandler contentHandler: @escaping (UNNotificationContent) -> Void) {
//        self.contentHandler = contentHandler
//        bestAttemptContent = (request.content.mutableCopy() as? UNMutableNotificationContent)
//
//        if let bestAttemptContent = bestAttemptContent {
//            print("📢 Notification Service triggered with request: \(request)")
//            print("📨 Full Payload: \(bestAttemptContent.userInfo)")
//
//            if let userInfo = bestAttemptContent.userInfo as? [String: Any] {
//                print("🔍 Processing notification data...")
//
//                let handler = ESPNotificationHandler(userInfo)
//                print("🛠️ ESPNotificationHandler initialized: \(handler)")
//
//              if let modifiedNotification = handler.modifiedContent() {
//                          // Create a new UNMutableNotificationContent and set the modified title and body
//                          let newContent = UNMutableNotificationContent()
//                          newContent.title = modifiedNotification.title
//                          newContent.body = modifiedNotification.body
//                          newContent.userInfo = userInfo
//
//                          // Call the content handler with the modified notification content
//                          contentHandler(newContent)
//                      } else {
//                    print("⚠️ ESPNotificationHandler returned nil")
//                }
//            }
//
//            print("🚀 Final Notification Content: Title - \(bestAttemptContent.title), Body - \(bestAttemptContent.body)")
//            contentHandler(bestAttemptContent)
//        }
//    }
//
//    override func serviceExtensionTimeWillExpire() {
//        if let contentHandler = contentHandler, let bestAttemptContent = bestAttemptContent {
//            contentHandler(bestAttemptContent)
//        }
//    }
//}

//
//import UserNotifications
//
//class NotificationService: UNNotificationServiceExtension {
//
//    var contentHandler: ((UNNotificationContent) -> Void)?
//    var bestAttemptContent: UNMutableNotificationContent?
//
//    override func didReceive(_ request: UNNotificationRequest, withContentHandler contentHandler: @escaping (UNNotificationContent) -> Void) {
//        self.contentHandler = contentHandler
//        bestAttemptContent = (request.content.mutableCopy() as? UNMutableNotificationContent)
//
//        guard let bestAttemptContent = bestAttemptContent else {
//            contentHandler(request.content)
//            return
//        }
//
//        let userInfo = request.content.userInfo
//        print("Received notification userInfo: \(userInfo)")  // Debug Log
//
//        // Extract 'aps' dictionary
//        guard let aps = userInfo["aps"] as? [String: Any] else {
//            print("Error: 'aps' key not found in userInfo")
//            contentHandler(request.content)
//            return
//        }
//
//        // Extract 'alert' dictionary
//        guard let alert = aps["alert"] as? [String: Any] else {
//            print("Error: 'alert' key not found in 'aps'")
//            contentHandler(request.content)
//            return
//        }
//
//        // Extract 'event_data_payload'
//        guard let eventPayload = alert["event_data_payload"] as? [String: Any] else {
//            print("Error: 'event_data_payload' key not found in 'alert'")
//            contentHandler(request.content)
//            return
//        }
//
//        // Extract 'event_data'
//        guard let eventData = eventPayload["event_data"] as? [String: Any] else {
//            print("Error: 'event_data' key not found in 'event_data_payload'")
//            contentHandler(request.content)
//            return
//        }
//
//        // Extract 'message_body' (JSON String)
//        if let messageBodyString = eventData["message_body"] as? String,
//           let messageBodyData = messageBodyString.data(using: .utf8) {
//            do {
//                if let messageBodyJson = try JSONSerialization.jsonObject(with: messageBodyData, options: []) as? [String: Any] {
//
//                    // Extract temperature from JSON
//                    if let acData = messageBodyJson["AC"] as? [String: Any],
//                       let temperature = acData["Temperature"] as? Int {
//                        print("Extracted Temperature: \(temperature)°C")  // Debug Log
//
//                        // Check conditions and modify title & body
//                        let modifiedTitle = "15 days clean"
//                        let modifiedBody = temperature > 24 ? "Temp more than 24" : "Temp normal"
//
//                        bestAttemptContent.title = modifiedTitle
//                        bestAttemptContent.body = modifiedBody
//
//                        print("Modified Title: \(modifiedTitle)")  // Debug Log
//                        print("Modified Body: \(modifiedBody)")  // Debug Log
//                    }
//                }
//            } catch {
//                print("Error parsing 'message_body' JSON: \(error.localizedDescription)")
//            }
//        }
//
//        // Call completion handler with modified content
//        contentHandler(bestAttemptContent)
//    }
//
//    override func serviceExtensionTimeWillExpire() {
//        if let contentHandler = contentHandler, let bestAttemptContent = bestAttemptContent {
//            contentHandler(bestAttemptContent)
//        }
//    }
//}

//import UserNotifications
//
//class NotificationService: UNNotificationServiceExtension {
//
//    var contentHandler: ((UNNotificationContent) -> Void)?
//    var bestAttemptContent: UNMutableNotificationContent?
//
//    override func didReceive(_ request: UNNotificationRequest, withContentHandler contentHandler: @escaping (UNNotificationContent) -> Void) {
//        self.contentHandler = contentHandler
//        bestAttemptContent = (request.content.mutableCopy() as? UNMutableNotificationContent)
//
//        guard let bestAttemptContent = bestAttemptContent else {
//            contentHandler(request.content)
//            return
//        }
//
//        let userInfo = request.content.userInfo
//        print("Received notification userInfo: \(userInfo)")
//
//        // Extract 'aps' dictionary
//        guard let aps = userInfo["aps"] as? [String: Any] else {
//            print("Error: 'aps' key not found in userInfo")
//            contentHandler(request.content)
//            return
//        }
//
//        // Extract 'alert' dictionary
//        guard let alert = aps["alert"] as? [String: Any] else {
//            print("Error: 'alert' key not found in 'aps'")
//            contentHandler(request.content)
//            return
//        }
//
//        // Extract 'event_data_payload'
//        guard let eventPayload = alert["event_data_payload"] as? [String: Any] else {
//            print("Error: 'event_data_payload' key not found in 'alert'")
//            contentHandler(request.content)
//            return
//        }
//
//        // Extract event_type from eventPayload (not eventData)
//        if let eventType = eventPayload["event_type"] as? String {
//            print("Extracted event_type: \(eventType)")
//            if eventType != "rmaker.event.alert" {
//                print("Skipping notification as event_type is not 'rmaker.event.alert'")
//                contentHandler(request.content)
//                return
//            }
//        } else {
//            print("Error: 'event_type' key not found in 'event_data_payload'")
//            contentHandler(request.content)
//            return
//        }
//
//        // Extract 'event_data' from eventPayload
//        guard let eventData = eventPayload["event_data"] as? [String: Any] else {
//            print("Error: 'event_data' key not found in 'event_data_payload'")
//            contentHandler(request.content)
//            return
//        }
//
//        // Extract 'node_id'
//        if let nodeId = eventData["node_id"] as? String {
//            print("Extracted node_id: \(nodeId)")
//        } else {
//            print("Error: 'node_id' key not found in 'event_data'")
//        }
//
//        // Extract 'message_body' (JSON String)
//        if let messageBodyString = eventData["message_body"] as? String,
//           let messageBodyData = messageBodyString.data(using: .utf8) {
//            do {
//                if let messageBodyJson = try JSONSerialization.jsonObject(with: messageBodyData, options: []) as? [String: Any] {
//
//                    // Extract temperature from JSON
//                    if let acData = messageBodyJson["AC"] as? [String: Any],
//                       let temperature = acData["Temperature"] as? Int {
//                        print("Extracted Temperature: \(temperature)°C")
//
//                        // Modify title & body based on temperature
//                        let modifiedTitle = "15 days clean"
//                        let modifiedBody = temperature > 24 ? "Temp more than 24" : "Temp normal"
//
//                        bestAttemptContent.title = modifiedTitle
//                        bestAttemptContent.body = modifiedBody
//
//                        print("Modified Title: \(modifiedTitle)")
//                        print("Modified Body: \(modifiedBody)")
//                    }
//                }
//            } catch {
//                print("Error parsing 'message_body' JSON: \(error.localizedDescription)")
//            }
//        }
//
//        // Call completion handler with modified content
//        contentHandler(bestAttemptContent)
//    }
//
//    override func serviceExtensionTimeWillExpire() {
//        if let contentHandler = contentHandler, let bestAttemptContent = bestAttemptContent {
//            contentHandler(bestAttemptContent)
//        }
//    }
//}



//import UserNotifications
//
//class NotificationService: UNNotificationServiceExtension {
//
//    var contentHandler: ((UNNotificationContent) -> Void)?
//    var bestAttemptContent: UNMutableNotificationContent?
//
//    override func didReceive(_ request: UNNotificationRequest, withContentHandler contentHandler: @escaping (UNNotificationContent) -> Void) {
//        self.contentHandler = contentHandler
//        bestAttemptContent = (request.content.mutableCopy() as? UNMutableNotificationContent)
//
//        guard let bestAttemptContent = bestAttemptContent else {
//            contentHandler(request.content)
//            return
//        }
//
//        let userInfo = request.content.userInfo
//        print("📩 Received notification userInfo: \(userInfo)")
//
//        /// 🔥 Directly using `ESPNotificationHandler` to process notification
//        if let modifiedContent = ESPNotificationHandler.processNotification(userInfo: userInfo) {
//            bestAttemptContent.title = modifiedContent.title
//            bestAttemptContent.body = modifiedContent.body
//
//            print("✅ Modified Notification -> Title: \(modifiedContent.title), Body: \(modifiedContent.body)")
//          print("📝 Storing notification -> Title: \(modifiedContent.title), Body: \(modifiedContent.body)")
//                     ESPNotificationStorage.saveNotification(title: modifiedContent.title, body: modifiedContent.body)
//        } else {
//            print("⚠️ No modification applied")
//        }
//
//        contentHandler(bestAttemptContent)
//    }
//
//    override func serviceExtensionTimeWillExpire() {
//        if let contentHandler = contentHandler, let bestAttemptContent = bestAttemptContent {
//            contentHandler(bestAttemptContent)
//        }
//    }
//}*********


import UserNotifications

class NotificationService: UNNotificationServiceExtension {
    
    var contentHandler: ((UNNotificationContent) -> Void)?
    var bestAttemptContent: UNMutableNotificationContent?
    
    override func didReceive(_ request: UNNotificationRequest, withContentHandler contentHandler: @escaping (UNNotificationContent) -> Void) {
        self.contentHandler = contentHandler
        bestAttemptContent = (request.content.mutableCopy() as? UNMutableNotificationContent)
        
        guard let bestAttemptContent = bestAttemptContent else {
            contentHandler(request.content)
            return
        }
        
        let userInfo = request.content.userInfo
        print("📩 Received notification userInfo: \(userInfo)")
        
        // 🔥 Use `ESPNotificationHandler` to process the notification and get modified content
        if let modifiedContent = ESPNotificationHandler.processNotification(userInfo: userInfo) {
            bestAttemptContent.title = modifiedContent.title
            bestAttemptContent.body = modifiedContent.body
            
            // Log the notification data
            print("✅ Modified Notification -> Title: \(modifiedContent.title), Body: \(modifiedContent.body)")
            print("📝 Storing notification -> Title: \(modifiedContent.title), Body: \(modifiedContent.body)")
            ESPNotificationStorage.saveNotification(title: modifiedContent.title, body: modifiedContent.body)
            
            // Add a custom key to indicate the screen for navigation
            // You can include additional data in userInfo here
            bestAttemptContent.userInfo["navigateTo"] = "NotificationCenterScreen"  // Add custom navigation key
            
        } else {
            print("⚠️ No modification applied")
        }
        
        // Pass the modified content to the contentHandler
        contentHandler(bestAttemptContent)
    }
    
    override func serviceExtensionTimeWillExpire() {
        // Handle if the service extension time expires before completing
        if let contentHandler = contentHandler, let bestAttemptContent = bestAttemptContent {
            contentHandler(bestAttemptContent)
        }
    }
}



//import UserNotifications
//
//class NotificationService: UNNotificationServiceExtension {
//
//    var contentHandler: ((UNNotificationContent) -> Void)?
//    var bestAttemptContent: UNMutableNotificationContent?
//
//    override func didReceive(_ request: UNNotificationRequest, withContentHandler contentHandler: @escaping (UNNotificationContent) -> Void) {
//        self.contentHandler = contentHandler
//        bestAttemptContent = (request.content.mutableCopy() as? UNMutableNotificationContent)
//
//        if let bestAttemptContent = bestAttemptContent {
//            print("📢 Notification Service triggered with request: \(request)")
//            print("📨 Full Payload: \(bestAttemptContent.userInfo)")
//16789op[;'/    qwertyuiop[
//            if let userInfo = bestAttemptContent.userInfo as? [String: Any] {
//                print("🔍 Processing notification data...")
//
//                if let modifiedPayload = ESPNotificationHandler(userInfo).modifiedContent() {
//                    print("✅ Modified Notification: Title - \(modifiedPayload.title), Body - \(modifiedPayload.body)")
//                    bestAttemptContent.body = modifiedPayload.body
//                    bestAttemptContent.title = modifiedPayload.title
//                } else {
//                    print("⚠️ No modifications applied to the notification")
//                }
//            }
//
//            print("🚀 Final Notification Content: Title - \(bestAttemptContent.title), Body - \(bestAttemptContent.body)")
//            contentHandler(bestAttemptContent)
//        }
//    }
//
//    override func serviceExtensionTimeWillExpire() {
//        print("⏳ Service Extension Time Expired")
//        if let contentHandler = contentHandler, let bestAttemptContent = bestAttemptContent {
//            print("⚠️ Delivering Best Attempt Content: Title - \(bestAttemptContent.title), Body - \(bestAttemptContent.body)")
//            contentHandler(bestAttemptContent)
//        }
//    }
//}
