import axios from '../../FetchApi/Api'
import {useEffect, useState} from 'react'
import {CountryCode} from '../../Country/CountryCode'

const AddUser = () => {
  const [first_name, setFirst_name] = useState('')
  const [last_name, setLast_name] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState(CountryCode)
  const [selectedOrg, setSelectedOrg] = useState('')
  const [orgList, setOrgList] = useState([])
  
  //Fecthing Org admin names
  const API = async () => {
    await axios
      .get('/organization/')
      .then((Response) => {
        setOrgList(Response.data.data)
      })
      .catch((Error) => {
        console.log(Error)
      })
  }

  useEffect(() => {
    API()
  }, [])

  //Hnadling the form submit and posting it to the jason(database)
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(selectedOrg)
    const org = orgList.find((item) => item?.id == selectedOrg);

    const AddUser = {first_name, last_name, email, phone, org: org?.id, org_name: org?.name}
    axios
      .post('/user/', AddUser)
      .then((Response) => {
        console.log(Response)
        alert('User Added')
      })
      .catch((error) => {
        console.log(error.Response.data)
      })
  }

  return (
    <div className='w-50 mx-auto p-10 shadow  mb-5 bg-body rounded '>
      <form onSubmit={handleSubmit}>
        <br />
        <h2 className='text-primary'>Add user</h2>
        <br />
        <div className='form-floating mb-7'>
          <input
            type='text'
            className='form-control form-control-solid'
            id='floatingInput1'
            value={first_name}
            onChange={(e) => setFirst_name(e.target.value)}
            required
          />
          <label htmlFor='floatingInput1'>
            First Name <span>*</span>
          </label>
        </div>

        <div className='form-floating mb-7'>
          <input
            type='text'
            className='form-control form-control-solid'
            id='floatingInput1'
            value={last_name}
            onChange={(e) => setLast_name(e.target.value)}
          />
          <label htmlFor='floatingInput1'>Last Name</label>
        </div>

        <div className='form-floating mb-7'>
          <input
            type='email'
            className='form-control form-control-solid'
            id='floatingInput1'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor='floatingInput1'>Email</label>
        </div>

        <div className='form-floating mb-7'>
          <input
            type='tel'
            className='form-control form-control-solid'
            id='floatingInput1'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <label htmlFor='floatingInput1'>Phone no.</label>
        </div>

        {/* Drop Down */}
        <div className='form-floating mb-7'>
          <select
            className='form-select form-select-solid cursor-pointer'
            id='floatingSelect1'
            aria-label='Floating label select example'
            onChange={(e) => setSelectedOrg(e.target.value)}
            value = {selectedOrg}
            required
          >
            <option defaultValue>{}</option>
            {orgList.map((item) => (
              <option key={item.id} value={item?.id}>
                {item.name}
              </option>
            ))}
          </select>
          <label htmlFor='floatingSelect1'>Organization name</label>
        </div>

        <div className='col-md-12 text-center'>
          <button className='btn btn-sm fw-bold btn-primary'type="sumbit">
            Add
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddUser
