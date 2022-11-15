//import {useIntl} from 'react-intl'
import {useState} from 'react'
import {MenuItem} from './MenuItem'
//import {MenuInnerWithSub} from './MenuInnerWithSub'
//import {MegaMenu} from './MegaMenu'
import asc_logo from './Assests/asc_logo.png'

export function MenuInner() {
  return (
    <>
      <figure className='figure my-4 p-4'>
        <img src={asc_logo} alt='logo' width={70}  />
        {/* <figcaption className='figure-caption'>  Complete Rapid Drug Testing
         and PPE Solutions</figcaption> */}
      </figure>
      <MenuItem title='Admin' to='/orgadmin' />
      <MenuItem title='Organisation Admin' to='/superadmin' />
      <MenuItem title='Organisation' to='/dashboard' />
      <MenuItem title='Products' to='/products' />
      <MenuItem title='Requests' to='/requests' />
      <MenuItem title='Reports' to='/reports' />
    </>
  )
}
