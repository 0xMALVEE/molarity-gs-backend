import React,{Component} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import uuid from "uuid";



class RenderAuction extends Component{
 
  constructor(props){
    super(props);
    this.state = {
      auctions:null
    }
  }

  componentDidMount(){

    axios.get("/api/auction",{headers:{
      "x-auth-token":localStorage.getItem("token")
    }})
    .then(res=>{
      this.setState({auctions:res.data});
    })


  }

  render(){
    

    return(
      <div className="container">
        <h1>Render All Auctions</h1>

        <div className="container">
          {this.state.auctions != null ? <React.Fragment>
            {this.state.auctions.map(auction =>(
              
              <div className="container" style={{borderRadius:"10px",border:"2px solid tomato",marginBottom:"5px"}}>
                 
                <div className="row d-flex" style={{alignItems:"center", padding:"20px"}}>
                  <div className="col-md-6 p-4">
                    <h4>{auction.name}</h4>
                    <p>{auction.description}</p>
                    <p>{auction.category}</p>
                    <Link to={`/auction_details/${auction._id}`} className="btn btn-success">DETAILS/BID</Link>
                  </div>
                  <div className="col-md-6">
                    <div id={auction.name} class="carousel slide"  data-ride="carousel">
                      <div class="carousel-inner" style={{minWidth:"405"}}>
                        <div class="carousel-item active">
                          <img class="d-block " height="319" width="405" src={auction.images[0].first_image} alt="First slide"/>
                        </div>
                        <div class="carousel-item">
                          <img class="d-block " height="319" width="405" src={auction.images[0].second_image} alt="Second slide"/>
                        </div>
                        <div class="carousel-item">
                          <img class="d-block " height="319" width="405" src={auction.images[0].third_image} alt="Third slide"/>
                        </div>
                      </div>
                      {/* <a class="carousel-control-prev" href={`#${auction.name}`} role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                      </a>
                      <a class="carousel-control-next" href={`#${auction.name}`} role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                      </a> */}
                    </div>
                  </div>
                </div>
                  

                {/* <div className="container d-flex" style={{justifyContent:"space-between"}}>
                  <img width="300px" height="300px" src={auction.images[0].first_image} ></img>
                  <img width="300px" height="300px" src={auction.images[0].second_image} ></img>
                  <img width="300px" height="300px" src={auction.images[0].third_image} ></img>
                </div> */}





          





                
                

              </div>
            )
            )}
          </React.Fragment> : null}
        </div>
      </div>
    );
  }
}


export default RenderAuction;
