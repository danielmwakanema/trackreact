import React from 'react';

import MapWithRenderer from './MapWithRenderer';

export default trip => {
  const Map = MapWithRenderer(trip)
  return <Map />
}