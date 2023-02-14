import { FormEvent, useState } from "react";
// import { SunDim, MoonStars } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider/userAuth";
import * as Label from "@radix-ui/react-label";
import { ArrowUpRight, Password, SignIn, Storefront, User } from "phosphor-react";

export default function Login() {
    const [login, setLogin] = useState("");
    const [pass, setPass] = useState("");

    const auth = useAuth();
    const navigate = useNavigate();
    async function handleLogin(event: FormEvent) {
        event.preventDefault();
        try {
            await auth.authenticate(login, pass);
            navigate("/home");
        } catch (error) {
            alert("Usuário ou senha incorretos");
        }
    }
    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center">
            <div className="bg-zinc-100 w-[30rem] h-[25rem] p-8 rounded-md border-2 border-blue-400 shadow-2xl">
                <form
                    className="flex flex-col items-center justify-center"
                    onSubmit={handleLogin}
                >
                    <span className="flex flex-row justify-center items-center gap-2 text-4xl mt-4 uppercase font-semibold">
                        <Storefront size={36} color="#0f0f0f" />
                        Elétrica Soares
                    </span>
                    <div className="flex flex-col w-full mt-5">
                        <div className="flex flex-row gap-2">
                            <User size={24} color="#000" />
                            <Label.Root className="font-medium text-xl">
                                Nome de usuário:
                            </Label.Root>
                        </div>
                        <input
                            type="text"
                            id="username"
                            name="login"
                            className="h-10 rounded-lg border-2 border-blue-400 text-2xl text-center bg-gray-200 autofill:bg-amber-200"
                            autoComplete="off"
                            value={login}
                            onChange={(event) => setLogin(event.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-col w-full mt-5">
                        <div className="flex flex-row gap-2">
                            <Password size={24} color="#0f0f0f" />
                            <Label.Root className="font-medium text-xl">
                                Senha:
                            </Label.Root>
                        </div>
                        <input
                            type="password"
                            id="password"
                            name="pass"
                            className="h-10 border-2 border-blue-400 rounded-lg text-2xl text-center bg-gray-200"
                            value={pass}
                            onChange={(event) => setPass(event.target.value)}
                            required
                        />
                    </div>
                    <button
                        id="loginbutton"
                        className="flex flex-row justify-center gap-2 items-center bg-blue-600 w-32 h-16 mt-8 rounded-lg text-white border-2 border-blue-400 hover:bg-blue-500 hover:border-blue-300 hover:text-zinc-200"
                    >
                        <SignIn size={24} color="#FFF" />
                        {" Login"}
                    </button>
                </form>
            </div>
                <footer>
                    <span className="flex flex-row">
                    {"created By    "}   <a href="http://einasota.github.io" className="underline">{" Jhonata "}</a><ArrowUpRight size={20} color="#0f0f0f" />  
                    </span>
                </footer>
        </div>
    );
}
