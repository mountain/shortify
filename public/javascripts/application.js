function app() {
  $("#submit").click(function() {
    var title = $("#query").val();
    if(title && title !== "") {
      var query = "http://" + lang + ".wikipedia.org/w/api.php?action=query&prop=info&inprop=url&format=json&callback=?&titles=" + title;
      $.getJSON(query, function(data) {
        if(!data.query) return;
        for(var pageId in data.query.pages) {
          if(pageId > 0) {
            var shortcut = parseInt(pageId).toString(36),
                url = host + "/r/" + lang + "/" + shortcut;
            var html = "<a id='link' href='" + url + "'>" + title + "</a>:&nbsp;";
            html += "<span id='url'>" + url + "</span>";
            $("#result").html(html);
          } else {
            $("#result").html(notfound);
          }
        }
      });
    };
  });
}

