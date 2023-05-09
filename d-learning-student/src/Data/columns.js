
  export const courseColumns = [
    { field: "id", headerName: "ID" },
    {
      field: "sucode",
      headerName: "Su Code",
      flex: 0.2
    },
    {
      field: "coursename",
      headerName: "Course Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
   
    {
      field: "credits",
      headerName: "Credits",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 0.2
    }
  ];

  
  export const ResourceColumns = [
    { field: "id", headerName: "ID", flex: 0.2 },
    {
      field: "sucode",
      headerName: "Su Code",
      flex: 0.3,
    },
    {
      field: "coursename",
      headerName: "Course Name",
      flex: 1,
      cellClassName: "name-column--cell",
    }
  ];


  
