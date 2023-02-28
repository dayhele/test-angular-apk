//
//  CastSessionManagerListenerWrapper.swift
//  Plugin
//
//  Created by Caio Vasconcelos on 07/08/22.
//

import Foundation
import GoogleCast

class CastSessionManagerListenerWrapper: NSObject {
    
}

// MARK: - Extension GCKSessionManagerListener

extension CastSessionManagerListenerWrapper: GCKSessionManagerListener {
    func sessionManager(_ sessionManager: GCKSessionManager, didStart session: GCKSession) {
        print("#SessionManager: didStart")
    }

    func sessionManager(_ sessionManager: GCKSessionManager, didResumeSession session: GCKSession) {
        print("#SessionManager: didResumeSession")
    }

    func sessionManager(_ sessionManager: GCKSessionManager, didEnd session: GCKSession, withError error: Error?) {
        print("#SessionManager: didEnd")
    }

    func sessionManager(_: GCKSessionManager, didFailToStartSessionWithError error: Error?) {
        print("#SessionManager: didFailToStartSessionWithError")
    }

    func sessionManager(_ sessionManager: GCKSessionManager, didFailToStart session: GCKSession, withError error: Error) {
        print("#SessionManager: didFailToStart")
    }
}
