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
    <div className='h-screen  text-center flex items-center justify-center'>
        <div className='w-full lg:w-96'>
        <h1 className='text-2xl'>Hello! {name}</h1>
        <div className="divider">{email}</div>
        <h1 className='text-lg'>Enter Room Name</h1>
        <input ref={getRoomID} className="input m-2 input-bordered w-full" type="text" /> <br />
        <button className='btn m-1' onClick={logout} >Logout</button>
        <button className="btn"  onClick={hanldeRoomBtn}>Join Room</button>
        </div>
    </div>
    
  )
}
