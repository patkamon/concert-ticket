import Panel from "./components/Panel";
import Sidebar from "./components/Sidebar";

export default function Home() {
  return (
    <div className="flex w-screen">
   <Sidebar/> 
   <div className="flex justify-evenly bg-blue-300 w-full">
   <Panel/>
   <Panel/>
   <Panel/>
   </div>


    </div>
  );
}
