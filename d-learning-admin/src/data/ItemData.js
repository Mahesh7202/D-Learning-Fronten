import React from 'react';
import HomeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PostAddIcon from '@mui/icons-material/PostAdd';
import Groups3Icon from '@mui/icons-material/Groups3';
import GroupsIcon from '@mui/icons-material/Groups';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AddCardIcon from '@mui/icons-material/AddCard';

export const ItemData = [
    {
        title:"Student",
        items:
        [
            {
                name:"create_student",
                to:"admin/student/create",
                icon: <GroupAddIcon />
            },

            {
                name:"view_student",
                to:"admin/student/view",
                icon: <Groups3Icon />
            }
        ]
    },      
    
    {
        title:"Teacher",
        items:[
            {
                name:"create_teacher",
                to:"admin/teacher/create",
                icon: <PersonAddIcon />
            },
            {
                name:"view_teacher",
                to:"admin/teacher/view",
                icon: <GroupsIcon />
            }
        ]
       
    },
    {
        title:"Courses",
        items:[
            {
                name:"create_course",
                to:"admin/course/create",
                icon: <AddCardIcon />
            },
            {
                name:"view_course",
                to:"admin/course/view",
                icon: <LocalLibraryIcon />
            }
        ]
       
    },
    {
        title:"Resource",
        items:[
            {
                name:"create_resource",
                to:"admin/resource/create",
                icon: <PostAddIcon />
            },
            {
                name:"view_resource",
                to:"admin/resource/view",
                icon: <LibraryBooksIcon />
            }
        ]
       
    }
    
];