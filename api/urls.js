var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var path = require('path');

//models
var Url = mongoose.model('Url');

router.get('/:key', function (req, res) {
    // get the url being sent
    var key = req.params.key;
    if (key == "favicon.ico") { // favicon
        res.writeHead(200, {'Content-Type': 'image/x-icon'} );
        res.end();
    } else if (key == "new") { // new url page
        res.sendFile(path.resolve('./views/newUrl.html'));
        console.log(key);
    } else { // a different key
        console.log({key: key});
        Url.findOne({ key: key}, function (err, result) {
            if (err) {
                res.send("doesn't exist.");
            }
            if (result) {
                console.log("redirecting to: " + result.url);
                res.redirect(addHttp(result.url));
            } else {
                // url doesn't yet exist
                res.redirect('/new');
            }
        });
    }
});

router.post('/new', function (req, res) {
    var newUrl = new Url();
    newUrl.key = req.body.new_key;
    newUrl.url = req.body.new_url;
    console.log(newUrl.key);
    Url.findOne({key: newUrl.key}, function newUrlCallback(err, doc) {
        if (err) {
            console.log("error");
            res.json({error: "internal database error", error_code: "2"});
        } else {
            if (doc) { // data exists with this key
                console.log("already exists");
                if (req.body.writeover) {
                    console.log("writing over");
                    doc.remove(function removeOldUrlCallback(err, doc) {
                        if (err) {
                            console.log("error in removing current key");
                            res.json({error: "internal database error", error_code: "2"});
                        } else {
                            newUrl.save(function saveNewUrl(err, obj) {
                                var keyUrl = req.protocol + '://' + req.get('host') + "/" + obj.key;
                                res.json({keyUrl: keyUrl, destUrl: addHttp(obj.url)});
                            });
                        }
                    });
                } else { // don't write over current data
                    var keyUrl = req.protocol + '://' + req.get('host') + "/" + doc.key;
                    res.json({error: "key already exists, add writeover flag to save anyway", error_code: "1", keyUrl: keyUrl, destUrl: addHttp(doc.url)});
                }
            } else { // no data exists yet, just save it
                console.log("doesn't yet exist");
                newUrl.save(function saveNewUrl(err, obj) {
                    var keyUrl = req.protocol + '://' + req.get('host') + "/" + obj.key;
                    res.json({keyUrl: keyUrl, destUrl: addHttp(obj.url)});
                });
            }
        }
    });
});

function addHttp(url) {
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
        url = "http://" + url;
    }
    return url;
}

module.exports = router;
