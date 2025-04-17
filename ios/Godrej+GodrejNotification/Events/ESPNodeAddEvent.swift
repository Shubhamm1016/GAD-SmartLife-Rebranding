//
//  ESPNodeAddEvent.swift
//  godrejboyce
//
//  Created by poojaran on 12/03/25.
//

import Foundation

struct ESPNodeAddEvent {
    let eventData: [String: Any]
    
    init(_ eventData: [String: Any]) {
        self.eventData = eventData
    }
    
    func modifiedContent() -> (title: String, body: String)? {
        // Expecting eventData to include:
        // - "node_id": The ID of the removed node
        // - "timestamp": The time of removal (milliseconds)
        guard let nodeId = eventData["node_id"] as? String,
              let timestamp = eventData["timestamp"] as? TimeInterval else {
            print("❌ 'node_id' or 'timestamp' is missing or invalid in user_node_removed event")
            return nil
        }
        
        // Convert timestamp from milliseconds to a readable date string
        let timestampSeconds = timestamp / 1000.0
        let date = Date(timeIntervalSince1970: timestampSeconds)
        let formatter = DateFormatter()
        formatter.dateStyle = .short
        formatter.timeStyle = .short
        let dateString = formatter.string(from: date)
        
        // Build a title and body for the notification
        let title = "Godrej Smart Appliance"
      
        let body = "The device was removed on \(dateString)."
        
        return (title, body)
    }
}
