import { useContext } from "react";
import { DashboardContext } from "../context/DashboardContext";


export const useDashboardContext = () => useContext(DashboardContext)