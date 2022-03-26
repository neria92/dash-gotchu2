import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { startLoginEmailPasword } from '../actions/auth';
import { Loading } from '../components/Loading';
import { useForm } from '../hooks/useForm';

export const Login = () => {

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const [{ email, password }, handleInputChange] = useForm({
    email: "",
    password: "",
  });

  const onSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    dispatch(startLoginEmailPasword(email, password));
    setIsLoading(false);
  };

  return (


    <div className=" min-h-screen grid place-content-center  justify-center items-center px-6 ">
      <div className="w-full  xl:w-4/4 lg:w-12/12 flex">


        <img
          className="w-full h-auto bg-red-200 rounded mr-2 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
          src='gotchu.svg'
        />
        <div className="w-full lg:w-2/2 bg-white p-10 rounded-lg lg:rounded">
          <div className="px-8 mb-4 text-center">
            <h3 className="pt-4 mb-2 text-2xl">Ingresar a Gotchu!</h3>
          </div>
          <form className="px-2 pt-6 pb-8 mb-4 bg-white rounded" onSubmit={onSubmit}>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700" >
                Correo
              </label>
              <input
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                name="email"
                placeholder="gotchu@gotchu.com"
                onChange={handleInputChange}

              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700" >
                Contraseña
              </label>
              <input
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="password"
                type="text"
                name="password"
                placeholder="***********"
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-6 text-center">
              {
                isLoading
                  ? <Loading w='30' h='30' bg='bg-green-200'  />
                  :
                  <button
                    className="w-full px-4 py-2 font-bold text-white bg-green-700 rounded-full hover:bg-green-500 focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={onSubmit}
                  >
                    Ingresar
                  </button>
              }
            </div>
            <hr className="mb-6 border-t" />
          </form>
        </div>
      </div>
    </div>
  )
}