!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports?require("jquery"):jQuery)}(function(a){var b,c=navigator.userAgent,d=/iphone/i.test(c),e=/chrome/i.test(c),f=/android/i.test(c);a.mask={definitions:{9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"},autoclear:!0,dataName:"rawMaskFn",placeholder:"_"},a.fn.extend({caret:function(a,b){var c;if(0!==this.length&&!this.is(":hidden"))return"number"==typeof a?(b="number"==typeof b?b:a,this.each(function(){this.setSelectionRange?this.setSelectionRange(a,b):this.createTextRange&&(c=this.createTextRange(),c.collapse(!0),c.moveEnd("character",b),c.moveStart("character",a),c.select())})):(this[0].setSelectionRange?(a=this[0].selectionStart,b=this[0].selectionEnd):document.selection&&document.selection.createRange&&(c=document.selection.createRange(),a=0-c.duplicate().moveStart("character",-1e5),b=a+c.text.length),{begin:a,end:b})},unmask:function(){return this.trigger("unmask")},mask:function(c,g){var h,i,j,k,l,m,n,o;if(!c&&this.length>0){h=a(this[0]);var p=h.data(a.mask.dataName);return p?p():void 0}return g=a.extend({autoclear:a.mask.autoclear,placeholder:a.mask.placeholder,completed:null},g),i=a.mask.definitions,j=[],k=n=c.length,l=null,a.each(c.split(""),function(a,b){"?"==b?(n--,k=a):i[b]?(j.push(new RegExp(i[b])),null===l&&(l=j.length-1),k>a&&(m=j.length-1)):j.push(null)}),this.trigger("unmask").each(function(){function h(){if(g.completed){for(var a=l;m>=a;a++)if(j[a]&&C[a]===p(a))return;g.completed.call(B)}}function p(a){return g.placeholder.charAt(a<g.placeholder.length?a:0)}function q(a){for(;++a<n&&!j[a];);return a}function r(a){for(;--a>=0&&!j[a];);return a}function s(a,b){var c,d;if(!(0>a)){for(c=a,d=q(b);n>c;c++)if(j[c]){if(!(n>d&&j[c].test(C[d])))break;C[c]=C[d],C[d]=p(d),d=q(d)}z(),B.caret(Math.max(l,a))}}function t(a){var b,c,d,e;for(b=a,c=p(a);n>b;b++)if(j[b]){if(d=q(b),e=C[b],C[b]=c,!(n>d&&j[d].test(e)))break;c=e}}function u(){var a=B.val(),b=B.caret();if(o&&o.length&&o.length>a.length){for(A(!0);b.begin>0&&!j[b.begin-1];)b.begin--;if(0===b.begin)for(;b.begin<l&&!j[b.begin];)b.begin++;B.caret(b.begin,b.begin)}else{for(A(!0);b.begin<n&&!j[b.begin];)b.begin++;B.caret(b.begin,b.begin)}h()}function v(){A(),B.val()!=E&&B.change()}function w(a){if(!B.prop("readonly")){var b,c,e,f=a.which||a.keyCode;o=B.val(),8===f||46===f||d&&127===f?(b=B.caret(),c=b.begin,e=b.end,e-c===0&&(c=46!==f?r(c):e=q(c-1),e=46===f?q(e):e),y(c,e),s(c,e-1),a.preventDefault()):13===f?v.call(this,a):27===f&&(B.val(E),B.caret(0,A()),a.preventDefault())}}function x(b){if(!B.prop("readonly")){var c,d,e,g=b.which||b.keyCode,i=B.caret();if(!(b.ctrlKey||b.altKey||b.metaKey||32>g)&&g&&13!==g){if(i.end-i.begin!==0&&(y(i.begin,i.end),s(i.begin,i.end-1)),c=q(i.begin-1),n>c&&(d=String.fromCharCode(g),j[c].test(d))){if(t(c),C[c]=d,z(),e=q(c),f){var k=function(){a.proxy(a.fn.caret,B,e)()};setTimeout(k,0)}else B.caret(e);i.begin<=m&&h()}b.preventDefault()}}}function y(a,b){var c;for(c=a;b>c&&n>c;c++)j[c]&&(C[c]=p(c))}function z(){B.val(C.join(""))}function A(a){var b,c,d,e=B.val(),f=-1;for(b=0,d=0;n>b;b++)if(j[b]){for(C[b]=p(b);d++<e.length;)if(c=e.charAt(d-1),j[b].test(c)){C[b]=c,f=b;break}if(d>e.length){y(b+1,n);break}}else C[b]===e.charAt(d)&&d++,k>b&&(f=b);return a?z():k>f+1?g.autoclear||C.join("")===D?(B.val()&&B.val(""),y(0,n)):z():(z(),B.val(B.val().substring(0,f+1))),k?b:l}var B=a(this),C=a.map(c.split(""),function(a,b){return"?"!=a?i[a]?p(b):a:void 0}),D=C.join(""),E=B.val();B.data(a.mask.dataName,function(){return a.map(C,function(a,b){return j[b]&&a!=p(b)?a:null}).join("")}),B.one("unmask",function(){B.off(".mask").removeData(a.mask.dataName)}).on("focus.mask",function(){if(!B.prop("readonly")){clearTimeout(b);var a;E=B.val(),a=A(),b=setTimeout(function(){B.get(0)===document.activeElement&&(z(),a==c.replace("?","").length?B.caret(0,a):B.caret(a))},10)}}).on("blur.mask",v).on("keydown.mask",w).on("keypress.mask",x).on("input.mask paste.mask",function(){B.prop("readonly")||setTimeout(function(){var a=A(!0);B.caret(a),h()},0)}),e&&f&&B.off("input.mask").on("input.mask",u),A()})}})});
$.fn.setCursorPosition=function(t){var e;$(this).get(0).setSelectionRange?$(this).get(0).setSelectionRange(t,t):$(this).get(0).createTextRange&&((e=$(this).get(0).createTextRange()).collapse(!0),e.moveEnd("character",t),e.moveStart("character",t),e.select())},$('input[type="tel"]').click(function(){"+7 (___) ___-__-__"==$(this).val()&&$(this).setCursorPosition(4)}),$('input[type="tel"]').keyup(function(){"+7 (8__) ___-__-__"==$(this).val()&&($(this).val($(this).val().replace("8","_")),$(this).mask("+7 (999) 999-99-99"),$(this).attr("placeholder","+7 (___) ___-__-__"),$(this).setCursorPosition(4))});


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

  var maybeChanceArray = [50, 70, 85, 100], //массив возможной вероятности одобрения по шагам
      chanceArray = [30, 60, 70, 90]; //массив достигнутой вероятности
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
      $("#liveAddress").hide();
      $("#liveAddress").find("input").each(function(){
        $(this).addClass("like").removeClass("error correct").nextAll(".error-info").remove();
      });
    } else {
      $("#liveAddress").show().find("input").removeClass("like");
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
    accessibility: false
  });
  $(".js-form-prev").on("click", function(){
    if ($(".form").attr("data-step") == '6') {
      $(".js-form-slider").slick('slickGoTo', 3);
    } else {
      $(".js-form-slider").slick('slickPrev');
    }
    var step = parseInt($(".form").attr("data-step"));
    $(".js-dataStep:nth-child(" + (step + 2) + ")").removeClass("active pointed");
    $(".js-dataStep:nth-child(" + (step + 1) + ")").addClass("active");
    if (step < 5) {
      $(".js-dataChanceMaybe").css("width", maybeChanceArray[step - 1] + "%");
      $(".js-dataChanceCurrent").css("width", chanceArray[step - 1] + "%");
      $(".js-chanceValue").text(chanceArray[step - 1] + "%");
    }
    
    if (window.innerWidth > 1170) {
      $(".js-dataStepLine i").css("height", (step - 1) * 34 + "%");
    } else {
      $(".js-dataStepLine i").css("width", (step - 1) * 34 + "%");
    } 

    $("html, body").animate({scrollTop: $("#data").offset().top});
  });
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
    $(".js-dataStep:nth-child(" + (step + 1) + ")").addClass("active");
    $(".js-dataStep:nth-child(" + (step) + ")").removeClass("active").addClass("pointed");
    if (step < 5) {
      $(".js-dataChanceMaybe").css("width", maybeChanceArray[step - 1] + "%");
      $(".js-dataChanceCurrent").css("width", chanceArray[step - 1] + "%");
      $(".js-chanceValue").text(chanceArray[step - 1] + "%");
    }
    if (window.innerWidth > 1170) {
      $(".js-dataStepLine i").css("height", (step - 1) * 34 + "%");
    } else {
      $(".js-dataStepLine i").css("width", (step - 1) * 34 + "%");
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
      
      
      setTimeout(function(){
        $(".js-form-slider").slick('slickNext');
        $("html, body").animate({scrollTop: $("#data").offset().top});
      }, 3000);


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
    $("[type=tel]").mask("+7 (999) 999-99-99");
    $("[name=passportSerie]").mask("9999");
    $("[name=passportNumber]").mask("999999");
    $("[name=passportCode]").mask("999-999");
    $("[name=index]").mask("999999");
    $("[name=cardNumber]").mask("9999 9999 9999 9999");
    $("[name=cardMonth]").mask("99");
    $("[name=cardYear]").mask("99");
    $("[name=cardCvv]").mask("999");
  });
 

});