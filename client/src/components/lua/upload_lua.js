import React,{Component} from "react";
import axios from "axios";
import getConfig from "../../reducers/authReducer";
import Resizer from 'react-image-file-resizer';

class CreateAuction extends Component{
  constructor(props) {
    super(props);
    this.state = {
      image:[],
      name:"",
      description:"",
      category:"",
      file:null,
      lua_upload_state: false
    }

  }

  componentDidMount(){
    // console.log(localStorage.getItem("token"));
  }

  onClickHandler = (e) => {
    const data = new FormData()
    // for (var x = 0; x < this.state.image.length; x++) {
    //   data.append('auction_item_image', this.state.image[x])
    // }

    data.append("name",this.state.name);
    data.append("description",this.state.description);
    data.append("myfile",this.state.file[0]);




    const token = localStorage.getItem("token");

    const config = {
      headers: {
          'content-type': 'multipart/form-data'
        }
    };


    // Replace with getConfig() for headers
    axios.post("/upload?token="+ this.state.name, data,config)

      .then(res => { // then print response status
        if(res.data.success){
          this.setState({lua_upload_state:true})
        }else{
          this.setState({lua_upload_state:false})
        }
      })
    

  }

  onChangeW(e) {
    this.setState({file:e.target.files});
  }

  onChangeHandler = event => {

    const img =  event.target.files;
    //Validate the img here

    const compressedImg = [];
    for(let i =0;i<3;i++){
      Resizer.imageFileResizer(
        img[i],
        405,
        319,
        'JPEG',
        100,
        0,
        uri => {
          compressedImg.push(uri);
        },
        'base64'
      );

    }
    
     

    this.setState({image:compressedImg})
  

  }

  render(){
    return(
      <div className="upload-lua">
      <div className="container" style={{padding:"10px",borderRadius:"5px"}}>
        <h1 class="heading">Upload Lua</h1>
      <div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Admin Token</label>
          <input onChange={(e)=> this.setState({name:e.target.value})} name="name" className="form-control" placeholder="Enter Admin Token"/>
        </div>

        {/* <div className="form-group ">
          <label htmlFor="exampleFormControlFile1">Pick 3 Images</label>
          <input multiple type="file" name="file" className="form-control-file btn btn-primary btn-sm" id="exampleFormControlFile1" onChange={this.onChangeHandler}/>
        </div> */}

 

        <div className="form-group">
          <input type="file" name="file" onChange= {(e) => this.setState({file:e.target.files})}/>
        
         </div>

        {/* <div className="form-group">
          <label htmlFor="exampleInputEmail1">Auction Item Category</label>
          <input onChange={(e)=> this.setState({category:e.target.value})} name="category" className="form-control" placeholder="Enter Category"/>
        </div> */}
      {this.state.lua_upload_state ? <div class="alert alert-success" role="alert">
      Lua Uploaded Successfully
    </div>: ""}
   
    
        <button onClick={this.onClickHandler } type="submit" className="btn btn-primary">Upload Lua</button>
      </div>     

      </div>
      </div>
    )
  }
}

export default CreateAuction;
