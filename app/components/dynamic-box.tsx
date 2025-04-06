"use client"
import { PieChart } from '@mui/x-charts/PieChart';
import Calendar from "react-calendar";

import { useState, useEffect } from "react";
import Link from "next/link"

interface JSON_Body {
    "course_name": string,
    "instructor": [
      {
        "name": string,  
        "email": string, 
      }
    ],
    "office_hours": string,
    "grading_policy": [
      {
        "exams": string,
        "assignments": string,
        "participation": string
      }
    ],
    "deadlines": [
      {
        "type": string,
        "date": string,
        "description": string
      },
      {
        "type": string,
        "date": string,
        "description": string
      },
      {
        "type": string,
        "date": string,
        "description": string
      },
      {
        "type": string,
        "date": string,
        "description": string
      }
    ],
    "late_policy": string
}

export default function DynamicBox ({ item, index}: { item: string, index: number}){
  const [info, setInfo] = useState<JSON_Body | null>(null)
  const [dates, setDates] = useState([])
  const [dropdownIndex, setDropdownIndex] = useState<number | null>(null);

  useEffect(() => {
    setInfo( (prev) => {
      try{
        return JSON.parse(item);
      } catch (error){
        return prev
      }
    } )


  }, [item])

  const toggleDropdown = (index: number) => {
    setDropdownIndex((dropdownIndex) => (dropdownIndex === index ? null : index));
  };

  return info ? (

    
    <div className="bg-white p-4 ronded-lg shadow hover:shadow-md transition">
      <div className="flex items-center flex-col justify-center h-[120px] bg-gray-100 rounded-lg mb-4">
      <button className="text-xl font-bold  text-gray-700">{info.course_name}</button>
      {
        info.instructor ?  (
          <div>
            <p className="italic ">{info.instructor[0] ? info.instructor[0].name:""}</p>
            <a href={`mailto:${info.instructor[0] ? info.instructor[0].email:""}`}>{info.instructor[0] ? info.instructor[0].email:""}</a>
          </div>
        ) : ""
      }

      </div>
      <div className="">

      <p> <span className='text-xl mt-10 font-bold'>Office Hours:</span> {info.office_hours}</p>

      <p> <span className='text-xl mt-10 font-bold'>Late Policy:</span>  {info.late_policy}</p> 
      
      <p className='text-xl mt-10 font-bold'> Deadlines</p>
      {
          info.deadlines && info.deadlines.length > 0? info.deadlines.map((val, index) => (
            <div key={index} className="grid justify-between items-center p-2 border-b">
              <p>{val.type}</p>
              <p>{val.date}</p>
              <p>{val.description}</p>
            </div>
          )) : ""
      }

<p className='text-xl mt-10 font-bold'> Grading Policy</p>

        { 
          info.grading_policy && info.grading_policy.length > 0?  (<PieChart
            series={[
              {
                data: [
                  { id: 0, value: parseFloat(info.grading_policy[0].exams), label: 'exams' },
                  { id: 1, value: parseFloat(info.grading_policy[0].assignments), label: 'assignments' },
                  { id: 2, value: parseFloat(info.grading_policy[0].participation), label: 'participation' },
                ],
              },
            ]} 
            height={200}
            
            /> ) : ""
        }

      </div>

      {/*dropdownIndex === index && (
              <div className="absolute top-10 right-2 bg-white shadow-lg rounded-lg p-2 z-10">
                <button
                  onClick={async () => {
                    //const toEmail = //box.instructor?.[0]?.email; // safely get the email
                
                    const res = await fetch("http://localhost:8000/create-draft", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ to_email: "toEmail" }),
                    });
                
                    const data = await res.json();
                    alert(data.message || "Email draft created!");
                  }}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                  Create Email Draft
                </button>
              </div>
            )*/}
      </div>
  
  ) : "";
}