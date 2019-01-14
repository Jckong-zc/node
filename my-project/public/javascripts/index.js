$(() => {
    $("#out").on("click", function() {
        // console.log(666)
        localStorage.removeItem("token")
        location.href = "./login.html"
    })


    let autologin = () => {
        return new Promise((resolve, rejects) => {
            $.ajax({
                type: "POST",
                headers: {
                    token: localStorage.getItem("token")
                },
                url: "http://localhost:3000/users/autologin",
                success(res) {
                    console.log(res)
                    resolve(res)
                }
            })
        })
    };
    (async() => {
        let islogin = await autologin();
        if (!islogin.status) {
            location.href = "../login.html";

        }
    })()

    var fileNode = $("#file");
    fileNode.change(function() {
        console.log(fileNode[0].files)
        let data = new FormData();
        data.append("abc", fileNode[0].files[0])

        console.log(data)

        $.ajax({
            type: "POST",
            url: "http://localhost:3000/users/upload",
            processData: false,
            contentType: false,
            Header: ("If-Modified-Since", "0"),
            data: data,
            success: function(data) {
                // console.log(data)
                // var aa = data.file.filename
                // var bb = localStorage.setItem("img", aa);
                $("#img").attr("src", `http://localhost:3000/${data.file.filename}`)
                console.log(data.file.filename)
            }
        });
        fileNode.val()
            // $("#img").attr("src", `http://localhost:3000/${data.file.filename}`)
    })
























})