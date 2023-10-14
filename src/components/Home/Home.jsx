import axios from "axios"
import { useContext, useEffect } from "react"
// import style from './Home.module.css'
import Swal from "sweetalert2"
import { noteContext } from "../../Context/NoteContext"

export default function Home() {
  let headers = { token: localStorage.getItem('token') }
  let { setmyNotes, myNotes } = useContext(noteContext)
  //show notes
  async function showMyNotes() {
    try {
      let { data } = await axios.get('https://note-sigma-black.vercel.app/api/v1/notes', { headers })
      setmyNotes(data)
    } catch (error) {
      setmyNotes()
    }
  }

  //delete note
  async function deleteMyNote(id) {
    let { data } = await axios.delete(`https://note-sigma-black.vercel.app/api/v1/notes/${id}`, { headers })
    console.log(data);
    showMyNotes()
  }
  function deleteNote(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to delete this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMyNote(id)
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

  //update note
  async function modifNote(title, content, id) {
    let { data } = await axios.put(`https://note-sigma-black.vercel.app/api/v1/notes/${id}`, { title, content }, { headers })
    console.log(data);
    showMyNotes()
  }
  function updateNote(id, prevTitle, prevContent) {
    Swal.fire({
      title: 'Update Note 🎀',
      html: `
    <input type="text" placeholder="Enter Title" id="title" name="title" class="form-control" value="${prevTitle}"/>
    <textarea type="text" placeholder="Enter Discription" id="content" name="content" class="form-control">${prevContent}</textarea>
    `,
      showCancelButton: true,
      confirmButtonText: 'Update',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const title = document.getElementById('title').value
        const content = document.getElementById('content').value
        return { title, content }
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(result);
        modifNote(result.value.title, result.value.content, id)
        Swal.fire(
          'Added!',
          'Your Note has been Added.',
          'success'
        )
      }
    })
  }
  useEffect(() => {
    showMyNotes()
    console.log(myNotes)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <>
    <div>
      <h2 className="font-Montserrat h4 heading">
        <i className="bi bi-folder me-2"></i>My Notes
      </h2>
      {myNotes == null ? <div className="d-flex justify-content-center align-items-center"> <h2> Notes Empty </h2></div> : <div>{myNotes.msg !== "done" ? <div className="d-flex justify-content-center align-items-center"> <h2> Notes Empty </h2></div>
        : <div>
          <div className="row g-4 p-4  " >
            {myNotes?.notes?.map((note, ind) =>
              <div className="col-md-4">
                <div key={ind} className=" note ">
                  <div className="pin_icon">
                    <i class="fa-solid fa-thumbtack" style={{ color: " #1150c5;" }}></i>
                  </div>
                  <div className="note-body p-2 m-2 content">
                    <h2 className="h6 fw-semibold m-2 font-Montserrat bottomborder ">{note.title}</h2>
                    <p className="m-2  ">{note.content}</p>
                  </div>
                  <div className="note-footer d-flex justify-content-around ">
                    <i onClick={() => updateNote(note._id, note.title, note.content)} className="fa-solid fa-pen-to-square pointer" style={{ color: "#ffffff" }}></i>
                    <i onClick={() => deleteNote(note._id)} className="fa-solid fa-trash-can pointer " style={{ color: "#ffffff" }}></i>
                  </div>
                </div>
              </div>
            )}</div>
        </div>
      }</div>
      }
    </div>

  </>
}
