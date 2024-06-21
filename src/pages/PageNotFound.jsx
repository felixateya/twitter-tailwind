import { useNavigate } from 'react-router-dom'
import '../not-found.css'

function PageNotFound() {
    const navigate = useNavigate()
  return (
    <div className='h-screen w-full bg-[#15202B]'>
        <div className="container">
        <img className="ops" src="https://raw.githubusercontent.com/idindrakusuma/simple-404-template/f32c06a5ed4d22870edfab2802baedd9fc9ca324/assets/images/404.svg" />
        <br />
        <h3 className='text-slate-100'>Page Not Found!!!</h3>
        <br />
        <button onClick={()=>navigate(-1)} className="button hover:bg-blue-700 transition duration-200 ease-in-out">Go Back</button>
    </div>
    </div>
  )
}

export default PageNotFound