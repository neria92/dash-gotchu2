import React from 'react'
import { useDispatch } from 'react-redux';
import { startLoginEmailPasword } from '../actions/auth';
import { useForm } from '../hooks/useForm';

export const Login=()=> {
    
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

    <div class="container mx-auto">
      <div class="flex justify-center items-center px-6 ">
        <div class="w-full xl:w-3/4 lg:w-11/12 flex">
          <img
            class="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
            src='gotchu.svg'
          />
          <div class="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
            <div class="px-8 mb-4 text-center">
              <h3 class="pt-4 mb-2 text-2xl">Ingresar a Gotchu!</h3>
            </div>
            <form class="px-8 pt-6 pb-8 mb-4 bg-white rounded">
              <div class="mb-4">
                <label class="block mb-2 text-sm font-bold text-gray-700" >
                  Correo
                </label>
                <input
                  class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Enter Email Address..."
                />
              </div>
              <div class="mb-4">
                <label class="block mb-2 text-sm font-bold text-gray-700" >
                  Contraseña
                </label>
                <input
                  class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="***********"
                />
              </div>
              <div class="mb-6 text-center">
                <button
                  class="w-full px-4 py-2 font-bold text-white bg-green-700 rounded-full hover:bg-green-500 focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Ingresar
                </button>
              </div>
              <hr class="mb-6 border-t" />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}