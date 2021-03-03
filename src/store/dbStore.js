
module.exports = {

  testMessage: function(db, io, data, debugOn) {

    if (debugOn) { console.log('testMessage', data) }

    const res = {
      date: new Date().toISOString(),
      message: data.message
    }
    db.collection('socketTest').insertOne(res, function(err) {
      if (err) throw err
      io.emit('testMessage', res)
    })
  }

}
