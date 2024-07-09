


import Link from "next/link";

import { GrProjects } from "react-icons/gr";
import { LuPencilLine } from "react-icons/lu"; 
import FlowWithProvider from "./components/flow/react_flow";
import Input_graph from "./components/input/input_graph";
export default function Home() {

  return (

    <div className="flex h-full min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}

      <div className="w-16 bg-gray-800 flex flex-col items-center py-4 border-r-2 border-blue-500/50">
        {/* Logo */}
        <div className="mb-8">
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
            {/* Add your logo SVG path here */}
          </svg>
        </div>

        {/* Navigation Icons */}
        <nav className="flex flex-col space-y-4">
          {/* Add icons for each nav item */}
          <Link href="#" className="p-2 hover:bg-gray-700 rounded-lg">
            <GrProjects className="w-6 h-6" />
          </Link>
          <Link href="#" className="p-2 hover:bg-gray-700 rounded-lg">
            <LuPencilLine className="w-6 h-6" />
          </Link>

          {/* Repeat for other nav items */}
        </nav>
      </div>
      {/* Main Content */}
      <div className="flex-1  px-0 h-full">
        <div className="flex w-full border-b-2 border-blue-500/50  px-8 ">
          {/* Breadcrumb */}
          <div className="text-sm text-gray-400 mb-4">
            Personal &gt; Deployments
          </div>

        </div>
        <div className="">
          <div className="w-full h-full ">
            <div className="w-1/2 h-full pb-12  border-r-2 border-blue-500/50 ">
              <FlowWithProvider/>
              <Input_graph/>  
            </div>
            <div className="w-1/2  "> 
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
