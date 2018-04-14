# Psst

This is a simple JS library to handle paste / drag-drop events in your web app.

### Demo

[Right here][0]

### How it works

- Include the library in your web app: ```<script src="js/psst.js"></script>```
- Add listeners for `paste` or `drop` events: `document.addEventListener('drop', function(e){}, false)`
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
    status: "success",
    type: "image",
    data: "...", // base64 data of image file
    time: 154534523423 // unix timestamp
}
```

**If user drops a text-based file (like html, md, txt etc)**   
```
result = {
    status: "success",
    type: "file",
    data: "....." (truncated text content of the file),
    time: 154534523423 // unix timestamp
}
```

(psst() uses the HTML 5 File API to read files)

**If user drops a file which is not allowed**   
```
error = {
    status: "failure",
    message: "This filetype is not allowed."
}
```

By default, the filetypes allowed are `jpg`, `png` and `jpeg` but you can add more filetypes.

If you want to add filetypes like `md` and `txt`, put them in an array and then, pass that into the `psst(e)` function like so:

```
arr = ['md','txt'];
psst(e, arr)
```

**If user pastes an image from clipboard**
```
result = {
    status: "success",
    type: "image",
    data: "...", // base64 data of image file
    time: 154534523423 // unix timestamp
}
```

**If user pastes text from clipboard**
```
result = {
    status: "success",
    type: "text",
    data: "...", // clipboard text
    time: 154534523423 // unix timestamp
}
```

**If user pastes but clipboard is empty (or some other issue with clipboard data and therefore can't be read)**
```
error = {
    status: "failure",
    message: "No data in the clipboard" // or "Couldn't detect clipboard data."
}
```

##### Todos

- [x] Send errors as object to reject() instead of string
- [x] Handle errors in FileReader
- [x] Handle text-based files and output content as result.data

[0]: http://druchan.com/psst/