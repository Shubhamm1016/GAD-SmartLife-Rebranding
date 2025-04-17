//
//  ESPLocalStorageNodes.swift
//  godrejboyce
//
//  Created by poojaran on 09/03/25.
//
import Foundation

class ESPLocalStorageNodes {
    
    private let nodeDetailsKey = "nodeDetails"

    /// Method to save node details of a user locally.
    ///
    /// - Parameters:
    ///   - nodes: List of user nodes.
    func saveNodeDetails(nodes: [Node]?) {
        if let nodeList = nodes {
            do {
                let encoded = try JSONEncoder().encode(nodeList)
                UserDefaults.standard.set(encoded, forKey: nodeDetailsKey)
            } catch {
                print("Error encoding node details: \(error)")
            }
        }
    }

    /// Method to fetch locally stored node details for the current user.
    ///
    /// - Returns: Array of user-associated nodes.
    func fetchNodeDetails() -> [Node]? {
        if let nodeDetailsData = UserDefaults.standard.data(forKey: nodeDetailsKey) {
            do {
                let nodes = try JSONDecoder().decode([Node].self, from: nodeDetailsData)
                return nodes
            } catch {
                print("Error decoding node details: \(error)")
                return nil
            }
        }
        return nil
    }

    /// Method to clean up all node details.
    func cleanupNodeDetails() {
        UserDefaults.standard.removeObject(forKey: nodeDetailsKey)
    }
}
