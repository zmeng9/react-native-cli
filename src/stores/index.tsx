import React from 'react'
import { types, Instance } from 'mobx-state-tree'
import { Global } from './global'
import { Recommend, Mine, Login } from './home'
import { Search } from './search'

export const stores = types
  .model({
    globalStore:            Global,
    recommendStore:         Recommend,
    mineStore:              Mine,
    loginStore:             Login,
    searchStore:            Search,
  })
  .create({
    globalStore:            Global.create(),
    recommendStore:         Recommend.create(),
    mineStore:              Mine.create(),
    loginStore:             Login.create(),
    searchStore:            Search.create(),
  })

// Create the stores context
export const StoresContext = React.createContext<Instance<typeof stores> | null>(null)