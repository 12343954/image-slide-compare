function getObjectURL(file) {
    if (window.createObjectURL != undefined) {
        return window.createObjectURL(file);
    }

    if (window.URL != undefined) {
        return window.URL.createObjectURL(file);
    }

    if (window.webkitURL != undefined) {
        return window.webkitURL.createObjectURL(file);
    }
    return null;
}

function imageLoaded(image) {
    var img = new Image();
    img.onload = function () {
        const { width, height } = this;
        const afx = image.id.substring(0, image.id.indexOf('Image'))
        $(`#${afx}Description > .size`).html(`${width} <i>x<i> ${height}`)
    }
    img.src = image.src;
}

function changeDescription(filename, target) {
    $('#' + target + ' > .name').html(filename)
    $(`#${(target.startsWith('before') ? 'left' : 'right')}tag`).val(filename)
}

$('#leftInputImage').change(function () {
    let src = getObjectURL($(this)[0].files[0]);
    $('#beforeImage').attr('src', src);
    changeDescription($(this)[0].files[0].name, 'beforeDescription');
});

$('#rightInputImage').change(function () {
    let src = getObjectURL($(this)[0].files[0]);
    $('#afterImage').attr('src', src);
    changeDescription($(this)[0].files[0].name, 'afterDescription');
});

$('#lefttag').change(function () {
    document.querySelector("#beforeDescription > .name").innerHTML = document.getElementById('lefttag').value;
});

$('#righttag').change(function () {
    document.querySelector("#afterDescription > .name").innerHTML = document.getElementById('righttag').value;
});

$('#titlebox').change(function () {
    document.getElementById("battletitle").innerHTML = document.getElementById('titlebox').value;
});

$('.files').filedrop({
    callback: function (target, files) {
        if (target.id == 'file1') {
            document.getElementById('lefttag').value = files[0].name
            document.getElementById('lefttag').dispatchEvent(new Event("change"));
            document.getElementById('leftInputImage').files = files
            document.getElementById('leftInputImage').dispatchEvent(new Event("change"));
        } else if (target.id == 'file2') {
            document.getElementById('righttag').value = files[0].name
            document.getElementById('righttag').dispatchEvent(new Event("change"));
            document.getElementById('rightInputImage').files = files
            document.getElementById('rightInputImage').dispatchEvent(new Event("change"));
        }
    }
})