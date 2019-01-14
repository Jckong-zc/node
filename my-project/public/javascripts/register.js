$(() => {
        console.log(666)
        $("#register").on("click", function() {
            console.log(666)
            var re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
            var email = $(".email").val();
            var password = $(".password").val();
            if (email == "" && password == "") {
                alert("信息不能为空")
            } else if (email != "" && re.test(email)) {
                $.post("http://localhost:3000/users/findemail", {
                    "email": email,
                    "password": password,
                }, function(res) {
                    console.log(res)
                    if (res[0].email == email) {
                        alert("该邮箱已注册")
                    }
                })
            }
        })
        $("#out").on("click", function() {
            console.log(666)
            location.href = "./login.html"
        })
    })
    // $.post("http://localhost:3000/users/register", {
    //     "email": email,
    //     "password": password,
    // }, function(res) {
    //     location.href = "./login.html"
    // })