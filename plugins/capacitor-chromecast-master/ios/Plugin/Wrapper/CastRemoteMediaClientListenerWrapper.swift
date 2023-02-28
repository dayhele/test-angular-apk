//
//  CastRemoteMediaClientListenerWrapper.swift
//  Plugin
//
//  Created by Caio Vasconcelos on 07/08/22.
//

import Foundation
import GoogleCast

class CastRemoteMediaClientListenerWrapper: NSObject {

}

// MARK: - Extension GCKRemoteMediaClientListener

extension CastRemoteMediaClientListenerWrapper: GCKRemoteMediaClientListener {
    func remoteMediaClient(_ client: GCKRemoteMediaClient, didUpdate mediaStatus: GCKMediaStatus?) {
        print("#RemoteMedia: didUpdate")
    }

    func remoteMediaClient(_ client: GCKRemoteMediaClient, didReceive queueItems: [GCKMediaQueueItem]) {
        print("#RemoteMedia: DidReceive")
    }

    func remoteMediaClient(_ client: GCKRemoteMediaClient, didStartMediaSessionWithID sessionID: Int) {
        print("#RemoteMedia: didStartMediaSessionWithID")
    }
}
