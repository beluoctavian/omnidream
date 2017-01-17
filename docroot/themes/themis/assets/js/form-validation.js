"use strict";

//
// Form validation
//
  var label   = $('form').find('label').css('color');

  $("button[type=submit]").on("click", function() {

      var form    = $(this).parents().find('form');
      var proceed = true;

      $(form).find('label').each(function() {
        $(this).css('color', label);
      });

      // check if required field is not empty
      $(form).find("*[required]").each(function(){
          $(this).css('border-color','');
          if(!$.trim($(this).val())){
              $(this).css('border-color', primaryColor);
              $(this).prev('label').css('color', primaryColor);
              proceed = false;
          }
          //check if email adress is valid; example: test@test.com
          var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
          if($(this).attr("type")=="email" && !email_reg.test($.trim($(this).val()))){
              $(this).css('border-color', primaryColor);
              $(this).prev('label').css('color', primaryColor);
              proceed = false;
          }
      });

      if(proceed) // if all required form fields are filled, proceed data to next step
      {
        console.log('Everything is ok.');
      }
  });
