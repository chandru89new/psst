# Psst

This is a simple JS library to handle paste / drag-drop events in your web app.

### Demo

[Right here][0]

### How it works

- Include the library in your web app: ```<script src="js/psst.js"></script>```
- Add listeners for `paste` or `drop` events: `document.addEventListener('drop', function(){}, false)`
- Inside the listener, just call `psst(e)`:

```
document.addEventListener('drop', function(e){
    psst(e)
    .then(function(result){
        console.log(result);
        // result is a JSON object that contains all data about the file/data that was just dropped/pasted into your app
    })
    .catch(function(error){
        console.error(error);
    });
}, false);
```

### What you'll find in `result` / `error`

**If user pastes / drops an image file**   
```
result = {
   type: "image",
   data: "...", // base64 data of image file
   time: 154534523423 // unix timestamp
}
```

**If user drops a non-image file**   
```
error = "This type of a file can't be processed because it's not an image."
```

(in the next iteration, psst() will begin to handle text/text-based files like .txt, .md, .htm).


**If user drops a file which is not allowed**   
```
error = "This filetype is not allowed."
```

By default, the filetypes allowed are `jpg`, `png` and `jpeg` but you can add more filetypes.

If you want to add filetypes like `md` and `txt`, put them in an array and then, pass that into the `psst(e)` function like so:

```
arr = ['md','txt'];
psst(e, arr)
```

Note that in this version, psst() doesn't handle text files yet. So even if you allow the file, it wont process it. Just says it can't handle the file because it's not an image. Next version will handle text files.

**If user pastes an image from clipboard**
```
result = {
   type: "image",
   data: "...", // base64 data of image file
   time: 154534523423 // unix timestamp
}
```

**If user pastes text from clipboard**
```
result = {
   type: "text",
   data: "...", // clipboard text
   time: 154534523423 // unix timestamp
}
```

**If user pastes but clipboard is empty (or some other issue with clipboard data and therefore can't be read)**
```
error = "No data in clipboard."
OR
error = "Couldn't detect clipboard data."
```

##### Todos

- [ ] Handle errors in FileReader
- [ ] Handle text-based files and output content as result.data

[0]: http://druchan.com/psst/