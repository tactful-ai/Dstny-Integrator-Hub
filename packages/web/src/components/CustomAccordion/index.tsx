import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useState } from 'react';

type CustomAccordionProps = {
    tag?: React.ReactNode;
    heading: string;
    children: string | React.ReactNode | React.ReactNode[];
    

}


function CustomAccordion({children, heading, tag=<></>} : CustomAccordionProps) {
    const [expanded, setExpanded] = useState<string | false>(false);

    const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Accordion sx={{my: '1rem'}} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
           {tag} 
          <Typography variant='h5' sx={{flexShrink: 0 }}>
            {heading}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {children}
        </AccordionDetails>
    </Accordion>

  )
}

export default CustomAccordion