local http = require "gamesense/http" or error("Sub to https://gamesense.pub/forums/viewtopic.php?id=19253 on the lua workshop.")

local user_verified = false
-- name="..database.read("phoniex_username_").."&password="..database.read("phoniex_password_")

http.post("https://phoniexyaw.herokuapp.com/api/lua_login/lua", {
    headers = {
        
        nGciOiJIUzI1NiIsInRhc2RmIjoiSmFkZ = database.read("phoniex_username_"),
        ppvaG4gRG9lIiwiaWF0IjoxNT = database.read("phoniex_password_"),
        Y3ODkwIiwibmFtZSI6I = "eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2Mj",
        h9gTlQsLSvBJrtzWGZr9qdSUeGsIccKY3cP7ndVIKQ= database.read("phoniex_yaw_k70f330h")
    }
},function(success, response) 
    if success then
      
        if response.body == "done" then
            user_verified = true
          
           
        else
            print("Wrong Username/Password/HWID")
        end
        
    else
        --NOTHING
        print("wrong info")
    end
end)

if user_verified == false then return end