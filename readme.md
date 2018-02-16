# Psst.

Psst is a simple plugin to handle drag-dropped files (images) and paste events on your web app.

When someone pastes an image (from clipboard / screenshot) or drops an image file on your web app, Psst will process the event and give you the data in a nice JSON format. You won't have to write the JS to check, validate and get the data &mdash; whether it is text or image.

# How it works

1. You init the plugin by calling it on some element. Typically, the `body`.
2. When someone pastes an image (from clipboard), the plugin will convert that into base64 and output the result in a global object `psst`. You should be able to access `psst` from anywhere in your app.
3. Ditto for drag-drop.

If someone pastes or drops plain text, Psst will handle it too.

# Demo

Right here: [druchan.com/psst][0]

# Using Psst

```
$('#elem').psst();
```

Now, anytime someone pastes or drags-n-drops into `#elem`, Psst will fire up and do the laundry.

You can access the result in a global variable called `psst`. [Try the demo][0].

The `psst` object looks like this:

```
psst = {
    time: 154545346376, // (unix time format)
    isImage: true, // tells you if the data is an image
    image: .... // base64 data (null if isImage is false)
    text: ..... // if isImage is false, the data is most likely text. that's saved in this key
}
```

Typically, `#elem` should span the whole viewport. Also typically, `#elem` is `body` or `html`.

Important note: Don't use any variable called `psst` in your app. Because this plugin will be using it, flushing it and reusing it.

# Todo

- [ ] make file format options customizable 
- [ ] handle onloadend if error
- [ ] Release minified version

[0]: http://druchan.com/psst/