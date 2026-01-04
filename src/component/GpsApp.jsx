import { useState } from "react";

export const GpsApp = () => {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const MyKey = `67aa5e4ba2244228977306fd43ea5bbc`
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        if (open) {
            setData(null);
            setError(null);
        }   
        setOpen(!open);
    }

    const FethData = async () => {
        try {
            setError(null);
            const response = await fetch(`https://ip-intelligence.abstractapi.com/v1/?api_key=${MyKey}`);
            if (!response.ok) {
                throw new Error('Error fetching data');
            }
            const result = await response.json();
            setData(result);
            console.log(result);

        } catch (error) {
            setError(error)
            console.log(error)
        }
    }  

     return (
        <div className="flex justify-center items-center flex-col w-full h-screen bg-gray-600 text-white gap-2.5">
            <h1 className="font-bold text-3xl">GPS Application</h1>
            {open ? (
                <button onClick={handleClick} className="bg-red-700 rounded-full w-72 cursor-pointer">Close Location Data</button>
            ) : (
                <button onClick={handleClick} className="bg-blue-700 rounded-full w-72 cursor-pointer">Open Location Data</button>
            )}
            {open && (
                <button onClick={FethData} className="bg-green-700 rounded-full w-72 cursor-pointer">Get Location Data</button>
            )}
            {error && <p>Error: {error.message}</p>}   
            {data && (
                <div className="flex flex-col text-white font-bold text-center mt-7">
                    <img src={data.flag.png} alt="bandera-del-pais" />
                    <p>IP: {data.ip_address}</p>
                    <p>Country: {data.location.country}</p>
                    <p>City: {data.location.city}</p>
                    <p>Latitude: {data.location.latitude}</p>
                    <p>Longitude: {data.location.longitude}</p>
                </div>
            )}
        </div>
    );

};



   