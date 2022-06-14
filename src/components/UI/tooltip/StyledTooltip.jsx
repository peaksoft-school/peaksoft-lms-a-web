import { Tooltip } from '@mui/material'
import { styled } from '@mui/system'

export const StyledTooltip = styled(({ className, ...props }) => (
   <Tooltip {...props} classes={{ popper: className }} placement="top" />
))`
   & .MuiTooltip-tooltip {
      background: #8d949e;
      border-radius: 8px;
      height: 28px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 6px 8px;
      gap: 10px;
   }
`
