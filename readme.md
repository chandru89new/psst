# Psst.

Psst is a simple plugin to capture any text or image file that's thrown at your app.

Use `psst` to handle drag-drop of files (image files) and to handle paste events (Ctrl+v).

# Demo

Right here: [druchan.com/psst][0]

# Using Psst

$('#elem').psst();

Now, anytime someone pastes or drags-n-drops into #elem, psst will fire up and do the laundry.

You can access the result in a global variable called `psst`. [Try the demo][0].

Typically, `#elem` should span the whole viewport. Also typically, `#elem` is `body` or `html`.

Important note: Don't use any variable called `psst` in your app. Because this plugin will be using it, flushing it and reusing it.

[0]: http://druchan.com/psst/