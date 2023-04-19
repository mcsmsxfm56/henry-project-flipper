// v-----------------------------v SelectField v-----------------------------v

interface SelectFieldData {
  opciones: string[];
  defaultOp: string;
  name: string;
  value: string | number;
  changeFunc: React.ChangeEventHandler<HTMLSelectElement | HTMLInputElement>;
}

const SelectField = ({
  defaultOp,
  opciones,
  name,
  value,
  changeFunc,
}: SelectFieldData) => {
  return (
    <label className="w-full mb-4">
      <select
        name={name}
        value={value}
        onChange={changeFunc}
        className="w-full"
      >
        <option value="">{defaultOp}:</option>
        {opciones.map((op, index) => (
          <option key={`${name}_${index}`} value={op}>
            {op.charAt(0).toUpperCase() + op.slice(1)}
          </option>
        ))}
      </select>
    </label>
  );
};

export default SelectField;