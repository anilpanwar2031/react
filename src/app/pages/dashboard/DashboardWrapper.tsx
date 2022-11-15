/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
// import {PageTitle} from '../../../_metronic/layout/core'
import {TablesWidget13} from '../../../_metronic/partials/widgets'

const DashboardPage: FC = () => (
  <>
    <div className='row gy-5 gx-xl-8'>
      <TablesWidget13 className={''} />
    </div>
  </>
)

const DashboardWrapper = () => {
  return (
    <>
      {/* <PageTitle breadcrumbs={[]}>Organisation</PageTitle> */}
      <DashboardPage />
    </>
  )
}

export {DashboardWrapper}
