import React from 'react'
import {Route} from 'react-router-dom'
import TrainersList from '../components/trainersList'
import Navigator from '../components/navigator'
import Header from '../components/header'

// heroku trainer service urls
const urlAll = 'https://trainers-managing.herokuapp.com/getAllTrainers'
const urlSportAge = 'https://trainers-managing.herokuapp.com/getTrainersByAgeSportType?age=0&sportType=football'
const urlChampionship = 'https://trainers-managing.herokuapp.com/setNumOfChampionships'

// React router
const ReactRouter = () => {
    return (
        <React.Fragment>
            <Header/>
            <Navigator/>
            <Route exact path='/' render={(props) => 
                <TrainersList 
                    {...props} url={urlAll} 
                    title={'Home'} 
                />
            }/>
            <Route exact path={'/sport'} render={(props) => 
                <TrainersList 
                    {...props} 
                    url={urlSportAge}
                    title={'Trainers by Sport'}
                    selectable={true}
                >
            </TrainersList>}
            />
            <Route exact path='/championship' render={(props) => 
                <TrainersList 
                    {...props} 
                    url={urlAll} 
                    urlUpdate={urlChampionship}
                    title={'Manage Championship Count'} 
                    editable={true}
                />
            }/>
        </React.Fragment>
    )
}


export default ReactRouter