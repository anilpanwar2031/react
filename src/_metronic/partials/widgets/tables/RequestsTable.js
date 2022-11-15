/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from '../../../../app/FetchApi/Api'
import React, {useEffect, useState} from 'react'
import {KTSVG} from '../../../helpers'
import AddUser from '../../../../app/pages/Requests/AddUser'
import _ from 'lodash'

//type Props = {
//className: string,
//id: number
//}

const RequestsTable = ({className}) => {
  const [data, setData] = useState([])
  const [toggle, setToggle] = useState()
  const [addUser, setAddUser] = useState(false)

  // const [approve, setApprove] = useState(-1);

  // States for updating
  const [first_name, setFirst_name] = useState('')
  const [last_name, setLast_name] = useState('')
  const [email, setEmail] = useState('')
  const [org, setOrg] = useState('')
  const [org_name, setOrg_name] = useState('')

  //For Update dropdown
  const [orgName, setOrgName] = useState([])

  // Handle Aprrove
  const handleApprove = (item) => {
    // console.log(is_active)

    const editActive = {is_active: true}

    axios
      .patch(`/user/${item.id}/`, editActive)
      .then((Response) => {
        // const tableData = _.cloneDeep(data)
        const tableData = [...data]
        const itemIndex = tableData?.findIndex((it) => it?.id == item?.id)
        tableData[itemIndex] = Response.data
        setData(tableData)
        console.log(Response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  //Api call to list users.
  const api = async () => {
    await axios
      .get('/user/')
      .then((response) => {
        setData(response.data)
      })
      .catch((error) => {
        console.log(error)
      })

    //Fecthing Org names
    await axios
      .get('/organization/')
      .then((Response) => {
        setOrgName(Response.data.data)
      })
      .catch((Error) => {
        console.log(Error)
      })
  }
  //Api call for particluar user to edit.
  const Toggle = async (id) => {
    setToggle(id)
    await axios
      .get(`/user/${id}/`)
      .then((Response) => {
        setFirst_name(Response.data.data.first_name)
        setLast_name(Response.data.data.last_name)
        setEmail(Response.data.data.email)
        setOrg(Response.data.data.org)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  //Delete particluar user
  const DeleteUser = (item) => {
    const text = 'Are sure want to delete.'
    {
      window.confirm(text) == true &&
        axios
          .delete(`/user/${item.id}/`)
          .then(() => {
            const tableData = _.cloneDeep(data)
            const filteredData = tableData?.filter((it) => it?.id != item?.id)
            setData(filteredData)
          })
          .catch((error) => {
            console.log(error)
          })
    }
  }
  useEffect(() => {
    api()
  }, [])

  //Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault()
    alert('User Edited!')

    const EditedUser = {first_name, last_name, email, org}

    axios
      .patch(`/user/${toggle}/`, EditedUser)
      .then((Response) => {
        console.log(Response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <>
      <div className='page-heading d-flex align-items-center text-dark fw-bold fs-3 my-0 justify-content-between py-3 py-lg-6'>
        {/* {toggle ? <h3>Edit User</h3> : <h3>Requests</h3>} */}
        {toggle && <h3>Edit User</h3>}
        {!toggle && !addUser && <h3>Requests</h3>}
        {addUser && <h3>Add User</h3>}

        <div
          onClick={() => setToggle('')}
          className='btn btn-sm fw-bold btn-primary'
          data-bs-toggle='modal'
          data-bs-target='#kt_modal_create_app'
        >
          {' '}
          {!toggle && !addUser && (
            <span
              onClick={() => {
                setAddUser( current => !current )
              }}
            >
              Add User
            </span>
          )}
          {(toggle || addUser) && (
            <span
              onClick={() => {
                setAddUser(false)
              }}
            >
              Back
            </span>
          )}
        </div>
      </div>
      {!toggle && !addUser && (
        <div>
          <div className={`card ${className}`}>
            {/* <div className={`card ${className}`}> */}
            {/* begin::Body */}
            <div className='card-body py-3'>
              {/* begin::Table container */}
              <div className='table-responsive'>
                {/* begin::Table */}
                <table className='table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3'>
                  {/* begin::Table head */}
                  <thead>
                    <tr className='fw-bold text-muted'>
                      <th className='min-w-150px'>First Name</th>
                      <th className='min-w-140px'>Last Name</th>
                      <th className='min-w-120px'>Email</th>
                      <th className='min-w-120px'>Phone Number</th>
                      <th className='min-w-120px'>Organisation</th>
                      <th className='min-w-120px'>Status</th>
                      <th className='min-w-120px'>Edit/ Delete</th>
                      {/* <th className='min-w-120px'>Status</th> */}
                      {/* <th className='min-w-100px text-end'>Actions</th> */}
                    </tr>
                  </thead>
                  {/* end::Table head */}
                  {/* begin::Table body */}
                  <tbody>
                    {data.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <p className='text-dark fw-bold fs-6'>{item.first_name}</p>
                        </td>
                        <td>
                          <p className='text-dark fw-bold fs-6'>{item.last_name}</p>
                        </td>
                        <td>
                          <p className='text-dark fw-bold fs-6'>{item.email}</p>
                        </td>
                        <td>
                          <p className='text-dark fw-bold fs-6'>{item.phone}</p>
                        </td>
                        <td>
                          <p className='text-dark fw-bold fs-6'>{item.org_name}</p>
                        </td>
                        <td key={item.id}>
                          <div>
                            {item.is_active && (
                              <span className='badge badge-light-success'>Approved</span>
                            )}
                            {!item.is_active && (
                              <span
                                onClick={() => {
                                  handleApprove(item)
                                }}
                                className='badge badge-light-danger'
                              >
                                Not Approved
                              </span>
                            )}
                          </div>
                        </td>

                        {/* <td className='text-dark fw-bold text-hover-primary fs-6'>$3560</td> */}
                        {/* <td>
                  <span className='badge badge-light-success'>Approved</span>
                </td> */}
                        <td className=''>
                          {/* <a
                            href='#'
                            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                          >
                            <KTSVG
                              path='/media/icons/duotune/general/gen019.svg'
                              className='svg-icon-3'
                            />
                          </a> */}
                          <div
                            onClick={() => {
                              Toggle(item.id)
                            }}
                            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                          >
                            <KTSVG
                              path='/media/icons/duotune/art/art005.svg'
                              className='svg-icon-3'
                            />
                          </div>
                          <div
                            onClick={() => DeleteUser(item)}
                            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                          >
                            <KTSVG
                              path='/media/icons/duotune/general/gen027.svg'
                              className='svg-icon-3'
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  {/* end::Table body */}
                </table>
                {/* end::Table */}
              </div>
              {/* end::Table container */}
            </div>
            {/* begin::Body */}

            {/* Begins Editing section */}
          </div>{' '}
        </div>
      )}

      {toggle && (
        <div>
          <div className='form-floating mb-7'>
            <input
              type='text'
              className='form-control form-control-solid bg-white'
              id='floatingInput1'
              value={first_name}
              onChange={(e) => setFirst_name(e.target.value)}
            />
            <label htmlFor='floatingInput1'>First Name</label>
          </div>
          <div className='form-floating mb-7'>
            <input
              type='text'
              className='form-control form-control-solid bg-white'
              id='floatingInput1'
              value={last_name}
              onChange={(e) => setLast_name(e.target.value)}
            />
            <label htmlFor='floatingInput1'>Last Name</label>
          </div>
          <div className='form-floating mb-7'>
            <input
              type='email'
              className='form-control form-control-solid bg-white'
              id='floatingInput1'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor='floatingInput1'>Email</label>
          </div>

          <div className='form-floating mb-7'>
            <input
              type='number'
              className='form-control form-control-solid bg-white'
              id='floatingInput1'
              value={org}
              onChange={(e) => setOrg(e.target.value)}
            />
            <label htmlFor='floatingInput1'>Org</label>
          </div>

          {/* dropdown */}
          {/* Drop Down */}
          <div className='form-floating mb-7'>
            <select
              className='form-select form-select-solid bg-white cursor-pointer'
              id='floatingSelect1'
              aria-label='Floating label select example'
              onChange={(e) => setOrg_name(e.target.value)}
              required
            >
              <option defaultValue>{org_name}</option>
              {orgName.map((item) => (
                <option key={item.id} value={org}>
                  {item.name}
                </option>
              ))}              
            </select>
            <label htmlFor='floatingSelect1'>Organization name</label>
          </div>

          <div className='col-md-12 text-center'>
            <span className='btn btn-sm fw-bold btn-primary' onClick={handleSubmit}>
              Update
            </span>
          </div>
        </div>
      )}

      {addUser && (
        <div>
          <AddUser />
        </div>
      )}
    </>
  )
}

export {RequestsTable}
