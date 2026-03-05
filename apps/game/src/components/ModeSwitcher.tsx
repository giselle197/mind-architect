type Props = {
  modes: string[];
  value: string;
  onChange: (name: string) => void;
};

export function ModeSwitcher({ modes, value, onChange }: Props) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        position: "absolute",
        top: 10,
        left: 10,
        zIndex: 10,
      }}
    >
      {modes.map((name) => (
        <option key={name} value={name}>
          {name}
        </option>
      ))}
    </select>
  );
}
