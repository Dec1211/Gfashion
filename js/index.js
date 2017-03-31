/*注册框*/
/*功能点1：判断页面中form表单的用户名、密码是否符合要求*/
$("input[name=username]").blur(function () {
  var uname = $("input[name=username]").val();
  $.ajax({
    type: 'POST',
    url: "data/register_selecte.php",
    data: {uname: uname},
    success: function (txt) {
      if (txt == 'find') {
        $("input[name=username]").next().html("用户名已存在").addClass("err");
      }
    }
  })
  if (this.validity.valueMissing) {
    $(this).next().html("用户名不能为空").addClass("err");
  }
  else if (this.validity.tooShort) {
    $(this).next().html("用户名长度过短").addClass("err");
  }
  else if (this.validity.patternMismatch) {
    $(this).next().html("用户名包含特殊字符").addClass("err");
  }
  else {
    $(this).next().html("用户名未被使用").addClass("succ");
  }
})
$("input[name=username]").focus(function () {
  $(this).next().attr("class", "normal").html("请输入4至8位数字，英文或中文");
})
$("input[name=userpwd]").blur(function () {
  if (this.validity.tooShort) {
    $(this).next().html("密码长度过短").addClass("err");
  }
  else if (this.validity.valueMissing) {
    $(this).next().html("密码不能为空").addClass("err");
  }
  else {
    $(this).next().html("密码通过").addClass("succ");
  }
})
$("input[name=userpwd]").focus(function () {
  $(this).next().attr("class", "normal").html("请输入6到12位密码");
})

/*功能点2：点击注册按钮，验证用户注册信息，注册成功跳转到主页*/
$("#bt-register").click(function (e) {
  e.preventDefault();
  var uname = $("input[name=username]").val();
  var upwd = $("input[name=userpwd]").val();
  $.ajax({
    type: 'POST',
    url: 'data/register_add.php',
    data: {uname: uname, upwd: upwd},
    success: function (txt) {
      if (txt == 'ok') {
        $(".modal").fadeOut(300);
        location.href = "home.html";
        sessionStorage["loginName"] = uname;

      }
      else if (txt == '{}') {
        //如果用户名为空，用户名输入框获取焦点
        if ($("input[name=username]").val() == "") {
          $("input[name=username]").focus();
          $("input[name=username]").next().html("User name cannot be empty").addClass("err");
        }
        //如果密码为空，密码输入框获取焦点
        else if ($("input[name=userpwd]").val() == "") {
          $("input[name=userpwd]").focus();
          $("input[name=userpwd]").next().html("Password cannot be empty").addClass("err");
        }
      }
    }
  })
})

/*功能点3：点击“登录”跳转到登录框*/
$("a.login").click(function (e) {
  e.preventDefault();
  $("div.modal-register").hide();
  $("div.modal-dialog").fadeIn(200);
})

/*功能点4：点击登录按钮，验证用户登录信息*/
$("#bt-login").click(function () {
  var uname = $("input[name=uname]").val();
  var upwd = $("input[name=upwd]").val();
  $.ajax({
    type: 'POST',
    url: 'data/login.php',
    data: {uname: uname, upwd: upwd},
    success: function (txt) {
      if (txt == 'succ') {
        $(".modal").fadeOut(300);
        location.href = "home.html";
        sessionStorage["loginName"] = uname;
      }
      else if (txt == 'err') {
        $("p.alert").html("登录失败！请核对用户名、密码");
      }
    }
  })
})