import React,{Component} from "react";
import axios from "axios";
import getConfig from "../../reducers/authReducer";
import Resizer from 'react-image-file-resizer';
import { ITEMS_LOADING } from "../../actions/types";

class GenerateInvite extends Component{
  constructor(props) {
    super(props);
    this.state = {
      generate_invite_state: false,
      invites: null
    }

  }

  componentDidMount(){
    // console.log(localStorage.getItem("token"));
    const token = localStorage.getItem("token");
    const config = {
        headers:{
            "Content-Type":"application/json",
            "x-auth-token":token
          }
    };

    axios.get("/api/invite",config)
    .then(res => this.setState({invites : [...res.data.invites]}))
  }

  onClickHandler = (e) => {
      console.log('working')

    const token = localStorage.getItem("token");

    const config = {
        headers:{
            "Content-Type":"application/json",
            "x-auth-token":token
          }
    };


    // Replace with getConfig() for headers
    axios.post("/api/invite", {},config)

      .then(res => { // then print response status
        if(res.data.success){
          this.setState({generate_invite_state:true})
          let code = res.data.invite.invite_code
          this.setState({invites:[ ...this.state.invites, {invite_code: code} ]})
        }else{
          this.setState({generate_invite_state:false})
          // console.log(res.data)
        }
      })
    window.location.reload()

  }



  render(){
    return(
      <div className="invite-gen">
      <div className="container" style={{padding:"10px",borderRadius:"5px"}}>
        <h1 class="heading">Generate Invite</h1>
      <div className="mb-3">
       

      {this.state.generate_invite_state ? <div class="alert alert-success" role="alert">
      Invite Generated Successfully
    </div>: ""}
   
    
        <button onClick={this.onClickHandler } type="submit" className="btn btn-primary">Generate Invite</button>
      </div>     

    {this.state.invites != null ?
    <React.Fragment>
            {this.state.invites.map(invite => (
                <div className="container pt-1">
                    <div class="alert alert-info invite-code" role="alert">
                        Invitation = {invite.invite_code}      {"{This Will Expires in 2/3 Minutes}"}
                    </div>
                </div>
                
            )) }
    </React.Fragment>
    : ""}
  


      </div>
      </div>
    )
  }
}

export default GenerateInvite;
