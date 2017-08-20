var mongoose = require('mongoose');
var User = mongoose.model('User');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');

module.exports = function(passport){
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user){
             done(err, user);
         });
    });
    passport.use('signup', new LocalStrategy({
             passReqToCallback : true
        },
        function(req, username, password, done){
            findOrCreateUser = function(){
                User.findOne({'username' : username}, function(err, user) {
                if (err){
                    return done(err);
                 }
                 if (user){
                     return done(null, false);
                  }else {
                     var newUser = new User();
                     newUser.username = username;
                     newUser.password = createHash(password);
                     newUser.save(function(err) {
                         if (err){
                             throw err;
                          }
                          return done(null, newUser);
                      });
                   }
                   });
               };
               process.nextTick(findOrCreateUser);
            })
     );
    passport.use('signin', new LocalStrategy({
      passReqToCallback : true
    },
      function(req, username, password, done){
        User.findOne({'username' : username},
          function(err, user) {
            if (err)
              return done(err);
            if(!user){
             return done(null, false);
            }
            if (!isPasswordValid(user, password)) {
              return done(null, false);
            }
            return done(null, user);
          }
          );
      })
    );

         var isPasswordValid = function(user, password) {
              return bcrypt.compareSync(password, user.password);
         };
         var createHash = function(password){
              return bcrypt.hashSync(password, bcrypt.genSaltSync(10),null);
          };
};
