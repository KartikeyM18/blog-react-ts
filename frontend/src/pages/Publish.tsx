import { ChangeEvent, useState } from "react"
import { Appbar } from "../components/Appbar"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function Publish() {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const navigate = useNavigate();
    return <div>
        <Appbar />
        <div className="flex flex-col items-center w-full pt-8">
            <div className="max-w-screen-lg w-full">
                <input type="text" id="input-group-1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-2 p-2.5  " placeholder="Title" onChange={(e) => {
                    setTitle(e.target.value);
                }} />

            </div>

            <TextEditor onChange={(e)=>{setContent(e.target.value)}}/>
        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-4 " onClick={async ()=>{
            const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {title, content}, {headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }}); 
            navigate(`/blog/${response.data.id}`);
        }}>Publish</button>
        </div>
    </div>
}


function TextEditor({onChange}:{onChange: (e: ChangeEvent<HTMLTextAreaElement>)=>void}) {
    return <div className=" w-full max-w-screen-lg">

            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
            <textarea id="message" rows={8} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Write your thoughts here..." onChange={onChange}></textarea>


        </div>

}