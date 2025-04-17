import Foundation

//struct ESPNodeSharingAcceptedEvent {
//    let eventData: [String: Any]
//
//    func modifiedContent() -> (title: String, body: String) {
//        guard let secondaryUserName = eventData["secondary_user_name"] as? String else {
//            print("❌ Missing secondary user name")
//            return ("", "")
//        }
//
//        guard let acceptStatus = eventData["accept"] as? Int else {
//            print("❌ Missing or invalid accept status in event data")
//            return ("", "")
//        }
//
//        let deviceNames = getDeviceNames()
//
//        print("🔍 acceptStatus: \(acceptStatus)") // Debugging Log
//
//        if acceptStatus == 1 {
//            print("✅ Sharing Request Accepted")
//            return ("✅ Sharing Request Accepted", "\(secondaryUserName) has accepted the sharing request for device(s): \(deviceNames).")
//        } else {
//            print("❌ Sharing Request Declined")
//            return ("❌ Sharing Request Declined", "\(secondaryUserName) has declined the sharing request for device(s): \(deviceNames).")
//        }
//    }
//
//    private func getDeviceNames() -> String {
//        if let nodes = eventData["nodes"] as? [String] {
//            return nodes.joined(separator: ", ")
//        }
//        return "Unknown Device"
//    }
//}


struct ESPNodeSharingAcceptedEvent {
  let eventData: [String: Any]
  
  func modifiedContent() -> (title: String, body: String) {
    guard let secondaryUserName = eventData["secondary_user_name"] as? String else {
      print("❌ Missing secondary user name")
      return ("", "")
    }
    
    guard let acceptStatus = eventData["accept"] as? Int else {
      print("❌ Missing or invalid accept status in event data")
      return ("", "")
    }
    
    print("🔍 acceptStatus: \(acceptStatus)") // Debugging Log
    
    if acceptStatus == 1 {
      print("Godrej Smart Appliance")
      return ("Godrej Smart Appliance", "\(secondaryUserName) has accepted the sharing request for device.")
    } else {
      print("Godrej Smart Appliance")
      return ("Godrej Smart Appliance", "\(secondaryUserName) has declined the sharing request for device.")
    }
  }
}
