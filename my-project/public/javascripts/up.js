$(() => {
    let getUserList = () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: "http://localhost:3000/users/findUser",
                success(data) {
                    resolve(data)
                }
            })
        })

    };
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
        let data = await getUserList();
        let islogin = await autologin();
        if (islogin.status) {
            let html = data.map((item, idx) => {
                return ` <tr>
                            <td>${item._id}</td>
                            <td>${item.name}</td>
                            <td>${item.age}</td>
                            <td>${item.price}</td>
                            <td>${item.city}</td>
                            <td><button type="submit" class="btn btn-primary" id="upbtn"><span>修改</span></button></td>
                        </tr> `
            }).join("");
            $("#list").html(html)
        } else {
            {
                location.href = "../login.html";
            }
        }
    })();
    $("#list").on("click", "button", function() {

        var name = $(this).parent().prevAll().eq(3).text()
        console.log(name)
        $('#name').html(name);
        $('#price').val("");
        $('#age').val("");
        $('#city').val("");
        $("#cb").show()
    });
    $("#cb").on("click", "span", function() {
        $("#cb").hide();
        $('#price').val("");
        $('#age').val("");
        $('#city').val("");

    });
    $("#cb").on("click", "button", function() {
        var name = $(this).prevAll().eq(3).children().text()
        var obj = {};
        obj.name = name
        obj.price = $('#price').val();
        obj.age = $('#age').val();
        obj.city = $('#city').val();
        console.log(obj)
        let getUserList = () => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    type: "POST",
                    url: "http://localhost:3000/users/up",
                    data: obj,
                    success(res) {
                        resolve(res)
                    }
                })
            })
        };
        (async() => {
            let res = await getUserList();
            let html = res.map((item, idx) => {
                return `
                        <tr>
                            <td>${item._id}</td>
                            <td>${item.name}</td>
                            <td>${item.age}</td>
                            <td>${item.price}</td>
                            <td>${item.city}</td>
                            <td><button type="submit" class="btn btn-primary" id="upbtn"><span>修改</span></button></td>
                        </tr>           
                    `
            }).join("");
            $("#list").html(html)
        })()
        window.location.reload()
    });
    $("#out").on("click", function() {
        console.log(666)
        localStorage.removeItem("token")
        location.href = "./login.html"
    })

})