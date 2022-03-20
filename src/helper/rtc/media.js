import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Capacitor } from "@capacitor/core";

const media = {
  checkMediaPermission: () => {
    return new Promise((resolve, reject) => {
      if (Capacitor.isNativePlatform) {
        AndroidPermissions.checkPermission(AndroidPermissions.PERMISSION.CAMERA)
          .then(result => {
            resolve(resolve(true));
          },
            err => { reject(err) })
      } else {
        resolve(true);
      }
    })
  },
  askForMediaAccess: () => {
    AndroidPermissions.requestPermissions([AndroidPermissions.PERMISSION.CAMERA])
  }
}

export default media;