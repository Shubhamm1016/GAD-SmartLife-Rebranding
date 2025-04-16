import Foundation

struct ESPNodeSharingDeclinedEvent {
    let eventData: [String: Any]
    
    init(eventData: [String: Any]) {
        self.eventData = eventData
    }
    
    func modifiedContent() -> (title: String, body: String) {
        guard let secondaryUserName = eventData["secondary_user_name"] as? String else {
            return ("Godrej Smart Appliance", "A user declined the sharing request.")
        }

        // Ensure it only says "declined the sharing request for device" without node ID
        return ("Godrej Smart Appliance", "\(secondaryUserName) has declined the sharing request for device")
    }
}

