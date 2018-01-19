import {Permissions, Location, Expo} from 'expo';
import {Constants as ExpoConstants} from 'expo';


exports.getCurrentLocation = () =>{
	return function(dispatch){
		this._getCurrentLocation().then((location)=>{
			dispatch({type:'SET_CURRENT_LOCATION', location});
		}).catch((e)=>{
      throw e
    })
	}

}


_getCurrentLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      console.log("Location access not granted");
      throw 'Location was not granted'
    }

    let location = await Location.getCurrentPositionAsync({});
   return location;
  };