
app.get('/:hash', function (req, res) {
  console.log(req.params.hash);
  short.retrieve(req.params.hash).then(function (result) {
    console.log(">> Retrieved >> " + result.hash + " -> " + result.URL);
    res.redirect(addhttp(result.URL));
  }, function (err) {
    console.log(err);
    res.redirect('/');
  })
});

function addhttp(url) {
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
        url = "http://" + url;
    }
    return url;
}