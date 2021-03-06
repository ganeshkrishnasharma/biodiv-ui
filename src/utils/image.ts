import { AssetStatus } from "@interfaces/custom";
import { EXIF_GPS_FOUND, FORM_DATEPICKER_CHANGE } from "@static/events";
import { DEFAULT_LICENSE } from "@static/licenses";
import { LOCAL_ASSET_PREFIX } from "@static/observation-create";
import notification from "@utils/notification";
import loadImage from "blueimp-load-image";
import { nanoid } from "nanoid";
import { emit } from "react-gbus";

import { CleanExif } from "./location";

function resizeImage(file: File, max = 3000): Promise<any> {
  return new Promise((resolve) => {
    loadImage(
      file,
      (img, data) => {
        try {
          if (data?.exif) {
            // fix orientation
            if (data.exif[274]) {
              loadImage.writeExifData(data.imageHead, data, "Orientation", 1);
            }

            // replace imageHead to restore exif of original image
            img.toBlob((blob) => {
              loadImage.replaceHead(blob, data.imageHead, (d) =>
                resolve([d, CleanExif(data?.exif)])
              );
            }, file.type);
          } else {
            img.toBlob((d) => resolve([d, {}]));
          }
        } catch (e) {
          console.warn("EXIF Failed", e);
          if (!img.toBlob) {
            notification("Outdated/Unsupported Browser");
          }
          img.toBlob((d) => resolve([d, {}]));
        }
      },
      {
        meta: true,
        canvas: true,
        orientation: true,
        maxWidth: max,
        maxHeight: max
      }
    );
  });
}

export const getAssetObject = (file, meta?) => {
  const hashKey = `${LOCAL_ASSET_PREFIX}${nanoid()}`;
  const finalMeta = meta || { blob: file };
  return {
    ...finalMeta,
    hashKey,
    fileName: file.name,
    url: null,
    path: `/${hashKey}/${file.name}`,
    type: file.type,
    licenceId: DEFAULT_LICENSE,
    status: AssetStatus.Pending,
    dateUploaded: new Date().getTime(),
    caption: "",
    rating: 0,
    isUsed: 0
  };
};

export const resizeMultiple = async (files: File[]) => {
  const assets = [];

  for (const file of files) {
    try {
      let meta;
      if (file.type.startsWith("image")) {
        const [blob, exif] = await resizeImage(file);

        if (exif?.dateCreated) {
          emit(FORM_DATEPICKER_CHANGE + "observedOn", exif?.dateCreated);
        }

        if (exif?.latitude) {
          emit(EXIF_GPS_FOUND, { lat: exif.latitude, lng: exif.longitude });
        }

        meta = {
          blob,
          ...exif
        };
      }
      assets.push(getAssetObject(file, meta));
    } catch (e) {
      console.error(e);
      assets.push({});
    }
  }

  return assets;
};
