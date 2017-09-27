
var localtunnel = require('localtunnel');
localtunnel(5000, { subdomain: 'mydev49283' }, function(err, tunnel) {
  console.log('LT running')
});