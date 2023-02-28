//
//  CastDiscoveryManagerListenerWrapper.swift
//  Plugin
//
//  Created by Caio Vasconcelos on 07/08/22.
//

import Foundation
import GoogleCast

class CastDiscoveryManagerListenerWrapper: NSObject {

}

// MARK: - Extension GCKDiscoveryManagerListener

extension CastDiscoveryManagerListenerWrapper: GCKDiscoveryManagerListener {
    public func didStartDiscovery(forDeviceCategory deviceCategory: String) {
        print("#DiscoveryManager: Comecando a procurar device: \(deviceCategory)")
    }

    public func didHaveDiscoveredDeviceWhenStartingDiscovery() {
        print("#DiscoveryManager: Descobriu device")
    }
}
