import React from 'react';
import './trafficLight.css';

export default function TrafficLight() {
  // TODO: write rest of TrafficLight component.
  // Three circles stacked on top of each other.  Appropriate colors but muted.  A javascript loop that sets an active class of the next light for a time.  Active class brightes the color.

  // Red light: 4000ms
  // Yellow light: 500ms
  // Green light: 3000ms
  const { activeLight, allLights } = useTrafficLight();
  return (
    <div className="trafficLight">
      {allLights.map(light => <div key={light.id} className={activeLight.id == light.id ? `light ${light.color} active` : `light ${light.color}`}>{light.color}</div>)}
    </div>
  );
}

const lights = [
  { id: 0, color: "green", duration: 3000 },
  { id: 1, color: "yellow", duration: 500 },
  { id: 2, color: "red", duration: 4000 }
];

function useTrafficLight() {
  const [activeLightIndex, setActiveLightIndex] = React.useState(0);
  const activeLight = lights[activeLightIndex];

  React.useEffect(() => {
    const duration = lights[activeLightIndex].duration;
    const nextIndex = activeLightIndex == lights.length - 1 ? 0 : activeLightIndex + 1;
    const timeoutId = setTimeout(() => {
      setActiveLightIndex(nextIndex);
    }, duration);

    return () => clearTimeout(timeoutId);
  }, [activeLightIndex]);

  return { activeLight, allLights: lights };
}