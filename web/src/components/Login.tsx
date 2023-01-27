import * as Label from "@radix-ui/react-label";
import { SunDim, MoonStars } from "phosphor-react";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider/userAuth";
import { api } from "../lib/api";

export default function Login() {
    const [login, setLogin] = useState('')
    const [pass, setPass] = useState('')

    const auth = useAuth()
    const navigate = useNavigate()
    async function handleLogin(event: FormEvent) {
        event.preventDefault();
        try {
            await auth.authenticate(login, pass)
            navigate('/home')
        } catch (error) {
            alert('Usuário ou senha incorretos')
        }
    }
    return (
        <div className="w-screen h-screen bg-slate-500 flex justify-center items-center">
            <div className="bg-zinc-100 w-[30rem] h-[25rem] p-8 rounded-xl border-2 border-blue-400">
                <form className="flex flex-col items-center justify-center" onSubmit={handleLogin}>
                    <span className="text-4xl mt-4 uppercase">
                        Elétrica Soares
                    </span>
                    <div className="flex flex-col w-full mt-5">
                        <Label.Root className="font-medium text-xl">
                            Nome de usuário:
                        </Label.Root>
                        <input
                            type="text"
                            id="username"
                            name="login"
                            className="h-10 rounded-lg border-2 border-blue-400 text-2xl text-center"
                            autoComplete="off"
                            value={login}
                            onChange={(event) => setLogin(event.target.value) }
                            required
                        />
                    </div>
                    <div className="flex flex-col w-full mt-5">
                        <Label.Root className="font-medium text-xl">
                            Senha:
                        </Label.Root>
                        <input
                            type="password"
                            id="password"
                            name="pass"
                            className="h-10 border-2 border-blue-400 rounded-lg text-2xl text-center"
                            value={pass}
                            onChange={(event) => setPass(event.target.value)}
                            required
                        />
                    </div>
                    <button className="bg-blue-600 w-32 h-16 mt-8 rounded-lg text-white border-2 border-blue-400 hover:bg-blue-500 hover:border-blue-300">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
