import { useContext } from "react"
import { db } from "../../firebase/firebaseConfig"
import { EditCaptureContext } from "./context/EditCaptureContext"

export const Save = ({ setIsEdit }) => {

    const { mission } = useContext(EditCaptureContext)

    const updateChange = () => {
        setIsEdit(prev => !prev)
        const newMission = { ...mission }
        delete newMission.id
        db.doc(`captures/${mission.id}`).update(newMission)
    }
    return (
        <span className="px-2 bg-green-700/20 hover:bg-green-300 cursor-pointer rounded"
            onClick={updateChange}
        >Guardar<i className="fas fa-ellipsis-h pt-2 text-lg"></i></span>
    )
}