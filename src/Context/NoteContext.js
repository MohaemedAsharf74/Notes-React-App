import { createContext, useState } from "react";

export let noteContext = createContext()

export default function NoteContextProvider(props) {
    const [myNotes, setmyNotes] = useState([])
    const [tokens, settokens] = useState(null)
    return <>
        <noteContext.Provider value={{ setmyNotes, myNotes, tokens, settokens }}>
            {props.children}
        </noteContext.Provider>
    </>
}