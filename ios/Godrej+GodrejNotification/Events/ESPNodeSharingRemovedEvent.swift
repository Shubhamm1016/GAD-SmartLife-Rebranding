//
//  ESPNodeSharingRemovedEvent.swift
//  godrejboyce
//
//  Created by poojaran on 25/03/25.
//

import Foundation

struct ESPNodeSharingRemovedEvent {
    let userInfo: [AnyHashable: Any]
    
    init(_ userInfo: [AnyHashable: Any]) {
        self.userInfo = userInfo
    }
    
    func modifiedContent() -> (title: String, body: String)? {
        // Expecting userInfo to include:
        // - aps: a dictionary with alert data including event_data_payload
        // - event_data_payload: the payload that holds event details
        guard let aps = userInfo["aps"] as? [String: Any],
              let alert = aps["alert"] as? [String: Any],
              let eventDataPayload = alert["event_data_payload"] as? [String: Any],
              let eventData = eventDataPayload["event_data"] as? [String: Any] else {
            print("❌ Missing required event data")
            return nil
        }
        
        // Extract the relevant data from event_data
        guard let eventType = eventData["event_type"] as? String,
              let timestamp = alert["timestamp"] as? TimeInterval else {
            print("❌ Missing or invalid event data")
            return nil
        }
        
        // Convert timestamp from milliseconds to a readable date string.
        var dateString = "unknown time"
        let timestampSeconds = timestamp / 1000.0
        let date = Date(timeIntervalSince1970: timestampSeconds)
        let formatter = DateFormatter()
        formatter.dateStyle = .short
        formatter.timeStyle = .short
        dateString = formatter.string(from: date)
        
        // Check if we have the correct event type
        if eventType == "rmaker.event.user_node_sharing_add" {
            // Handling the case when the secondary user accepts the request
            let title = "🔔 Secondary User Decline Sharing Request"
            
            // Extract the secondary user's name
            let secondaryUserName = eventData["secondary_user_name"] as? String ?? "Unknown User"
            
            // Construct the body with relevant information
            let body = "\(secondaryUserName) has accepted the sharing request at \(dateString)."
            return (title, body)
        } else {
            print("⚠️ Event type not recognized, no modification applied.")
            return nil
        }
    }
}
