import {useState} from 'react'
import axios from '../../FetchApi/Api'

const AddOAdmin = () => {
  const [first_name, setFirst_name] = useState('')
  const [last_name, setLast_name] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  //Hnadling the form submit and posting it to the (database)
  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Admin Added!')
    const SubmitOA = {first_name, last_name, email, phone, type: 'OA'}
    axios
      .post('/user/', SubmitOA)
      .then((Response) => {
        console.log(Response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div>
      {/* <h2>Add Org admin dummy</h2> */}
      <form onSubmit={handleSubmit}>
        <div className='form-floating mb-7'>
          <input
            type='text'
            className='form-control form-control-solid bg-white'
            id='floatingInput1'
            value={first_name}
            onChange={(e) => setFirst_name(e.target.value)}
            required
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
            required
          />
          <label htmlFor='floatingInput1'>Email</label>
        </div>
        <div className='form-floating mb-7'>
          <input
            type='text'
            required
            className='form-control form-control-solid bg-white'
            id='floatingInput1'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <label htmlFor='floatingInput1'>Phone no.</label>
        </div>

        {/* Owner DropDown starts*/}

        {/* Owner DropDown ends */}

        <div className='col-md-12 text-center'>
          <button className='btn btn-sm fw-bold btn-primary' onSubmit={handleSubmit}>
            Add
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddOAdmin