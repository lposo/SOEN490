import { List, ListItem, ListItemIcon, ListItemText, Paper, makeStyles } from "@material-ui/core"
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom'
import { aboutRoute, dataCellAnalysisRoute, datasetUploadRoute, fileUploadRoute, graphRoute, homeRoute, profileRoute, researchPaperAnalysisRoute, searchRoute, signInRoute, signOutRoute, signUpRoute, unapprovedDatasetsRoute } from '../Common/Consts/Routes'

import { AboutView } from "./Home/AboutView"
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import BarChartIcon from '@material-ui/icons/BarChart'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import { DataCellAnalysisView } from "./DataCellAnalysis/DataCellAnalysisView"
import { DatasetUploadView } from "./DatasetUpload/DatasetUploadView"
import DonutSmallIcon from '@material-ui/icons/DonutSmall'
import FileUploadView from "./DataCell/FileUploadView"
import GraphView from "./Graph/GraphView"
import HomeIcon from '@material-ui/icons/Home'
import HomeView from "./Home/HomeView"
import ImageSearchIcon from '@material-ui/icons/ImageSearch'
import InfoIcon from '@material-ui/icons/Info'
import CommentIcon from '@material-ui/icons/Comment';
import { ProfileView } from "./Profile/ProfileView"
import React from 'react'
import { ResearchPaperAnalysisView } from "./ResearchPaperAnalysis/ResearchPaperAnalysisView"
import { Route } from 'react-router'
import SearchIcon from '@material-ui/icons/Search'
import SearchView from "./Search/SearchView"
import SignInView from "../Components/Authentication/SignInView"
import SignUpView from "../Components/Authentication/SignUpView"
import { UnapprovedDatasetView } from "./UnapprovedDatasets"




interface IProps {
  id: string;
  icon?: React.ReactElement;
  primary: string;
  to: string;
}

export const linkWidth: number = 240

export const ListItemLink = (props: IProps) => {
  const { id, icon, primary, to } = props

  const renderLink = React.useMemo(
    () =>
      React.forwardRef<any, Omit<RouterLinkProps, 'to'>>((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to],
  )

  return (
    <ListItem id={id} button component={renderLink}>
      {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
      <ListItemText primary={primary} />
    </ListItem>
  )
}

const useStyles = makeStyles({
  root: {
    width: linkWidth,
  },
})

export const ListRouter = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Paper elevation={0}>
        <List aria-label="main mailbox folders">
          <ListItemLink id="home-menu" to={homeRoute} primary="Home" icon={<HomeIcon />} />
          <ListItemLink id="graph-menu" to={graphRoute} primary="Graph" icon={<BarChartIcon />} />
          <ListItemLink id="search-menu" to={searchRoute} primary="Search" icon={<SearchIcon />} />
          <ListItemLink id="fileupload-menu" to={fileUploadRoute} primary="File Upload" icon={<CloudUploadIcon />} />
          <ListItemLink id="dataset-menu" to={datasetUploadRoute} primary="Dataset Upload" icon={<CloudUploadIcon />} />
          <ListItemLink id="cellanalysis-menu" to={dataCellAnalysisRoute} primary="Data Cell Analysis" icon={<DonutSmallIcon />} />
          <ListItemLink id="research-menu" to={researchPaperAnalysisRoute} primary="Research Analysis" icon={<ImageSearchIcon />} />
          <ListItemLink id="profile-menu" to={profileRoute} primary="Profile" icon={<AccountBoxIcon />} />
          <ListItemLink id="about-menu" to={aboutRoute} primary="About Databoom" icon={<InfoIcon />} />
          <ListItemLink id="admin-menu" to={unapprovedDatasetsRoute} primary="Needs Review (#)" icon={<CommentIcon />} />
        </List>
      </Paper>
    </div>
  )
}

export const getRoutedViews = () => {
  return (
    <>
      <Route exact path={homeRoute} component={HomeView} />
      <Route path={graphRoute} component={GraphView} />
      <Route path={fileUploadRoute} component={FileUploadView} />
      <Route path={searchRoute} component={SearchView} />
      <Route path={datasetUploadRoute} component={DatasetUploadView} />
      <Route path={researchPaperAnalysisRoute} component={ResearchPaperAnalysisView} />
      <Route path={dataCellAnalysisRoute} component={DataCellAnalysisView} />
      <Route path={aboutRoute} component={AboutView} />
      <Route path={profileRoute} component={ProfileView} />
      <Route path={signInRoute} component={SignInView} />
      <Route path={signUpRoute} component={SignUpView} />
      <Route path={unapprovedDatasetsRoute} component={UnapprovedDatasetView} />
    </>
  )
}