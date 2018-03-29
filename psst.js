// prevent drag events from firing browser default behavior
document.addEventListener('dragover', function(e){ e.preventDefault() }, false);
document.addEventListener('dragend', function(e){ e.preventDefault() }, false);
document.addEventListener('drop', function(e){ e.preventDefault() }, false);

// psst(e)

var psst = (e, allowed) => {
    
    return new Promise( (resolve, reject) => {
        // if there is no event
        if (!e) {
            reject({
                status: "failure",
                message: "psst(e) received a non-event for 'e'"
            });
            return;
        }

        var getBase64 = (data) => {
            return new Promise((resolve, reject) => {
                var f = new FileReader();
                f.readAsDataURL(data);
                if (f.error) {
                    reject(f.error);
                }
                f.onloadend = function(){
                    resolve(f.result);
                }
            });
        }

        // find out if it's drop or paste
        if (e.dataTransfer) {

            // if it's drop, get filename
            var filename = (e.dataTransfer.files[0]) ? e.dataTransfer.files[0].name : null;

            if (!filename) {
                reject({
                    status: "failure",
                    message: "For some reason, the dropped file couldn't be handled."
                });
                return;
            }

            // test if filetype is allowed
            var filetypes = ['jpg', 'png', 'jpeg'];
            if (allowed && Object.prototype.toString.call(allowed) == '[object Array]'){
                allowed.forEach( (item) => {
                    filetypes.push(item);
                });
            }

            var extension = filename.split('.').pop().toLowerCase();

            if (filetypes.indexOf(extension) < 0) {
                reject({
                    status: "failure",
                    message: "This filetype is not allowed."
                });
                return;
            }

            // test if file is image
            var type = e.dataTransfer.files[0].type;
            if (type.indexOf("image") >= 0) {
                // process image file
                getBase64(e.dataTransfer.files[0])
                .then(function(result) {
                    resolve({
                        status: "success",
                        time: Date.now(),
                        type: "image",
                        data: result
                    });
                    return;
                })
                .catch(function(error) {
                    console.error(error);
                    return;
                });
            }
            // else, this is not an image file
            else {
                reject({
                    status: "failure",
                    message: "This type of a file can't be processed because it's not an image."
                });
                return;
            }
            

        }

        // if paste, get paste data
        else if (e.clipboardData) {

            // extract the item
            var items = (e.clipboardData.items) ? e.clipboardData.items : false;

            if (!items.length) {
                reject({
                    status: "failure",
                    message: "No data in clipboard."
                });
                return;
            }

            // if image file
            var type = (items[1]) ? items[1].type : items[0].type;
            
            if (!type) {
                reject({
                    status: "failure",
                    message: "Couldn't detect clipboard data."
                });
                return;
            }

            if (type.indexOf("image") >= 0) {
                // process image file, get base64 data
                var data = (items[1]) ? items[1].getAsFile() : items[0].getAsFile();
                getBase64(data)
                .then(function(r){
                    resolve({
                        status: "success",
                        time: Date.now(),
                        type: "image",
                        data: r
                    });
                    return;
                })
                .catch(function(err){
                    console.error(err);
                    return;
                });
            }
            // else, extract clipboard text data
            else {
                resolve({
                    status: "success",
                    time: Date.now(),
                    type: "text",
                    data: e.clipboardData.getData('text')
                });
                return;
            }
        }
    });
}