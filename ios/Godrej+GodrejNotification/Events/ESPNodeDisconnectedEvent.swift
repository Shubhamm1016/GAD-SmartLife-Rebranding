import Foundation

struct ESPNodeDisconnectedEvent {
    let eventData: [String: Any]
    
    init(_ eventData: [String: Any]) {
        self.eventData = eventData
    }
    
    func modifiedContent() -> (title: String, body: String)? {
        // Expecting eventData to include:
        // - connectivity: a dictionary with keys "connected" and "timestamp"
        // - node_id: the ID of the node
        guard let connectivity = eventData["connectivity"] as? [String: Any],
              let _ = connectivity["connected"] as? Int,  // ✅ Unused, replaced with `_`
              let _ = eventData["node_id"] as? String else {  // ✅ Unused, replaced with `_`
            print("❌ 'connectivity' or 'node_id' is missing or invalid in node_disconnected event")
            return nil
        }
        
        // Convert timestamp from milliseconds to a readable date string.
        var dateString = "unknown time"
        if let ts = connectivity["timestamp"] as? TimeInterval {
            let timestampSeconds = ts / 1000.0
            let date = Date(timeIntervalSince1970: timestampSeconds)
            let formatter = DateFormatter()
            formatter.dateStyle = .short
            formatter.timeStyle = .short
            dateString = formatter.string(from: date)
        }
        
        // Build a title and body based on disconnection.
        let title = "🔴 Device is now offline."
      
        let body = "🔴 Device is now offline at \(dateString)."
        
        return (title, body)
    }
}
