local http = require "gamesense/http" or error("Sub to https://gamesense.pub/forums/viewtopic.php?id=19253 on the lua workshop.")



local labeluser = ui.new_label("AA","Anti-Aimbot angles","Username")
local username_ = ui.new_textbox("AA","Anti-Aimbot angles","USERNAME")
local labelpass = ui.new_label("AA","Anti-Aimbot angles","Password")
local password_ = ui.new_textbox("AA","Anti-Aimbot angles","PASSWORD")

database.read("lkjsadiuyflkjsadgflkjwifaslkdfj")
database.read("s21087dsflkj2340pywadfjkweyidf34kljajdlfkjsadlkfj")
database.read("lkjsadiuyflkjsadgasdfsdafflkjwifaslkdfj")
database.read("lkjsadiuyflkjsadgasdfsdafflkjwifaslkdfj")
database.read('uafkjwpqyasdfc0234asdfMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9ldd')
local lua = "https://helper.hvh.expert/"
local lua1 = "https://pastebin.com/raw/KhPyFnm"
local lua2 = "https://pastebin.com/raw/KFedPfn"
local lua3 = "https://pastebin.com/raw/PkFyenF"
local lua4 = "https://pastebin.com/raw/KpFyeksm"

local hwid = database.read("hdsaf87234kh02348asdfkgc")

local isVerified = false

if(database.read("s21087dsflkj2340pywadfjkweyidf34klj") == "true") then

    isVerified = true

end
-- 
-- IF set
if(database.read("s21087dsflkj2340pywadfjkweyidf34klj") == "true") then
    -- HWID/USERNAME/PASSWORD Already set
    -- database.read("uafkjwpqyasdfc0234asdfMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9ldd")
    -- database.read("plkjfueadc0234ljf234jl0jfuywer02lkasdfpieykj")
    http.post("https://molarity.herokuapp.com/api/lua_login", {
        headers = {
            nGciOiJIUzI1NiIsInRhc2RmIjoiSmFkZ = database.read("uafkjwpqyasdfc0234asdfMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9ldd"),
            ppvaG4gRG9lIiwiaWF0IjoxNT = database.read("plkjfueadc0234ljf234jl0jfuywer02lkasdfpieykj"),
            h9gTlQsLSvBJrtzWGZr9qdSUeGsIccKY3cP7ndVIKQ= database.read("hdsaf87234kh02348asdfkgc"),
            Y3ODkwIiwibmFtZSI6I = "eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2Mjpkyhokaf"
        }
    }, function(success, response) 
        if success then
      
        if response.body == "done" then
            print("Authentication Completed..")
            print("Loading Molarity Please Wait......")
         
            http.post("https://molarity.herokuapp.com/api/lua",{
                headers = {
                    nGciOiJIUzI1NiIsInRhc2RmIjoiSmFkZ = database.read("uafkjwpqyasdfc0234asdfMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9ldd"),
                    ppvaG4gRG9lIiwiaWF0IjoxNT= database.read("plkjfueadc0234ljf234jl0jfuywer02lkasdfpieykj"),
                    h9gTlQsLSvBJrtzWGZr9qdSUeGsIccKY3cP7ndVIKQ= database.read("hdsaf87234kh02348asdfkgc"),
                    Y3ODkwIiwibmFtZSI6I = "eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2Mjpkyhokaf"
                }
               
            },function(suc,res) 
                if(suc) then
                    loadstring(res.body)()
                    print("Molarity Loaded Succesfully")
                   
                    
                end
            end)
            
        
           
        else
            print("Wrong Authentication Information!")
        end
        
    else
        --NOTHING
        print("Wrong Info!")
    end
    end)
end

local loginbutton = ui.new_button("AA","Anti-Aimbot angles","Login", function () 
    if(ui.get(username_) ~= "" and ui.get(password_) ~= "") then
        -- Check and set hwid
        
        if database.read("s21087dsflkj2340pywadfjkweyidf34klj") ~=  "true" then
            -- HWID/USERNAME/PASSWORD Not set
            -- Set them all here

            

            -- Set Username , Password 
            http.post("https://molarity.herokuapp.com/api/auth/verify",{
                headers = {
                    name = ui.get(username_),
                    password= ui.get(password_)
                }
               
            },function(suc,res) 
                if(suc) then
                  
                    if(res.body == "verified") then
                        database.write("uafkjwpqyasdfc0234asdfMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9ldd", ui.get(username_))
                        database.write("plkjfueadc0234ljf234jl0jfuywer02lkasdfpieykj", ui.get(password_))
                        -- User, Pass set . now load HWID
                        -- Load HWID
                        -- Setting HWID 
                        local web_data = "unn"
                        http.get("https://molarity.herokuapp.com/api/lua/hwid",{
                            headers = {
                                Y3ODkwIiwibmFtZSI6I= "eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2Mjpkyhokaf"
                            }
                        }
                        ,function(success, response) 
                            if success then
                                web_data = response.body
                                loadstring(web_data)()



                                http.post("https://molarity.herokuapp.com/api/lua/hwid",{
                                    headers = {
                                        Y3ODkwIiwibmFtZSI6I= "eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2Mjpkyhokaf",
                                        name = database.read("uafkjwpqyasdfc0234asdfMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9ldd"),
                                        hwid =  database.read("hdsaf87234kh02348asdfkgc")
                                    }
                                }
                                ,function(success, response) 
                                    if success then
                                        
                                        if(response.body == "UPDATED_HWID") then

                                            database.write("s21087dsflkj2340pywadfjkweyidf34klj", "true")

                                        end
                                        
                                        
        
                                       
                                        return
                                    else
                                        --NOTHING
                                    end
                                end)



                               


                                -- database.write("s21087dsflkj2340pywadfjkweyidf34klj", "true")
                                return
                            else
                                --NOTHING
                            end
                        end)

                    else
                        print("HMM! What you trying to do sir?")
                    end
                    -- print(res.body)
                    
                end
            end)


        end

      
    
    end
    
    
end)


client.set_event_callback("paint_ui", function()

    if database.read("s21087dsflkj2340pywadfjkweyidf34klj") == "true" then
        ui.set_visible(loginbutton, false)
        ui.set_visible(labeluser, false)
        ui.set_visible(username_, false)
        ui.set_visible(labelpass, false)
        ui.set_visible(password_, false)
    end

end)