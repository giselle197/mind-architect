import worldData from "@data/world.json";

function App() {
  return (
    <div>
      <h1>{worldData.nodes[0].name}</h1>
    </div>
  );
}

export default App;