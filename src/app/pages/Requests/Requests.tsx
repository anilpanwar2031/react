import {FC} from 'react'
//import {PageTitle} from '../../../_metronic/layout/core'
import {RequestsTable} from '../../../_metronic/partials/widgets'

const Requests: FC = () => {
  return (
    <>
      {/* <PageTitle breadcrumbs={[]}>Requests </PageTitle> */}
      <RequestsTable className='' />
    </>
  )
}

export default Requests
