import React from 'react';
import Squirrel from 'images/squirrel.jpg';
import Parrot from 'images/parrot.jpg';
import Dolphin from 'images/dolphin.jpg';
import Zebras from 'images/zebras.jpg';

const Sample: React.FC = () => {
  return (
    <div>
      Curabitur aliquet metus et mauris tristique, id congue lacus bibendum.
      Praesent rhoncus, elit vitae dictum ultricies, mauris arcu maximus turpis,
      at pulvinar nisi metus ac arcu.
      <br />
      <img src={Squirrel} alt="Squirrel" className="mt-2 img-small" />
      <img src={Parrot} alt="Parrot" className="mt-2 img-small" />
      <img src={Dolphin} alt="Dolphin" className="mt-2 img-small" />
      <img src={Zebras} alt="Zebras" className="mt-2 img-small" />
    </div>
  );
};

export default Sample;
