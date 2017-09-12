import { combineReducers } from 'redux';
import User from './User';
import Graph from './Graph';
import Unit from './Unit';
import Point from './Point';

export default combineReducers({
    User,
    Graph,
    Unit,
    Point
})