// https://stackoverflow.com/questions/12954529/jquery-html5-file-drag-and-drop
// Custom file drop extension
$.fn.extend({
    filedrop: function (options) {
        var defaults = {
            callback: null
        }
        options = $.extend(defaults, options)
        return this.each(function () {
            var files = []
            var $this = $(this)

            // Stop default browser actions
            $this.bind('dragover', function (event) {
                event.stopPropagation()
                event.preventDefault()
                // console.log('dragover', event.target.classList)
                if (!event.target.classList.contains('dragin'))
                    event.target.classList.add('dragin')
            })

            // Stop default browser actions
            $this.bind('dragleave', function (event) {
                event.stopPropagation()
                event.preventDefault()
                // console.log('dragleave', event.target.classList)
                if (event.target.classList.contains('dragin'))
                    event.target.classList.remove('dragin')
            })

            // Catch drop event
            $this.bind('drop', function (event) {
                // Stop default browser actions
                event.stopPropagation()
                event.preventDefault()
                
                var elem = event
                elem.target.classList.remove('dragin')
                // Get all files that are dropped
                files = event.originalEvent.target.files || event.originalEvent.dataTransfer.files
                options.callback && options.callback(elem.target, files)
                return false

                // Convert uploaded file to data URL and pass trought callback
                // if(options.callback) {
                //     var reader = new FileReader()
                //     reader.onload = function(event) {
                //         options.callback(event.target.result)
                //     }
                //     reader.readAsDataURL(files[0])
                // }

                if (options.callback) {
                    for (i = 0; i < files.length; i++) {
                        var reader = new FileReader()
                        reader.onload = function (event) {
                            options.callback(elem.target, event.target.result)
                        }
                        reader.readAsDataURL(files[0])
                    }
                }
                return false
            })
        })
    }
})


// Event listener filedropper
// $('.dropbox').filedrop({
//     callback : function(target, fileEncryptedData) {
//         // a callback?
//     }
// })

