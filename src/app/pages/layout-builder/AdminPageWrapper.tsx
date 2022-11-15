import React, {FC} from 'react'
import {PageTitle} from '../../../_metronic/layout/core'
import { TablesWidget12 } from '../../../_metronic/partials/widgets'

const AdminPageWrapper: FC = () => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>Admin</PageTitle>
      <TablesWidget12 />
    </>
  )
}

export default AdminPageWrapper
