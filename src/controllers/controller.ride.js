import serviceRide from "../services/service.ride.js";

function List(request, response) {

  try {
    const rides = serviceRide.List();
    response.status(200).json(rides);
  } catch (error) {
    response.status(500).json({ error });
  }

}

export default { List };