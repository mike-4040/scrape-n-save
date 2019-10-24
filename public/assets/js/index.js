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

$('#notesModal').on('show.bs.modal', event => {
  const button = $(event.relatedTarget);
  const articleId = button.data('id');
  $.ajax(`/api/notes/${articleId}`, { type: 'GET' })
  .then(result => {
    $('#article-title').attr({ 'data-id': articleId }).text(result.title);
    $('.modal-body ul').remove();
    let notesList = $('<ul>').addClass('list-group');
    result.notes.forEach(note => {
      notesList
        .append($('<li>')
          .addClass('list-group-item d-flex')
          .append(
            $('<div>').text(note.note),
            $('<button>')
              .attr({ 'type': 'button', 'data-id': note._id })
              .addClass('btn btn-outline-danger ml-auto')
              .text('DELETE')));
    });
    $('.modal-body').prepend(notesList);
  })

})

$('#save-note').on('click', function (event) {
  const note = $('#new-note').val().trim();
  if (note.length === 0) return;
  const articleId = $('#article-title').attr('data-id')
  $.ajax('/api/notes', { type: 'POST', data: { note: note, articleId: articleId} })
    .then(result => console.log(result))
})

$('.modal-body button').on('click', function () {
  console.log("DEL");
});

  
