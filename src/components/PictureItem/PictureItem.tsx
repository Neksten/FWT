import React, { useEffect, useState } from 'react';

import axios from 'axios';

import { IPainting } from '../../types/painting';
import { IAuthor } from '../../types/author';
import { ILocation } from '../../types/location';

import styles from './PictureItem.module.scss';

type infoPicture = {
  author: IAuthor;
  location: ILocation;
};

const PictureItem: React.FC<IPainting> = (props) => {
  const [infoPicture, setInfoPicture] = useState<infoPicture>({
    author: { id: 0, name: '' },
    location: { id: 0, location: '' },
  });

  useEffect(() => {
    (async function () {
      const authorResponse = await axios.get(`https://test-front.framework.team/authors/${props.authorId}`);
      const locationResponse = await axios.get(`https://test-front.framework.team/locations/${props.locationId}`);
      setInfoPicture((prev) => ({ ...prev, author: authorResponse.data }));
      setInfoPicture((prev) => ({ ...prev, location: locationResponse.data }));
    })();
  }, [props.authorId, props.locationId]);

  return (
    <div className={styles.picture}>
      <div className={styles.pictureImage}>
        <img src={`https://test-front.framework.team${props.imageUrl}`} alt={props.name} />
      </div>
      <div className={styles.pictureInfo}>
        <h5 className={styles.pictureTitle}>{props.name}</h5>
        <div className={styles.pictureInfoItems}>
          <div className={styles.pictureInfoItem}>
            <span>Author:</span>
            <span>{infoPicture.author.name}</span>
          </div>
          <div className={styles.pictureInfoItem}>
            <span>Crated:</span>
            <span>{props.created}</span>
          </div>
          <div className={styles.pictureInfoItem}>
            <span>Location:</span>
            <span>{infoPicture.location.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PictureItem;
