var express = require('express')
var config = require('./config/index')
var axios = require('axios')

var port = process.env.PORT || config.build.port

var app = express()

var apiRoutes = express.Router('./')

      //获取歌词
      apiRoutes.get( '/getLyric', function(req, res) {
        const url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
        axios.get( url, {
          headers: {
            referer: 'https://y.qq.com/',
            host: 'c.y.qq.com'
          },
          params: req.query
        } ).then((response) => {
          //res.json(response.data)
          var ret = response.data
          if (typeof ret === 'string') {
            var reg = /^\w+\(({[^()]+})\)$/
            var matches = ret.match(reg)
            if (matches) {
              ret = JSON.parse(matches[1])
            }
          }
          res.json(ret)
        } ).catch((err) => {
          console.log(err)
        })
      } )

app.use('/api', apiRoutes)

// app.use(express.static('./dist'))
var oneYear = 60 * 1000 * 60 * 24 * 365
app.use(express.static('./music',  { maxAge: oneYear }))

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})