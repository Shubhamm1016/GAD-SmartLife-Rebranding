import Foundation
 
struct ESPNodeAlertEvent {
    let eventData: [String: Any]
    
    init(_ eventData: [String: Any]) {
        self.eventData = eventData
    }
    
    func modifiedContent() -> (title: String, body: String)? {
        guard let messageBodyString = extractMessageBody(),
              let messageBodyData = messageBodyString.data(using: .utf8) else {
            print("❌ 'message_body' is missing or invalid")
            return nil
        }
 
        do {
            if let messageBodyJson = try JSONSerialization.jsonObject(with: messageBodyData, options: []) as? [String: Any],
               let alertMessage = messageBodyJson["esp.alert.str"] as? String {
                
                // 🔹 Fixed title for all notifications
                let title = "Godrej Smart Appliances"
                
                // 📝 Modify message for clarity
                var modifiedMessage = alertMessage
                
                if alertMessage.lowercased().contains("clean") {
                    modifiedMessage = "Your air filter needs cleaning. Please clean it and reset through the app."
                } else if alertMessage.lowercased().contains("reset") {
                    modifiedMessage = "Your air filter has been successfully reset."
                } else if alertMessage.lowercased().contains("refrigerator") {
                    modifiedMessage = "There is an alert for your Godrej Refrigerator: \(alertMessage.replacingOccurrences(of: "Godrej Refrigerator alert - ", with: ""))"
                } else {
                    modifiedMessage = "Notification: \(alertMessage)"
                }
                
                return (title, modifiedMessage)
            }
        } catch {
            print("❌ Error parsing 'message_body' JSON: \(error.localizedDescription)")
        }
        
        return nil
    }
 
    /// Extracts 'message_body' from different response formats
    private func extractMessageBody() -> String? {
        // 🔍 Check if 'message_body' is directly available
        if let messageBody = eventData["message_body"] as? String {
            return messageBody
        }
        
        // 🔍 Check nested structure under 'event_data_payload'
        if let eventPayload = eventData["event_data_payload"] as? [String: Any],
           let eventDataDict = eventPayload["event_data"] as? [String: Any],
           let messageBody = eventDataDict["message_body"] as? String {
            return messageBody
        }
        
        return nil
    }
}
 
// Function that processes the event and handles multiple notifications
func processNotification(eventData: [String: Any]) {
    let alertEvent = ESPNodeAlertEvent(eventData)
    
    if let modifiedContent = alertEvent.modifiedContent() {
        print("✅ Modified Notification -> Title: \(modifiedContent.title), Body: \(modifiedContent.body)")
        
        // Handle specific messages
        if modifiedContent.body.contains("clean") {
            print("🧹✨ Displaying the filter cleaning message to the user.")
        } else if modifiedContent.body.contains("reset") {
            print("🔄 Displaying the filter reset success message to the user.")
        }
    } else {
        print("❌ Failed to process the notification.")
    }
}
 
// Simulate a reset notification
func handleResetNotification() {
    let eventData2: [String: Any] = [
        "message_body": "{\"esp.alert.str\":\"🔄 Filter reset successfully\"}"
    ]
    
    processNotification(eventData: eventData2)
}
 
// Example notification data for cleaning the filter
let eventData1: [String: Any] = [
    "message_body": "{\"esp.alert.str\":\"🧹✨Clean your Filter and after cleaning reset through App\"}"
]
