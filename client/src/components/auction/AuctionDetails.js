import React,{Component} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class AuctionDetails extends Component{
  constructor(props){
    super(props);

    this.state = {
      data:null,
      bid:{
        bid_price:"",
        bid_proposal:""
      },
      bid_error:""
    }
  }

  componentDidMount(){
    axios.get(`/api/auction/${this.props.match.params.id}`,{headers:{
      "x-auth-token":localStorage.getItem("token")
    }})
    .then(res=>{
      this.setState({data:res.data});
    })
    .catch(err=>{ 
      console.log(err);
    })
    
    
  }

  handleBidClick = () => {
    
    axios.post("/api/auction/bid ", {
      bid_price:this.state.bid.bid_price,
      bid_proposal:this.state.bid.bid_proposal,
      auction_id:this.state.data._id
    } ,{
      headers:{
      "x-auth-token":localStorage.getItem("token")
    }
  }).then(res=>{
      
      if(typeof res.data != "object"){
        this.setState({bid_error:res.data});
      }else{
        this.setState({data:res.data})
      }
      
    }).catch(err=>{
      console.log(err);
    })
  }

  render(){
    // console.log(this.props.match.params.id)
    
    return(
    <div className="container">
      <h1 class="heading">Auction Details</h1>
      <React.Fragment>

      {this.state.data != null ? <React.Fragment>
            
              <div className="container" style={{borderRadius:"10px",border:"5px solid skyblue",marginBottom:"5px"}}>
                  <h4>{this.state.data.name}</h4>

                <div className="container d-flex" style={{justifyContent:"space-between"}}>
                  <img width="300px" height="300px" src={this.state.data.images[0].first_image} ></img>
                  <img width="300px" height="300px" src={this.state.data.images[0].second_image} ></img>
                  <img width="300px" height="300px" src={this.state.data.images[0].third_image} ></img>
                </div>
                
                <p>{this.state.data.description}</p>
                <p>{this.state.data.category}</p>
                
                
                {/* BID MODAL */}
                <form>
                <h2>BID TO THIS AUCTION</h2>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Bid Price</label>
                        <input onChange={(e)=> this.setState({bid:{...this.state.bid,bid_price:e.target.value}})} name="name" className="form-control" placeholder="Enter Bid Price"/>
                      </div>

                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Bid Proposal</label>
                        <input onChange={(e)=> this.setState({bid:{...this.state.bid,bid_proposal:e.target.value}})} name="name" className="form-control" placeholder="Enter Bid Proposal"/>
                      </div>

                </form>
                    {this.state.bid_error !== ""? <div class="alert alert-danger" role="alert">
  {this.state.bid_error}
</div> :null}
                        <button onClick={this.handleBidClick } type="submit" className="btn btn-primary">BID/SUBMIT</button>


                


                  <div className="container mt-4" >
                        <h1>Recent Bids</h1>
                        {this.state.data.bids.map(bid=>(
                          <div style={{border:"1.2px solid red",borderRadius:"14px",backgroundColor:"black",color:"white",padding:"15px",marginTop:"10px"}}>
                            <h3>Bidder Name: {bid.user_name}</h3>
                            <h4>Bidder Email: {bid.user_email}</h4>
                            <h1>Bid Price: {bid.bid_price}$</h1>
                            <p>Bid Proposal: {bid.bid_proposal}</p>
                          </div>
                        )                     
                        )}
                  </div>
              </div>
            
          </React.Fragment> : null}

      </React.Fragment>
    </div>
    )
  }
}


export default AuctionDetails;