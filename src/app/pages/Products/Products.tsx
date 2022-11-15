import React, {FC} from 'react'
import {PageTitle} from '../../../_metronic/layout/core'
import {ProductsTable} from '../../../_metronic/partials/widgets'

const Products: FC = () => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>Products</PageTitle>

      {<ProductsTable className={''} />}
    </>
  )
}

export default Products
