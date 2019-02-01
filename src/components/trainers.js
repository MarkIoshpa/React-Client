import React, { Component } from 'react'
import { MdModeEdit, MdSave } from 'react-icons/md'

// Trainer component to display trainer data
class Trainer extends Component {
  constructor(props) {
    super(props)
    this.state = { editing: false}

    this.edit = this.edit.bind(this)
    this.save = this.save.bind(this)
    this.renderChampionship = this.renderChampionship.bind(this)
  }

  // function updates state for editing
  edit() {
    this.setState({ editing: true }) 
  }

  //  render championship info depending on editing state
  renderChampionship(item){
    if(!this.state.editing){  // normal state
      return(
        <h5 className="card-subtitle">
          <span>{item.sport.num_of_championships} championship victories</span>
          {this.props.editable && // check if we want to display edit button
              <button 
                id='edit' 
                onClick={this.edit} 
                className='btn btn-primary' 
                style={{display: 'inline-block', marginLeft:'2px'}}
              >
                <MdModeEdit/>
              </button>
          }
        </h5>
      )
    }
    else{                     // editing state
      return(
        <form>
          <h5 className="card-subtitle">
            <label style={{marginRight: '7px'}}>
              <input 
                ref={input => this.newCount = input}
                type="number" 
                name="count" 
                defaultValue={item.sport.num_of_championships}
                style={{width:'83px', marginRight: '7px'}}
              />
              <span>championships</span>
            </label>
            <button 
                  id='save' 
                  onClick={this.save} 
                  className='btn btn-primary' 
                  style={{display: 'inline-block', marginLeft:'2px'}}
                >
                  <MdSave/>
            </button>
          </h5>
        </form>
      )
    }
  }

  // save changes by notifying parent
  save(event) {
    event.preventDefault()
    this.props.onChange(this.newCount.value, this.props.item.name, this.props.index)
    this.setState({ editing: false }) 
  }

  // trainer render
  render() {
    return (
        <div className="trainer">
          <div>
            <h2 className="card-title">{ this.props.item.name }</h2>
            <h3 className="card-subtitle"> {this.props.item.gender}, { this.props.item.age } year old</h3>
            <h4 className="card-subtitle"> Trainer of {this.props.item.sport.name}</h4>
            {this.renderChampionship(this.props.item)}
          </div>
        </div>
      )
  }
}

export default Trainer
