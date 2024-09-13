import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { SignupInput } from "@kadm/medium-common"
import axios from "axios"
import { BACKEND_URL } from "../config"

export function Auth({type} : {type: "signup" | "signin"}) {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupInput>({
        email: "",
        password: "",
        name: "",
    })

    async function sendRequest(){
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup"?"signup":"signin"}`, postInputs);
            const jwt = response.data;
            localStorage.setItem("token", jwt.token);
            localStorage.setItem("name", jwt.name);
            navigate("/blogs");
        } catch(e){
            alert("Error while signing up");
        }
    }

    return (
        <div className=" h-screen flex flex-col justify-center items-center">
            <div>
                <div className="px-10">
                    <div className="text-4xl font-bold text-center ">
                        {type==="signup" ? "Create an account": "Login"}
                    </div>
                    <div className="text-center mt-2 text-slate-500">
                        {type==="signup"? "Already have an account?": "Don't have an account?"}
                        <Link to={type === "signup"? "/signin": "/signup"} className="underline text-slate-600 pl-1 ">
                            {type==="signup"?  "Login": "Sign Up"}
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col gap-2 mt-3">
                    {type==="signup"? <LabelledInput label="Name" placeholder="John..." onChange={(e) => {
                        setPostInputs((prev) => ({
                            ...prev,
                            name: e.target.value,
                        }
                        ))
                    }} /> : null}

                    <LabelledInput label="Email" placeholder="xyz@gmail.com" onChange={(e) => {
                        setPostInputs((prev) => ({
                            ...prev,
                            email: e.target.value,
                        }))
                    }} />

                    <LabelledInput label="Password" type="password" placeholder="123456" onChange={(e) => {
                        setPostInputs((prev) => ({
                            ...prev,
                            password: e.target.value,
                        }))
                    }} />

                    <button onClick={sendRequest} type="button" className="text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 w-full mt-3">{type === "signup"? "Sign Up" : "Sign In"}</button>

                </div>
            </div>
        </div>
    )
}

interface LabelledInputType {
    label: string,
    placeholder: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    type?: string,
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
    return (
        <div>
            <label className="block mb-2 text-base font-bold text-black ">{label}</label>
            <input onChange={onChange} type={type || 'text'} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-slate-500" placeholder={placeholder} required />
        </div>
    )
}