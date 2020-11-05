/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */

import {
  HashRouter,
  NavLink,
  Route
} from "react-router-dom"
import { List, ListItem, ListItemIcon } from "@material-ui/core"
import { graphRoute, homeRoute, searchRoute } from '../Consts/Routes'

import BarChartIcon from '@material-ui/icons/BarChart'
import SearchIcon from '@material-ui/icons/Search';
import SearchView from "../Views/SearchView"
import GraphView from "../Views/GraphView"
import HomeIcon from '@material-ui/icons/Home'
import HomeView from '../Views/HomeView'
import React from 'react'
import clsx from "clsx"

export default function NavigationMenu() {
  return (
    <HashRouter>
      <div>
        <List >
          <ListItem button classes={clsx("primary")}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <NavLink exact to={homeRoute}>
              Home
            </NavLink>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <NavLink exact to={graphRoute}>
              Graph
            </NavLink>
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <NavLink exact to={searchRoute}>
              Search
            </NavLink>
          </ListItem>
        </List>
        <div>
          <Route exact path={homeRoute} component={HomeView} />
          <Route path={graphRoute} component={GraphView} />
          <Route path={searchRoute} component={SearchView} />
        </div>
      </div>
    </HashRouter>
  )
}