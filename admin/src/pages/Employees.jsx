import React, { useEffect, useState } from 'react'
import { useStateContext } from "../contexts/ContextProvider";
import { Header } from '../components';
import { DataGrid } from '@mui/x-data-grid';
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';
import axios from "../axios";
import { useAlert } from 'react-alert';



const Employees = () => {
  const { setFormPage, loadStart, loadEnd, user } = useStateContext();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const alert = useAlert();

  useEffect(() => {
    setFormPage(true);

    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`user/find/all/${user?._id}`);
        setUsers(res.data);
        setIsLoading(false);
      } catch (err) {
        alert.error(err.response.data.message)
        setIsLoading(false);
      }
    };
    fetchUsers()
  },[alert, setFormPage, user._id]);

  const deleteUser = async (id) => {
    loadStart();
    try {
      await axios.delete(`user/delete/${id}`);
      alert.success("user is deleted!");
      loadEnd();
      window.location.reload();
    } catch (err) {
      alert.error(err.response.data.message);
      loadEnd();
    }
  }

  // columns
  const columns = [
    {
      field: '_id',
      headerName: 'ID',
      width: 150
    },
    {
      field: 'firstName',
      headerName: 'First name',
      width: 150,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 150,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
      field: 'gender',
      headerName: 'Gender',
      sortable: false,
      width: 150,
    },
    {
      field: 'isAgent',
      headerName: 'Agent',
      sortable: false,
      width: 150,
    },
    {
      field: 'superAdmin',
      headerName: 'Super admin',
      sortable: false,
      width: 150,
    },

    {
      field: 'edit',
      headerName: 'Edit',
      renderCell: params => {
        return (
          <div key={params.row._id} className='flex gap-8 items-center' >
            <Link to={`/edituser/${params.row._id}`} >
              <button className='rounded-md py-1 px-3 text-white bg-teal-500 hover:bg-teal-400 transition-all' >Edit</button>
            </Link>
            <DeleteIcon onClick={() => deleteUser(params.row._id)} className="text-red-600 hover:text-red-300 transition-all cursor-pointer" />
          </div>
        )
      },
      width: 150,
    },
  ];

  return (
    <div className='m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg' >
      <Header category="page" title="Agents" />
      <Box sx={isLoading?{display: 'flex', width: "100%", justifyContent: "center"}:{ height: 550, width: "100%" }}>
        {isLoading ?
          <CircularProgress /> :
          <DataGrid
            rows={users}
            columns={columns}
            pageSize={8}
            checkboxSelection
            disableSelectionOnClick
            rowsPerPageOptions={[8]}
            getRowId={row=> row._id}
          />
        }

      </Box>
    </div>
  )
}

export default Employees