import Foundation
import GoogleCast

public class Chromecast: NSObject {

    // MARK: - Constants

    private let kReceiverAppID = kGCKDefaultMediaReceiverApplicationID
    private let kContentType = "video/mp4"

    // MARK: - Properties

    private weak var sessionManager: GCKSessionManager?
    private weak var discoveryManager: GCKDiscoveryManager?

    private var castLogger = CastLoggerWrapper(enableSDKLogging: true)
    private var castSessionManagerListener = CastSessionManagerListenerWrapper()
    private var castRemoteMediaClientListener = CastRemoteMediaClientListenerWrapper()
    private var castRequest = CastRequestWrapper()
    private var castDisveryManagerListener = CastDiscoveryManagerListenerWrapper()

    // MARK: - Init

    public override init() {
        super.init()
        setupInit()
    }

    // MARK: - Denit

    deinit {
        setupDeinit()
    }

    // MARK: - Functions

    func discoveryDevices(fn: @escaping () -> Void) {
        return DispatchQueue.main.async {
            if let hasConnectedSession = self.sessionManager?.hasConnectedSession(), !hasConnectedSession {
            GCKCastContext.sharedInstance().presentCastDialog();
            }
            fn();
        }
    }

    func startStremming(url: String, currentTime: Double, poster:String, title: String) {
        DispatchQueue.main.async {
            let _url = URL.init(string:url);
            
        
            let metadata = GCKMediaMetadata();
            metadata.setString(title, forKey: kGCKMetadataKeyTitle);
            metadata.addImage(GCKImage(url: URL(string: poster)!, width: 480, height: 360));

            let mediaInfoBuilder = GCKMediaInformationBuilder.init(contentURL: _url!);
            mediaInfoBuilder.startAbsoluteTime = currentTime;
            mediaInfoBuilder.streamType = GCKMediaStreamType.none;
            mediaInfoBuilder.contentType = self.kContentType
            mediaInfoBuilder.metadata = metadata;
            let mediaInformation = mediaInfoBuilder.build()
            if let request =  self.sessionManager?.currentSession?.remoteMediaClient?.loadMedia(mediaInformation) {
                request.delegate = self.castRequest
            }

            if let hasConnectedSession = self.sessionManager?.hasConnectedSession(), hasConnectedSession {
                GCKCastContext.sharedInstance().presentDefaultExpandedMediaControls()            }
        }
    }

    // MARK: - Private Functions

    private func setupInit() {
        let criteria = GCKDiscoveryCriteria(applicationID: kReceiverAppID)
        let options = GCKCastOptions(discoveryCriteria: criteria)
        options.physicalVolumeButtonsWillControlDeviceVolume = true

        let launchOptions = GCKLaunchOptions()
        launchOptions.androidReceiverCompatible = true
        options.launchOptions = launchOptions

        GCKCastContext.setSharedInstanceWith(options)
        GCKCastContext.sharedInstance().useDefaultExpandedMediaControls = true

        sessionManager = GCKCastContext.sharedInstance().sessionManager;

        sessionManager?.add(castSessionManagerListener);
        sessionManager?.currentCastSession?.remoteMediaClient?.add(castRemoteMediaClientListener);

        self.discoveryManager = GCKCastContext.sharedInstance().discoveryManager;
        self.discoveryManager?.add(self.castDisveryManagerListener);
        self.discoveryManager?.passiveScan = true;
        self.discoveryManager?.startDiscovery();
    }

    private func setupDeinit() {
        sessionManager?.remove(castSessionManagerListener)
        sessionManager?.currentCastSession?.remoteMediaClient?.remove(castRemoteMediaClientListener)
        discoveryManager?.stopDiscovery()
    }
}
