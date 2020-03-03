
(function ($)
{
    "use strict";


    /*==================================================================
    [ Focus input ]*/
    $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })
    })


    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');


    $('.validate-form').on('submit',function()
    {
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        //find element by name
        var foundUsrName = $("input[name=username]").length;
        if(foundUsrName)
        {
            // Process SignUp pagehtmlFd
            var usrname = $("input[name=username]").val();
            var passwd = $("input[name=pass]").val();
            var pin = $("input[name=pin]").val();
            var cpin = $("input[name=cpin]").val();

            hideSignUpTexts();

            //Check for PIN validity
            if(!($.isNumeric(pin)))
            {
              $(".txt6").css("display","block");
              check = false;
              return check;
            }

            if(pin.length != 4)
            {
              $(".txt7").css("display","block");
              check = false;
              return check;
            }

            if(pin != cpin)
            {
              $(".txt8").css("display","block");
              check = false;
              return check;
            }

            showSignUpSuccessTexts();
            sendUsrPintoServer(usrname, pin);
        }
        else
        {
            // Process Login page

            //Hide "Invalid Pin" text
            $(".txt9").css("display","none");

            //Get user input PIN
            var usrPin = $("input[name=pin]").val();

            if(usrPin == savedpin)
            {
              // alert("Success");
              window.location.href = "http://127.0.0.1:5000/workspace";
            }
            else
            {
              //Hide "Haven't signed up" & "SignUp" text
              $(".txt1").css("display","none");
              $(".txt2").css("display","none");
              //Show "Invalid Pin" text
              $(".txt9").css("display","block");
            }
        }
        return false;
    });


    $('.validate-form .input100').each(function()
    {
        $(this).focus(function(){
           hideValidate(this);
        });
    });

  function validate (input)
  {
      if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
          if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
              return false;
          }
      }
      else {
          if($(input).val().trim() == ''){
              return false;
          }
      }
  }


	function hideSignUpTexts()
  {
    $(".txt6").css("display","none");
    $(".txt7").css("display","none");
    $(".txt8").css("display","none");
    $(".txt4").css("display","none");
    $(".txt5").css("display","none");
	}

  function showSignUpSuccessTexts()
  {
    $(".txt4").css("display","block");
    $(".txt5").css("display","block");
  }

  function showValidate(input)
  {
        var thisAlert = $(input).parent();
        $(thisAlert).addClass('alert-validate');
  }

  function hideValidate(input)
  {
        var thisAlert = $(input).parent();
        $(thisAlert).removeClass('alert-validate');
  }

  function sendUsrPintoServer(un, pin)
  {
    let formdata = new FormData();
    formdata.append("user", un);
    formdata.append("pin", pin);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://127.0.0.1:5000/save", true);
    xhr.send(formdata);
  }

})(jQuery);
