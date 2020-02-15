import {observable} from 'mobx'
import { createContext } from 'react'

class ActivityStore {
    @observable title = 'Hello from mobx'
}

//new adds this to context
export default createContext(new ActivityStore)