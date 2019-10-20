$(function() {
  $('.devour').on('click', function(event) {
    const id = $(this).data('id');
    const burgerState = { devoured: true };

    $.ajax('/api/burgers/' + id, {
      type: 'PUT',
      data: burgerState
    }).then(function() {
      console.log('Devoured');
      // Reload the page to get the updated list
      location.reload();
    });
  });

  $('.create-form').on('submit', function(event) {
    event.preventDefault();

    const newBurger = {
      name: $('#new-burger')
        .val()
        .trim()
    };

    $.ajax('/api/burgers', {
      type: 'POST',
      data: newBurger
    }).then(function() {
      console.log('created new burger');
      location.reload();
    });
  });
});
