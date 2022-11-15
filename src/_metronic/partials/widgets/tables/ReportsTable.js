/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from '../../../../app/FetchApi/Api'
import React, { useEffect, useState } from 'react'
import { KTSVG } from '../../../helpers'

//type Props = {
//className: string,
//id: number
//}

//const ReportsTable: React.FC<Props> = ({className}) => {
const ReportsTable = ({className}) => {
  const [data, setData] = useState([]);

  const api = async () => {
    await axios.get('/user/').then((response) => { setData(response.data) })
  }

  useEffect(() => {
    api()
    console.log(data)
  }, [])

  return (


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
                <th className='min-w-120px'>Phone Number</th>
                <th className='min-w-120px'>Organisation</th>
                <th className='min-w-120px'>Status</th>
                <th className='min-w-120px'>View / Edit/ Delete</th>
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
                    <p className='text-dark fw-bold fs-6'>Had to be updated</p>
                  </td>
                  <td>
                    <p className='text-dark fw-bold fs-6'>{item.phone}</p>
                  </td>
                  <td>
                  <span className='badge badge-light-success'>Approved</span>
                </td>

                  {/* <td className='text-dark fw-bold text-hover-primary fs-6'>$3560</td> */}
                  {/* <td>
                  <span className='badge badge-light-success'>Approved</span>
                </td> */}
                  <td className=''>
                    <a
                      href='#'
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                    >
                      <KTSVG
                        path='/media/icons/duotune/general/gen019.svg'
                        className='svg-icon-3'
                      />
                    </a>
                    <a
                      href='#'
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                    >
                      <KTSVG
                        path='/media/icons/duotune/art/art005.svg'
                        className='svg-icon-3'
                      />
                    </a>
                    <a
                      href='#'
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                    >
                      <KTSVG
                        path='/media/icons/duotune/general/gen027.svg'
                        className='svg-icon-3'
                      />
                    </a>
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
    </div>


  )
}

export { ReportsTable }