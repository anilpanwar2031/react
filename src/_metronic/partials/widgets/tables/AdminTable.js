/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from '../../../../app/FetchApi/Api'
import React, {useEffect, useState} from 'react'
import {KTSVG} from '../../../helpers'

import AddAdmin from '../../../../app/pages/Admin/AddAdmin'
import _ from 'lodash'
import UpdateAdmin from '../../../../app/pages/Admin/UpdateAdmin'

//type Props = {
//className: string,
//id: number
//}

//const AdminTable: React.FC<Props> = ({className}) => {
const AdminTable = ({className}) => {
  const [data, setData] = useState([])
  const [toggle, setToggle] = useState()
  const [addAdmin, setAddAdmin] = useState(false)

  // const [approve, setApprove] = useState(-1);

  // States for updating
  const [first_name, setFirst_name] = useState('')
  const [last_name, setLast_name] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [org, setOrg] = useState('')

  //Validating
  const [showTable, setShowTable] = useState('')

  //Api call to list users.
  const api = async () => {
    await axios
      .get('/superadminlist/')
      .then((response) => {
        setData(response.data.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    api()
    console.log(data)
  }, [toggle, addAdmin])
  //Api call for particluar user to edit.
  const Toggle = async (item) => {
    setToggle(item.id)
  }

  //Delete particluar user

  const DeleteUser = (item) => {
    const text = 'Are sure want to delete.'
    {
      window.confirm(text) == true &&
        axios.delete(`/superadminlist/${item.id}/`).then(() => {
          const tableData = _.cloneDeep(data)
          const filteredData = tableData?.filter((it) => it?.id != item?.id)
          setData(filteredData)
        })
    }
  }

  return (
    <>
      <div className='page-heading d-flex align-items-center text-dark fw-bold fs-3 my-0 justify-content-between py-3 py-lg-6'>
        {/* {toggle ? <h3>Edit User</h3> : <h3>Requests</h3>} */}
        {toggle && <h3>Edit User</h3>}
        {!toggle && !addAdmin && <h3>Super Admin</h3>}
        {addAdmin && <h3>Add Super Admin</h3>}

        <div
          onClick={() => setToggle('')}
          className='btn btn-sm fw-bold btn-primary'
          data-bs-toggle='modal'
          data-bs-target='#kt_modal_create_app'
        >
          {!toggle && !addAdmin && (
            <span
              onClick={() => {
                setAddAdmin(!addAdmin)
              }}
            >
              Add Super Admin
            </span>
          )}
          {(toggle || addAdmin) && (
            <span
              onClick={() => {
                setAddAdmin(false)
              }}
            >
              Back
            </span>
          )}
        </div>
      </div>
      {!toggle && !addAdmin && (
        <div>
          {/* <h2>super admin dummytext</h2> */}
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
                      <th className='min-w-140px'>First Name</th>
                      <th className='min-w-140px'>Last Name</th>

                      <th className='min-w-140px'>Phone Number</th>
                      <th className='min-w-140px'>Edit/ Delete</th>
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
                          <p className='text-dark fw-bold fs-6'>{item.phone}</p>
                        </td>

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
                              Toggle(item)
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

      {toggle && <UpdateAdmin id={toggle} />}

      {addAdmin && (
        <div>
          <AddAdmin />
        </div>
      )}
    </>
  )
}

export {AdminTable}
