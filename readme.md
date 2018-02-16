# Psst.

Psst is a simple plugin to capture any text or image file that's thrown at your app.

People can paste a text or an image, drag-n-drop a file(image) on your app - and the plugin will handle it all. No questions asked.

The plugin can be called on any element but ideally, it should be called on an element that spans the whole of viewport so anytime someone does "Ctrl+V" or drops something into your web app, it's handled magically. Just like how Slack does it. Try pasting anything, anywhere in Slack.

When you paste a text, the plugin will return that text as-is (with some escaping and sanitization).

When you paste an image you copied from a webpage/document (or a screenshot that's in the clipboard), it will give you the base64 data of that image. You can choose to do whatever with it.

When you drag-n-drop highlighted-text, it gives you the text. If the drag-drop is a file, it checks if the file is an image. If yes, it will give you the base64 data of the image. If not, it will tell you that it's not an image.

# Using Psst

$('#elem').psst();

Now, anytime someone pastes or drags-n-drops into #elem, psst will fire up and do the laundry.

You can access the result in a global variable called `psst`.

Important note: Don't use any variable called `psst` in your app. Because this plugin will be using it, flushing it and reusing it.

# Demo

Right here: [druchan.com/psst](http://druchan.com/psst/)