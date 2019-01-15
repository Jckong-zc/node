$(() => {
    // console.log(555)
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

        let islogin = await autologin();
        if (!islogin.status) {
            location.href = "../login.html";
        }

    })()
    $("button").click(function() {
        console.log(6666)
        var name = $("#name").val();
        let age = $("#age").val();
        let price = $("#price").val();
        let city = $("#city").val();

        let getUserList = () => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    type: "POST",
                    url: "http://39.96.73.64:3000/users/findUser",
                    data: { "name": name },
                    success(data) {
                        resolve(data)
                        console.log(data)
                    }
                })
            })
        };

        (async() => {
            let data = await getUserList();
            let islogin = await autologin();
            if (!islogin.status) {
                location.href = "../login.html";
            }
            var name = $("#name").val();
            // console.log(name)
            if (data != "") {
                console.log(data[0])
                alert("信息已重复:name：" + data[0].name)
            } else {
                $.ajax({
                    type: "post",
                    url: "http://39.96.73.64:3000/users/insert",
                    data: {
                        "name": name,
                        "age": age,
                        "price": price,
                        "city": city
                    },
                    success(data) {
                        console.log(data)
                        location.href = "../dashboard.html"
                    }

                })
            }
        })()




        $("#out").on("click", function() {
            // console.log(666)
            localStorage.removeItem("token")
            location.href = "./login.html"
        })
    });





})