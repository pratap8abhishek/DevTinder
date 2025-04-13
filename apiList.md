# DevTinder Api's

# authRouter
-POST/signup
-POST/login
-POST/logout

# profileRouter
-GET/profile/view
-PATCH/profile/edit
-PATCH/profile/password

# connectionrequestRouter
-POST/request/send/intersted/:userId
-POST/request/send/ignored/:userId
-POST/request/review/accepted/:requestId
-POST/request/review/rejected/:requestId

# userRouter
-GET/user/connections
-GET/request/recived
-GET/user/feed - Gets you the profile of other users on platform

Status: ignore,interested,accepted, rejected