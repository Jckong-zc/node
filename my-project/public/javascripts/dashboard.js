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
                return `
                        <tr>
                            <td>${item._id}</td>
                            <td>${item.name}</td>
                            <td>${item.age}</td>
                            <td>${item.price}</td>
                            <td>${item.city}</td>
                        </tr>            
                    `
            }).join("");
            $("#list").html(html)
        } else {
            location.href = "../login.html";
        }
    })()

    $("#findname").on("click", function() {
        var app = $("#xuan").val()
            // console.log(app)
        let name = $("#name").val();
        var obj = {};
        var aa = $("#xuan").val();
        var bb = $("#name").val();
        obj[aa] = bb
        console.log(obj)
        if (name == "") {
            alert("请输入内容")
        }
        console.log(name);
        let getUserListMore = () => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    type: "POST",
                    url: "http://localhost:3000/users/findMore",
                    data: obj,
                    success(res) {
                        console.log(res)
                        resolve(res)
                    }
                })
            })

        };
        (async() => {
            let res = await getUserListMore();
            let html = res.map((item, idx) => {
                return `
                        <tr>
                            <td>${item._id}</td>
                            <td>${item.name}</td>
                            <td>${item.age}</td>
                            <td>${item.price}</td>
                            <td>${item.city}</td>
                        </tr>            
                    `
            }).join("");
            $("#list").html(html)
        })()
    })

    $("#out").on("click", function() {
        console.log(666)
        localStorage.removeItem("token")
        location.href = "./login.html"
    })
})