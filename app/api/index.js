const PRODUCTION = "https://spotrestapi.herokuapp.com/v1";
const localHost = "http://localhost:3001/v1";
const sandBox = "https://pure-island-32874.herokuapp.com/v1";


var API_URL = PRODUCTION;//'http://localhost:3001/v1';  https://pure-island-32874.herokuapp.com

//TODO: add the tags fields, latitude and lognitude 
exports.EVENT_FEED = (lon, lat, userId, page=1) =>`${API_URL}/geteventsbylocation/${lon}/${lat}/${userId}/${page}`;
exports.CREATE_EVENT = (user_id) => `${API_URL}/addevent/${user_id}/new`;
exports.SIGNIN_URL = `${API_URL}/signin`;
exports.SIGNUP_URL = `${API_URL}/signup`;
exports.GOOGLE_MAP_API = (address) => `https://maps.googleapis.com/maps/api/geocode/json?&address=${address}`;
exports.GET_USER_PROFILE = (user_id) => `${API_URL}/getprofile/${user_id}`;;
exports.GOING_TO_EVENT = (user_id,event_id) => `${API_URL}/goingInEvent/${user_id}/${event_id}`;;
exports.INTRESTED_IN_EVENT = (user_id,event_id) => `${API_URL}/interestedInEvent/${user_id}/${event_id}`;
exports.NOT_GOING_TO_EVENT = (user_id,event_id) => `${API_URL}/notattending/${user_id}/${event_id}`;
exports.SEARCH_EVENT_BY_TAG = (user_id, tags) => `${API_URL}/getEventsByTags/${user_id}/${tags}`;
exports.GET_EVENT_INFO = (event_id,user_id) => `${API_URL}/getEventById/${event_id}/${user_id}`;
exports.GET_FOLLOWERS = (user_id) => `${API_URL}/getfollowers/${user_id}/followers/`;
exports.GET_FOLLOWING = (user_id) => `${API_URL}/getfollowing/${user_id}/following/`;
exports.CHANGE_USER_FIRST_NAME = (user_id) => `${API_URL}/useredits/${user_id}/firstname`;
exports.CHANGE_USER_LAST_NAME = (user_id) => `${API_URL}/useredits/${user_id}/lastname`;
exports.CHANGE_USER_MAIL = (user_id) => `${API_URL}/useredits/${user_id}/email`;
exports.CHANGE_PASSWORD = (user_id) => `${API_URL}/useredits/${user_id}/password`;
exports.CHANGE_USER_AVATAR = (user_id) => `${API_URL}/uploadAvatar/${user_id}`;
exports.FIND_PEOPLE = (user_id, paramter) => `${API_URL}/findpeople/${user_id}/${paramter}`;
exports.GET_ALL_INTERESTED_EVENTS = (user_id) => `${API_URL}/getMyInterestedEvents/${user_id}`;
exports.GET_ALL_GOING_EVENTS = (user_id)=> `${API_URL}/getMyGoingEvents/${user_id}`;
exports.EVENT_EDIT_TITLE = (event_id) => `${API_URL}/eventedits/${event_id}/title`;
exports.EVENT_EDIT_DESCRIPTION = (event_id) => `${API_URL}/eventedits/${event_id}/description`;
exports.EVENT_EDIT_TAG = (event_id) => `${API_URL}/eventedits/${event_id}/addtags`;
exports.EVENT_EDIT_DATE = (event_id) => `${API_URL}/eventedits/${event_id}/editdate`;
exports.FOLLOW_USER = (myId, userId) => `${API_URL}/connect/${myId}/${userId}/follow`;
exports.UNFOLLOW_USER = (myId, userId) => `${API_URL}/unconnect/${myId}/${userId}/unfollow`;
exports.POSTCOMMENT = (myId,eventId) => `${API_URL}/postcomment/${myId}/${eventId}`;
exports.GET_COMMENTS = (eventId) => `${API_URL}/getComments/${eventId}`
exports.GET_USER_NOTIFICATION = (userId) => `${API_URL}/getnotifications/${userId}`;
exports.READ_NOTIFICATION = (notificationId) => `${API_URL}/readNotification/${notificationId}`;
exports.GET_EVENT_USER_GOING = (eventId) => `${API_URL}/geteventusers/${eventId}`
exports.FORGOT_PASSWORD = `${API_URL}/forgotpassword`;
// GET_USER_PROFILE