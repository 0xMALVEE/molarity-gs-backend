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
      category:""
    }

  }

  componentDidMount(){
    // console.log(localStorage.getItem("token"));
  }

  onClickHandler = () => {
    const data = new FormData()
    for (var x = 0; x < this.state.image.length; x++) {
      data.append('auction_item_image', this.state.image[x])
    }

    data.append("name",this.state.name);
    data.append("description",this.state.description);
    data.append("category",this.state.category);




    const token = localStorage.getItem("token");

    // Replace with getConfig() for headers
    axios.post("/api/auction", data,{
      headers:{
        "Content-Type":"application/json",
        "x-auth-token":token
      }
    })

      .then(res => { // then print response status
        console.log(res)
      })
    

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
      <div className="container" style={{marginTop:"50px",border:"1px solid green",padding:"10px",borderRadius:"5px"}}>
        <h1 class="heading">Create New Auction Item</h1>
      <div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Auction Item Name</label>
          <input onChange={(e)=> this.setState({name:e.target.value})} name="name" className="form-control" placeholder="Enter Item Name"/>
        </div>

        <div className="form-group ">
          <label htmlFor="exampleFormControlFile1">Pick 3 Images</label>
          <input multiple type="file" name="file" className="form-control-file btn btn-primary btn-sm" id="exampleFormControlFile1" onChange={this.onChangeHandler}/>
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Auction Item Description</label>
          <input placeholder="Enter Item Description" onChange={(e)=> this.setState({description:e.target.value})} name="description" className="form-control" />
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Auction Item Category</label>
          <input onChange={(e)=> this.setState({category:e.target.value})} name="category" className="form-control" placeholder="Enter Category"/>
        </div>

        <button onClick={this.onClickHandler } type="submit" className="btn btn-primary">Submit</button>
      </div>     

      </div>
    )
  }
}

export default CreateAuction;
