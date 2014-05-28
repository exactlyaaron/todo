(function(){
  'use strict';

  $(document).ready(init);

  function init(){
    $('input[type=checkbox]').click(submitForm);
    $('.add-task').click(slideNewTask);
    $('#new-task').hide();
  }

  function submitForm(){
    $(this).closest('form').submit();
    console.log('clicked');
  }

  function slideNewTask(){
    $('#new-task').slideToggle();
    console.log('clicked');
  }

})();
