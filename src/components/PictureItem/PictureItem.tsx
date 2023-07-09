import React, { useEffect, useState } from 'react';

import axios from 'axios';

import { IPainting } from '../../types/painting';
import { IAuthor } from '../../types/author';
import { ILocation } from '../../types/location';

import styles from './PictureItem.module.scss';

type InfoPicture = {
  author: IAuthor;
  location: ILocation;
};

const PictureItem: React.FC<IPainting> = React.memo((props) => {
  const [infoPicture, setInfoPicture] = useState<InfoPicture | null>(null);

  useEffect(() => {
    (async function () {
      try {
        const [authorResponse, locationResponse] = await Promise.all([
          axios.get(`https://test-front.framework.team/authors/${props.authorId}`),
          axios.get(`https://test-front.framework.team/locations/${props.locationId}`),
        ]);

        setInfoPicture({
          author: authorResponse.data,
          location: locationResponse.data,
        });
      } catch (e) {
        // eslint-disable-next-line
        console.log('Error fetching data:', e);
      }
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
            <span>{infoPicture?.author.name}</span>
          </div>
          <div className={styles.pictureInfoItem}>
            <span>Crated:</span>
            <span>{props.created}</span>
          </div>
          <div className={styles.pictureInfoItem}>
            <span>Location:</span>
            <span>{infoPicture?.location.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default PictureItem;
