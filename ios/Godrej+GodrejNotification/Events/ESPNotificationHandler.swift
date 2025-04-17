import Foundation
import UserNotifications

// Define all possible notification event types
enum ESPNotificationEvents: String {
    case nodeAlert = "rmaker.event.alert"
    case nodeConnected = "rmaker.event.node_connected"
    case nodeDisconnected = "rmaker.event.node_disconnected"
    case nodeDissassociated = "rmaker.event.user_node_removed"
    case nodeSharingAdd = "rmaker.event.user_node_sharing_add"
}

// Main Notification Handler
struct ESPNotificationHandler {
    
    static func processNotification(userInfo: [AnyHashable: Any]) -> (title: String, body: String)? {
        
        print("📩 Received notification userInfo: \(userInfo)")
        
        // Extract 'event_data_payload'
        guard let aps = userInfo["aps"] as? [String: Any],
              let alert = aps["alert"] as? [String: Any],
              let eventPayload = alert["event_data_payload"] as? [String: Any],
              let eventTypeString = eventPayload["event_type"] as? String,
              let eventType = ESPNotificationEvents(rawValue: eventTypeString),
              let eventData = eventPayload["event_data"] as? [String: Any] else {
            print("❌ Missing required event data")
            return nil
        }
      let timestamp = eventPayload["timestamp"] as? Double ?? Date().timeIntervalSince1970

        
        print("Extracted event_type: \(eventTypeString)")
        
        var modifiedNotification: (title: String, body: String)?
        
        switch eventType {
        case .nodeAlert:
            print("🚀 Processing nodeAlert event")
            modifiedNotification = ESPNodeAlertEvent(eventData).modifiedContent()
        case .nodeConnected:
            print("🚀 Processing nodeConnected event")
            modifiedNotification = ESPNodeConnectedEvent(eventData).modifiedContent()
        case .nodeDisconnected:
            print("🚀 Processing nodeDisconnected event")
            modifiedNotification = ESPNodeDisconnectedEvent(eventData).modifiedContent()
        case .nodeDissassociated:
          print("🚀 Processing nodeDissassociated event")
          modifiedNotification = ESPNodeRemoveEvent(eventData: eventData, timestamp: timestamp).modifiedContent()
        case .nodeSharingAdd:
            print("🚀 Processing nodeSharingAdd event")
            if let accept = eventData[ESPNotificationKeys.acceptKey] as? Int { // Ensure 'accept' is an Int
                if accept == 1 {
                    print("✅ Sharing request ACCEPTED")
                    modifiedNotification = ESPNodeSharingAcceptedEvent(eventData: eventData).modifiedContent()
                } else {
                    print("❌ Sharing request DECLINED")
                    modifiedNotification = ESPNodeSharingDeclinedEvent(eventData: eventData).modifiedContent()
                }
            } else {
                print("⚠️ Error: 'accept' key is missing or not an Int")
            }
        }
        
        if let modifiedNotification = modifiedNotification {
          ESPNotificationStorage.saveNotification(title: modifiedNotification.title, body: modifiedNotification.body)
        }
        
        return modifiedNotification
    }
}
