import 'paginationjs'

$('.js-pagination').pagination({
  dataSource: [1, 2, 3, 4, 5],
  callback: function(data, pagination) {
    // template method of yourself
    var html = simpleTemplating(data);
    $('#data-container').html(html);
  }
})

function simpleTemplating(data) {
  var html = '<ul>';
  $.each(data, function(index, item){
      html += '<li>'+ item +'</li>';
  });
  html += '</ul>';
  return html;
}