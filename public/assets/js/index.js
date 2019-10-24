$('.card-body button[data-action="save"]').on('click', function () {
  $.ajax('/api/article/save', {
    type: 'PUT',
    data: {id: $(this).attr('data-id')}
  }).then(function() {
    location.reload();
  });
});

$('.card-body button[data-action="remove"]').on('click', function () {
  $.ajax('/api/article/remove', {
    type: 'PUT',
    data: {id: $(this).attr('data-id')}
  }).then(function() {
    location.reload();
  });
});

$('#notesModal').on('show.bs.modal', function (event) {
  const button = $(event.relatedTarget);
  const articleId = button.data('id');
  $('#article-title').attr({ 'data-id': articleId }).text('Hello');
  console.log('Note Article Id', articleId)
  $.ajax(`/api/notes/${articleId}`, { type: 'GET' })
    .then(result => console.log(result))

})

$('#save-note').on('click', function (event) {
  const note = $('#new-note').val().trim();
  if (note.length === 0) return;
  const articleId = $('#article-title').attr('data-id')
  console.log('Saving notes', note, articleId);
  $.ajax('/api/notes', { type: 'POST', data: { note: note, articleId: articleId} })
    .then(result => console.log(result))
})
 
// // Whenever someone clicks a p tag
// $(document).on("click", "p", function() {
//   // Empty the notes from the note section
//   $("#notes").empty();
//   // Save the id from the p tag
//   var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
//   $.ajax({
//     method: "GET",
//     url: "/articles/" + thisId
//   })
//     // With that done, add the note information to the page
//     .then(function(data) {
//       console.log(data);
//       // The title of the article
//       $("#notes").append("<h2>" + data.title + "</h2>");
//       // An input to enter a new title
//       $("#notes").append("<input id='titleinput' name='title' >");
//       // A textarea to add a new note body
//       $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
//       // A button to submit a new note, with the id of the article saved to it
//       $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

//       // If there's a note in the article
//       if (data.note) {
//         // Place the title of the note in the title input
//         $("#titleinput").val(data.note.title);
//         // Place the body of the note in the body textarea
//         $("#bodyinput").val(data.note.body);
//       }
//     });
// });

// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});
  
