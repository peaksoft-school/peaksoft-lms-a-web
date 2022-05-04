import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { Box } from '@mui/material'
import Typography from '@mui/material/Typography'
import styled from '@emotion/styled'
import { useState } from 'react'

function TabPanel(props) {
   const { children, value, index, ...other } = props

   return (
      <div
         role="tabpanel"
         hidden={value !== index}
         id={`simple-tabpanel-${index}`}
         aria-labelledby={`simple-tab-${index}`}
         {...other}
      >
         {value === index && (
            <Box sx={{ p: 3 }}>
               <Typography>{children}</Typography>
            </Box>
         )}
      </div>
   )
}

export function BasicTabs({ tabs }) {
   const [tabsValue, setTabsValue] = useState(0)

   const tabsChangeHandler = (event, newValue) => {
      setTabsValue(newValue)
   }

   return (
      <Box>
         <StyledTabs
            value={tabsValue}
            onChange={tabsChangeHandler}
            aria-label="basic tabs example"
         >
            {tabs.map(({ label }) => (
               <StyledTab label={label} key={label} />
            ))}
         </StyledTabs>
         {tabs.map(({ Component, label }, i) => (
            <TabPanel value={tabsValue} index={i} key={label}>
               {Component}
            </TabPanel>
         ))}
      </Box>
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
