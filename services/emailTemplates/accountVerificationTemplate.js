const keys = require('../../config/keys');
module.exports= function(account){
    return `
    <html>
    <body>
      <div style="text-align: center;">
        <h3>Welcome to Krys Towers Web Development Apps</h3>
        <p>This email is to verify the account:${account.id}</p>
        <div>
        Click on the following link to verify your account:
          <a href="${keys.redirectDomain}/api/verify/${account.id}/${account.verifyRand}">Verify Account</a>
        </div>
        
      </div>
    </body>
  </html>
  `;
};