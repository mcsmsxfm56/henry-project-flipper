import {
  objEmpresa,
  objEvento,
  objTrabajador,
  objtrabajadoresEnEventos,
} from "@/types/Types";
import * as XLSX from "xlsx";

export const downloadExcelAdmin = (
  sheetTrabajador: objTrabajador[],
  sheetEmpresa: objEmpresa[],
  sheetEventos: objEvento[],
  sheetTrabajadoresEnEventos: objtrabajadoresEnEventos[]
) => {
  const sheetTrabajadoresEnEventos2 = sheetTrabajadoresEnEventos.map(
    (objtrabajadoresEnEventos) => {
      const formatedObject = {
        "EMPRESA DEL EVENTO": objtrabajadoresEnEventos.evento?.empresa?.nombre,
        "NOMBRE DEL EVENTO": objtrabajadoresEnEventos.evento?.nombre,
        TRABAJADOR: objtrabajadoresEnEventos.trabajadores?.name,
        STATUS: objtrabajadoresEnEventos.status,
        FECHA: objtrabajadoresEnEventos.evento?.fecha_inicio,
        LUGAR: objtrabajadoresEnEventos.evento?.lugar,
        PERFIL: objtrabajadoresEnEventos.evento?.perfil,
        PAGO: objtrabajadoresEnEventos.evento?.pago,
        BANEADO: objtrabajadoresEnEventos.trabajadores?.isDeleted,
        OBSERVACIONES: objtrabajadoresEnEventos.evento?.observaciones,
      };
      return formatedObject;
    }
  );
  const sheetTrabajador2 = sheetTrabajador.map((objTrabajador) => {
    const formatedObject = {
      "NOMBRE TRABAJADOR": objTrabajador.name,
      "TIPO DE DOCUMENTO": objTrabajador.idType,
      "Nº DOCUMENTO": objTrabajador.idNumber,
      CIUDAD: objTrabajador.ciudad,
      DIRECCION: objTrabajador.direccion,
      TELEFONO: objTrabajador.phone,
      CORREO: objTrabajador.email,
      GENERO: objTrabajador.genero,
      EDAD: objTrabajador.Edad,
      ESTATURA: objTrabajador.estatura,
      "GRUPO SANGUINEO": objTrabajador.grupo_sanguineo,
      "TALLA CAMISETA": objTrabajador.talla_camiseta,
    };
    return formatedObject;
  });
  const sheetEmpresa2 = sheetEmpresa.map((objEmpresa) => {
    const formatedObject = {
      "NOMBRE DE LA EMPRESA": objEmpresa.nombre,
      "NOMBRE DEL CEO": objEmpresa.nombreceo,
      CIUDAD: objEmpresa.ciudad,
      DIRECCION: objEmpresa.direccion,
      CORREO: objEmpresa.email,
      TELEFONO: objEmpresa.telefono,
      AUTORIZACIÓN: objEmpresa.authorizedByAdmin ? "true" : "false",
      "ES ADMIN": objEmpresa.isAdmin ? "true" : "false",
      "BANEADO?": objEmpresa.isDeleted ? "true" : "false",
    };
    return formatedObject;
  });
  const sheetEventos2 = sheetEventos.map((objEvento) => {
    const formatedObject = {
      "EMPRESA DEL EVENTO": objEvento.empresaNombre,
      "NOMBRE DEL EVENTO": objEvento.nombre,
      PERFIL: objEvento.perfil,
      "FECHA INICIO": objEvento.fecha_inicio,
      "FECHA FIN": objEvento.fecha_final,
      LUGAR: objEvento.lugar,
      PAGO: objEvento.pago,
      CUPOS: objEvento.cupos,
      "Nº POSTULADOS": objEvento.numeroPostulantes,
      OBSERVACIONES: objEvento.observaciones,
    };
    return formatedObject;
  });
  const sheetTrabajador3 = XLSX?.utils.json_to_sheet(sheetTrabajador2);
  const sheetTrabajadoresEnEventos3 = XLSX?.utils.json_to_sheet(
    sheetTrabajadoresEnEventos2
  );

  const sheetEmpresa3 = XLSX?.utils.json_to_sheet(sheetEmpresa2);
  const sheetEventos3 = XLSX?.utils.json_to_sheet(sheetEventos2);
  const adminData = XLSX?.utils.book_new();
  XLSX?.utils.book_append_sheet(
    adminData,
    sheetTrabajador3,
    "Tabla Trabajadores"
  );
  XLSX?.utils.book_append_sheet(adminData, sheetEmpresa3, "Tabla Empresa");
  XLSX?.utils.book_append_sheet(adminData, sheetEventos3, "Tabla Eventos");
  XLSX?.utils.book_append_sheet(
    adminData,
    sheetTrabajadoresEnEventos3,
    "Tabla TrabajadoresEnEventos"
  );
  XLSX?.writeFile(adminData, "adminData.xlsx");
};

export const downloadExcelNoAdmin = (sheetEvents: objEvento[]) => {
  const sheetEvents2 = XLSX?.utils.json_to_sheet(sheetEvents);
  const adminData = XLSX?.utils.book_new();
  XLSX?.utils.book_append_sheet(adminData, sheetEvents2, "Tabla Eventos");
  XLSX?.writeFile(adminData, "datosEventos.xlsx");
};
