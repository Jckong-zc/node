$(() => {
    let signIn = $("#signIn");
    // console.log(signIn) 
    let login = (inputEmail, inputPassword) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: "http://39.96.73.64:3000/users/login",
                data: {
                    inputEmail,
                    inputPassword
                },
                success(data) {
                    // console.log(data)
                    resolve(data)
                }
            })
        })
    }
    signIn.click(async() => {
        // console.log(44)
        let inputEmail = $("#inputEmail").val();
        let inputPassword = $("#inputPassword").val();
        let data = await login(inputEmail, inputPassword);
        // console.log(data)
        if (data.status === 'success') {
            localStorage.setItem("token", data.token);
            localStorage.setItem("name", inputEmail);
            location.href = "../index.html";
        } else {
            alert('帐号密码错误');
        }
    })
})