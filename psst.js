// init the psst object
var psst = {};

// the psst object will look like this:
// psst = {
//     time: 15123123514,
//     isImage: true,
//     image: "data:image/png;base64:jfklasjdflasjfalsjf",
//     text: null,
// }

jQuery.fn.psst = function(){

    var elem = $(this);

    var getBase64 = (data) => {
        return new Promise((resolve, reject) => {
            var f = new FileReader();
            f.readAsDataURL(data);
            f.onloadend = function(){
                resolve(f.result);
            }
        });
    }

    elem.on("dragover", function(e){
        e.preventDefault();
    });
    elem.on("drop", function(e){
        e.preventDefault();
        // handle the dropped file
        getDataFromDrop(e);
    });
    elem.on("dragend", function(e){
        e.preventDefault();
    });

    var getDataFromDrop = (e) => {
        
        // init
        psst = {};

        // check if it's a file
        var isFile = (e.originalEvent.dataTransfer.files.length) ? true : false;

        // if file
        if (isFile) {
            
            // check if image file
            // if image file, get base64
            var allowed = ['jpg', 'png', 'gif', 'jpeg'];
            var fileExtension = e.originalEvent.dataTransfer.files[0].name.split('.').pop().toLowerCase();
            if (allowed.indexOf(fileExtension) >= 0) {
                
                var data = e.originalEvent.dataTransfer.files[0];

                getBase64(data)
                .then(function(result){
                    psst.isImage = true;
                    psst.image = result;
                    psst.time = Date.now();
                    psst.text = null;
                    return;
                })
                .catch(function(err){
                    console.log("Something went wrong when converting image data to base64.");
                    return;
                });
            }
            // else do nothing
            else {
                psst = "It wasn't an image file.";
                return;
            }
        }
        // if not file
        else {
            psst.isImage = false;
            psst.image = null;
            psst.time = Date.now();
            psst.text = (e.originalEvent.dataTransfer.getData('text'));
            return;
        }
    }

    $(elem).on('paste', function(e){

        // init
        psst = {};

        var clip = e.originalEvent.clipboardData;
        var items = (clip.items) ? clip.items : null;
        var type = (items[1]) ? items[1].type : items[0].type;

        if (!type) return;

        // if image, get base64
        if (type.indexOf('image') === 0) {
            var data = (items[1]) ? items[1].getAsFile() : items[0].getAsFile();
            getBase64(data)
            .then(function(result){
                psst.isImage = true;
                psst.image = result;
                psst.time = Date.now();
                psst.text = null;
                return;
            })
            .catch(function(err){
                console.log("Something went wrong while converting the data to base64.");
                return;
            });
        }
        // else (if not image)
        else { 
            psst.isImage = false;
            psst.image = null;
            psst.time = Date.now();
            psst.text = clip.getData('text');
            return;
        }

    });

    return;
}