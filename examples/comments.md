### Comments  

---


The wrapper is not compatible with **v1.5.0** and later versions of `hls.js`.  
Starting from **v1.5.0** `hls.levels.url[]` array contain only current URL but NO redundant URL.  

---


#### Notes for All Examples  
The `wrapper-hls.js` and `wrapper-hls-exp.js` accept as a second parameter an array of playlist URLs.  
```js
new x2G_Player_HLS('video', playlistURLs);
```
The `playlistURLs` array must contain **two** URLs to redundant streams,
as explained in [this note](https://2g-lab.github.io/2G-Notes/2022-02-28.make-HLS-great-again/HLS-Study-2022.html).  

- If the CDN specific implementation is used, the `playlistURLs` array must contain
two different URLs of playlists published on **Entry Point 1** and **Entry Point 2**.  

- If the hybrid implementation is used, the `playlistURLs` array must contain
two identical URLs of playlists published on **Origin 1** and **Origin 2**.  

---

#### Examples List  

#### [TEST-HLS-Live-11](./TEST-HLS-Live-11.html)  
- `wrapper-hls.js` is in use;  
- Single player on the page;  

#### [TEST-HLS-Live-12](./TEST-HLS-Live-12.html)  
- `wrapper-hls.js` is in use;  
- Single player on the page;  
- The `player` object is declared as a global variable.  
  Thus it is available from a browser console.  

#### [TEST-HLS-Live-21](./TEST-HLS-Live-21.html)  
- `wrapper-hls.js` is in use;  
- Multiple players on the same page;  

#### [TEST-HLS-Live-22](./TEST-HLS-Live-22.html)  
- `wrapper-hls.js` is in use;  
- Multiple players on the same page;  
- The `player_1` and `player_2` objects are declared as global variables.  
  Thus they are available from a browser console.  

#### [TEST-HLS-Live](./TEST-HLS-Live.html)  
- `wrapper-hls-exp.js` is in use;  
- Multiple players on the same page;  
- The `player_1` and `player_2` objects are declared as global variables.  
  Thus they are available from a browser console.  

---
