class x2G_Player_HLS {

  config = {
    // Important for this code;
    autoStartLoad: false,       // The Player will start loading media fragments only when the Origin has been selected.
    backBufferLength: 0,        // This fixes "seeking issue" when a level or fragment loading ERROR appears. (v1.0.0 and higher)
    fragLoadingMaxRetry: 0,     // // In general, for well built systems, you should never retry to load files.
    levelLoadingMaxRetry: 0,    // // If the ERROR appears, this means that something extraordinary happened.
    // Specific for my streams;
    abrBandWidthFactor: 2.0,    // If connection is not stable, I prefer a worse quality video than interruptions of a playback.
    abrEwmaFastLive: 2.0,       // // A chunk duration of my streams is 2s. 
    abrEwmaSlowLive: 2.0,       // // I use only one chunk to measure the current network speed.
    // Just to be clear; In fact, these settings make a start time longer.
    testBandwidth: true,        // Load lowest resolution chunk first, to measure a bandwidth.
    startLevel: -1              // Select the level to play automatically based on the measured bandwidth.
  };

  error = {
    maxCount: 8,   // The maximum number of errors allowed in a certain period of time.
    period: 8      // Let it be 8 errors per 8 seconds.
  }

  constructor(videoElementID, playlistURLs) {
    this.ID = videoElementID;
    this.URL = playlistURLs;
    this.origin = 0;
    this.alterOrigin = false;
    this.hls = null;
    this.errorTimeStamp = [];
    this.start();
  }

  start() {
    this.video = document.getElementById(this.ID);
    console.log("hls.js Version:", Hls.version);
    this.create();
  }

  create() {
    this.hls = new Hls(this.config);
    this.bindEvents();
    this.hls.attachMedia(this.video);
    this.hls.loadSource(this.URL[this.origin]);
  }

  destroy() {
    this.unbindEvents();
    this.hls.destroy();
    this.hls = null;
  }

  restart() {
    this.destroy();
    this.origin = this.origin ? 0 : 1;
    console.log("Will load MANIFEST from Origin", this.origin + 1);
    this.create();
  }

  bindEvents() {
    this.hls.on(Hls.Events.ERROR, this.onError.bind(this));
    this.hls.on(Hls.Events.MANIFEST_PARSED, this.onManifestParsed.bind(this));
    this.hls.on(Hls.Events.LEVEL_SWITCHED, this.onLevelSwitched.bind(this));
    this.video.addEventListener('click', this.onVideoClick.bind(this));
  }

  unbindEvents() {
    this.hls.off(Hls.Events.ERROR, this.onError.bind(this));
    this.hls.off(Hls.Events.MANIFEST_PARSED, this.onManifestParsed.bind(this));
    this.hls.off(Hls.Events.LEVEL_SWITCHED, this.onLevelSwitched.bind(this));
    this.video.removeEventListener('click', this.onVideoClick.bind(this));
  }
  
  onVideoClick() {
    this.video.muted = this.video.muted ? false : true;
  }

  onManifestParsed() {
    if (this.alterOrigin) {
      this.changeOrigin();
    } else {
      this.remainOrigin();
    };
    this.hls.startLoad();
  }

  onLevelSwitched() {
    this.config.testBandwidth = false;
    this.config.startLevel = this.hls.currentLevel;
  }

  changeOrigin() {
    console.log("Will load from Origin 2");
    this.hls.levels.forEach((level) => {
      level.url.push(level.url[0]);
      level.url.shift();
    });
    this.alterOrigin = false;
  }

  remainOrigin() {
    console.log("Will load from Origin 1");
    this.alterOrigin = true;
  }

  onError(event, data) {
    if (this.somethingWentWrong()) return;
    const { type, details, fatal } = data;
    console.log(Date.now(), "ERROR:", details);
    switch (details) {
      case Hls.ErrorDetails.LEVEL_EMPTY_ERROR:
      case Hls.ErrorDetails.LEVEL_LOAD_ERROR:
      case Hls.ErrorDetails.LEVEL_LOAD_TIMEOUT:
      case Hls.ErrorDetails.FRAG_LOAD_ERROR:
      case Hls.ErrorDetails.FRAG_LOAD_TIMEOUT:
        this.restart();
    break;
      case Hls.ErrorDetails.MANIFEST_LOAD_ERROR:
      case Hls.ErrorDetails.MANIFEST_LOAD_TIMEOUT:
        this.alterOrigin = this.alterOrigin ? false : true ;
        this.restart();
    break;
      default:
      console.log("Ignored");
    }
  }

  somethingWentWrong() {
    this.errorTimeStamp.push(Date.now());
    if (this.error.maxCount < this.errorTimeStamp.length) {
      this.errorTimeStamp.shift();
      if (this.errorTimeStamp[this.error.maxCount - 1] - this.errorTimeStamp[0] < this.error.period * 1000) {
        console.log("Too many errors! Your streams are not playable! Sorry.");
        this.destroy();
        return true;
      }
    }
    return false;
  }
}
