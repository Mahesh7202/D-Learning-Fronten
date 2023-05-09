import React, { useState } from 'react';
import Link from '@mui/material/Link';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { d, b, s } from '../../global/convertor';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import {
    Link as RouterLink,
    Route,
    Routes,
    MemoryRouter,
    useLocation,
} from 'react-router-dom';
import { useEffect } from 'react';
// import { b, d, s } from '../../util/convertor';



// const breadcrumbNameMap = {
//     '/d':Department.find((v) => v["value"] == value[see["dept"]])["label"],
//     '/d/b':Branch.find((v) => v["value"] == value[see["bran"]])["label"],
//      '/d/b/s':Semno.find((v) => v["value"] == value[see["semno"]])["label"]
// };
export function LinkRouter(props) {
    return <Link {...props} component={RouterLink} />;
}

export default function Page({path}) {
   
    const [see, setSee] = useState();
    
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);
   
    useEffect(() => {
        const s = location.state || {};
        setSee(s);
    },[path]);



    return (
        <Breadcrumbs aria-label="breadcrumb">
            {pathnames.map((value, index) => {
                const last = index === pathnames.length - 1;
                const to = `/${pathnames.slice(0, index+1).join('/')}`;

                return last ? (
                       <Typography color="text.primary" key={to}>
                        {see ?
                               value ==="d" ? d(see["dept"]):
                               value ==="b" ? b(see["bran"]):
                               value ==="s" ? s(see["semno"]): value:''
                        }
                       </Typography>
                ) : (
                    <LinkRouter underline="hover" color="inherit" to={to} key={to} state={see}>
                        { see?
                                value ==="d" ? d(see["dept"]):
                                value ==="b" ? b(see["bran"]):
                                value ==="s" ? s(see["semno"]): value:''
                        }
                    </LinkRouter>
                );
            })}
        </Breadcrumbs>
    );
}
