$(() => {
            let signIn = $("#signIn");
            // console.log(signIn) 
            let login = (inputEmail, inputPassword) => {
                return new Promise((resolve, reject) => {
                        $.ajax({
                            type: "POST",
                            url: "http://localhost:3000/users/login",
                            data: {
                                inputEmail,
                                inputPassword
                            },
                            success(data) {
                                // console.log(data)
                                resolve(data)
                            }.fail(function(jqXHR, textStatus, errorThrown) {
                                // net::ERR_CONNECTION_REFUSED 发生时，也能进入
                                console.info("网络出错");
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
                            location.href = "../index.html";
                        } else {
                            alert('帐号密码错误');
                        }
                    })
                })