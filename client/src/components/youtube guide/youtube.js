import React from 'react';
import YouTube from 'react-youtube';
import axios from "axios";
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     users: null
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

    axios.get("/api/users",config)
    .then(res => this.setState({users:res.data})
    
    )
  }

  banUser = (e) => {
    let text = e.target.textContent
    let username = text.substring(4 , text.length)
    
    
    const token = localStorage.getItem("token");

    const config = {
        headers:{
            "Content-Type":"application/json",
            "x-auth-token":token
          }
    };


    // Replace with getConfig() for headers
    axios.post("/api/users/ban", {username: username},config)

      .then(res => { // then print response status
        console.log("DONE")
        window.location.reload()
      })
  }

  unBanUser = (e) => {
    let text = e.target.textContent
    let username = text.substring(6 , text.length)
    
    
    const token = localStorage.getItem("token");

    const config = {
        headers:{
            "Content-Type":"application/json",
            "x-auth-token":token
          }
    };


    // Replace with getConfig() for headers
    axios.post("/api/users/unban", {username: username},config)

      .then(res => { // then print response status
        console.log("DONE")
        window.location.reload()
      })
  }



  render() {
    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };

    return (
    <React.Fragment>
        <div className="container-fluid text-black main-user-data">


          {this.state.users != null ?
            <React.Fragment>
            {this.state.users.map(user => (
                <div className="container pt-1">

                  {user.user_role == "normal" || user.user_role == "admin" ?
                  
                  <React.Fragment>

        
                <div className='container user-data'>
                   <h3>USERNAME: {user.name}</h3>
                   <h4>ROLE: {user.user_role}</h4>
                   <h4>IP: {user.ip}</h4>
                   <h4>Email: {user.email}</h4>
                   <h4>Registered Date: {user.register_date}</h4>
                   <h4>HWID: {user.hwid}</h4>
                   <h4>HWID STATUS: {user.hwid_status}</h4>
                   <button onClick={this.banUser} className='btn btn-danger mt-2'>BAN {user.name}</button>
                </div>
           

                  </React.Fragment> 

                  :
                  <React.Fragment>

                  
                <div className='container user-data-baned'>
                   <h3>USERNAME: {user.name}</h3>
                   <h4>ROLE: {user.user_role}</h4>
                   <h4>IP: {user.ip}</h4>
                   <h4>HWID: {user.hwid}</h4>
                   <h4>HWID STATUS: {user.hwid_status}</h4>
                   <button onClick={this.unBanUser} className='btn btn-danger mt-2'>UNBAN {user.name}</button>
                </div>
           
                     </React.Fragment> }
                   

                </div>
                
            )) }
          </React.Fragment>
    : ""}

        </div>
    </React.Fragment>
    );
  }

  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
}

export default Example;