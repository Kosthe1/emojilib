// Generated by CoffeeScript 1.6.3
$(function() {
  if ($(".speedy-filter").length) {
    return $(".speedy-filter").speedy();
  }
});

$.fn.speedy = function(result_selector) {
  var $input, search;
  $input = $(this);
  window.speedy_keyword = "";
  if (result_selector == null) {
    result_selector = ".result";
  }
  search = function(keyword) {
    var foundSomething, reg;
    $(".keyword").text(keyword);
    if (window.speedy_keyword !== keyword) {
      window.speedy_keyword = keyword;
      if (keyword.length) {
        reg = new RegExp($.trim(keyword), "i");
        $(result_selector).hide();
        $(result_selector).each(function() {
          if (reg.test($(this).text())) {
            return $(this).show();
          }
        });
      } else {
        $(result_selector).show();
      }
    }
    foundSomething = !!$(".result:visible").length;
    $(".js-queue-all").toggle(!!keyword.length && foundSomething);
    return $(".no-result").toggle(!foundSomething);
  };
  $input.on("search keyup", function() {
    search($(this).val());
    return location.hash = $(this).val();
  });
  $(".group").click(function() {
    return search($input.val($(this).attr("href").substr(1)).val());
  });
  if (location.hash.length) {
    search($input.val(location.hash.substr(1)).val());
  } else {
    search("");
  }
  $(".speedy-remover").click(function() {
    $input.val("");
    $(result_selector).show();
    return search((location.hash = ""));
  });
  return window.onhashchange = function() {
    search($input.val(location.hash.substr(1)).val());
    $("[href^='#']").removeClass("active");
    return $("[href=" + location.hash + "]").addClass("active");
  };
};
