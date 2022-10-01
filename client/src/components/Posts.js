import React,{Component} from "react";
import axios from "axios";

class Posts extends Component{
  constructor(props){
    super(props);

    this.state = {
      posts:""
    }
  }

  componentDidMount  (){
    const config = {
      headers: {
        "x-auth-token":`${localStorage.getItem("token")}`
      }
    };

    axios.get("/api/posts",config)
    .then(res => {
      this.setState({posts:res.data});
      console.log(this.state.posts)
    })

  
  }

  render(){
    return(
      <React.Fragment>
        <div>
         {this.state.posts != "" ?
          this.state.posts.map((item,index) => <div>
          <h1>Post {index}</h1>
          <p>Created At{item.post_created}</p>
          <p style={{fontSize:"30px"}}>{item.post}</p>
          <br></br>
          </div> ): ""
         }
        </div>
      </React.Fragment>
    )
  }
}

export default Posts;