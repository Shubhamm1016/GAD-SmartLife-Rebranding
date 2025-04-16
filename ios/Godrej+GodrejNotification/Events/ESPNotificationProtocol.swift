//
//  ESPNotificationProtocol.swift
//  godrejboyce
//
//  Created by poojaran on 09/03/25.
//


import Foundation


protocol ESPNotificationProtocol {
    var eventData:[String:Any] { get }
    var notification: ESPNotifications { get }
    func modifiedContent() -> ESPNotifications?
}
