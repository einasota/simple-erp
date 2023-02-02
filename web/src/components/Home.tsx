import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { api } from "../lib/api";
import { DailyReports } from "./DailyReports";



export function Home() {
    

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <DailyReports />
        </div>
    );
}
