var API_URL = 'http://localhost:3000/v1';

//TODO: add the tags fields, latitude and lognitude 
exports.EVENT_FEED = (city,tags,event_name) =>`${API_URL}/getEvents/location=${city}?eventName=${event_name}` 