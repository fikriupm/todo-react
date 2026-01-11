import { Eye, EyeOff } from "lucide-react";
import { useMemo, useState } from "react";

type Option = { value: string; label: string };

type InputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  isSelect?: boolean;
  options?: Option[];
  type?: "text" | "password" | "email" | "number" | "date";
};

const Input = ({
  label,
  value,
  onChange,
  placeholder,
  isSelect = false,
  options = [],
  type = "text",
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = useMemo(() => label.replace(/\s+/g, "-").toLowerCase(), [label]);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="mb-4">
      <label htmlFor={inputId} className="text-[13px] text-slate-800 block mb-1">
        {label}
      </label>
      <div className="relative">
        {isSelect ? (
          <select
            id={inputId}
            className="w-full bg-transparent outline-none border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-green-500"
            aria-label={label}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            id={inputId}
            className="w-full bg-transparent outline-none border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-green-500"
            type={type === "password" ? (showPassword ? "text" : "password") : type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        )}
        {type === "password" && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
          {showPassword ? (
            <Eye
            size={20}
            className="text-green-600"
            onClick={toggleShowPassword}
            />
          ) : (
            <EyeOff
            size={20}
            className="text-slate-400"
            onClick={toggleShowPassword}
            />
          )}
          </span>
        )}
      </div>
    </div>
  )
}

export default Input;