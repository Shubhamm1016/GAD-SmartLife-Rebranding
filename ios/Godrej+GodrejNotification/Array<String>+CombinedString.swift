//
//  Array<String>+CombinedString.swift
//  godrejboyce
//
//  Created by poojaran on 09/03/25.
//

extension Array where Element == String {
    // Concatenate device names from a list.
    func combinedStringForDevices() -> String {
        if self.count == 1 {
            return "device (\(self[0]))"
        }
        return self.count >= 3 ? "devices (\(self[0...2].joined(separator: ", "))...)": "devices (\(self.joined(separator: ", ")))"
    }
}
