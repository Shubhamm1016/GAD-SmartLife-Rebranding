import Foundation

struct ESPNodeConnectedEvent {
    let eventData: [String: Any]
    
    init(_ eventData: [String: Any]) {
        self.eventData = eventData
    }
    
    func modifiedContent() -> (title: String, body: String)? {
        // For a node_connected event, we expect the eventData to include:
        // - connectivity: a dictionary with keys "connected" and "timestamp"
        // - node_id: the ID of the node
        guard let connectivity = eventData["connectivity"] as? [String: Any],
              let connected = connectivity["connected"] as? Int,
              let nodeId = eventData["node_id"] as? String else {
            print("❌ 'connectivity' or 'node_id' is missing or invalid in node_connected event")
            return nil
        }
        
        // For logging, if available, convert timestamp from milliseconds to a date string.
        var dateString = "unknown time"
        if let ts = connectivity["timestamp"] as? TimeInterval {
            let timestampSeconds = ts / 1000.0
            let date = Date(timeIntervalSince1970: timestampSeconds)
            let formatter = DateFormatter()
            formatter.dateStyle = .short
            formatter.timeStyle = .short
            dateString = formatter.string(from: date)
        }
        
        // Build a title and body based on connectivity.
      let title: String
      let body: String
      if connected == 1 {
            title = "🟢 Device is now online."
            body = "🟢 Device is now online at \(dateString)."
      } else {
          title = "🔴 Device is now offline."
          body = "🔴 Device is now offline at \(dateString)."
      }
        
        return (title, body)
    }
}
