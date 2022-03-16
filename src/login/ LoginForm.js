import React from 'react'
import { useDispatch } from 'react-redux';
import { startLoginEmailPasword } from '../actions/auth';
import { useForm } from '../hooks/useForm';

export default function LoginForm() {
    
    const dispatch = useDispatch();
    
    const [{ email, password }, handleInputChange] = useForm({
        email: "",
        password: "",
    });
   
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(startLoginEmailPasword(email, password));
    };

    return (
        <div className="flex-1 mx-auto justify-center items-center max-w-xs bg-white">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700  text-sm font-bold mb-2">
                        usuario
                    </label>
                 
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="text"
                        placeholder="email"
                        name='email'
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        contraseña
                    </label>
                    <input
                        className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        name='password'
                        placeholder="******************"
                        onChange={handleInputChange}
                    />
                    <p className="text-red-500 text-xs italic">Por favor ingrese su contraseña.</p>
                </div>
                <div className="flex justify-center items-center">
                    <button
                        className="bg-blue-500 hover:from-blue-500 hover:to-yellow-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={onSubmit}
                    >
                        Ingresar
                    </button>
                </div>
            </form>

        </div>
    )
}
