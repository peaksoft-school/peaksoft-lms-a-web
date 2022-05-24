import React, { useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { NavLink } from 'react-router-dom'
import styled from '@emotion/styled'

function LinkTab(props) {
   return <StyledTab component={NavLink} {...props} />
}

export default function NavTabs({ tabs }) {
   const [tabsValue, setTabsValue] = useState(0)
   const onChangeTabsHandler = (event, newValue) => {
      setTabsValue(newValue)
   }

   return (
      <StyledTabs
         value={tabsValue}
         onChange={onChangeTabsHandler}
         aria-label="nav tabs example"
      >
         {tabs.map((tab) => (
            <LinkTab label={tab.title} to={tab.to} key={tab.title} />
         ))}
      </StyledTabs>
   )
}

const StyledTabs = styled(Tabs)`
   .MuiTabs-scroller {
      display: flex;
      justify-content: center;
      align-items: center;
   }
   .MuiTabs-indicator {
      width: 100%;
      height: 3px;
      background: #3772ff;
      border-radius: 5px 5px 0px 0px;
   }
`
const StyledTab = styled(Tab)`
   padding: 0px 27px 0px 27px;
   margin-bottom: 11px;
   text-transform: none;
   font-family: 'Open Sans' sans-serif;
   font-style: normal;
   font-weight: 600;
   font-size: 16px;
   line-height: 22px;
   letter-spacing: 1px;
   color: black;
`
