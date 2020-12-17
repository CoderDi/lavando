function limitInput( k, obj ) {
  switch( k ){
          case 'ru':
                  obj.value = obj.value.replace(/[^а-яА-ЯёЁ -]/ig,'');
          break;
          case 'en':
                  obj.value = obj.value.replace(/[^a-zA-Z0-9.@!#$%&'*+-/=?^_`{|}~ -]/ig,'');           
          break;
  }
}


$(document).ready(function(){
  //удаление пробелов в числе
  function normaleNum(num) {
      return parseFloat(num.split(' ').join(''));
  }
  //добавление пробелов в число
  function formatMoney(money) {
    var format  = String(money);
    format = format.replace(/(\d{1,3}(?=(\d{3})+(?:\.\d|\b)))/g,"\$1 ");
    return format;
  } 
  //слайдер суммы займа на главной
  if ($("#bannerSumm").length) {
    $('#bannerSumm').rangeslider({
      polyfill: false,
      onSlide: function(position, value) {
        $("#bannerSummInput").val(formatMoney(value));   
      },
    });
  }

  var maybeChanceArray = [50, 75, 90, 95, 100], //массив возможной вероятности одобрения по шагам
      chanceArray = [50, 65, 75, 85, 93]; //массив достигнутой вероятности
  $(".js-dataChanceMaybe").css("width", maybeChanceArray[0] + "%");
  $(".js-dataChanceCurrent").css("width", chanceArray[0] + "%");

  //проверка корректности ввода
  $("input").focus(function(){
    $(this).removeClass("error");
    $(this).nextAll(".error-info").remove();
        
    $(this).removeClass("correct");

    if ($(this).attr("id") == "formSummInput") {
      $(this).parents(".form__summ").addClass("active");
    }
    $(".card__alert").removeClass("active");
  });
  $("input").on("input",function(){
    $(this).removeClass("error");
  });
  $("input").blur(function(){
    if (!($(this).val())) {
      $(this).addClass("error");
      $("<span class='error-info'>Заполните данное поле</span>").insertAfter($(this));
    }
    if ($(this).attr("id") == "formSummInput") {
      $(this).parents(".form__summ").removeClass("active");
    }
  });
  $("input[name=addressMatch]").change(function(){
    if ($(this).prop("checked")) {
      $("#liveAddress").removeClass("active");
      $("#liveAddress").find("input").each(function(){
        $(this).addClass("like").removeClass("error correct").nextAll(".error-info").remove();
      });
    } else {
      $("#liveAddress").addClass("active").find("input").removeClass("like");
    }
    $(".js-form-slider").slick('setPosition');
  });

  $(".js-form-slider").slick({
    arrows: false,
    infinite: false,
    autoplay: false,
    slidesToShow: 1,
    adaptiveHeight: true,
    draggable: false,
    swipe: false,
    touchMove: false,
    // accessibility: false
  });

  $(".js-form-prev").on("click", function(){
    
    var step = parseInt($(".form").attr("data-step"));
    $(".js-dataStep:nth-child(" + (step+1) + ")").removeClass("active pointed");
    $(".js-dataStep:nth-child(" + (step) + ")").addClass("active");
    if (step < 5) {
      $(".js-dataChanceMaybe").css("width", maybeChanceArray[step - 2] + "%");
      $(".js-dataChanceCurrent").css("width", chanceArray[step - 2] + "%");
      $(".js-chanceValue").text(chanceArray[step - 2] + "%");
    }
    
    if (window.innerWidth > 1170) {
      $(".js-dataStepLine i").css("height", (step - 2) * 34 + "%");
    } else {
      $(".js-dataStepLine i").css("width", (step-2) * 34 + "%");
    } 

    if ($(".form").attr("data-step") == '6') {
      $(".js-form-slider").slick('slickGoTo', 3);
      $(".js-loadingProgressLine").css("width", "0");
    } else {
      $(".js-form-slider").slick('slickPrev');
    }

    $("html, body").animate({scrollTop: $("#data").offset().top});
  });



  var pattern = /^[a-zA-Z0-9.@!#$%&'*+-/=?^_`{|}~ -]+@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/i;
  var mail = $('#mail');
  
  $(".js-form-next").on("click", function(){
    var step = parseInt($(".form").attr("data-step"));
    var errors = false;
      
    //валидация полей на текущем шаге
    $(".form__step.slick-active input").each(function(){
      if (!($(this).hasClass("like"))) {
        if (!($(this).val())) {
          $(this).addClass("error");
          if (!($(this).parents(".form__step").hasClass("form__step_card"))) {
            $("<span class='error-info'>Заполните данное поле</span>").insertAfter($(this));
          } else {
            $(".card__alert").addClass("active");
            errors = true;
          }
          errors = true;
        } else {
          $(this).addClass("correct");
        }
      }      
    });
    if (!($("input[name='soglasie']").prop("checked"))) {
      errors = true;
      $("input[name='soglasie']").parent(".soglasie").addClass("error");
    }
    if (!(mail.val().search(pattern) == 0)) {
      errors = true;
      mail.focus().addClass("error");;
    }
    if (errors) return;

    //После заполнения данных по карте переходим на страницу резльтата
    if (step == 6) {

      //Заглушка! Проверка корректности данных карты
      var good = true;
      if (good) {
        document.location.href = '/results.html';
        return;
      } else {
        $(".card__alert").addClass("active");
      }
    }


    $(".js-form-slider").slick('slickNext');    
    $(".js-dataStep:nth-child(" + (step + 2) + ")").addClass("active");
    $(".js-dataStep:nth-child(" + (step + 1) + ")").removeClass("active").addClass("pointed");
    if (step < 5) {
      $(".js-dataChanceMaybe").css("width", maybeChanceArray[step] + "%");
      $(".js-dataChanceCurrent").css("width", chanceArray[step] + "%");
      $(".js-chanceValue").text(chanceArray[step] + "%");
    }
    if (window.innerWidth > 1170) {
      $(".js-dataStepLine i").css("height", (step) * 34 + "%");
    } else {
      $(".js-dataStepLine i").css("width", (step) * 34 + "%");
    } 

    
    $("html, body").animate({scrollTop: $("#data").offset().top});
  });
  $('.js-form-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
    $(".form").attr("data-step", nextSlide + 1);
    $(".js-formHeaderTitle").text($('.form__step:nth-child(' + (nextSlide + 1) + ') .js-stepTitle').text());
    
    
  });
  $('.js-form-slider').on('afterChange', function(slick, currentSlide){
    if ($(".form").attr("data-step") == '5') {
      
      //Это заглушка! Здесь выполняете проверку данных (если она конечно будет:))
      //При успешной проверке нужно выполнить $(".js-form-slider").slick('slickNext');
      //Если нужно вернуться, то $(".js-form-slider").slick('slickPrev');
      $(".js-loadingProgressLine").css("width", "100%");
      $(function() {	
        $({numberValue: 0}).animate({numberValue: 280}, {
          duration: 4500,
          easing: "linear",
          step: function(val) {
            $("#js-loadingProgressText").html(Math.ceil(val)); 
          }       
        });      
      });
      setTimeout(function(){
        $(".js-form-slider").slick('slickNext');
        $("html, body").animate({scrollTop: $("#data").offset().top});
      }, 5000);


    }
  });
  
  $("a[href^='#']").click(function(){
    var _href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top - $(".header").height()});
    return false;
  });
  
  $(".js-steps-slider").slick({
    arrows: false,
    infinite: false,
    autoplay: false,
    adaptiveHeight: true,
    draggable: false,
    swipe: false,
    touchMove: false,
    accessibility: false
  });
  $(".js-step-btn").on("click", function(){
    $(".js-steps-slider").slick('slickGoTo', $(this).data("step") - 1);
    $(".js-step-btn").removeClass("active");
    $(this).addClass("active");
  });

  $(".js-reviews-slider").slick({
    arrows: true,
    infinite: false,
    autoplay: true,
    autoplaySpeed: 6000,
    slidesToShow: 2,
    slidesToScroll: 1,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 980,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });
  
  $(function() {
    $("[type=tel]").inputmask("+7 (999) 999-99-99");
    $("[name=passportSerie]").inputmask("9999");
    $("[name=passportNumber]").inputmask("999999");
    $("[name=passportCode]").inputmask("999-999");
    $("[name=passportDate]").inputmask("99/99/9999");
    $("[name=index]").inputmask("999999");
    $("[name=birthDate]").inputmask("99/99/9999");
    $("[name=cardNumber]").inputmask("9999 9999 9999 9999");
    $("[name=cardMonth]").inputmask("99");
    $("[name=cardYear]").inputmask("99");
    $("[name=cardCvv]").inputmask("999");
  });
 

});