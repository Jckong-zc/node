$(() => {
    // console.log(555)
    let getUserList = () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: "http://39.96.73.64:3000/users/findUser",
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
                url: "http://39.96.73.64:3000/users/autologin",
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
                return `<tr>
                            <td>${item._id}</td>
                            <td>${item.name}</td>
                            <td>${item.age}</td>
                            <td>${item.price}</td>
                            <td>${item.city}</td>
                        </tr> `
            }).join("");
            $("#list").html(html)
        } else {
            location.href = "../login.html";
        }
    })()
    $("button").click(function() {
        let obj = {}

        var aa = $("#xuan").val();
        var bb = $("#tips").val();
        obj[aa] = bb
        console.log(obj)

        // let tips = $("#tips").val();
        if (tips == "") {
            alert("请输入名字")
        } else {
            $.ajax({
                type: "post",
                url: "http://39.96.73.64:3000/users/del",
                data: obj,
                success(ins) {
                    console.log(ins)
                    if (ins.n == 0) {
                        alert("信息错误");
                        return;
                    }
                }
            });
            let getUserList = () => {
                return new Promise((resolve, reject) => {
                    $.ajax({
                        type: "POST",
                        url: "http://39.96.73.64:3000/users/findUser",
                        success(data) {
                            resolve(data)
                        }
                    })
                })
            };
            (async() => {
                let data = await getUserList();
                let html = data.map((item, idx) => {
                    return ` <tr>
                                    <td>${item._id}</td>
                                    <td>${item.name}</td>
                                    <td>${item.age}</td>
                                    <td>${item.price}</td>
                                    <td>${item.city}</td>
                                </tr> `
                }).join("");
                $("#list").html(html)
            })()
        }
    });
    $("#out").on("click", function() {
        console.log(666)
        localStorage.removeItem("token")
        location.href = "./login.html"
    })




})