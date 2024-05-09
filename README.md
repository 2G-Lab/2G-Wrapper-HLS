## Wrapper for hls.js  

This is a wrapper for early versions of [hls.js](https://github.com/video-dev/hls.js) player,
that implements switching to a redundant stream in case of failures of the current stream.  

If files of the current HLS stream are not accessible
the wrapper restarts `hls.js` player and tunes it to play a redundant HLS stream specified in the master playlist.  

The wrapper is not compatible with **v1.5.0** and later versions of `hls.js`.  

Please note that this wrapper is not a production ready solution but rather a proof of concept for the system
described in [this note](https://2g-lab.github.io/2G-Notes/2022-02-28.make-HLS-great-again/HLS-Study-2022.html).  


#### Usage:  

Add the Wrapper script to your HTML page:  

```html
<script src="https://cdn.jsdelivr.net/gh/2G-Lab/2G-Wrapper-HLS/src/wrapper-hls-exp.js"></script>
```
OR
```html
<script src="https://cdn.jsdelivr.net/npm/hls.js@1.4.14/dist/hls.js"></script>
<script src="https://cdn.jsdelivr.net/gh/2G-Lab/2G-Wrapper-HLS/src/wrapper-hls.js"></script>
```
Specify desired `hls.js` version (up to [v1.4.14](https://github.com/video-dev/hls.js/releases/tag/v1.4.14)).

Create a player instance:  

```html
<script>
  const playlistURLs = [
    'https://specialized.cdn.edge.name/NickName-of-EntryPoint-1/streamName/playlist.m3u8',
    'https://specialized.cdn.edge.name/NickName-of-EntryPoint-2/streamName/playlist.m3u8'
  ];
  window.onload = (event) => {
    new x2G_Player_HLS('videoElementID', playlistURLs);
  }
</script>
```
OR
```html
<script>
  const playlistURLs = [
    'https://regular.cdn.edge.name/streamName/playlist.m3u8',
    'https://regular.cdn.edge.name/streamName/playlist.m3u8'
  ];
  window.onload = (event) => {
    new x2G_Player_HLS('videoElementID', playlistURLs);
  }
</script>
```

Where `videoElementID` is an ID of the video element intended to play the HLS stream.  

The `playlistURLs` is an array that contain exactly **two** URLs of master playlists.  

- If you use the CDN specific implementation, the `playlistURLs` array must contain
  two different URLs of playlists published on CDN **Entry Point 1** and **Entry Point 2**.  

- If you use the hybrid implementation, the `playlistURLs` array must contain 
  two identical URLs of playlists published on **Origin 1** and **Origin 2**.  

---

#### Examples:

Check the HTML files in the [examples folder](./examples/)  
Check the [comments](./examples/comments.md).  

---
