import { ArrowLeft } from "phosphor-react";

export function Error401() {
    return (
        <div className="w-screen h-screen flex items-center justify-center flex-col gap-16">
            <span className="text-6xl">401</span>
            <span className="text-3xl">Não autorizado</span>
            <a href="/" className="text-2xl h-16 w-32 flex items-center justify-evenly bg-white border rounded-md">
                <ArrowLeft size={24} color="#9305ea" />
                Volte
            </a>
        </div>
    );
}
