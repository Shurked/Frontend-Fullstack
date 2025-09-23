// Componente Input reutilizable
function Input({
  id,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  className = '',
  label,
  error,
  ...props
}) {
  const inputClasses = `
    appearance-none rounded-md relative block w-full px-3 py-2 border 
    placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 
    focus:border-indigo-500 focus:z-10 sm:text-sm
    ${error ? 'border-red-300' : 'border-gray-300'}
    ${className}
  `;

  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        className={inputClasses}
        placeholder={placeholder}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}

export default Input;