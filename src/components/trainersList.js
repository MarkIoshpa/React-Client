import React, { Component } from 'react'
import Trainer from './trainers'

const proxy = 'https://cors-anywhere.herokuapp.com/' // to allow CORS

// Trainer list component displays and manages trainer components
class TrainersList extends Component {
  constructor(props) {
    super(props)
    this.state = { trainers: [], sport: 'football', age: 0}

    this.fetchData = this.fetchData.bind(this)
    this.eachTrainer = this.eachTrainer.bind(this)
    this.add = this.add.bind(this)
    this.update = this.update.bind(this)
    this.selectRender = this.selectRender.bind(this)
    this.handleChangeSport = this.handleChangeSport.bind(this)
    this.handleChangeAge = this.handleChangeAge.bind(this)
  }

  // fetch data from service when component did mount
  componentDidMount() {
    this.fetchData(this.props.url)
  }

  // function to fetch data from url
  fetchData(url) {
        fetch(proxy + url)
        .then(res => res.json())
        .then(data => this.setState({trainers: []}, // reset data before writing
            () => data.map(item => 
              this.add(
                  {
                    id: item.id,
                    name: item.name,
                    age: item.age,
                    gender: item.gender,
                    sport: {  
                        name: item.sport.name,
                        num_of_championships: item.sport.num_of_championships
                    }
                  }
                )
              )
            )
          )
        .catch(err => console.error(err))
  }

  // function adds data to state
  add({id = null, name = 'default name', age = 0, gender = 'default', sport = null}) {
    this.setState(prevState => ({
      trainers: [
        ...prevState.trainers, {
          id: id,
          name: name,
          age: age,
          gender: gender,
          sport: {
            name: sport.name,
            num_of_championships: sport.num_of_championships
          }
        }
      ]
    }))
  }

  // function updates championship count and sends post request to update service
  update(newCount, name, i) {

    // update trainer state to new count value
    this.setState(prevState => ({
      trainers: prevState.trainers.map(data => data.id !== i ? data : { ...data, sport: {...data.sport, num_of_championships: newCount} })
    }))

    // send post request to service
    fetch(proxy + this.props.urlUpdate, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        championships: newCount
      })
    })
  }

  // render each trainer component
  eachTrainer(item, i) {
    return (
      <div key={ `container${i}` } className="card">
        <div className="card-body">
          <Trainer 
            index={ item.id } 
            item={item} 
            editable={this.props.editable}
            onChange={ this.update }
          />
        </div>
      </div>
    );
  }

  // render combo-box for sport selection
  selectRender(){
    return(
      <div className="trainersSelect"> 
        <select onChange={this.handleChangeSport}>
          <option value="football">Football</option>
          <option value="swimming">Swimming</option>
          <option value="cricket">Cricket</option>
          <option value="gymnastics">Gymnastics</option>
        </select> 
        <label style={{marginLeft: '10px'}}>Age greater than
          <input type='number' defaultValue='0' min="0" max="100" onChange={this.handleChangeAge}></input>
        </label>
      </div>
    )
  }

  

  // handle changes to combo-box
  handleChangeSport(event){
    this.setState({trainers: [], sport: event.target.value}, () => {
      let url = 'https://trainers-managing.herokuapp.com/getTrainersByAgeSportType?age=' + this.state.age + '&sportType=' + this.state.sport
      this.fetchData(url)
    })

  }

  // handle changes to age input
  handleChangeAge(event){
      this.setState({trainers: [], age: parseInt(event.target.value)}, () => {
        let url = 'https://trainers-managing.herokuapp.com/getTrainersByAgeSportType?age=' + this.state.age + '&sportType=' + this.state.sport
        this.fetchData(url)
      })
  }

  // trainer list render
  render() {
    return (
      <div>
        <h1 className="location">{this.props.title} {this.props.selectable && this.selectRender()}</h1>
        <div className="trainersList">
          { this.state.trainers.map(this.eachTrainer) }
        </div>
      </div>
    )
  }
}

export default TrainersList;
