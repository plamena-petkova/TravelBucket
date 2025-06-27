import { useState } from "react";
import { UserProps } from "@/interfaces/interfaces";

type MultiUserAutocompleteProps = {
  suggestions: UserProps[];
  placeholder?: string;
  onChange?: (selected: UserProps[]) => void;
};

export default function MultiUserAutocomplete({
  suggestions,
  placeholder = "Search users...",
  onChange,
}: MultiUserAutocompleteProps) {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState<UserProps[]>([]);
  const [selected, setSelected] = useState<UserProps[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const filterSuggestions = (value: string) => {
    return suggestions.filter(
      (user) =>
        user.email.toLowerCase().includes(value.toLowerCase()) &&
        !selected.find((s) => s._id === user._id)
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    const filteredUsers = filterSuggestions(value);
    setFiltered(filteredUsers);
    setShowDropdown(filteredUsers.length > 0);
  };

  const handleSelect = (user: UserProps) => {
    const updated = [...selected, user];
    setSelected(updated);
    setQuery("");
    setFiltered([]);
    setShowDropdown(false);
    onChange?.(updated);
  };

  const handleRemove = (userId: string) => {
    const updated = selected.filter((u) => u._id !== userId);
    setSelected(updated);
    onChange?.(updated);
  };

  const handleToggleDropdown = () => {
    const unselectedUsers = suggestions.filter(
      (user) => !selected.find((s) => s._id === user._id)
    );
    setFiltered(unselectedUsers);
    setShowDropdown(!showDropdown);
    setQuery("");
  };

  return (
    <div className="form-control w-full max-w-lg">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className="input input-bordered w-full pr-10"
        />
        <button
          type="button"
          onClick={handleToggleDropdown}
          className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 hover:text-black"
        >
          ▼
        </button>

        {showDropdown && filtered.length > 0 && (
          <ul className="menu-dropdown absolute z-10 mt-1 w-full bg-base-100 border border-base-300 rounded-box shadow">
            {filtered.map((user) => (
              <li
                key={user._id}
                className="px-4 py-2 hover:bg-base-200 cursor-pointer"
                onClick={() => handleSelect(user)}
              >
                {user.name}{" "}
                <span className="text-xs text-gray-500">({user.email})</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {selected.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {selected.map((user) => (
            <div key={user._id} className="badge badge-neutral gap-1 px-3 py-2">
              {user.name}
              <button
                onClick={() => handleRemove(user._id)}
                className="ml-1 text-xs text-error"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
