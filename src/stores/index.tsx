import React from 'react'
import { types, Instance } from 'mobx-state-tree'
import { Global } from './global'
import { Recommend, Mine } from './home'
import { Login } from './login'
import { Reg } from './reg'
import { Search } from './search'


export const stores = types
  .model({
    globalStore:            Global,
    recommendStore:         Recommend,
    mineStore:              Mine,
    loginStore:             Login,
    regStore:               Reg,
    searchStore:            Search,
  })
  .create({
    globalStore:            Global.create(),
    recommendStore:         Recommend.create(),
    mineStore:              Mine.create(),
    loginStore:             Login.create(),
    regStore:               Reg.create(),
    searchStore:            Search.create(),
  })

// Create the stores context
export const StoresContext = React.createContext<Instance<typeof stores> | null>(null)