import React from "react";
import Header from "./header";
import Order from "./order";
import Inventory from "./inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./fish";
import base from "../base";

class App extends React.Component{
  constructor(){
    super();
    this.addFish=this.addFish.bind(this);
    this.removeFish=this.removeFish.bind(this);
    this.loadSamples=this.loadSamples.bind(this);
    this.addToOrder=this.addToOrder.bind(this);
    this.removeFromOrder=this.removeFromOrder.bind(this);
    this.updateInventory=this.updateInventory.bind(this);
    this.state={
      fishes:{},
      order:{}
    }
  }



  addFish(fish){
    const fishes = {...this.state.fishes};
    fishes[`fish-${Date.now()}`]=fish;
    this.setState({fishes});
  }

  removeFish(key){
    const fishes={...this.state.fishes};
    fishes[key]=null;
    this.setState({ fishes });
  }

  addToOrder(key){
    const order={...this.state.order};
    order[key] = (order[key])?order[key] + 1 : 1;
    this.setState({order});
  }

  removeFromOrder(key){
    const order={...this.state.order};
    delete order[key];
    this.setState({order});
  }

  loadSamples(){
    this.setState({fishes:sampleFishes});
  }

  updateInventory(key,updatedFish){
    const fishes={...this.state.fishes};
    fishes[key]=updatedFish;
    this.setState({fishes});
  }

  componentWillMount (){
    this.ref=base.syncState(`${this.props.params.storeId}/fishes`,{
      context:this,
      state:"fishes"
    });

    const localStorageRef=localStorage.getItem(`order-${this.props.params.storeId}`);
    if(localStorageRef){
      this.setState({
        order: JSON.parse(localStorageRef)
      });
    }
  }

  compenentWillUnmount(){
    base.removeBinding(this.ref.endpoint);
  }

  componentWillUpdate(nextProps,nextState){
    localStorage.setItem(`order-${this.props.params.storeId}`,JSON.stringify(nextState.order));
  }

  render(){
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh seafood market"/>
          <ul className="list-of-fishes">
            {
              Object.keys(
                this.state.fishes)
                .map(key=><Fish key={key} index={key} addToOrder={this.addToOrder} details={this.state.fishes[key]} />)
            }
          </ul>
        </div>
        <Order order={this.state.order}
        fishes={this.state.fishes}
        removeFromOrder={this.removeFromOrder} />
        <Inventory addFish={this.addFish}
        loadSamples={this.loadSamples}
        params={this.props.params}
        fishes={this.state.fishes}
        removeFish={this.removeFish}
        updateInventory={this.updateInventory}
        storeId={this.props.params.storeId} />
      </div>
    );
  }
}

App.propTypes={
  params:React.PropTypes.object.isRequired
};

export default App;
