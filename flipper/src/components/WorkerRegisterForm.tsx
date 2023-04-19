"use client";

import { Post_Worker_Register } from "@/services/PostRegister";
import { WorkerRegisterData } from "@/types/Types";
import React, { useEffect, useState } from "react";
import InputField from "./InputField";
import SelectField from "./SelectField";
import LoadingSubmitForm from "./LoadingSubmitForm";

const harcodedData = {
  // Datos harcodeados
  phone: "3425552525",
  email: "Francoaglieri@hotmail.com",
  password: "1234",
  name: "SebaMax",
  idType: "",
  idNumber: 0,
};

const resetErrors = {
  phone: "",
  email: "",
  password: "",
  name: "",
  idType: "",
  idNumber: '',
};

const WorkerRegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [validForm, setValidForm] = useState(false);
  const [formData, setFormData] = useState<WorkerRegisterData>(
    // harcodedData
      {
      phone: "",
      email: "",
      password: "",
      name: "",
      idType: "",
      idNumber: 0,
    }
  );
  const [errors, setErrors] = useState({
    phone: "",
    email: "",
    password: "",
    name: "",
    idType: "",
    idNumber: '',
  });

  useEffect(() => {
    setErrors(validateForm(formData));
  }, [formData]);
  useEffect(() => {
    checkErrors();
  }, [errors]);

  const checkErrors = (): boolean => {
    let flag = true;
    for (const key in errors) {
      if (flag) {
        if (formData[key as keyof WorkerRegisterData] == "") flag = false;
        if (errors[key as keyof WorkerRegisterData] !== "") flag = false;
      }
    }
    setValidForm(flag);
    return flag;
  };

  function validateForm(values: WorkerRegisterData) {
    setValidForm(true);
    let errors = resetErrors;
    // const { name, email, idNumber, idType, password, phone } = values;

    // if (!name) {
    //   errors.name = "El nombre es obligatorio";
    // }
    checkErrors();
    return errors;
  }

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await Post_Worker_Register(formData);
      console.log("exito");
    } catch {
      //
      console.log("failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeState = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value, name } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form
      onSubmit={submitHandler}
      className="w-full flex flex-col items-center"
    >
      <InputField
        name="name"
        text="Nombre"
        type="text"
        value={formData.name}
        changeFunc={handleChangeState}
      />
      {errors.name && <span className="text-red-500">{errors.name}</span>}
      <InputField
        name="email"
        text="E-Mail"
        type="text"
        value={formData.email}
        changeFunc={handleChangeState}
      />
      <InputField
        name="phone"
        text="Teléfono"
        type="text"
        value={formData.phone}
        changeFunc={handleChangeState}
      />
      <SelectField
        name="idType"
        defaultOp="Seleccione su tipo de identificación"
        opciones={["Cédula", "Tarjeta de identidad", "Pasaporte", "NIT"]}
        value={formData.idType}
        changeFunc={handleChangeState}
      />
      <InputField
        name="idNumber"
        text="Número de Identificación"
        type="number"
        value={formData.idNumber}
        changeFunc={handleChangeState}
      />
      <InputField
        name="password"
        text="Contraseña"
        type="password"
        value={formData.password}
        changeFunc={handleChangeState}
      />
      {isLoading ? (
        <LoadingSubmitForm />
      ) : (
        <button
          type="submit"
          className={`${
            validForm ? "bg-[#4B39EF]" : "bg-slate-400"
          } rounded-lg px-16 py-2 text-lg text-white font-bold`}
          disabled={!validForm}
        >
          Crear Cuenta de Empresa
        </button>
      )}
    </form>
  );
};

export default WorkerRegisterForm;
