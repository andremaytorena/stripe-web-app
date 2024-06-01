import React, { useEffect, useState } from "react";

export default function SignupForm() {

    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState({});

    useEffect(() => {
        fetch(
        "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
        )
        .then((response) => response.json())
        .then((data) => {
            setCountries(data.countries);
            setSelectedCountry(data.userSelectValue.value);
        });
    }, []);

    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
    };

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [country, setCountry] = useState('')

    const handleSubmit = (e) => {
        // e.preventDefault()

        console.log('Email:', email)
        console.log('Password:', password)
        console.log('Full Name:', fullName)
        console.log('Country:', selectedCountry)
    }

    return (
        <div className="bg-white rounded-md px-14 pt-10 pb-2">
            <h1 className="text-2xl font-semibold text-gray-700 w-80">Create your stripe account</h1>
            <div className="pt-8">
                <div>
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <input
                        className="w-full border border-gray-200 rounded p-2 mt-1 bg-transparent"
                        type="text" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="pt-6">
                    <label className="text-sm font-medium text-gray-500">Full name</label>
                    <input
                        className="w-full border border-gray-200 rounded p-2 mt-1 bg-transparent"
                        type="text" 
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </div>
                <div className="pt-6">
                    <label className="text-sm font-medium text-gray-500">Countries</label>
                    {/* <CountrySelect className=""/> */}
                    <select
                        className="w-full border border-gray-200 rounded p-2 mt-1 pr-5"
                        value={selectedCountry}
                        onChange={handleCountryChange}>
                        {countries.map((country) => (
                            <option key={country.value} value={country.value}>
                            {country.label}
                            </option>
                        ))}
                        </select>
                </div>
                <div className="pt-6">
                    <label className="text-sm font-medium text-gray-500">Password</label>
                    <input
                        className="w-full border border-gray-200 rounded p-2 mt-1 bg-transparent"
                        type="text" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="mt-6">
                    <div>
                        <input 
                            className=""
                            type="checkbox"
                            id="rememberMe"
                        />
                        <label className="text-sm text-gray-500" for="rememberMe"> Email me about product updates and resources. </label>
                    </div>
                </div>
                <div className="mt-8 flex flex-col gap-y-4">
                    <button onClick={handleSubmit} className="active:scale-[.98] transition:all hover:scale-[1.01] ease-in-out py-3 bg-[#625bf6] rounded-md text-white text-sm font-medium">Sign up</button>
                </div>
                <div className="bg-gray-100 py-4 mt-8 rounded-md -mx-12">
                    <p className="text-center text-xs font-medium text-gray-500">Already have an account? <a href="login" className="text-violet-500 font-medium hover:text-black">Sign in</a></p>
                </div>
            </div>
        </div>
    )
}