import React from "react";

class AddFishForm extends React.Component{
  constructor(){
    super();
    this.createFish=this.createFish.bind(this);
  }
  createFish(event){
    event.preventDefault();
    const fish={
      name:this.name.value,
      price:this.price.value,
      status:this.status.value,
      desc:this.desc.value,
      image:this.image.value
    };
    this.props.addFish(fish);
    this.fishForm.reset();
  }
  render(){
    return (
      <form ref={(input) => this.fishForm=input} className="fish-edit" onSubmit={this.createFish}>
        <input ref={(input) => this.name=input} placeholder="Fish Name" type="text"></input>
        <input ref={(input) => this.price=input} placeholder="Fish Price" type="text"></input>
        <select ref={(input) => this.status=input}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea ref={(input)=>this.desc=input} placeholder="Fish Desc"></textarea>
        <input ref={(input)=>this.image=input} type="text" placeholder="Fish Image"></input>
        <button type="submit">+ Add Item</button>
      </form>
    );
  }
}

AddFishForm.propTypes={
  addFish:React.PropTypes.func.isRequired
};

export default AddFishForm;
