//
//  ESPNotificationStorage.swift
//  godrejboyce
//
//  Created by poojaran on 10/03/25.
//
 
import Foundation
 
struct ESPNotificationStorage {
    
    private static let storageKey = "storedNotifications"
    
    /// Save notification to UserDefaults
    static func saveNotification(title: String, body: String) {
        let notification = [
            "title": title,
            "body": body,
            "timestamp": Date().timeIntervalSince1970
        ] as [String : Any]
        
        var storedNotifications = UserDefaults.standard.array(forKey: storageKey) as? [[String: Any]] ?? []
        storedNotifications.append(notification)
        
        UserDefaults.standard.set(storedNotifications, forKey: storageKey)
        print("✅ Notification stored successfully: \(notification)")
    }
    
    /// Retrieve all stored notifications
    static func getNotifications() -> [[String: Any]] {
        return UserDefaults.standard.array(forKey: storageKey) as? [[String: Any]] ?? []
    }
    
    /// Clear all stored notifications
    static func clearNotifications() {
        UserDefaults.standard.removeObject(forKey: storageKey)
        print("🗑️ All notifications cleared")
    }
}
 
