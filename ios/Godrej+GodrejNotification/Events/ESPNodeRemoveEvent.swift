import Foundation

struct ESPNodeRemoveEvent {
    let eventData: [String: Any]
    let timestamp: TimeInterval

    // Update initializer to accept both parameters
    init(eventData: [String: Any], timestamp: TimeInterval) {
        self.eventData = eventData
        self.timestamp = timestamp
        print("🔍 Debug: eventData received in ESPNodeRemoveEvent: \(eventData), timestamp: \(timestamp)")
    }

    func modifiedContent() -> (title: String, body: String)? {
        print("📌 Processing user_node_removed with eventData: \(eventData), timestamp: \(timestamp)")

        // Extract node_id from 'nodes' array
        guard let nodes = eventData["nodes"] as? [String],
              let nodeId = nodes.first else {
            print("❌ Error: 'nodes' is missing or not an array in user_node_removed event.")
            return nil
        }

        // Convert timestamp from milliseconds to readable format
        let timestampSeconds = timestamp / 1000.0
        let date = Date(timeIntervalSince1970: timestampSeconds)
        let formatter = DateFormatter()
        formatter.dateStyle = .short
        formatter.timeStyle = .short
        let dateString = formatter.string(from: date)

        // Build notification content
        let title = "Godrej Smart Appliance"
        let body = "The device was removed at \(dateString)."

        print("Notification Generated: \(title) - \(body)")
        return (title, body)
    }
}
