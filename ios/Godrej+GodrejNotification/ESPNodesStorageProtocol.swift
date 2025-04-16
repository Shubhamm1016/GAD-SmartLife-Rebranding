//
//  ESPNodesStorageProtocol.swift
//  godrejboyce
//
//  Created by poojaran on 09/03/25.
//

import Foundation

protocol ESPNodesStorageProtocol {
  func saveNodeDetails(nodes: [Node]?)
  func fetchNodeDetails() -> [Node]?
  func cleanupNodeDetails()
}
