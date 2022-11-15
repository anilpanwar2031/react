import React, {FC} from 'react'
import {PageTitle} from '../../../_metronic/layout/core'
import { ReportsTable } from '../../../_metronic/partials/widgets'
import Filters from './Filters'

const Reports: FC = () => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>Reports</PageTitle>
      <Filters/>
      <ReportsTable className='' />
    </>
  )
}

export default Reports