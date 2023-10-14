import style from "./Sidebar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from "sweetalert2";
import axios from "axios";
import { useContext, useEffect } from "react";
import { noteContext } from "../../Context/NoteContext";

export default function Sidebar() {
  let { setmyNotes } = useContext(noteContext)

  // logout
  let Navigate = useNavigate()
  function logOut() {
    localStorage.removeItem('token')
    Navigate('/Login')
  }
  // show notes
  async function showMyNotes() {
    let { data } = await axios.get('https://note-sigma-black.vercel.app/api/v1/notes', { headers })
    setmyNotes(data)
  }

  useEffect(() => {
    showMyNotes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  //addnote
  const headers = { token: localStorage.getItem('token') }
  async function sendNote(title, content) {
    let { data } = await axios.post('https://note-sigma-black.vercel.app/api/v1/notes', {
      title,
      content
    }, { headers })
    showMyNotes()
    console.log(data);
  }
  function addNote() {
    Swal.fire({
      title: 'Add Note 😊',
      html: `
    <input type="text" placeholder="Enter Title" id="title" name="title" class="form-control"/>
    <textarea type="text" placeholder="Enter Discription" id="content" name="content" class="form-control"></textarea>
    `,
      showCancelButton: true,
      confirmButtonText: 'Add',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const title = document.getElementById('title').value
        const content = document.getElementById('content').value
        if (title.length !== 0 && content.length !== 0) {
          return { title, content }
        }
        else {
          return Swal.showValidationMessage(
            `Add title and Description`)
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(result);
        sendNote(result.value.title, result.value.content)
        Swal.fire(
          'Added!',
          'Your Note has been Added.',
          'success'
        )
      }
    })
  }


  return <>
    <nav className={`${style.nav} shadow-sm`}>
      <button onClick={addNote} className="btn btn-primary text-capitalize w-100 mb-3">
        <i className="fa-solid fa-plus me-2"></i>
        New Note
      </button>
      <ul className="list-unstyled">
        <li>
          <NavLink to="/" className={style.noLine}>
            <i className="bi bi-house-heart me-2"></i>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/search" className={style.noLine}>
            <i className="bi bi-search me-2"></i> Search
          </NavLink>
        </li>
        <li onClick={logOut}>
          <span className="pointer">
            <i className="bi bi-box-arrow-left me-2"></i>
            Log Out
          </span>
        </li>
        <li></li>
      </ul>
      
    </nav>
  </>

}
