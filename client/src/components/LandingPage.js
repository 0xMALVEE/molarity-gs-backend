import React, {Component} from "react";
import { returnErrors } from "../actions/errorActions";


const containerDivStyle = {
  minHeight:"100vh"
}

class LandingPage extends Component{
  render(){
    return(
      <React.Fragment>
        <header>
      <div style={{minHeight:"92vh", background:"url('https://wallpapercave.com/wp/wp4676582.jpg') no-repeat center",
        backgroundSize:"cover",display:"flex",justifyContent:'center', alignContent:"center",flexDirection:"column"
      }}>


        <div className="container">
          <div>
          
            <h1 style={{color:"white",marginBottom:"10px"}}>WELCOME TO MOLARITY</h1>
            {/* <button style={{padding:"10px"}} className="btn btn-info">SHOP</button> */}
            <h3 className="text-white mb-3" style={{marginBottom:"4px"}}>gamesense.pub</h3> 
          </div>
          
        </div>

        <div className="container">
      
        <a class="mt-4 discord-btn" href="https://discord.gg/eQq452q7Wn" target="_blank" role="button">JOIN DISCORD SERVER</a>
        <br></br>
          {/* <a class="btn btn-warning mt-3" href=" https://sellix.io/Sayonara7" target="_blank" role="button">PURCHASE LUA </a> */}
            <br/>
            

          
          

        </div>

    
        

      </div>
      </header>

      </React.Fragment>
    )
  }
}

export default LandingPage;