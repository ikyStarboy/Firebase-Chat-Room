import { useRef } from 'react'
import { auth } from '../../../firebase-config'

export default function Join({setRoomID,logout}) {
    const getRoomID = useRef(null)
   
    const hanldeRoomBtn =(e)=>{
     
        setRoomID(getRoomID.current.value)
    }
    const name= auth.currentUser.displayName
    const email= auth.currentUser.email
  return (
    <div className='h-screen px-3 lg:w-3/12 mx-auto text-center grid grid-cols-1 items-center justify-center'>
        <div className=''>
        <h1 className='text-2xl'>Hello! {name}</h1>
        <div className="divider">{email}</div>
        <h1 className='text-lg font-semibold'>Enter Room Name</h1>
        <input ref={getRoomID} className="input input-md my-2 input-bordered w-full" type="text" /> <br />
        <button className='btn m-1 bg-red-500 btn-md text-white' onClick={logout} >Logout</button>
        <button className="btn bg-green-500 hover:bg-green-600 text-white btn-md" onClick={hanldeRoomBtn}>Join Room</button>
        </div>
    </div>
    
  )
}
